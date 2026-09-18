/**
 * @file page.tsx (app/register)
 * @description Halaman utama Pendaftaran Nasabah Baru (Register Page) aplikasi Circula.
 * Mengusung tata letak split-screen responsif:
 * - Kolom Kiri: Hero visual showcase, branding daur ulang, dan metrik nasabah aktif.
 * - Kolom Kanan: Kartu formulir pendaftaran nasabah terintegrasi.
 * - Modal Popup: Dialog notifikasi sukses pendaftaran dengan countdown redirect.
 * 
 * Peran dalam UKK:
 * - Menunjukkan struktur halaman Next.js App Router (`app/register/page.tsx`).
 * - Menghubungkan View layer dengan Logic layer melalui custom hook `useRegisterNasabah`.
 * - Menerapkan layout grid adaptif (`grid-cols-1 lg:grid-cols-12`) yang mobile-first dan responsif.
 */

"use client"; // Halaman membutuhkan interaktivitas form di sisi browser

import React from "react";
import Navbar from "@/components/layout/Navbar"; // Komponen navigasi atas aplikasi
import RegisterHeroShowcase from "@/components/register/RegisterHeroShowcase"; // Kartu showcase visual sisi kiri
import RegisterFormCard from "@/components/register/RegisterFormCard"; // Kartu formulir pendaftaran sisi kanan
import RegistrationSuccessModal from "@/components/register/RegistrationSuccessModal"; // Modal popup sukses
import { useRegisterNasabah } from "@/hooks/useRegisterNasabah"; // Custom hook pengelola logika state form registrasi

export default function RegisterPage() {
  /**
   * Inisialisasi controller hook yang mengelola state data pendaftaran,
   * error validation, uploading foto profil, dan request API backend.
   */
  const controller = useRegisterNasabah();

  return (
    /* Kontainer Halaman Penuh:
       - min-h-screen: Memastikan halaman setidaknya setinggi viewport layar
       - bg-[#FBFBFB]: Abu-abu sangat lembut untuk kontras kartu putih
       - selection:bg-brand-neon: Warna highlight teks saat di-blok dengan kursor
    */
    <div className="min-h-screen bg-[#FBFBFB] flex flex-col font-sans text-text-primary antialiased selection:bg-brand-neon selection:text-text-primary">
      {/* ─── 1. Bilah Navigasi Konsisten (Navbar Global) ─── */}
      <Navbar />

      {/* ─── 2. Area Konten Utama (Split-Screen Container) ─── */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-310 w-full mx-auto">
          {/* Grid Layout: 1 kolom di mobile/tablet, 12 kolom di desktop (lg:) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* Kolom Kiri: Hero Showcase Card (5 kolom dari 12 kolom) */}
            <div className="lg:col-span-5 flex">
              <RegisterHeroShowcase />
            </div>

            {/* Kolom Kanan: Registration Form Card (7 kolom dari 12 kolom) */}
            <div className="lg:col-span-7 flex">
              <RegisterFormCard controller={controller} />
            </div>

          </div>
        </div>
      </main>

      {/* ─── 3. Dialog Modal Sukses Pendaftaran ─── */}
      {/* Dirender di level page root agar posisinya fixed dan menutupi seluruh layar saat terbuka */}
      <RegistrationSuccessModal
        isOpen={controller.isSuccessModalOpen}
        data={controller.registeredData}
        onClose={controller.closeSuccessModal}
      />
    </div>
  );
}
