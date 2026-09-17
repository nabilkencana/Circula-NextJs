"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import LoginHeroShowcase from "@/components/login/LoginHeroShowcase";
import LoginFormCard from "@/components/login/LoginFormCard";
import LoginSuccessModal from "@/components/login/LoginSuccessModal";
import { useLoginMultiRole } from "@/hooks/useLoginMultiRole";

export default function LoginPage() {
  const controller = useLoginMultiRole();

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex flex-col font-sans text-text-primary antialiased selection:bg-brand-neon selection:text-text-primary">
      {/* Standard Consistent Navigation Bar */}
      <Navbar />

      {/* Main Split-Screen Container */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-310 w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Left Column (Hero Showcase Card) */}
            <div className="lg:col-span-5 flex">
              <LoginHeroShowcase />
            </div>

            {/* Right Column (Interactive Login Card) */}
            <div className="lg:col-span-7 flex">
              <LoginFormCard controller={controller} />
            </div>
          </div>
        </div>
      </main>

      {/* Authentication Success Modal */}
      <LoginSuccessModal
        isOpen={controller.loginSuccessModalOpen}
        user={controller.loggedInUser}
        onClose={controller.closeSuccessModal}
      />
    </div>
  );
}
