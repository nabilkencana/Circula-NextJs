/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Halaman Konsol Administrator - Profil & Pengaturan Unit Operasional
 *
 * File: src/app/admin/profil/page.tsx
 * Rute: /admin/profil
 * Deskripsi:
 * Halaman orchestrator utama pengelolaan profil legalitas dan identitas unit bank sampah.
 * Menyediakan form pengubahan nama unit, penanggung jawab, nomor kontak, alamat loket,
 * jam operasional, kapasitas tampung gudang, foto plang, ringkasan kinerja fasilitas bento,
 * token App Key multi-tenant, dan modal konfirmasi perubahan diff data.
 *
 * Standar Teknis UKK RPL:
 * - Next.js 15 App Router Client Component ("use client").
 * - Split Section Layout responsif: Kolom Kiri 62% untuk formulir, Kolom Kanan 38% untuk Bento Kinerja.
 * - Single Source of Truth melalui hook kustom `useAdminProfil`.
 * - Konsistensi visual dengan NavbarAdminConsole dan Footer.
 */

"use client";

import React from "react";
import NavbarAdminConsole from "@/components/layout/NavbarAdminConsole";
import Footer from "@/components/layout/Footer";
import ProfilHero from "@/components/admin-profil/ProfilHero";
import ProfilFormCard from "@/components/admin-profil/ProfilFormCard";
import KinerjaFasilitasBentoCard from "@/components/admin-profil/KinerjaFasilitasBentoCard";
import AksesCepatPengelolaanCard from "@/components/admin-profil/AksesCepatPengelolaanCard";
import BottomAdminProfilRibbon from "@/components/admin-profil/BottomAdminProfilRibbon";
import SaveProfilConfirmModal from "@/components/admin-profil/SaveProfilConfirmModal";
import { useAdminProfil } from "@/hooks/useAdminProfil";
import { CheckCircle2, AlertCircle } from "lucide-react";

/**
 * Komponen halaman pengaturan profil unit bank sampah konsol admin.
 */
export default function AdminProfilPage() {
  // Mengonsumsi controller hook useAdminProfil
  const controller = useAdminProfil();

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-text-primary antialiased selection:bg-brand-neon selection:text-text-primary">
      {/* 1. Top Admin Console Navigation Bar */}
      <NavbarAdminConsole />

      {/* 2. Main Workspace Layout */}
      <main className="flex-1">
        {/* Dark Hero Showcase */}
        <ProfilHero />

        {/* Central Split Section */}
        <section className="px-4 sm:px-6 py-8 sm:py-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Kolom Kiri (62% width / 7 cols) - Profil Form Card */}
              <div className="lg:col-span-7 xl:col-span-7">
                <ProfilFormCard controller={controller} />
              </div>

              {/* Kolom Kanan (38% width / 5 cols) - Bento Kinerja & Akses Cepat */}
              <div className="lg:col-span-5 xl:col-span-5 space-y-6">
                <KinerjaFasilitasBentoCard
                  unitData={controller.unitData}
                  copiedAppKey={controller.copiedAppKey}
                  onCopyAppKey={controller.handleCopyAppKey}
                />
                <AksesCepatPengelolaanCard />
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Security & Reassurance Ribbon */}
        <BottomAdminProfilRibbon />
      </main>

      {/* 3. Footer */}
      <Footer />

      {/* 4. Save Profile Confirmation Modal Dialog */}
      <SaveProfilConfirmModal
        isOpen={controller.isConfirmModalOpen}
        unitData={controller.unitData}
        formData={controller.formData}
        isSaving={controller.isSaving}
        onClose={controller.handleCloseConfirm}
        onConfirm={controller.handleConfirmSave}
      />

      {/* 5. Feedback Toast Notification */}
      {controller.toast.show && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div
            className={`px-5 py-3.5 rounded-2xl shadow-xl border flex items-center gap-3 ${
              controller.toast.type === "success"
                ? "bg-dark-container text-white border-brand-neon/30"
                : "bg-red-900 text-white border-red-500/30"
            }`}
          >
            {controller.toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-brand-neon shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <span className="text-xs sm:text-sm font-semibold">
              {controller.toast.message}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
