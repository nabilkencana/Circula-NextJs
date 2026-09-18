/**
 * @file adminTransaksiService.ts
 * @description Layanan komunikasi data (Service Layer) untuk modul Transaksi Administrator Circula.
 * Bertanggung jawab atas:
 * 1. Pengambilan dan pemetaan data penyetoran sampah (`getTransaksiSetorList`) dari endpoint admin.
 * 2. Pemrosesan verifikasi hasil timbangan riil petugas (`verifyTimbanganSetor`) dan finalisasi poin (`finalizeTransaksiSetor`).
 * 3. Pengambilan dan pengelolaan penukaran voucher reward nasabah (`getTransaksiTkrList`, `completeTkrPenukaran`).
 * 4. Perhitungan statistik telemetri ringkasan operasional bulanan (`calculateTelemetryStats`).
 * 5. Penyimpanan cache lokal (`localStorage`) untuk ketahanan terhadap kegagalan jaringan sementara.
 * 
 * @module Services/AdminTransaksiService
 */

import {
  TransaksiSetorAdminRecord,
  TransaksiTkrAdminRecord,
  TransaksiTelemetryStats,
  SampahItemRincian,
  StatusSetor,
  StatusTkr,
  VerifySetorPayload,
} from "@/types/adminTransaksi";
import { fetchWithAuth } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";

// Kunci penyimpanan cache lokal browser untuk data transaksi
const STR_STORAGE_KEY = "circula_admin_transaksi_str_v2";
const TKR_STORAGE_KEY = "circula_admin_transaksi_tkr_v1";

/**
 * Mengambil daftar seluruh transaksi penyetoran sampah (STR) dari backend.
 * 
 * @async
 * @returns {Promise<TransaksiSetorAdminRecord[]>} Array daftar transaksi penyetoran ternormalisasi.
 */
export async function getTransaksiSetorList(): Promise<TransaksiSetorAdminRecord[]> {
  const strResult = await fetchWithAuth<any[]>(
    ENDPOINTS.ADMIN_SETOR.LIST(),
    { cache: "no-store" } as RequestInit
  );
  if (strResult.ok && Array.isArray(strResult.data)) {
    const mapped = strResult.data.map(mapSetorApi);
    saveTransaksiSetorList(mapped);
    return mapped;
  }
  return [];
}

/**
 * Memetakan respons mentah API penyetoran backend menjadi struktur flat `TransaksiSetorAdminRecord`.
 * 
 * @param {any} raw - Objek data mentah dari backend.
 * @returns {TransaksiSetorAdminRecord} Objek transaksi terformat untuk komponen tabel frontend.
 */
function mapSetorApi(raw: any): TransaksiSetorAdminRecord {
  const nasabah = raw.nasabah || {};
  const detail = Array.isArray(raw.detailSetors) ? raw.detailSetors : [];
  const rincianSampah: SampahItemRincian[] = detail.map((d: any) => ({
    kategoriSampahId: d.kategoriSampahId || d.kategoriSampah?.id || "",
    namaKategori: d.kategoriSampah?.namaKategori || d.kategori || "Sampah",
    berat: Number(d.beratKg) || 0,
    isReal: true,
    poinPerKg: Number(d.poinPerKg || d.kategoriSampah?.poinPerKg) || 10,
  }));
  return {
    id: raw.id,
    kodeTransaksi: raw.kodeSetor || raw.kodeTransaksi || raw.id,
    tanggalWaktu: formatTgl(raw.tanggal || raw.createdAt),
    nasabahNama: nasabah.namaNasabah || nasabah.namaLengkap || "-",
    nasabahTelp: nasabah.telp || "",
    rincianSampah,
    totalBerat: Number(raw.totalBeratKg) || 0,
    isRealWeight: true,
    totalPoin: Number(raw.totalPoin) || 0,
    isEstimatedReward: false,
    status: (raw.status as StatusSetor) || "menunggu_konfirmasi",
    catatanPetugas: raw.catatan || raw.catatanAdmin,
  };
}

/**
 * Format string ISO waktu menjadi format tanggal Indonesia terbaca (WIB).
 * 
 * @param {string} iso - String timestamp ISO.
 * @returns {string} Tanggal terformat (misal: "26 Agu 2026, 10:00 WIB").
 */
function formatTgl(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("id-ID", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    }) + " WIB";
  } catch {
    return iso;
  }
}

