import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Invalid credentials. Please contact the concierge if you need access.");
      setLoading(false);
      return;
    }

    navigate("/portal");
  };

  return (
    <div className="min-h-screen bg-background noise-overlay flex flex-col">
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, hsl(39 45% 61% / 0.04) 0%, transparent 70%)",
        }}
      />

      {/* Minimal Header */}
      <header className="absolute top-0 left-0 right-0 p-8 flex justify-center">
        <Link
          to="/"
          className="font-sans text-[0.65rem] font-medium tracking-[0.3em] uppercase text-foreground hover:text-primary transition-colors"
        >
          Padel House
        </Link>
      </header>

      {/* Main Form Area */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[380px]">
          {/* Mark */}
          <div className="flex justify-center mb-10">
            <div className="w-10 h-10 border border-primary/30 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full" />
            </div>
          </div>

          <div className="text-center mb-10">
            <h1 className="font-display text-2xl text-foreground mb-3">Member Portal</h1>
            <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground">
              Restricted Access
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-border/50 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-sans"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-border/50 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors font-sans"
              />
            </div>

            {error && (
              <p className="font-sans text-xs text-red-400/80 mt-2 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-foreground text-background py-4 font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase hover:bg-primary hover:text-foreground transition-all duration-300 mt-8 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border border-background/30 border-t-background rounded-full animate-spin" />
                  <span>Verifying</span>
                </>
              ) : (
                "Enter the House"
              )}
            </button>
          </form>

          <div className="mt-12 text-center space-y-4">
            <a
              href="mailto:concierge@courtcapital.com"
              className="block font-sans text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact Concierge
            </a>
            <Link
              to="/"
              className="block font-sans text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Return to Public Site
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
