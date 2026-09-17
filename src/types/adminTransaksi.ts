export type StatusSetor = "menunggu_konfirmasi" | "diverifikasi" | "selesai" | "ditolak";
export type StatusTkr = "diproses" | "selesai" | "dibatalkan";
export type TransaksiViewType = "STR" | "TKR";

export interface SampahItemRincian {
  kategoriSampahId?: string;
  namaKategori: string;
  berat: number; // in kg
  isReal?: boolean; // true if weighed by admin
  poinPerKg?: number;
}

export interface VerifySetorPayload {
  status: StatusSetor;
  catatanAdmin?: string;
  itemsReal?: {
    kategoriSampahId: string;
    beratKgReal: number;
  }[];
}

export interface TransaksiSetorAdminRecord {
  id: string; // e.g. "STR-202608-1002"
  kodeTransaksi: string;
  tanggalWaktu: string; // e.g. "26 Agu 2026, 10:00 WIB"
  nasabahNama: string;
  nasabahTelp: string;
  rincianSampah: SampahItemRincian[];
  totalBerat: number; // e.g. 6.5
  isRealWeight: boolean; // false if still (Estimasi)
  totalPoin: number; // e.g. 55 or 150
  nilaiRupiah?: number; // e.g. 45000 (optional display)
  isEstimatedReward: boolean; // true if Est. +55 Poin
  status: StatusSetor;
  catatanPetugas?: string;
}

export interface TransaksiTkrAdminRecord {
  id: string; // e.g. "TKR-202608-5001"
  kodePenukaran: string;
  tanggalWaktu: string; // e.g. "26 Agu 2026"
  nasabahNama: string;
  nasabahTelp?: string;
  itemHadiah: string; // e.g. "Voucher Pulsa / E-Wallet Rp 25.000"
  biayaPoin: number; // e.g. 75
  status: StatusTkr;
  waktuSelesai?: string;
}

export interface TransaksiFilterState {
  viewType: TransaksiViewType;
  statusFilter: string; // "semua" | "menunggu_konfirmasi" | "diverifikasi" | "selesai" | "ditolak"
  selectedBulan: string; // e.g. "Agustus 2026"
  searchQuery: string;
  currentPage: number;
}

export interface TransaksiTelemetryStats {
  setoranBulanIniCount: number;
  totalKgSampahBulanIni: number;
  klaimVoucherCount: number;
  klaimPersentaseValid: number;
  antreanVerifikasiCount: number;
}
