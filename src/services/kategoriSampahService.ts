import { KategoriSampah } from "@/types/kategoriSampah";
import { apiRequest } from "@/lib/api/client";
import { KATEGORI } from "@/lib/api/endpoints";

// ─── API Shape normalization ──────────────────────────────────────────────────

interface ApiKategoriItem {
  id?: string;
  namaKategori?: string;
  jenis?: string;
  jenisSampah?: string;
  deskripsi?: string;
  hargaPerKg?: number | string;
  poinPerKg?: number | string;
  foto?: string;
  imageUrl?: string;
  syaratKondisi?: string;
  isActive?: boolean;
}

function normalizeKategori(item: ApiKategoriItem): KategoriSampah {
  const jenis = ((item.jenisSampah ?? item.jenis ?? "plastik") as string).toLowerCase();
  const validJenis = ["plastik", "kertas", "logam", "kaca"].includes(jenis)
    ? (jenis as KategoriSampah["jenisSampah"])
    : "plastik";

  return {
    id: item.id || String(Math.random()),
    namaKategori: item.namaKategori || "Kategori Sampah",
    jenisSampah: validJenis,
    deskripsi: item.deskripsi || `Kategori sampah ${validJenis} siap tampung loket timbang unit.`,
    hargaPerKg: Number(item.hargaPerKg) || 0,
    poinPerKg: Number(item.poinPerKg) || 0,
    imageUrl: item.imageUrl ?? item.foto ?? "",
    syaratKondisi: item.syaratKondisi || "Kondisi: Bersih, kering, bebas kotoran dan residu.",
    isActive: item.isActive !== false,
  };
}

// ─── Service Functions ────────────────────────────────────────────────────────

export async function getKategoriSampah(): Promise<KategoriSampah[]> {
  try {
    const data = await apiRequest<ApiKategoriItem[]>(KATEGORI.LIST);
    if (Array.isArray(data) && data.length > 0) {
      return data.map(normalizeKategori);
    }
    return [];
  } catch {
    return [];
  }
}

export async function createKategori(
  payload: Omit<KategoriSampah, "id" | "isActive">
): Promise<KategoriSampah> {
  const data = await apiRequest<ApiKategoriItem>(KATEGORI.CREATE, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return normalizeKategori(data);
}

export async function updateKategori(
  id: string,
  payload: Partial<Omit<KategoriSampah, "id">>
): Promise<KategoriSampah> {
  const data = await apiRequest<ApiKategoriItem>(KATEGORI.UPDATE(id), {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return normalizeKategori(data);
}

export async function deleteKategori(id: string): Promise<void> {
  await apiRequest<void>(KATEGORI.DELETE(id), { method: "DELETE" });
}
