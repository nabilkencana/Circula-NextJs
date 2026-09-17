"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import RegisterHeroShowcase from "@/components/register/RegisterHeroShowcase";
import AdminRegisterFormCard from "@/components/admin-register/AdminRegisterFormCard";
import AdminRegisterSuccessModal from "@/components/admin-register/AdminRegisterSuccessModal";
import { useRegisterAdminUnit } from "@/hooks/useRegisterAdminUnit";

export default function AdminRegisterPage() {
  const controller = useRegisterAdminUnit();

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex flex-col font-sans text-text-primary antialiased selection:bg-brand-neon selection:text-text-primary">
      {/* Standard Consistent Navigation Bar */}
      <Navbar />

      {/* Main Split-Screen Container — Matching Login and Register Layout */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-310 w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Left Column (Hero Showcase Card) */}
            <div className="lg:col-span-5 flex">
              <RegisterHeroShowcase />
            </div>

            {/* Right Column (Admin Registration Card with Role Segment Capsule Switcher) */}
            <div className="lg:col-span-7 flex">
              <AdminRegisterFormCard controller={controller} />
            </div>
          </div>
        </div>
      </main>

      {/* Admin Registration Success Modal */}
      <AdminRegisterSuccessModal
        isOpen={controller.isSuccessModalOpen}
        data={controller.registeredData}
        onClose={controller.closeSuccessModal}
      />
    </div>
  );
}
