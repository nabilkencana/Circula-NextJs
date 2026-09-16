export type StatusNasabah = "aktif" | "nonaktif";

export interface NasabahRecord {
  id: string; // e.g. "NSB-001"
  namaLengkap: string;
  username: string; // e.g. "nasabah_budi"
  telp: string; // e.g. "085678901234"
  alamat: string; // e.g. "Jl. Merdeka No. 12, RT 03/05"
  saldoPoin: number;
  isNew?: boolean;
  status: StatusNasabah;
  tanggalDaftar: string; // e.g. "26 Agu 2026"
  fotoProfilUrl?: string;
}

export interface CreateNasabahPayload {
  namaLengkap: string;
  username: string;
  password?: string;
  telp: string;
  alamat: string;
  status: StatusNasabah;
  fotoProfilUrl?: string;
  saldoAwal?: number;
}

export interface UpdateNasabahPayload extends Partial<CreateNasabahPayload> {
  id: string;
}

export interface NasabahFilterState {
  searchQuery: string;
  filterTab: "semua" | "poin_tinggi" | "baru";
  currentPage: number;
}

export interface NasabahStats {
  totalNasabah: number;
  akumulasiPoin: number;
  sinkronisasiOtomatis: boolean;
}
