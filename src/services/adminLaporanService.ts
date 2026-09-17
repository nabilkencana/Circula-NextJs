import { RekapitulasiBulananResponse } from "@/types/adminLaporan";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://learn.smktelkom-mlg.sch.id/bank_sampah";

const STORAGE_CACHE_PREFIX = "circula_admin_laporan_cache_";

export const MOCK_REKAPITULASI_DATA: Record<string, RekapitulasiBulananResponse> = {
  "2026-08": {
    periodeBulan: "2026-08",
    periodeLabel: "Agustus 2026",
    totalVolume: {
      totalKg: 1250,
      totalTon: 1.25,
      growthPercentage: 18.4,
      comparedToMonth: "Juli 2026",
    },
    pembayaranKas: {
      totalRupiah: 2875000,
      rataRataTransaksiRupiah: 75650,
    },
    sirkulasiReward: {
      totalPoinDiterbitkan: 3420,
      totalPoinTerpakai: 1150,
      totalKlaimVoucherSelesai: 14,
    },
    breakdownMaterials: [
      {
        kategoriKey: "plastik",
        badgeLabel: "PLASTIK",
        subLabel: "Botol PET, Cup, Jerigen Bersih (Grade A & B)",
        tonaseKg: 650.0,
        tonaseTon: 0.65,
        valuasiRupiah: 2275000,
        rewardPoin: 2100,
        persentaseTotal: 52.0,
        colorHex: "#3B82F6",
      },
      {
        kategoriKey: "kertas",
        badgeLabel: "KERTAS",
        subLabel: "Kardus & Karton Bekas, Kertas HVS & Arsip Dokumen",
        tonaseKg: 400.0,
        tonaseTon: 0.40,
        valuasiRupiah: 800000,
        rewardPoin: 1000,
        persentaseTotal: 32.0,
        colorHex: "#F59E0B",
      },
      {
        kategoriKey: "logam",
        badgeLabel: "LOGAM",
        subLabel: "Kaleng Aluminium Minuman, Tembaga Super Kupas",
        tonaseKg: 120.0,
        tonaseTon: 0.12,
        valuasiRupiah: 1440000,
        rewardPoin: 300,
        persentaseTotal: 9.6,
        colorHex: "#A855F7",
      },
      {
        kategoriKey: "kaca",
        badgeLabel: "KACA",
        subLabel: "Botol Kaca Bening & Botol Sirup Utuh",
        tonaseKg: 80.0,
        tonaseTon: 0.08,
        valuasiRupiah: 120000,
        rewardPoin: 20,
        persentaseTotal: 6.4,
        colorHex: "#10B981",
      },
    ],
    compliance: {
      isoStandard: "ISO 14001:2015",
      dinasTujuan: "Dinas Lingkungan Hidup Kabupaten/Kota",
      penanggungJawab: "Bapak H. Sukirman",
      signatureVerified: true,
    },
  },
  "2026-07": {
    periodeBulan: "2026-07",
    periodeLabel: "Juli 2026",
    totalVolume: {
      totalKg: 1055,
      totalTon: 1.055,
      growthPercentage: 12.1,
      comparedToMonth: "Juni 2026",
    },
    pembayaranKas: {
      totalRupiah: 2420000,
      rataRataTransaksiRupiah: 71170,
    },
    sirkulasiReward: {
      totalPoinDiterbitkan: 2950,
      totalPoinTerpakai: 920,
      totalKlaimVoucherSelesai: 11,
    },
    breakdownMaterials: [
      {
        kategoriKey: "plastik",
        badgeLabel: "PLASTIK",
        subLabel: "Botol PET, Cup, Jerigen Bersih (Grade A & B)",
        tonaseKg: 540.0,
        tonaseTon: 0.54,
        valuasiRupiah: 1890000,
        rewardPoin: 1750,
        persentaseTotal: 51.2,
        colorHex: "#3B82F6",
      },
      {
        kategoriKey: "kertas",
        badgeLabel: "KERTAS",
        subLabel: "Kardus & Karton Bekas, Kertas HVS & Arsip Dokumen",
        tonaseKg: 350.0,
        tonaseTon: 0.35,
        valuasiRupiah: 700000,
        rewardPoin: 850,
        persentaseTotal: 33.2,
        colorHex: "#F59E0B",
      },
      {
        kategoriKey: "logam",
        badgeLabel: "LOGAM",
        subLabel: "Kaleng Aluminium Minuman, Tembaga Super Kupas",
        tonaseKg: 100.0,
        tonaseTon: 0.10,
        valuasiRupiah: 1200000,
        rewardPoin: 260,
        persentaseTotal: 9.5,
        colorHex: "#A855F7",
      },
      {
        kategoriKey: "kaca",
        badgeLabel: "KACA",
        subLabel: "Botol Kaca Bening & Botol Sirup Utuh",
        tonaseKg: 65.0,
        tonaseTon: 0.065,
        valuasiRupiah: 97500,
        rewardPoin: 15,
        persentaseTotal: 6.1,
        colorHex: "#10B981",
      },
    ],
    compliance: {
      isoStandard: "ISO 14001:2015",
      dinasTujuan: "Dinas Lingkungan Hidup Kabupaten/Kota",
      penanggungJawab: "Bapak H. Sukirman",
      signatureVerified: true,
    },
  },
  "2026-06": {
    periodeBulan: "2026-06",
    periodeLabel: "Juni 2026",
    totalVolume: {
      totalKg: 940,
      totalTon: 0.94,
      growthPercentage: 8.7,
      comparedToMonth: "Mei 2026",
    },
    pembayaranKas: {
      totalRupiah: 2150000,
      rataRataTransaksiRupiah: 67180,
    },
    sirkulasiReward: {
      totalPoinDiterbitkan: 2600,
      totalPoinTerpakai: 780,
      totalKlaimVoucherSelesai: 9,
    },
    breakdownMaterials: [
      {
        kategoriKey: "plastik",
        badgeLabel: "PLASTIK",
        subLabel: "Botol PET, Cup, Jerigen Bersih (Grade A & B)",
        tonaseKg: 480.0,
        tonaseTon: 0.48,
        valuasiRupiah: 1680000,
        rewardPoin: 1550,
        persentaseTotal: 51.0,
        colorHex: "#3B82F6",
      },
      {
        kategoriKey: "kertas",
        badgeLabel: "KERTAS",
        subLabel: "Kardus & Karton Bekas, Kertas HVS & Arsip Dokumen",
        tonaseKg: 310.0,
        tonaseTon: 0.31,
        valuasiRupiah: 620000,
        rewardPoin: 750,
        persentaseTotal: 33.0,
        colorHex: "#F59E0B",
      },
      {
        kategoriKey: "logam",
        badgeLabel: "LOGAM",
        subLabel: "Kaleng Aluminium Minuman, Tembaga Super Kupas",
        tonaseKg: 95.0,
        tonaseTon: 0.095,
        valuasiRupiah: 1140000,
        rewardPoin: 230,
        persentaseTotal: 10.1,
        colorHex: "#A855F7",
      },
      {
        kategoriKey: "kaca",
        badgeLabel: "KACA",
        subLabel: "Botol Kaca Bening & Botol Sirup Utuh",
        tonaseKg: 55.0,
        tonaseTon: 0.055,
        valuasiRupiah: 82500,
        rewardPoin: 12,
        persentaseTotal: 5.9,
        colorHex: "#10B981",
      },
    ],
    compliance: {
      isoStandard: "ISO 14001:2015",
      dinasTujuan: "Dinas Lingkungan Hidup Kabupaten/Kota",
      penanggungJawab: "Bapak H. Sukirman",
      signatureVerified: true,
    },
  },
};

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token") || localStorage.getItem("circula_auth_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const appKey = localStorage.getItem("x_app_key") || localStorage.getItem("circula_app_key");
    if (appKey) {
      headers["x-app-key"] = appKey;
    }
  }
  return headers;
}

export async function getRekapitulasiBulanan(bulan: string): Promise<RekapitulasiBulananResponse> {
  if (typeof window !== "undefined") {
    const cached = localStorage.getItem(`${STORAGE_CACHE_PREFIX}${bulan}`);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.totalVolume) {
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse cached laporan:", e);
      }
    }
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/rekapitulasi/bulanan?bulan=${bulan}`, {
      method: "GET",
      headers: getAuthHeaders(),
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.data && data.data.totalVolume) {
        if (typeof window !== "undefined") {
          localStorage.setItem(`${STORAGE_CACHE_PREFIX}${bulan}`, JSON.stringify(data.data));
        }
        return data.data;
      }
    }
  } catch (err) {
    console.warn(`API rekapitulasi offline/unreachable for ${bulan}, using mock blueprint:`, err);
  }

  const fallback = MOCK_REKAPITULASI_DATA[bulan] || MOCK_REKAPITULASI_DATA["2026-08"];
  if (typeof window !== "undefined") {
    localStorage.setItem(`${STORAGE_CACHE_PREFIX}${bulan}`, JSON.stringify(fallback));
  }
  return fallback;
}
