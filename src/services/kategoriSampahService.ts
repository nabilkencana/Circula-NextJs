import { KategoriSampah } from "@/types/kategoriSampah";
import { apiRequest } from "@/lib/api/client";
import { KATEGORI } from "@/lib/api/endpoints";

// ─── API Shape Normalization ──────────────────────────────────────────────────

/**
 * Bentuk data mentah (DTO) kategori sampah dari respons API backend.
 */
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

/**
 * Menormalkan struktur data mentah API menjadi entitas `KategoriSampah` yang konsisten dan aman tipe.
 * Memvalidasi klasifikasi jenis sampah ke dalam 4 jenis baku ('plastik' | 'kertas' | 'logam' | 'kaca').
 *
 * @param item Objek mentah dari endpoint backend
 * @returns Objek terstandarisasi `KategoriSampah`
 */
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

/**
 * Mengambil seluruh daftar kategori sampah aktif dari server.
 *
 * @returns Array objek `KategoriSampah`
 */
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

/**
 * Membuat data kategori sampah baru (khusus konsol administrator).
 *
 * @param payload Data kategori sampah tanpa ID dan flag status aktif
 * @returns Objek `KategoriSampah` yang baru dibuat
 */
export async function createKategori(
  payload: Omit<KategoriSampah, "id" | "isActive">
): Promise<KategoriSampah> {
  const data = await apiRequest<ApiKategoriItem>(KATEGORI.CREATE, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return normalizeKategori(data);
}

/**
 * Memperbarui rincian kategori sampah yang ada.
 *
 * @param id Identifier unik kategori sampah
 * @param payload Bagian data yang ingin diperbarui
 * @returns Objek `KategoriSampah` setelah pembaruan
 */
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

/**
 * Menghapus kategori sampah dari sistem berdasarkan ID.
 *
 * @param id Identifier unik kategori sampah yang akan dihapus
 */
export async function deleteKategori(id: string): Promise<void> {
  await apiRequest<void>(KATEGORI.DELETE(id), { method: "DELETE" });
}

