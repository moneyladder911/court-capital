import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Plus, X } from "lucide-react";
import { PadelIcon, TennisIcon, GolfIcon, GymIcon, RunningIcon, CombatIcon } from "@/components/icons/SportIcons";
import { Database } from "@/integrations/supabase/types";

type SportType = Database["public"]["Enums"]["sport_type"];

interface SportSkill {
  sport: SportType;
  skillLevel: number;
}

interface SportSkillEditorProps {
  value: SportSkill[];
  onChange: (value: SportSkill[]) => void;
}

const allSports: { value: SportType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "padel", label: "Padel", icon: PadelIcon },
  { value: "tennis", label: "Tennis", icon: TennisIcon },
  { value: "golf", label: "Golf", icon: GolfIcon },
  { value: "gym", label: "Gym", icon: GymIcon },
  { value: "running", label: "Running", icon: RunningIcon },
  { value: "combat", label: "Combat", icon: CombatIcon },
  { value: "yoga", label: "Yoga", icon: GymIcon },
  { value: "pilates", label: "Pilates", icon: GymIcon },
];

const getSkillLabel = (level: number): string => {
  if (level <= 2) return "Beginner";
  if (level <= 4) return "Learning";
  if (level <= 6) return "Intermediate";
  if (level <= 8) return "Advanced";
  return "Pro";
};

export const SportSkillEditor: React.FC<SportSkillEditorProps> = ({
  value,
  onChange,
}) => {
  const availableSports = allSports.filter(
    (s) => !value.some((v) => v.sport === s.value)
  );

  const addSport = (sport: SportType) => {
    onChange([...value, { sport, skillLevel: 5 }]);
  };

  const removeSport = (sport: SportType) => {
    onChange(value.filter((v) => v.sport !== sport));
  };

  const updateSkillLevel = (sport: SportType, skillLevel: number) => {
    onChange(
      value.map((v) => (v.sport === sport ? { ...v, skillLevel } : v))
    );
  };

  const getSportInfo = (sport: SportType) => {
    return allSports.find((s) => s.value === sport);
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-foreground">Sports & Skill Levels</label>

      {/* Current Sports */}
      <div className="space-y-3">
        {value.map((sportSkill) => {
          const sportInfo = getSportInfo(sportSkill.sport);
          if (!sportInfo) return null;
          const Icon = sportInfo.icon;

          return (
            <div
              key={sportSkill.sport}
              className="glass-card rounded-xl p-4 border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
                    <Icon className="w-5 h-5 text-background" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{sportInfo.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {getSkillLabel(sportSkill.skillLevel)} • Level {sportSkill.skillLevel}/10
                    </div>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSport(sportSkill.sport)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <Slider
                value={[sportSkill.skillLevel]}
                onValueChange={([val]) => updateSkillLevel(sportSkill.sport, val)}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Beginner</span>
                <span>Pro</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Sport */}
      {availableSports.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Add a sport:</p>
          <div className="flex flex-wrap gap-2">
            {availableSports.map((sport) => {
              const Icon = sport.icon;
              return (
                <Button
                  key={sport.value}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addSport(sport.value)}
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {sport.label}
                  <Plus className="w-3 h-3" />
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {value.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          Add at least one sport to get matched with others
        </p>
      )}
    </div>
  );
};
