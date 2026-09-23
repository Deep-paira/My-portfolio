"use client";

/**
 * Filter out TFLite / MediaPipe WASM stderr messages that Emscripten routes to console.error.
 * Next.js dev overlay flags any console.error call as an unhandled application error,
 * so we demote informational and non-fatal C++ stderr logging to console.info.
 */

function isWasmInfoMessage(arg: unknown): boolean {
  if (!arg) return false;
  const str =
    typeof arg === "string"
      ? arg
      : (arg as any)?.message
      ? String((arg as any).message)
      : String(arg);

  return (
    str.includes("TensorFlow Lite") ||
    str.includes("XNNPACK") ||
    str.includes("INFO:") ||
    str.includes("InitGoogleLogging") ||
    str.includes("vision_wasm") ||
    str.includes("mediapipe") ||
    str.includes("Created TensorFlow")
  );
}

export function installWasmLogFilter() {
  if (typeof window === "undefined") return;

  const currentConsoleError = window.console.error;
  if ((currentConsoleError as any)?.__isWasmFiltered) {
    return;
  }

  const filteredConsoleError = function (this: any, ...args: any[]) {
    if (args.length > 0 && isWasmInfoMessage(args[0])) {
      // Demote informational WASM stderr to console.info to prevent Next.js error overlay
      console.info("[WASM/MediaPipe Info]", ...args);
      return;
    }
    return currentConsoleError.apply(this || window.console, args);
  };

  (filteredConsoleError as any).__isWasmFiltered = true;
  window.console.error = filteredConsoleError;

  if (typeof console !== "undefined" && console !== window.console) {
    console.error = filteredConsoleError;
  }
}

// Auto-install immediately on module load in client environments
if (typeof window !== "undefined") {
  installWasmLogFilter();
}
