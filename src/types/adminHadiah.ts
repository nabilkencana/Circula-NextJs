/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Tipe Data Admin Master Katalog Hadiah & Inventaris Reward
 *
 * File: src/types/adminHadiah.ts
 * Deskripsi:
 * Mendefinisikan kontrak tipe data TypeScript untuk pengelolaan master inventaris
 * barang reward (hadiah), kuota voucher, histori mutasi stok, telemetri poin,
 * serta status filter katalog pada panel konsol Administrator Bank Sampah.
 *
 * Standar Teknis UKK RPL:
 * - Strict typing untuk klasifikasi kategori barang reward.
 * - Kontrak payload mutasi (Create, Update) yang aman dan konsisten.
 * - Skema telemetri metrik stok dan sirkulasi peredaran poin nasabah.
 */

/**
 * Tipe kategori hadiah yang didukung sistem:
 * - "voucher": Pulsa telepon, token PLN, e-wallet, voucher belanja digital.
 * - "sembako": Minyak goreng, beras, gula pasir, tepung, telur, detergen.
 * - "merchandise": Tumbler ramah lingkungan, tas belanja daur ulang, payung, kaos.
 */
export type KategoriHadiah = "voucher" | "sembako" | "merchandise";

/**
 * Entitas master data item hadiah reward lengkap yang tersimpan pada sistem.
 */
export interface HadiahAdminRecord {
  /** Identifier unik item hadiah (UUID / hash unik) */
  id: string; // e.g. "8bd74595-3b91"
  /** Nama label produk atau voucher reward */
  namaHadiah: string;
  /** Klasifikasi kategori hadiah */
  kategori: KategoriHadiah;
  /** Deskripsi manfaat, spesifikasi, dan syarat penukaran */
  deskripsi: string;
  /** Nominal poin yang wajib dibayarkan/ditukarkan oleh nasabah */
  poinDibutuhkan: number;
  /** Kuantitas sisa stok fisik/digital yang tersedia di unit */
  stok: number;
  /** Satuan unit pengukuran stok fisik (cth: "Unit", "Pcs", "Sak", "Liter") */
  satuanStok: string;
  /** URL tautan gambar representasi produk hadiah */
  imageUrl: string;
}

/**
 * Payload pengiriman data saat administrator mendaftarkan item hadiah baru.
 */
export interface CreateHadiahPayload {
  /** Nama label produk atau voucher */
  namaHadiah: string;
  /** Klasifikasi kategori */
  kategori: KategoriHadiah;
  /** Deskripsi spesifikasi dan tata cara klaim */
  deskripsi: string;
  /** Biaya tebus dalam satuan poin */
  poinDibutuhkan: number;
  /** Kuantitas awal stok barang */
  stok: number;
  /** Satuan kuantitas stok */
  satuanStok: string;
  /** Opsional: URL gambar produk */
  imageUrl?: string;
}

/**
 * Payload pengiriman data saat administrator memperbarui informasi atau merestok hadiah.
 */
export interface UpdateHadiahPayload extends Partial<CreateHadiahPayload> {
  /** Identifier item hadiah yang diperbarui */
  id: string;
}

/**
 * State filter pencarian dan tab ketersediaan stok pada katalog hadiah admin.
 */
export interface HadiahFilterState {
  /** Kata kunci pencarian (nama hadiah, deskripsi, atau ID) */
  searchQuery: string;
  /** Tab kategori ketersediaan stok: semua, hanya stok tersedia, atau stok habis */
  filterTab: "semua" | "tersedia" | "habis";
}

/**
 * Ringkasan metrik statistik operasional inventaris hadiah di unit bank sampah.
 */
export interface HadiahTelemetryStats {
  /** Jumlah jenis item reward yang memiliki stok > 0 */
  totalTersedia: number;
  /** Total poin reward nasabah yang sedang aktif beredar di ekosistem */
  poinBeredar: number;
  /** Indikator aktifnya validasi kunci pencegahan klaim saat stok habis */
  kontrolStokRealtime: boolean;
}

/**
 * Entitas log mutasi pergerakan kuantitas stok (restok masuk atau klaim keluar).
 */
export interface RiwayatStokRecord {
  /** Identifier unik baris riwayat mutasi */
  id: string;
  /** Format tanggal terjadinya mutasi stok */
  tanggal: string;
  /** Nama item hadiah terkait */
  namaHadiah: string;
  /** Arah aliran barang: "masuk" (restok admin) atau "keluar" (klaim nasabah) */
  tipe: "masuk" | "keluar";
  /** Kuantitas perubahan stok */
  jumlah: number;
  /** Keterangan penyebab terjadinya mutasi stok */
  keterangan: string;
}
