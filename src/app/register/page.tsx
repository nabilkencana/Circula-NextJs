"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RegisterHero from "@/components/register/RegisterHero";
import RegisterFormCard from "@/components/register/RegisterFormCard";
import StepsGuideBentoCard from "@/components/register/StepsGuideBentoCard";
import SustainableImpactCard from "@/components/register/SustainableImpactCard";
import UnitAdminOnboardLinkCard from "@/components/register/UnitAdminOnboardLinkCard";
import BottomSecurityRibbon from "@/components/register/BottomSecurityRibbon";
import RegistrationSuccessModal from "@/components/register/RegistrationSuccessModal";
import { useRegisterNasabah } from "@/hooks/useRegisterNasabah";

export default function RegisterPage() {
  const controller = useRegisterNasabah();

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-text-primary antialiased selection:bg-brand-neon selection:text-text-primary">
      {/* Top Navbar with Guest/Auth configuration */}
      <Navbar variant="auth" />

      {/* Main Container */}
      <main className="flex-1">
        {/* Hero Section */}
        <RegisterHero />

        {/* Form and Bento Section */}
        <section className="px-4 sm:px-6 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left Column (65% width on lg) - Registration Form */}
              <div className="lg:col-span-7 xl:col-span-8">
                <RegisterFormCard controller={controller} />
              </div>

              {/* Right Column (35% width on lg) - Bento Information Deck */}
              <div className="lg:col-span-5 xl:col-span-4 space-y-6">
                <StepsGuideBentoCard />
                <SustainableImpactCard />
                <UnitAdminOnboardLinkCard />
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Security & Compliance Ribbon */}
        <BottomSecurityRibbon />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Registration Success Modal */}
      <RegistrationSuccessModal
        isOpen={controller.isSuccessModalOpen}
        data={controller.registeredData}
        onClose={controller.closeSuccessModal}
      />
    </div>
  );
}
