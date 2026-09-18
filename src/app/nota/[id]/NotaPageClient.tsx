"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NotaHero from "@/components/nota/NotaHero";
import NotaActionToolbar from "@/components/nota/NotaActionToolbar";
import DigitalReceiptCard from "@/components/nota/DigitalReceiptCard";
import VariantTkrPreviewBox from "@/components/nota/VariantTkrPreviewBox";
import BottomNotaRibbon from "@/components/nota/BottomNotaRibbon";
import { useNotaDetail } from "@/hooks/useNotaDetail";

/**
 * Interface properties untuk komponen klien halaman detail nota.
 */
interface NotaPageClientProps {
  /** Parameter identifier transaksi (UUID atau kode transaksi) */
  id: string;
}

/**
 * Komponen Kontainer Klien Halaman Detail Nota Transaksi (NotaPageClient)
 *
 * Mengatur tata letak tampilan ganda:
 * 1. Tampilan Layar (Screen View):
 *    - Menyertakan Navbar global, banner hero gelap, toolbar tombol cetak/unduh,
 *      kartu lembar nota, pratinjau variasi nota, banner reassurance, dan footer global.
 * 2. Tampilan Cetak Fisik / PDF (Print View):
 *    - Memanfaatkan utilitas Tailwind `print:hidden` untuk menyembunyikan semua elemen navigasi,
 *      banner hero, dan footer, sehingga hanya lembar kartu struk `DigitalReceiptCard`
 *      yang dicetak pada kertas/dokumen PDF secara bersih dan hemat tinta.
 *
 * @param props Properti ID transaksi
 * @returns JSX Element antarmuka halaman cetak nota
 */
export default function NotaPageClient({ id }: NotaPageClientProps) {
  // Ambil state dan aksi pengendali nota dari custom hook
  const {
    activeTab,
    setActiveTab,
    notaSetor,
    notaTukar,
    handlePrint,
    handleDownloadPdf,
    isLoading,
  } = useNotaDetail(id);

  // Ambil objek data aktif berdasarkan tab yang sedang dipilih
  const activeData = activeTab === "setor" ? notaSetor : notaTukar;

  return (
    <div className="min-h-screen bg-white font-sans text-text-primary flex flex-col selection:bg-brand-neon selection:text-dark-container print:bg-white print:text-black">
      {/* Navbar Global (disembunyikan saat dicetak) */}
      <div className="print:hidden">
        <Navbar userRole="nasabah" />
      </div>

      <main className="min-h-screen bg-white pb-6 print:pb-0 print:m-0">
        {/* Banner Hero Nota (disembunyikan saat dicetak) */}
        <NotaHero />

        {/* Toolbar Aksi Cetak & Pilihan Tab (disembunyikan saat dicetak) */}
        <NotaActionToolbar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onPrint={handlePrint}
          onDownloadPdf={handleDownloadPdf}
        />

        {/* Lembar Struk Digital (tetap tampil dan terformat saat dicetak) */}
        {activeData ? (
          <DigitalReceiptCard
            activeTab={activeTab}
            notaSetor={notaSetor}
            notaTukar={notaTukar}
          />
        ) : (
          /* Tampilan Pemuatan / Kesalahan jika Nota Tidak Ditemukan */
          <div className="max-w-4xl mx-auto my-4 bg-white border border-gray-200 rounded-3xl p-10 text-center">
            <p className="text-lg font-bold text-text-primary">
              {isLoading ? "Muat nota…" : "Nota tidak ditemukan"}
            </p>
            <p className="text-sm text-text-secondary mt-1">
              {isLoading
                ? "Sedang memuat data transaksi."
                : "Transaksi tidak dapat dimuat. Periksa kembali kode transaksi."}
            </p>
          </div>
        )}

        {/* Kotak Pratinjau Variasi Nota Hadiah (disembunyikan saat dicetak) */}
        <VariantTkrPreviewBox />

        {/* Banner Keamanan Data (disembunyikan saat dicetak) */}
        <BottomNotaRibbon />
      </main>

      {/* Footer Global (disembunyikan saat dicetak) */}
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}

