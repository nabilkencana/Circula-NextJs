"use client";

import React, { Suspense, useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TukarPoinBanner from "@/components/tukar-poin/TukarPoinBanner";
import RewardFilterToolbar from "@/components/tukar-poin/RewardFilterToolbar";
import RewardGrid from "@/components/tukar-poin/RewardGrid";
import PreFooterTukarRibbon from "@/components/tukar-poin/PreFooterTukarRibbon";
import TukarPoinConfirmModal from "@/components/tukar-poin/TukarPoinConfirmModal";
import { useTukarPoin } from "@/hooks/useTukarPoin";
import { getCurrentUser } from "@/services/authService";

/**
 * Komponen Internal Konten Halaman Penukaran Poin (TukarPoinContent)
 *
 * Mengonsolidasikan seluruh logika bisnis dan interaksi katalog penukaran poin:
 * 1. State orkestrasi dari custom hook `useTukarPoin`: daftar hadiah, filter kategori, pencarian teks,
 *    kalkulasi sisa saldo, status request API, dan data keberhasilan penukaran.
 * 2. Sinkronisasi identitas nasabah dari session storage / token via `getCurrentUser()`.
 * 3. Tata letak responsif tersusun rapi:
 *    - Header Navbar universal dengan badge poin nasabah.
 *    - Banner salam & ringkasan widget dompet poin.
 *    - Toolbar filter kategori (Pills) & input pencarian nama produk/voucher.
 *    - Grid kartu reward interaktif dengan 3 status (Loading skeleton, Empty, Populated).
 *    - Call-to-Action ribbon edukasi penyetoran sampah berkelanjutan.
 *    - Global Footer.
 *    - Dialog modal konfirmasi transaksi dan penerbitan nota digital.
 *
 * @returns JSX Element struktur konten tukar poin
 */
function TukarPoinContent() {
  // Ambil state dan action handlers dari custom hook orkestrator
  const {
    items,
    filteredItems,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    saldoSummary,
    isLoading,
    activeItemToRedeem,
    isSubmitting,
    redemptionSuccessData,
    errorMessage,
    isPointSufficient,
    kekuranganPoin,
    handleInitiateRedeem,
    handleCancelRedeem,
    handleConfirmRedeem,
    handleCloseSuccessModal,
  } = useTukarPoin();

  // State identitas nasabah aktif untuk personalisasi salam di banner dan navbar
  const [currentUserName, setCurrentUserName] = useState<string>("Nasabah Circula");

  // Inisialisasi data nasabah saat komponen dimuat di sisi klien (hydration safe)
  useEffect(() => {
    const user = getCurrentUser();
    if (user?.namaLengkap || user?.username) {
      setCurrentUserName(user.namaLengkap || user.username);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FBFBFB] font-sans text-text-primary flex flex-col selection:bg-brand-neon selection:text-dark-container">
      {/* ================= GLOBAL NAVBAR ================= */}
      <Navbar
        userRole="nasabah"
        userPoints={saldoSummary.saldoPoinAktif ?? 0}
        userName={currentUserName}
      />

      {/* ================= KONTEN UTAMA HALAMAN ================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Banner Utama: Salam Nasabah & Widget Dompet Poin Gelap */}
        <TukarPoinBanner
          saldoSummary={saldoSummary}
          userName={currentUserName}
        />

        {/* Toolbar Interaktif: Filter Kategori & Pencarian Kata Kunci */}
        <RewardFilterToolbar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          items={items}
        />

        {/* Grid Katalog Produk & Voucher Hadiah */}
        <RewardGrid
          items={filteredItems}
          isPointSufficient={isPointSufficient}
          kekuranganPoin={kekuranganPoin}
          onRedeem={handleInitiateRedeem}
          isLoading={isLoading}
        />

        {/* Banner Ribbon Ajakan Penyetoran Sampah Sirkular */}
        <PreFooterTukarRibbon />
      </main>

      {/* ================= GLOBAL FOOTER ================= */}
      <Footer />

      {/* ================= MODAL KONFIRMASI & NOTA DIGITAL ================= */}
      <TukarPoinConfirmModal
        item={activeItemToRedeem}
        saldoSummary={saldoSummary}
        isOpen={Boolean(activeItemToRedeem || redemptionSuccessData)}
        onClose={redemptionSuccessData ? handleCloseSuccessModal : handleCancelRedeem}
        onConfirm={handleConfirmRedeem}
        isSubmitting={isSubmitting}
        successData={redemptionSuccessData}
        errorMessage={errorMessage}
      />
    </div>
  );
}

/**
 * Halaman Utama Rute `/tukar-poin` (Next.js App Router Page)
 *
 * Membungkus `TukarPoinContent` dalam boundary `<Suspense>` Next.js
 * guna memastikan kelancaran rendering streaming dan penanganan parameter URL/hydration.
 *
 * @returns JSX Element halaman tukar poin
 */
export default function TukarPoinPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FBFBFB]">
          <div className="w-8 h-8 border-3 border-dark-container border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <TukarPoinContent />
    </Suspense>
  );
}
