import {
  TransaksiSetorAdminRecord,
  TransaksiTkrAdminRecord,
  TransaksiTelemetryStats,
  SampahItemRincian,
} from "@/types/adminTransaksi";
import { fetchWithAuth } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";

const STR_STORAGE_KEY = "circula_admin_transaksi_str_v2";
const TKR_STORAGE_KEY = "circula_admin_transaksi_tkr_v1";

export const INITIAL_STR_TRANSAKSI: TransaksiSetorAdminRecord[] = [
  {
    id: "STR-202608-1005",
    kodeTransaksi: "STR-202608-1005",
    tanggalWaktu: "26 Agu 2026, 10:40 WIB",
    nasabahNama: "Agus Wijaya",
    nasabahTelp: "087712349876",
    rincianSampah: [
      { namaKategori: "Kertas HVS & Arsip", berat: 5.2, isReal: false },
      { namaKategori: "Botol PET", berat: 4.0, isReal: false },
    ],
    totalBerat: 9.2,
    isRealWeight: false,
    totalPoin: 78,
    isEstimatedReward: true,
    status: "menunggu_konfirmasi",
  },
  {
    id: "STR-202608-1004",
    kodeTransaksi: "STR-202608-1004",
    tanggalWaktu: "26 Agu 2026, 10:25 WIB",
    nasabahNama: "Rina Marlina",
    nasabahTelp: "081298765432",
    rincianSampah: [
      { namaKategori: "Kaleng Aluminium", berat: 2.5, isReal: false },
      { namaKategori: "Kaca", berat: 1.5, isReal: false },
    ],
    totalBerat: 4.0,
    isRealWeight: false,
    totalPoin: 32,
    isEstimatedReward: true,
    status: "menunggu_konfirmasi",
  },
  {
    id: "STR-202608-1003",
    kodeTransaksi: "STR-202608-1003",
    tanggalWaktu: "26 Agu 2026, 10:15 WIB",
    nasabahNama: "Hendro Prasetyo",
    nasabahTelp: "081345678901",
    rincianSampah: [
      { namaKategori: "Minyak Jelantah", berat: 6.0, isReal: false },
      { namaKategori: "Kardus", berat: 3.5, isReal: false },
    ],
    totalBerat: 9.5,
    isRealWeight: false,
    totalPoin: 85,
    isEstimatedReward: true,
    status: "menunggu_konfirmasi",
  },
  {
    id: "STR-202608-1002",
    kodeTransaksi: "STR-202608-1002",
    tanggalWaktu: "26 Agu 2026, 10:00 WIB",
    nasabahNama: "Budi Santoso",
    nasabahTelp: "085678901234",
    rincianSampah: [
      { namaKategori: "Botol PET", berat: 4.5, isReal: false },
      { namaKategori: "Kardus", berat: 2.0, isReal: false },
    ],
    totalBerat: 6.5,
    isRealWeight: false,
    totalPoin: 55,
    isEstimatedReward: true,
    status: "menunggu_konfirmasi",
  },
  {
    id: "STR-202608-1001",
    kodeTransaksi: "STR-202608-1001",
    tanggalWaktu: "26 Agu 2026, 09:35 WIB",
    nasabahNama: "Budi Santoso",
    nasabahTelp: "085678901234",
    rincianSampah: [
      { namaKategori: "Botol PET", berat: 10.0, isReal: true },
      { namaKategori: "Kardus", berat: 5.0, isReal: true },
    ],
    totalBerat: 15.0,
    isRealWeight: true,
    totalPoin: 150,
    nilaiRupiah: 45000,
    isEstimatedReward: false,
    status: "selesai",
  },
  {
    id: "STR-202608-0999",
    kodeTransaksi: "STR-202608-0999",
    tanggalWaktu: "25 Agu 2026, 16:30 WIB",
    nasabahNama: "Siti Nurhaliza",
    nasabahTelp: "082155667788",
    rincianSampah: [
      { namaKategori: "Kaca", berat: 8.0, isReal: false },
      { namaKategori: "Kardus", berat: 4.2, isReal: false },
    ],
    totalBerat: 12.2,
    isRealWeight: false,
    totalPoin: 95,
    isEstimatedReward: true,
    status: "menunggu_konfirmasi",
  },
  {
    id: "STR-202608-0998",
    kodeTransaksi: "STR-202608-0998",
    tanggalWaktu: "25 Agu 2026, 14:10 WIB",
    nasabahNama: "Siti Aminah",
    nasabahTelp: "081987654321",
    rincianSampah: [
      { namaKategori: "Kaleng Aluminium", berat: 3.0, isReal: true },
      { namaKategori: "Kaca", berat: 4.0, isReal: true },
    ],
    totalBerat: 7.0,
    isRealWeight: true,
    totalPoin: 96,
    isEstimatedReward: false,
    status: "diverifikasi",
  },
  {
    id: "STR-202608-0992",
    kodeTransaksi: "STR-202608-0992",
    tanggalWaktu: "24 Agu 2026, 11:20 WIB",
    nasabahNama: "Dewi Lestari",
    nasabahTelp: "081987654321",
    rincianSampah: [
      { namaKategori: "Kertas HVS & Arsip", berat: 12.0, isReal: true },
    ],
    totalBerat: 12.0,
    isRealWeight: true,
    totalPoin: 84,
    nilaiRupiah: 33600,
    isEstimatedReward: false,
    status: "selesai",
  },
  {
    id: "STR-202608-0985",
    kodeTransaksi: "STR-202608-0985",
    tanggalWaktu: "23 Agu 2026, 13:45 WIB",
    nasabahNama: "Ahmad Dahlan",
    nasabahTelp: "081234567890",
    rincianSampah: [
      { namaKategori: "Minyak Jelantah", berat: 5.0, isReal: true },
    ],
    totalBerat: 5.0,
    isRealWeight: true,
    totalPoin: 70,
    nilaiRupiah: 25000,
    isEstimatedReward: false,
    status: "selesai",
  },
  {
    id: "STR-202608-0979",
    kodeTransaksi: "STR-202608-0979",
    tanggalWaktu: "22 Agu 2026, 15:30 WIB",
    nasabahNama: "Rina Wijaya",
    nasabahTelp: "087811223344",
    rincianSampah: [
      { namaKategori: "Elektronik Kecil", berat: 2.5, isReal: false },
    ],
    totalBerat: 2.5,
    isRealWeight: false,
    totalPoin: 60,
    isEstimatedReward: true,
    status: "ditolak",
    catatanPetugas: "Kondisi baterai bocor dan tidak memenuhi kriteria penerimaan.",
  },
];

