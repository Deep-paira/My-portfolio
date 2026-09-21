"use client";

import * as React from "react";
import dynamic from "next/dynamic";

class SafeAboutBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn("About 3D Decor caught error gracefully:", error.message);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

const AboutGeometricScene = dynamic(
  async () => {
    try {
      if (typeof window !== "undefined") {
        const ReactModule = await import("react");
        const r = (ReactModule as unknown as { default?: Record<string, unknown> }).default || (ReactModule as unknown as Record<string, unknown>);
        const client = (r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE || {}) as Record<string, unknown>;
        const secret = (r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED || {
          ReactCurrentOwner: client.A || { current: null },
          ReactCurrentDispatcher: client.H || { current: null },
          ReactCurrentBatchConfig: client.T || { transition: null },
          ReactCurrentActQueue: client.actQueue || { current: null },
        }) as Record<string, unknown>;

        if (!secret.ReactCurrentOwner) {
          secret.ReactCurrentOwner = client.A || { current: null };
        }
        r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = secret;
      }
      return await import("./AboutGeometricScene");
    } catch (err) {
      console.warn("AboutGeometricScene module failed to load:", err);
      return { default: () => null };
    }
  },
  {
    ssr: false,
    loading: () => null,
  }
);

export function About3DDecor() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none w-full h-full"
    >
      <SafeAboutBoundary>
        <AboutGeometricScene />
      </SafeAboutBoundary>
    </div>
  );
}

export default About3DDecor;
