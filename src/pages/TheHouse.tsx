import React, { useEffect, useRef } from "react";
import { PageLayout } from "@/components/PageLayout";

const amenities = [
  {
    name: "Lifestyle Portal",
    description: "Your central hub for club activity. Access the private calendar of upcoming invitationals, exhibition games, and members-only social events.",
    image: "/padel-house-events.png",
  },
  {
    name: "Matchmaking",
    description: "Coordinate competitive play on your terms. Submit your availability and let our concierge match you with opponents of verified, equal caliber.",
    image: "/matchmaking.png",
  },
  {
    name: "Private Coaching",
    description: "Direct access to our roster of elite coaches. Book private sessions to refine your tactical approach, technically analyze your swing, or prepare for tournament play.",
    image: "/private-coaching.png",
  }
];

const TheHouse = () => {
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
              Amenities
            </p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground leading-[1.05] mb-8">
              More than
              <br />
              <span className="italic text-primary">just the court</span>
            </h1>
            <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed max-w-[550px]">
              This is not a sports club. It is a private members service built around padel and tennis. The sport is the vehicle. The product is access, community, and excellence.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="divider max-w-[1200px] mx-auto" />

        {/* Amenities List */}
        <section ref={addRef} className="py-20 md:py-24 px-6">
          <div className="max-w-[1000px] mx-auto space-y-24 md:space-y-32">
            {amenities.map((item, index) => (
              <div
                key={item.name}
                className={`reveal reveal-delay-${(index % 3) + 1} flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-16`}
              >
                {/* Image */}
                <div className="w-full md:w-1/2 aspect-[4/3] bg-muted/20 border border-border/30 relative overflow-hidden group">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>

                {/* Text Content */}
                <div className="w-full md:w-1/2">
                  <p className="font-sans text-[0.6rem] font-medium tracking-[0.3em] uppercase text-primary mb-4">
                    0{index + 1}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4">
                    {item.name}
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </PageLayout>
  );
};

export default TheHouse;
