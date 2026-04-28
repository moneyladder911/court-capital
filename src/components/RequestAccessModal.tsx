import React, { useState, useEffect } from "react";
import { X, ArrowRight, ChevronDown } from "lucide-react";
import { supabase } from "../lib/supabase";

interface RequestAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequestAccessModal: React.FC<RequestAccessModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    social: "",
    level: "",
    partners: "",
    intent: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Reset after closing
      setTimeout(() => {
        setSubmitted(false);
        setIsSubmitting(false);
        setError(null);
        setFormData({ name: "", email: "", social: "", level: "", partners: "", intent: "" });
      }, 500);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: submitError } = await supabase
        .from('membership_applications')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            social: formData.social,
            level: formData.level,
            partners: formData.partners,
            intent: formData.intent,
          }
        ]);

      if (submitError) throw submitError;

      setSubmitted(true);
    } catch (err: any) {
      console.error('Error submitting application:', err);
      setError(err.message || 'An error occurred while submitting your application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
      
      <button
        onClick={onClose}
        className="absolute top-8 right-8 z-10 p-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <X size={24} strokeWidth={1} />
      </button>

      <div className="relative z-10 w-full max-w-[600px]">
        {!submitted ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-h-[85vh] overflow-y-auto custom-scrollbar pr-4 pb-8">
            <div className="mb-10 mt-8">
              <h2 className="font-display text-3xl md:text-4xl text-foreground">
                Apply for Membership.
              </h2>
              <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground mt-4">
                Global membership is strictly capped at 225.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Identity Section */}
              <div className="space-y-6">
                <div>
                  <label className="block font-sans text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                    Legal Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-border/50 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-sans"
                    placeholder="As it appears on your ID"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-border/50 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-sans"
                    placeholder="For formal correspondence"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                    Instagram / LinkedIn
                  </label>
                  <input
                    type="text"
                    name="social"
                    required
                    value={formData.social}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-border/50 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-sans"
                    placeholder="Link to primary profile"
                  />
                </div>
              </div>

              {/* Caliber Section */}
              <div className="space-y-6">
                <div>
                  <label className="block font-sans text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                    Your Network
                  </label>
                  <div className="relative">
                    <select
                      name="partners"
                      required
                      value={formData.partners}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-border/50 py-3 pr-8 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-sans appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="text-muted-foreground bg-background">What industry are you in / who do you represent?</option>
                      <option value="Finance / Private Equity" className="bg-background">Finance / Private Equity</option>
                      <option value="Real Estate / Development" className="bg-background">Real Estate / Development</option>
                      <option value="Sports / Entertainment" className="bg-background">Sports / Entertainment</option>
                      <option value="Technology / Founder" className="bg-background">Technology / Founder</option>
                      <option value="Other" className="bg-background">Other</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block font-sans text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                    Playing Level
                  </label>
                  <div className="relative">
                    <select
                      name="level"
                      required
                      value={formData.level}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-border/50 py-3 pr-8 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-sans appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="text-muted-foreground bg-background">Select your highest level</option>
                      <option value="Beginner" className="bg-background">Beginner</option>
                      <option value="Intermediate" className="bg-background">Intermediate</option>
                      <option value="Advanced" className="bg-background">Advanced</option>
                      <option value="Professional" className="bg-background">Professional</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Intent Section */}
              <div className="space-y-6">
                <div>
                  <label className="block font-sans text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                    Statement of Intent
                  </label>
                  <div className="relative">
                    <select
                      name="intent"
                      required
                      value={formData.intent}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-border/50 py-3 pr-8 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-sans appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="text-muted-foreground bg-background">Why are you seeking access?</option>
                      <option value="High-level competitive play" className="bg-background">High-level competitive play</option>
                      <option value="Elite networking & matchmaking" className="bg-background">Elite networking & matchmaking</option>
                      <option value="Professional coaching & development" className="bg-background">Professional coaching & development</option>
                      <option value="Exclusive social events" className="bg-background">Exclusive social events</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-4 mt-12 pt-8 border-t border-border/20">
                {error && (
                  <p className="text-destructive font-sans text-xs text-right w-full">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-3 font-sans text-[0.65rem] tracking-[0.2em] uppercase text-foreground hover:text-primary transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"} {!isSubmitting && <ArrowRight size={14} />}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in-95 duration-700 text-center">
            <div className="w-16 h-px bg-primary/40 mx-auto mb-10" />
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
              Application Under Review
            </h2>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-[400px] mx-auto mb-12">
              Global membership is strictly capped at 225 individuals. Your profile has been submitted to the SW management team. We will contact you at {formData.email || 'your email'} regarding your application status.
            </p>
            <button
              onClick={onClose}
              className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-primary hover:text-foreground transition-colors border-b border-primary/30 pb-1"
            >
              Return to site
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
