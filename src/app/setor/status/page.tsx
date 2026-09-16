"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HistoriHero from "@/components/histori/HistoriHero";
import HistoriFilterToolbar from "@/components/histori/HistoriFilterToolbar";
import TransactionFeed from "@/components/histori/TransactionFeed";
import StatusStageGuideSection from "@/components/histori/StatusStageGuideSection";
import BottomActionRibbon from "@/components/histori/BottomActionRibbon";
import { useHistoriSetor } from "@/hooks/useHistoriSetor";
import { StatusPenyetoran } from "@/types/historiSetor";

function StatusContent() {
  const searchParams = useSearchParams();
  const initialStatus = (searchParams.get("status") as StatusPenyetoran) || undefined;

  const {
    filteredTransactions,
    filterStatus,
    setFilterStatus,
    filterBulan,
    setFilterBulan,
    searchQuery,
    setSearchQuery,
    statusCounts,
    isLoading,
  } = useHistoriSetor();

  // If URL specified a valid status on load, update it
  React.useEffect(() => {
    if (
      initialStatus &&
      ["menunggu_konfirmasi", "diverifikasi", "selesai", "ditolak"].includes(initialStatus)
    ) {
      setFilterStatus(initialStatus);
    }
  }, [initialStatus, setFilterStatus]);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <HistoriHero />

      {/* Filter Toolbar: Segmented Tabs, Month Select, Search */}
      <HistoriFilterToolbar
        filterStatus={filterStatus}
        onFilterStatusChange={setFilterStatus}
        filterBulan={filterBulan}
        onFilterBulanChange={setFilterBulan}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        statusCounts={statusCounts}
      />

      {/* Transactions Feed */}
      <TransactionFeed transactions={filteredTransactions} isLoading={isLoading} />

      {/* 4-Stage Status Guide & Industrial Scale Section */}
      <StatusStageGuideSection />

      {/* Pre-Footer Action Ribbon */}
      <BottomActionRibbon />
    </main>
  );
}

export default function SetorStatusPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-text-primary flex flex-col selection:bg-brand-neon selection:text-dark-container">
      {/* Authenticated Navbar matching Blueprint */}
      <Navbar userRole="nasabah" userPoints={150} userName="Budi Santoso" />

      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <div className="w-8 h-8 border-3 border-dark-container border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-semibold text-text-secondary mt-3">
              Memuat histori penyetoran...
            </p>
          </div>
        }
      >
        <StatusContent />
      </Suspense>

      <Footer />
    </div>
  );
}
