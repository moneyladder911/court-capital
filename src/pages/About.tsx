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
        <section ref={addRef} className="py-20 md:py-32 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Image side */}
              <div className="reveal relative aspect-[4/5] w-full max-w-[500px] mx-auto lg:mx-0 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                  style={{ backgroundImage: "url('/midpage-detail.png')" }}
                />
              </div>

              {/* Text side */}
              <div className="max-w-[500px]">
                <p className="reveal font-sans text-[0.65rem] font-medium tracking-[0.35em] uppercase text-muted-foreground mb-6">
                  The Story
                </p>
                <h2 className="reveal reveal-delay-1 font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-[1.1] mb-8">
                  Born from a gap
                  <br />
                  in the market
                </h2>
                <div className="space-y-6">
                  <p className="reveal reveal-delay-2 font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
                    Dubai has world-class padel facilities. What it didn't
                    have was a private environment where professional
                    athletes could play competitively, away from the public
                    eye, surrounded by peers who match their intensity.
                  </p>
                  <p className="reveal reveal-delay-3 font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
                    Padel House was created to fill that void — a
                    members-only club where every match is arranged, every
                    opponent is verified, and the standard never drops.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>



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
