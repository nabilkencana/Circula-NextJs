"use client";

/**
 * ============================================================================
 * Halaman: Pengajuan Penyetoran Sampah Terpilah
 * Rute: /setor/ajukan
 * Direktori: src/app/setor/ajukan/page.tsx
 *
 * Fungsi Utama:
 * Halaman formulir utama tempat nasabah merencanakan dan mengajukan transaksi
 * penyetoran limbah daur ulang.
 * Fitur & Komponen Utama:
 * 1. Deep Link Query Params: Membaca `kategoriId` dan `berat` dari URL (misal diarahkan dari
 *    kalkulator daur ulang landing page).
 * 2. `SetorHero`: Visual header representatif dengan 3 pilar jaminan mutu layanan.
 * 3. Split Layout Bento (Desktop 2-Kolom):
 *    - Sisi Kiri (8 kolom / ~65%): `FormPengajuanSetor` (Logistik jadwal, daftar multi-item, terms 3R).
 *    - Sisi Kanan (4 kolom / ~35%): `LiveEstimationSummaryCard` (Sticky real-time counter poin & konversi rupiah)
 *      dan `DropOffProtocolCard` (Tata cara alur penyerahan fisik).
 * 4. `StandarPemeriksaanGuide`: Edukasi kriteria mutu fisik sampah sebelum penyerahan.
 * 5. `BottomReassuranceRibbon`: Banner keamanan transaksi terpusat.
 * 6. Dua Dialog Modal:
 *    - `SetorConfirmModal`: Validasi pra-kirim rincian item.
 *    - `SubmissionSuccessModal`: Tiket resmi STR-YYYYMM-XXXX dengan fitur salin kode transaksi.
 *
 * Konsep Teknis Next.js:
 * - Suspense Boundary: Membungkus `SetorFormContent` karena menggunakan hook `useSearchParams`
 *   agar sesuai kaidah kompilasi Next.js App Router (mencegah error bail-out ke client-only render).
 * ============================================================================
 */

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SetorHero from "@/components/setor/SetorHero";
import FormPengajuanSetor from "@/components/setor/FormPengajuanSetor";
import LiveEstimationSummaryCard from "@/components/setor/LiveEstimationSummaryCard";
import DropOffProtocolCard from "@/components/setor/DropOffProtocolCard";
import StandarPemeriksaanGuide from "@/components/setor/StandarPemeriksaanGuide";
import BottomReassuranceRibbon from "@/components/setor/BottomReassuranceRibbon";
import SubmissionSuccessModal from "@/components/setor/SubmissionSuccessModal";
import SetorConfirmModal from "@/components/setor/SetorConfirmModal";
import { useAjukanSetor } from "@/hooks/useAjukanSetor";

/**
 * Komponen Konten Form Internal:
 * Dieksekusi di dalam Suspense boundary karena membaca query parameters (`useSearchParams`).
 */
function SetorFormContent() {
  const searchParams = useSearchParams();
  const initialParams = {
    kategoriId: searchParams.get("kategoriId"),
    berat: searchParams.get("berat"),
  };

  // Mengambil state dan controller action dari custom hook useAjukanSetor
  const {
    categories,
    tanggal,
    setTanggal,
    metodePenyerahan,
    setMetodePenyerahan,
    catatan,
    setCatatan,
    confirmedTerms,
    setConfirmedTerms,
    items,
    addItem,
    removeItem,
    updateItemCategory,
    updateItemWeight,
    totalEstimasiBerat,
    totalEstimasiPoin,
    totalEstimasiRupiah,
    saldoAkunSaatIni,
    proyeksiSaldoAkhir,
    isSubmitting,
    errorMessage,
    submissionResult,
    isConfirmModalOpen,
    isSuccessModalOpen,
    handleConfirmSubmit,
    handleCloseConfirm,
    handleSubmit,
    closeSuccessModal,
  } = useAjukanSetor(initialParams);

  return (
    <>
      <main className="min-h-screen bg-white">
        {/* 1. Header Banner & Pilar Mutu Penyetoran */}
        <SetorHero />

        {/* 2. Layout Grid 2-Kolom: Formulir Input & Kartu Estimasi Sticky Bento */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Kolom Kiri: Formulir Pengajuan (65% lebar / 8 kolom) */}
            <div className="lg:col-span-8">
              <FormPengajuanSetor
                tanggal={tanggal}
                onTanggalChange={setTanggal}
                metodePenyerahan={metodePenyerahan}
                onMetodeChange={setMetodePenyerahan}
                catatan={catatan}
                onCatatanChange={setCatatan}
                items={items}
                categories={categories}
                onAddItem={addItem}
                onRemoveItem={removeItem}
                onCategoryChange={updateItemCategory}
                onWeightChange={updateItemWeight}
                confirmedTerms={confirmedTerms}
                onConfirmedTermsChange={setConfirmedTerms}
                errorMessage={errorMessage}
              />
            </div>

            {/* Kolom Kanan: Kartu Estimasi Sticky & Panduan Alur (35% lebar / 4 kolom) */}
            <div className="lg:col-span-4 space-y-6">
              <LiveEstimationSummaryCard
                totalItemsCount={items.length}
                totalEstimasiBerat={totalEstimasiBerat}
                totalEstimasiPoin={totalEstimasiPoin}
                totalEstimasiRupiah={totalEstimasiRupiah}
                saldoAkunSaatIni={saldoAkunSaatIni}
                proyeksiSaldoAkhir={proyeksiSaldoAkhir}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
              />

              <DropOffProtocolCard />
            </div>
          </div>
        </section>

        {/* 3. Panduan Kriteria Kualitas & Foto Fasilitas MRF */}
        <StandarPemeriksaanGuide />

        {/* 4. Pita Penjamin Keamanan Transaksi Sebelum Footer */}
        <BottomReassuranceRibbon />
      </main>

      {/* ===================================================================== */}
      {/* MODAL KONFIRMASI PRA-KIRIM                                            */}
      {/* ===================================================================== */}
      <SetorConfirmModal
        isOpen={isConfirmModalOpen}
        items={items}
        tanggal={tanggal}
        metodePenyerahan={metodePenyerahan}
        catatan={catatan}
        totalEstimasiBerat={totalEstimasiBerat}
        totalEstimasiPoin={totalEstimasiPoin}
        totalEstimasiRupiah={totalEstimasiRupiah}
        isSubmitting={isSubmitting}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmSubmit}
      />

      {/* ===================================================================== */}
      {/* MODAL SUKSES PENERBITAN TIKET TRANSAKSI                               */}
      {/* ===================================================================== */}
      <SubmissionSuccessModal
        isOpen={isSuccessModalOpen}
        result={submissionResult}
        onClose={closeSuccessModal}
      />
    </>
  );
}

/**
 * Komponen Induk Halaman AjukanSetorPage:
 * Membungkus konten utama dalam Suspense fallback dan kerangka Navbar + Footer.
 */
export default function AjukanSetorPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-brand-neon selection:text-dark-container">
      {/* Navigasi Utama Terautentikasi */}
      <Navbar userRole="nasabah" userPoints={150} userName="Budi Santoso" />

      {/* Suspense Boundary untuk useSearchParams */}
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-dark-container border-t-brand-neon animate-spin" />
          </div>
        }
      >
        <SetorFormContent />
      </Suspense>

      {/* Footer Global Aplikasi */}
      <Footer />
    </div>
  );
}
