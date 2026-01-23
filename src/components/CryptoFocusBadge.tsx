import React from "react";
import { cn } from "@/lib/utils";
import { 
  Coins, 
  Bot, 
  Server, 
  TrendingUp, 
  Briefcase, 
  Rocket, 
  Gamepad2, 
  Palette,
  Shield,
  Globe
} from "lucide-react";

export type CryptoFocus = 
  | "defi" 
  | "ai" 
  | "infra" 
  | "trading" 
  | "vc" 
  | "founder" 
  | "gaming" 
  | "nft" 
  | "security"
  | "dao";

interface CryptoFocusBadgeProps {
  focus: CryptoFocus;
  size?: "sm" | "md";
  className?: string;
}

const focusConfig: Record<CryptoFocus, {
  label: string;
  icon: React.ElementType;
  colorClass: string;
}> = {
  defi: {
    label: "DeFi",
    icon: Coins,
    colorClass: "text-emerald-400 bg-emerald-500/15 border-emerald-500/25",
  },
  ai: {
    label: "AI",
    icon: Bot,
    colorClass: "text-violet-400 bg-violet-500/15 border-violet-500/25",
  },
  infra: {
    label: "Infra",
    icon: Server,
    colorClass: "text-slate-400 bg-slate-500/15 border-slate-500/25",
  },
  trading: {
    label: "Trading",
    icon: TrendingUp,
    colorClass: "text-amber-400 bg-amber-500/15 border-amber-500/25",
  },
  vc: {
    label: "VC",
    icon: Briefcase,
    colorClass: "text-blue-400 bg-blue-500/15 border-blue-500/25",
  },
  founder: {
    label: "Founder",
    icon: Rocket,
    colorClass: "text-rose-400 bg-rose-500/15 border-rose-500/25",
  },
  gaming: {
    label: "Gaming",
    icon: Gamepad2,
    colorClass: "text-pink-400 bg-pink-500/15 border-pink-500/25",
  },
  nft: {
    label: "NFT",
    icon: Palette,
    colorClass: "text-cyan-400 bg-cyan-500/15 border-cyan-500/25",
  },
  security: {
    label: "Security",
    icon: Shield,
    colorClass: "text-red-400 bg-red-500/15 border-red-500/25",
  },
  dao: {
    label: "DAO",
    icon: Globe,
    colorClass: "text-teal-400 bg-teal-500/15 border-teal-500/25",
  },
};

export const CryptoFocusBadge: React.FC<CryptoFocusBadgeProps> = ({
  focus,
  size = "sm",
  className,
}) => {
  const config = focusConfig[focus];
  if (!config) return null;
  
  const Icon = config.icon;

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-2.5 py-1 gap-1.5",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium border",
        sizeClasses[size],
        config.colorClass,
        className
      )}
    >
      <Icon className={iconSizes[size]} />
      <span>{config.label}</span>
    </span>
  );
};

// List of crypto focus badges
interface CryptoFocusListProps {
  focuses: CryptoFocus[];
  size?: "sm" | "md";
  max?: number;
  className?: string;
}

export const CryptoFocusList: React.FC<CryptoFocusListProps> = ({
  focuses,
  size = "sm",
  max = 3,
  className,
}) => {
  const displayFocuses = focuses.slice(0, max);
  const remaining = focuses.length - max;

  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {displayFocuses.map((focus) => (
        <CryptoFocusBadge key={focus} focus={focus} size={size} />
      ))}
      {remaining > 0 && (
        <span className="text-xs text-muted-foreground self-center">
          +{remaining}
        </span>
      )}
    </div>
  );
};

// All available crypto focus options for forms
export const CRYPTO_FOCUS_OPTIONS: { value: CryptoFocus; label: string }[] = [
  { value: "defi", label: "DeFi" },
  { value: "ai", label: "AI" },
  { value: "infra", label: "Infrastructure" },
  { value: "trading", label: "Trading" },
  { value: "vc", label: "Venture Capital" },
  { value: "founder", label: "Founder" },
  { value: "gaming", label: "Gaming" },
  { value: "nft", label: "NFT/Art" },
  { value: "security", label: "Security" },
  { value: "dao", label: "DAOs" },
];
