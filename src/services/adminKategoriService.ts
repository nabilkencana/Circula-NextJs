import {
  KategoriSampahAdminRecord,
  JenisSampah,
  CreateKategoriPayload,
  UpdateKategoriPayload,
} from "@/types/adminKategori";
import { apiRequest } from "@/lib/api/client";
import { KATEGORI } from "@/lib/api/endpoints";

const STORAGE_KEY = "circula_admin_kategori_list_v1";

function saveToLocalStorage(records: KategoriSampahAdminRecord[]) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
      console.warn("[adminKategoriService] Failed to save to localStorage:", e);
    }
  }
}

export async function getKategoriList(): Promise<KategoriSampahAdminRecord[]> {
  const data = await apiRequest<any[]>(KATEGORI.LIST);
  if (Array.isArray(data) && data.length > 0) {
    const mapped = data.map(mapKategoriApi);
    saveToLocalStorage(mapped);
    return mapped;
  }
  return [];
}

// Backend kategori field: { id, namaKategori, hargaPerKg, poinPerKg, jenis, foto, ... }
// Frontend KategoriSampahAdminRecord butuh field nama beda + satuan/materialCode.
function mapKategoriApi(raw: any): KategoriSampahAdminRecord {
  return {
    id: raw.id,
    materialCode: `ID: ${String(raw.id).slice(0, 8)}...`,
    namaKategori: raw.namaKategori,
    jenisSampah: (raw.jenis as JenisSampah) || "plastik",
    deskripsi: raw.deskripsi || `Kategori ${raw.namaKategori} — daur ulang.`,
    hargaBeliPerKg: Number(raw.hargaPerKg) || 0,
    poinRewardPerKg: Number(raw.poinPerKg) || 0,
    imageUrl: raw.imageUrl || raw.foto || "",
    satuan: raw.satuan || "kg",
  };
}

export async function createKategori(
  payload: CreateKategoriPayload
): Promise<KategoriSampahAdminRecord> {
  const currentList = await getKategoriList();

  const randomHash = Math.random().toString(36).substring(2, 10);
  const newRecord: KategoriSampahAdminRecord = {
    id:
      currentList.length > 0
        ? `cat-${payload.jenisSampah}-${String(currentList.length + 1).padStart(2, "0")}`
        : `cat-${String(Date.now())}`,
    materialCode: `ID: ${randomHash}...`,
    namaKategori: payload.namaKategori.trim(),
    jenisSampah: payload.jenisSampah,
    deskripsi: payload.deskripsi.trim(),
    hargaBeliPerKg: payload.hargaBeliPerKg,
    poinRewardPerKg: payload.poinRewardPerKg,
    satuan: payload.satuan || "kg",
    imageUrl:
      payload.imageUrl ||
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80",
  };

  try {
    await apiRequest(KATEGORI.CREATE, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn("[adminKategoriService] API POST offline, local only:", err);
  }

  const updatedList = [...currentList, newRecord];
  saveToLocalStorage(updatedList);
  return newRecord;
}

export async function updateKategori(
  id: string,
  payload: UpdateKategoriPayload
): Promise<KategoriSampahAdminRecord> {
  const currentList = await getKategoriList();
  const index = currentList.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error(`Kategori dengan ID ${id} tidak ditemukan`);
  }

  const existing = currentList[index];
  const updated: KategoriSampahAdminRecord = {
    ...existing,
    namaKategori: payload.namaKategori ? payload.namaKategori.trim() : existing.namaKategori,
    jenisSampah: payload.jenisSampah || existing.jenisSampah,
    deskripsi: payload.deskripsi ? payload.deskripsi.trim() : existing.deskripsi,
    hargaBeliPerKg:
      payload.hargaBeliPerKg !== undefined
        ? payload.hargaBeliPerKg
        : existing.hargaBeliPerKg,
    poinRewardPerKg:
      payload.poinRewardPerKg !== undefined
        ? payload.poinRewardPerKg
        : existing.poinRewardPerKg,
    imageUrl: payload.imageUrl || existing.imageUrl,
    satuan: payload.satuan || existing.satuan,
  };

  try {
    await apiRequest(KATEGORI.UPDATE(id), {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn("[adminKategoriService] API PUT offline, local only:", err);
  }

  const updatedList = [...currentList];
  updatedList[index] = updated;
  saveToLocalStorage(updatedList);
  return updated;
}

export async function deleteKategori(id: string): Promise<boolean> {
  const currentList = await getKategoriList();
  const filtered = currentList.filter((item) => item.id !== id);

  try {
    await apiRequest(KATEGORI.DELETE(id), {
      method: "DELETE",
    });
  } catch (err) {
    console.warn("[adminKategoriService] API DELETE offline, local only:", err);
  }

  saveToLocalStorage(filtered);
  return true;
}

export async function batchUpdatePricing(
  percentageMultiplier: number
): Promise<KategoriSampahAdminRecord[]> {
  const currentList = await getKategoriList();
  const updatedList = currentList.map((item) => ({
    ...item,
    hargaBeliPerKg: Math.round((item.hargaBeliPerKg * (1 + percentageMultiplier / 100)) / 100) * 100,
  }));

  saveToLocalStorage(updatedList);
  return updatedList;
}
