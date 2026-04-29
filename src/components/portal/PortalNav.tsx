import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCurrentProfile } from "@/hooks/useProfile";

const navItems = [
  {
    to: "/portal",
    end: true,
    label: "Home",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    to: "/portal/matches",
    label: "Matches",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M4.93 4.93c4.1 4.1 10.14 4.1 14.14 0M4.93 19.07c4.1-4.1 10.14-4.1 14.14 0" />
        <path d="M12 2v20M2 12h20" />
      </svg>
    ),
  },
  {
    to: "/portal/training",
    label: "Training",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    to: "/portal/events",
    label: "Events",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
  },
  {
    to: "/portal/lounge",
    label: "The Lounge",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

export function PortalNav({ onClose }: { onClose?: () => void }) {
  const { signOut } = useAuth();
  const { data: profile } = useCurrentProfile();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const initials = profile?.name
    ? profile.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div className="flex flex-col h-full py-8">
      {/* Logo */}
      <div className="px-6 mb-10">
        <span className="font-display text-base text-foreground">Padel House</span>
        <p className="font-sans text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground mt-0.5">
          Member Portal
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md font-sans text-[0.75rem] tracking-wide transition-all duration-200 group ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/3"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`transition-colors ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {isActive && (
                  <span className="ml-auto w-1 h-1 rounded-full bg-primary" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Member + Logout */}
      <div className="px-4 pt-6 border-t border-border/50 space-y-3">
        <NavLink
          to="/portal/profile"
          onClick={onClose}
          className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/3 transition-all group"
        >
          <div className="w-7 h-7 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="font-sans text-[0.6rem] font-medium text-primary">{initials}</span>
          </div>
          <div className="min-w-0">
            <p className="font-sans text-xs text-foreground truncate">{profile?.name || "Member"}</p>
            <p className="font-sans text-[0.6rem] text-muted-foreground capitalize">{profile?.member_tier || "member"}</p>
          </div>
        </NavLink>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md font-sans text-[0.7rem] tracking-wide text-muted-foreground hover:text-foreground hover:bg-white/3 transition-all"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign Out
        </button>
      </div>
    </div>
  );
}
