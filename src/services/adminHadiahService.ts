import {
  HadiahAdminRecord,
  KategoriHadiah,
  CreateHadiahPayload,
  UpdateHadiahPayload,
  RiwayatStokRecord,
} from "@/types/adminHadiah";
import { apiRequest } from "@/lib/api/client";
import { HADIAH } from "@/lib/api/endpoints";

const STORAGE_KEY = "circula_admin_hadiah_list_v1";

function saveToLocalStorage(records: HadiahAdminRecord[]) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
      console.warn("[adminHadiahService] Failed to save to localStorage:", e);
    }
  }
}

export async function getHadiahList(): Promise<HadiahAdminRecord[]> {
  const data = await apiRequest<any[]>(HADIAH.LIST);
  if (Array.isArray(data) && data.length > 0) {
    const mapped = data.map(mapHadiahApi);
    saveToLocalStorage(mapped);
    return mapped;
  }
  return [];
}

// Backend hadiah field: { id, namaHadiah, poinDibutuhkan, stok, foto, ... }
// Frontend HadiahAdminRecord butuh kategori/deskripsi/satuanStok/imageUrl.
// Infer kategori dari nama (backend tak kirim kategori/deskripsi/satuan).
function mapHadiahApi(raw: any): HadiahAdminRecord {
  const nama = (raw.namaHadiah || "").toLowerCase();
  let kategori: KategoriHadiah = "merchandise";
  if (/voucher|pulsa|wallet|e-wallet|ewallet|digital|token/i.test(nama)) kategori = "voucher";
  else if (/minyak|beras|gula|sembako|tepung|telur|kopi|sabun|detergen|mie/i.test(nama)) kategori = "sembako";

  return {
    id: raw.id,
    namaHadiah: raw.namaHadiah,
    kategori,
    deskripsi: raw.deskripsi || `Hadiah: ${raw.namaHadiah}`,
    poinDibutuhkan: Number(raw.poinDibutuhkan) || 0,
    stok: Number(raw.stok) || 0,
    satuanStok: raw.satuanStok || raw.satuan || "Unit",
    imageUrl: raw.imageUrl || raw.foto || "",
  };
}

export async function createHadiah(
  payload: CreateHadiahPayload
): Promise<HadiahAdminRecord> {
  const currentList = await getHadiahList();

  const randomHash1 = Math.random().toString(36).substring(2, 10);
  const randomHash2 = Math.random().toString(36).substring(2, 6);
  const newRecord: HadiahAdminRecord = {
    id: `${randomHash1}-${randomHash2}`,
    namaHadiah: payload.namaHadiah.trim(),
    kategori: payload.kategori,
    deskripsi: payload.deskripsi.trim(),
    poinDibutuhkan: payload.poinDibutuhkan,
    stok: payload.stok,
    satuanStok: payload.satuanStok.trim() || "Pcs",
    imageUrl:
      payload.imageUrl ||
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80",
  };

  try {
    await apiRequest(HADIAH.CREATE, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn("[adminHadiahService] API POST offline, local only:", err);
  }

  const updatedList = [newRecord, ...currentList];
  saveToLocalStorage(updatedList);
  return newRecord;
}

export async function updateHadiah(
  id: string,
  payload: UpdateHadiahPayload
): Promise<HadiahAdminRecord> {
  const currentList = await getHadiahList();
  const index = currentList.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error(`Hadiah dengan ID ${id} tidak ditemukan`);
  }

  const existing = currentList[index];
  const updated: HadiahAdminRecord = {
    ...existing,
    namaHadiah: payload.namaHadiah ? payload.namaHadiah.trim() : existing.namaHadiah,
    kategori: payload.kategori || existing.kategori,
    deskripsi: payload.deskripsi ? payload.deskripsi.trim() : existing.deskripsi,
    poinDibutuhkan:
      payload.poinDibutuhkan !== undefined
        ? payload.poinDibutuhkan
        : existing.poinDibutuhkan,
    stok: payload.stok !== undefined ? payload.stok : existing.stok,
    satuanStok: payload.satuanStok ? payload.satuanStok.trim() : existing.satuanStok,
    imageUrl: payload.imageUrl || existing.imageUrl,
  };

  try {
    await apiRequest(HADIAH.UPDATE(id), {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn("[adminHadiahService] API PUT offline, local only:", err);
  }

  const updatedList = [...currentList];
  updatedList[index] = updated;
  saveToLocalStorage(updatedList);
  return updated;
}

export async function deleteHadiah(id: string): Promise<boolean> {
  const currentList = await getHadiahList();
  const filtered = currentList.filter((item) => item.id !== id);

  try {
    await apiRequest(HADIAH.DELETE(id), {
      method: "DELETE",
    });
  } catch (err) {
    console.warn("[adminHadiahService] API DELETE offline, local only:", err);
  }

  saveToLocalStorage(filtered);
  return true;
}

export async function getRiwayatStok(): Promise<RiwayatStokRecord[]> {
  return [];
}
