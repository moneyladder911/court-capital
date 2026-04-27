import React, { useEffect, useRef } from "react";

interface ScarcityProps {
  onRequestAccess: () => void;
}

export const Scarcity: React.FC<ScarcityProps> = ({ onRequestAccess }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((child) => {
              child.classList.add("visible");
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6">
      <div className="max-w-[600px] mx-auto text-center">
        {/* Thin gold line */}
        <div className="reveal w-16 h-px bg-primary/30 mx-auto mb-12" />

        <p className="reveal reveal-delay-1 font-sans text-[0.65rem] font-medium tracking-[0.35em] uppercase text-primary/70 mb-6">
          Q3 2026 Intake
        </p>

        <h2 className="reveal reveal-delay-2 font-display text-2xl md:text-4xl text-foreground mb-4">
          Applications Now Open
        </h2>

        <p className="reveal reveal-delay-3 font-sans text-sm text-muted-foreground leading-relaxed mb-10">
          We are currently accepting a limited number of applications
          for our founding membership. Spots are reviewed on a
          rolling basis.
        </p>

        <div className="reveal reveal-delay-4">
          <button onClick={onRequestAccess} className="btn-primary">
            Request Access
          </button>
        </div>
      </div>
    </section>
  );
};
