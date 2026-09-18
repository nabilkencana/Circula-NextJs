/**
 * @file page.tsx
 * @description Halaman utama Manajemen Buku Transaksi Administrator Bank Sampah Circula (Rute: `/admin/transaksi`).
 * Mengintegrasikan seluruh komponen pengelolaan operasional penyetoran sampah (STR) dan penukaran voucher reward (TKR)
 * dengan custom hook `useAdminTransaksi`.
 * Menyediakan pemantauan metrik telemetri, pergantian tab STR/TKR, filter status transaksi dan bulan operasional,
 * pencarian real-time, buku besar tabel responsif dengan pagination, modal penimbangan tera cepat (`QuickVerifyModal`),
 * pratinjau penukaran poin, serta notifikasi toast umpan balik instan.
 * 
 * @module App/AdminTransaksiPage
 */

"use client";

import React from "react";
import NavbarAdminConsole from "@/components/layout/NavbarAdminConsole";
import FooterAdmin from "@/components/layout/FooterAdmin";
import TransaksiHero from "@/components/admin-transaksi/TransaksiHero";
import TransaksiTypeSwitcher from "@/components/admin-transaksi/TransaksiTypeSwitcher";
import TransaksiFilterToolbar from "@/components/admin-transaksi/TransaksiFilterToolbar";
import TransaksiTableCard from "@/components/admin-transaksi/TransaksiTableCard";
import TkrPreviewSection from "@/components/admin-transaksi/TkrPreviewSection";
import QuickVerifyModal from "@/components/admin-transaksi/QuickVerifyModal";
import BottomAdminTransaksiRibbon from "@/components/admin-transaksi/BottomAdminTransaksiRibbon";
import { useAdminTransaksi } from "@/hooks/useAdminTransaksi";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

/**
 * Komponen Halaman AdminTransaksiPage
 * 
 * @component
 * @returns {JSX.Element} Halaman manajemen transaksi lengkap untuk petugas dan administrator unit.
 */
export default function AdminTransaksiPage() {
  // Destrukturisasi state dan handler operasional dari custom hook
  const {
    loading,
    viewType,
    statusFilter,
    selectedBulan,
    searchQuery,
    currentPage,
    filteredStrList,
    filteredTkrList,
    paginatedStrList,
    paginatedTkrList,
    totalPages,
    telemetryStats,
    verifyModalOpen,
    selectedRecordForVerify,
    isSubmitting,
    toastMessage,
    setToastMessage,
    handleSwitchType,
    handleStatusFilterChange,
    handleBulanChange,
    handleSearchChange,
    handlePageChange,
    handleOpenVerify,
    handleCloseVerify,
    handleConfirmVerify,
    handleFinalize,
    handleCompleteTkr,
    handleExportRekap,
  } = useAdminTransaksi();

  // Jumlah hitungan data tersaring dan terpaginasi
  const totalFilteredCount =
    viewType === "STR" ? filteredStrList.length : filteredTkrList.length;
  const displayedCount =
    viewType === "STR" ? paginatedStrList.length : paginatedTkrList.length;

  // Sampel data catatan TKR untuk seksi pratinjau cepat di bawah tab STR
  const sampleTkrRecord = filteredTkrList[0] || {
    id: "TKR-202608-5001",
    kodePenukaran: "TKR-202608-5001",
    tanggalWaktu: "26 Agu 2026",
    nasabahNama: "Budi Santoso",
    itemHadiah: "Voucher Pulsa / E-Wallet Rp 25.000",
    biayaPoin: 75,
    status: "diproses",
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-brand-neon selection:text-text-primary">
      {/* 1. Header Navigasi Konsol Administrator */}
      <NavbarAdminConsole />

      {/* 2. Banner Pop-up Notifikasi Umpan Balik (Toast Alert) */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 max-w-md w-full animate-in slide-in-from-top-4 fade-in duration-200">
          <div
            className={`p-4 rounded-2xl border shadow-lg flex items-start gap-3 ${
              toastMessage.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                : "bg-red-50 border-red-200 text-red-900"
            }`}
          >
            {toastMessage.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
            )}
            <div className="text-xs sm:text-sm font-medium flex-1">
              {toastMessage.message}
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              aria-label="Tutup notifikasi"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Area Ruang Kerja Utama Modul Transaksi */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Spanduk Hero Gelap dengan 3 Bento Telemetri Tersemat */}
        <TransaksiHero stats={telemetryStats} />

        {/* Tombol Tab Pengalih Buku Besar: STR vs TKR */}
        <TransaksiTypeSwitcher
          activeType={viewType}
          onSwitch={handleSwitchType}
        />

        {/* Bilah Filter: Pil Status, Dropdown Bulan, dan Input Pencarian */}
        <TransaksiFilterToolbar
          viewType={viewType}
          statusFilter={statusFilter}
          onStatusFilterChange={handleStatusFilterChange}
          selectedBulan={selectedBulan}
          onBulanChange={handleBulanChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        {/* Kartu Tabel Buku Transaksi dengan Status Pemuatan & Paginasi */}
        {loading ? (
          <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center text-xs text-gray-400 shadow-xs mb-8">
            Memuat buku transaksi operasional...
          </div>
        ) : (
          <TransaksiTableCard
            viewType={viewType}
            selectedBulan={selectedBulan}
            totalFilteredCount={totalFilteredCount}
            displayedCount={displayedCount}
            currentPage={currentPage}
            totalPages={totalPages}
            paginatedStrList={paginatedStrList}
            paginatedTkrList={paginatedTkrList}
            onPageChange={handlePageChange}
            onExportRekap={handleExportRekap}
            onOpenVerify={handleOpenVerify}
            onFinalize={handleFinalize}
            onCompleteTkr={handleCompleteTkr}
          />
        )}

        {/* Seksi Pratinjau Format Tab TKR (Muncul saat Admin di Tab STR) */}
        {viewType === "STR" && (
          <TkrPreviewSection
            sampleRecord={sampleTkrRecord}
            onCompleteTkr={handleCompleteTkr}
            onSwitchToTkr={() => handleSwitchType("TKR")}
          />
        )}

        {/* Pita Konfirmasi Sinkronisasi Real-Time Basis Data */}
        <BottomAdminTransaksiRibbon />
      </main>

      {/* 4. Modal Dialog Verifikasi Cepat Timbangan Loket */}
      <QuickVerifyModal
        isOpen={verifyModalOpen}
        record={selectedRecordForVerify}
        isSubmitting={isSubmitting}
        onClose={handleCloseVerify}
        onConfirm={handleConfirmVerify}
      />

      {/* 5. Footer Khusus Konsol Administrator */}
      <FooterAdmin />
    </div>
  );
}
