import React from "react";
import { cn } from "@/lib/utils";
import { Flame, Users, Brain, GraduationCap } from "lucide-react";

export type EnergyStyle = "competitive" | "social" | "strategic" | "learning";

interface EnergyBadgeProps {
  energy: EnergyStyle;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const energyConfig: Record<EnergyStyle, {
  label: string;
  emoji: string;
  icon: React.ElementType;
  colorClass: string;
  bgClass: string;
}> = {
  competitive: {
    label: "Competitive",
    emoji: "🔥",
    icon: Flame,
    colorClass: "text-orange-400",
    bgClass: "bg-orange-500/20 border-orange-500/30",
  },
  social: {
    label: "Social",
    emoji: "🤝",
    icon: Users,
    colorClass: "text-green-400",
    bgClass: "bg-green-500/20 border-green-500/30",
  },
  strategic: {
    label: "Strategic",
    emoji: "🧠",
    icon: Brain,
    colorClass: "text-purple-400",
    bgClass: "bg-purple-500/20 border-purple-500/30",
  },
  learning: {
    label: "Learning",
    emoji: "📚",
    icon: GraduationCap,
    colorClass: "text-blue-400",
    bgClass: "bg-blue-500/20 border-blue-500/30",
  },
};

export const EnergyBadge: React.FC<EnergyBadgeProps> = ({
  energy,
  size = "md",
  showLabel = true,
  className,
}) => {
  const config = energyConfig[energy];

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
        "inline-flex items-center rounded-full font-medium border transition-all",
        sizeClasses[size],
        config.bgClass,
        config.colorClass,
        className
      )}
    >
      <span className={iconSizes[size]}>{config.emoji}</span>
      {showLabel && <span>{config.label}</span>}
    </span>
  );
};

// Compact version just showing emoji
export const EnergyIndicator: React.FC<{ energy: EnergyStyle; className?: string }> = ({
  energy,
  className,
}) => {
  const config = energyConfig[energy];
  
  return (
    <span 
      className={cn("text-sm", className)} 
      title={config.label}
    >
      {config.emoji}
    </span>
  );
};
