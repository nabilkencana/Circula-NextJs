/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Komponen Paginasi Tabel Buku Induk Nasabah Admin
 *
 * File: src/components/admin-nasabah/NasabahPagination.tsx
 * Deskripsi:
 * Mengontrol navigasi halaman tabel data nasabah (menampilkan info jumlah data yang tampil
 * vs total data terfilter, tombol halaman sebelumnya/berikutnya, serta tombol nomor halaman).
 *
 * Standar Teknis UKK RPL:
 * - Komponen pagination berbasis tombol interaktif dengan kondisi disable saat batas awal/akhir tercapai.
 * - Indikator visual halaman aktif dengan warna kontras `bg-dark-container text-white`.
 * - Teks rekapitulasi data informatif untuk akuntabilitas tampilan data.
 */

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Properti komponen NasabahPagination.
 */
interface NasabahPaginationProps {
  /** Jumlah data yang sedang ditampilkan pada halaman saat ini */
  displayedCount: number;
  /** Jumlah total data hasil penyaringan */
  totalCount: number;
  /** Nomor halaman yang sedang aktif */
  currentPage: number;
  /** Jumlah total halaman yang tersedia */
  totalPages: number;
  /** Callback saat pengguna berpindah halaman */
  onPageChange: (page: number) => void;
}

/**
 * Komponen navigasi paginasi data nasabah.
 */
export default function NasabahPagination({
  displayedCount,
  totalCount,
  currentPage,
  totalPages,
  onPageChange,
}: NasabahPaginationProps) {
  // Menghasilkan daftar nomor halaman yang ditampilkan
  const pages = Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 bg-white border-t border-gray-200 text-xs text-gray-500">
      {/* Left Text */}
      <p className="text-gray-400 text-xs">
        Menampilkan{" "}
        <span className="font-semibold text-text-primary">{displayedCount}</span> dari{" "}
        <span className="font-semibold text-text-primary">{totalCount}</span> nasabah terdaftar
      </p>

      {/* Right Pagination Controls */}
      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
          className="w-7 h-7 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:text-text-primary hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          aria-label="Halaman sebelumnya"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Page Numbers */}
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ${
              currentPage === p
                ? "bg-dark-container text-white shadow-xs"
                : "text-gray-600 hover:text-text-primary hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        ))}

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage >= totalPages}
          className="w-7 h-7 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:text-text-primary hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          aria-label="Halaman berikutnya"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
