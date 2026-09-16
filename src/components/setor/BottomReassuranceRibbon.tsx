import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function BottomReassuranceRibbon() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 my-8">
      <div className="rounded-3xl bg-dark-container p-6 sm:p-7 text-white border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        {/* Left message with ShieldCheck */}
        <div className="flex items-center gap-3.5 text-center md:text-left">
          <div className="w-10 h-10 rounded-full bg-dark-widget border border-brand-neon/30 text-brand-neon flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
            Seluruh alur transaksi penyetoran sampah terjamin aman dan terintegrasi langsung
            ke sistem verifikasi terpusat Circula.
          </p>
        </div>

        {/* Right CTA to History */}
        <Link
          href="/histori"
          className="shrink-0 px-5 py-2.5 rounded-full bg-dark-widget border border-white/15 text-xs font-semibold text-white hover:border-brand-neon hover:text-brand-neon transition-all flex items-center gap-2 shadow-xs group"
        >
          <span>Lihat Histori Penyetoran Saya</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
