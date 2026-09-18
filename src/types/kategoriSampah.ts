/**
 * Klasifikasi 4 kategori utama jenis material sampah baku nasional:
 * - `plastik`: Botol PET, kresek bersih, galon, dsb.
 * - `kertas`: Kardus, koran, majalah, kertas duplex, dsb.
 * - `logam`: Kaleng aluminium, besi, tembaga, kuningan, seng, dsb.
 * - `kaca`: Botol kaca sirup/kecap, toples kaca utuh, beling terpilah.
 */
export type JenisSampah = 'plastik' | 'kertas' | 'logam' | 'kaca';

/**
 * Interface entitas kategori sampah daur ulang pada katalog dan loket timbang.
 */
export interface KategoriSampah {
  /** Identifier unik kategori sampah (UUID) */
  id: string;
  /** Nama lengkap material sampah (contoh: "Botol Plastik PET Bersih") */
  namaKategori: string;
  /** Klasifikasi jenis material anorganik */
  jenisSampah: JenisSampah;
  /** Deskripsi penjelasan jenis dan karakteristik sampah */
  deskripsi: string;
  /** Tarif harga beli per kilogram dari bank sampah kepada nasabah (Rp/kg) */
  hargaPerKg: number;
  /** Nilai konversi poin reward yang diberikan per kilogram (Poin/kg) */
  poinPerKg: number;
  /** URL citra gambar ilustrasi/foto material */
  imageUrl: string;
  /** Standar kelaikan kondisi fisik sampah saat disetorkan */
  syaratKondisi: string;
  /** Status ketersediaan penerimaan kategori sampah di loket unit */
  isActive: boolean;
}

/**
 * Interface keadaan filter pencarian dan pengurutan pada katalog sampah.
 */
export interface KatalogFilterState {
  /** Kata kunci pencarian nama atau deskripsi material */
  searchQuery: string;
  /** Filter jenis kategori terpilih ('semua' atau jenis spesifik) */
  selectedJenis: 'semua' | JenisSampah;
  /** Kriteria pengurutan daftar katalog */
  sortBy: 'nama' | 'harga-tertinggi' | 'poin-tertinggi';
}

/**
 * Interface hasil kalkulasi simulasi nilai setor sampah.
 */
export interface EstimasiReward {
  /** Berat estimasi sampah yang ditimbang (kg) */
  beratKg: number;
  /** Tarif harga beli per kilogram (Rp/kg) */
  hargaPerKg: number;
  /** Rasio poin reward per kilogram (Poin/kg) */
  poinPerKg: number;
  /** Total konversi rupiah yang akan diterima nasabah */
  totalRupiah: number;
  /** Total poin reward yang akan didapatkan nasabah */
  totalPoin: number;
}

