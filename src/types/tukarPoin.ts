/**
 * ============================================================================
 * Type Definitions: Modul Penukaran Poin (Reward Redemption)
 * Direktori: src/types/tukarPoin.ts
 *
 * Fungsi Utama:
 * Mendefinisikan struktur data TypeScript untuk seluruh alur katalog hadiah:
 * 1. KategoriHadiah: Segmentasi jenis barang hadiah (sembako, voucher digital, pulsa/listrik, merchandise eco, donasi).
 * 2. HadiahItem: Entitas detail item barang hadiah beserta stok, tarif poin, dan gambar.
 * 3. TukarPoinPayload: Objek payload kirim saat nasabah menukarkan poin.
 * 4. TukarPoinResponse: Struktur respons backend saat penukaran berhasil dibuat (tiket nota).
 * 5. SaldoNasabahSummary: Rekapitulasi agregat saldo poin aktif, riwayat konversi rupiah, dan transaksi terakhir.
 * ============================================================================
 */

/**
 * Kategori Hadiah: Opsi filter dan klasifikasi varian hadiah katalog
 */
export type KategoriHadiah = 'semua' | 'sembako' | 'voucher' | 'pulsa' | 'merchandise' | 'donasi';

/**
 * Interface HadiahItem:
 * Representasi entitas barang hadiah yang tersedia di katalog penukaran.
 */
export interface HadiahItem {
  /** ID unik hadiah */
  id: string;
  /** Nama produk hadiah (contoh: "Beras Premium Slyp Super 5 Kg") */
  namaHadiah: string;
  /** Kategori produk untuk penyaringan tab */
  kategori: 'voucher' | 'sembako' | 'merchandise' | 'pulsa' | 'donasi';
  /** Deskripsi lengkap spesifikasi atau manfaat hadiah */
  deskripsi: string;
  /** Jumlah poin reward Circula yang dibutuhkan untuk menukar */
  poinDibutuhkan: number;
  /** Jumlah sisa stok fisik/digital yang tersedia */
  stok: number;
  /** URL gambar produk */
  imageUrl: string;
  /** Nama mitra penyedia voucher/barang (opsional) */
  mitraMerchant?: string;
  /** Satuan hitung produk (pack, pouch, voucher, pcs, token) */
  satuan: string;
  /** Label badge promosi (misal: "TERLARIS", "FAVORIT", "INSTANT DIGITAL") */
  badge?: string;
  /** Label kategori yang ditampilkan di UI */
  categoryLabel?: string;
  /** Nilai ekuivalen nominal rupiah (misal: "Setara Rp 52.500") */
  nilaiRupiahText?: string;
  /** Informasi ketersediaan loket pengambilan atau metode pengiriman */
  lokasiInfo?: string;
  /** Penanda khusus apakah item merupakan program donasi kemanusiaan */
  isDonasi?: boolean;
}

/**
 * Interface TukarPoinPayload:
 * Parameter pengiriman saat nasabah melakukan penukaran poin.
 */
export interface TukarPoinPayload {
  /** ID item hadiah yang dipilih untuk ditukar */
  hadiahId: string;
}

/**
 * Interface TukarPoinResponse:
 * Respons terstruktur dari backend setelah transaksi penukaran diproses.
 */
export interface TukarPoinResponse {
  /** Status keberhasilan operasi */
  success: boolean;
  /** Pesan notifikasi dari sistem */
  message: string;
  /** Data nota klaim penukaran */
  data: {
    /** ID transaksi penukaran */
    id: string;
    /** Kode resmi nota penukaran (contoh: "TKR-202608-5001") */
    kodeNota: string;
    /** Tanggal transaksi penukaran */
    tanggal: string;
    /** ID hadiah yang ditukarkan */
    hadiahId: string;
    /** Nama hadiah yang ditukarkan */
    namaHadiah: string;
    /** Jumlah poin yang didebit dari saldo nasabah */
    poinTerpakai: number;
    /** Sisa saldo poin nasabah setelah transaksi selesai */
    sisaPoin: number;
    /** Status pemrosesan penukaran */
    status: 'diproses' | 'selesai';
    /** Kode voucher digital atau token klaim kasir (jika hadiah digital) */
    kodeKlaimMerchant?: string;
  };
}

/**
 * Interface SaldoNasabahSummary:
 * Rekapitulasi menyeluruh metrik akun, saldo tabungan sampah, dan riwayat mutasi nasabah.
 */
export interface SaldoNasabahSummary {
  /** Saldo poin reward saat ini */
  saldoPoinSaatIni: number;
  /** Saldo poin aktif yang dapat langsung dibelanjakan/ditukar */
  saldoPoinAktif: number;
  /** Total berat sampah yang pernah disetorkan (kg) */
  totalSampahDisetorKg?: number;
  /** Total poin reward yang pernah dikumpulkan sejak awal bergabung */
  totalPoinDidapat?: number;
  /** Total poin reward yang telah dibelanjakan untuk penukaran hadiah */
  totalPoinDitukar?: number;
  /** Nilai estimasi konversi saldo ke dalam mata uang Rupiah */
  nilaiKonversiRupiah?: number;
  /** Poin yang telah digunakan dalam periode bulan berjalan */
  poinTerpakaiBulanIni?: number;
  /** Total banyaknya transaksi penyetoran yang berstatus selesai */
  totalTransaksiSelesai?: number;
  /** Informasi ringkas transaksi penyetoran fisik terakhir */
  transaksiTerakhirSetor?: {
    kodeSetor: string;
    tanggal: string;
    beratKg: number;
    poin: number;
    status: string;
  };
  /** Informasi ringkas transaksi penukaran hadiah terakhir */
  transaksiTerakhirTukar?: {
    kodePenukaran: string;
    tanggal: string;
    hadiah: string;
    poin: number;
    status: string;
  };
}
