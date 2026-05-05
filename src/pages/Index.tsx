import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { Offerings } from "@/components/Offerings";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { RequestAccessModal } from "@/components/RequestAccessModal";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar onRequestAccess={openModal} />

      <main>
        <Hero onRequestAccess={openModal} />
        <SocialProof />
        <Offerings />
        <Experience onRequestAccess={openModal} />
      </main>

      <Footer onRequestAccess={openModal} />

      <RequestAccessModal isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
};

export default Index;
