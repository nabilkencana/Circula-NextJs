import {
  KategoriSampahAdminRecord,
  CreateKategoriPayload,
  UpdateKategoriPayload,
} from "@/types/adminKategori";
import { apiRequest, buildAuthHeaders, BASE_URL } from "@/lib/api/client";

const STORAGE_KEY = "circula_admin_kategori_list_v1";

export const INITIAL_MOCK_KATEGORI: KategoriSampahAdminRecord[] = [
  {
    id: "cat-pet-01",
    materialCode: "ID: 6b17c2cf...",
    jenisSampah: "plastik",
    namaKategori: "Botol Plastik PET (Bersih)",
    deskripsi: "Botol bening mineral, label & tutup dilepas, tanpa sisa residu cairan pewarna.",
    hargaBeliPerKg: 3500,
    poinRewardPerKg: 10,
    satuan: "kg",
    imageUrl:
      "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-krd-02",
    materialCode: "ID: 5b2eff42...",
    jenisSampah: "kertas",
    namaKategori: "Kardus & Karton Bekas",
    deskripsi: "Kardus cokelat tebal bergelombang, kering, lipat rapi tanpa lakban berlebih.",
    hargaBeliPerKg: 2000,
    poinRewardPerKg: 5,
    satuan: "kg",
    imageUrl:
      "https://images.unsplash.com/photo-1534056070602-a2a913134263?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-klg-03",
    materialCode: "ID: ae28e806...",
    jenisSampah: "logam",
    namaKategori: "Kaleng Aluminium / Minuman",
    deskripsi: "Kaleng soda atau susu murni aluminium, dicuci bersih dan dipress/dipipihkan.",
    hargaBeliPerKg: 12000,
    poinRewardPerKg: 30,
    satuan: "kg",
    imageUrl:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-kca-04",
    materialCode: "ID: 440f0550...",
    jenisSampah: "kaca",
    namaKategori: "Botol Kaca Bening",
    deskripsi: "Botol kaca utuh bebas retak, transparan, tanpa tutup logam atau cincin leher.",
    hargaBeliPerKg: 1500,
    poinRewardPerKg: 4,
    satuan: "kg",
    imageUrl:
      "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-tmb-05",
    materialCode: "ID: f1234567...",
    jenisSampah: "logam",
    namaKategori: "Tembaga Super (Kabel Kupas)",
    deskripsi: "Kawat tembaga berkilau tebal >1mm, bebas kotoran oli, kupasan murni.",
    hargaBeliPerKg: 75000,
    poinRewardPerKg: 150,
    satuan: "kg",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "cat-hvs-06",
    materialCode: "ID: c3456789...",
    jenisSampah: "kertas",
    namaKategori: "Kertas HVS & Arsip Dokumen",
    deskripsi: "Kertas putih bekas print/tulis A4/F4, kering, bebas staples atau jilid plastik.",
    hargaBeliPerKg: 2800,
    poinRewardPerKg: 7,
    satuan: "kg",
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
  },
];

function getHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const appKey =
    process.env.NEXT_PUBLIC_APP_KEY || "97945213-34a7-48cf-baac-8740c1d18765";
  if (appKey) {
    headers["x-app-key"] = appKey;
  }

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("circula_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
}

function saveToLocalStorage(records: KategoriSampahAdminRecord[]) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
      console.warn("[adminKategoriService] Failed to save to localStorage:", e);
    }
  }
}

function readFromLocalStorage(): KategoriSampahAdminRecord[] | null {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("[adminKategoriService] Failed to parse localStorage:", e);
    }
  }
  return null;
}

export async function getKategoriList(): Promise<KategoriSampahAdminRecord[]> {
  const cached = readFromLocalStorage();
  if (cached && cached.length > 0) {
    return cached;
  }

  const url = `${BASE_URL}/api/v1/kategori-sampah`;
  const headers = getHeaders();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(url, {
      method: "GET",
      headers,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data) && json.data.length > 0) {
        saveToLocalStorage(json.data);
        return json.data;
      }
    }
  } catch (err) {
    console.warn(
      "[adminKategoriService] Fetch fallback to mock data:",
      err
    );
  }

  saveToLocalStorage(INITIAL_MOCK_KATEGORI);
  return INITIAL_MOCK_KATEGORI;
}

export async function createKategori(
  payload: CreateKategoriPayload
): Promise<KategoriSampahAdminRecord> {
  const currentList = await getKategoriList();

  const randomHash = Math.random().toString(36).substring(2, 10);
  const newRecord: KategoriSampahAdminRecord = {
    id: `cat-${payload.jenisSampah}-${String(currentList.length + 1).padStart(2, "0")}`,
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
    const url = `${BASE_URL}/api/v1/kategori-sampah`;
    const headers = getHeaders();
    await fetch(url, {
      method: "POST",
      headers,
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
    const url = `${BASE_URL}/api/v1/kategori-sampah/${id}`;
    const headers = getHeaders();
    await fetch(url, {
      method: "PUT",
      headers,
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
    const url = `${BASE_URL}/api/v1/kategori-sampah/${id}`;
    const headers = getHeaders();
    await fetch(url, {
      method: "DELETE",
      headers,
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
