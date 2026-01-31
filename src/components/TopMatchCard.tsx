import React from "react";
import { cn } from "@/lib/utils";
import { Sparkles, Zap, Target, MapPin, Trophy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { EnergyBadge } from "./EnergyBadge";
import { CryptoFocusBadge } from "./CryptoFocusBadge";

interface MatchReason {
  type: "energy" | "crypto" | "location" | "skill";
  text: string;
}

interface TopMatchCardProps {
  name: string;
  avatarUrl?: string;
  energyStyle?: string;
  cryptoFocus?: string[];
  city?: string;
  matchScore: number;
  matchReasons: MatchReason[];
  className?: string;
  onConnect?: () => void;
}

const reasonIcons = {
  energy: Zap,
  crypto: Target,
  location: MapPin,
  skill: Trophy,
};

export const TopMatchCard: React.FC<TopMatchCardProps> = ({
  name,
  avatarUrl,
  energyStyle,
  cryptoFocus,
  city,
  matchScore,
  matchReasons,
  className,
  onConnect,
}) => {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-6 border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 relative overflow-hidden",
        className
      )}
    >
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-gold opacity-10 blur-3xl" />
      
      {/* Header with sparkle */}
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <span className="text-sm font-semibold text-primary">Top Match</span>
        <Badge variant="gold" className="ml-auto">
          {matchScore}% Match
        </Badge>
      </div>

      {/* Profile section */}
      <div className="flex items-start gap-4 mb-4">
        <Avatar className="w-16 h-16 border-2 border-primary">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="bg-primary/20 text-primary font-bold">
            {name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-display text-xl font-bold text-foreground mb-1">
            {name}
          </h3>
          {city && (
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {city}
            </p>
          )}
          <div className="flex flex-wrap gap-2 mt-2">
            {energyStyle && <EnergyBadge energy={energyStyle as "competitive" | "social" | "strategic" | "learning"} size="sm" />}
            {cryptoFocus?.slice(0, 2).map((focus) => (
              <CryptoFocusBadge key={focus} focus={focus.toLowerCase() as "defi" | "ai" | "infra" | "trading" | "vc" | "founder" | "gaming" | "nft" | "security" | "dao"} size="sm" />
            ))}
          </div>
        </div>
      </div>

      {/* Match reasons */}
      <div className="space-y-2 mb-4">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Why you match
        </h4>
        <div className="space-y-1.5">
          {matchReasons.map((reason, index) => {
            const Icon = reasonIcons[reason.type];
            return (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-foreground/80"
              >
                <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{reason.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Connect button */}
      <button
        onClick={onConnect}
        className="w-full py-3 rounded-xl bg-gradient-gold text-primary-foreground font-semibold text-sm transition-all hover:shadow-gold hover:scale-[1.02] active:scale-[0.98]"
      >
        Connect with {name.split(" ")[0]}
      </button>
    </div>
  );
};
