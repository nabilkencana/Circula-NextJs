/**
 * @file TermsComplianceCheckbox.tsx
 * @description Komponen kotak centang (checkbox) kustom untuk persetujuan Syarat & Ketentuan serta Kebijakan Privasi.
 * Didesain ramah aksesibilitas (WAI-ARIA compliant) dan mendukung navigasi keyboard penuh.
 * 
 * Peran dalam UKK:
 * - Mengimplementasikan Custom Checkbox tanpa elemen native `<input type="checkbox">` yang kaku.
 * - Menerapkan standar aksesibilitas keyboard (`tabIndex={0}`, menangani tombol 'Space' dan 'Enter').
 * - Menyediakan umpan balik visual instan (visual feedback) saat state aktif/non-aktif.
 * - Menampilkan pesan error validasi formulir saat pengguna belum mencentang persetujuan.
 */

"use client"; // Komponen interaktif di sisi klien

import React from "react";
import { Check } from "lucide-react"; // Ikon centang dari Lucide React

/**
 * Interface props untuk TermsComplianceCheckbox
 * @property checked - Status boolean apakah checkbox sedang dicentang atau tidak
 * @property error - Pesan kesalahan validasi jika checkbox wajib dicentang namun masih kosong
 * @property onToggle - Fungsi callback untuk membalik status centang (toggle)
 */
interface TermsComplianceCheckboxProps {
  checked: boolean;
  error?: string;
  onToggle: () => void;
}

export default function TermsComplianceCheckbox({
  checked,
  error,
  onToggle,
}: TermsComplianceCheckboxProps) {
  return (
    <div className="pt-2">
      {/* Kontainer Pembungkus dengan handler klik mouse */}
      <div
        onClick={onToggle}
        className="flex items-start gap-3 cursor-pointer group select-none"
      >
        {/* ─── Custom Checkbox Box ─── */}
        <div
          role="checkbox" // Memberitahu screen reader bahwa elemen ini bertindak sebagai checkbox
          aria-checked={checked} // Status aksesibilitas terkini
          tabIndex={0} // Memungkinkan elemen difokuskan menggunakan tombol Tab pada keyboard
          onKeyDown={(e) => {
            // Memungkinkan pengguna mencentang/membatalkan centang dengan menekan Spasi atau Enter
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault(); // Mencegah scrolling halaman saat menekan tombol spasi
              onToggle();
            }
          }}
          className={`w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center transition-colors shrink-0 ${
            checked
              ? "bg-dark-container border-dark-container text-brand-neon" // Warna gelap dengan tanda centang neon
              : "border-gray-300 bg-white group-hover:border-gray-500" // Warna putih netral saat belum dicentang
          }`}
        >
          {/* Menampilkan ikon centang tebal hanya jika kondisi checked bernilai true */}
          {checked && <Check className="w-3.5 h-3.5 stroke-3" />}
        </div>

        {/* ─── Teks Label Ketentuan Layanan & Kebijakan Privasi ─── */}
        <label className="text-xs text-text-secondary leading-relaxed cursor-pointer">
          Saya menyetujui{" "}
          <span className="text-text-primary font-semibold hover:underline">
            Syarat &amp; Ketentuan Layanan
          </span>{" "}
          Bank Sampah Digital Circula serta tunduk pada{" "}
          <span className="text-text-primary font-semibold hover:underline">
            Kebijakan Privasi Perlindungan Data Nasabah
          </span>
          .
        </label>
      </div>

      {/* ─── Pesan Error Validasi ─── */}
      {/* Ditampilkan jika form di-submit tanpa mencentang persetujuan */}
      {error && (
        <p className="text-xs text-red-600 mt-1.5 font-medium pl-8" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
