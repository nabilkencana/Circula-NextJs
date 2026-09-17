"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NotaHero from "@/components/nota/NotaHero";
import NotaActionToolbar from "@/components/nota/NotaActionToolbar";
import DigitalReceiptCard from "@/components/nota/DigitalReceiptCard";
import VariantTkrPreviewBox from "@/components/nota/VariantTkrPreviewBox";
import BottomNotaRibbon from "@/components/nota/BottomNotaRibbon";
import { useNotaDetail } from "@/hooks/useNotaDetail";

interface NotaPageClientProps {
  id: string;
}

export default function NotaPageClient({ id }: NotaPageClientProps) {
  const {
    activeTab,
    setActiveTab,
    notaSetor,
    notaTukar,
    handlePrint,
    handleDownloadPdf,
    isLoading,
  } = useNotaDetail(id);

  const activeData = activeTab === "setor" ? notaSetor : notaTukar;

  return (
    <div className="min-h-screen bg-white font-sans text-text-primary flex flex-col selection:bg-brand-neon selection:text-dark-container print:bg-white print:text-black">
      {/* Top Navbar - hidden on print */}
      <div className="print:hidden">
        <Navbar userRole="nasabah" />
      </div>

      <main className="min-h-screen bg-white pb-6 print:pb-0 print:m-0">
        {/* Dark Hero Showcase - hidden on print */}
        <NotaHero />

        {/* Action Toolbar: STR/TKR Segment Toggle & PDF/Print Buttons - hidden on print */}
        <NotaActionToolbar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onPrint={handlePrint}
          onDownloadPdf={handleDownloadPdf}
        />

        {activeData ? (
          <DigitalReceiptCard
            activeTab={activeTab}
            notaSetor={notaSetor}
            notaTukar={notaTukar}
          />
        ) : (
          <div className="max-w-4xl mx-auto my-4 bg-white border border-gray-200 rounded-3xl p-10 text-center">
            <p className="text-lg font-bold text-text-primary">
              {isLoading ? "Muat nota…" : "Nota tidak ditemukan"}
            </p>
            <p className="text-sm text-text-secondary mt-1">
              {isLoading
                ? "Sedang memuat data transaksi."
                : "Transaksi tidak dapat dimuat. Periksa kembali kode transaksi."}
            </p>
          </div>
        )}

        {/* Collapsible Preview Box for Reward Voucher - hidden on print */}
        <VariantTkrPreviewBox />

        {/* Pre-Footer Reassurance Banner - hidden on print */}
        <BottomNotaRibbon />
      </main>

      {/* Footer - hidden on print */}
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
