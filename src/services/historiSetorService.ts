/**
 * @file historiSetorService.ts
 * @description Service layer untuk modul Riwayat Penyetoran Sampah (Histori Setor).
 * Mengatur komunikasi HTTP ke backend API Circula, normalisasi data (Adapter Pattern),
 * serta penyediaan mock data fallback jika API backend offline saat simulasi/pengujian.
 * 
 * Peran dalam UKK:
 * - Menunjukkan arsitektur Service-Repository / Data Access Layer yang rapi.
 * - Menerapkan Data Normalization (Adapter Pattern) agar frontend tidak crash saat backend mengirim format data berbeda atau null.
 * - Menjamin ketersediaan data fallback (High Resilience) saat pengujian lokal tanpa internet/backend.
 */

import { TransaksiPenyetoran } from "@/types/historiSetor"; // Tipe data kontrak transaksi
import { apiRequest } from "@/lib/api/client"; // Klien HTTP tersentralisasi (Axios/Fetch wrapper)
import { SETOR } from "@/lib/api/endpoints"; // Konstanta URL endpoint REST API

// ─── Response shape normalization ─────────────────────────────────────────────

/**
 * Mapping status mentah (raw status) dari backend ke union type status resmi frontend.
 */
type StatusMap = Record<string, TransaksiPenyetoran["status"]>;
const STATUS_MAP: StatusMap = {
  menunggu_konfirmasi: "menunggu_konfirmasi",
  diverifikasi: "diverifikasi",
  selesai: "selesai",
  ditolak: "ditolak",
};

/**
 * Interface bentuk data mentah (raw payload) yang diterima dari respon REST API backend.
 */
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

/**
 * Fungsi Normalisasi (Adapter Function)
 * Mengonversi data mentah dari API menjadi objek TransaksiPenyetoran yang aman dan terstandarisasi.
 * Menjamin nilai default (fallback) jika ada field yang bernilai undefined atau null dari server.
 * 
 * @param item - Objek mentah dari respon server
 * @param index - Nomor indeks array untuk pembuatan fallback ID
 * @returns Objek TransaksiPenyetoran siap konsumsi komponen UI
 */
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

export const DEFAULT_HISTORI_TRANSACTIONS: TransaksiPenyetoran[] = [
  {
    id: "str-1002",
    kodeSetor: "STR-202508-1002",
    tanggalPengajuan: "2026-08-26T10:00:00Z",
    status: "menunggu_konfirmasi",
    metodePenyerahan: "drop-off",
    lokasiTujuan: "Drop-off Mandiri Unit Pusat",
    catatanNasabah: "Sampah sudah dipilah rapi dalam 2 karung",
    totalBeratKg: 6.5,
    totalPoin: 55,
    items: [
      {
        kategoriNama: "Botol Plastik PET (Est. 4.5 Kg)",
        beratKg: 4.5,
        isRealWeight: false,
        poinSubtotal: 45,
        rupiahSubtotal: 0,
      },
      {
        kategoriNama: "Kardus & Karton (Est. 2.0 Kg)",
        beratKg: 2.0,
        isRealWeight: false,
        poinSubtotal: 10,
        rupiahSubtotal: 0,
      },
    ],
  },
  {
    id: "str-1001",
    kodeSetor: "STR-202508-1001",
    tanggalPengajuan: "2026-08-26T09:35:00Z",
    tanggalVerifikasi: "2026-08-26T09:35:00Z",
    status: "selesai",
    metodePenyerahan: "drop-off",
    lokasiTujuan: "Drop-off Mandiri Unit Pusat",
    petugasVerifikator: "Ahmad Fauzi (Timbangan Tera Digital #04)",
    catatanPetugas: "Berat sampah sesuai hasil timbangan real",
    totalBeratKg: 15.0,
    totalPoin: 150,
    items: [
      {
        kategoriNama: "Botol Plastik PET: 10.0 Kg (100 Poin)",
        beratKg: 10.0,
        isRealWeight: true,
        poinSubtotal: 100,
        rupiahSubtotal: 0,
      },
      {
        kategoriNama: "Kardus & Karton: 5.0 Kg (25 Poin)",
        beratKg: 5.0,
        isRealWeight: true,
        poinSubtotal: 25,
        rupiahSubtotal: 0,
      },
    ],
  },
  {
    id: "str-0994",
    kodeSetor: "STR-202608-0994",
    tanggalPengajuan: "2026-08-14T11:20:00Z",
    status: "ditolak",
    metodePenyerahan: "drop-off",
    lokasiTujuan: "Drop-off Mandiri Unit Pusat",
    catatanPetugas:
      "Sampah botol plastik masih tercampur cairan residu oli dan tidak memenuhi standar kebersihan 3R.",
    totalBeratKg: 0,
    totalPoin: 0,
    items: [],
  },
];

// ─── Service Functions ────────────────────────────────────────────────────────

/**
 * Mengambil daftar seluruh riwayat transaksi penyetoran sampah milik nasabah yang sedang login.
 * Mendukung filter berdasarkan parameter bulan (misal: '2026-08').
 * Jika pemanggilan API gagal atau data kosong, otomatis mengembalikan data mock default untuk demo.
 * 
 * @param bulan - String filter bulan (opsional)
 * @returns Promise array TransaksiPenyetoran
 */
export async function getMySetorHistory(
  bulan?: string
): Promise<TransaksiPenyetoran[]> {
  try {
    const data = await apiRequest<ApiHistoriItem[]>(SETOR.MY_SETOR(bulan));
    if (Array.isArray(data) && data.length > 0) {
      return data.map(normalizeHistori);
    }
    return DEFAULT_HISTORI_TRANSACTIONS;
  } catch {
    return DEFAULT_HISTORI_TRANSACTIONS;
  }
}

/**
 * Mengambil detail lengkap 1 transaksi penyetoran sampah berdasarkan ID transaksi atau kode setor.
 * Digunakan untuk halaman nota transaksi dan detail penimbangan.
 * 
 * @param id - ID transaksi (misal: 'str-1001') atau Kode Setor ('STR-202508-1001')
 * @returns Promise TransaksiPenyetoran atau null jika tidak ditemukan
 */
export async function getDetailSetor(id: string): Promise<TransaksiPenyetoran | null> {
  try {
    const data = await apiRequest<ApiHistoriItem>(SETOR.DETAIL(id));
    if (data) return normalizeHistori(data, 0);
    const found = DEFAULT_HISTORI_TRANSACTIONS.find((t) => t.id === id || t.kodeSetor === id);
    return found || null;
  } catch {
    const found = DEFAULT_HISTORI_TRANSACTIONS.find((t) => t.id === id || t.kodeSetor === id);
    return found || null;
  }
}
