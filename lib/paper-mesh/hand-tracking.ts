import { installWasmLogFilter } from "./wasm-log-filter";

export type HandTrackingStatus =
  | "idle"
  | "requesting-permission"
  | "loading-model"
  | "tracking-active"
  | "no-hand-detected"
  | "permission-denied"
  | "error";

export interface HandTrackerCallbacks {
  onProgress: (progress: number) => void;
  onStatusChange: (status: HandTrackingStatus, message: string) => void;
}

export class HandTrackerController {
  private videoElement: HTMLVideoElement | null = null;
  private stream: MediaStream | null = null;
  private handLandmarker: any = null;
  private isRunning: boolean = false;
  private isPaused: boolean = false;
  private animationFrameId: number | null = null;
  private lastVideoTime: number = -1;

  private currentProgress: number = 0.5;
  private targetProgress: number = 0.5;
  private readonly inferenceIntervalMs: number = 45; // Decoupled ~22fps inference rate
  private lastInferenceTime: number = 0;
  private lastFrameTime: number = 0;

  private callbacks: HandTrackerCallbacks;

  constructor(callbacks: HandTrackerCallbacks) {
    this.callbacks = callbacks;
  }

  /**
   * Request webcam permission and initialize MediaPipe HandLandmarker
   */
  public async start(videoEl: HTMLVideoElement): Promise<boolean> {
    if (this.isRunning) return true;

    this.videoElement = videoEl;
    this.callbacks.onStatusChange("requesting-permission", "Requesting camera access...");

    try {
      // 1. Request camera stream (bounded 360p/480p for light CPU/GPU load)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 480, max: 640 },
          height: { ideal: 360, max: 480 },
          frameRate: { ideal: 30, max: 30 },
        },
        audio: false,
      });

      this.stream = stream;
      this.videoElement.srcObject = stream;
      await this.videoElement.play();

      this.callbacks.onStatusChange("loading-model", "Loading neural hand-tracking model...");

      // 2. Load MediaPipe HandLandmarker dynamically
      installWasmLogFilter();
      const { FilesetResolver, HandLandmarker } = await import("@mediapipe/tasks-vision");

      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      installWasmLogFilter();

      this.handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numHands: 1,
      });

      this.isRunning = true;
      this.isPaused = false;
      this.callbacks.onStatusChange("tracking-active", "Hand tracking active: Spread hand to unfold");

      // 3. Start real-time detection loop
      this.runDetectionLoop();
      return true;
    } catch (err: any) {
      console.warn("[HandTracker] Camera access or model loading failed:", err);
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        this.callbacks.onStatusChange(
          "permission-denied",
          "Camera access denied. Seamlessly switched to mouse/touch mode."
        );
      } else {
        this.callbacks.onStatusChange(
          "error",
          "Webcam unavailable. Switched to mouse/touch mode."
        );
      }
      this.stop();
      return false;
    }
  }

  /**
   * Continuous detection loop with decoupled ~20-22fps inference and smooth 60fps/120fps progress interpolation
   */
  private runDetectionLoop = () => {
    if (!this.isRunning) return;

    const now = performance.now();
    if (!this.lastFrameTime) this.lastFrameTime = now;
    const delta = Math.min((now - this.lastFrameTime) / 1000, 0.1);
    this.lastFrameTime = now;

    // 1. Throttled Inference: Run neural hand landmark detection at ~22fps max
    if (
      !this.isPaused &&
      this.videoElement &&
      this.handLandmarker &&
      this.videoElement.readyState >= 2 &&
      now - this.lastInferenceTime >= this.inferenceIntervalMs
    ) {
      const currentTime = this.videoElement.currentTime;

      if (currentTime !== this.lastVideoTime) {
        this.lastVideoTime = currentTime;
        this.lastInferenceTime = now;

        try {
          const results = this.handLandmarker.detectForVideo(this.videoElement, now);

          if (results.landmarks && results.landmarks.length > 0) {
            const landmarks = results.landmarks[0]; // 21 hand points
            const palmCenter = landmarks[9];
            const tips = [landmarks[4], landmarks[8], landmarks[12], landmarks[16], landmarks[20]];

            // Compute average Euclidean distance of fingertips from palm center
            let totalDist = 0;
            for (const tip of tips) {
              const dx = tip.x - palmCenter.x;
              const dy = tip.y - palmCenter.y;
              const dz = (tip.z || 0) - (palmCenter.z || 0);
              totalDist += Math.sqrt(dx * dx + dy * dy + dz * dz);
            }
            const avgDistance = totalDist / tips.length;

            // Also factor in pinch distance (thumb tip to index tip)
            const pinchDx = landmarks[4].x - landmarks[8].x;
            const pinchDy = landmarks[4].y - landmarks[8].y;
            const pinchDist = Math.sqrt(pinchDx * pinchDx + pinchDy * pinchDy);

            // Calibrated range:
            // Closed fist / pinch: avgDistance ~0.18, pinchDist ~0.05
            // Fully open spread hand: avgDistance ~0.50+, pinchDist ~0.25+
            const spreadScore = Math.max(0, Math.min(1, (avgDistance - 0.20) / 0.30));
            const pinchScore = Math.max(0, Math.min(1, (pinchDist - 0.05) / 0.22));

            // Weighted combination: 70% overall hand openness + 30% thumb-index spread
            const rawOpenness = spreadScore * 0.7 + pinchScore * 0.3;

            this.targetProgress = Math.max(0, Math.min(1, rawOpenness));
            this.callbacks.onStatusChange("tracking-active", "Hand detected: Open to reveal, close to crumple");
          } else {
            this.callbacks.onStatusChange("no-hand-detected", "Show your hand to the camera");
          }
        } catch {
          // Frame skip if busy
        }
      }
    }

    // 2. High-rate buttery smooth progress interpolation (runs at display refresh rate)
    // Frame-rate independent exponential smoothing: lambda = 14 gives ~120-150ms settling with 0 jitter
    const alpha = 1.0 - Math.exp(-14 * delta);
    this.currentProgress += (this.targetProgress - this.currentProgress) * alpha;
    this.callbacks.onProgress(this.currentProgress);

    this.animationFrameId = requestAnimationFrame(this.runDetectionLoop);
  };

  /**
   * Pause tracking when scrolled out of view to save battery and GPU
   */
  public pause(): void {
    this.isPaused = true;
    if (this.videoElement) {
      this.videoElement.pause();
    }
  }

  /**
   * Resume tracking when scrolled back into view
   */
  public resume(): void {
    if (!this.isRunning) return;
    this.isPaused = false;
    if (this.videoElement && this.stream) {
      this.videoElement.play().catch(() => {});
    }
  }

  /**
   * Complete stop and release all hardware/software resources
   */
  public stop(): void {
    this.isRunning = false;
    this.isPaused = false;

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }

    if (this.videoElement) {
      this.videoElement.srcObject = null;
    }

    if (this.handLandmarker) {
      try {
        this.handLandmarker.close();
      } catch {}
      this.handLandmarker = null;
    }

    this.callbacks.onStatusChange("idle", "Camera disabled");
  }

  public getIsRunning(): boolean {
    return this.isRunning;
  }
}
