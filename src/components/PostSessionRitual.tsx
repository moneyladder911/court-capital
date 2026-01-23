import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Star, Zap, Brain, Heart, Coffee, Target, Sparkles, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type PostMood = "energized" | "challenged" | "inspired" | "tired" | "grateful" | "focused";

interface Participant {
  id: string;
  name: string;
  avatar?: string;
}

interface ParticipantRating {
  userId: string;
  reliability: number;
  energy: number;
}

interface PostSessionRitualProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionTitle: string;
  participants: Participant[];
  onComplete: (data: {
    participantRatings: ParticipantRating[];
    reflectionText: string;
    lessonText: string;
    lessonIsPublic: boolean;
    postMood: PostMood | null;
  }) => void;
}

const MOODS: { value: PostMood; icon: React.ReactNode; label: string; color: string }[] = [
  { value: "energized", icon: <Zap className="w-5 h-5" />, label: "Energized", color: "text-yellow-500" },
  { value: "challenged", icon: <Target className="w-5 h-5" />, label: "Challenged", color: "text-orange-500" },
  { value: "inspired", icon: <Sparkles className="w-5 h-5" />, label: "Inspired", color: "text-purple-500" },
  { value: "tired", icon: <Coffee className="w-5 h-5" />, label: "Tired", color: "text-muted-foreground" },
  { value: "grateful", icon: <Heart className="w-5 h-5" />, label: "Grateful", color: "text-pink-500" },
  { value: "focused", icon: <Brain className="w-5 h-5" />, label: "Focused", color: "text-blue-500" },
];

const StarRating: React.FC<{ value: number; onChange: (value: number) => void; label: string }> = ({
  value,
  onChange,
  label,
}) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs text-muted-foreground">{label}</span>
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="p-0.5 transition-transform hover:scale-110"
        >
          <Star
            className={cn(
              "w-5 h-5 transition-colors",
              star <= value ? "fill-primary text-primary" : "text-muted-foreground/30"
            )}
          />
        </button>
      ))}
    </div>
  </div>
);

export const PostSessionRitual: React.FC<PostSessionRitualProps> = ({
  open,
  onOpenChange,
  sessionTitle,
  participants,
  onComplete,
}) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Step 1: Ratings
  const [ratings, setRatings] = useState<ParticipantRating[]>(
    participants.map((p) => ({ userId: p.id, reliability: 0, energy: 0 }))
  );

  // Step 2: Reflection
  const [reflectionText, setReflectionText] = useState("");

  // Step 3: Lesson
  const [lessonText, setLessonText] = useState("");
  const [lessonIsPublic, setLessonIsPublic] = useState(false);

  // Step 4: Mood
  const [postMood, setPostMood] = useState<PostMood | null>(null);

  const updateRating = (userId: string, field: "reliability" | "energy", value: number) => {
    setRatings((prev) =>
      prev.map((r) => (r.userId === userId ? { ...r, [field]: value } : r))
    );
  };

  const handleComplete = () => {
    onComplete({
      participantRatings: ratings.filter((r) => r.reliability > 0 || r.energy > 0),
      reflectionText,
      lessonText,
      lessonIsPublic: lessonIsPublic && lessonText.length > 0,
      postMood,
    });
    onOpenChange(false);
    // Reset state
    setStep(1);
    setRatings(participants.map((p) => ({ userId: p.id, reliability: 0, energy: 0 })));
    setReflectionText("");
    setLessonText("");
    setLessonIsPublic(false);
    setPostMood(null);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return true; // Ratings are optional
      case 2:
        return true; // Reflection is optional
      case 3:
        return true; // Lesson is optional
      case 4:
        return true; // Mood is optional
      default:
        return true;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-display">
            Post-Session Ritual
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {sessionTitle}
          </DialogDescription>
        </DialogHeader>

        {/* Progress indicator */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors",
                i + 1 <= step ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>

        {/* Step 1: Rate Participants */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Rate Your Session Mates</h3>
              <p className="text-sm text-muted-foreground">
                How did everyone show up today?
              </p>
            </div>

            {participants.length > 0 ? (
              <div className="space-y-4">
                {participants.map((participant) => {
                  const rating = ratings.find((r) => r.userId === participant.id);
                  return (
                    <div
                      key={participant.id}
                      className="p-3 rounded-lg bg-muted/50 border border-border"
                    >
                      <div className="font-medium mb-2">{participant.name}</div>
                      <div className="grid grid-cols-2 gap-3">
                        <StarRating
                          label="Reliability"
                          value={rating?.reliability || 0}
                          onChange={(v) => updateRating(participant.id, "reliability", v)}
                        />
                        <StarRating
                          label="Energy"
                          value={rating?.energy || 0}
                          onChange={(v) => updateRating(participant.id, "energy", v)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No other participants to rate.
              </p>
            )}
          </div>
        )}

        {/* Step 2: Private Reflection */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Private Reflection</h3>
              <p className="text-sm text-muted-foreground">
                Just for you. What stood out today?
              </p>
            </div>

            <Textarea
              placeholder="How did you feel? What went well? What could be better next time?"
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              className="min-h-[120px] resize-none"
            />
          </div>
        )}

        {/* Step 3: Share a Lesson */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Share a Lesson</h3>
              <p className="text-sm text-muted-foreground">
                What clicked today? Inspire others with your insight.
              </p>
            </div>

            <Textarea
              placeholder="Today I learned... / The key insight was... / What worked was..."
              value={lessonText}
              onChange={(e) => setLessonText(e.target.value)}
              className="min-h-[100px] resize-none"
            />

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
              <div>
                <Label htmlFor="public-lesson" className="font-medium">
                  Make it public
                </Label>
                <p className="text-xs text-muted-foreground">
                  Share with the community
                </p>
              </div>
              <Switch
                id="public-lesson"
                checked={lessonIsPublic}
                onCheckedChange={setLessonIsPublic}
                disabled={lessonText.length === 0}
              />
            </div>
          </div>
        )}

        {/* Step 4: Emotional Closure */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">How Do You Feel?</h3>
              <p className="text-sm text-muted-foreground">
                Close the session with intention.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {MOODS.map((mood) => (
                <button
                  key={mood.value}
                  type="button"
                  onClick={() => setPostMood(mood.value)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-lg border transition-all",
                    postMood === mood.value
                      ? "border-primary bg-primary/10"
                      : "border-border bg-muted/30 hover:bg-muted/50"
                  )}
                >
                  <span className={mood.color}>{mood.icon}</span>
                  <span className="text-xs font-medium">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <Button onClick={() => setStep((s) => s + 1)} disabled={!canProceed()}>
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleComplete} className="gap-2">
              <Sparkles className="w-4 h-4" />
              Complete Ritual
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
