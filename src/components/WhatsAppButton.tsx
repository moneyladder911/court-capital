import React from "react";
import { MessageCircle } from "lucide-react";

export const WhatsAppButton: React.FC = () => {
  // Can be updated later with a real number or ManyChat link
  const whatsappUrl = "https://wa.me/1234567890?text=I'm%20interested%20in%20Padel%20House%20membership";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-black border border-primary/30 hover:border-primary hover:bg-black/90 text-white hover:text-primary rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} strokeWidth={1.5} />
    </a>
  );
};
