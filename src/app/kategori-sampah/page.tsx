/**
 * @file page.tsx
 * @description Halaman utama Katalog Kategori Sampah Circula (Rute: `/kategori-sampah`).
 * Mengintegrasikan seluruh komponen presentasional katalog dengan custom hook `useKatalogSampah`.
 * Menyediakan filter real-time, pencarian teks, grid kartu kategori daur ulang,
 * modal interaktif kalkulator estimasi poin, panduan standar mutu penyetoran, dan spanduk CTA.
 * 
 * @module App/KategoriSampahPage
 */

"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import KatalogHero from "@/components/katalog/KatalogHero";
import KatalogToolbar from "@/components/katalog/KatalogToolbar";
import KatalogGrid from "@/components/katalog/KatalogGrid";
import StandarPemeriksaanSection from "@/components/katalog/StandarPemeriksaanSection";
import KatalogPreFooterCTA from "@/components/katalog/KatalogPreFooterCTA";
import LivePointEstimatorModal from "@/components/katalog/LivePointEstimatorModal";
import { useKatalogSampah } from "@/hooks/useKatalogSampah";

/**
 * Halaman KategoriSampahPage
 * 
 * @component
 * @returns {JSX.Element} Halaman katalog komprehensif untuk edukasi dan referensi harga/poin kategori sampah warga.
 */
export default function KategoriSampahPage() {
  // Destrukturisasi state dan handler dari custom hook katalog sampah
  const {
    filteredItems,
    isLoading,
    filterState,
    setSearchQuery,
    setSelectedJenis,
    // State dan handler kendali modal kalkulator estimasi
    isEstimatorOpen,
    activeEstimatorItem,
    openEstimator,
    closeEstimator,
  } = useKatalogSampah();

  return (
    <div className="min-h-screen bg-white text-text-primary font-sans antialiased flex flex-col selection:bg-brand-neon selection:text-text-primary">
      {/* Header Navigasi Publik Circula */}
      <Navbar />

      <main className="flex-1">
        {/* Bagian Hero: Judul, Subtitle, dan Sorotan Metrik Kategori */}
        <KatalogHero />

        {/* Bilah Alat Pencarian & Filter Kategori Berdasarkan Jenis */}
        <KatalogToolbar
          searchQuery={filterState.searchQuery}
          onSearchChange={setSearchQuery}
          selectedJenis={filterState.selectedJenis}
          onSelectJenis={setSelectedJenis}
          totalResults={filteredItems.length}
        />

        {/* Grid Kartu Katalog Kategori Sampah (dengan indikator skeleton saat memuat) */}
        <KatalogGrid
          items={filteredItems}
          isLoading={isLoading}
          onOpenEstimator={openEstimator}
        />

        {/* Bagian Edukasi Standar Pemeriksaan Mutu 3R dan Fasilitas Circula */}
        <StandarPemeriksaanSection />

        {/* Spanduk Ajakan Bertindak (CTA) Menuju Pengajuan Penyetoran */}
        <KatalogPreFooterCTA />
      </main>

      {/* Footer Global Perusahaan / Layanan Circula */}
      <Footer />

      {/* Modal Interaktif Kalkulator Estimasi Poin Berdasarkan Bobot (Kg) */}
      <LivePointEstimatorModal
        isOpen={isEstimatorOpen}
        item={activeEstimatorItem}
        onClose={closeEstimator}
      />
    </div>
  );
}
