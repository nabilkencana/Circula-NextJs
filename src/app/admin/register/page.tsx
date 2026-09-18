/**
 * @file page.tsx (Admin Register Page)
 * @description Halaman utama rute Next.js App Router (`/admin/register`) untuk pendaftaran unit operasional Bank Sampah baru.
 * Menerapkan tata letak split-screen dua kolom yang selaras dengan halaman registrasi nasabah dan login:
 * - Kolom Kiri: Kartu Hero Showcase (`RegisterHeroShowcase`) yang mengedukasi fitur ekosistem sirkular.
 * - Kolom Kanan: Formulir pendaftaran unit admin (`AdminRegisterFormCard`) dengan validasi terintegrasi.
 * - Dialog Konfirmasi: Modal sukses (`AdminRegisterSuccessModal`) yang muncul secara reaktif setelah submit berhasil.
 *
 * @author Tim Pengembang Circula
 * @version 1.0.0
 */

"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import RegisterHeroShowcase from "@/components/register/RegisterHeroShowcase";
import AdminRegisterFormCard from "@/components/admin-register/AdminRegisterFormCard";
import AdminRegisterSuccessModal from "@/components/admin-register/AdminRegisterSuccessModal";
import { useRegisterAdminUnit } from "@/hooks/useRegisterAdminUnit";

/**
 * Komponen AdminRegisterPage
 * 
 * Halaman tingkat rute (Route Page Component) bertipe Client Component ("use client")
 * yang mengorkestrasi alur pendaftaran unit operasional melalui custom hook `useRegisterAdminUnit`.
 */
export default function AdminRegisterPage() {
  // Menginisialisasi controller kustom untuk mengelola state form, validasi error, dan modal
  const controller = useRegisterAdminUnit();

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex flex-col font-sans text-text-primary antialiased selection:bg-brand-neon selection:text-text-primary">
      {/* Bilah Navigasi Konsisten Atas */}
      <Navbar />

      {/* Kontainer Utama Split-Screen — Selaras dengan Tata Letak Login dan Register Nasabah */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-310 w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Kolom Kiri (Kartu Hero Showcase Ekosistem Circula) */}
            <div className="lg:col-span-5 flex">
              <RegisterHeroShowcase />
            </div>

            {/* Kolom Kanan (Formulir Pendaftaran Unit dengan Capsule Role Switcher) */}
            <div className="lg:col-span-7 flex">
              <AdminRegisterFormCard controller={controller} />
            </div>
          </div>
        </div>
      </main>

      {/* Modal Dialog Konfirmasi Keberhasilan Registrasi Unit Admin */}
      <AdminRegisterSuccessModal
        isOpen={controller.isSuccessModalOpen}
        data={controller.registeredData}
        onClose={controller.closeSuccessModal}
      />
    </div>
  );
}
