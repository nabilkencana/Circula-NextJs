"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import RegisterHeroShowcase from "@/components/register/RegisterHeroShowcase";
import RegisterFormCard from "@/components/register/RegisterFormCard";
import RegistrationSuccessModal from "@/components/register/RegistrationSuccessModal";
import { useRegisterNasabah } from "@/hooks/useRegisterNasabah";

export default function RegisterPage() {
  const controller = useRegisterNasabah();

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex flex-col font-sans text-text-primary antialiased selection:bg-brand-neon selection:text-text-primary">
      {/* Standard Consistent Navigation Bar */}
      <Navbar />

      {/* Main Split-Screen Container — Matching Login Layout */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-310 w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Left Column (Hero Showcase Card) */}
            <div className="lg:col-span-5 flex">
              <RegisterHeroShowcase />
            </div>

            {/* Right Column (Registration Card with Role Segment Capsule Switcher) */}
            <div className="lg:col-span-7 flex">
              <RegisterFormCard controller={controller} />
            </div>
          </div>
        </div>
      </main>

      {/* Registration Success Modal */}
      <RegistrationSuccessModal
        isOpen={controller.isSuccessModalOpen}
        data={controller.registeredData}
        onClose={controller.closeSuccessModal}
      />
    </div>
  );
}
