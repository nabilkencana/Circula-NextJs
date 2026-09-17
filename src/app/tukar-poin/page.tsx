"use client";

import React, { Suspense, useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TukarPoinBanner from "@/components/tukar-poin/TukarPoinBanner";
import RewardFilterToolbar from "@/components/tukar-poin/RewardFilterToolbar";
import RewardGrid from "@/components/tukar-poin/RewardGrid";
import PreFooterTukarRibbon from "@/components/tukar-poin/PreFooterTukarRibbon";
import TukarPoinConfirmModal from "@/components/tukar-poin/TukarPoinConfirmModal";
import { useTukarPoin } from "@/hooks/useTukarPoin";
import { getCurrentUser } from "@/services/authService";

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

  const [currentUserName, setCurrentUserName] = useState<string>("Budi Santoso");

  useEffect(() => {
    const user = getCurrentUser();
    if (user?.namaLengkap || user?.username) {
      setCurrentUserName(user.namaLengkap || user.username);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FBFBFB] font-sans text-text-primary flex flex-col selection:bg-brand-neon selection:text-dark-container">
      {/* 100% Consistent Navigation Bar */}
      <Navbar
        userRole="nasabah"
        userPoints={saldoSummary.saldoPoinAktif ?? 150}
        userName={currentUserName}
      />

      {/* Main Container — Exact Layout Matching Blueprint Reference */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Top Section: Greeting & Dompet Poin Nasabah Card */}
        <TukarPoinBanner
          saldoSummary={saldoSummary}
          userName={currentUserName}
        />

        {/* Filter Categories Segment Pills & Search Bar */}
        <RewardFilterToolbar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          items={items}
        />

        {/* 3-Column Modern Product Rewards Grid */}
        <RewardGrid
          items={filteredItems}
          isPointSufficient={isPointSufficient}
          kekuranganPoin={kekuranganPoin}
          onRedeem={handleInitiateRedeem}
          isLoading={isLoading}
        />

        {/* Bottom Call-to-Action Banner */}
        <PreFooterTukarRibbon />
      </main>

      {/* 100% Consistent Global Footer */}
      <Footer />

      {/* Confirmation & Redemption Success Dialog Modal */}
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
        <div className="min-h-screen flex items-center justify-center bg-[#FBFBFB]">
          <div className="w-8 h-8 border-3 border-dark-container border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <TukarPoinContent />
    </Suspense>
  );
}
