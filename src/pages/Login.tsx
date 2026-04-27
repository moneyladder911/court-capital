import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Illusion of a real login
    setError("Invalid credentials or membership not found. Please contact the concierge.");
  };

  return (
    <div className="min-h-screen bg-background noise-overlay flex flex-col">
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
              <p className="font-sans text-xs text-red-400/80 mt-2 text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-foreground text-background py-4 font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase hover:bg-primary hover:text-foreground transition-all duration-300 mt-8"
            >
              Sign In
            </button>
          </form>

          <div className="mt-12 text-center space-y-4">
            <a
              href="mailto:concierge@sw.vip"
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
