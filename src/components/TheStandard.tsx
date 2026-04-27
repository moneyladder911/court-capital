import React, { useEffect, useRef } from "react";

export const TheStandard: React.FC = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-[700px] mx-auto text-center">
          {/* Divider */}
          <div className="reveal w-12 h-px bg-primary/40 mx-auto mb-16" />

          {/* Statement */}
          <p className="reveal reveal-delay-1 font-display text-2xl md:text-4xl text-foreground leading-snug mb-8">
            The Padel House is not open
            <br />
            to the public.
          </p>

          <p className="reveal reveal-delay-2 font-sans text-sm md:text-base text-muted-foreground leading-relaxed max-w-[500px] mx-auto mb-4">
            Membership is extended by invitation or referral
            from an existing member. We maintain a small,
            intentional roster of professional footballers,
            elite athletes, and select individuals.
          </p>

          <p className="reveal reveal-delay-3 font-sans text-sm md:text-base text-muted-foreground leading-relaxed max-w-[500px] mx-auto">
            This is how we protect the experience.
          </p>

          {/* Divider */}
          <div className="reveal reveal-delay-4 w-12 h-px bg-primary/40 mx-auto mt-16" />
        </div>
      </div>
    </section>
  );
};
