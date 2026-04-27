import React, { useState, useEffect, useRef } from "react";
import { PageLayout } from "@/components/PageLayout";
import { Memberships } from "@/components/Memberships";
import { RequestAccessModal } from "@/components/RequestAccessModal";

const offerings = [
  {
    number: "01",
    title: "Competitive Matches",
    description:
      "Curated games with verified professional athletes. Every session is arranged based on skill level, availability, and competitive intensity.",
  },
  {
    number: "02",
    title: "Leagues & Tournaments",
    description:
      "Seasonal competitions exclusively for members. Structured play with rankings, standings, and invitational finals events.",
  },
  {
    number: "03",
    title: "Private Coaching",
    description:
      "One-on-one and small group sessions with elite padel coaches. Tailored programmes designed around your game and goals.",
  },
  {
    number: "04",
    title: "Social Calendar",
    description:
      "Members-only dinners, viewing parties, and private events. The relationships built off the court matter just as much.",
  },
];

const Membership = () => {
  const [modalOpen, setModalOpen] = useState(false);
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
              Membership
            </p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground leading-[1.05] mb-8">
              What you
              <br />
              <span className="italic text-primary">get access</span> to
            </h1>
            <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed max-w-[550px]">
              Membership at Padel House is more than court time. It's
              entry into a private world of elite competition, coaching,
              and connection.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="divider max-w-[1200px] mx-auto" />

        {/* Detailed offerings */}
        <section ref={addRef} className="py-20 md:py-24 px-6">
          <div className="max-w-[900px] mx-auto">
            <p className="reveal font-sans text-[0.65rem] font-medium tracking-[0.35em] uppercase text-muted-foreground mb-14">
              The Offering
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
              {offerings.map((item, index) => (
                <div
                  key={item.number}
                  className={`reveal reveal-delay-${index + 1}`}
                >
                  <p className="font-sans text-[0.6rem] font-medium tracking-[0.3em] uppercase text-primary mb-4">
                    {item.number}
                  </p>
                  <h3 className="font-display text-xl text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Memberships onRequestAccess={() => setModalOpen(true)} />
      </main>

      <RequestAccessModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </PageLayout>
  );
};

export default Membership;
