import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Users,
  Zap,
  Check,
  Target,
} from "lucide-react";
import { PadelIcon, TennisIcon, GolfIcon, GymIcon, RunningIcon, CombatIcon, YogaIcon, PilatesIcon } from "@/components/icons/SportIcons";

const sports = [
  { id: "padel", name: "Padel", icon: PadelIcon },
  { id: "tennis", name: "Tennis", icon: TennisIcon },
  { id: "golf", name: "Golf", icon: GolfIcon },
  { id: "gym", name: "Gym", icon: GymIcon },
  { id: "running", name: "Running", icon: RunningIcon },
  { id: "combat", name: "Combat", icon: CombatIcon },
  { id: "yoga", name: "Yoga", icon: YogaIcon },
  { id: "pilates", name: "Pilates", icon: PilatesIcon },
];

const skillLevels = ["Beginner", "Intermediate", "Advanced", "Pro"];
const cryptoFocusOptions = ["Casual", "Networking", "Founders Only", "Investors Welcome"];

import { SessionIntent } from "@/components/SessionIntentBadge";
import { SessionIntentSelector } from "@/components/SessionIntentSelector";

const CreateSession = () => {
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("4");
  const [skillLevel, setSkillLevel] = useState("Intermediate");
  const [cryptoFocus, setCryptoFocus] = useState<string | null>(null);
  const [sessionIntent, setSessionIntent] = useState<SessionIntent[]>([]);
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit to backend
    console.log({
      sport: selectedSport,
      title,
      location,
      date,
      time,
      maxParticipants,
      skillLevel,
      cryptoFocus,
      sessionIntent,
      description,
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <Header />

      <main className="max-w-md mx-auto px-4 py-4 space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>

        <div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-1">
            Create Session
          </h1>
          <p className="text-muted-foreground text-sm">
            Host a training session and connect with elite players
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sport Selection */}
          <div className="space-y-3">
            <Label className="text-foreground">Sport *</Label>
            <div className="grid grid-cols-3 gap-2">
              {sports.map((sport) => {
                const Icon = sport.icon;
                return (
                  <button
                    key={sport.id}
                    type="button"
                    onClick={() => setSelectedSport(sport.id)}
                    className={`glass-card rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${
                      selectedSport === sport.id
                        ? "border-2 border-primary bg-primary/10"
                        : "border border-border hover:border-border-gold"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        selectedSport === sport.id ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        selectedSport === sport.id ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {sport.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground">Session Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Morning Padel Match"
              className="bg-card border-border"
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-foreground">Location *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Club name or address"
                className="pl-10 bg-card border-border"
                required
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-foreground">Date *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-10 bg-card border-border"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="text-foreground">Time *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="pl-10 bg-card border-border"
                  required
                />
              </div>
            </div>
          </div>

          {/* Participants */}
          <div className="space-y-2">
            <Label htmlFor="participants" className="text-foreground">Max Participants</Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="participants"
                type="number"
                min="2"
                max="20"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>
          </div>

          {/* Skill Level */}
          <div className="space-y-3">
            <Label className="text-foreground">Skill Level</Label>
            <div className="flex flex-wrap gap-2">
              {skillLevels.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSkillLevel(level)}
                  className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    skillLevel === level
                      ? "bg-primary text-primary-foreground"
                      : "glass-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Crypto Focus */}
          <div className="space-y-3">
            <Label className="text-foreground flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Crypto Focus (Optional)
            </Label>
            <div className="flex flex-wrap gap-2">
              {cryptoFocusOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setCryptoFocus(cryptoFocus === option ? null : option)}
                  className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    cryptoFocus === option
                      ? "bg-gradient-gold text-primary-foreground"
                      : "glass-card text-muted-foreground hover:text-foreground border border-border"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Session Intent */}
          <div className="space-y-3">
            <Label className="text-foreground flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Session Intent (Optional)
            </Label>
            <p className="text-xs text-muted-foreground">
              Help others find sessions that match their goals
            </p>
            <SessionIntentSelector
              selected={sessionIntent}
              onChange={setSessionIntent}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">Description (Optional)</Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add any details about the session..."
              rows={3}
              className="w-full rounded-lg bg-card border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="gold"
            size="xl"
            className="w-full"
            disabled={!selectedSport || !title || !location || !date || !time}
          >
            <Check className="w-5 h-5 mr-2" />
            Create Session
          </Button>
        </form>
      </main>
    </div>
  );
};

export default CreateSession;
