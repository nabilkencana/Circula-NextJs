/**
 * @file TransaksiTableHeader.tsx
 * @description Bagian kepala (header) kartu tabel transaksi administrasi Circula.
 * Menampilkan judul buku transaksi yang dinamis sesuai tab yang aktif (STR atau TKR) dan periode bulan terpilih,
 * lencana indikator jumlah baris transaksi yang sedang ditampilkan, serta tombol aksi cetak rekap transaksi.
 * 
 * @module Components/AdminTransaksi/TransaksiTableHeader
 */

import React from "react";
import { Printer } from "lucide-react";
import { TransaksiViewType } from "@/types/adminTransaksi";

/**
 * Properti untuk komponen TransaksiTableHeader
 * 
 * @interface TransaksiTableHeaderProps
 * @property {TransaksiViewType} viewType - Tab aktif ("STR" atau "TKR").
 * @property {string} selectedBulan - Label bulan yang sedang ditampilkan (misal: "Agustus 2026").
 * @property {number} displayedCount - Jumlah baris data yang tampil pada halaman saat ini.
 * @property {() => void} onExportRekap - Callback untuk mengekspor atau mencetak rekapitulasi data.
 */
interface TransaksiTableHeaderProps {
  viewType: TransaksiViewType;
  selectedBulan: string;
  displayedCount: number;
  onExportRekap: () => void;
}

/**
 * Komponen TransaksiTableHeader
 * 
 * @component
 * @param {TransaksiTableHeaderProps} props - Data konfigurasi header tabel.
 * @returns {JSX.Element} Baris header kartu tabel dengan judul dan tombol aksi cetak.
 */
export default function TransaksiTableHeader({
  viewType,
  selectedBulan,
  displayedCount,
  onExportRekap,
}: TransaksiTableHeaderProps) {
  // Pembentukan judul kontekstual sesuai jenis transaksi
  const title =
    viewType === "STR"
      ? `Buku Transaksi Penyetoran Sampah (${selectedBulan})`
      : `Buku Transaksi Penukaran Poin Hadiah (${selectedBulan})`;

  return (
    <div className="p-5 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white">
      {/* Kiri: Judul Tabel & Badge Jumlah Data */}
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-sm sm:text-base font-bold text-text-primary">
          {title}
        </h2>
        <span className="bg-inset-gray border border-gray-200 text-xs text-gray-600 px-3 py-1 rounded-full font-semibold">
          {displayedCount} Transaksi Ditampilkan
        </span>
      </div>

      {/* Kanan: Tombol Ekspor/Cetak Rekap */}
      <button
        type="button"
        onClick={onExportRekap}
        className="flex items-center gap-2 border border-gray-200 text-xs font-semibold px-4 py-2 rounded-full text-text-primary hover:bg-gray-50 transition-colors cursor-pointer shadow-2xs"
      >
        <Printer className="w-3.5 h-3.5 text-gray-500" aria-hidden="true" />
        <span>Cetak Rekap Transaksi</span>
      </button>
    </div>
  );
}
