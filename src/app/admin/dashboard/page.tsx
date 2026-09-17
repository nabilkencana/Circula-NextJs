"use client";

import React from "react";
import NavbarAdminConsole from "@/components/layout/NavbarAdminConsole";
import FooterAdmin from "@/components/layout/FooterAdmin";
import {
  DashboardHero,
  FastActionTriggers,
  DashboardKpiGrid,
  DashboardSplitSection,
  BottomAdminDashboardRibbon,
} from "@/components/admin-dashboard";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";

export default function AdminDashboardPage() {
  const {
    telemetry,
    handleNavigateToWeigh,
    handleNavigateToNasabah,
    handleNavigateToKategori,
    handleNavigateToLaporan,
    handleNavigateToProfil,
  } = useAdminDashboard();

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-brand-neon selection:text-text-primary">
      {/* 1. SINGLE TOP NAVBAR */}
      <NavbarAdminConsole />

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
        {/* Dark Hero Showcase with 3 docked widgets */}
        <DashboardHero
          antreanCount={telemetry.antreanCount}
          totalTonaseKg={telemetry.totalTonaseMasukKg}
          unitNama={telemetry.unitNama}
        />

        {/* 4 Fast-Action Triggers */}
        <FastActionTriggers
          onTimbangBaru={() => handleNavigateToWeigh()}
          onDaftarNasabah={handleNavigateToNasabah}
          onUpdateHarga={handleNavigateToKategori}
          onCetakPdf={handleNavigateToLaporan}
        />

        {/* 4 Operational KPI Cards */}
        <DashboardKpiGrid kpi={telemetry.kpi} />

        {/* Split Section: Left Queue Table vs Right Material Composition Bento */}
        <DashboardSplitSection
          queueList={telemetry.queueList}
          scaleDeviceId={telemetry.scaleDeviceId}
          materials={telemetry.composition}
          totalTonaseMasukKg={telemetry.totalTonaseMasukKg}
          onTimbang={handleNavigateToWeigh}
        />

        {/* Bottom Reassurance Ribbon */}
        <BottomAdminDashboardRibbon
          unitNama={telemetry.unitNama}
          onNavigateProfil={handleNavigateToProfil}
        />
      </main>

      {/* 3. ENTERPRISE FOOTER */}
      <FooterAdmin />
    </div>
  );
}
