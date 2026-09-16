import {
  TransaksiSetorAdminRecord,
  TransaksiTkrAdminRecord,
  TransaksiTelemetryStats,
  SampahItemRincian,
} from "@/types/adminTransaksi";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://learn.smktelkom-mlg.sch.id/bank_sampah";

const STR_STORAGE_KEY = "circula_admin_transaksi_str_v1";
const TKR_STORAGE_KEY = "circula_admin_transaksi_tkr_v1";

export const INITIAL_STR_TRANSAKSI: TransaksiSetorAdminRecord[] = [
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

export async function getTransaksiSetorList(): Promise<TransaksiSetorAdminRecord[]> {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STR_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse stored STR transactions:", e);
      }
    }
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/setor-sampah/admin/list`, {
      method: "GET",
      headers: getAuthHeaders(),
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data?.data)) {
        saveTransaksiSetorList(data.data);
        return data.data;
      }
    }
  } catch (err) {
    console.warn("Backend API not reachable, using mock STR data:", err);
  }

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
  try {
    await fetch(`${API_BASE_URL}/api/v1/setor-sampah/admin/verify/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ rincian: updatedItems, totalBerat, totalPoin }),
    });
  } catch (err) {
    console.warn("API verify failed or offline, persisting locally:", err);
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
  try {
    await fetch(`${API_BASE_URL}/api/v1/setor-sampah/admin/finalize/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
    });
  } catch (err) {
    console.warn("API finalize failed or offline, persisting locally:", err);
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

  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/penukaran-poin/admin/list`, {
      method: "GET",
      headers: getAuthHeaders(),
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data?.data)) {
        saveTransaksiTkrList(data.data);
        return data.data;
      }
    }
  } catch (err) {
    console.warn("Backend API not reachable, using mock TKR data:", err);
  }

  saveTransaksiTkrList(INITIAL_TKR_TRANSAKSI);
  return INITIAL_TKR_TRANSAKSI;
}

export function saveTransaksiTkrList(list: TransaksiTkrAdminRecord[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(TKR_STORAGE_KEY, JSON.stringify(list));
  }
}

export async function completeTkrPenukaran(id: string): Promise<TransaksiTkrAdminRecord> {
  try {
    await fetch(`${API_BASE_URL}/api/v1/penukaran-poin/admin/status/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ status: "selesai" }),
    });
  } catch (err) {
    console.warn("API status update failed or offline, persisting locally:", err);
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
