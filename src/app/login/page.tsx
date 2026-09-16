"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoginHero from "@/components/login/LoginHero";
import LoginFormCard from "@/components/login/LoginFormCard";
import KonsolOperasionalBentoCard from "@/components/login/KonsolOperasionalBentoCard";
import BottomLoginRibbon from "@/components/login/BottomLoginRibbon";
import LoginSuccessModal from "@/components/login/LoginSuccessModal";
import { useLoginMultiRole } from "@/hooks/useLoginMultiRole";

export default function LoginPage() {
  const controller = useLoginMultiRole();

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-text-primary antialiased selection:bg-brand-neon selection:text-text-primary">
      {/* Standardized Full-Width Sticky Navigation Bar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1">
        {/* Dark Hero Showcase */}
        <LoginHero />

        {/* Central Split Section */}
        <section className="px-4 sm:px-6 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left Column (60% width / 7 cols) - Login Form Card */}
              <div className="lg:col-span-7 xl:col-span-7">
                <LoginFormCard controller={controller} />
              </div>

              {/* Right Column (40% width / 5 cols) - Operations Bento Guide */}
              <div className="lg:col-span-5 xl:col-span-5">
                <KonsolOperasionalBentoCard />
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Security & Architecture Ribbon */}
        <BottomLoginRibbon />
      </main>

      {/* Shared Enterprise Footer */}
      <Footer />

      {/* Authentication Success Modal */}
      <LoginSuccessModal
        isOpen={controller.loginSuccessModalOpen}
        user={controller.loggedInUser}
        onClose={controller.closeSuccessModal}
      />
    </div>
  );
}
