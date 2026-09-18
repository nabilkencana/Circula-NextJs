/**
 * @file page.tsx (app/login)
 * @description Halaman utama Masuk Akun (Login Page) multi-peran aplikasi Circula.
 * Menghubungkan tata letak split-screen responsif:
 * - Kolom Kiri: Hero visual showcase, branding sirkular ekonomi, dan rating kepuasan.
 * - Kolom Kanan: Kartu formulir interaktif masuk akun nasabah / admin unit.
 * - Modal Popup: Dialog notifikasi sukses masuk akun dengan countdown redirect cerdas.
 * 
 * Peran dalam UKK:
 * - Menunjukkan struktur halaman App Router Next.js (`app/login/page.tsx`).
 * - Menghubungkan View layer dengan custom hook controller `useLoginMultiRole`.
 * - Menerapkan layout grid adaptif (`grid-cols-1 lg:grid-cols-12`) yang selaras dengan halaman register.
 */

"use client"; // Halaman interaktif di sisi klien (memproses form dan event browser)

import React from "react";
import Navbar from "@/components/layout/Navbar"; // Komponen navigasi atas global
import LoginHeroShowcase from "@/components/login/LoginHeroShowcase"; // Kartu showcase visual sisi kiri
import LoginFormCard from "@/components/login/LoginFormCard"; // Kartu form login sisi kanan
import LoginSuccessModal from "@/components/login/LoginSuccessModal"; // Modal popup sukses otentikasi
import { useLoginMultiRole } from "@/hooks/useLoginMultiRole"; // Hook pengelola logika form login multi-role

export default function LoginPage() {
  /**
   * Inisialisasi controller hook yang mengelola state kredensial,
   * validasi input, status loading asynchronous, dan komunikasi dengan API backend.
   */
  const controller = useLoginMultiRole();

  return (
    /* Kontainer Halaman Penuh */
    <div className="min-h-screen bg-[#FBFBFB] flex flex-col font-sans text-text-primary antialiased selection:bg-brand-neon selection:text-text-primary">
      
      {/* ─── 1. Bilah Navigasi Konsisten (Navbar Global) ─── */}
      <Navbar />

      {/* ─── 2. Area Konten Utama (Split-Screen Container) ─── */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-310 w-full mx-auto">
          {/* Grid Layout: 1 kolom di mobile, 12 kolom di desktop (lg:) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* Kolom Kiri: Hero Showcase Card (5 kolom dari 12 kolom) */}
            <div className="lg:col-span-5 flex">
              <LoginHeroShowcase />
            </div>

            {/* Kolom Kanan: Interactive Login Card (7 kolom dari 12 kolom) */}
            <div className="lg:col-span-7 flex">
              <LoginFormCard controller={controller} />
            </div>

          </div>
        </div>
      </main>

      {/* ─── 3. Dialog Modal Sukses Autentikasi ─── */}
      {/* Dipasang di level root page agar menutupi viewport dengan efek backdrop blur */}
      <LoginSuccessModal
        isOpen={controller.loginSuccessModalOpen}
        user={controller.loggedInUser}
        onClose={controller.closeSuccessModal}
      />
      
    </div>
  );
}
