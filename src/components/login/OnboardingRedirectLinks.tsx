/**
 * @file OnboardingRedirectLinks.tsx
 * @description Komponen baris tautan pengalihan onboarding di bagian bawah kartu formulir masuk.
 * Menghubungkan pengguna yang belum memiliki akun ke halaman registrasi yang sesuai:
 * 1. Pendaftaran Nasabah Baru (`/register`).
 * 2. Registrasi Unit Bank Sampah Fisik (`/admin/register`).
 * 
 * Peran dalam UKK:
 * - Menjamin alur konversi pengguna (User Conversion Funnel) tetap mengalir tanpa jalan buntu.
 * - Menggunakan pemisah titik halus (`•`) yang adaptif terhadap ukuran layar (responsif).
 */

import React from "react";
import Link from "next/link"; // Komponen navigasi Next.js
import { ArrowRight, Building2 } from "lucide-react"; // Ikon: Panah Kanan & Gedung Kantor Unit

export default function OnboardingRedirectLinks() {
  return (
    <div className="mt-6 pt-6 border-t border-gray-100">
      
      {/* ─── Garis Pemisah dengan Teks Tengah ─── */}
      <div className="relative flex items-center justify-center mb-5">
        <span className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold px-3 bg-white">
          atau buat akun baru
        </span>
      </div>

      {/* ─── Baris Pilihan Pendaftaran Akun ─── */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs font-bold text-text-primary">
        
        {/* Tautan Pendaftaran Nasabah Individu */}
        <Link
          href="/register"
          className="hover:underline flex items-center gap-1.5 transition-colors py-1 group"
        >
          <span>Daftar Akun Nasabah</span>
          <ArrowRight className="w-3.5 h-3.5 text-text-primary group-hover:translate-x-0.5 transition-transform" />
        </Link>

        {/* Titik Pemisah Dekoratif: Disembunyikan di mobile agar tersusun rapi secara vertikal */}
        <span className="hidden sm:inline text-gray-300">•</span>

        {/* Tautan Pendaftaran Unit Pengelola Bank Sampah */}
        <Link
          href="/admin/register"
          className="hover:underline flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors py-1 group"
        >
          <Building2 className="w-3.5 h-3.5 text-text-secondary group-hover:text-text-primary transition-colors" />
          <span>Registrasi Unit Bank Sampah</span>
        </Link>
        
      </div>
    </div>
  );
}
