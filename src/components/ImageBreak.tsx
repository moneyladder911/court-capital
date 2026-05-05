import React, { useEffect, useRef } from "react";

export const ImageBreak: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrollPercent = -rect.top / (rect.height + window.innerHeight);
      const img = ref.current.querySelector<HTMLDivElement>(".parallax-img");
      if (img) {
        img.style.transform = `translateY(${scrollPercent * 60}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="relative h-[50vh] md:h-[60vh] overflow-hidden my-8"
    >
      {/* Parallax image */}
      <div
        className="parallax-img absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: "url('/midpage-detail.png')",
          top: "-30px",
          bottom: "-30px",
        }}
      />

      {/* Subtle vignette for text readability */}
      <div className="absolute inset-0 bg-black/50 md:bg-black/40" />

      {/* Text Overlay - Center Aligned */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-8 md:px-16 max-w-[1200px] mx-auto w-full">
        <div className="w-8 h-px bg-primary/60 mb-8 mx-auto" />

        <h2 className="font-display text-3xl md:text-5xl lg:text-5xl text-foreground mb-8 max-w-[700px] mx-auto leading-[1.1] drop-shadow-xl">
          Padel House is <span className="italic text-primary">strictly private.</span>
        </h2>

        <p className="font-sans font-normal text-base md:text-lg text-white/95 leading-relaxed max-w-[450px] mx-auto mb-10 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
          Access is managed by SW Lifestyle. Membership is limited globally to protect the integrity of the experience.
        </p>

        <p className="font-sans text-[0.6rem] md:text-[0.65rem] tracking-[0.3em] uppercase font-medium text-primary/80 drop-shadow-md">
          Invitation Only
        </p>
      </div>

      {/* Top & bottom fade */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-20"
        style={{
          background: "linear-gradient(to bottom, hsl(0,0%,2%) 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-20"
        style={{
          background: "linear-gradient(to top, hsl(0,0%,2%) 0%, transparent 100%)",
        }}
      />
    </div>
  );
};
