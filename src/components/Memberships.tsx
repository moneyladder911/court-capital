import React, { useEffect, useRef } from "react";

interface MembershipsProps {
  onRequestAccess: () => void;
}

const tiers = [
  {
    name: "Elite Global",
    description: "The ultimate access for the global player.",
    features: [
      "Unlimited private sessions (padel or tennis)",
      "Guaranteed entry to all exclusive VIP events",
      "7-day advance priority booking",
      "Global access (Dubai, Marbella, London) with Concierge",
      "Full family inclusion (Up to 4 members)",
    ],
  },
  {
    name: "Pro",
    description: "For the dedicated athlete and competitor.",
    features: [
      "4 core private sessions per month",
      "Priority access to all private club events",
      "72-hour advance priority booking",
      "Global access (Dubai, Marbella, London)",
      "Partner inclusion (+1 member)",
    ],
  },
  {
    name: "Starter",
    description: "Introduction to the SW network.",
    features: [
      "2 introductory private sessions per month",
      "Access to select networking events",
      "48-hour advance booking window",
      "Regional access (Dubai only)",
      "Individual membership",
    ],
  },
];

export const Memberships: React.FC<MembershipsProps> = ({ onRequestAccess }) => {
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
    <section ref={sectionRef} className="py-20 md:py-24 px-6 relative border-t border-border/20">
      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Section header */}
        <div className="reveal mb-14 md:mb-20">
          <p className="font-sans text-[0.65rem] font-medium tracking-[0.35em] uppercase text-muted-foreground mb-6">
            Membership Tiers
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">
            The Standard of Access
          </h2>
        </div>

        {/* Memberships grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`reveal reveal-delay-${index + 1} flex flex-col p-8 border border-border/30 bg-muted/5 hover:bg-muted/10 transition-colors duration-500`}
            >
              <h3 className="font-display text-2xl text-foreground mb-3">
                {tier.name}
              </h3>
              <p className="font-sans text-xs text-muted-foreground mb-8 pb-8 border-b border-border/20 min-h-[4rem]">
                {tier.description}
              </p>
              
              <ul className="flex-grow space-y-6 mb-12">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-primary mt-1 text-[0.6rem]">❖</span>
                    <span className="font-sans text-sm text-muted-foreground leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onRequestAccess}
                className="w-full font-sans text-[0.65rem] tracking-[0.2em] uppercase text-foreground hover:text-primary transition-colors border border-border/30 py-4"
              >
                Inquire
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
