import React, { useEffect, useRef } from "react";

export const Location: React.FC = () => {
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
    <section ref={sectionRef} className="py-20 md:py-28 px-6">
      <div className="max-w-[600px] mx-auto text-center">
        <div className="reveal w-12 h-px bg-primary/30 mx-auto mb-12" />

        <p className="reveal reveal-delay-1 font-sans text-[0.65rem] font-medium tracking-[0.35em] uppercase text-primary/70 mb-6">
          Location
        </p>

        <h2 className="reveal reveal-delay-2 font-display text-2xl md:text-4xl text-foreground mb-4">
          Dubai, UAE
        </h2>

        <p className="reveal reveal-delay-3 font-sans text-sm text-muted-foreground leading-relaxed">
          Exact location disclosed upon membership confirmation.
        </p>
      </div>
    </section>
  );
};
