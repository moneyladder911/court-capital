import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { SessionIntentSelector } from "@/components/SessionIntentSelector";
import { SessionIntent } from "@/components/SessionIntentBadge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Users,
  Dumbbell,
} from "lucide-react";
import { PadelIcon, TennisIcon, GolfIcon, GymIcon, RunningIcon, CombatIcon, YogaIcon, PilatesIcon } from "@/components/icons/SportIcons";

const sportOptions = [
  { id: "padel", label: "Padel", icon: PadelIcon },
  { id: "tennis", label: "Tennis", icon: TennisIcon },
  { id: "golf", label: "Golf", icon: GolfIcon },
  { id: "gym", label: "Gym", icon: GymIcon },
  { id: "running", label: "Running", icon: RunningIcon },
  { id: "combat", label: "Combat", icon: CombatIcon },
  { id: "yoga", label: "Yoga", icon: YogaIcon },
  { id: "pilates", label: "Pilates", icon: PilatesIcon },
];

const skillLevels = ["beginner", "intermediate", "advanced", "all_levels"];

export const CreateSession: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [sport, setSport] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("4");
  const [skillLevel, setSkillLevel] = useState("all_levels");
  const [cryptoFocus, setCryptoFocus] = useState("");
  const [sessionIntent, setSessionIntent] = useState<SessionIntent[]>([]);
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to create a session.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!sport || !title || !location || !date || !time) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const scheduledAt = new Date(`${date}T${time}`).toISOString();

      const { error } = await supabase.from("sessions").insert({
        host_id: user.id,
        title,
        sport,
        location,
        scheduled_at: scheduledAt,
        max_participants: parseInt(maxParticipants),
        skill_level: skillLevel,
        crypto_focus: cryptoFocus || null,
        session_intent: sessionIntent,
        description: description || null,
      });

      if (error) throw error;

      toast({
        title: "Session created!",
        description: "Your session has been created successfully.",
      });

      navigate("/");
    } catch (error) {
      console.error("Error creating session:", error);
      toast({
        title: "Error",
        description: "Failed to create session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 glass-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-display text-lg font-bold">Create Session</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pb-32 pt-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sport Selection */}
          <div className="space-y-3">
            <Label>Sport *</Label>
            <div className="grid grid-cols-4 gap-2">
              {sportOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = sport === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSport(option.id)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "glass-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-xs">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Session Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Morning Padel - DeFi Founders"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="e.g., Dubai Marina Courts"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          {/* Max Participants */}
          <div className="space-y-2">
            <Label htmlFor="maxParticipants">Max Participants</Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="maxParticipants"
                type="number"
                min="2"
                max="20"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Skill Level */}
          <div className="space-y-3">
            <Label>Skill Level</Label>
            <div className="flex flex-wrap gap-2">
              {skillLevels.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSkillLevel(level)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    skillLevel === level
                      ? "bg-primary text-primary-foreground"
                      : "glass-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {level.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>

          {/* Session Intent */}
          <div className="space-y-3">
            <Label>Session Intent (Optional)</Label>
            <p className="text-xs text-muted-foreground">
              Help others know what kind of networking you're open to
            </p>
            <SessionIntentSelector
              selected={sessionIntent}
              onChange={setSessionIntent}
            />
          </div>

          {/* Crypto Focus */}
          <div className="space-y-2">
            <Label htmlFor="cryptoFocus">Crypto Focus (Optional)</Label>
            <Input
              id="cryptoFocus"
              placeholder="e.g., DeFi, NFTs, L2s..."
              value={cryptoFocus}
              onChange={(e) => setCryptoFocus(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <textarea
              id="description"
              placeholder="Add any additional details about your session..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="gold"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Session"}
          </Button>
        </form>
      </main>

      <BottomNav />
    </div>
  );
};

export default CreateSession;
