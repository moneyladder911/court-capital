import React, { useEffect, useRef } from "react";

export const SocialProof: React.FC = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const pillars = [
    { label: "By Invitation", detail: "Only" },
    { label: "Verified", detail: "Athletes" },
    { label: "Private", detail: "Facilities" },
  ];

  return (
    <section ref={sectionRef} className="pt-8 pb-20 md:pt-16 md:pb-24 px-6">
      <div className="max-w-[1200px] mx-auto text-center">
        <p className="reveal font-sans text-[0.65rem] font-medium tracking-[0.35em] uppercase text-muted-foreground mb-8">
          Who We Are
        </p>

        <p className="reveal reveal-delay-1 font-display text-xl md:text-2xl lg:text-3xl text-foreground leading-snug mb-16 max-w-[800px] mx-auto">
          Powered by SW VIP. An exclusive network of Premier League champions,{" "}
          <br className="hidden md:block" />
          Olympic medalists, and Forbes-listed founders.
        </p>

        {/* Qualitative pillars */}
        <div className="reveal reveal-delay-2 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {pillars.map((pillar, i) => (
            <React.Fragment key={pillar.label}>
              {i > 0 && (
                <div className="hidden md:block w-px h-8 bg-border/40" />
              )}
              <div className="text-center">
                <p className="font-sans text-[0.55rem] md:text-[0.6rem] font-medium tracking-[0.3em] uppercase text-primary mb-1">
                  {pillar.label}
                </p>
                <p className="font-sans text-[0.55rem] md:text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground">
                  {pillar.detail}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
