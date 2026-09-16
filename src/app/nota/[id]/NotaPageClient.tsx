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
  } = useNotaDetail(id);

  return (
    <div className="min-h-screen bg-white font-sans text-text-primary flex flex-col selection:bg-brand-neon selection:text-dark-container print:bg-white print:text-black">
      {/* Top Navbar - hidden on print */}
      <div className="print:hidden">
        <Navbar userRole="nasabah" userPoints={150} userName="Budi Santoso" />
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

        {/* Printable Digital Certificate Voucher Container */}
        <DigitalReceiptCard
          activeTab={activeTab}
          notaSetor={notaSetor}
          notaTukar={notaTukar}
        />

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
