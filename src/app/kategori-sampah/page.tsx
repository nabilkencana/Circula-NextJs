"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import KatalogHero from "@/components/katalog/KatalogHero";
import KatalogToolbar from "@/components/katalog/KatalogToolbar";
import KatalogGrid from "@/components/katalog/KatalogGrid";
import StandarPemeriksaanSection from "@/components/katalog/StandarPemeriksaanSection";
import KatalogPreFooterCTA from "@/components/katalog/KatalogPreFooterCTA";
import LivePointEstimatorModal from "@/components/katalog/LivePointEstimatorModal";
import { useKatalogSampah } from "@/hooks/useKatalogSampah";

export default function KategoriSampahPage() {
  const {
    filteredItems,
    isLoading,
    filterState,
    setSearchQuery,
    setSelectedJenis,
    // Modal controls
    isEstimatorOpen,
    activeEstimatorItem,
    openEstimator,
    closeEstimator,
  } = useKatalogSampah();

  return (
    <div className="min-h-screen bg-white text-text-primary font-sans antialiased flex flex-col selection:bg-brand-neon selection:text-text-primary">
      {/* Shared Frosted Sticky Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <KatalogHero />

        {/* Search & Category Filter Toolbar */}
        <KatalogToolbar
          searchQuery={filterState.searchQuery}
          onSearchChange={setSearchQuery}
          selectedJenis={filterState.selectedJenis}
          onSelectJenis={setSelectedJenis}
          totalResults={filteredItems.length}
        />

        {/* Waste Categories Grid */}
        <KatalogGrid
          items={filteredItems}
          isLoading={isLoading}
          onOpenEstimator={openEstimator}
        />

        {/* 3R Quality Inspection Standards Section */}
        <StandarPemeriksaanSection />

        {/* Pre-Footer Action Banner */}
        <KatalogPreFooterCTA />
      </main>

      {/* Shared Enterprise Footer */}
      <Footer />

      {/* Interactive Quick Point Estimator Popup Modal */}
      <LivePointEstimatorModal
        isOpen={isEstimatorOpen}
        item={activeEstimatorItem}
        onClose={closeEstimator}
      />
    </div>
  );
}
