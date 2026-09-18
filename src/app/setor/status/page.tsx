"use client";

/**
 * ============================================================================
 * Halaman: Status & Histori Penyetoran Sampah
 * Rute: /setor/status (dan alias /histori)
 * Direktori: src/app/setor/status/page.tsx
 *
 * Fungsi Utama:
 * Halaman utama nasabah untuk memantau siklus hidup seluruh penyetoran sampah daur ulang:
 * 1. Filter status interaktif: Menunggu Konfirmasi, Diverifikasi, Selesai, Ditolak.
 * 2. Filter periode bulan dan pencarian dinamis berbasis teks / kode transaksi.
 * 3. Tampilan kartu transaksi polimorfik (CardSelesai, CardMenungguKonfirmasi, CardDitolak).
 * 4. Panduan tahapan status (StatusStageGuideSection) dan Call-to-Action setor baru.
 *
 * Konsep Teknis & Arsitektur Next.js:
 * - Client Component ("use client"): Menggunakan interaktivitas browser dan hooks.
 * - Suspense Boundary: Membungkus komponen yang menggunakan `useSearchParams()` untuk
 *   mencegah de-opt ke CSR penuh dan memenuhi standar kompilasi Next.js App Router.
 * - Sinkronisasi URL Dua Arah (Bidirectional Search Params):
 *   a. Saat komponen mount, parameter URL (?status=...&bulan=...) diinjeksikan ke state hook.
 *   b. Setiap kali filter berubah, URL diperbarui secara halus tanpa reload halaman
 *      menggunakan `window.history.replaceState`.
 * ============================================================================
 */

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HistoriHero from "@/components/histori/HistoriHero";
import HistoriFilterToolbar from "@/components/histori/HistoriFilterToolbar";
import TransactionFeed from "@/components/histori/TransactionFeed";
import StatusStageGuideSection from "@/components/histori/StatusStageGuideSection";
import BottomActionRibbon from "@/components/histori/BottomActionRibbon";
import { useHistoriSetor } from "@/hooks/useHistoriSetor";
import { StatusPenyetoran } from "@/types/historiSetor";

/**
 * Komponen Konten Internal StatusContent:
 * Dieksekusi di dalam Suspense boundary karena membaca query parameters (`useSearchParams`).
 */
function StatusContent() {
  const searchParams = useSearchParams();
  const initialStatus = (searchParams.get("status") as StatusPenyetoran) || undefined;
  const initialBulan = searchParams.get("bulan") || undefined;

  // Mengambil state dan method pengendali dari custom hook useHistoriSetor
  const {
    filteredTransactions,
    summary,
    filterStatus,
    setFilterStatus,
    filterBulan,
    setFilterBulan,
    searchQuery,
    setSearchQuery,
    statusCounts,
    isLoading,
  } = useHistoriSetor();

  // =========================================================================
  // EFEK 1: Inisialisasi Filter dari URL Search Params saat Halaman Dibuka
  // =========================================================================
  React.useEffect(() => {
    if (
      initialStatus &&
      ["menunggu_konfirmasi", "diverifikasi", "selesai", "ditolak"].includes(initialStatus)
    ) {
      setFilterStatus(initialStatus);
    }
    if (initialBulan && /^\d{4}-\d{2}$/.test(initialBulan)) {
      setFilterBulan(initialBulan);
    }
  }, [initialStatus, initialBulan, setFilterStatus, setFilterBulan]);

  // =========================================================================
  // EFEK 2: Sinkronisasi State Filter ke URL Tanpa Hard Reload Halaman
  // =========================================================================
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (filterStatus && filterStatus !== "menunggu_konfirmasi") {
        params.set("status", filterStatus);
      } else {
        params.delete("status");
      }
      if (filterBulan) {
        params.set("bulan", filterBulan);
      }
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, [filterStatus, filterBulan]);

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Header Banner & Keunggulan Layanan Penyetoran */}
      <HistoriHero />

      {/* 2. Toolbar Penyaringan Data: Tabs Status, Pilihan Bulan, dan Pencarian */}
      <HistoriFilterToolbar
        filterStatus={filterStatus}
        onFilterStatusChange={setFilterStatus}
        filterBulan={filterBulan}
        onFilterBulanChange={setFilterBulan}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        statusCounts={statusCounts}
      />

      {/* 3. Daftar Feed Kartu Transaksi Penyetoran */}
      <TransactionFeed transactions={filteredTransactions} isLoading={isLoading} />

      {/* 4. Edukasi 4 Tahapan Siklus Penyetoran & Skala Pengolahan Sampah */}
      <StatusStageGuideSection />

      {/* 5. Banner Ajakan Penyetoran Sampah Baru Sebelum Footer */}
      <BottomActionRibbon />
    </main>
  );
}

/**
 * Komponen Induk Halaman SetorStatusPage:
 * Membungkus konten utama dengan layout Navbar, Suspense Fallback, dan Footer.
 */
export default function SetorStatusPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-text-primary flex flex-col selection:bg-brand-neon selection:text-dark-container">
      {/* Navigasi Utama Aplikasi */}
      <Navbar userRole="nasabah" userPoints={150} userName="Budi Santoso" />

      {/* Suspense Boundary untuk useSearchParams */}
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <div className="w-8 h-8 border-3 border-dark-container border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-semibold text-text-secondary mt-3">
              Memuat histori penyetoran...
            </p>
          </div>
        }
      >
        <StatusContent />
      </Suspense>

      {/* Footer Global Aplikasi */}
      <Footer />
    </div>
  );
}
