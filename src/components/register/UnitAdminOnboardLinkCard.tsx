import React from "react";
import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";

export default function UnitAdminOnboardLinkCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-dark-container text-brand-neon flex items-center justify-center shrink-0 shadow-xs">
        <Building2 className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-xs sm:text-sm font-bold text-text-primary leading-tight">
          Pengelola Unit / Petugas Bank Sampah?
        </h4>
        <p className="text-[11px] sm:text-xs text-text-secondary mt-1 leading-relaxed">
          Akses konsol verifikasi penimbangan, monitoring inventaris gudang, dan validasi transaksi.
        </p>
        <Link
          href="/admin/register"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-text-primary hover:text-black mt-2.5 group"
        >
          <span>Daftarkan Unit Bank Sampah</span>
          <ArrowRight className="w-3.5 h-3.5 text-dark-container group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
