import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { EnergyStyleSelector } from "@/components/EnergyStyleSelector";
import { CryptoFocusSelector } from "@/components/CryptoFocusSelector";
import { SportSkillEditor } from "@/components/SportSkillEditor";
import { AvailabilitySelector } from "@/components/AvailabilitySelector";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { useCurrentProfile, useUpdateProfile, useUpdateUserSports } from "@/hooks/useProfile";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";

type EnergyStyle = Database["public"]["Enums"]["energy_style"];
type AvailabilityPattern = Database["public"]["Enums"]["availability_pattern"];
type SportType = Database["public"]["Enums"]["sport_type"];

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: profile, isLoading: profileLoading } = useCurrentProfile();
  const updateProfile = useUpdateProfile();
  const updateSports = useUpdateUserSports();

  // Form state
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [energyStyle, setEnergyStyle] = useState<EnergyStyle | null>(null);
  const [cryptoFocus, setCryptoFocus] = useState<string[]>([]);
  const [availability, setAvailability] = useState<AvailabilityPattern[]>([]);
  const [sports, setSports] = useState<{ sport: SportType; skillLevel: number }[]>([]);

  // Initialize form with profile data
  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setBio(profile.bio || "");
      setCity(profile.city || "");
      setEnergyStyle(profile.energy_style || null);
      setCryptoFocus(profile.crypto_focus || []);
      setAvailability(profile.availability || []);
      setSports(
        profile.sports.map((s) => ({
          sport: s.sport,
          skillLevel: s.skill_level || 5,
        }))
      );
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      // Update profile
      await updateProfile.mutateAsync({
        name,
        bio,
        city,
        energy_style: energyStyle,
        crypto_focus: cryptoFocus,
        availability,
      });

      // Update sports
      await updateSports.mutateAsync(
        sports.map((s) => ({
          sport: s.sport,
          skill_level: s.skillLevel,
        }))
      );

      toast({
        title: "Profile Updated! ✨",
        description: "Your changes have been saved",
      });

      navigate("/profile");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save profile",
        variant: "destructive",
      });
    }
  };

  const isSaving = updateProfile.isPending || updateSports.isPending;

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="max-w-md mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">
              Edit Profile
            </h1>
            <p className="text-sm text-muted-foreground">
              Customize your CHAINPLAY identity
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Basic Info */}
          <section className="glass-card rounded-xl p-4 space-y-4">
            <h2 className="font-medium text-foreground">Basic Info</h2>

            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Dubai, UAE"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell others about yourself..."
                rows={3}
              />
            </div>
          </section>

          {/* Energy Style */}
          <section className="glass-card rounded-xl p-4">
            <EnergyStyleSelector
              value={energyStyle}
              onChange={setEnergyStyle}
            />
          </section>

          {/* Crypto Focus */}
          <section className="glass-card rounded-xl p-4">
            <CryptoFocusSelector
              value={cryptoFocus}
              onChange={setCryptoFocus}
              maxSelections={5}
            />
          </section>

          {/* Sports */}
          <section className="glass-card rounded-xl p-4">
            <SportSkillEditor value={sports} onChange={setSports} />
          </section>

          {/* Availability */}
          <section className="glass-card rounded-xl p-4">
            <AvailabilitySelector
              value={availability}
              onChange={setAvailability}
            />
          </section>

          {/* Save Button */}
          <Button
            variant="gold"
            size="lg"
            className="w-full"
            onClick={handleSave}
            disabled={isSaving || !name.trim()}
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default ProfileEdit;
