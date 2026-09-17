import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function BottomAdminKategoriRibbon() {
  return (
    <aside
      className="max-w-7xl mx-auto rounded-3xl bg-dark-container p-6 sm:p-7 text-white border border-white/10 my-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl"
      aria-label="Jaminan Keamanan Tarif Multi-Tenant"
    >
      {/* Left Reassurance */}
      <div className="flex items-start sm:items-center gap-3.5">
        <div className="w-10 h-10 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-brand-neon" />
        </div>
        <div>
          <h4 className="font-bold text-sm sm:text-base text-white">
            Perubahan master kategori sampah langsung tersinkronisasi aman untuk unit Anda.
          </h4>
          <p className="text-xs text-gray-400 mt-0.5 max-w-xl leading-relaxed">
            Setiap transaksi penimbangan akan merefleksikan tarif rupiah dan kompensasi poin secara
            real-time tanpa risiko kebocoran silang antar-unit.
          </p>
        </div>
      </div>

      {/* Right Action */}
      <Link
        href="/admin/dashboard"
        className="text-xs sm:text-sm font-bold text-white hover:text-brand-neon transition-colors flex items-center gap-1.5 group shrink-0"
      >
        <span>Kembali ke Dashboard Utama Admin</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-brand-neon" />
      </Link>
    </aside>
  );
}
