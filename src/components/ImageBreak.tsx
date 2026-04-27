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

      {/* Heavy gradient from left for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent md:w-3/4" />
      <div className="absolute inset-0 bg-black/30 md:bg-black/20" />

      {/* Text Overlay - Left Aligned Editorial Style */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-8 md:px-16 max-w-[1200px] mx-auto w-full">
        <div className="w-8 h-px bg-primary/60 mb-8" />

        <h2 className="font-display text-3xl md:text-5xl lg:text-5xl text-foreground mb-8 max-w-[700px] leading-[1.1] drop-shadow-xl">
          Padel House is <span className="italic text-primary">not</span> open
          <br />
          to the public.
        </h2>

        <p className="font-sans font-light text-base md:text-lg text-muted-foreground/90 leading-relaxed max-w-[450px] mb-10 drop-shadow-md">
          Access is strictly managed by SW Lifestyle. Membership is strictly capped at 225 individuals globally to protect the integrity of the experience.
        </p>

        <p className="font-sans text-[0.6rem] md:text-[0.65rem] tracking-[0.3em] uppercase font-medium text-primary/80 drop-shadow-md">
          This is how we protect the experience.
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
