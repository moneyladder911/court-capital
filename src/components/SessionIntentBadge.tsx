import React from "react";
import { cn } from "@/lib/utils";
import { DollarSign, Users, Lock, Handshake } from "lucide-react";

export type SessionIntent = "fundraising" | "hiring" | "alpha_only" | "social_networking";

interface SessionIntentBadgeProps {
  intent: SessionIntent;
  size?: "sm" | "md";
  className?: string;
}

const intentConfig: Record<SessionIntent, { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  fundraising: {
    label: "#Fundraising",
    icon: DollarSign,
    color: "bg-success/20 text-success border-success/30",
  },
  hiring: {
    label: "#Hiring",
    icon: Users,
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  alpha_only: {
    label: "#AlphaOnly",
    icon: Lock,
    color: "bg-primary/20 text-primary border-primary/30",
  },
  social_networking: {
    label: "#SocialNetworking",
    icon: Handshake,
    color: "bg-accent/20 text-accent border-accent/30",
  },
};

export const SessionIntentBadge: React.FC<SessionIntentBadgeProps> = ({
  intent,
  size = "sm",
  className,
}) => {
  const config = intentConfig[intent];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-3 py-1 text-sm gap-1.5",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        config.color,
        sizeClasses[size],
        className
      )}
    >
      <Icon className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
      <span>{config.label}</span>
    </div>
  );
};

export const sessionIntentOptions: { value: SessionIntent; label: string }[] = [
  { value: "fundraising", label: "#Fundraising" },
  { value: "hiring", label: "#Hiring" },
  { value: "alpha_only", label: "#AlphaOnly" },
  { value: "social_networking", label: "#SocialNetworking" },
];
