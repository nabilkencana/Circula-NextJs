"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SetorHero from "@/components/setor/SetorHero";
import FormPengajuanSetor from "@/components/setor/FormPengajuanSetor";
import LiveEstimationSummaryCard from "@/components/setor/LiveEstimationSummaryCard";
import DropOffProtocolCard from "@/components/setor/DropOffProtocolCard";
import StandarPemeriksaanGuide from "@/components/setor/StandarPemeriksaanGuide";
import BottomReassuranceRibbon from "@/components/setor/BottomReassuranceRibbon";
import SubmissionSuccessModal from "@/components/setor/SubmissionSuccessModal";
import SetorConfirmModal from "@/components/setor/SetorConfirmModal";
import { useAjukanSetor } from "@/hooks/useAjukanSetor";

function SetorFormContent() {
  const searchParams = useSearchParams();
  const initialParams = {
    kategoriId: searchParams.get("kategoriId"),
    berat: searchParams.get("berat"),
  };

  const {
    categories,
    tanggal,
    setTanggal,
    metodePenyerahan,
    setMetodePenyerahan,
    catatan,
    setCatatan,
    confirmedTerms,
    setConfirmedTerms,
    items,
    addItem,
    removeItem,
    updateItemCategory,
    updateItemWeight,
    totalEstimasiBerat,
    totalEstimasiPoin,
    totalEstimasiRupiah,
    saldoAkunSaatIni,
    proyeksiSaldoAkhir,
    isSubmitting,
    errorMessage,
    submissionResult,
    isConfirmModalOpen,
    isSuccessModalOpen,
    handleConfirmSubmit,
    handleCloseConfirm,
    handleSubmit,
    closeSuccessModal,
  } = useAjukanSetor(initialParams);

  return (
    <>
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <SetorHero />

        {/* 2-Column Split Section: Form & Sticky Summary Bento */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form Pengajuan (65% width / 8 cols) */}
            <div className="lg:col-span-8">
              <FormPengajuanSetor
                tanggal={tanggal}
                onTanggalChange={setTanggal}
                metodePenyerahan={metodePenyerahan}
                onMetodeChange={setMetodePenyerahan}
                catatan={catatan}
                onCatatanChange={setCatatan}
                items={items}
                categories={categories}
                onAddItem={addItem}
                onRemoveItem={removeItem}
                onCategoryChange={updateItemCategory}
                onWeightChange={updateItemWeight}
                confirmedTerms={confirmedTerms}
                onConfirmedTermsChange={setConfirmedTerms}
                errorMessage={errorMessage}
              />
            </div>

            {/* Right Column: Sticky Estimation Card & Protocol Guide (35% width / 4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <LiveEstimationSummaryCard
                totalItemsCount={items.length}
                totalEstimasiBerat={totalEstimasiBerat}
                totalEstimasiPoin={totalEstimasiPoin}
                totalEstimasiRupiah={totalEstimasiRupiah}
                saldoAkunSaatIni={saldoAkunSaatIni}
                proyeksiSaldoAkhir={proyeksiSaldoAkhir}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
              />

              <DropOffProtocolCard />
            </div>
          </div>
        </section>

        {/* Quality Criteria & Facility Photo Split Guide */}
        <StandarPemeriksaanGuide />

        {/* Bottom Reassurance Ribbon */}
        <BottomReassuranceRibbon />
      </main>

        {/* Pre-submission Confirmation Modal */}
        <SetorConfirmModal
          isOpen={isConfirmModalOpen}
          items={items}
          tanggal={tanggal}
          metodePenyerahan={metodePenyerahan}
          catatan={catatan}
          totalEstimasiBerat={totalEstimasiBerat}
          totalEstimasiPoin={totalEstimasiPoin}
          totalEstimasiRupiah={totalEstimasiRupiah}
          isSubmitting={isSubmitting}
          onClose={handleCloseConfirm}
          onConfirm={handleConfirmSubmit}
        />

        {/* Submission Success Modal */}
        <SubmissionSuccessModal
          isOpen={isSuccessModalOpen}
          result={submissionResult}
          onClose={closeSuccessModal}
        />
      </>
    );
}

export default function AjukanSetorPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-brand-neon selection:text-dark-container">
      {/* Navbar with authenticated Nasabah state matching visual blueprint */}
      <Navbar userRole="nasabah" userPoints={150} userName="Budi Santoso" />

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-dark-container border-t-brand-neon animate-spin" />
          </div>
        }
      >
        <SetorFormContent />
      </Suspense>

      <Footer />
    </div>
  );
}
