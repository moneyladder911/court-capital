import React, { useEffect, useRef } from "react";

const offerings = [
  {
    number: "01",
    title: "Competitive Matches",
    description:
      "Curated games with verified professional athletes. Every session is arranged, never open to the public.",
  },
  {
    number: "02",
    title: "Leagues & Tournaments",
    description:
      "Seasonal competitions exclusively for members. Structured play at the highest level.",
  },
  {
    number: "03",
    title: "Private Coaching",
    description:
      "One-on-one sessions with world-class padel coaches. Tailored to your game, on your schedule.",
  },
];

export const Offerings: React.FC = () => {
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
    <section ref={sectionRef} className="py-20 md:py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Section header */}
        <div className="reveal mb-14 md:mb-20">
          <p className="font-sans text-[0.65rem] font-medium tracking-[0.35em] uppercase text-muted-foreground mb-6">
            The Offering
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground max-w-[500px]">
            Built for those who
            <br />
            <span className="italic text-primary">demand more</span>
          </h2>
        </div>

        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {offerings.map((item, index) => (
            <div
              key={item.number}
              className={`reveal reveal-delay-${index + 1}`}
            >
              {/* Top line */}
              <div className="divider mb-8" />

              {/* Number */}
              <p className="font-sans text-[0.65rem] font-medium tracking-[0.3em] uppercase text-primary mb-6">
                {item.number}
              </p>

              {/* Title */}
              <h3 className="font-display text-xl md:text-2xl text-foreground mb-4">
                {item.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
