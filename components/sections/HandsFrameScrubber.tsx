"use client";

import * as React from "react";

interface HandsFrameScrubberProps {
  progress: number; // 0.0 to 1.0
  frameCount?: number;
  framePathPrefix?: string; // e.g. "/hands-sequence/frame_"
  frameExtension?: string;  // e.g. ".jpg"
  onTouch?: () => void;
  onFallbackNeeded?: () => void;
}

export function HandsFrameScrubber({
  progress,
  frameCount = 90,
  framePathPrefix = "/hands-sequence/frame_",
  frameExtension = ".jpg",
  onTouch,
  onFallbackNeeded,
}: HandsFrameScrubberProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imagesRef = React.useRef<HTMLImageElement[]>([]);
  const [framesLoaded, setFramesLoaded] = React.useState(false);
  const hasTriggeredTouch = React.useRef(false);

  // Helper to format frame numbers like frame_001.jpg
  const getFrameUrl = React.useCallback(
    (index: number) => {
      const paddedNumber = String(index + 1).padStart(3, "0");
      return `${framePathPrefix}${paddedNumber}${frameExtension}`;
    },
    [framePathPrefix, frameExtension]
  );

  // Preload and probe sequence
  React.useEffect(() => {
    let isCancelled = false;

    // Test probe frame 1 first
    const probe = new Image();
    probe.src = getFrameUrl(0);

    probe.onload = () => {
      if (isCancelled) return;
      // Frame 1 exists! Preload entire sequence
      const loadedImages: HTMLImageElement[] = [];
      let loadCount = 0;

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          loadCount++;
          if (loadCount >= Math.min(15, frameCount) && !isCancelled) {
            // As soon as first batch is ready, enable canvas scrubbing
            setFramesLoaded(true);
          }
        };
        loadedImages.push(img);
      }
      imagesRef.current = loadedImages;
    };

    probe.onerror = () => {
      if (isCancelled) return;
      console.info(
        "Hands video sequence not found at " +
          getFrameUrl(0) +
          ". Seamlessly falling back to procedural 3D hands until frames are added."
      );
      onFallbackNeeded?.();
    };

    return () => {
      isCancelled = true;
    };
  }, [frameCount, getFrameUrl, onFallbackNeeded]);

  // Render current frame to canvas on scroll progress change
  React.useEffect(() => {
    if (!framesLoaded) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Responsive canvas dimensions - only resize buffer if dimensions change
    const targetWidth = container.clientWidth;
    const targetHeight = container.clientHeight;
    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }
    const width = canvas.width;
    const height = canvas.height;

    // Ease-in power curve (Math.pow(progress, 1.35))
    const easedProgress = Math.pow(Math.max(0, Math.min(1, progress)), 1.35);
    const frameIndex = Math.min(
      imagesRef.current.length - 1,
      Math.max(0, Math.floor(easedProgress * (imagesRef.current.length - 1)))
    );

    const img = imagesRef.current[frameIndex];
    if (img && img.complete && img.naturalWidth > 0) {
      ctx.clearRect(0, 0, width, height);

      // Draw image with object-fit: contain logic to prevent distortion on any screen
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = width / height;

      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
      } else {
        drawHeight = width / imgRatio;
        offsetY = (height - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    // Touch threshold trigger (progress >= 0.88)
    if (easedProgress >= 0.88) {
      if (!hasTriggeredTouch.current) {
        hasTriggeredTouch.current = true;
        onTouch?.();
      }
    } else if (easedProgress < 0.75) {
      hasTriggeredTouch.current = false;
    }
  }, [progress, framesLoaded, onTouch]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center pointer-events-none select-none"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
