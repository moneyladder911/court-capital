import React from "react";
import { useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EmergencySessionButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to a filtered view of today's sessions
    // For now, scroll to sessions section or navigate to events
    navigate("/events?today=true");
  };

  return (
    <Button
      onClick={handleClick}
      variant="gold"
      size="lg"
      className="w-full group relative overflow-hidden"
    >
      {/* Animated background pulse */}
      <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      
      <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
      <span className="font-semibold">Find a Session Today</span>
    </Button>
  );
};
