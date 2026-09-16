export type JenisSampah = 'plastik' | 'kertas' | 'logam' | 'kaca';

export interface KategoriSampah {
  id: string;
  namaKategori: string;
  jenisSampah: JenisSampah;
  deskripsi: string;
  hargaPerKg: number;
  poinPerKg: number;
  imageUrl: string;
  syaratKondisi: string;
  isActive: boolean;
}

export interface KatalogFilterState {
  searchQuery: string;
  selectedJenis: 'semua' | JenisSampah;
  sortBy: 'nama' | 'harga-tertinggi' | 'poin-tertinggi';
}

export interface EstimasiReward {
  beratKg: number;
  hargaPerKg: number;
  poinPerKg: number;
  totalRupiah: number;
  totalPoin: number;
}
