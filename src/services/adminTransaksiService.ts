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

const STR_STORAGE_KEY = "circula_admin_transaksi_str_v2";
const TKR_STORAGE_KEY = "circula_admin_transaksi_tkr_v1";

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

// Backend setor (STR): { id, kodeSetor, tanggal, status, totalBeratKg, totalPoin,
//   nasabah:{namaNasabah,telp}, detailSetors:[{kategoriSampahId, beratKg, subtotalPoin, kategoriSampah:{id, namaKategori, poinPerKg}}] }
// Frontend TransaksiSetorAdminRecord butuh flat fields.
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

export function saveTransaksiSetorList(list: TransaksiSetorAdminRecord[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STR_STORAGE_KEY, JSON.stringify(list));
  }
}

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
    console.warn(`[AdminTransaksiService] Verify API failed (${verifyResult.error}), persisting locally.`);
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

// Backend penukaran (TKR): { id, kodePenukaran, tanggal, status, poinTerpakai,
//   nasabah:{namaNasabah,telp}, hadiah:{namaHadiah} }
// Frontend TransaksiTkrAdminRecord butuh flat fields.
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

export function saveTransaksiTkrList(list: TransaksiTkrAdminRecord[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(TKR_STORAGE_KEY, JSON.stringify(list));
  }
}

export async function completeTkrPenukaran(id: string): Promise<TransaksiTkrAdminRecord> {
  const result = await fetchWithAuth(
    ENDPOINTS.PENUKARAN.ADMIN_STATUS(id),
    { method: "PUT", body: JSON.stringify({ status: "selesai" }) }
  );
  if (!result.ok) {
    console.warn(`[AdminTransaksiService] TKR complete API failed (${result.error}), persisting locally.`);
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
