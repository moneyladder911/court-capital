import React from "react";
import { cn } from "@/lib/utils";
import { Sun, Coffee, Briefcase, Moon, Calendar, Clock } from "lucide-react";

export type AvailabilityPattern = 
  | "early_bird" 
  | "lunch_warrior" 
  | "after_work" 
  | "night_owl" 
  | "weekends" 
  | "flexible";

interface AvailabilityBadgeProps {
  pattern: AvailabilityPattern;
  size?: "sm" | "md";
  className?: string;
}

const patternConfig: Record<AvailabilityPattern, {
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  time: string;
}> = {
  early_bird: {
    label: "Early Bird",
    shortLabel: "AM",
    icon: Sun,
    time: "6-9 AM",
  },
  lunch_warrior: {
    label: "Lunch Warrior",
    shortLabel: "Lunch",
    icon: Coffee,
    time: "12-2 PM",
  },
  after_work: {
    label: "After Work",
    shortLabel: "PM",
    icon: Briefcase,
    time: "5-8 PM",
  },
  night_owl: {
    label: "Night Owl",
    shortLabel: "Night",
    icon: Moon,
    time: "8 PM+",
  },
  weekends: {
    label: "Weekends",
    shortLabel: "Wknd",
    icon: Calendar,
    time: "Sat-Sun",
  },
  flexible: {
    label: "Flexible",
    shortLabel: "Flex",
    icon: Clock,
    time: "Anytime",
  },
};

export const AvailabilityBadge: React.FC<AvailabilityBadgeProps> = ({
  pattern,
  size = "sm",
  className,
}) => {
  const config = patternConfig[pattern];
  if (!config) return null;
  
  const Icon = config.icon;

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-2.5 py-1 gap-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        "text-muted-foreground bg-muted/50 border border-border",
        sizeClasses[size],
        className
      )}
      title={`${config.label} (${config.time})`}
    >
      <Icon className="w-3 h-3" />
      <span>{config.shortLabel}</span>
    </span>
  );
};

// Compact list of availability
interface AvailabilityListProps {
  patterns: AvailabilityPattern[];
  size?: "sm" | "md";
  className?: string;
}

export const AvailabilityList: React.FC<AvailabilityListProps> = ({
  patterns,
  size = "sm",
  className,
}) => {
  if (!patterns.length) return null;

  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {patterns.map((pattern) => (
        <AvailabilityBadge key={pattern} pattern={pattern} size={size} />
      ))}
    </div>
  );
};

// All available options for forms
export const AVAILABILITY_OPTIONS: { value: AvailabilityPattern; label: string; time: string }[] = [
  { value: "early_bird", label: "Early Bird", time: "6-9 AM" },
  { value: "lunch_warrior", label: "Lunch Warrior", time: "12-2 PM" },
  { value: "after_work", label: "After Work", time: "5-8 PM" },
  { value: "night_owl", label: "Night Owl", time: "8 PM+" },
  { value: "weekends", label: "Weekends", time: "Sat-Sun" },
  { value: "flexible", label: "Flexible", time: "Anytime" },
];
