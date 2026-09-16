import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BottomActionRibbon() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 my-8">
      <div className="rounded-3xl bg-dark-container p-8 sm:p-10 text-white border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        {/* Left Headline */}
        <div className="text-center md:text-left">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug">
            Punya tumpukan sampah daur ulang baru di rumah?
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1.5 leading-relaxed">
            Setor mandiri ke unit terdekat atau pesan layanan armada jemput sekarang.
          </p>
        </div>

        {/* Right CTA */}
        <div className="shrink-0">
          <Link
            href="/setor/ajukan"
            className="bg-brand-neon hover:bg-brand-neon-hover text-dark-container font-extrabold px-8 py-3.5 rounded-full flex items-center gap-2.5 transition-all shadow-xl shadow-brand-neon/20 text-xs sm:text-sm group"
          >
            <span>Ajukan Penyetoran Baru</span>
            <div className="w-6 h-6 rounded-full bg-dark-container text-brand-neon flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
