"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AdminRegisterHero from "@/components/admin-register/AdminRegisterHero";
import AdminRegisterFormCard from "@/components/admin-register/AdminRegisterFormCard";
import AdminFeaturesBentoCard from "@/components/admin-register/AdminFeaturesBentoCard";
import BottomAdminRegisterRibbon from "@/components/admin-register/BottomAdminRegisterRibbon";
import AdminRegisterSuccessModal from "@/components/admin-register/AdminRegisterSuccessModal";
import { useRegisterAdminUnit } from "@/hooks/useRegisterAdminUnit";

export default function AdminRegisterPage() {
  const controller = useRegisterAdminUnit();

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-text-primary antialiased selection:bg-brand-neon selection:text-text-primary">
      {/* Standardized Full-Width Sticky Navigation Bar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Dark Hero Showcase */}
        <AdminRegisterHero />

        {/* Central Split Section */}
        <section className="px-4 sm:px-6 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left Column (62% width / 7 cols) - Form Card */}
              <div className="lg:col-span-7 xl:col-span-7">
                <AdminRegisterFormCard controller={controller} />
              </div>

              {/* Right Column (38% width / 5 cols) - Bento Features Guide */}
              <div className="lg:col-span-5 xl:col-span-5">
                <AdminFeaturesBentoCard />
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Registration & Security Banner */}
        <BottomAdminRegisterRibbon />
      </main>

      {/* Enterprise Shared Footer */}
      <Footer />

      {/* Success Confirmation Modal */}
      <AdminRegisterSuccessModal
        isOpen={controller.isSuccessModalOpen}
        data={controller.registeredData}
        onClose={controller.closeSuccessModal}
      />
    </div>
  );
}
