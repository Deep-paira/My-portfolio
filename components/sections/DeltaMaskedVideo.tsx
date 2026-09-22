import React from "react";

export const DeltaMaskedVideo: React.FC = () => {
  return (
    <section className="relative w-full py-20 lg:py-32 flex items-center justify-center overflow-hidden bg-transparent">
      <div className="relative flex items-center justify-center w-full px-4">
        <div className="relative inline-block overflow-hidden">
          <video
            src="https://assets.mixkit.co/videos/preview/mixkit-liquid-silver-movement-41444-large.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-110"
          />

          <h1
            className="relative font-black uppercase text-transparent bg-clip-text text-center text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.45em] sm:tracking-[0.65em] md:tracking-[0.85em] lg:tracking-[1em] pl-[0.45em] sm:pl-[0.65em] md:pl-[0.85em] lg:pl-[1em] select-none"
            style={{
              WebkitBackgroundClip: "text",
              backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.3) 100%)`,
            }}
          >
            D E L T A
          </h1>
        </div>
      </div>
    </section>
  );
};

export default DeltaMaskedVideo;
