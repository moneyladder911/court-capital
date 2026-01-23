import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Map, Calendar, Users, Trophy, User, MessageCircle, Lightbulb } from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex flex-col items-center justify-center gap-1 py-2 px-3 transition-all duration-200",
      isActive
        ? "text-primary"
        : "text-muted-foreground hover:text-foreground"
    )}
  >
    <div className={cn(
      "relative",
      isActive && "after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-primary"
    )}>
      {icon}
    </div>
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "discover", path: "/", icon: <Map className="w-5 h-5" />, label: "Discover" },
    { id: "events", path: "/events", icon: <Calendar className="w-5 h-5" />, label: "Events" },
    { id: "lessons", path: "/lessons", icon: <Lightbulb className="w-5 h-5" />, label: "Lessons" },
    { id: "leaderboard", path: "/leaderboard", icon: <Trophy className="w-5 h-5" />, label: "Ranks" },
    { id: "profile", path: "/profile", icon: <User className="w-5 h-5" />, label: "Profile" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="glass-card border-t border-border">
        <div className="max-w-md mx-auto flex items-center justify-around">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={isActive(item.path)}
              onClick={() => navigate(item.path)}
            />
          ))}
        </div>
      </div>
      {/* Safe area for mobile */}
      <div className="h-[env(safe-area-inset-bottom)] bg-card" />
    </nav>
  );
};
