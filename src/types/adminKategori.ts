/**
 * @file adminKategori.ts
 * @description Deklarasi tipe data TypeScript untuk modul Manajemen Kategori Sampah Administrator Circula.
 * Mendefinisikan kelompok jenis sampah (plastik, kertas, logam, kaca), catatan master kategori,
 * muatan payload penambahan/pembaruan tarif harga dan nilai poin, filter pencarian, serta statistik telemetri.
 * 
 * @module Types/AdminKategori
 */

/**
 * 4 Pilar klasifikasi material sampah daur ulang terpadu:
 * - `plastik`: PET, HDPE, PP, kantong plastik/kresek.
 * - `kertas`: Kardus box cokelat, koran, kertas HVS arsip, majalah.
 * - `logam`: Kaleng aluminium, besi scrap, tembaga, kuningan.
 * - `kaca`: Botol kaca bening, beling kecap/sirup, toples.
 */
export type JenisSampah = "plastik" | "kertas" | "logam" | "kaca";

/**
 * Catatan data kategori material sampah terdaftar pada katalog admin.
 * 
 * @interface KategoriSampahAdminRecord
 * @property {string} id - Identifier unik kategori (misal: "cat-pet-01").
 * @property {string} materialCode - Kode acuan material untuk penimbangan (misal: "ID: 6b17c2cf...").
 * @property {string} namaKategori - Nama resmi jenis sampah (misal: "Botol Plastik PET").
 * @property {JenisSampah} jenisSampah - Kelompok klasifikasi 3R.
 * @property {string} deskripsi - Panduan standar mutu fisik & kebersihan material.
 * @property {number} hargaBeliPerKg - Tarif harga beli tunai per kilogram (Rupiah).
 * @property {number} poinRewardPerKg - Rasio perolehan poin kompensasi per kilogram.
 * @property {string} imageUrl - URL gambar representatif contoh fisik material.
 * @property {string} satuan - Satuan berat yang berlaku (standar: "kg").
 */
export interface KategoriSampahAdminRecord {
  id: string;
  materialCode: string;
  namaKategori: string;
  jenisSampah: JenisSampah;
  deskripsi: string;
  hargaBeliPerKg: number;
  poinRewardPerKg: number;
  imageUrl: string;
  satuan: string;
}

/**
 * Muatan data (Payload) untuk penambahan kategori sampah baru.
 * 
 * @interface CreateKategoriPayload
 * @property {string} namaKategori - Nama jenis material yang akan ditambahkan.
 * @property {JenisSampah} jenisSampah - Kelompok jenis sampah.
 * @property {string} deskripsi - Petunjuk standar pemilahan fisik.
 * @property {number} hargaBeliPerKg - Nilai tukar tunai (Rupiah/kg).
 * @property {number} poinRewardPerKg - Nilai insentif reward (Poin/kg).
 * @property {string} [imageUrl] - Tautan URL foto sampel material (opsional).
 * @property {string} [satuan] - Satuan metrik penimbangan (default: "kg").
 */
export interface CreateKategoriPayload {
  namaKategori: string;
  jenisSampah: JenisSampah;
  deskripsi: string;
  hargaBeliPerKg: number;
  poinRewardPerKg: number;
  imageUrl?: string;
  satuan?: string;
}

/**
 * Muatan data (Payload) untuk pembaruan data kategori sampah yang telah ada.
 * 
 * @interface UpdateKategoriPayload
 * @extends Partial<CreateKategoriPayload>
 * @property {string} id - Identifier unik kategori yang akan diperbarui.
 */
export interface UpdateKategoriPayload extends Partial<CreateKategoriPayload> {
  id: string;
}

/**
 * State filter pencarian dan seleksi kategori pada toolbar admin.
 * 
 * @interface KategoriFilterState
 * @property {string} searchQuery - Kata kunci pencarian nama atau deskripsi.
 * @property {"semua" | JenisSampah} selectedJenis - Tab jenis material yang sedang aktif.
 */
export interface KategoriFilterState {
  searchQuery: string;
  selectedJenis: "semua" | JenisSampah;
}

/**
 * Ringkasan statistik telemetri pada spanduk hero kategori.
 * 
 * @interface KategoriTelemetryStats
 * @property {number} totalMaterial - Jumlah total varian material yang aktif di unit.
 * @property {number} benchmarkRataRata - Nilai rata-rata harga beli material per kilogram (Rupiah).
 * @property {boolean} statusSinkron - Indikator apakah ledger tersinkronisasi live dengan server backend.
 */
export interface KategoriTelemetryStats {
  totalMaterial: number;
  benchmarkRataRata: number;
  statusSinkron: boolean;
}