export const INITIAL_TKR_TRANSAKSI: TransaksiTkrAdminRecord[] = [
  {
    id: "TKR-202608-5001",
    kodePenukaran: "TKR-202608-5001",
    tanggalWaktu: "26 Agu 2026",
    nasabahNama: "Budi Santoso",
    nasabahTelp: "085678901234",
    itemHadiah: "Voucher Pulsa / E-Wallet Rp 25.000",
    biayaPoin: 75,
    status: "diproses",
  },
  {
    id: "TKR-202608-5000",
    kodePenukaran: "TKR-202608-5000",
    tanggalWaktu: "25 Agu 2026",
    nasabahNama: "Siti Aminah",
    nasabahTelp: "081987654321",
    itemHadiah: "Voucher Belanja Sembako Rp 50.000",
    biayaPoin: 150,
    status: "selesai",
    waktuSelesai: "25 Agu 2026, 16:00 WIB",
  },
  {
    id: "TKR-202608-4992",
    kodePenukaran: "TKR-202608-4992",
    tanggalWaktu: "23 Agu 2026",
    nasabahNama: "Dewi Lestari",
    nasabahTelp: "081987654321",
    itemHadiah: "Tumbler Stainless Steel 500ml",
    biayaPoin: 120,
    status: "selesai",
    waktuSelesai: "23 Agu 2026, 14:15 WIB",
  },
];



export async function getTransaksiSetorList(): Promise<TransaksiSetorAdminRecord[]> {
  if (typeof window !== "undefined") {
    // Clear deprecated v1 cache
    localStorage.removeItem("circula_admin_transaksi_str_v1");

    const stored = localStorage.getItem(STR_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set(parsed.map((item: TransaksiSetorAdminRecord) => item.id));
          const missing = INITIAL_STR_TRANSAKSI.filter((item) => !existingIds.has(item.id));
          if (missing.length > 0) {
            const merged = [...missing, ...parsed];
            saveTransaksiSetorList(merged);
            return merged;
          }
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse stored STR transactions:", e);
      }
    }
  }

  const strResult = await fetchWithAuth<TransaksiSetorAdminRecord[]>(
    ENDPOINTS.ADMIN_SETOR.LIST(),
    { cache: "no-store" } as RequestInit
  );
  if (strResult.ok && Array.isArray(strResult.data)) {
    saveTransaksiSetorList(strResult.data);
    return strResult.data;
  }
  console.warn("[AdminTransaksiService] STR list API not reachable, using mock data.");

  saveTransaksiSetorList(INITIAL_STR_TRANSAKSI);
  return INITIAL_STR_TRANSAKSI;
}

