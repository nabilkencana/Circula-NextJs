"use client";

import React from "react";
import NavbarAdminConsole from "@/components/layout/NavbarAdminConsole";
import FooterAdmin from "@/components/layout/FooterAdmin";
import LaporanHero from "@/components/admin-laporan/LaporanHero";
import LaporanPeriodToolbar from "@/components/admin-laporan/LaporanPeriodToolbar";
import KpiSummaryCards from "@/components/admin-laporan/KpiSummaryCards";
import MaterialBreakdownCard from "@/components/admin-laporan/MaterialBreakdownCard";
import ComplianceAuditSignatureCard from "@/components/admin-laporan/ComplianceAuditSignatureCard";
import BottomAdminLaporanRibbon from "@/components/admin-laporan/BottomAdminLaporanRibbon";
import { useAdminLaporan } from "@/hooks/useAdminLaporan";

export default function AdminLaporanPage() {
  const {
    selectedBulan,
    laporanData,
    isLoading,
    handleSelectMonth,
    handlePrintPdf,
    handleDownloadCsv,
  } = useAdminLaporan();

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-brand-neon selection:text-text-primary">
      {/* 1. SINGLE TOP FLOATING PILL NAVBAR */}
      <div className="print:hidden">
        <NavbarAdminConsole />
      </div>

      {/* Printable Header (Visible only when printed) */}
      <div className="hidden print:block p-6 border-b border-gray-300 text-center">
        <h1 className="text-xl font-bold uppercase tracking-wider text-black">
          Laporan Rekapitulasi Penimbangan &amp; Valuasi Bank Sampah Circula
        </h1>
        <p className="text-xs text-gray-600 mt-1">
          Unit Operasional Bank Sampah Asri Jaya (#JKT-042) • Periode: {laporanData.periodeLabel}
        </p>
      </div>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
        {/* Dark Hero Showcase with 3 docked widgets */}
        <LaporanHero data={laporanData} />

        {/* Period Selector & Export CTAs Toolbar */}
        <LaporanPeriodToolbar
          selectedBulan={selectedBulan}
          onSelectMonth={handleSelectMonth}
          onDownloadCsv={handleDownloadCsv}
          onPrintPdf={handlePrintPdf}
        />

        {/* Loading overlay or indicator */}
        {isLoading && (
          <div className="text-center py-4 text-xs font-semibold text-gray-500 animate-pulse print:hidden">
            Memperbarui data rekapitulasi periode {selectedBulan}...
          </div>
        )}

        {/* 3 KPI Summary Cards */}
        <KpiSummaryCards data={laporanData} />

        {/* Material Breakdown Progress Card */}
        <MaterialBreakdownCard data={laporanData} />

        {/* Compliance Audit & Digital Signature Card */}
        <ComplianceAuditSignatureCard compliance={laporanData.compliance} />

        {/* Bottom Reassurance Ribbon */}
        <BottomAdminLaporanRibbon />
      </main>

      {/* 3. 4-COLUMN ENTERPRISE FOOTER */}
      <div className="print:hidden">
        <FooterAdmin />
      </div>
    </div>
  );
}
