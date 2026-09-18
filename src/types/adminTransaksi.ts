/**
 * @file adminTransaksi.ts
 * @description Definisi tipe data TypeScript untuk modul Manajemen Transaksi Administrator Bank Sampah Circula.
 * Mengatur entitas transaksi penyetoran sampah (STR), klaim penukaran poin hadiah (TKR),
 * rincian hasil timbangan fisik, payload verifikasi loket, filter buku besar, serta ringkasan telemetri.
 * 
 * @module Types/AdminTransaksi
 */

/**
 * Status alur hidup transaksi penyetoran sampah (STR):
 * - `menunggu_konfirmasi`: Pengajuan baru dari nasabah yang belum ditimbang di loket.
 * - `diverifikasi`: Petugas telah menginput timbangan fisik aktual namun belum finalisasi.
 * - `selesai`: Transaksi disetujui, poin berhasil dikreditkan ke saldo rekening nasabah.
 * - `ditolak`: Pengajuan dibatalkan/ditolak karena material tidak memenuhi standar 3R.
 */
export type StatusSetor = "menunggu_konfirmasi" | "diverifikasi" | "selesai" | "ditolak";

/**
 * Status penyerahan voucher/hadiah penukaran poin (TKR):
 * - `diproses`: Pengajuan penukaran poin nasabah sedang disiapkan petugas unit.
 * - `selesai`: Hadiah/voucher telah diserahkan fisik atau ditransfer ke nasabah.
 * - `dibatalkan`: Klaim dibatalkan karena stok habis atau kendala operasional.
 */
export type StatusTkr = "diproses" | "selesai" | "dibatalkan";

/**
 * Mode tampilan tab buku besar transaksi admin:
 * - `STR`: Penyetoran Sampah Masuk.
 * - `TKR`: Penukaran Saldo Poin Hadiah.
 */
export type TransaksiViewType = "STR" | "TKR";

/**
 * Rincian timbangan per kategori sampah dalam satu transaksi penyetoran.
 * 
 * @interface SampahItemRincian
 * @property {string} [kategoriSampahId] - Identifier kategori sampah terdaftar.
 * @property {string} namaKategori - Label jenis sampah (misal: "Botol Plastik PET").
 * @property {number} berat - Berat material dalam satuan kilogram.
 * @property {boolean} [isReal] - Bernilai true jika angka berasal dari timbangan fisik petugas.
 * @property {number} [poinPerKg] - Rasio konversi poin per kilogram material.
 */
export interface SampahItemRincian {
  kategoriSampahId?: string;
  namaKategori: string;
  berat: number;
  isReal?: boolean;
  poinPerKg?: number;
}

/**
 * Muatan data (Payload) untuk verifikasi timbangan penyetoran oleh admin.
 * 
 * @interface VerifySetorPayload
 * @property {StatusSetor} status - Status baru hasil verifikasi (diverifikasi / selesai / ditolak).
 * @property {string} [catatanAdmin] - Catatan operasional petugas terkait kondisi sampah atau alasan penolakan.
 * @property {Array<{kategoriSampahId: string, beratKgReal: number}>} [itemsReal] - Rincian bobot fisik riil per kategori.
 */
export interface VerifySetorPayload {
  status: StatusSetor;
  catatanAdmin?: string;
  itemsReal?: {
    kategoriSampahId: string;
    beratKgReal: number;
  }[];
}

