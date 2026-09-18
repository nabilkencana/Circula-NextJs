/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Halaman Konsol Administrator - Master Katalog Hadiah & Reward
 *
 * File: src/app/admin/hadiah/page.tsx
 * Rute: /admin/hadiah
 * Deskripsi:
 * Halaman orchestrator utama bagi pengelola bank sampah untuk mengatur master inventaris
 * barang penukaran poin nasabah (voucher, sembako, merchandise), mengatur harga poin,
 * memantau level stok kritis, memicu restok, serta memeriksa audit riwayat mutasi barang.
 *
 * Standar Teknis UKK RPL:
 * - Next.js 15 App Router Client Component ("use client").
 * - Arsitektur Modular: Mengombinasikan Hero, Toolbar, 4-Card Grid, Drawer Modal, Dialog Hapus, dan Modal Riwayat Stok.
 * - Single Source of Truth via custom hook `useAdminHadiah`.
 * - Konsistensi UI dengan NavbarAdminConsole dan FooterAdmin.
 */

"use client";

import React from "react";
import NavbarAdminConsole from "@/components/layout/NavbarAdminConsole";
import FooterAdmin from "@/components/layout/FooterAdmin";
import HadiahHero from "@/components/admin-hadiah/HadiahHero";
import HadiahToolbar from "@/components/admin-hadiah/HadiahToolbar";
import HadiahGridCard from "@/components/admin-hadiah/HadiahGridCard";
import HadiahDrawerModal from "@/components/admin-hadiah/HadiahDrawerModal";
import DeleteHadiahConfirmModal from "@/components/admin-hadiah/DeleteHadiahConfirmModal";
import RiwayatStokModal from "@/components/admin-hadiah/RiwayatStokModal";
import BottomAdminHadiahRibbon from "@/components/admin-hadiah/BottomAdminHadiahRibbon";
import { useAdminHadiah } from "@/hooks/useAdminHadiah";
import { CheckCircle2, AlertCircle } from "lucide-react";

/**
 * Komponen utama halaman pengelolaan katalog hadiah administrator.
 */
export default function AdminHadiahPage() {
  // Mengonsumsi seluruh state dan dispatch handler dari hook kustom
  const {
    filteredList,
    filterState,
    stats,
    isDrawerOpen,
    drawerMode,
    selectedHadiah,
    isDeleteModalOpen,
    isRiwayatModalOpen,
    riwayatList,
    isSubmitting,
    toast,
    handleSearch,
    handleFilterTab,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDelete,
    handleOpenRiwayat,
    handleCloseDrawer,
    handleCloseDeleteModal,
    handleCloseRiwayatModal,
    handleSave,
    handleConfirmDelete,
  } = useAdminHadiah();

  return (
    <div className="min-h-screen bg-white font-sans text-text-primary flex flex-col justify-between selection:bg-brand-neon selection:text-dark-container">
      {/* 1. SINGLE TOP NAVBAR ONLY */}
      <NavbarAdminConsole />

      {/* Floating Feedback Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 animate-in slide-in-from-top-3 fade-in duration-200">
          <div
            className={`flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl border backdrop-blur-md ${
              toast.type === "success"
                ? "bg-emerald-950/90 text-white border-emerald-500/40"
                : "bg-red-950/90 text-white border-red-500/40"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-brand-neon shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <span className="text-xs sm:text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Main Page Content */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-2">
        {/* 2. Hero Showcase Telemetri Hadiah */}
        <HadiahHero stats={stats} />

        {/* 3. Search & Filter Toolbar */}
        <HadiahToolbar
          searchQuery={filterState.searchQuery}
          onSearchChange={handleSearch}
          activeTab={filterState.filterTab}
          onTabChange={handleFilterTab}
          onOpenCreate={handleOpenCreate}
        />

        {/* 4. 4-Card Reward Grid Display */}
        <HadiahGridCard
          records={filteredList}
          totalCount={filteredList.length}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          onOpenRiwayat={handleOpenRiwayat}
        />

        {/* 5. Bottom Reassurance Ribbon */}
        <BottomAdminHadiahRibbon />
      </main>

      {/* 6. Modals & Drawers */}
      {/* Create / Edit / Restock Slide-over Drawer */}
      <HadiahDrawerModal
        isOpen={isDrawerOpen}
        mode={drawerMode}
        record={selectedHadiah}
        isSubmitting={isSubmitting}
        onClose={handleCloseDrawer}
        onSave={handleSave}
      />

      {/* Delete Confirmation Modal */}
      <DeleteHadiahConfirmModal
        isOpen={isDeleteModalOpen}
        record={selectedHadiah}
        isSubmitting={isSubmitting}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      {/* Stock History Modal */}
      <RiwayatStokModal
        isOpen={isRiwayatModalOpen}
        records={riwayatList}
        onClose={handleCloseRiwayatModal}
      />

      {/* 7. Dedicated Footer Admin Console */}
      <FooterAdmin />
    </div>
  );
}
