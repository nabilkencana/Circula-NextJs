import {
  NasabahRecord,
  CreateNasabahPayload,
  UpdateNasabahPayload,
} from "@/types/adminNasabah";
import { apiRequest } from "@/lib/api/client";
import { NASABAH } from "@/lib/api/endpoints";

const STORAGE_KEY = "circula_admin_nasabah_list_v1";

export const INITIAL_MOCK_NASABAH: NasabahRecord[] = [
  {
    id: "NSB-001",
    namaLengkap: "Budi Santoso",
    tanggalDaftar: "26 Agu 2026",
    telp: "085678901234",
    alamat: "Jl. Merdeka No. 12, RT 03/05",
    username: "nasabah_budi",
    saldoPoin: 150,
    status: "aktif",
    fotoProfilUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "NSB-002",
    namaLengkap: "Siti Aminah",
    tanggalDaftar: "24 Agu 2026",
    telp: "081987654321",
    alamat: "Jl. Mawar Indah No. 45",
    username: "nasabah_siti",
    saldoPoin: 80,
    status: "aktif",
    fotoProfilUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "NSB-003",
    namaLengkap: "Dewi Lestari",
    tanggalDaftar: "26 Agu 2026",
    telp: "081987654321",
    alamat: "Jl. Kenanga No. 5, RT 02/01",
    username: "nasabah_dewi",
    saldoPoin: 0,
    isNew: true,
    status: "aktif",
    fotoProfilUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
  },
];

// ─── localStorage helpers ─────────────────────────────────────────────────────

function saveToLocalStorage(records: NasabahRecord[]) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
      console.warn("[adminNasabahService] Failed to save to localStorage:", e);
    }
  }
}

function readFromLocalStorage(): NasabahRecord[] | null {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("[adminNasabahService] Failed to parse localStorage:", e);
    }
  }
  return null;
}

// ─── Service Functions ────────────────────────────────────────────────────────

export async function getNasabahList(): Promise<NasabahRecord[]> {
  const cached = readFromLocalStorage();
  if (cached && cached.length > 0) return cached;

  try {
    const data = await apiRequest<NasabahRecord[]>(NASABAH.LIST);
    if (Array.isArray(data) && data.length > 0) {
      saveToLocalStorage(data);
      return data;
    }
  } catch (err) {
    console.warn("[adminNasabahService] Fetch fallback to mock data:", err);
  }

  saveToLocalStorage(INITIAL_MOCK_NASABAH);
  return INITIAL_MOCK_NASABAH;
}

export async function createNasabah(
  payload: CreateNasabahPayload
): Promise<NasabahRecord> {
  const currentList = await getNasabahList();
  const nextNumber = currentList.length + 1;
  const newId = `NSB-${String(nextNumber).padStart(3, "0")}`;

  const today = new Date();
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  const formattedDate = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

  const newRecord: NasabahRecord = {
    id: newId,
    namaLengkap: payload.namaLengkap.trim(),
    username: payload.username.trim().replace(/^@/, ""),
    telp: payload.telp.trim(),
    alamat: payload.alamat.trim(),
    saldoPoin: payload.saldoAwal || 0,
    isNew: true,
    status: payload.status,
    tanggalDaftar: formattedDate,
    fotoProfilUrl:
      payload.fotoProfilUrl ||
      `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80`,
  };

  try {
    await apiRequest(NASABAH.LIST, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn("[adminNasabahService] API POST offline, local only:", err);
  }

  const updatedList = [newRecord, ...currentList];
  saveToLocalStorage(updatedList);
  return newRecord;
}

export async function updateNasabah(
  id: string,
  payload: UpdateNasabahPayload
): Promise<NasabahRecord> {
  const currentList = await getNasabahList();
  const index = currentList.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error(`Nasabah dengan ID ${id} tidak ditemukan`);
  }

  const existing = currentList[index];
  const updated: NasabahRecord = {
    ...existing,
    namaLengkap: payload.namaLengkap ? payload.namaLengkap.trim() : existing.namaLengkap,
    username: payload.username ? payload.username.trim().replace(/^@/, "") : existing.username,
    telp: payload.telp ? payload.telp.trim() : existing.telp,
    alamat: payload.alamat ? payload.alamat.trim() : existing.alamat,
    status: payload.status || existing.status,
    fotoProfilUrl: payload.fotoProfilUrl || existing.fotoProfilUrl,
  };

  try {
    await apiRequest(NASABAH.DETAIL(id), {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn("[adminNasabahService] API PUT offline, local only:", err);
  }

  const updatedList = [...currentList];
  updatedList[index] = updated;
  saveToLocalStorage(updatedList);
  return updated;
}

export async function deleteNasabah(id: string): Promise<boolean> {
  const currentList = await getNasabahList();
  const filtered = currentList.filter((item) => item.id !== id);

  try {
    await apiRequest(NASABAH.DETAIL(id), { method: "DELETE" });
  } catch (err) {
    console.warn("[adminNasabahService] API DELETE offline, local only:", err);
  }

  saveToLocalStorage(filtered);
  return true;
}

export function exportNasabahCsv(records: NasabahRecord[]) {
  const headerRow = ["ID Nasabah", "Nama Lengkap", "Username", "No Telepon", "Alamat", "Saldo Poin", "Status", "Tanggal Daftar"];

  const rows = records.map((r) => [
    `"${r.id}"`,
    `"${r.namaLengkap}"`,
    `"@${r.username}"`,
    `"${r.telp}"`,
    `"${r.alamat.replace(/"/g, '""')}"`,
    `"${r.saldoPoin}"`,
    `"${r.status}"`,
    `"${r.tanggalDaftar}"`,
  ]);

  const csvContent = [headerRow.join(","), ...rows.map((row) => row.join(","))].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `data-nasabah-asrijaya-${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
