import { TransaksiPenyetoran } from "@/types/historiSetor";
import { apiRequest } from "@/lib/api/client";
import { SETOR } from "@/lib/api/endpoints";

// ─── Response shape normalization ─────────────────────────────────────────────

type StatusMap = Record<string, TransaksiPenyetoran["status"]>;
const STATUS_MAP: StatusMap = {
  menunggu_konfirmasi: "menunggu_konfirmasi",
  diverifikasi: "diverifikasi",
  selesai: "selesai",
  ditolak: "ditolak",
};

interface ApiHistoriItem {
  id?: string;
  kodeSetor?: string;
  tanggal?: string;
  tanggalVerifikasi?: string;
  status?: string;
  metode?: string;
  lokasi?: string;
  catatan?: string;
  catatanPetugas?: string;
  petugas?: string;
  totalBerat?: number | string;
  totalPoin?: number | string;
  items?: Array<{
    namaKategori?: string;
    berat?: number | string;
    isReal?: boolean;
    poin?: number | string;
    rupiah?: number | string;
  }>;
}

function normalizeHistori(item: ApiHistoriItem, index: number): TransaksiPenyetoran {
  const rawStatus = (item.status ?? "").toLowerCase();
  return {
    id: item.id || `tx-${index}`,
    kodeSetor: item.kodeSetor || `STR-202608-${1000 + index}`,
    tanggalPengajuan: item.tanggal || new Date().toISOString(),
    tanggalVerifikasi: item.tanggalVerifikasi,
    status: STATUS_MAP[rawStatus] ?? "menunggu_konfirmasi",
    metodePenyerahan: item.metode === "jemput" ? "jemput" : "drop-off",
    lokasiTujuan: item.lokasi || "Drop-off Mandiri Unit Pusat",
    catatanNasabah: item.catatan,
    catatanPetugas: item.catatanPetugas,
    petugasVerifikator: item.petugas,
    totalBeratKg: Number(item.totalBerat) || 0,
    totalPoin: Number(item.totalPoin) || 0,
    items: (item.items || []).map((sub) => ({
      kategoriNama: sub.namaKategori || "Kategori Sampah",
      beratKg: Number(sub.berat) || 0,
      isRealWeight: Boolean(sub.isReal),
      poinSubtotal: Number(sub.poin) || 0,
      rupiahSubtotal: Number(sub.rupiah) || 0,
    })),
  };
}

// ─── Service Functions ────────────────────────────────────────────────────────

export async function getMySetorHistory(
  bulan?: string
): Promise<TransaksiPenyetoran[]> {
  try {
    const data = await apiRequest<ApiHistoriItem[]>(SETOR.MY_SETOR(bulan));
    if (Array.isArray(data) && data.length > 0) {
      return data.map(normalizeHistori);
    }
    return [];
  } catch {
    return [];
  }
}

export async function getDetailSetor(id: string): Promise<TransaksiPenyetoran | null> {
  try {
    const data = await apiRequest<ApiHistoriItem>(SETOR.DETAIL(id));
    return data ? normalizeHistori(data, 0) : null;
  } catch {
    return null;
  }
}
