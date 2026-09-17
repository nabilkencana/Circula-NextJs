import {
  HadiahAdminRecord,
  CreateHadiahPayload,
  UpdateHadiahPayload,
  RiwayatStokRecord,
} from "@/types/adminHadiah";
import { apiRequest, buildAuthHeaders, BASE_URL } from "@/lib/api/client";

const STORAGE_KEY = "circula_admin_hadiah_list_v1";

export const INITIAL_MOCK_HADIAH: HadiahAdminRecord[] = [
  {
    id: "8bd74595-3b91",
    namaHadiah: "Voucher Pulsa / E-Wallet Rp 25.000",
    kategori: "voucher",
    deskripsi:
      "Voucher digital resmi untuk pulsa seluler (Telkomsel, Indosat, XL) atau saldo domisili e-wallet (GoPay, OVO, ShopeePay).",
    poinDibutuhkan: 75,
    stok: 50,
    satuanStok: "Unit",
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0a67e55722c0?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "c4129a08-11d2",
    namaHadiah: "Minyak Goreng Bimoli 1 Liter",
    kategori: "sembako",
    deskripsi:
      "Minyak goreng kelapa sawit higienis kemasan pouch 1 liter, kaya vitamin E & omega 9.",
    poinDibutuhkan: 100,
    stok: 25,
    satuanStok: "Pcs",
    imageUrl:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "f7819302-8a44",
    namaHadiah: "Beras Super Pulen 2.5 Kg",
    kategori: "sembako",
    deskripsi:
      "Beras kualitas premium tanpa pemutih dan pengawet, pulen dan wangi alami panen lokal.",
    poinDibutuhkan: 180,
    stok: 15,
    satuanStok: "Sak",
    imageUrl:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "e5638210-99c7",
    namaHadiah: "Gula Pasir 1 Kg",
    kategori: "sembako",
    deskripsi:
      "Gula pasir murni kristal putih manis alami kemasan 1 kg berstandar SNI.",
    poinDibutuhkan: 60,
    stok: 0,
    satuanStok: "Pcs",
    imageUrl:
      "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=600&auto=format&fit=crop&q=80",
  },
];

export const INITIAL_MOCK_RIWAYAT_STOK: RiwayatStokRecord[] = [
  {
    id: "LOG-001",
    tanggal: "16 Sep 2026, 14:30 WIB",
    namaHadiah: "Gula Pasir 1 Kg",
    tipe: "keluar",
    jumlah: 10,
    keterangan: "Penukaran nasabah NSB-001 & NSB-002",
  },
  {
    id: "LOG-002",
    tanggal: "15 Sep 2026, 09:15 WIB",
    namaHadiah: "Minyak Goreng Bimoli 1 Liter",
    tipe: "masuk",
    jumlah: 25,
    keterangan: "Restok operasional gudang sembako",
  },
  {
    id: "LOG-003",
    tanggal: "14 Sep 2026, 11:20 WIB",
    namaHadiah: "Voucher Pulsa / E-Wallet Rp 25.000",
    tipe: "masuk",
    jumlah: 50,
    keterangan: "Top-up API kupon digital mitra fintech",
  },
  {
    id: "LOG-004",
    tanggal: "12 Sep 2026, 16:45 WIB",
    namaHadiah: "Beras Super Pulen 2.5 Kg",
    tipe: "keluar",
    jumlah: 5,
    keterangan: "Penukaran nasabah NSB-003",
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

function saveToLocalStorage(records: HadiahAdminRecord[]) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
      console.warn("[adminHadiahService] Failed to save to localStorage:", e);
    }
  }
}

function readFromLocalStorage(): HadiahAdminRecord[] | null {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("[adminHadiahService] Failed to parse localStorage:", e);
    }
  }
  return null;
}

export async function getHadiahList(): Promise<HadiahAdminRecord[]> {
  const cached = readFromLocalStorage();
  if (cached && cached.length > 0) {
    return cached;
  }

  const url = `${BASE_URL}/api/v1/hadiah`;
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
      "[adminHadiahService] Fetch fallback to mock data:",
      err
    );
  }

  saveToLocalStorage(INITIAL_MOCK_HADIAH);
  return INITIAL_MOCK_HADIAH;
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
    const url = `${BASE_URL}/api/v1/hadiah`;
    const headers = getHeaders();
    await fetch(url, {
      method: "POST",
      headers,
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
    const url = `${BASE_URL}/api/v1/hadiah/${id}`;
    const headers = getHeaders();
    await fetch(url, {
      method: "PUT",
      headers,
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
    const url = `${BASE_URL}/api/v1/hadiah/${id}`;
    const headers = getHeaders();
    await fetch(url, {
      method: "DELETE",
      headers,
    });
  } catch (err) {
    console.warn("[adminHadiahService] API DELETE offline, local only:", err);
  }

  saveToLocalStorage(filtered);
  return true;
}

export async function getRiwayatStok(): Promise<RiwayatStokRecord[]> {
  return INITIAL_MOCK_RIWAYAT_STOK;
}