/**
 * Menyimpan cache daftar transaksi penyetoran ke `localStorage`.
 * 
 * @param {TransaksiSetorAdminRecord[]} list - Daftar transaksi penyetoran yang akan disimpan.
 */
export function saveTransaksiSetorList(list: TransaksiSetorAdminRecord[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STR_STORAGE_KEY, JSON.stringify(list));
  }
}

/**
 * Memperbarui hasil timbangan riil dan status transaksi penyetoran di loket unit.
 * 
 * @async
 * @param {string} id - Identifier database transaksi setor.
 * @param {VerifySetorPayload} payload - Data status baru, catatan admin, dan berat riil per item.
 * @param {SampahItemRincian[]} [updatedItems] - Daftar item sampah dengan bobot baru.
 * @param {number} [totalBerat] - Total berat timbangan baru.
 * @param {number} [totalPoin] - Total poin hasil kalkulasi baru.
 * @returns {Promise<TransaksiSetorAdminRecord>} Data transaksi yang telah diperbarui.
 */
export async function verifyTimbanganSetor(
  id: string,
  payload: VerifySetorPayload,
  updatedItems?: SampahItemRincian[],
  totalBerat?: number,
  totalPoin?: number
): Promise<TransaksiSetorAdminRecord> {
  const verifyResult = await fetchWithAuth<any>(
    ENDPOINTS.ADMIN_SETOR.VERIFIKASI(id),
    { method: "PUT", body: JSON.stringify(payload) }
  );
  if (!verifyResult.ok) {
    console.warn(`[AdminTransaksiService] Panggilan verifikasi gagal (${verifyResult.error}), menyimpan pembaruan secara lokal.`);
  } else if (verifyResult.data && typeof verifyResult.data === "object") {
    const mapped = mapSetorApi(verifyResult.data);
    const currentList = await getTransaksiSetorList();
    const index = currentList.findIndex((item) => item.id === id);
    if (index !== -1) {
      currentList[index] = mapped;
    } else {
      currentList.unshift(mapped);
    }
    saveTransaksiSetorList(currentList);
    return mapped;
  }

  // Fallback pembaruan data secara lokal jika server offline
  const currentList = await getTransaksiSetorList();
  const index = currentList.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error(`Transaksi ID ${id} tidak ditemukan`);
  }

  const prev = currentList[index];
  const updatedRecord: TransaksiSetorAdminRecord = {
    ...prev,
    rincianSampah: updatedItems || prev.rincianSampah,
    totalBerat: totalBerat !== undefined ? totalBerat : prev.totalBerat,
    isRealWeight: true,
    totalPoin: totalPoin !== undefined ? totalPoin : prev.totalPoin,
    isEstimatedReward: false,
    status: payload.status,
    catatanPetugas: payload.catatanAdmin || prev.catatanPetugas,
  };

  currentList[index] = updatedRecord;
  saveTransaksiSetorList(currentList);
  return updatedRecord;
}

/**
 * Memfinalisasi transaksi penyetoran yang telah diverifikasi menjadi status `selesai` dan menyalurkan poin.
 * 
 * @async
 * @param {string} id - Identifier transaksi setor.
 * @returns {Promise<TransaksiSetorAdminRecord>} Data transaksi final berstatus selesai.
 */
export async function finalizeTransaksiSetor(id: string): Promise<TransaksiSetorAdminRecord> {
  const currentList = await getTransaksiSetorList();
  const record = currentList.find((item) => item.id === id);

  const payload: VerifySetorPayload = {
    status: "selesai",
    catatanAdmin: "Penyetoran sampah diverifikasi dan difinalisasi menjadi selesai.",
    itemsReal: record
      ? record.rincianSampah.map((item) => ({
          kategoriSampahId: item.kategoriSampahId || "",
          beratKgReal: item.berat,
        }))
      : undefined,
  };

  return verifyTimbanganSetor(
    id,
    payload,
    record?.rincianSampah,
    record?.totalBerat,
    record?.totalPoin
  );
}

/**
 * Mengambil daftar transaksi penukaran poin hadiah (TKR) dari backend.
 * 
 * @async
 * @returns {Promise<TransaksiTkrAdminRecord[]>} Array daftar transaksi penukaran voucher reward.
 */
