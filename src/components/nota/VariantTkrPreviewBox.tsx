import React from "react";

export default function VariantTkrPreviewBox() {
  return (
    <div className="max-w-4xl mx-auto my-6 bg-inset-gray border border-dashed border-gray-300 rounded-2xl p-5 print:hidden">
      {/* Box Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <span className="bg-dark-container text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
            Contoh Variasi Nota
          </span>
          <h4 className="font-bold text-xs sm:text-sm text-text-primary">
            Struktur Nota Penukaran Hadiah (Kode: TKR-202608-5001)
          </h4>
        </div>

        <div className="self-start sm:self-auto inline-flex items-center px-2.5 py-0.5 rounded-full bg-lime-100 border border-brand-neon/40 text-dark-container text-[11px] font-bold shadow-2xs">
          • Selesai
        </div>
      </div>

      {/* 4-Column Grid Preview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-3 border-t border-gray-200/80 text-xs">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary block mb-0.5">
            Item Ditukar
          </span>
          <span className="font-bold text-text-primary block leading-tight">
            Voucher Pulsa / E-Wallet Rp 25.000
          </span>
        </div>

        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary block mb-0.5">
            Poin Terpakai
          </span>
          <span className="font-mono font-bold text-red-600 block">
            -75 Poin
          </span>
        </div>

        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary block mb-0.5">
            Sisa Saldo
          </span>
          <span className="font-mono font-bold text-emerald-700 block">
            75 Poin
          </span>
        </div>

        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary block mb-0.5">
            Merchant Claim Code
          </span>
          <span className="inline-block bg-white border border-gray-200 rounded px-2 py-0.5 font-mono font-bold text-text-primary">
            PLSA-8823-9912
          </span>
        </div>
      </div>
    </div>
  );
}
