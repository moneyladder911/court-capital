import React from "react";
import { Zap, Users, Target, BookOpen } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type EnergyStyle = Database["public"]["Enums"]["energy_style"];

interface EnergyStyleSelectorProps {
  value: EnergyStyle | null;
  onChange: (value: EnergyStyle) => void;
}

const energyStyles: {
  value: EnergyStyle;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}[] = [
  {
    value: "competitive",
    label: "Competitive",
    description: "You play to win and push limits",
    icon: Zap,
    color: "from-red-500 to-orange-500",
  },
  {
    value: "social",
    label: "Social",
    description: "You're here for the connections",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
  },
  {
    value: "strategic",
    label: "Strategic",
    description: "You think several moves ahead",
    icon: Target,
    color: "from-purple-500 to-violet-500",
  },
  {
    value: "learning",
    label: "Learning",
    description: "You're focused on improving",
    icon: BookOpen,
    color: "from-green-500 to-emerald-500",
  },
];

export const EnergyStyleSelector: React.FC<EnergyStyleSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">Energy Style</label>
      <div className="grid grid-cols-2 gap-3">
        {energyStyles.map((style) => {
          const Icon = style.icon;
          const isSelected = value === style.value;

          return (
            <button
              key={style.value}
              type="button"
              onClick={() => onChange(style.value)}
              className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-border-gold"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${style.color} flex items-center justify-center mb-3`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="font-medium text-foreground">{style.label}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {style.description}
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-primary-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
