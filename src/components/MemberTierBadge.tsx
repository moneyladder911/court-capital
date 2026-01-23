import React from "react";
import { cn } from "@/lib/utils";
import { Crown, Shield, Star, Sparkles } from "lucide-react";

export type MemberTier = "explorer" | "core" | "elite" | "inner_circle";

interface MemberTierBadgeProps {
  tier: MemberTier;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const tierConfig: Record<MemberTier, {
  label: string;
  icon: React.ElementType;
  ringClass: string;
  badgeClass: string;
  glowClass: string;
}> = {
  explorer: {
    label: "Explorer",
    icon: Sparkles,
    ringClass: "ring-2 ring-muted-foreground/30",
    badgeClass: "bg-muted text-muted-foreground",
    glowClass: "",
  },
  core: {
    label: "Core",
    icon: Star,
    ringClass: "ring-2 ring-blue-500/50",
    badgeClass: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    glowClass: "shadow-[0_0_10px_rgba(59,130,246,0.3)]",
  },
  elite: {
    label: "Elite",
    icon: Shield,
    ringClass: "ring-2 ring-primary/60",
    badgeClass: "bg-gradient-gold text-primary-foreground",
    glowClass: "shadow-[0_0_15px_rgba(212,175,55,0.4)]",
  },
  inner_circle: {
    label: "Inner Circle",
    icon: Crown,
    ringClass: "ring-[3px] ring-primary animate-pulse-gold",
    badgeClass: "bg-gradient-to-r from-primary via-yellow-400 to-primary text-primary-foreground",
    glowClass: "shadow-[0_0_20px_rgba(212,175,55,0.6)]",
  },
};

export const MemberTierBadge: React.FC<MemberTierBadgeProps> = ({
  tier,
  size = "md",
  showLabel = true,
  className,
}) => {
  const config = tierConfig[tier];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-3 py-1 gap-1.5",
    lg: "text-base px-4 py-1.5 gap-2",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium transition-all",
        sizeClasses[size],
        config.badgeClass,
        config.glowClass,
        className
      )}
    >
      <Icon className={iconSizes[size]} />
      {showLabel && <span>{config.label}</span>}
    </span>
  );
};

// Avatar ring component for subtle status signaling
interface TierRingProps {
  tier: MemberTier;
  children: React.ReactNode;
  className?: string;
}

export const TierRing: React.FC<TierRingProps> = ({ tier, children, className }) => {
  const config = tierConfig[tier];

  return (
    <div
      className={cn(
        "rounded-full p-0.5",
        config.ringClass,
        config.glowClass,
        className
      )}
    >
      {children}
    </div>
  );
};

// Prestige border for cards
interface PrestigeBorderProps {
  tier: MemberTier;
  children: React.ReactNode;
  className?: string;
}

export const PrestigeBorder: React.FC<PrestigeBorderProps> = ({ tier, children, className }) => {
  if (tier === "explorer") {
    return <div className={className}>{children}</div>;
  }

  const borderClasses: Record<MemberTier, string> = {
    explorer: "",
    core: "border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.1)]",
    elite: "border-primary/40 shadow-[0_0_15px_rgba(212,175,55,0.15)]",
    inner_circle: "border-primary/60 shadow-[0_0_20px_rgba(212,175,55,0.25)]",
  };

  return (
    <div className={cn("border rounded-2xl", borderClasses[tier], className)}>
      {children}
    </div>
  );
};
