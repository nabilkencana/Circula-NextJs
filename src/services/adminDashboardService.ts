import { DashboardTelemetryData } from "@/types/adminDashboard";
import { apiRequest } from "@/lib/api/client";
import { ADMIN_SETOR, LAPORAN } from "@/lib/api/endpoints";

const STORAGE_CACHE_KEY = "circula_admin_dashboard_cache_v1";

export const INITIAL_DASHBOARD_DATA: DashboardTelemetryData = {
  unitNama: "Bank Sampah Asri Jaya",
  unitKode: "UNIT-04",
  antreanCount: 3,
  totalTonaseMasukKg: 1250,
  kpi: {
    totalNasabah: 142,
    nasabahBaruBulanIni: 12,
    tonaseBulanIniTon: 1.25,
    tonaseGrowthVsBulanLalu: 18.4,
    valuasiKasRupiah: 2875000,
    poinAktifBeredar: 18450,
  },
  queueList: [
    {
      id: "str-1002",
      kodeTransaksi: "STR-202608-1002",
      waktuPengajuan: "26 Agu 2026, 10:00 WIB",
      nasabahNama: "Budi Santoso",
      nasabahTelp: "085678901234",
      rincianEstimasi: "Botol PET & Kardus (Est. 6.5 kg)",
      estimasiPoin: 55,
    },
    {
      id: "str-1004",
      kodeTransaksi: "STR-202608-1004",
      waktuPengajuan: "26 Agu 2026, 10:25 WIB",
      nasabahNama: "Rina Marlina",
      nasabahTelp: "081298765432",
      rincianEstimasi: "Kaleng & Kaca (Est. 4.0 kg)",
      estimasiPoin: 32,
    },
    {
      id: "str-1005",
      kodeTransaksi: "STR-202608-1005",
      waktuPengajuan: "26 Agu 2026, 10:40 WIB",
      nasabahNama: "Agus Wijaya",
      nasabahTelp: "087712349876",
      rincianEstimasi: "Kertas Arsip & PET (Est. 9.2 kg)",
      estimasiPoin: 78,
    },
  ],
  composition: [
    {
      kategoriLabel: "Plastik (PET & Jerigen)",
      beratKg: 650.0,
      persentase: 52.0,
      barColorHex: "#D4E836",
    },
    {
      kategoriLabel: "Kardus & Kertas Arsip",
      beratKg: 400.0,
      persentase: 32.0,
      barColorHex: "#F59E0B",
    },
    {
      kategoriLabel: "Aluminium & Tembaga",
      beratKg: 120.0,
      persentase: 9.6,
      barColorHex: "#A855F7",
    },
    {
      kategoriLabel: "Botol Kaca Bening & Sirup",
      beratKg: 80.0,
      persentase: 6.4,
      barColorHex: "#10B981",
    },
  ],
  scaleDeviceId: "#SCL-042-A",
};

export async function getDashboardTelemetry(): Promise<DashboardTelemetryData> {
  if (typeof window !== "undefined") {
    const cached = localStorage.getItem(STORAGE_CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.kpi) {
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse cached dashboard telemetry:", e);
      }
    }
  }

  try {
    const [queueData, rekapData] = await Promise.all([
      apiRequest<any[]>(
        ADMIN_SETOR.LIST({ status: "menunggu_konfirmasi" })
      ).catch(() => null),
      apiRequest<any>(
        LAPORAN.REKAPITULASI_BULANAN("2026-08")
      ).catch(() => null),
    ]);

    if (rekapData && rekapData.totalVolume) {
      const telemetry: DashboardTelemetryData = {
        ...INITIAL_DASHBOARD_DATA,
        antreanCount: Array.isArray(queueData)
          ? queueData.length
          : INITIAL_DASHBOARD_DATA.antreanCount,
        totalTonaseMasukKg:
          rekapData.totalVolume.totalKg ||
          INITIAL_DASHBOARD_DATA.totalTonaseMasukKg,
      };
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_CACHE_KEY, JSON.stringify(telemetry));
      }
      return telemetry;
    }
  } catch (err) {
    console.warn("API dashboard telemetry offline/unreachable, using mock:", err);
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_CACHE_KEY, JSON.stringify(INITIAL_DASHBOARD_DATA));
  }
  return INITIAL_DASHBOARD_DATA;
}
