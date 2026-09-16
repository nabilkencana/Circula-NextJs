import React from "react";
import { Lock, ShieldCheck, FileCheck } from "lucide-react";

export default function BottomSecurityRibbon() {
  return (
    <section className="px-4 sm:px-6 pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto rounded-3xl bg-dark-container border border-white/10 p-6 sm:p-8 text-white shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {/* Item 1: Enkripsi SSL */}
          <div className="flex items-start gap-3.5 pt-4 md:pt-0">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                Enkripsi SSL 256-Bit Bank-Grade
              </h4>
              <p className="text-[11px] sm:text-xs text-gray-400 mt-1 leading-relaxed">
                Seluruh data pendaftaran dan kredensial diamankan dengan protokol TLS 1.3 end-to-end.
              </p>
            </div>
          </div>

          {/* Item 2: Kepatuhan UU PDP */}
          <div className="flex items-start gap-3.5 pt-4 md:pt-0 md:pl-8">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                Kepatuhan UU PDP No. 27/2022
              </h4>
              <p className="text-[11px] sm:text-xs text-gray-400 mt-1 leading-relaxed">
                Data pribadi nasabah dilindungi secara ketat dan tidak diperjualbelikan kepada pihak ketiga.
              </p>
            </div>
          </div>

          {/* Item 3: Standarisasi Buku Tabungan */}
          <div className="flex items-start gap-3.5 pt-4 md:pt-0 md:pl-8">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/15 text-brand-neon flex items-center justify-center shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                Buku Rekening Terdaftar Resmi
              </h4>
              <p className="text-[11px] sm:text-xs text-gray-400 mt-1 leading-relaxed">
                Nomor rekening nasabah terafiliasi dengan jaringan bank sampah binaan DLH Jawa Timur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
