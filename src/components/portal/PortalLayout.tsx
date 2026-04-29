import { Outlet, NavLink } from "react-router-dom";
import { PortalNav } from "./PortalNav";
import { useIsMobile } from "@/hooks/use-mobile";

const BOTTOM_TABS = [
  {
    to: "/portal",
    end: true,
    label: "Home",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
        <path d="M9 21V12h6v9" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    to: "/portal/matches",
    label: "Matches",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" fill={active ? "currentColor" : "none"} />
        <path d="M4.93 4.93c4.1 4.1 10.14 4.1 14.14 0M4.93 19.07c4.1-4.1 10.14-4.1 14.14 0" stroke={active ? "hsl(0 0% 4%)" : "currentColor"} />
        <path d="M12 2v20M2 12h20" stroke={active ? "hsl(0 0% 4%)" : "currentColor"} />
      </svg>
    ),
  },
  {
    to: "/portal/training",
    label: "Training",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    to: "/portal/events",
    label: "Events",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" fill={active ? "currentColor" : "none"} />
        <path d="M16 2v4M8 2v4M3 10h18" stroke={active ? "hsl(0 0% 4%)" : "currentColor"} />
      </svg>
    ),
  },
  {
    to: "/portal/lounge",
    label: "Lounge",
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

export function PortalLayout() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background flex">
      {/* ── Desktop Sidebar ── */}
      {!isMobile && (
        <aside
          className="fixed left-0 top-0 h-screen w-56 z-40 flex flex-col"
          style={{
            background: "hsl(0 0% 5%)",
            borderRight: "1px solid hsl(0 0% 10%)",
          }}
        >
          <PortalNav />
        </aside>
      )}

      {/* ── Main content area ── */}
      <main
        className={`flex-1 min-h-screen ${isMobile ? "pb-24 pt-4" : "ml-56"}`}
        style={{ background: "hsl(0 0% 4%)" }}
      >
        <div className={`mx-auto px-5 ${isMobile ? "py-6 max-w-lg" : "max-w-5xl py-10 px-8"}`}>
          <Outlet />
        </div>
      </main>

      {/* ── Mobile Bottom Tab Bar ── */}
      {isMobile && (
        <nav
          className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around"
          style={{
            background: "hsl(0 0% 5%)",
            borderTop: "1px solid hsl(0 0% 10%)",
            paddingBottom: "env(safe-area-inset-bottom, 12px)",
            paddingTop: "10px",
          }}
        >
          {BOTTOM_TABS.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 min-w-[44px] transition-all duration-200 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {tab.icon(isActive)}
                  <span
                    className={`text-[0.5rem] tracking-widest uppercase font-sans transition-colors ${
                      isActive ? "text-primary" : "text-muted-foreground/60"
                    }`}
                  >
                    {tab.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  );
}