export async function getTransaksiTkrList(): Promise<TransaksiTkrAdminRecord[]> {
  const result = await fetchWithAuth<any[]>(
    ENDPOINTS.PENUKARAN.ADMIN_LIST(),
    { cache: "no-store" } as RequestInit
  );
  if (result.ok && Array.isArray(result.data)) {
    const mapped = result.data.map(mapTkrApi);
    saveTransaksiTkrList(mapped);
    return mapped;
  }
  return [];
}

/**
 * Memetakan respons API penukaran poin mentah menjadi format `TransaksiTkrAdminRecord`.
 * 
 * @param {any} raw - Objek mentah dari backend.
 * @returns {TransaksiTkrAdminRecord} Objek penukaran terformat untuk tabel frontend.
 */
function mapTkrApi(raw: any): TransaksiTkrAdminRecord {
  const nasabah = raw.nasabah || {};
  const hadiah = raw.hadiah || {};
  return {
    id: raw.id,
    kodePenukaran: raw.kodePenukaran || raw.id,
    tanggalWaktu: formatTgl(raw.tanggal || raw.createdAt),
    nasabahNama: nasabah.namaNasabah || nasabah.namaLengkap || "-",
    nasabahTelp: nasabah.telp || "",
    itemHadiah: hadiah.namaHadiah || raw.namaHadiah || "-",
    biayaPoin: Number(raw.poinTerpakai) || 0,
    status: (raw.status as StatusTkr) || "diproses",
    waktuSelesai: raw.updatedAt ? formatTgl(raw.updatedAt) : undefined,
  };
}

/**
 * Menyimpan cache daftar transaksi penukaran poin ke `localStorage`.
 * 
 * @param {TransaksiTkrAdminRecord[]} list - Daftar transaksi TKR yang akan disimpan.
 */
export function saveTransaksiTkrList(list: TransaksiTkrAdminRecord[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(TKR_STORAGE_KEY, JSON.stringify(list));
  }
}

/**
 * Menandai transaksi penukaran hadiah telah selesai diserahkan ke nasabah.
 * 
 * @async
 * @param {string} id - Identifier transaksi penukaran.
 * @returns {Promise<TransaksiTkrAdminRecord>} Data penukaran terbaru berstatus selesai.
 */
export async function completeTkrPenukaran(id: string): Promise<TransaksiTkrAdminRecord> {
  const result = await fetchWithAuth(
    ENDPOINTS.PENUKARAN.ADMIN_STATUS(id),
    { method: "PUT", body: JSON.stringify({ status: "selesai" }) }
  );
  if (!result.ok) {
    console.warn(`[AdminTransaksiService] Pembaruan status penukaran gagal (${result.error}), memperbarui secara lokal.`);
  }

  const currentList = await getTransaksiTkrList();
  const index = currentList.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error(`Penukaran ID ${id} tidak ditemukan`);
  }

  const updatedRecord: TransaksiTkrAdminRecord = {
    ...currentList[index],
    status: "selesai",
    waktuSelesai: new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }) + " WIB",
  };

  currentList[index] = updatedRecord;
  saveTransaksiTkrList(currentList);
  return updatedRecord;
}

/**
 * Menghitung ringkasan statistik telemetri operasional transaksi bank sampah.
 * 
 * @param {TransaksiSetorAdminRecord[]} strList - Daftar transaksi setor.
 * @param {TransaksiTkrAdminRecord[]} tkrList - Daftar transaksi penukaran poin.
 * @returns {TransaksiTelemetryStats} Objek ringkasan metrik statistik.
 */
export function calculateTelemetryStats(
  strList: TransaksiSetorAdminRecord[],
  tkrList: TransaksiTkrAdminRecord[]
): TransaksiTelemetryStats {
  const totalKgSampahBulanIni = strList.reduce(
    (acc, item) => acc + (item.totalBerat || 0),
    0
  );
  const klaimVoucherCount = tkrList.filter(
    (item) => item.status === "selesai"
  ).length;
  const klaimPersentaseValid =
    tkrList.length > 0
      ? Math.round((klaimVoucherCount / tkrList.length) * 100)
      : 0;
  const antreanVerifikasiCount = strList.filter(
    (item) => item.status === "menunggu_konfirmasi"
  ).length;

  return {
    setoranBulanIniCount: strList.length,
    totalKgSampahBulanIni,
    klaimVoucherCount,
    klaimPersentaseValid,
    antreanVerifikasiCount,
  };
}
