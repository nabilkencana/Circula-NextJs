export type JenisSampah = "plastik" | "kertas" | "logam" | "kaca";

export interface KategoriSampahAdminRecord {
  id: string; // e.g. "cat-pet-01"
  materialCode: string; // e.g. "ID: 6b17c2cf..."
  namaKategori: string;
  jenisSampah: JenisSampah;
  deskripsi: string;
  hargaBeliPerKg: number;
  poinRewardPerKg: number;
  imageUrl: string;
  satuan: string; // default "kg"
}

export interface CreateKategoriPayload {
  namaKategori: string;
  jenisSampah: JenisSampah;
  deskripsi: string;
  hargaBeliPerKg: number;
  poinRewardPerKg: number;
  imageUrl?: string;
  satuan?: string;
}

export interface UpdateKategoriPayload extends Partial<CreateKategoriPayload> {
  id: string;
}

export interface KategoriFilterState {
  searchQuery: string;
  selectedJenis: "semua" | JenisSampah;
}

export interface KategoriTelemetryStats {
  totalMaterial: number;
  benchmarkRataRata: number;
  statusSinkron: boolean;
}
