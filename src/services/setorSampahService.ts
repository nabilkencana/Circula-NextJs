/**
 * ============================================================================
 * Service: Setor Sampah Service
 * Direktori: src/services/setorSampahService.ts
 *
 * Fungsi Utama:
 * Lapisan layanan (Service Layer) yang menangani transaksi pengajuan penyetoran
 * sampah daur ulang oleh nasabah ke backend API Circula.
 *
 * Fitur & Tanggung Jawab:
 * 1. `generateKodeSetor`: Membuat kode tiket penyetoran unik (contoh: STR-202608-1042)
 *    jika backend mengembalikan data offline/mockup.
 * 2. `computeTotals`: Menghitung total berat sampah (kg), estimasi perolehan poin reward,
 *    dan estimasi nilai rupiah berdasarkan master kategori sampah aktif.
 * 3. `submitPengajuanSetor`: Mengirim payload transaksi setor sampah terautentikasi
 *    melalui client `fetchWithAuth`.
 * 4. `getKategoriSampahOptions`: Mengambil daftar master kategori sampah untuk dropdown opsi.
 * ============================================================================
 */

import {
  CreateSetorSampahPayload,
  SetorSampahSubmissionResponse,
} from "@/types/setorSampah";
import { getKategoriSampah } from "./kategoriSampahService";
import { KategoriSampah } from "@/types/kategoriSampah";
import { fetchWithAuth } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";

/**
 * Generator Kode Tiket Penyetoran:
 * Format: STR-YYYYMM-XXXX (contoh: STR-202608-4921)
 * Digunakan sebagai penanda unik transaksi penyetoran fisik di bank sampah.
 */
function generateKodeSetor(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `STR-${year}${month}-${randomSuffix}`;
}

/**
 * Kalkulator Agregat Total Transaksi:
 * Menghitung akumulasi berat (kg), konversi poin, dan ekuivalen nominal rupiah
 * berdasarkan bobot per item dan tarif kategori sampah terkait.
 */
async function computeTotals(payload: CreateSetorSampahPayload): Promise<{
  totalBerat: number;
  totalPoin: number;
  totalRupiah: number;
}> {
  const categories = await getKategoriSampah();
  let totalBerat = 0;
  let totalPoin = 0;
  let totalRupiah = 0;

  for (const item of payload.items) {
    totalBerat += item.beratKg;
    const cat = categories.find((c) => c.id === item.kategoriSampahId) || categories[0];
    totalPoin += Math.round(item.beratKg * (cat?.poinPerKg || 10));
    totalRupiah += Math.round(item.beratKg * (cat?.hargaPerKg || 3500));
  }

  return { totalBerat, totalPoin, totalRupiah };
}

/**
 * Mengirim Pengajuan Penyetoran Sampah ke Server:
 * @param payload Data lengkap transaksi setor (tanggal, metode penyerahan, catatan, daftar item)
 * @returns Respons terstruktur berisi tiket transaksi dan status awal "menunggu_konfirmasi"
 */
export async function submitPengajuanSetor(
  payload: CreateSetorSampahPayload
): Promise<SetorSampahSubmissionResponse> {
  const { totalBerat, totalPoin, totalRupiah } = await computeTotals(payload);

  // Kirim payload dengan token JWT terautentikasi ke endpoint backend
  const result = await fetchWithAuth<{
    id: string;
    kodeSetor: string;
    tanggal: string;
    status: "menunggu_konfirmasi";
  }>(ENDPOINTS.SETOR.PENGAJUAN, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (result.ok && result.data) {
    return {
      success: true,
      message: "Pengajuan penyetoran sampah berhasil dibuat.",
      data: {
        id: result.data.id || String(Date.now()),
        kodeSetor: result.data.kodeSetor || generateKodeSetor(),
        tanggal: result.data.tanggal || payload.tanggal,
        totalEstimasiBeratKg: Number(totalBerat.toFixed(1)),
        totalEstimasiPoin: totalPoin,
        totalEstimasiRupiah: totalRupiah,
        status: "menunggu_konfirmasi",
      },
    };
  }

  throw new Error(result.error || "Pengajuan gagal. Coba lagi.");
}

/**
 * Mengambil Opsi Master Kategori Sampah:
 * Menyediakan data kategori untuk dropdown pemilihan jenis sampah di formulir pengajuan.
 */
export async function getKategoriSampahOptions(): Promise<KategoriSampah[]> {
  try {
    const data = await getKategoriSampah();
    if (data && data.length > 0) return data;
  } catch (err) {
    console.warn("[SetorService] Gagal memuat opsi kategori sampah:", err);
  }
  return [];
}
