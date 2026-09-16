"use client";

import React, { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TukarPoinHero from "@/components/tukar-poin/TukarPoinHero";
import ActiveBalanceStrip from "@/components/tukar-poin/ActiveBalanceStrip";
import RewardFilterToolbar from "@/components/tukar-poin/RewardFilterToolbar";
import RewardGrid from "@/components/tukar-poin/RewardGrid";
import AlurPenukaranGuideSection from "@/components/tukar-poin/AlurPenukaranGuideSection";
import PreFooterTukarRibbon from "@/components/tukar-poin/PreFooterTukarRibbon";
import TukarPoinConfirmModal from "@/components/tukar-poin/TukarPoinConfirmModal";
import { useTukarPoin } from "@/hooks/useTukarPoin";

function TukarPoinContent() {
  const {
    items,
    filteredItems,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    saldoSummary,
    isLoading,
    activeItemToRedeem,
    isSubmitting,
    redemptionSuccessData,
    errorMessage,
    isPointSufficient,
    kekuranganPoin,
    handleInitiateRedeem,
    handleCancelRedeem,
    handleConfirmRedeem,
    handleCloseSuccessModal,
  } = useTukarPoin();

  return (
    <div className="min-h-screen bg-white font-sans text-text-primary flex flex-col selection:bg-brand-neon selection:text-dark-container">
      {/* Authenticated Navbar matching Blueprint */}
      <Navbar
        userRole="nasabah"
        userPoints={saldoSummary.saldoPoinAktif}
        userName="Budi Santoso"
      />

      <main className="min-h-screen bg-white pb-6">
        {/* Dark Hero Showcase */}
        <TukarPoinHero />

        {/* Active Point Balance Strip */}
        <ActiveBalanceStrip saldoSummary={saldoSummary} />

        {/* Category Segment Tabs & Search */}
        <RewardFilterToolbar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          totalCount={items.length}
        />

        {/* 4-Column Product Reward Grid */}
        <RewardGrid
          items={filteredItems}
          isPointSufficient={isPointSufficient}
          kekuranganPoin={kekuranganPoin}
          onRedeem={handleInitiateRedeem}
          isLoading={isLoading}
        />

        {/* 2-Column Split: Alur Mudah Penukaran & Mitra Photography */}
        <AlurPenukaranGuideSection />

        {/* Pre-Footer Action CTA Ribbon */}
        <PreFooterTukarRibbon />
      </main>

      <Footer />

      {/* Confirmation & Success Dialog Modal */}
      <TukarPoinConfirmModal
        item={activeItemToRedeem}
        saldoSummary={saldoSummary}
        isOpen={Boolean(activeItemToRedeem || redemptionSuccessData)}
        onClose={redemptionSuccessData ? handleCloseSuccessModal : handleCancelRedeem}
        onConfirm={handleConfirmRedeem}
        isSubmitting={isSubmitting}
        successData={redemptionSuccessData}
        errorMessage={errorMessage}
      />
    </div>
  );
}

export default function TukarPoinPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-8 h-8 border-3 border-dark-container border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <TukarPoinContent />
    </Suspense>
  );
}
