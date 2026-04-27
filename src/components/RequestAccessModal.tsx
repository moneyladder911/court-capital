import React, { useState, useEffect } from "react";
import { X, ArrowRight, ArrowLeft } from "lucide-react";

interface RequestAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequestAccessModal: React.FC<RequestAccessModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    social: "",
    level: "",
    partners: "",
    intent: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Reset after closing
      setTimeout(() => {
        setStep(1);
        setSubmitted(false);
        setFormData({ name: "", email: "", social: "", level: "", partners: "", intent: "" });
      }, 500);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
      
      <button
        onClick={onClose}
        className="absolute top-8 right-8 z-10 p-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <X size={24} strokeWidth={1} />
      </button>

      <div className="relative z-10 w-full max-w-[600px] px-6">
        {!submitted ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-12">
              <p className="font-sans text-[0.6rem] font-medium tracking-[0.3em] uppercase text-primary mb-4">
                Step 0{step} / 03
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-foreground">
                {step === 1 && "Identity."}
                {step === 2 && "Caliber."}
                {step === 3 && "Intent."}
              </h2>
            </div>

            <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in duration-500">
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
              )}

              {step === 2 && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div>
                    <label className="block font-sans text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                      Playing Level
                    </label>
                    <input
                      type="text"
                      name="level"
                      required
                      value={formData.level}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-border/50 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-sans"
                      placeholder="e.g., Professional, Ex-Pro, Division 1"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                      Typical Opponents
                    </label>
                    <textarea
                      name="partners"
                      required
                      rows={3}
                      value={formData.partners}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-border/50 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-sans resize-none"
                      placeholder="Who do you usually train or compete with?"
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div>
                    <label className="block font-sans text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                      Statement of Intent
                    </label>
                    <textarea
                      name="intent"
                      required
                      rows={4}
                      value={formData.intent}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-border/50 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-sans resize-none"
                      placeholder="Why are you seeking access to the Padel House network?"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-12 pt-8 border-t border-border/20">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-2 font-sans text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="submit"
                  className="flex items-center gap-3 font-sans text-[0.65rem] tracking-[0.2em] uppercase text-foreground hover:text-primary transition-colors"
                >
                  {step === 3 ? "Submit Application" : "Continue"} <ArrowRight size={14} />
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
