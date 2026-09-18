"use client";

import React from "react";
import { Download, Printer } from "lucide-react";
import { TipeNota } from "@/types/nota";

/**
 * Interface properties untuk komponen bilah aksi nota (NotaActionToolbar).
 */
interface NotaActionToolbarProps {
  /** Tab tipe nota yang sedang aktif ('setor' atau 'tukar') */
  activeTab: TipeNota;
  /** Callback untuk mengubah tab tipe nota aktif */
  onTabChange: (tab: TipeNota) => void;
  /** Callback untuk memicu dialog cetak struk browser */
  onPrint: () => void;
  /** Callback untuk memicu unduhan nota dalam format PDF */
  onDownloadPdf: () => void;
}

/**
 * Komponen Bilah Alat Aksi Cetak & Pilihan Nota (NotaActionToolbar)
 *
 * Menyediakan kontrol interaktif di atas lembar struk:
 * 1. Segmented Button Switcher: Beralih pratinjau antara Nota Penyetoran (STR) dan Nota Penukaran (TKR).
 * 2. Tombol Unduh PDF: Membuka dialog simpan berkas PDF.
 * 3. Tombol Cetak Nota Transaksi: Tombol beraksen hijau neon untuk mencetak ke printer thermal / kertas.
 * 4. Komponen disembunyikan otomatis saat mode cetak (`print:hidden`).
 *
 * @param props Properti tab aktif dan callback cetak
 * @returns JSX Element bilah aksi nota
 */
export default function NotaActionToolbar({
  activeTab,
  onTabChange,
  onPrint,
  onDownloadPdf,
}: NotaActionToolbarProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-0 pt-8 pb-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 print:hidden">
      {/* Sisi Kiri: Segmented Switcher Jenis Nota */}
      <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full border border-gray-200 self-start sm:self-auto">
        <button
          type="button"
          onClick={() => onTabChange("setor")}
          className={`px-4 sm:px-5 py-2 rounded-full text-xs transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "setor"
              ? "bg-dark-container text-white font-bold shadow-xs"
              : "text-text-secondary hover:text-text-primary font-semibold hover:bg-white/50"
          }`}
        >
          Nota Penyetoran Sampah (STR)
        </button>

        <button
          type="button"
          onClick={() => onTabChange("tukar")}
          className={`px-4 sm:px-5 py-2 rounded-full text-xs transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "tukar"
              ? "bg-dark-container text-white font-bold shadow-xs"
              : "text-text-secondary hover:text-text-primary font-semibold hover:bg-white/50"
          }`}
        >
          Nota Penukaran Poin (TKR)
        </button>
      </div>

      {/* Sisi Kanan: Tombol Aksi Unduh PDF & Cetak Struk Fisik */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onDownloadPdf}
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 border border-gray-200 bg-white text-text-primary font-bold text-xs px-5 py-2.5 rounded-full hover:bg-inset-gray hover:border-gray-300 transition-all shadow-xs cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-text-secondary" />
          <span>Unduh PDF</span>
        </button>

        <button
          type="button"
          onClick={onPrint}
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-brand-neon hover:bg-brand-neon-hover text-dark-container font-extrabold text-xs px-6 py-2.5 rounded-full transition-all shadow-xs cursor-pointer active:scale-[0.98]"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Cetak Nota Transaksi</span>
        </button>
      </div>
    </div>
  );
}

