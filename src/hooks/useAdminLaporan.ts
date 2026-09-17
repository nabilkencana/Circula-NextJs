"use client";

import { useState, useEffect, useCallback } from "react";
import { RekapitulasiBulananResponse } from "@/types/adminLaporan";
import {
  getRekapitulasiBulanan,
  MOCK_REKAPITULASI_DATA,
} from "@/services/adminLaporanService";

export function useAdminLaporan() {
  const [selectedBulan, setSelectedBulan] = useState<string>("2026-08");
  const [laporanData, setLaporanData] = useState<RekapitulasiBulananResponse>(
    MOCK_REKAPITULASI_DATA["2026-08"]
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getRekapitulasiBulanan(selectedBulan);
        if (!isMounted) return;
        setLaporanData(data);
      } catch (err) {
        console.error("Error loading laporan bulanan:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [selectedBulan]);

  const handleSelectMonth = useCallback((bulanString: string) => {
    setSelectedBulan(bulanString);
  }, []);

  const handlePrintPdf = useCallback(() => {
    if (typeof window !== "undefined") {
      window.print();
    }
  }, []);

  const handleDownloadCsv = useCallback(() => {
    if (!laporanData) return;

    const rows: (string | number)[][] = [
      ["REKAPITULASI LAPORAN BULANAN BANK SAMPAH CIRCULA"],
      ["Periode", laporanData.periodeLabel, `(${laporanData.periodeBulan})`],
      ["Unit Operasional", "Bank Sampah Asri Jaya (#JKT-042)"],
      ["Total Tonase (kg)", laporanData.totalVolume.totalKg],
      ["Total Tonase (Ton)", laporanData.totalVolume.totalTon],
      ["Peningkatan Volume (%)", `+${laporanData.totalVolume.growthPercentage}% dibanding ${laporanData.totalVolume.comparedToMonth}`],
      ["Total Pembayaran Kas (Rp)", laporanData.pembayaranKas.totalRupiah],
      ["Rata-rata Transaksi (Rp)", laporanData.pembayaranKas.rataRataTransaksiRupiah],
      ["Total Poin Diterbitkan", laporanData.sirkulasiReward.totalPoinDiterbitkan],
      ["Total Poin Terpakai", laporanData.sirkulasiReward.totalPoinTerpakai],
      ["Total Klaim Selesai", laporanData.sirkulasiReward.totalKlaimVoucherSelesai],
      [],
      ["RINCIAN BREAKDOWN PER KATEGORI MATERIAL"],
      ["Kategori", "Spesifikasi Limbah", "Tonase (kg)", "Tonase (Ton)", "Valuasi Tunai (Rp)", "Reward Poin", "Persentase (%)"],
      ...laporanData.breakdownMaterials.map((m) => [
        m.badgeLabel,
        `"${m.subLabel}"`,
        m.tonaseKg,
        m.tonaseTon,
        m.valuasiRupiah,
        m.rewardPoin,
        `${m.persentaseTotal}%`,
      ]),
      [],
      ["AUDIT & DIGITAL SIGNATURE"],
      ["Standar ISO", laporanData.compliance.isoStandard],
      ["Dinas Tujuan", `"${laporanData.compliance.dinasTujuan}"`],
      ["Penanggung Jawab", `"${laporanData.compliance.penanggungJawab}"`],
      ["Status Verifikasi", laporanData.compliance.signatureVerified ? "TERVERIFIKASI" : "BELUM"],
    ];

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      rows.map((row) => row.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Laporan_Rekapitulasi_Circula_${laporanData.periodeBulan}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [laporanData]);

  return {
    selectedBulan,
    laporanData,
    isLoading,
    handleSelectMonth,
    handlePrintPdf,
    handleDownloadCsv,
  };
}
