import React from "react";
import { Plus } from "lucide-react";

export const CreateSessionButton: React.FC = () => {
  return (
    <button className="fixed bottom-24 right-4 z-40 w-14 h-14 rounded-full bg-gradient-gold shadow-gold flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95">
      <Plus className="w-6 h-6 text-primary-foreground" />
    </button>
  );
};
