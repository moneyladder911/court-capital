import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CreateSessionButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate("/create-session")}
      className="fixed bottom-24 right-4 z-40 w-14 h-14 rounded-full bg-gradient-gold shadow-gold flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 safe-area-pb"
      aria-label="Create new session"
    >
      <Plus className="w-6 h-6 text-primary-foreground" />
    </button>
  );
};
