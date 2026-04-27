import React from "react";
import { Link } from "react-router-dom";

interface FooterProps {
  onRequestAccess: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onRequestAccess }) => {
  return (
    <footer className="py-14 md:py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Top divider */}
        <div className="divider mb-16" />



        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
          {/* Left — brand & location */}
          <div>
            <p className="font-sans text-[0.65rem] font-medium tracking-[0.3em] uppercase text-foreground mb-4">
              Padel House
            </p>
            <p className="font-display text-xl text-foreground mb-2">
              Dubai | Marbella | London
            </p>
            <p className="font-sans text-xs text-muted-foreground/60 italic">
              Exact location disclosed upon membership confirmation.
            </p>
          </div>

          {/* Center — links */}
          <div className="flex items-center gap-8">
            <button
              onClick={onRequestAccess}
              className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Request Access
            </button>
          </div>

          {/* Right — social/legal & login */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <div className="flex items-center gap-3 font-sans text-[0.65rem] tracking-[0.2em] font-medium text-muted-foreground uppercase">
              <a href="#" className="hover:text-primary transition-colors">
                Instagram
              </a>
              <span className="text-muted-foreground/30">/</span>
              <a href="#" className="hover:text-primary transition-colors">
                LinkedIn
              </a>
              <span className="text-muted-foreground/30">/</span>
              <a href="#" className="hover:text-primary transition-colors">
                X
              </a>
            </div>
            
            <div className="flex flex-col items-start md:items-end gap-2">
              <Link
                to="/login"
                className="font-sans text-[0.6rem] text-muted-foreground hover:text-foreground tracking-wider transition-colors"
              >
                Member Login
              </Link>
              <div className="flex items-center gap-3 font-sans text-[0.6rem] text-muted-foreground/60 tracking-wider mt-1">
                <a href="#" className="hover:text-foreground transition-colors">Terms & Conditions</a>
                <span>|</span>
                <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              </div>
              <p className="font-sans text-[0.6rem] text-muted-foreground/60 tracking-wider mt-2 md:mt-0 flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                <span>© {new Date().getFullYear()} Padel House</span>
                <span className="hidden md:inline">|</span>
                <a href="https://onyxatelier.tech/" target="_blank" rel="noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                  Digital Experience by Onyx Atelier — Learn More
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
