/**
 * @file dashboardService.ts
 * @description Layanan komunikasi data untuk metrik statistik global Bank Sampah Circula.
 * Memanggil endpoint `DASHBOARD.STATS` (`/api/v1/dashboard/stats`) secara terpusat
 * sehingga dapat dikonsumsi oleh Landing Page, Katalog Sampah, Halaman Login, dan Registrasi.
 * 
 * @module Services/DashboardService
 */

import { apiRequest } from "@/lib/api/client";
import { DASHBOARD } from "@/lib/api/endpoints";

/**
 * Representasi data statistik platform global dari backend API
 */
export interface DashboardStats {
  totalNasabah: number;
  totalKategoriSampah: number;
  totalTransaksiSetor: number;
  totalHadiah: number;
  totalBeratSampahKg: number;
  totalPoinTersalurkan: number;
}

/**
 * Fallback default nilai statistik jika request API gagal atau timeout
 */
export const DEFAULT_DASHBOARD_STATS: DashboardStats = {
  totalNasabah: 0,
  totalKategoriSampah: 0,
  totalTransaksiSetor: 0,
  totalHadiah: 0,
  totalBeratSampahKg: 0,
  totalPoinTersalurkan: 0,
};

/**
 * Mengambil data statistik platform terkini dari endpoint publik `DASHBOARD.STATS`.
 *
 * @async
 * @returns {Promise<DashboardStats>} Objek metrik statistik yang dinormalisasi ke tipe number
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const data = await apiRequest<Partial<DashboardStats>>(DASHBOARD.STATS, {
      silent: true,
      timeoutMs: 8000,
    });

    if (!data) return DEFAULT_DASHBOARD_STATS;

    return {
      totalNasabah: Number(data.totalNasabah ?? 0),
      totalKategoriSampah: Number(data.totalKategoriSampah ?? 0),
      totalTransaksiSetor: Number(data.totalTransaksiSetor ?? 0),
      totalHadiah: Number(data.totalHadiah ?? 0),
      totalBeratSampahKg: Number(data.totalBeratSampahKg ?? 0),
      totalPoinTersalurkan: Number(data.totalPoinTersalurkan ?? 0),
    };
  } catch {
    return DEFAULT_DASHBOARD_STATS;
  }
}
