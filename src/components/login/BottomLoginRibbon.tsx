import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function BottomLoginRibbon() {
  return (
    <section className="px-4 sm:px-6 my-8">
      <div className="max-w-7xl mx-auto rounded-3xl bg-dark-container p-5 sm:p-6 text-white border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        {/* Left Notice */}
        <div className="flex items-center gap-3.5 text-center md:text-left">
          <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-brand-neon" />
          </div>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
            Sistem autentikasi terisolasi per peserta ujian (App Maker Multi-Tenant).
          </p>
        </div>

        {/* Right Documentation Link */}
        <Link
          href="/kategori-sampah"
          className="text-xs sm:text-sm font-bold text-brand-neon hover:text-brand-neon-hover flex items-center gap-1.5 shrink-0 transition-colors group"
        >
          <span>Dokumentasi Kontrak API v1</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
