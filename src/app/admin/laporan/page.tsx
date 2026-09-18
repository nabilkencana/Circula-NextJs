/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Halaman Konsol Administrator - Laporan Tonase & Valuasi Ekonomi Sampah
 *
 * File: src/app/admin/laporan/page.tsx
 * Rute: /admin/laporan
 * Deskripsi:
 * Halaman orchestrator laporan ekologis dan valuasi sirkular bulanan.
 * Mengagregasi data timbangan real-time per periode bulan, menampilkan 3 KPI summary cards,
 * grafik rincian 4 jenis material baku (plastik, kertas, logam, kaca), tanda tangan
 * digital compliance ISO 14001:2015, fitur cetak dokumen PDF resmi, serta ekspor file CSV.
 *
 * Standar Teknis UKK RPL:
 * - Next.js 15 App Router Client Component ("use client").
 * - Format layout dwifungsi: Tampilan interaktif di layar & tata letak rapi saat dicetak (`print:` modifier).
 * - Single Source of Truth melalui custom hook `useAdminLaporan`.
 * - Konsistensi UI dengan NavbarAdminConsole dan FooterAdmin.
 */

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

/**
 * Komponen utama halaman laporan tonase dan valuasi ekonomi sampah unit admin.
 */
export default function AdminLaporanPage() {
  // Mengonsumsi data agregasi dan handler operasional dari hook kustom
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
      {/* 1. SINGLE TOP FLOATING PILL NAVBAR (Disembunyikan saat cetak) */}
      <div className="print:hidden">
        <NavbarAdminConsole />
      </div>

      {/* Printable Header Khusus Mode Cetak / Ekspor PDF */}
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
        {/* Dark Hero Showcase dengan 3 docked telemetry widgets */}
        <LaporanHero data={laporanData} />

        {/* Toolbar Pemilihan Periode & Aksi Ekspor CSV / PDF */}
        <LaporanPeriodToolbar
          selectedBulan={selectedBulan}
          onSelectMonth={handleSelectMonth}
          onDownloadCsv={handleDownloadCsv}
          onPrintPdf={handlePrintPdf}
        />

        {/* Indikator status proses pembaruan data */}
        {isLoading && (
          <div className="text-center py-4 text-xs font-semibold text-gray-500 animate-pulse print:hidden">
            Memperbarui data rekapitulasi periode {selectedBulan}...
          </div>
        )}

        {/* 3 KPI Summary Cards (Volume, Pembayaran Kas, Sirkulasi Reward) */}
        <KpiSummaryCards data={laporanData} />

        {/* Kartu Rincian Komposisi Tonase Material Sampah */}
        <MaterialBreakdownCard data={laporanData} />

        {/* Pengesahan Audit Kepatuhan & Tanda Tangan Digital */}
        <ComplianceAuditSignatureCard compliance={laporanData.compliance} />

        {/* Pita Informasi Teknis Endpoint & Navigasi */}
        <BottomAdminLaporanRibbon />
      </main>

      {/* 3. 4-COLUMN ENTERPRISE FOOTER (Disembunyikan saat cetak) */}
      <div className="print:hidden">
        <FooterAdmin />
      </div>
    </div>
  );
}
