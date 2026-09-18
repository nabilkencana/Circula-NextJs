/**
 * @file TransaksiTkrTableRow.tsx
 * @description Komponen baris tabel transaksi klaim penukaran hadiah poin (TKR) pada panel admin Circula.
 * Menampilkan 6 kolom informasi:
 * 1. Kode Penukaran & Tanggal pengajuan.
 * 2. Identitas Nasabah Pemohon (Nama & Nomor Telepon).
 * 3. Nama Produk/Voucher Hadiah yang Ditukarkan.
 * 4. Biaya Poin yang Dipotong (misal: -75 Poin).
 * 5. Lencana Status Penukaran (Diproses, Selesai, Dibatalkan).
 * 6. Tombol Aksi Operasional ("Tandai Selesai / Serahkan Voucher").
 * 
 * @module Components/AdminTransaksi/TransaksiTkrTableRow
 */

import React from "react";
import { CheckCircle2, Gift } from "lucide-react";
import { TransaksiTkrAdminRecord } from "@/types/adminTransaksi";

/**
 * Properti untuk komponen TransaksiTkrTableRow
 * 
 * @interface TransaksiTkrTableRowProps
 * @property {TransaksiTkrAdminRecord} record - Data catatan penukaran poin.
 * @property {(id: string) => void} onCompleteTkr - Callback untuk menandai penyerahan voucher telah selesai.
 */
interface TransaksiTkrTableRowProps {
  record: TransaksiTkrAdminRecord;
  onCompleteTkr: (id: string) => void;
}

/**
 * Komponen TransaksiTkrTableRow
 * 
 * @component
 * @param {TransaksiTkrTableRowProps} props - Data transaksi TKR dan handler penyerahan.
 * @returns {JSX.Element} Elemen baris `<tr>` untuk data penukaran poin.
 */
export default function TransaksiTkrTableRow({
  record,
  onCompleteTkr,
}: TransaksiTkrTableRowProps) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/60 transition-colors">
      
      {/* 1. KODE PENUKARAN & TANGGAL WAKTU */}
      <td className="py-4.5 px-6">
        <div className="font-bold text-xs sm:text-sm text-text-primary">
          {record.kodePenukaran}
        </div>
        <div className="text-xs text-text-secondary mt-0.5">
          {record.tanggalWaktu}
        </div>
      </td>

      {/* 2. NASABAH PENERIMA */}
      <td className="py-4.5 px-6">
        <div className="font-bold text-xs sm:text-sm text-text-primary">
          {record.nasabahNama}
        </div>
        {record.nasabahTelp && (
          <div className="text-xs text-text-secondary mt-0.5">
            Telp: {record.nasabahTelp}
          </div>
        )}
      </td>

      {/* 3. ITEM HADIAH REWARD */}
      <td className="py-4.5 px-6">
        <div className="flex items-center gap-2">
          <Gift className="w-4 h-4 text-amber-500 shrink-0" aria-hidden="true" />
          <span className="font-bold text-xs sm:text-sm text-text-primary">
            {record.itemHadiah}
          </span>
        </div>
      </td>

      {/* 4. BIAYA PENGURANGAN POIN */}
      <td className="py-4.5 px-6">
        <span className="font-bold text-xs sm:text-sm text-red-600">
          -{record.biayaPoin} Poin
        </span>
      </td>

      {/* 5. STATUS KLAIM PENUKARAN */}
      <td className="py-4.5 px-6">
        {record.status === "diproses" && (
          <span className="inline-flex items-center gap-1.5 bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] text-xs font-semibold px-3 py-1 rounded-full">
            <span>Diproses</span>
          </span>
        )}

        {record.status === "selesai" && (
          <span className="inline-flex items-center gap-1.5 bg-[#DCFCE7] text-[#15803D] border border-green-200 text-xs font-semibold px-3 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" aria-hidden="true" />
            <span>Selesai</span>
          </span>
        )}

        {record.status === "dibatalkan" && (
          <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 border border-gray-200 text-xs font-semibold px-3 py-1 rounded-full">
            <span>Dibatalkan</span>
          </span>
        )}
      </td>

      {/* 6. AKSI OPERASIONAL PETUGAS */}
      <td className="py-4.5 px-6">
        {record.status === "diproses" ? (
          <button
            type="button"
            onClick={() => onCompleteTkr(record.id)}
            className="inline-flex items-center gap-1.5 bg-brand-neon hover:bg-brand-neon-hover text-text-primary font-bold text-xs px-4 py-2 rounded-full shadow-2xs transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Tandai Selesai / Serahkan Voucher</span>
          </button>
        ) : (
          <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
            <span>Voucher Diserahkan</span>
          </span>
        )}
      </td>

    </tr>
  );
}
