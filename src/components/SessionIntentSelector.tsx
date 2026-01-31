import React from "react";
import { cn } from "@/lib/utils";
import { SessionIntent, SessionIntentBadge, sessionIntentOptions } from "./SessionIntentBadge";
import { Check } from "lucide-react";

interface SessionIntentSelectorProps {
  selected: SessionIntent[];
  onChange: (intents: SessionIntent[]) => void;
  className?: string;
}

export const SessionIntentSelector: React.FC<SessionIntentSelectorProps> = ({
  selected,
  onChange,
  className,
}) => {
  const toggleIntent = (intent: SessionIntent) => {
    if (selected.includes(intent)) {
      onChange(selected.filter((i) => i !== intent));
    } else {
      onChange([...selected, intent]);
    }
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {sessionIntentOptions.map((option) => {
        const isSelected = selected.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => toggleIntent(option.value)}
            className={cn(
              "relative transition-all duration-200",
              isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background rounded-full"
            )}
          >
            <SessionIntentBadge intent={option.value} size="md" />
            {isSelected && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-primary-foreground" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};
