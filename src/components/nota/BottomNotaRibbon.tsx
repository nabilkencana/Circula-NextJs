import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function BottomNotaRibbon() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 my-8 print:hidden">
      <div className="rounded-3xl bg-dark-container p-6 text-white border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        {/* Left Reassurance Text */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="w-8 h-8 rounded-full bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <p className="text-xs sm:text-sm text-gray-300">
            Seluruh bukti transaksi tercatat permanen di database multi-tenant dan dapat diakses
            kembali di menu Histori.
          </p>
        </div>

        {/* Right Action Link */}
        <div className="shrink-0">
          <Link
            href="/histori"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white hover:text-brand-neon transition-colors"
          >
            <span>Kembali ke Histori Penyetoran</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
