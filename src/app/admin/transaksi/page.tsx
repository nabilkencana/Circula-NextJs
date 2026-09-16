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

export default function AdminTransaksiPage() {
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

  const totalFilteredCount =
    viewType === "STR" ? filteredStrList.length : filteredTkrList.length;
  const displayedCount =
    viewType === "STR" ? paginatedStrList.length : paginatedTkrList.length;

  // Sample TKR record for the preview section
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
      {/* 1. SINGLE TOP FLOATING PILL NAVBAR */}
      <NavbarAdminConsole />

      {/* 2. TOAST NOTIFICATION BANNER */}
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
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            )}
            <div className="text-xs sm:text-sm font-medium flex-1">
              {toastMessage.message}
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3. MAIN WORKSPACE CONTAINER */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Dark Hero Showcase with 3 docked widgets */}
        <TransaksiHero stats={telemetryStats} />

        {/* Type Switcher: STR vs TKR */}
        <TransaksiTypeSwitcher
          activeType={viewType}
          onSwitch={handleSwitchType}
        />

        {/* Filter Toolbar: Status Pills, Month Dropdown, Search Input */}
        <TransaksiFilterToolbar
          viewType={viewType}
          statusFilter={statusFilter}
          onStatusFilterChange={handleStatusFilterChange}
          selectedBulan={selectedBulan}
          onBulanChange={handleBulanChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        {/* Main Table Ledger Card */}
        {loading ? (
          <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center text-xs text-gray-400 shadow-xs mb-8">
            Memuat buku transaksi...
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

        {/* TKR Preview Section (displayed when on STR view to match visual blueprint) */}
        {viewType === "STR" && (
          <TkrPreviewSection
            sampleRecord={sampleTkrRecord}
            onCompleteTkr={handleCompleteTkr}
            onSwitchToTkr={() => handleSwitchType("TKR")}
          />
        )}

        {/* Bottom Reassurance Ribbon */}
        <BottomAdminTransaksiRibbon />
      </main>

      {/* 4. MODALS */}
      <QuickVerifyModal
        isOpen={verifyModalOpen}
        record={selectedRecordForVerify}
        isSubmitting={isSubmitting}
        onClose={handleCloseVerify}
        onConfirm={handleConfirmVerify}
      />

      {/* 5. 4-COLUMN ENTERPRISE FOOTER */}
      <FooterAdmin />
    </div>
  );
}
