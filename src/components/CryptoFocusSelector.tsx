import React from "react";
import { Badge } from "@/components/ui/badge";

const cryptoFocusOptions = [
  { value: "defi", label: "DeFi", emoji: "💰" },
  { value: "nft", label: "NFTs", emoji: "🎨" },
  { value: "ai", label: "AI", emoji: "🤖" },
  { value: "infra", label: "Infrastructure", emoji: "🔧" },
  { value: "gaming", label: "Gaming", emoji: "🎮" },
  { value: "trading", label: "Trading", emoji: "📈" },
  { value: "vc", label: "VC", emoji: "💎" },
  { value: "founder", label: "Founders", emoji: "🚀" },
  { value: "dev", label: "Development", emoji: "👨‍💻" },
  { value: "marketing", label: "Marketing", emoji: "📣" },
  { value: "l2", label: "Layer 2", emoji: "⚡" },
  { value: "dao", label: "DAOs", emoji: "🏛️" },
];

interface CryptoFocusSelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
  maxSelections?: number;
}

export const CryptoFocusSelector: React.FC<CryptoFocusSelectorProps> = ({
  value,
  onChange,
  maxSelections = 5,
}) => {
  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else if (value.length < maxSelections) {
      onChange([...value, optionValue]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">Crypto Focus</label>
        <span className="text-xs text-muted-foreground">
          {value.length}/{maxSelections} selected
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {cryptoFocusOptions.map((option) => {
          const isSelected = value.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleOption(option.value)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "glass-card text-muted-foreground hover:text-foreground hover:border-border-gold border border-transparent"
              }`}
            >
              <span>{option.emoji}</span>
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
      {value.length >= maxSelections && (
        <p className="text-xs text-muted-foreground">
          Maximum {maxSelections} focus areas allowed
        </p>
      )}
    </div>
  );
};
