import React from "react";
import Link from "next/link";
import { Leaf, Building2, Scale, HelpCircle, ArrowUpRight } from "lucide-react";

export default function KonsolOperasionalBentoCard() {
  return (
    <div className="bg-dark-container rounded-3xl p-6 sm:p-8 text-white border border-white/10 shadow-xl">
      {/* Header Tag & Title */}
      <div className="mb-6">
        <span className="text-[10px] font-bold tracking-widest text-brand-neon uppercase">
          KONSOL OPERASIONAL
        </span>
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mt-1">
          Akses Cepat Pengelolaan Sampah
        </h3>
      </div>

      {/* Role Explanations */}
      <div className="space-y-3 mb-4">
        {/* Nasabah Block */}
        <div className="bg-[#121611] rounded-2xl p-4 border border-white/5 hover:border-brand-neon/30 transition-all">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-5 h-5 rounded-md bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0">
              <Leaf className="w-3.5 h-3.5 fill-brand-neon" />
            </div>
            <h4 className="text-sm font-bold text-white">Nasabah</h4>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed pl-7">
            Penyetoran multi-item, lacak status verifikasi timbangan real, dan cetak
            nota transaksi digital.
          </p>
        </div>

        {/* Admin Unit Block */}
        <div className="bg-[#121611] rounded-2xl p-4 border border-white/5 hover:border-brand-neon/30 transition-all">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-5 h-5 rounded-md bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0">
              <Building2 className="w-3.5 h-3.5 text-brand-neon" />
            </div>
            <h4 className="text-sm font-bold text-white">Admin Unit</h4>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed pl-7">
            Timbang ulang sampah di lapangan, perbarui status pengajuan, update
            katalog hadiah, dan cetak rekapitulasi bulanan.
          </p>
        </div>
      </div>

      {/* Weighing Scale Integration Inset */}
      <div className="bg-dark-widget rounded-2xl p-4 border border-white/10 flex items-center gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0">
          <Scale className="w-5 h-5 text-brand-neon" />
        </div>
        <p className="text-xs text-gray-300 leading-relaxed font-normal">
          Integrasi timbangan digital akurat per kilogram (Kg) dan konversi poin
          otomatis ke saldo.
        </p>
      </div>

      {/* Helpdesk Link Card */}
      <Link
        href="/#bantuan"
        className="mt-4 bg-white rounded-2xl p-4 flex items-center justify-between text-text-primary hover:bg-gray-50 transition-colors shadow-xs group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-dark-container text-brand-neon flex items-center justify-center shrink-0">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-text-primary group-hover:text-black">
              Butuh bantuan teknis saat login?
            </h5>
            <p className="text-[11px] text-text-secondary mt-0.5">
              Hubungi Helpdesk UKK RPL Telkom
            </p>
          </div>
        </div>

        <ArrowUpRight className="w-4 h-4 text-text-secondary group-hover:text-text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </Link>
    </div>
  );
}
