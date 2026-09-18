/**
 * @file page.tsx
 * @description Halaman utama Manajemen Master Kategori & Tarif Sampah Admin Circula (Rute: `/admin/kategori-sampah`).
 * Mengintegrasikan seluruh komponen pengelolaan katalog material dengan custom hook `useAdminKategori`.
 * Menyediakan pemantauan telemetri harga tolok ukur, penyaringan kata kunci dan kelompok jenis material,
 * grid kartu material interaktif, slide-over drawer penambahan/pembaruan kategori (`KategoriDrawerModal`),
 * modal dialog konfirmasi penghapusan aman (`DeleteKategoriConfirmModal`), penyesuaian harga massal persentase (`BatchPricingModal`),
 * serta umpan balik visual notifikasi toast.
 * 
 * @module App/AdminKategoriSampahPage
 */

"use client";

import React from "react";
import NavbarAdminConsole from "@/components/layout/NavbarAdminConsole";
import FooterAdmin from "@/components/layout/FooterAdmin";
import KategoriHero from "@/components/admin-kategori/KategoriHero";
import KategoriToolbar from "@/components/admin-kategori/KategoriToolbar";
import KategoriGridCard from "@/components/admin-kategori/KategoriGridCard";
import KategoriDrawerModal from "@/components/admin-kategori/KategoriDrawerModal";
import DeleteKategoriConfirmModal from "@/components/admin-kategori/DeleteKategoriConfirmModal";
import BatchPricingModal from "@/components/admin-kategori/BatchPricingModal";
import BottomAdminKategoriRibbon from "@/components/admin-kategori/BottomAdminKategoriRibbon";
import { useAdminKategori } from "@/hooks/useAdminKategori";
import { CheckCircle2, AlertCircle } from "lucide-react";

/**
 * Komponen Halaman AdminKategoriSampahPage
 * 
 * @component
 * @returns {JSX.Element} Halaman master kategori & tarif sampah untuk administrator unit bank sampah.
 */
export default function AdminKategoriSampahPage() {
  // Destrukturisasi state dan handler bisnis dari custom hook
  const {
    filteredList,
    filterState,
    stats,
    isDrawerOpen,
    drawerMode,
    selectedKategori,
    isDeleteModalOpen,
    isBatchModalOpen,
    isSubmitting,
    toast,
    handleSearch,
    handleJenisFilter,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDelete,
    handleOpenBatch,
    handleCloseDrawer,
    handleCloseDeleteModal,
    handleCloseBatchModal,
    handleSave,
    handleConfirmDelete,
    handleConfirmBatch,
  } = useAdminKategori();

  return (
    <div className="min-h-screen bg-white font-sans text-text-primary flex flex-col justify-between selection:bg-brand-neon selection:text-dark-container">
      {/* 1. Header Navigasi Konsol Administrator */}
      <NavbarAdminConsole />

      {/* Pop-up Mengambang Notifikasi Umpan Balik (Toast Alert) */}
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
              <CheckCircle2 className="w-5 h-5 text-brand-neon shrink-0" aria-hidden="true" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" aria-hidden="true" />
            )}
            <span className="text-xs sm:text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Konten Utama Halaman Master Kategori */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-2">
        {/* 2. Spanduk Hero Kategori dengan 3 Metrik Telemetri */}
        <KategoriHero stats={stats} />

        {/* 3. Bilah Alat Pencarian, Filter Jenis & Tombol Tambah Kategori */}
        <KategoriToolbar
          searchQuery={filterState.searchQuery}
          onSearchChange={handleSearch}
          selectedJenis={filterState.selectedJenis}
          onJenisChange={handleJenisFilter}
          onOpenCreate={handleOpenCreate}
        />

        {/* 4. Grid Kartu Daftar Kategori Material Aktif */}
        <KategoriGridCard
          records={filteredList}
          totalCount={stats.totalMaterial}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          onOpenBatch={handleOpenBatch}
        />

        {/* 5. Pita Bawah Pernyataan Jaminan Integritas Sinkronisasi Multi-Tenant */}
        <BottomAdminKategoriRibbon />
      </main>

      {/* 6. Komponen Dialog Modal & Drawer Interaktif */}
      {/* Slide-over Drawer Tambah / Edit Kategori Material */}
      <KategoriDrawerModal
        isOpen={isDrawerOpen}
        mode={drawerMode}
        record={selectedKategori}
        isSubmitting={isSubmitting}
        onClose={handleCloseDrawer}
        onSave={handleSave}
      />

      {/* Modal Dialog Konfirmasi Hapus Kategori */}
      <DeleteKategoriConfirmModal
        isOpen={isDeleteModalOpen}
        record={selectedKategori}
        isSubmitting={isSubmitting}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      {/* Modal Dialog Penyesuaian Harga Massal (Batch Pricing) */}
      <BatchPricingModal
        isOpen={isBatchModalOpen}
        isSubmitting={isSubmitting}
        onClose={handleCloseBatchModal}
        onConfirmBatch={handleConfirmBatch}
      />

      {/* 7. Footer Khusus Konsol Administrator */}
      <FooterAdmin />
    </div>
  );
}
