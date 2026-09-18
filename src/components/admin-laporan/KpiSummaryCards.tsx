/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Komponen Kartu Ringkasan Indikator KPI Laporan Admin
 *
 * File: src/components/admin-laporan/KpiSummaryCards.tsx
 * Deskripsi:
 * Menyajikan 3 kartu rangkuman metrik performa operasional:
 * 1. Total Volume Limbah Terpilah (kg dan Metrik Ton) beserta persentase pertumbuhan.
 * 2. Perkiraan Pembayaran Kas Unit (nilai bruto dan rata-rata per penimbangan).
 * 3. Sirkulasi Reward & Klaim (poin diterbitkan, poin terpakai, jumlah klaim selesai).
 *
 * Standar Teknis UKK RPL:
 * - Komponen visual KPI interaktif dengan styling Tailwind CSS kontras.
 * - Format angka lokal Indonesia (`toLocaleString("id-ID")`).
 * - Responsive grid 1 kolom di mobile, 3 kolom di desktop.
 */

import React from "react";
import { TrendingUp, Calculator, Gift } from "lucide-react";
import { RekapitulasiBulananResponse } from "@/types/adminLaporan";

/**
 * Properti komponen KpiSummaryCards.
 */
interface KpiSummaryCardsProps {
  /** Objek respons data rekapitulasi bulanan */
  data: RekapitulasiBulananResponse;
}

/**
 * Komponen kartu rangkuman metrik KPI performa bulanan bank sampah.
 */
export default function KpiSummaryCards({ data }: KpiSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* Card 1: Total Volume Limbah Terpilah (Dark Container) */}
      <div className="bg-dark-container rounded-3xl p-6 sm:p-7 text-white border border-white/10 shadow-sm flex flex-col justify-between relative overflow-hidden">
        <div>
          <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
            TOTAL VOLUME LIMBAH TERPILAH
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold text-brand-neon mt-2 tracking-tight">
            {data.totalVolume.totalKg.toLocaleString("id-ID")} kg
          </div>
          <p className="text-xs text-gray-300 mt-1.5">
            = {data.totalVolume.totalTon} Metrik Ton limbah berhasil diselamatkan dari TPA
          </p>
        </div>

        <div className="bg-dark-widget border border-white/10 rounded-xl px-3.5 py-2.5 mt-5 text-xs text-lime-400 font-semibold flex items-center gap-2">
          <TrendingUp className="w-4 h-4 shrink-0 text-lime-400" />
          <span>
            +{data.totalVolume.growthPercentage}% peningkatan volume dibanding{" "}
            {data.totalVolume.comparedToMonth}
          </span>
        </div>
      </div>

      {/* Card 2: Perkiraan Pembayaran Kas Unit (White Card) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-xs flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
            PERKIRAAN PEMBAYARAN KAS UNIT
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-2 tracking-tight">
            Rp {data.pembayaranKas.totalRupiah.toLocaleString("id-ID")}
          </div>
          <p className="text-xs text-gray-500 mt-1.5">
            Total nilai beli bruto yang siap dikompensasikan ke kas nasabah
          </p>
        </div>

        <div className="bg-inset-gray border border-gray-200 rounded-xl px-3.5 py-2.5 mt-5 text-xs text-gray-600 font-semibold flex items-center gap-2">
          <Calculator className="w-4 h-4 shrink-0 text-gray-500" />
          <span>
            Rata-rata transaksi: Rp{" "}
            {data.pembayaranKas.rataRataTransaksiRupiah.toLocaleString("id-ID")} / penimbangan
          </span>
        </div>
      </div>

      {/* Card 3: Sirkulasi Reward & Klaim (White Card) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-xs flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
            SIRKULASI REWARD &amp; KLAIM
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-2 tracking-tight">
            {data.sirkulasiReward.totalPoinDiterbitkan.toLocaleString("id-ID")} Poin
          </div>
          <p className="text-xs text-gray-500 mt-1.5">
            Poin Diterbitkan: {data.sirkulasiReward.totalPoinDiterbitkan.toLocaleString("id-ID")} | Poin Terpakai:{" "}
            {data.sirkulasiReward.totalPoinTerpakai.toLocaleString("id-ID")} Poin
          </p>
        </div>

        <div className="bg-[#EAF3D2] border border-brand-neon/40 rounded-xl px-3.5 py-2.5 mt-5 text-xs text-dark-widget font-bold flex items-center gap-2">
          <Gift className="w-4 h-4 shrink-0 text-dark-widget" />
          <span>
            {data.sirkulasiReward.totalKlaimVoucherSelesai} Klaim voucher &amp; sembako berhasil diselesaikan
          </span>
        </div>
      </div>
    </div>
  );
}
