import React from "react";
import { cn } from "@/lib/utils";
import { Map, Calendar, Users, Trophy, User } from "lucide-react";

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
      "flex flex-col items-center justify-center gap-1 py-2 px-4 transition-all duration-200",
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

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: "discover", icon: <Map className="w-5 h-5" />, label: "Discover" },
    { id: "sessions", icon: <Calendar className="w-5 h-5" />, label: "Sessions" },
    { id: "network", icon: <Users className="w-5 h-5" />, label: "Network" },
    { id: "events", icon: <Trophy className="w-5 h-5" />, label: "Events" },
    { id: "profile", icon: <User className="w-5 h-5" />, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="glass-card border-t border-border">
        <div className="max-w-md mx-auto flex items-center justify-around">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={activeTab === item.id}
              onClick={() => onTabChange(item.id)}
            />
          ))}
        </div>
      </div>
      {/* Safe area for mobile */}
      <div className="h-[env(safe-area-inset-bottom)] bg-card" />
    </nav>
  );
};
