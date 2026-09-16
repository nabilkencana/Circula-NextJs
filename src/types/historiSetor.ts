export type StatusPenyetoran =
  | 'menunggu_konfirmasi'
  | 'diverifikasi'
  | 'selesai'
  | 'ditolak';

export interface ItemSetorDetail {
  kategoriNama: string;
  beratKg: number;
  isRealWeight?: boolean;
  poinSubtotal: number;
  rupiahSubtotal?: number;
}

export interface TransaksiPenyetoran {
  id: string;
  kodeSetor: string; // e.g. "STR-202608-1002"
  tanggalPengajuan: string; // ISO string e.g. "2026-08-26T10:00:00Z"
  tanggalVerifikasi?: string;
  status: StatusPenyetoran;
  metodePenyerahan: 'drop-off' | 'jemput';
  lokasiTujuan: string;
  catatanNasabah?: string;
  catatanPetugas?: string;
  petugasVerifikator?: string;
  totalBeratKg: number;
  totalPoin: number;
  items: ItemSetorDetail[];
}

export interface HistoriFilterOptions {
  selectedStatus: 'semua' | StatusPenyetoran;
  selectedBulan: string; // Format: "YYYY-MM"
  searchQuery: string;
}
