/**
 * @file RoleSegmentSwitcher.tsx
 * @description Komponen pengalih segmen peran pada halaman masuk (Login Role Switcher).
 * Memungkinkan pengguna beralih antara login sebagai:
 * 1. "NASABAH" (Masyarakat/penabung sampah).
 * 2. "ADMIN" (Petugas loket penimbangan atau pengurus unit bank sampah).
 * 
 * Peran dalam UKK:
 * - Menunjukkan arsitektur Multi-Role Authentication pada frontend.
 * - Mengubah perilaku formulir login dan payload otentikasi secara dinamis berdasarkan state `activeRole`.
 * - Menerapkan atribut aksesibilitas WAI-ARIA `aria-pressed` untuk pembaca layar (Screen Reader).
 */

"use client"; // Komponen interaktif di sisi klien

import React from "react";
import { Leaf, Building2 } from "lucide-react"; // Ikon: Daun (Nasabah) & Gedung Unit (Admin)
import { AuthRole } from "@/types/auth"; // Tipe data peran ('NASABAH' | 'ADMIN')

/**
 * Interface props untuk RoleSegmentSwitcher
 * @property activeRole - Nilai peran yang sedang aktif saat ini ('NASABAH' atau 'ADMIN')
 * @property onRoleChange - Callback fungsi untuk memperbarui peran aktif di state form induk
 */
interface RoleSegmentSwitcherProps {
  activeRole: AuthRole;
  onRoleChange: (role: AuthRole) => void;
}

export default function RoleSegmentSwitcher({
  activeRole,
  onRoleChange,
}: RoleSegmentSwitcherProps) {
  return (
    /* Kontainer Kapsul Track:
       - w-full: Memenuhi lebar kartu form
       - bg-[#F4F5F4]: Abu-abu muda netral sebagai lintasan kapsul
       - rounded-full: Bentuk kapsul melingkar penuh
    */
    <div className="w-full bg-[#F4F5F4] p-1.5 rounded-full flex items-center mb-6 border border-gray-200/80">
      
      {/* ─── Tab A: Masuk sebagai Nasabah ─── */}
      <button
        type="button"
        onClick={() => onRoleChange("NASABAH")}
        className={`flex-1 py-2.5 px-3 sm:px-4 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
          activeRole === "NASABAH"
            ? "bg-dark-container text-white shadow-sm" // Styling tombol aktif: Kontainer gelap teks putih
            : "text-text-secondary hover:text-text-primary hover:bg-white/50" // Styling inaktif
        }`}
        aria-pressed={activeRole === "NASABAH"} // Menginformasikan status tombol aktif ke assistive technology
      >
        <Leaf
          className={`w-4 h-4 shrink-0 ${
            activeRole === "NASABAH" ? "text-brand-neon" : "text-text-secondary"
          }`}
        />
        <span>Masuk sebagai Nasabah</span>
      </button>

      {/* ─── Tab B: Masuk sebagai Admin Unit Bank Sampah ─── */}
      <button
        type="button"
        onClick={() => onRoleChange("ADMIN")}
        className={`flex-1 py-2.5 px-3 sm:px-4 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
          activeRole === "ADMIN"
            ? "bg-dark-container text-white shadow-sm"
            : "text-text-secondary hover:text-text-primary hover:bg-white/50"
        }`}
        aria-pressed={activeRole === "ADMIN"}
      >
        <Building2
          className={`w-4 h-4 shrink-0 ${
            activeRole === "ADMIN" ? "text-brand-neon" : "text-text-secondary"
          }`}
        />
        <span>Masuk sebagai Admin Unit</span>
      </button>
      
    </div>
  );
}
