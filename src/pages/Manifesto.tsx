import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Users,
  Trophy,
  Shield,
  Rocket,
  Crown,
  Star,
  Target,
  Flame,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const Manifesto = () => {
  const navigate = useNavigate();

  const principles = [
    {
      icon: Shield,
      title: "We Show Up",
      description:
        "Commitment is currency. When you say you'll be there, you're there. Your word builds your reputation.",
    },
    {
      icon: Users,
      title: "We Connect Through Action",
      description:
        "Real relationships aren't built in DMs. They're forged on courts, tracks, and gym floors.",
    },
    {
      icon: Trophy,
      title: "We Build Together",
      description:
        "Every session is an opportunity. Share alpha, make deals, grow your network authentically.",
    },
    {
      icon: Flame,
      title: "We Compete With Respect",
      description:
        "Bring intensity, but leave ego at the door. The best players elevate everyone around them.",
    },
  ];

  const tiers = [
    {
      name: "Explorer",
      points: "0-49",
      color: "text-muted-foreground",
      bgColor: "bg-muted",
      description: "Just getting started. Build your foundation.",
    },
    {
      name: "Core",
      points: "50-199",
      color: "text-foreground",
      bgColor: "bg-card",
      description: "Consistent contributor. Proven reliability.",
    },
    {
      name: "Elite",
      points: "200-499",
      color: "text-primary",
      bgColor: "bg-primary/10",
      description: "Community leader. Opens doors for others.",
    },
    {
      name: "Inner Circle",
      points: "500+",
      color: "text-gradient-gold",
      bgColor: "bg-gradient-gold",
      description: "The top 1%. Exclusive access and recognition.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="relative max-w-md mx-auto text-center">
          <Badge variant="gold" className="mb-4">
            The CHAINPLAY Manifesto
          </Badge>
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            Where Crypto Meets{" "}
            <span className="text-gradient-gold">Competition</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            An elite network of crypto builders who compete, connect, and grow
            together through sports.
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              variant="gold"
              size="lg"
              onClick={() => navigate("/profile/edit")}
            >
              Complete Your Profile
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="px-4 py-16 max-w-md mx-auto">
        <h2 className="font-display text-2xl font-bold text-center text-foreground mb-8">
          Our Principles
        </h2>
        <div className="space-y-4">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <div
                key={index}
                className="glass-card rounded-xl p-5 slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-background" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1">
                      {principle.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tier System */}
      <section className="px-4 py-16 bg-card/50">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Badge variant="muted" className="mb-3">
              <Crown className="w-3 h-3 mr-1" />
              Member Tiers
            </Badge>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Rise Through The Ranks
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Your commitment unlocks exclusive benefits
            </p>
          </div>

          <div className="space-y-3">
            {tiers.map((tier, index) => (
              <div
                key={tier.name}
                className="glass-card rounded-xl p-4 border border-border hover:border-border-gold transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg ${tier.bgColor} flex items-center justify-center`}
                  >
                    {index === 3 ? (
                      <Crown className="w-5 h-5 text-background" />
                    ) : (
                      <Star className={`w-5 h-5 ${tier.color}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${tier.color}`}>
                        {tier.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {tier.points} pts
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {tier.description}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Points Work */}
      <section className="px-4 py-16 max-w-md mx-auto">
        <h2 className="font-display text-2xl font-bold text-center text-foreground mb-8">
          How You Earn
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { action: "Attend a session", points: "+10", icon: Target },
            { action: "Host a session", points: "+25", icon: Users },
            { action: "Make a connection", points: "+5", icon: Zap },
            { action: "Share a lesson", points: "+15", icon: Flame },
            { action: "7-day streak", points: "+50", icon: Trophy },
            { action: "Get verified", points: "+100", icon: Shield },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="glass-card rounded-xl p-4 text-center"
              >
                <Icon className="w-6 h-6 mx-auto text-primary mb-2" />
                <p className="text-sm font-medium text-foreground">
                  {item.action}
                </p>
                <p className="text-lg font-bold text-gradient-gold">
                  {item.points}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 pb-24">
        <div className="max-w-md mx-auto glass-card rounded-2xl p-8 text-center border border-border-gold">
          <Rocket className="w-12 h-12 mx-auto text-primary mb-4" />
          <h2 className="font-display text-xl font-bold text-foreground mb-2">
            Ready to Play?
          </h2>
          <p className="text-muted-foreground mb-6">
            Complete your profile to start matching with the crypto community
          </p>
          <Button
            variant="gold"
            size="lg"
            className="w-full"
            onClick={() => navigate("/profile/edit")}
          >
            Complete Profile
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Manifesto;
