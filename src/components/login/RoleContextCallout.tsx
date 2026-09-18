/**
 * @file RoleContextCallout.tsx
 * @description Komponen kartu pemberitahuan konteks peran (Callout Card) pada form login.
 * Menampilkan pesan bantuan kontekstual yang berubah otomatis mengikuti tab peran yang dipilih:
 * - Nasabah: Panduan cek saldo poin, riwayat transaksi, dan penukaran voucher.
 * - Admin Unit: Panduan verifikasi timbangan lapangan, tiket masuk, dan rekapitulasi.
 * 
 * Peran dalam UKK:
 * - Mengurangi kebingungan pengguna (Cognitive Load) dengan memberikan konteks instan mengenai akun yang sedang digunakan.
 * - Menunjukkan penggunaan kondisional rendering berbasis props (`isNasabah ? ... : ...`).
 */

import React from "react";
import { Leaf, Building2 } from "lucide-react"; // Ikon: Daun (Nasabah) & Gedung Unit (Admin)
import { AuthRole } from "@/types/auth"; // Tipe data peran ('NASABAH' | 'ADMIN')

/**
 * Interface props untuk RoleContextCallout
 * @property role - Peran yang sedang aktif untuk menentukan teks dan ikon callout
 */
interface RoleContextCalloutProps {
  role: AuthRole;
}

export default function RoleContextCallout({ role }: RoleContextCalloutProps) {
  // Mengecek apakah peran yang dipilih adalah nasabah
  const isNasabah = role === "NASABAH";

  return (
    /* Kontainer Callout Abu-abu Lembut */
    <div className="bg-inset-gray border border-gray-200 rounded-2xl p-4 mb-6 flex items-start gap-3.5 transition-all">
      
      {/* ─── Ikon Dinamis Berdasarkan Peran ─── */}
      <div className="w-8 h-8 rounded-xl bg-brand-neon/25 text-dark-container flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
        {isNasabah ? (
          <Leaf className="w-4 h-4 text-dark-container fill-dark-container" />
        ) : (
          <Building2 className="w-4 h-4 text-dark-container" />
        )}
      </div>

      {/* ─── Teks Panduan Kontekstual ─── */}
      <p className="text-xs sm:text-[13px] text-text-primary leading-relaxed">
        <strong className="font-bold">
          {isNasabah ? "Portal Nasabah: " : "Konsol Admin Unit: "}
        </strong>
        <span className="text-text-secondary">
          {isNasabah
            ? "Masuk menggunakan username dan password Anda untuk cek saldo poin, riwayat transaksi, dan katalog voucher."
            : "Masuk untuk verifikasi timbangan lapangan, perbarui status pengajuan, dan cetak rekapitulasi bulanan."}
        </span>
      </p>
      
    </div>
  );
}
