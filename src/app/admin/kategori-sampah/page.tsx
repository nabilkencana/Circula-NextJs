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

export default function AdminKategoriSampahPage() {
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
        {/* 2. Hero Showcase */}
        <KategoriHero stats={stats} />

        {/* 3. Search & Filter Toolbar */}
        <KategoriToolbar
          searchQuery={filterState.searchQuery}
          onSearchChange={handleSearch}
          selectedJenis={filterState.selectedJenis}
          onJenisChange={handleJenisFilter}
          onOpenCreate={handleOpenCreate}
        />

        {/* 4. 6-Card Category Grid */}
        <KategoriGridCard
          records={filteredList}
          totalCount={stats.totalMaterial}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          onOpenBatch={handleOpenBatch}
        />

        {/* 5. Bottom Reassurance Ribbon */}
        <BottomAdminKategoriRibbon />
      </main>

      {/* 6. Modals & Drawers */}
      {/* Create / Edit Slide-over Drawer */}
      <KategoriDrawerModal
        isOpen={isDrawerOpen}
        mode={drawerMode}
        record={selectedKategori}
        isSubmitting={isSubmitting}
        onClose={handleCloseDrawer}
        onSave={handleSave}
      />

      {/* Delete Confirmation Modal */}
      <DeleteKategoriConfirmModal
        isOpen={isDeleteModalOpen}
        record={selectedKategori}
        isSubmitting={isSubmitting}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      {/* Batch Price Adjustment Modal */}
      <BatchPricingModal
        isOpen={isBatchModalOpen}
        isSubmitting={isSubmitting}
        onClose={handleCloseBatchModal}
        onConfirmBatch={handleConfirmBatch}
      />

      {/* 7. Shared Admin Footer */}
      <FooterAdmin />
    </div>
  );
}
