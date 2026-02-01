import React from "react";
import { Sun, Coffee, Briefcase, Moon, Calendar, Clock } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type AvailabilityPattern = Database["public"]["Enums"]["availability_pattern"];

interface AvailabilitySelectorProps {
  value: AvailabilityPattern[];
  onChange: (value: AvailabilityPattern[]) => void;
}

const availabilityOptions: {
  value: AvailabilityPattern;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  time: string;
}[] = [
  {
    value: "early_bird",
    label: "Early Bird",
    description: "5 AM - 8 AM",
    icon: Sun,
    time: "🌅",
  },
  {
    value: "lunch_warrior",
    label: "Lunch Warrior",
    description: "12 PM - 2 PM",
    icon: Coffee,
    time: "☀️",
  },
  {
    value: "after_work",
    label: "After Work",
    description: "5 PM - 8 PM",
    icon: Briefcase,
    time: "🌆",
  },
  {
    value: "night_owl",
    label: "Night Owl",
    description: "8 PM - 11 PM",
    icon: Moon,
    time: "🌙",
  },
  {
    value: "weekends",
    label: "Weekends",
    description: "Sat & Sun",
    icon: Calendar,
    time: "📅",
  },
  {
    value: "flexible",
    label: "Flexible",
    description: "Anytime",
    icon: Clock,
    time: "⏰",
  },
];

export const AvailabilitySelector: React.FC<AvailabilitySelectorProps> = ({
  value,
  onChange,
}) => {
  const toggleOption = (optionValue: AvailabilityPattern) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">
        When do you usually play?
      </label>
      <div className="grid grid-cols-2 gap-2">
        {availabilityOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = value.includes(option.value);

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleOption(option.value)}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-border-gold"
              }`}
            >
              <span className="text-xl">{option.time}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-foreground truncate">
                  {option.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {option.description}
                </div>
              </div>
              {isSelected && (
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
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
      <p className="text-xs text-muted-foreground">
        Select all time slots when you're typically available
      </p>
    </div>
  );
};
