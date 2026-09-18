/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Tipe Data Admin Laporan & Rekapitulasi Ekologis Bulanan
 *
 * File: src/types/adminLaporan.ts
 * Deskripsi:
 * Mendefinisikan kontrak tipe data TypeScript untuk rekapitulasi operasional berkala,
 * mencakup total volume sampah terpilah, konversi tonase metrik, perkiraan pembayaran kas,
 * sirkulasi poin reward nasabah, breakdown jenis material (plastik, kertas, logam, kaca),
 * serta tanda tangan digital kepatuhan audit regulasi lingkungan (ISO 14001:2015).
 *
 * Standar Teknis UKK RPL:
 * - Klasifikasi jenis material limbah baku sirkular (`JenisSampahKey`).
 * - Skema komprehensif respon data rekapitulasi bulanan (`RekapitulasiBulananResponse`).
 * - Standardisasi data keterlacakan audit digital compliance untuk pelaporan dinas.
 */

/**
 * Kunci klasifikasi 4 kategori sampah utama yang didaur ulang:
 * - "plastik": Botol PET, jerigen, cup plastik, kresek bersih.
 * - "kertas": Kardus, karton, arsip HVS, buku tulis bekas.
 * - "logam": Kaleng aluminium, besi scrap, tembaga kupas.
 * - "kaca": Botol kecap, sirup, jar selai bening/berwarna utuh.
 */
export type JenisSampahKey = "plastik" | "kertas" | "logam" | "kaca";

/**
 * Rincian data tonase, valuasi, dan reward per jenis material sampah.
 */
export interface BreakdownMaterialItem {
  /** Kunci jenis kategori */
  kategoriKey: JenisSampahKey;
  /** Label badge visual (cth: "PLASTIK") */
  badgeLabel: string; // e.g. "PLASTIK"
  /** Sub-label penjelas spesifikasi mutu material */
  subLabel: string; // e.g. "Botol PET, Cup, Jerigen Bersih (Grade A & B)"
  /** Berat bersih dalam kilogram */
  tonaseKg: number;
  /** Konversi berat dalam satuan metrik Ton */
  tonaseTon: number;
  /** Estimasi nilai kompensasi tunai rupiah */
  valuasiRupiah: number;
  /** Nominal poin reward yang diterbitkan untuk kategori ini */
  rewardPoin: number;
  /** Rasio persentase volume terhadap total keseluruhan */
  persentaseTotal: number; // e.g. 52.0
  /** Kode heksadesimal warna untuk visual progress bar */
  colorHex: string; // e.g. "#3B82F6"
}

/**
 * Struktur kontrak data respon rekapitulasi operasional bulanan bank sampah.
 */
export interface RekapitulasiBulananResponse {
  /** Nilai periode dalam format tahun-bulan (cth: "2026-08") */
  periodeBulan: string; // e.g. "2026-08"
  /** Label terbaca manusia untuk nama bulan dan tahun (cth: "Agustus 2026") */
  periodeLabel: string; // e.g. "Agustus 2026"
  /** Metrik total volume sampah yang berhasil diselamatkan dari TPA */
  totalVolume: {
    totalKg: number;
    totalTon: number;
    growthPercentage: number;
    comparedToMonth: string;
  };
  /** Metrik keuangan pengeluaran kas unit operasional */
  pembayaranKas: {
    totalRupiah: number;
    rataRataTransaksiRupiah: number;
  };
  /** Metrik peredaran insentif poin reward dan penukaran */
  sirkulasiReward: {
    totalPoinDiterbitkan: number;
    totalPoinTerpakai: number;
    totalKlaimVoucherSelesai: number;
  };
  /** Daftar rincian tonase untuk masing-masing kategori material */
  breakdownMaterials: BreakdownMaterialItem[];
  /** Informasi kepatuhan audit dan pengesahan digital */
  compliance: {
    isoStandard: string;
    dinasTujuan: string;
    penanggungJawab: string;
    signatureVerified: boolean;
  };
}
