import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function KatalogPreFooterCTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 my-16">
      <div className="rounded-[28px] bg-dark-container p-8 sm:p-12 text-white border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        <div className="max-w-xl text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
            Sudah Mengumpulkan Sampah Terpilah Hari Ini?
          </h2>
          <p className="mt-2.5 text-gray-300 text-xs sm:text-sm leading-relaxed">
            Jadwalkan penyetoran mandiri ke unit terdekat atau pesan layanan penjemputan sekarang.
          </p>
        </div>

        <div className="shrink-0">
          <Link
            href="/setor/ajukan"
            className="bg-brand-neon text-text-primary font-bold px-7 py-3.5 rounded-full hover:bg-brand-neon-hover transition-all transform hover:scale-[1.03] flex items-center gap-2.5 text-xs sm:text-sm shadow-xl shadow-brand-neon/25 group"
          >
            <span>Ajukan Penyetoran Sampah</span>
            <span className="w-6 h-6 rounded-full bg-text-primary text-brand-neon flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
