export type KategoriHadiah = "voucher" | "sembako" | "merchandise";

export interface HadiahAdminRecord {
  id: string; // e.g. "8bd74595-3b91"
  namaHadiah: string;
  kategori: KategoriHadiah;
  deskripsi: string;
  poinDibutuhkan: number;
  stok: number;
  satuanStok: string; // e.g. "Unit", "Pcs", "Sak"
  imageUrl: string;
}

export interface CreateHadiahPayload {
  namaHadiah: string;
  kategori: KategoriHadiah;
  deskripsi: string;
  poinDibutuhkan: number;
  stok: number;
  satuanStok: string;
  imageUrl?: string;
}

export interface UpdateHadiahPayload extends Partial<CreateHadiahPayload> {
  id: string;
}

export interface HadiahFilterState {
  searchQuery: string;
  filterTab: "semua" | "tersedia" | "habis";
}

export interface HadiahTelemetryStats {
  totalTersedia: number;
  poinBeredar: number;
  kontrolStokRealtime: boolean;
}

export interface RiwayatStokRecord {
  id: string;
  tanggal: string;
  namaHadiah: string;
  tipe: "masuk" | "keluar";
  jumlah: number;
  keterangan: string;
}
