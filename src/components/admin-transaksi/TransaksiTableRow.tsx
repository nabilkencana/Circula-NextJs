import React from "react";
import Link from "next/link";
import { Scale, Printer, CheckCircle2 } from "lucide-react";
import { TransaksiSetorAdminRecord } from "@/types/adminTransaksi";

interface TransaksiTableRowProps {
  record: TransaksiSetorAdminRecord;
  onOpenVerify: (record: TransaksiSetorAdminRecord) => void;
  onFinalize: (id: string) => void;
}

export default function TransaksiTableRow({
  record,
  onOpenVerify,
  onFinalize,
}: TransaksiTableRowProps) {
  // Format items rincian
  const rincianText = record.rincianSampah
    .map((s) => `${s.namaKategori} (${s.berat} kg${s.isReal ? " Real" : ""})`)
    .join(" • ");

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/60 transition-colors">
      {/* 1. KODE & TANGGAL */}
      <td className="py-4.5 px-6">
        <div className="font-bold text-xs sm:text-sm text-text-primary">
          {record.kodeTransaksi}
        </div>
        <div className="text-xs text-text-secondary mt-0.5">
          {record.tanggalWaktu}
        </div>
      </td>

      {/* 2. NASABAH PENYETOR */}
      <td className="py-4.5 px-6">
        <div className="font-bold text-xs sm:text-sm text-text-primary">
          {record.nasabahNama}
        </div>
        <div className="text-xs text-text-secondary mt-0.5">
          Telp: {record.nasabahTelp}
        </div>
      </td>

      {/* 3. RINCIAN TIMBANGAN */}
      <td className="py-4.5 px-6">
        <div className="text-xs text-text-secondary">
          {rincianText}
        </div>
        <div className="font-bold text-xs text-text-primary mt-0.5">
          Total: {record.totalBerat} kg {record.isRealWeight ? "Real" : "(Estimasi)"}
        </div>
      </td>

      {/* 4. TOTAL REWARD */}
      <td className="py-4.5 px-6">
        {record.isEstimatedReward ? (
          <span className="inline-block bg-inset-gray border border-gray-200 text-xs font-semibold px-3 py-1 rounded-full text-gray-700">
            Est. +{record.totalPoin} Poin
          </span>
        ) : (
          <span className="inline-block bg-[#DCFCE7] text-[#15803D] border border-green-200 text-xs font-semibold px-3 py-1 rounded-full">
            +{record.totalPoin} Poin
            {record.nilaiRupiah ? ` (Rp ${record.nilaiRupiah.toLocaleString("id-ID")})` : ""}
          </span>
        )}
      </td>

      {/* 5. STATUS */}
      <td className="py-4.5 px-6">
        {record.status === "menunggu_konfirmasi" && (
          <span className="inline-flex items-center gap-1.5 bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] text-xs font-semibold px-3 py-1 rounded-full">
            <span>Menunggu Konfirmasi</span>
          </span>
        )}

        {record.status === "diverifikasi" && (
          <span className="inline-flex items-center gap-1.5 bg-[#DBEAFE] text-[#1E40AF] border border-blue-200 text-xs font-semibold px-3 py-1 rounded-full">
            <span>Diverifikasi</span>
          </span>
        )}

        {record.status === "selesai" && (
          <span className="inline-flex items-center gap-1.5 bg-[#DCFCE7] text-[#15803D] border border-green-200 text-xs font-semibold px-3 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
            <span>Selesai</span>
          </span>
        )}

        {record.status === "ditolak" && (
          <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 border border-red-200 text-xs font-semibold px-3 py-1 rounded-full">
            <span>Ditolak</span>
          </span>
        )}
      </td>

      {/* 6. AKSI OPERASIONAL */}
      <td className="py-4.5 px-6">
        {record.status === "menunggu_konfirmasi" && (
          <button
            type="button"
            onClick={() => onOpenVerify(record)}
            className="inline-flex items-center gap-1.5 bg-brand-neon hover:bg-brand-neon-hover text-text-primary font-bold text-xs px-4 py-2 rounded-full shadow-2xs transition-all cursor-pointer whitespace-nowrap"
          >
            <Scale className="w-3.5 h-3.5 text-text-primary" />
            <span>Timbang &amp; Verifikasi</span>
          </button>
        )}

        {record.status === "diverifikasi" && (
          <button
            type="button"
            onClick={() => onFinalize(record.id)}
            className="inline-flex items-center gap-1.5 bg-brand-neon hover:bg-brand-neon-hover text-text-primary font-bold text-xs px-4 py-2 rounded-full shadow-2xs transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Finalisasi Selesai</span>
          </button>
        )}

        {record.status === "selesai" && (
          <Link
            href={`/nota/${record.kodeTransaksi}`}
            className="inline-flex items-center gap-1.5 border border-gray-200 hover:bg-gray-50 text-text-primary text-xs font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap"
          >
            <Printer className="w-3.5 h-3.5 text-gray-500" />
            <span>Cetak Struk</span>
          </Link>
        )}

        {record.status === "ditolak" && (
          <span className="text-xs text-gray-400 italic">
            Tidak ada aksi
          </span>
        )}
      </td>
    </tr>
  );
}
