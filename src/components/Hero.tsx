import React, { useEffect, useRef, useState } from "react";

interface HeroProps {
  onRequestAccess: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRequestAccess }) => {
  const heroRef = useRef<HTMLDivElement>(null);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const children = el.querySelectorAll(".hero-reveal");
    children.forEach((child, i) => {
      setTimeout(() => {
        child.classList.add("visible");
      }, 500 + i * 250);
    });

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[600px] flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          role="img"
          aria-label="Private padel club Dubai – Padel House"
          className="absolute inset-[-10%] w-[120%] h-[120%] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero-court.png')",
            filter: "brightness(0.5) contrast(1.2) sepia(0.3) hue-rotate(-15deg)",
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        {/* Soft vignette edges & cinematic overlay */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.85)_100%)]" />
      </div>

      {/* Bottom gradient fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, hsl(0, 0%, 2%) 0%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-[800px]">
        {/* Eyebrow */}
        <p className="hero-reveal reveal font-sans text-[0.6rem] md:text-[0.65rem] font-medium tracking-[0.4em] uppercase text-primary/80 mb-8">
          SW VIP Network — Dubai
        </p>

        {/* Headline */}
        <h1 className="hero-reveal reveal font-display text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-medium text-white mb-8 leading-[1.05]">
          The Pinnacle of
          <br />
          <span className="italic text-primary">Padel.</span>
        </h1>

        {/* Subtext */}
        <p className="hero-reveal reveal font-sans text-[0.8rem] md:text-[0.9rem] text-white/50 max-w-[500px] mx-auto mb-14 leading-relaxed font-light">
          An exclusive private padel and tennis experience for the SW network.{" "}
          <br className="hidden sm:block" />
          Reserved for global luxury brands and sports professionals.
        </p>

        {/* CTA */}
        <div className="hero-reveal reveal">
          <button onClick={onRequestAccess} className="btn-primary">
            Request Access
          </button>
        </div>
      </div>

      {/* Three stat/feature columns at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 hidden md:block bg-background/80 backdrop-blur-md border-t border-primary/20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-3">
          <div className="py-8 px-6 text-center border-r border-primary/20">
            <h2 className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-primary mb-2">Members Only</h2>
            <p className="font-sans text-xs text-muted-foreground/80 leading-relaxed max-w-[250px] mx-auto">Access is strictly reserved for our verified global network of athletes and executives.</p>
          </div>
          <div className="py-8 px-6 text-center border-r border-primary/20">
            <h2 className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-primary mb-2">Invitation Required</h2>
            <p className="font-sans text-xs text-muted-foreground/80 leading-relaxed max-w-[250px] mx-auto">New applications are vetted carefully to ensure the integrity of our exclusive community.</p>
          </div>
          <div className="py-8 px-6 text-center">
            <h2 className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-primary mb-2">Dubai's Finest</h2>
            <p className="font-sans text-xs text-muted-foreground/80 leading-relaxed max-w-[250px] mx-auto">Experience unparalleled private padel events, tailored coaching, and elite matchmaking in the heart of the UAE.</p>
          </div>
        </div>
      </div>

    </section>
  );
};
