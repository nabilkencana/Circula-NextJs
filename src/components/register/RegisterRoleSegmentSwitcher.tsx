/**
 * @file RegisterRoleSegmentSwitcher.tsx
 * @description Komponen pengalih segmen peran pendaftaran (Capsule Pill Switcher).
 * Memungkinkan calon pengguna memilih apakah ingin mendaftar sebagai:
 * 1. "Nasabah" (penabung sampah perorangan/rumah tangga).
 * 2. "Admin Unit" (pengurus atau loket unit bank sampah fisik).
 * 
 * Peran dalam UKK:
 * - Menunjukkan pola navigasi berbasis peran (Role-Based Onboarding).
 * - Menerapkan prinsip aksesibilitas web dengan atribut WAI-ARIA (aria-current="page").
 * - Menggunakan micro-interaction dengan styling transisi Tailwind yang halus.
 */

"use client"; // Komponen interaktif di sisi klien

import React from "react";
import Link from "next/link"; // Komponen navigasi internal Next.js tanpa refresh browser
import { Leaf, Store } from "lucide-react"; // Ikon: Leaf (Daun untuk nasabah) & Store (Toko/Loket untuk unit bank sampah)

/**
 * Interface props untuk RegisterRoleSegmentSwitcher
 * @property activeRole - Peran yang saat ini sedang aktif ('nasabah' atau 'admin')
 */
interface RegisterRoleSegmentSwitcherProps {
  activeRole: "nasabah" | "admin";
}

/**
 * Komponen RegisterRoleSegmentSwitcher
 * Berbentuk kapsul lonjong (rounded-full) dengan pill aktif berwarna gelap dan teks kontras.
 */
export default function RegisterRoleSegmentSwitcher({
  activeRole,
}: RegisterRoleSegmentSwitcherProps) {
  // Menentukan apakah tab yang aktif saat ini adalah 'nasabah'
  const isNasabah = activeRole === "nasabah";

  return (
    /* Kontainer Luar:
       - inline-flex: Lebar mengikuti isi (tidak memanjang penuh)
       - bg-[#F3F4F6]: Abu-abu muda netral sebagai background track kapsul
       - rounded-full: Bentuk lonjong kapsul
    */
    <div className="bg-[#F3F4F6] p-1.5 rounded-full inline-flex items-center gap-1 self-start mb-6">
      
      {/* ─── Tab 1: Pendaftaran Akun Nasabah ─── */}
      <Link
        href="/register"
        className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
          isNasabah
            ? "bg-[#111315] text-white shadow-xs" // Styling saat aktif: Background gelap & bayangan lembut
            : "text-gray-600 hover:text-gray-900" // Styling saat inaktif: Teks abu-abu
        }`}
        aria-current={isNasabah ? "page" : undefined} // Standar aksesibilitas untuk pembaca layar (Screen Reader)
      >
        {/* Ikon Daun: Berwarna hijau neon saat tab aktif */}
        <Leaf
          className={`w-3.5 h-3.5 transition-colors ${
            isNasabah ? "text-brand-neon" : "text-gray-400"
          }`}
        />
        <span>Daftar sebagai Nasabah</span>
      </Link>

      {/* ─── Tab 2: Pendaftaran Unit Bank Sampah (Admin / Loket) ─── */}
      <Link
        href="/admin/register"
        className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
          !isNasabah
            ? "bg-[#111315] text-white shadow-xs"
            : "text-gray-600 hover:text-gray-900"
        }`}
        aria-current={!isNasabah ? "page" : undefined}
      >
        {/* Ikon Toko/Loket: Berwarna hijau neon saat tab aktif */}
        <Store
          className={`w-3.5 h-3.5 transition-colors ${
            !isNasabah ? "text-brand-neon" : "text-gray-400"
          }`}
        />
        <span>Daftarkan Unit Bank Sampah</span>
      </Link>
    </div>
  );
}
