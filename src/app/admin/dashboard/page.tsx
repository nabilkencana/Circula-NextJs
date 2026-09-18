/**
 * @file page.tsx
 * @description Halaman utama Dashboard Operasional Administrator Unit Bank Sampah Circula (Rute: `/admin/dashboard`).
 * Mengintegrasikan seluruh komponen panel kendali dengan custom hook `useAdminDashboard`.
 * Menyediakan pemantauan telemetri real-time: antrean timbangan fisik, total volume tonase sampah masuk,
 * 4 metrik KPI operasional, diagram komposisi material daur ulang, tombol aksi cepat (fast-action triggers),
 * serta navigasi antar modul operasional (transaksi timbangan, nasabah, kategori harga, laporan bulanan).
 * 
 * @module App/AdminDashboardPage
 */

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

/**
 * Komponen AdminDashboardPage
 * 
 * @component
 * @returns {JSX.Element} Halaman dashboard komprehensif untuk pengawasan operasional harian bank sampah unit.
 */
export default function AdminDashboardPage() {
  // Destrukturisasi data telemetri dan fungsi pengendali navigasi dari hook
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
      {/* 1. Header Navigasi Konsol Administrator Circula */}
      <NavbarAdminConsole />

      {/* 2. Kontainer Ruang Kerja Utama Dashboard */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
        {/* Spanduk Hero Gelap dengan 3 Widget Telemetri Tersemat */}
        <DashboardHero
          antreanCount={telemetry.antreanCount}
          totalTonaseKg={telemetry.totalTonaseMasukKg}
          unitNama={telemetry.unitNama}
        />

        {/* Bilah 4 Tindakan Aksi Cepat Operasional (Timbang, Nasabah, Harga, PDF) */}
        <FastActionTriggers
          onTimbangBaru={() => handleNavigateToWeigh()}
          onDaftarNasabah={handleNavigateToNasabah}
          onUpdateHarga={handleNavigateToKategori}
          onCetakPdf={handleNavigateToLaporan}
        />

        {/* Grid 4 Kartu Metrik Indikator Kinerja Utama (KPI) */}
        <DashboardKpiGrid kpi={telemetry.kpi} />

        {/* Bagian Belah 2-Kolom: Tabel Antrean Verifikasi (Kiri) vs Bento Komposisi Material (Kanan) */}
        <DashboardSplitSection
          queueList={telemetry.queueList}
          scaleDeviceId={telemetry.scaleDeviceId}
          materials={telemetry.composition}
          totalTonaseMasukKg={telemetry.totalTonaseMasukKg}
          onTimbang={handleNavigateToWeigh}
        />

        {/* Pita Jaminan Kepatuhan Keamanan & Enkripsi Basis Data di Bagian Bawah */}
        <BottomAdminDashboardRibbon
          unitNama={telemetry.unitNama}
          onNavigateProfil={handleNavigateToProfil}
        />
      </main>

      {/* 3. Footer Khusus Konsol Administrator */}
      <FooterAdmin />
    </div>
  );
}
