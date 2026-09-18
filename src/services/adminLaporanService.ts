/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Layanan Integrasi API Rekapitulasi Laporan Bulanan Admin
 *
 * File: src/services/adminLaporanService.ts
 * Deskripsi:
 * Bertanggung jawab mengambil data rekapitulasi agregasi operasional bulanan
 * dari API endpoint server, melakukan normalisasi komposisi tonase, valuasi kas,
 * sirkulasi poin, serta menyediakan mekanisme caching LocalStorage dan fallback
 * default bila sistem berada dalam kondisi offline.
 *
 * Standar Teknis UKK RPL:
 * - Konsumsi REST API endpoint laporan dinamis berbasis parameter bulan (`YYYY-MM`).
 * - Normalisasi matematis tonase kilogram ke metrik Ton (`kg / 1000`).
 * - Fault-tolerant caching via browser `localStorage` dengan prefix terisolasi.
 */

import { RekapitulasiBulananResponse } from "@/types/adminLaporan";
import { apiRequest } from "@/lib/api/client";
import { LAPORAN } from "@/lib/api/endpoints";

/** Prefix identifikasi penyimpanan cache laporan bulanan pada LocalStorage */
const STORAGE_CACHE_PREFIX = "circula_admin_laporan_cache_";

/**
 * Membentuk struktur objek data rekapitulasi kosong bila API offline atau data belum tercatat.
 *
 * @param bulan - Format string periode bulan (cth: "2026-08").
 * @returns Objek RekapitulasiBulananResponse dengan nilai inisial nol.
 */
function emptyRekapitulasi(bulan: string): RekapitulasiBulananResponse {
  const [year, month] = bulan.split("-");
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const monthIndex = parseInt(month, 10) - 1;
  return {
    periodeBulan: bulan,
    periodeLabel: `${monthNames[monthIndex] || "Bulan"} ${year}`,
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
      isoStandard: "ISO 14001:2015",
      dinasTujuan: "Dinas Lingkungan Hidup Kabupaten/Kota",
      penanggungJawab: "Bank Sampah Circula",
      signatureVerified: false,
    },
  };
}

/**
 * Menormalisasi payload mentah dari backend menjadi kontrak frontend yang kaya atribut visual.
 *
 * @param apiData - Respons mentah dari endpoint server.
 * @param bulan - Periode bulan yang diminta.
 * @returns Objek terstandarisasi RekapitulasiBulananResponse.
 */
function normalizeRekapitulasi(apiData: any, bulan: string): RekapitulasiBulananResponse {
  const tonase = apiData.rekapitulasiTonase || {};
  const breakdown = apiData.breakdownJenisSampah || {};
  const penukaran = apiData.rekapitulasiPenukaranPoin || {};

  const totalKg = Number(tonase.totalKg) || 0;
  const totalTon = Number(tonase.totalTon) || Number((totalKg / 1000).toFixed(3));
  const totalRupiah = Number(tonase.totalEstimasiPembayaranRupiah) || 0;
  const totalPoinDiterbitkan = Number(tonase.totalPoinDiterbitkan) || 0;
  const totalPoinTerpakai = Number(penukaran.totalPoinTerpakai) || 0;
  const totalTransaksiPenukaran = Number(penukaran.totalTransaksiPenukaran) || 0;

  const [year, month] = bulan.split("-");
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const monthIndex = parseInt(month, 10) - 1;
  const periodeLabel = `${monthNames[monthIndex] || "Bulan"} ${year}`;

  const materialsConfig: Array<{
    key: "plastik" | "kertas" | "logam" | "kaca";
    label: string;
    subLabel: string;
    color: string;
  }> = [
    {
      key: "plastik",
      label: "PLASTIK",
      subLabel: "Botol PET, Cup, Jerigen Bersih (Grade A & B)",
      color: "#3B82F6",
    },
    {
      key: "kertas",
      label: "KERTAS",
      subLabel: "Kardus & Karton Bekas, Kertas HVS & Arsip Dokumen",
      color: "#F59E0B",
    },
    {
      key: "logam",
      label: "LOGAM",
      subLabel: "Kaleng Aluminium Minuman, Tembaga Super Kupas",
      color: "#A855F7",
    },
    {
      key: "kaca",
      label: "KACA",
      subLabel: "Botol Kaca Bening, Sirup, Kecap, Jar Selai Utuh",
      color: "#10B981",
    },
  ];

  const breakdownMaterials = materialsConfig.map((cfg) => {
    const item = breakdown[cfg.key] || {};
    const itemKg = Number(item.tonaseKg) || 0;
    const persentase = totalKg > 0 ? Number(((itemKg / totalKg) * 100).toFixed(1)) : 0;
    return {
      kategoriKey: cfg.key,
      badgeLabel: cfg.label,
      subLabel: cfg.subLabel,
      tonaseKg: itemKg,
      tonaseTon: Number((itemKg / 1000).toFixed(2)),
      valuasiRupiah: Number(item.rupiah) || 0,
      rewardPoin: Number(item.poin) || 0,
      persentaseTotal: persentase,
      colorHex: cfg.color,
    };
  });

  return {
    periodeBulan: bulan,
    periodeLabel,
    totalVolume: {
      totalKg,
      totalTon,
      growthPercentage: Number(tonase.growthPercentage) || 0,
      comparedToMonth: "Bulan Lalu",
    },
    pembayaranKas: {
      totalRupiah,
      rataRataTransaksiRupiah: totalTransaksiPenukaran > 0 ? Math.round(totalRupiah / totalTransaksiPenukaran) : totalRupiah,
    },
    sirkulasiReward: {
      totalPoinDiterbitkan,
      totalPoinTerpakai,
      totalKlaimVoucherSelesai: totalTransaksiPenukaran,
    },
    breakdownMaterials,
    compliance: {
      isoStandard: "ISO 14001:2015",
      dinasTujuan: "Dinas Lingkungan Hidup Kabupaten/Kota",
      penanggungJawab: "Bank Sampah Circula",
      signatureVerified: Boolean(apiData.signatureVerified),
    },
  };
}

/**
 * Mengambil data rekapitulasi operasional bulanan untuk periode tertentu.
 * Memeriksa cache LocalStorage terlebih dahulu sebelum memanggil API.
 *
 * @param bulan - Format string periode bulan (cth: "2026-08").
 * @returns Promise berisi RekapitulasiBulananResponse.
 */
export async function getRekapitulasiBulanan(bulan: string): Promise<RekapitulasiBulananResponse> {
  if (typeof window !== "undefined") {
    const cached = localStorage.getItem(`${STORAGE_CACHE_PREFIX}${bulan}`);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.totalVolume) return parsed;
      } catch (e) {
        console.error("Gagal membaca cache laporan:", e);
      }
    }
  }

  try {
    const data = await apiRequest<any>(
      LAPORAN.REKAPITULASI_BULANAN(bulan)
    );
    if (data && (data.rekapitulasiTonase || data.totalVolume)) {
      const normalized = data.totalVolume ? data : normalizeRekapitulasi(data, bulan);
      if (typeof window !== "undefined") {
        localStorage.setItem(`${STORAGE_CACHE_PREFIX}${bulan}`, JSON.stringify(normalized));
      }
      return normalized;
    }
  } catch (err) {
    console.warn(`[LaporanService] API sedang offline untuk periode ${bulan}:`, err);
  }

  return emptyRekapitulasi(bulan);
}
