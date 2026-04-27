import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RequestAccessModal } from "@/components/RequestAccessModal";

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar onRequestAccess={() => setModalOpen(true)} />
      {children}
      <Footer onRequestAccess={() => setModalOpen(true)} />
      <RequestAccessModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};
