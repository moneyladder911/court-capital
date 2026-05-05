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
    <section ref={sectionRef} className="py-10 md:py-16 px-6">
      <div className="max-w-[1200px] mx-auto text-center relative z-10">
        <p className="reveal font-sans text-[0.65rem] font-medium tracking-[0.4em] uppercase text-primary/60 mb-12">
          The Network
        </p>

        <h2 className="reveal reveal-delay-1 font-display text-2xl md:text-4xl lg:text-[2.75rem] text-foreground leading-[1.3] mb-24 max-w-[900px] mx-auto">
          Powered by SW VIP. An exclusive network of{" "}
          <span className="italic text-primary/90">Premier League champions</span>,{" "}
          Olympic medalists, and{" "}
          <span className="italic text-primary/90">Forbes-listed founders</span>.
        </h2>

        {/* Qualitative pillars */}
        <div className="reveal reveal-delay-2 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 py-10 border-y border-border/20 max-w-[800px] mx-auto bg-gradient-to-r from-transparent via-primary/5 to-transparent">
          {pillars.map((pillar, i) => (
            <React.Fragment key={pillar.label}>
              {i > 0 && (
                <div className="hidden md:block text-primary/40 text-xs">
                  ✦
                </div>
              )}
              <div className="text-center group">
                <p className="font-sans text-[0.6rem] md:text-[0.65rem] font-medium tracking-[0.4em] uppercase text-primary mb-2 transition-colors duration-500 group-hover:text-white">
                  {pillar.label}
                </p>
                <p className="font-sans text-[0.55rem] md:text-[0.6rem] tracking-[0.3em] uppercase text-muted-foreground/70">
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
