/**
 * @file TkrPreviewSection.tsx
 * @description Komponen pratinjau (Preview Section) untuk format tab Penukaran Poin Hadiah (TKR).
 * Ditampilkan saat admin berada di tab penyetoran sampah (STR) untuk memberikan visibilitas langsung
 * terhadap antrean klaim voucher hadiah sembako/pulsa tanpa perlu berpindah tab secara penuh.
 * 
 * @module Components/AdminTransaksi/TkrPreviewSection
 */

import React from "react";
import { Gift } from "lucide-react";
import { TransaksiTkrAdminRecord } from "@/types/adminTransaksi";

/**
 * Properti untuk komponen TkrPreviewSection
 * 
 * @interface TkrPreviewSectionProps
 * @property {TransaksiTkrAdminRecord} sampleRecord - Contoh catatan transaksi penukaran hadiah.
 * @property {(id: string) => void} onCompleteTkr - Callback penyerahan voucher.
 * @property {() => void} onSwitchToTkr - Callback untuk beralih langsung ke tab TKR penuh.
 */
interface TkrPreviewSectionProps {
  sampleRecord: TransaksiTkrAdminRecord;
  onCompleteTkr: (id: string) => void;
  onSwitchToTkr: () => void;
}

/**
 * Komponen TkrPreviewSection
 * 
 * @component
 * @param {TkrPreviewSectionProps} props - Data contoh penukaran dan handler aksi.
 * @returns {JSX.Element} Kartu pratinjau penukaran poin hadiah.
 */
export default function TkrPreviewSection({
  sampleRecord,
  onCompleteTkr,
  onSwitchToTkr,
}: TkrPreviewSectionProps) {
  return (
    <div className="mb-8">
      {/* Judul Seksi dan Tautan Pengalih Cepat */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base" aria-hidden="true">🎁</span>
        <h3 className="text-xs sm:text-sm font-bold text-text-primary">
          Format Tampilan Tab &quot;Penukaran Poin Hadiah (TKR)&quot;
        </h3>
        <button
          type="button"
          onClick={onSwitchToTkr}
          className="text-xs text-brand-neon-hover hover:underline font-semibold ml-2 cursor-pointer"
        >
          (Buka Tab TKR Penuh)
        </button>
      </div>

      {/* Kartu Pratinjau Tersemat */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
          
          {/* Grid Metadata Pratinjau */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 flex-1 items-center">
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

            {/* 2. NASABAH PEMOHON */}
            <div>
              <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                NASABAH
              </div>
              <div className="font-bold text-xs sm:text-sm text-text-primary mt-0.5 truncate">
                {sampleRecord.nasabahNama}
              </div>
            </div>

            {/* 3. ITEM HADIAH */}
            <div className="sm:col-span-1 min-w-0">
              <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                ITEM HADIAH
              </div>
              <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-text-primary mt-0.5 truncate">
                <Gift className="w-3.5 h-3.5 text-amber-500 shrink-0" aria-hidden="true" />
                <span className="truncate">{sampleRecord.itemHadiah}</span>
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
          </div>

          {/* Sisi Kanan: Status & Tombol Aksi Langsung */}
          <div className="flex items-center gap-2.5 shrink-0 justify-start lg:justify-end pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-100">
            {sampleRecord.status === "diproses" ? (
              <>
                <span className="inline-flex items-center gap-1.5 bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap shrink-0">
                  <span>Diproses</span>
                </span>
                <button
                  type="button"
                  onClick={() => onCompleteTkr(sampleRecord.id)}
                  className="bg-brand-neon hover:bg-brand-neon-hover text-text-primary font-bold text-xs px-4 py-2 rounded-full shadow-2xs transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  Tandai Selesai / Serahkan Voucher
                </button>
              </>
            ) : (
              <span className="inline-flex items-center gap-1.5 bg-[#DCFCE7] text-[#15803D] border border-green-200 text-xs font-semibold px-3 py-1.5 rounded-full shrink-0">
                <span>✓ Selesai (Voucher Diserahkan)</span>
              </span>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
