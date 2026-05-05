import React, { useEffect, useRef } from "react";

interface ExperienceProps {
  onRequestAccess: () => void;
}

const experiences = [
  {
    label: "The Court",
    text: "Private, world-class padel and tennis facilities. Reserved exclusively for members and their guests.",
  },
  {
    label: "The Network",
    text: "A curated roster of professional footballers, Olympic athletes, and the global SW entertainment network. Exclusive access across Dubai.",
  },
  {
    label: "The Calendar",
    text: "Seasonal leagues, invitational tournaments, and private events throughout the year.",
  },
];

export const Experience: React.FC<ExperienceProps> = ({ onRequestAccess }) => {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-10 md:py-16 px-6 relative">
      {/* Subtle background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, hsl(0, 0%, 3%) 30%, hsl(0, 0%, 3%) 70%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Section header */}
        <div className="reveal mb-14 md:mb-20 text-center">
          <p className="font-sans text-[0.65rem] font-medium tracking-[0.35em] uppercase text-muted-foreground mb-6">
            The Experience
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">
            More than a club
          </h2>
        </div>

        {/* Experiences list */}
        <div className="max-w-[700px] mx-auto space-y-16">
          {experiences.map((item, index) => (
            <div
              key={item.label}
              className={`reveal reveal-delay-${index + 1} flex flex-col md:flex-row md:items-start gap-4 md:gap-12`}
            >
              <p className="font-sans text-[0.65rem] font-medium tracking-[0.3em] uppercase text-primary md:w-32 md:flex-shrink-0 md:pt-1">
                {item.label}
              </p>
              <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="reveal reveal-delay-4 text-center mt-24 flex flex-col items-center">
          <button onClick={onRequestAccess} className="btn-outline mb-8">
            Apply for Membership
          </button>
          <div className="max-w-[450px]">
            <h3 className="font-display text-xl text-foreground mb-3">Padel House is strictly private.</h3>
            <p className="font-sans text-xs md:text-sm text-muted-foreground/80 leading-relaxed">
              Access is managed by SW Lifestyle. Membership is limited to chosen ones to protect the integrity of the experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
