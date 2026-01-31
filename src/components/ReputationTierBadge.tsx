import React from "react";
import { cn } from "@/lib/utils";
import { Crown, Star, Users } from "lucide-react";

type ReputationTier = "member" | "pioneer" | "catalyst";

interface ReputationTierBadgeProps {
  tier: ReputationTier;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const tierConfig = {
  member: {
    label: "Member",
    icon: Users,
    bgClass: "bg-muted",
    textClass: "text-muted-foreground",
    borderClass: "border-border",
  },
  pioneer: {
    label: "Pioneer",
    icon: Star,
    bgClass: "bg-primary/20",
    textClass: "text-primary",
    borderClass: "border-primary/50",
  },
  catalyst: {
    label: "Catalyst",
    icon: Crown,
    bgClass: "bg-gradient-gold",
    textClass: "text-primary-foreground",
    borderClass: "border-primary",
  },
};

export const ReputationTierBadge: React.FC<ReputationTierBadgeProps> = ({
  tier,
  size = "md",
  showLabel = true,
  className,
}) => {
  const config = tierConfig[tier];
  const Icon = config.icon;

  const sizeClasses = {
    sm: {
      container: "px-2 py-0.5 gap-1",
      icon: "w-3 h-3",
      text: "text-xs",
    },
    md: {
      container: "px-3 py-1 gap-1.5",
      icon: "w-4 h-4",
      text: "text-sm",
    },
    lg: {
      container: "px-4 py-1.5 gap-2",
      icon: "w-5 h-5",
      text: "text-base",
    },
  };

  const { container, icon, text } = sizeClasses[size];

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border font-medium transition-all",
        config.bgClass,
        config.borderClass,
        container,
        tier === "catalyst" && "shadow-gold",
        className
      )}
    >
      <Icon className={cn(icon, config.textClass)} />
      {showLabel && (
        <span className={cn(text, config.textClass)}>{config.label}</span>
      )}
    </div>
  );
};