/**
 * Catatan lengkap transaksi penyetoran sampah untuk tabel administrasi.
 * 
 * @interface TransaksiSetorAdminRecord
 * @property {string} id - Identifier database transaksi.
 * @property {string} kodeTransaksi - Kode unik transaksi (misal: "STR-202608-1002").
 * @property {string} tanggalWaktu - Waktu pencatatan dalam format terbaca lokal.
 * @property {string} nasabahNama - Nama lengkap nasabah penyetor.
 * @property {string} nasabahTelp - Nomor telepon nasabah.
 * @property {SampahItemRincian[]} rincianSampah - Daftar rincian sampah yang disetor.
 * @property {number} totalBerat - Total berat keseluruhan sampah (kg).
 * @property {boolean} isRealWeight - True jika bobot telah ditimbang fisik, false jika masih estimasi.
 * @property {number} totalPoin - Akumulasi poin reward yang dihasilkan.
 * @property {number} [nilaiRupiah] - Konversi estimasi nilai nominal Rupiah (opsional).
 * @property {boolean} isEstimatedReward - Menandakan apakah poin masih bersifat estimasi awal.
 * @property {StatusSetor} status - Status transaksi saat ini.
 * @property {string} [catatanPetugas] - Catatan riwayat dari petugas loket.
 */
export interface TransaksiSetorAdminRecord {
  id: string;
  kodeTransaksi: string;
  tanggalWaktu: string;
  nasabahNama: string;
  nasabahTelp: string;
  rincianSampah: SampahItemRincian[];
  totalBerat: number;
  isRealWeight: boolean;
  totalPoin: number;
  nilaiRupiah?: number;
  isEstimatedReward: boolean;
  status: StatusSetor;
  catatanPetugas?: string;
}

/**
 * Catatan transaksi penukaran poin hadiah nasabah untuk tabel administrasi.
 * 
 * @interface TransaksiTkrAdminRecord
 * @property {string} id - Identifier transaksi penukaran.
 * @property {string} kodePenukaran - Kode unik penukaran (misal: "TKR-202608-5001").
 * @property {string} tanggalWaktu - Tanggal klaim penukaran diajukan nasabah.
 * @property {string} nasabahNama - Nama penerima hadiah/voucher.
 * @property {string} [nasabahTelp] - Kontak telepon penerima.
 * @property {string} itemHadiah - Nama produk reward yang diklaim.
 * @property {number} biayaPoin - Jumlah poin yang dipotong dari rekening nasabah.
 * @property {StatusTkr} status - Status pemrosesan voucher.
 * @property {string} [waktuSelesai] - Waktu penyelesaian serah terima hadiah.
 */
export interface TransaksiTkrAdminRecord {
  id: string;
  kodePenukaran: string;
  tanggalWaktu: string;
  nasabahNama: string;
  nasabahTelp?: string;
  itemHadiah: string;
  biayaPoin: number;
  status: StatusTkr;
  waktuSelesai?: string;
}

/**
 * State filter dan pagination untuk bilah pencarian buku transaksi admin.
 * 
 * @interface TransaksiFilterState
 * @property {TransaksiViewType} viewType - Tab aktif (STR atau TKR).
 * @property {string} statusFilter - Filter status ("semua", "menunggu_konfirmasi", dll).
 * @property {string} selectedBulan - Bulan operasional terpilih (misal: "Agustus 2026").
 * @property {string} searchQuery - Kata kunci pencarian nama atau kode transaksi.
 * @property {number} currentPage - Halaman aktif pagination saat ini.
 */
export interface TransaksiFilterState {
  viewType: TransaksiViewType;
  statusFilter: string;
  selectedBulan: string;
  searchQuery: string;
  currentPage: number;
}

/**
 * Statistik telemetri ringkas di bagian hero transaksi operasional.
 * 
 * @interface TransaksiTelemetryStats
 * @property {number} setoranBulanIniCount - Total transaksi penyetoran sampah bulan aktif.
 * @property {number} totalKgSampahBulanIni - Akumulasi kilogram material terpilah yang masuk.
 * @property {number} klaimVoucherCount - Jumlah voucher poin yang berhasil disalurkan.
 * @property {number} klaimPersentaseValid - Persentase voucher berstatus selesai dari total klaim.
 * @property {number} antreanVerifikasiCount - Jumlah antrean yang membutuhkan konfirmasi fisik timbangan.
 */
export interface TransaksiTelemetryStats {
  setoranBulanIniCount: number;
  totalKgSampahBulanIni: number;
  klaimVoucherCount: number;
  klaimPersentaseValid: number;
  antreanVerifikasiCount: number;
}
