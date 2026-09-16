import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function BottomAdminTransaksiRibbon() {
  return (
    <aside className="max-w-7xl mx-auto rounded-3xl bg-dark-container border border-white/10 p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-white shadow-lg mb-12">
      <div className="flex items-center gap-3.5 max-w-2xl">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-brand-neon" />
        </div>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium">
          Seluruh transaksi penyetoran sampah dan penukaran poin tersinkronisasi otomatis
          secara real-time dengan sistem pencatatan terpusat unit.
        </p>
      </div>

      <Link
        href="/admin/laporan"
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white hover:text-brand-neon transition-colors group shrink-0"
      >
        <span>Buka Rekapitulasi Laporan Bulanan</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </aside>
  );
}
