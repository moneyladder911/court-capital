import React from "react";

const items = [
  "Competitive Matches",
  "Invitational Leagues",
  "Elite Coaching",
  "Members Only Events",
  "Dubai, UAE",
  "Est. 2026",
];

export const Marquee: React.FC = () => {
  // Double the items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="relative py-6 overflow-hidden border-y border-border/30">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="marquee-track flex items-center gap-12 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-sans text-[0.6rem] font-medium tracking-[0.3em] uppercase text-muted-foreground/60 flex items-center gap-12"
          >
            {item}
            <span className="inline-block w-1 h-1 rounded-full bg-primary/40" />
          </span>
        ))}
      </div>
    </div>
  );
};
