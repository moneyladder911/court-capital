import React, { useEffect, useRef } from "react";
import { PageLayout } from "@/components/PageLayout";

const values = [
  {
    label: "Exclusivity",
    text: "We maintain a small, intentional roster. Quality over quantity, always.",
  },
  {
    label: "Competition",
    text: "Every match means something. Our members don't play casually — they compete.",
  },
  {
    label: "Privacy",
    text: "What happens at Padel House stays at Padel House. No cameras, no spectators.",
  },
  {
    label: "Respect",
    text: "For the game, for each other, and for the space we've built together.",
  },
];

const About = () => {
  const revealRefs = useRef<HTMLDivElement[]>([]);

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
      { threshold: 0.15 }
    );

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <PageLayout>
      <main>
        {/* Hero */}
        <section className="pt-40 pb-20 md:pt-48 md:pb-24 px-6">
          <div className="max-w-[900px] mx-auto">
            <p className="font-sans text-[0.65rem] font-medium tracking-[0.35em] uppercase text-primary/70 mb-6">
              About
            </p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground leading-[1.05] mb-8">
              A club built on
              <br />
              <span className="italic text-primary">conviction</span>
            </h1>
            <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed max-w-[550px]">
              Padel House was founded on a simple belief: the best
              competition happens behind closed doors, among people who
              hold themselves to the highest standard.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="divider max-w-[1200px] mx-auto" />

        {/* Story */}
        <section ref={addRef} className="py-20 md:py-24 px-6">
          <div className="max-w-[900px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
              <div>
                <p className="reveal font-sans text-[0.65rem] font-medium tracking-[0.35em] uppercase text-muted-foreground mb-6">
                  The Story
                </p>
                <h2 className="reveal reveal-delay-1 font-display text-2xl md:text-3xl text-foreground mb-6">
                  Born from a gap
                  <br />
                  in the market
                </h2>
              </div>
              <div>
                <p className="reveal reveal-delay-2 font-sans text-sm text-muted-foreground leading-relaxed mb-6">
                  Dubai has world-class padel facilities. What it didn't
                  have was a private environment where professional
                  athletes could play competitively, away from the public
                  eye, surrounded by peers who match their intensity.
                </p>
                <p className="reveal reveal-delay-3 font-sans text-sm text-muted-foreground leading-relaxed">
                  Padel House was created to fill that void — a
                  members-only club where every match is arranged, every
                  opponent is verified, and the standard never drops.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Image break */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden my-4">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-court.png')" }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="absolute top-0 left-0 right-0 h-24"
            style={{ background: "linear-gradient(to bottom, hsl(0,0%,2%) 0%, transparent 100%)" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-24"
            style={{ background: "linear-gradient(to top, hsl(0,0%,2%) 0%, transparent 100%)" }}
          />
        </div>

        {/* Values */}
        <section ref={addRef} className="py-20 md:py-24 px-6">
          <div className="max-w-[900px] mx-auto">
            <p className="reveal font-sans text-[0.65rem] font-medium tracking-[0.35em] uppercase text-muted-foreground mb-14">
              Our Values
            </p>

            <div className="space-y-12">
              {values.map((value, index) => (
                <div
                  key={value.label}
                  className={`reveal reveal-delay-${index + 1} flex flex-col md:flex-row md:items-start gap-4 md:gap-16`}
                >
                  <p className="font-display text-lg md:text-xl text-foreground md:w-40 md:flex-shrink-0">
                    {value.label}
                  </p>
                  <div>
                    <div className="divider mb-4 md:hidden" />
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                      {value.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  );
};

export default About;
