/**
 * @file BottomAdminDashboardRibbon.tsx
 * @description Komponen pita (ribbon) penutup di bagian bawah area kerja dashboard administrasi Circula.
 * Menampilkan pesan konfirmasi konektivitas basis data terenkripsi ke unit operasional bank sampah aktif,
 * serta tombol tautan cepat menuju halaman konfigurasi profil unit (`/admin/profil`).
 * 
 * @module Components/AdminDashboard/BottomAdminDashboardRibbon
 */

"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

/**
 * Properti untuk komponen BottomAdminDashboardRibbon
 * 
 * @interface BottomAdminDashboardRibbonProps
 * @property {string} [unitNama] - Nama unit bank sampah aktif (default: "Bank Sampah Asri Jaya").
 * @property {() => void} [onNavigateProfil] - Callback kustom untuk navigasi ke profil unit.
 */
interface BottomAdminDashboardRibbonProps {
  unitNama?: string;
  onNavigateProfil?: () => void;
}

/**
 * Komponen BottomAdminDashboardRibbon
 * 
 * @component
 * @param {BottomAdminDashboardRibbonProps} props - Properti nama unit dan handler navigasi.
 * @returns {JSX.Element} Pita informasi berdesain kontainer gelap dengan ikon sertifikasi keamanan.
 */
export default function BottomAdminDashboardRibbon({
  unitNama = "Unit Bank Sampah Circula",
  onNavigateProfil,
}: BottomAdminDashboardRibbonProps) {
  return (
    <div className="bg-dark-container text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 border border-white/10 shadow-sm">
      
      {/* ===================================================================== */}
      {/* INFORMASI KEAMANAN & ENKRIPSI DATA OPERASIONAL                        */}
      {/* ===================================================================== */}
      <div className="flex items-center gap-3.5 text-xs sm:text-sm">
        <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-brand-neon">
          <ShieldCheck className="w-5 h-5 text-brand-neon" aria-hidden="true" />
        </div>
        <p className="text-gray-300 leading-relaxed">
          Dashboard operasional terhubung langsung ke basis data unit{" "}
          <strong className="text-white font-bold">{unitNama}</strong> dengan proteksi enkripsi data tingkat tinggi.
        </p>
      </div>

      {/* ===================================================================== */}
      {/* TAUTAN CEPAT PENGATURAN PROFIL UNIT OPERASIONAL                       */}
      {/* ===================================================================== */}
      <Link
        href="/admin/profil"
        onClick={(e) => {
          if (onNavigateProfil) {
            e.preventDefault();
            onNavigateProfil();
          }
        }}
        className="text-brand-neon hover:text-brand-neon-hover text-xs font-bold inline-flex items-center gap-1.5 whitespace-nowrap transition-colors group shrink-0"
      >
        <span>Buka Pengaturan Profil Unit</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>

    </div>
  );
}