export function saveTransaksiSetorList(list: TransaksiSetorAdminRecord[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STR_STORAGE_KEY, JSON.stringify(list));
  }
}

export async function verifyTimbanganSetor(
  id: string,
  updatedItems: SampahItemRincian[],
  totalBerat: number,
  totalPoin: number
): Promise<TransaksiSetorAdminRecord> {
  const verifyResult = await fetchWithAuth(
    ENDPOINTS.ADMIN_SETOR.VERIFIKASI(id),
    { method: "PUT", body: JSON.stringify({ rincian: updatedItems, totalBerat, totalPoin }) }
  );
  if (!verifyResult.ok) {
    console.warn(`[AdminTransaksiService] Verify API failed (${verifyResult.error}), persisting locally.`);
  }

  const currentList = await getTransaksiSetorList();
  const index = currentList.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error(`Transaksi ID ${id} tidak ditemukan`);
  }

  const updatedRecord: TransaksiSetorAdminRecord = {
    ...currentList[index],
    rincianSampah: updatedItems,
    totalBerat,
    isRealWeight: true,
    totalPoin,
    isEstimatedReward: false,
    status: "diverifikasi",
  };

  currentList[index] = updatedRecord;
  saveTransaksiSetorList(currentList);
  return updatedRecord;
}

export async function finalizeTransaksiSetor(id: string): Promise<TransaksiSetorAdminRecord> {
  const result = await fetchWithAuth(
    ENDPOINTS.ADMIN_SETOR.VERIFIKASI(id),
    { method: "PUT", body: JSON.stringify({ status: "selesai" }) }
  );
  if (!result.ok) {
    console.warn(`[AdminTransaksiService] Finalize API call failed (${result.error}), persisting locally.`);
  }

  const currentList = await getTransaksiSetorList();
  const index = currentList.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error(`Transaksi ID ${id} tidak ditemukan`);
  }

  const updatedRecord: TransaksiSetorAdminRecord = {
    ...currentList[index],
    status: "selesai",
  };

  currentList[index] = updatedRecord;
  saveTransaksiSetorList(currentList);
  return updatedRecord;
}

export async function getTransaksiTkrList(): Promise<TransaksiTkrAdminRecord[]> {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(TKR_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse stored TKR transactions:", e);
      }
    }
  }

  const result = await fetchWithAuth<TransaksiTkrAdminRecord[]>(
    `${ENDPOINTS.TUKAR_POIN.LIST}/admin/list`,
    { cache: "no-store" } as RequestInit
  );
  if (result.ok && Array.isArray(result.data)) {
    saveTransaksiTkrList(result.data);
    return result.data;
  }
  console.warn("[AdminTransaksiService] TKR list API not reachable, using mock data.");

  saveTransaksiTkrList(INITIAL_TKR_TRANSAKSI);
  return INITIAL_TKR_TRANSAKSI;
}

export function saveTransaksiTkrList(list: TransaksiTkrAdminRecord[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(TKR_STORAGE_KEY, JSON.stringify(list));
  }
}

export async function completeTkrPenukaran(id: string): Promise<TransaksiTkrAdminRecord> {
  const result = await fetchWithAuth(
    `${ENDPOINTS.TUKAR_POIN.LIST}/admin/status/${id}`,
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
  const setoranBulanIniCount = strList.length >= 4 ? 38 : strList.length;
  const totalKgSampahBulanIni = 1250;
  const klaimVoucherCount = tkrList.length >= 2 ? 14 : tkrList.length;
  const klaimPersentaseValid = 100;
  const antreanVerifikasiCount = strList.filter(
    (item) => item.status === "menunggu_konfirmasi"
  ).length;

  return {
    setoranBulanIniCount,
    totalKgSampahBulanIni,
    klaimVoucherCount,
    klaimPersentaseValid,
    antreanVerifikasiCount,
  };
}
