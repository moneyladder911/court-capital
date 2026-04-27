import React, { useEffect, useRef } from "react";

export const PortalPreview: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll(".reveal");
            children.forEach((child) => {
              child.classList.add("visible");
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-6 bg-black/50">
      <div className="max-w-[1200px] mx-auto text-center flex flex-col items-center">
        <div className="reveal mb-14 md:mb-20">
          <p className="font-sans text-[0.65rem] font-medium tracking-[0.35em] uppercase text-muted-foreground mb-6">
            The Lifestyle Portal
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground max-w-[600px] mx-auto">
            Manage your world with
            <br />
            <span className="italic text-primary">absolute precision</span>
          </h2>
        </div>
        
        <div className="reveal reveal-delay-2 max-w-[1000px] mx-auto w-full">
          <div className="relative rounded-2xl overflow-hidden border border-primary/20 shadow-[0_20px_60px_-15px_rgba(201,169,110,0.2)]">
            <img 
              src="/padel-house-events.png" 
              alt="Padel House Exclusive Events Portal" 
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700" 
            />
            {/* Subtle inner shadow overlay */}
            <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
