/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Halaman Konsol Administrator - Manajemen & Buku Induk Data Nasabah
 *
 * File: src/app/admin/nasabah/page.tsx
 * Rute: /admin/nasabah
 * Deskripsi:
 * Halaman orchestrator utama bagi pengurus bank sampah untuk mengelola data nasabah,
 * memantau saldo poin aktif, mencari warga penyetor, mendaftarkan nasabah baru secara manual,
 * melihat detail profil lengkap, mengedit informasi kontak/domisili, menghapus akun,
 * serta mengekspor data ke file CSV/Excel.
 *
 * Standar Teknis UKK RPL:
 * - Next.js 15 App Router Client Component ("use client").
 * - Arsitektur Modular: Mengombinasikan Hero, Toolbar, TableCard, Drawer Modal, Dialog Hapus, dan Modal Detail.
 * - Single Source of Truth via custom hook `useAdminNasabah`.
 * - Konsistensi UI dengan NavbarAdminConsole dan FooterAdmin.
 */

"use client";

import React from "react";
import NavbarAdminConsole from "@/components/layout/NavbarAdminConsole";
import FooterAdmin from "@/components/layout/FooterAdmin";
import NasabahHero from "@/components/admin-nasabah/NasabahHero";
import NasabahToolbar from "@/components/admin-nasabah/NasabahToolbar";
import NasabahTableCard from "@/components/admin-nasabah/NasabahTableCard";
import NasabahDrawerModal from "@/components/admin-nasabah/NasabahDrawerModal";
import DeleteConfirmModal from "@/components/admin-nasabah/DeleteConfirmModal";
import NasabahDetailModal from "@/components/admin-nasabah/NasabahDetailModal";
import BottomAdminNasabahRibbon from "@/components/admin-nasabah/BottomAdminNasabahRibbon";
import { useAdminNasabah } from "@/hooks/useAdminNasabah";
import { CheckCircle2, AlertCircle } from "lucide-react";

/**
 * Komponen utama halaman manajemen dan buku induk data nasabah administrator.
 */
export default function AdminNasabahPage() {
  // Mengonsumsi seluruh state dan dispatch handler dari hook useAdminNasabah
  const {
    filteredList,
    paginatedList,
    filterState,
    totalPages,
    isDrawerOpen,
    drawerMode,
    selectedNasabah,
    isDeleteModalOpen,
    isDetailModalOpen,
    isSubmitting,
    toast,
    stats,
    handleSearch,
    handleFilterTab,
    handlePageChange,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDelete,
    handleOpenDetail,
    handleCloseDrawer,
    handleCloseDeleteModal,
    handleCloseDetailModal,
    handleSave,
    handleConfirmDelete,
    handleExportCsv,
  } = useAdminNasabah();

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

      {/* Main Page Container */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-2">
        {/* 2. Hero Showcase Telemetri Nasabah */}
        <NasabahHero stats={stats} />

        {/* 3. Search & Filter Toolbar */}
        <NasabahToolbar
          searchQuery={filterState.searchQuery}
          onSearchChange={handleSearch}
          activeTab={filterState.filterTab}
          onTabChange={handleFilterTab}
          onOpenCreate={handleOpenCreate}
        />

        {/* 4. Ledger Table Card */}
        <NasabahTableCard
          records={paginatedList}
          totalCount={stats.totalNasabah}
          totalFilteredCount={filteredList.length}
          currentPage={filterState.currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onEdit={handleOpenEdit}
          onView={handleOpenDetail}
          onDelete={handleOpenDelete}
          onExportCsv={handleExportCsv}
        />

        {/* 5. Bottom Reassurance Ribbon */}
        <BottomAdminNasabahRibbon />
      </main>

      {/* 6. Modals & Drawers */}
      {/* Create / Edit Slide-over Drawer */}
      <NasabahDrawerModal
        isOpen={isDrawerOpen}
        mode={drawerMode}
        record={selectedNasabah}
        isSubmitting={isSubmitting}
        onClose={handleCloseDrawer}
        onSave={handleSave}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        record={selectedNasabah}
        isSubmitting={isSubmitting}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      {/* Detail View Modal (Eye Icon) */}
      <NasabahDetailModal
        isOpen={isDetailModalOpen}
        record={selectedNasabah}
        onClose={handleCloseDetailModal}
        onEdit={handleOpenEdit}
      />

      {/* 7. Dedicated Footer Admin Console */}
      <FooterAdmin />
    </div>
  );
}
