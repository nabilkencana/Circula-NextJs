/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Custom Hook Pengelolaan State Laporan & Rekapitulasi Ekologis Admin
 *
 * File: src/hooks/useAdminLaporan.ts
 * Deskripsi:
 * Mengelola siklus pemilihan periode bulan rekapitulasi, pemuatan data laporan
 * teragregasi dari service, pemicu cetak dokumen standar PDF ramah cetak (`window.print()`),
 * serta generator unduhan berkas CSV untuk kebutuhan arsip dan pelaporan dinas terkait.
 *
 * Standar Teknis UKK RPL:
 * - State management reaktif dengan React Hooks (`useState`, `useEffect`, `useCallback`).
 * - Mekanisme pembuatan file CSV langsung pada browser (`Blob` / `encodeURI`).
 * - Integrasi print-friendly layout yang siap diekspor ke PDF oleh browser klien.
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { RekapitulasiBulananResponse } from "@/types/adminLaporan";
import { getRekapitulasiBulanan } from "@/services/adminLaporanService";

/** Objek awal representasi data kosong saat proses inisialisasi awal */
const EMPTY_REKAPITULASI: RekapitulasiBulananResponse = {
  periodeBulan: "",
  periodeLabel: "",
  totalVolume: {
    totalKg: 0,
    totalTon: 0,
    growthPercentage: 0,
    comparedToMonth: "Bulan Lalu",
  },
  pembayaranKas: {
    totalRupiah: 0,
    rataRataTransaksiRupiah: 0,
  },
  sirkulasiReward: {
    totalPoinDiterbitkan: 0,
    totalPoinTerpakai: 0,
    totalKlaimVoucherSelesai: 0,
  },
  breakdownMaterials: [],
  compliance: {
    isoStandard: "",
    dinasTujuan: "",
    penanggungJawab: "",
    signatureVerified: false,
  },
};

/**
 * Custom hook `useAdminLaporan` mengelola pemilihan periode bulan dan ekspor berkas laporan.
 */
export function useAdminLaporan() {
  // Periode bulan aktif (default: "2026-08")
  const [selectedBulan, setSelectedBulan] = useState<string>("2026-08");
  // Data rekapitulasi lengkap periode terpilih
  const [laporanData, setLaporanData] = useState<RekapitulasiBulananResponse>(
    EMPTY_REKAPITULASI
  );
  // Status indikator pemuatan data
  const [isLoading, setIsLoading] = useState(false);

  // Efek samping memuat data rekapitulasi setiap kali parameter selectedBulan berubah
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getRekapitulasiBulanan(selectedBulan);
        if (!isMounted) return;
        setLaporanData(data);
      } catch (err) {
        console.error("Gagal memuat laporan bulanan:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [selectedBulan]);

  /**
   * Mengubah periode bulan rekapitulasi yang aktif.
   */
  const handleSelectMonth = useCallback((bulanString: string) => {
    setSelectedBulan(bulanString);
  }, []);

  /**
   * Membuka dialog print browser untuk mencetak laporan atau menyimpan sebagai file PDF.
   */
  const handlePrintPdf = useCallback(() => {
    if (typeof window !== "undefined") {
      window.print();
    }
  }, []);

  /**
   * Mengonversi seluruh data agregasi dan breakdown bulanan ke format CSV lalu mengunduhnya.
   */
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
