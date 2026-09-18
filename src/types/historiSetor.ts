/**
 * @file historiSetor.ts
 * @description Deklarasi tipe data (Type Definitions) untuk modul Riwayat Penyetoran Sampah.
 * Menstandarisasi struktur data transaksi penimbangan, rincian sub-kategori sampah,
 * serta opsi filter pencarian nasabah.
 * 
 * Peran dalam UKK:
 * - Menunjukkan penggunaan TypeScript Static Typing yang ketat untuk mencegah runtime bugs.
 * - Menggunakan Union Types (`StatusPenyetoran`) untuk membatasi status hanya pada nilai yang valid.
 */

/**
 * Union Type: Status siklus hidup tiket penyetoran sampah
 * - 'menunggu_konfirmasi': Pengajuan baru, menunggu penyerahan fisik
 * - 'diverifikasi': Sampah sedang dalam proses penimbangan oleh petugas unit
 * - 'selesai': Penimbangan tervalidasi dan poin telah masuk ke saldo
 * - 'ditolak': Sampah tidak memenuhi standar 3R atau mengandung materi berbahaya
 */
export type StatusPenyetoran =
  | 'menunggu_konfirmasi'
  | 'diverifikasi'
  | 'selesai'
  | 'ditolak';

/**
 * Interface rincian sub-item sampah dalam 1 tiket penyetoran
 * @property kategoriNama - Nama jenis material (misal: "Botol Plastik PET", "Kardus")
 * @property beratKg - Berat dalam satuan Kilogram (Kg)
 * @property isRealWeight - Flag boolean: true jika timbangan riil petugas, false jika baru estimasi nasabah
 * @property poinSubtotal - Jumlah poin rewards yang diperoleh dari item ini
 * @property rupiahSubtotal - Konversi nilai rupiah (opsional)
 */
export interface ItemSetorDetail {
  kategoriNama: string;
  beratKg: number;
  isRealWeight?: boolean;
  poinSubtotal: number;
  rupiahSubtotal?: number;
}

/**
 * Interface entitas utama Transaksi Penyetoran Sampah
 * Digunakan pada kartu riwayat, nota transaksi digital, dan konsol verifikasi admin.
 */
export interface TransaksiPenyetoran {
  id: string; // ID unik internal (misal: "str-1002")
  kodeSetor: string; // Kode rujukan transaksi resmi (misal: "STR-202608-1002")
  tanggalPengajuan: string; // Waktu pengajuan tiket dalam format ISO String UTC
  tanggalVerifikasi?: string; // Waktu verifikasi penimbangan lapangan (jika sudah tervalidasi)
  status: StatusPenyetoran; // Status terkini tiket
  metodePenyerahan: 'drop-off' | 'jemput'; // Diserahkan sendiri ke loket atau dijemput armada
  lokasiTujuan: string; // Unit bank sampah tujuan
  catatanNasabah?: string; // Catatan khusus pemilahan dari nasabah
  catatanPetugas?: string; // Catatan hasil inspeksi dan penimbangan petugas
  petugasVerifikator?: string; // Nama petugas loket dan nomor timbangan tera digital
  totalBeratKg: number; // Total akumulasi berat seluruh item sampah
  totalPoin: number; // Total perolehan poin rewards Circula
  items: ItemSetorDetail[]; // Rincian item material yang disetor
}

/**
 * Interface state opsi filter toolbar pada halaman riwayat transaksi
 */
export interface HistoriFilterOptions {
  selectedStatus: 'semua' | StatusPenyetoran; // Filter status tiket
  selectedBulan: string; // Filter bulan (format: "YYYY-MM")
  searchQuery: string; // Kata kunci pencarian kode setor atau nama kategori
}
