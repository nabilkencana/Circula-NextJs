"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

export default function PreFooterTukarRibbon() {
  return (
    <section className="w-full my-6">
      <div className="rounded-3xl bg-[#111315] p-6 sm:p-8 md:p-9 text-white border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-brand-neon/10 rounded-full blur-3xl pointer-events-none" />

        {/* Left: Icon & Copy */}
        <div className="flex items-center sm:items-start md:items-center gap-4 sm:gap-5">
          {/* Lime Neon Leaf Icon Badge */}
          <div className="w-13 h-13 rounded-2xl bg-brand-neon flex items-center justify-center shrink-0 shadow-md">
            <Leaf className="w-7 h-7 text-[#111315] fill-[#111315]" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
              Poin masih kurang untuk hadiah impianmu?
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-1.5 leading-relaxed max-w-2xl font-normal">
              Kumpulkan lebih banyak botol plastik, karton duplex, dan kaleng aluminium dari rumah. Bawa ke pos terdekat atau pesan kurir penjemputan gratis hari ini!
            </p>
          </div>
        </div>

        {/* Right: Neon Action Button */}
        <div className="shrink-0 w-full sm:w-auto">
          <Link
            href="/setor/ajukan"
            className="w-full sm:w-auto bg-brand-neon hover:opacity-95 text-black font-black px-6 py-3.5 rounded-full flex items-center justify-center gap-2.5 transition-all shadow-sm hover:shadow-md text-xs sm:text-sm group"
          >
            <span>Ajukan Setor Sampah Baru</span>
            <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
