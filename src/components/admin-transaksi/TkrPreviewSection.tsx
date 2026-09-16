import React from "react";
import { Gift } from "lucide-react";
import { TransaksiTkrAdminRecord } from "@/types/adminTransaksi";

interface TkrPreviewSectionProps {
  sampleRecord: TransaksiTkrAdminRecord;
  onCompleteTkr: (id: string) => void;
  onSwitchToTkr: () => void;
}

export default function TkrPreviewSection({
  sampleRecord,
  onCompleteTkr,
  onSwitchToTkr,
}: TkrPreviewSectionProps) {
  return (
    <div className="mb-8">
      {/* Title */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">🎁</span>
        <h3 className="text-xs sm:text-sm font-bold text-text-primary">
          Format Tampilan Tab &quot;Penukaran Poin Hadiah (TKR)&quot;
        </h3>
        <button
          type="button"
          onClick={onSwitchToTkr}
          className="text-xs text-brand-neon-hover hover:underline font-semibold ml-2 cursor-pointer"
        >
          (Buka Tab TKR)
        </button>
      </div>

      {/* Preview Inset Card matching blueprint */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-center">
          {/* 1. KODE & TANGGAL */}
          <div>
            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              KODE &amp; TANGGAL
            </div>
            <div className="font-bold text-xs sm:text-sm text-text-primary mt-0.5">
              {sampleRecord.kodePenukaran}
            </div>
            <div className="text-xs text-text-secondary">
              {sampleRecord.tanggalWaktu}
            </div>
          </div>

          {/* 2. NASABAH */}
          <div>
            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              NASABAH
            </div>
            <div className="font-bold text-xs sm:text-sm text-text-primary mt-0.5">
              {sampleRecord.nasabahNama}
            </div>
          </div>

          {/* 3. ITEM HADIAH */}
          <div className="lg:col-span-2">
            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              ITEM HADIAH
            </div>
            <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-text-primary mt-0.5">
              <Gift className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{sampleRecord.itemHadiah}</span>
            </div>
          </div>

          {/* 4. BIAYA PENUKARAN */}
          <div>
            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              BIAYA PENUKARAN
            </div>
            <div className="font-bold text-xs sm:text-sm text-red-600 mt-0.5">
              -{sampleRecord.biayaPoin} Poin
            </div>
          </div>

          {/* 5. STATUS & AKSI */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start lg:items-end xl:items-center gap-2.5">
            {sampleRecord.status === "diproses" ? (
              <>
                <span className="inline-flex items-center gap-1.5 bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>Diproses</span>
                </span>
                <button
                  type="button"
                  onClick={() => onCompleteTkr(sampleRecord.id)}
                  className="bg-brand-neon hover:bg-brand-neon-hover text-text-primary font-bold text-xs px-4 py-2 rounded-full shadow-2xs transition-all cursor-pointer whitespace-nowrap"
                >
                  Tandai Selesai / Serahkan Voucher
                </button>
              </>
            ) : (
              <span className="inline-flex items-center gap-1.5 bg-[#DCFCE7] text-[#15803D] border border-green-200 text-xs font-semibold px-3 py-1 rounded-full">
                <span>✓ Selesai (Voucher Diserahkan)</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
