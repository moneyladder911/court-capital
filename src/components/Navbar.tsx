import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  onRequestAccess: () => void;
}

const navLinks = [
  { label: "About", path: "/about" },
  { label: "Membership", path: "/membership" },
  { label: "The House", path: "/the-house" },
  { label: "Contact", path: "/contact" },
];

export const Navbar: React.FC<NavbarProps> = ({ onRequestAccess }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-[1fr_auto_1fr] items-center h-20">
            {/* Wordmark (Left) */}
            <div className="flex justify-start">
              <Link
                to="/"
                className="font-sans text-[0.65rem] md:text-[0.7rem] font-medium tracking-[0.3em] uppercase text-foreground hover:text-primary transition-colors duration-300"
              >
                Padel House
              </Link>
            </div>

            {/* Desktop nav (Center) */}
            <div className="hidden md:flex items-center justify-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-sans text-[0.6rem] font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side CTA & Mobile Hamburger */}
            <div className="flex items-center justify-end gap-4">
              <Link
                to="/login"
                className="hidden md:inline-flex border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-2.5 font-sans text-[0.6rem] font-medium tracking-[0.2em] uppercase transition-colors duration-300"
              >
                Members Portal
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden flex flex-col gap-[5px] p-2 ml-4"
                aria-label="Toggle menu"
              >
                <span
                  className={`block w-5 h-px bg-foreground transition-all duration-300 ${
                    mobileOpen ? "rotate-45 translate-y-[3px]" : ""
                  }`}
                />
                <span
                  className={`block w-5 h-px bg-foreground transition-all duration-300 ${
                    mobileOpen ? "-rotate-45 -translate-y-[3px]" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-display text-2xl tracking-wide transition-colors duration-300 ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="w-12 h-px bg-border/50 my-2" />

          <div className="flex flex-col items-center gap-6 mt-4">
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="font-sans text-[0.7rem] font-medium tracking-[0.2em] uppercase text-primary"
            >
              Members Portal
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
