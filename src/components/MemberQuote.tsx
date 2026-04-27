import React, { useEffect, useRef } from "react";

export const MemberQuote: React.FC = () => {
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
      <div className="max-w-[700px] mx-auto text-center">
        {/* Quote mark */}
        <div className="reveal mb-8">
          <span className="font-display text-5xl text-primary/30 leading-none">"</span>
        </div>

        {/* Quote */}
        <blockquote className="reveal reveal-delay-1 font-display text-2xl md:text-3xl lg:text-4xl text-foreground italic leading-snug mb-8">
          The only place I play.
          <br />
          Nothing else compares.
        </blockquote>

        {/* Attribution */}
        <div className="reveal reveal-delay-2">
          <p className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-muted-foreground">
            A. — Former Premier League
          </p>
        </div>
      </div>
    </section>
  );
};
