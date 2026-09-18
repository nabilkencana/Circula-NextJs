/**
 * @file adminDashboard.ts
 * @description Deklarasi tipe data TypeScript untuk modul Dashboard Operasional Administrator Bank Sampah Circula.
 * Mendefinisikan struktur data antrean verifikasi timbangan fisik, ringkasan indikator kinerja utama (KPI),
 * persentase komposisi jenis material limbah terpilah, dan data telemetri keseluruhan panel kontrol.
 * 
 * @module Types/AdminDashboard
 */

/**
 * Representasi catatan tiket antrean penyetoran sampah yang menunggu penimbangan di loket unit.
 * 
 * @interface QueueItemRecord
 * @property {string} id - Identifier unik record antrean (misal: "str-1002").
 * @property {string} kodeTransaksi - Kode transaksi penyetoran terdaftar (misal: "STR-202608-1002").
 * @property {string} waktuPengajuan - Tanggal dan jam pendaftaran transaksi oleh nasabah.
 * @property {string} nasabahNama - Nama lengkap warga pemilik setoran.
 * @property {string} nasabahTelp - Nomor telepon aktif nasabah untuk koordinasi.
 * @property {string} rincianEstimasi - Ringkasan estimasi kategori sampah dan perkiraan bobot (kg).
 * @property {number} estimasiPoin - Estimasi perolehan poin yang akan dikonversi setelah diverifikasi.
 */
export interface QueueItemRecord {
  id: string;
  kodeTransaksi: string;
  waktuPengajuan: string;
  nasabahNama: string;
  nasabahTelp: string;
  rincianEstimasi: string;
  estimasiPoin: number;
}

/**
 * Ringkasan indikator kinerja utama (KPI) operasional bank sampah unit pada periode berjalan.
 * 
 * @interface DashboardKpiSummary
 * @property {number} totalNasabah - Jumlah total warga/nasabah terdaftar di unit bank sampah.
 * @property {number} nasabahBaruBulanIni - Penambahan nasabah baru dalam bulan aktif berjalan.
 * @property {number} tonaseBulanIniTon - Total bobot material sampah terpilah yang masuk (satuan Ton).
 * @property {number} tonaseGrowthVsBulanLalu - Persentase pertumbuhan volume limbah dibanding bulan sebelumnya.
 * @property {number} valuasiKasRupiah - Estimasi valuasi nilai perputaran kas ekonomi sirkular (Rupiah).
 * @property {number} poinAktifBeredar - Akumulasi saldo poin reward nasabah yang belum dicairkan.
 */
export interface DashboardKpiSummary {
  totalNasabah: number;
  nasabahBaruBulanIni: number;
  tonaseBulanIniTon: number;
  tonaseGrowthVsBulanLalu: number;
  valuasiKasRupiah: number;
  poinAktifBeredar: number;
}

/**
 * Data statistik komposisi material sampah yang berhasil dikumpulkan per kategori.
 * 
 * @interface CompositionMaterialStat
 * @property {string} kategoriLabel - Nama label kelompok material (misal: "Plastik (PET & Jerigen)").
 * @property {number} beratKg - Berat riil material yang terkumpul dalam satuan kilogram.
 * @property {number} persentase - Persentase porsi material dari total keseluruhan sampah masuk (0-100%).
 * @property {string} barColorHex - Kode warna visual diagram progres (hexadecimal).
 */
export interface CompositionMaterialStat {
  kategoriLabel: string;
  beratKg: number;
  persentase: number;
  barColorHex: string;
}

/**
 * Struktur data telemetri lengkap untuk modul Dashboard Admin Circula.
 * 
 * @interface DashboardTelemetryData
 * @property {string} unitNama - Nama resmi unit bank sampah yang sedang aktif beroperasi.
 * @property {string} unitKode - Kode registrasi unik unit bank sampah (misal: "UNIT-01").
 * @property {number} antreanCount - Jumlah tiket penyetoran yang sedang menunggu proses verifikasi.
 * @property {number} totalTonaseMasukKg - Total akumulasi berat sampah masuk dalam satuan kilogram.
 * @property {DashboardKpiSummary} kpi - Objek ringkasan metrik performa operasional.
 * @property {QueueItemRecord[]} queueList - Daftar tiket antrean penyetoran aktif hari ini.
 * @property {CompositionMaterialStat[]} composition - Rincian distribusi material sampah terkumpul.
 * @property {string} scaleDeviceId - Identifier perangkat keras timbangan digital yang terkalibrasi.
 */
export interface DashboardTelemetryData {
  unitNama: string;
  unitKode: string;
  antreanCount: number;
  totalTonaseMasukKg: number;
  kpi: DashboardKpiSummary;
  queueList: QueueItemRecord[];
  composition: CompositionMaterialStat[];
  scaleDeviceId: string;
}
