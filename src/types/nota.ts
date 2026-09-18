/**
 * Tipe klasifikasi jenis nota transaksi dalam sistem Circula:
 * - `setor`: Struk resmi hasil verifikasi penimbangan sampah anorganik di loket unit.
 * - `tukar`: Bukti klaim resmi penukaran saldo poin menjadi voucher/produk hadiah.
 */
export type TipeNota = 'setor' | 'tukar';

/**
 * Interface item rincian material sampah pada nota penyetoran.
 */
export interface ItemNotaSetor {
  /** Kode unik SKU material (contoh: "SMP-001") */
  sku: string;
  /** Nama lengkap jenis material terpilah */
  materialNama: string;
  /** Kategori material baku nasional */
  kategori: 'plastik' | 'kertas' | 'logam' | 'kaca';
  /** Bobot aktual hasil timbangan digital petugas di loket (kg) */
  timbanganRealKg: number;
  /** Rasio perolehan poin per kilogram material */
  poinPerKg: number;
  /** Akumulasi poin untuk baris item material ini (berat * rasio poin) */
  subtotalPoin: number;
}

/**
 * Interface data lengkap struk nota penyetoran sampah resmi (STR).
 */
export interface NotaSetorDetail {
  /** Diskriminator tipe nota penyetoran */
  tipe: 'setor';
  /** Kode unik transaksi penyetoran (contoh: "STR-202608-1001") */
  kodeTransaksi: string;
  /** Waktu verifikasi penimbangan oleh loket dalam format terformat atau ISO string */
  waktuVerifikasi: string;
  /** Nama unit bank sampah pelaksana transaksi */
  namaUnit: string;
  /** Identifier unik cabang unit bank sampah */
  unitId: string;
  /** Nama lengkap nasabah penyetor */
  namaNasabah: string;
  /** Nomor telepon kontak nasabah terdaftar */
  noTelepon: string;
  /** Array daftar rincian material sampah yang disetorkan */
  items: ItemNotaSetor[];
  /** Akumulasi seluruh bobot timbangan sampah aktual (kg) */
  totalBeratKg: number;
  /** Estimasi nilai konversi kas rupiah yang diperoleh nasabah */
  estimasiNilaiRupiah: number;
  /** Saldo poin nasabah sebelum transaksi penimbangan dicatat */
  saldoSebelumTransaksi: number;
  /** Total poin reward baru yang diterbitkan pada transaksi ini */
  totalPoinDiterbitkan: number;
  /** Saldo poin akhir nasabah setelah penambahan poin transaksi */
  totalSaldoAkhir: number;
  /** Nama atau peran petugas loket operasional yang melakukan penimbangan */
  petugasPenimbang: string;
  /** Catatan kondisi fisik sampah dari petugas loket */
  catatanPetugas: string;
  /** Kode hash tanda tangan digital untuk verifikasi integritas struk */
  digitalSignatureHash: string;
  /** Status finalisasi transaksi */
  status: 'selesai';
}

/**
 * Interface data lengkap struk nota penukaran poin hadiah resmi (TKR).
 */
export interface NotaTukarDetail {
  /** Diskriminator tipe nota penukaran hadiah */
  tipe: 'tukar';
  /** Kode unik transaksi penukaran poin (contoh: "TKR-202608-5001") */
  kodeTransaksi: string;
  /** Waktu transaksi penukaran poin dicatat ke sistem */
  waktuTransaksi: string;
  /** Nama lengkap nasabah pengklaim hadiah */
  namaNasabah: string;
  /** Nama produk atau voucher hadiah yang ditukarkan */
  itemDitukar: string;
  /** Jumlah pemotongan poin untuk menebus hadiah tersebut */
  poinTerpakai: number;
  /** Sisa saldo poin nasabah setelah pemotongan transaksi klaim */
  sisaSaldoPoin: number;
  /** Kode voucher digital resmi untuk diklaim ke pihak merchant rekanan */
  merchantClaimCode: string;
  /** Status penyelesaian klaim hadiah */
  status: 'selesai';
}

