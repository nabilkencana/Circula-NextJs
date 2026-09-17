import { KategoriSampah } from "@/types/kategoriSampah";
import { apiRequest } from "@/lib/api/client";
import { KATEGORI } from "@/lib/api/endpoints";

// ─── Mock fallback data ───────────────────────────────────────────────────────

export const MOCK_KATEGORI_SAMPAH: KategoriSampah[] = [
  {
    id: "eacfc2cf-2dc6-40c3-96fe-d55806f96b50",
    namaKategori: "Botol Plastik PET (Bersih)",
    jenisSampah: "plastik",
    deskripsi: "Botol air mineral dan minuman bening transparan hasil pemilahan rumah tangga.",
    hargaPerKg: 3500,
    poinPerKg: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=800&q=80",
    syaratKondisi: "Kondisi: Bersih, kering, pipihkan tanpa label & tutup botol.",
    isActive: true,
  },
  {
    id: "5b2eff42-e462-400f-95c7-4b096e8cc6e1",
    namaKategori: "Kardus & Karton Bekas",
    jenisSampah: "kertas",
    deskripsi: "Kardus gelombang boks kemasan barang elektronik, sembako, dan logistik.",
    hargaPerKg: 2000,
    poinPerKg: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1507560461415-997cd00bfd45?auto=format&fit=crop&w=800&q=80",
    syaratKondisi: "Kondisi: Diikat rapi dengan tali rami, kering tanpa minyak.",
    isActive: true,
  },
  {
    id: "ae28e806-940e-4c7f-8c93-c3184eb105a0",
    namaKategori: "Kaleng Aluminium Minuman",
    jenisSampah: "logam",
    deskripsi: "Kaleng minuman ringan bersoda, susu kental manis, atau wadah biskuit kaleng.",
    hargaPerKg: 12000,
    poinPerKg: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1561503412-852800622772?auto=format&fit=crop&w=800&q=80",
    syaratKondisi: "Kondisi: Dipadatkan pipih, bersih dibilas tanpa residu cairan.",
    isActive: true,
  },
  {
    id: "440f0550-7e61-44d2-889b-8f9bef8835e7",
    namaKategori: "Botol Kaca Bening",
    jenisSampah: "kaca",
    deskripsi: "Botol kecap, sirup, atau botol selai kaca transparan utuh.",
    hargaPerKg: 1500,
    poinPerKg: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1608745167260-e15bc0e0521f?auto=format&fit=crop&w=800&q=80",
    syaratKondisi: "Kondisi: Fisik utuh tidak retak, tutup seng sudah dilepas.",
    isActive: true,
  },
  {
    id: "f1234567-89ab-cdef-0123-456789abcdef",
    namaKategori: "Tembaga Super (Kabel Kupas)",
    jenisSampah: "logam",
    deskripsi: "Kawat tembaga murni hasil pengupasan kabel instalasi listrik PLN dan dinamo mesin.",
    hargaPerKg: 75000,
    poinPerKg: 150,
    imageUrl:
      "https://images.unsplash.com/photo-1707409464255-e78eb873298a?auto=format&fit=crop&w=800&q=80",
    syaratKondisi: "Kondisi: 100% bebas isolator plastik, berkilau tanpa karat.",
    isActive: true,
  },
  {
    id: "7c123456-789a-bcde-f012-3456789abcde",
    namaKategori: "Kertas HVS & Arsip Dokumen",
    jenisSampah: "kertas",
    deskripsi: "Kertas cetak HVS putih bekas skripsi, fotokopi kantor, dan buku tulis.",
    hargaPerKg: 2800,
    poinPerKg: 7,
    imageUrl:
      "https://images.unsplash.com/photo-1562240020-ce31ccb0fa7d?auto=format&fit=crop&w=800&q=80",
    syaratKondisi: "Kondisi: Lembaran kering teratur tanpa klip besi & staples.",
    isActive: true,
  },
];

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
    imageUrl: item.imageUrl ?? item.foto ?? MOCK_KATEGORI_SAMPAH[0].imageUrl,
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
    return MOCK_KATEGORI_SAMPAH;
  } catch {
    return MOCK_KATEGORI_SAMPAH;
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
