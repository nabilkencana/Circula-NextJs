/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Tipe Data Admin Manajemen & Buku Induk Nasabah
 *
 * File: src/types/adminNasabah.ts
 * Deskripsi:
 * Mendefinisikan kontrak tipe data TypeScript untuk pengelolaan buku induk
 * data warga/nasabah penyetor sampah, status keaktifan akun, parameter penyaringan,
 * telemetri total partisipasi warga, serta payload mutasi pendaftaran & pembaruan profil.
 *
 * Standar Teknis UKK RPL:
 * - Strict typing untuk status keanggotaan nasabah ("aktif" | "nonaktif").
 * - Kontrak entitas buku induk nasabah (`NasabahRecord`) yang selaras dengan database backend.
 * - Skema statistik nasabah dan sirkulasi akumulasi poin per unit operasional.
 */

/**
 * Status operasional keanggotaan akun nasabah:
 * - "aktif": Nasabah aktif menyetor dan berhak menukarkan reward.
 * - "nonaktif": Akun dibekukan sementara atas permintaan atau evaluasi unit.
 */
export type StatusNasabah = "aktif" | "nonaktif";

/**
 * Entitas buku induk data lengkap nasabah penyetor bank sampah.
 */
export interface NasabahRecord {
  /** Identifier unik nasabah (format baku cth: "NSB-001") */
  id: string; // e.g. "NSB-001"
  /** Nama lengkap sesuai KTP / identitas resmi */
  namaLengkap: string;
  /** Username unik untuk otentikasi login nasabah */
  username: string; // e.g. "nasabah_budi"
  /** Nomor telepon / WhatsApp aktif */
  telp: string; // e.g. "085678901234"
  /** Alamat domisili lengkap tempat tinggal */
  alamat: string; // e.g. "Jl. Merdeka No. 12, RT 03/05"
  /** Saldo akumulasi poin reward yang siap ditukarkan */
  saldoPoin: number;
  /** Penanda boolean apakah akun baru saja didaftarkan */
  isNew?: boolean;
  /** Status keaktifan akun saat ini */
  status: StatusNasabah;
  /** Tanggal pendaftaran pertama nasabah (cth: "26 Agu 2026") */
  tanggalDaftar: string; // e.g. "26 Agu 2026"
  /** URL foto avatar profil nasabah */
  fotoProfilUrl?: string;
}

/**
 * Payload data untuk pendaftaran nasabah baru secara manual oleh administrator unit.
 */
export interface CreateNasabahPayload {
  /** Nama lengkap warga */
  namaLengkap: string;
  /** Username akun warga */
  username: string;
  /** Kata sandi awal (opsional jika dibuatkan default) */
  password?: string;
  /** Nomor kontak seluler / WhatsApp */
  telp: string;
  /** Alamat tempat tinggal */
  alamat: string;
  /** Status akun awal */
  status: StatusNasabah;
  /** Foto avatar yang dipilih */
  fotoProfilUrl?: string;
  /** Saldo poin pembuka (opsional) */
  saldoAwal?: number;
}

/**
 * Payload pembaruan data profil nasabah yang sudah terdaftar.
 */
export interface UpdateNasabahPayload extends Partial<CreateNasabahPayload> {
  /** Identifier unik nasabah yang diperbarui */
  id: string;
}

/**
 * Parameter filter dan paginasi buku induk data nasabah.
 */
export interface NasabahFilterState {
  /** Kata kunci pencarian nama, username, nomor telp, atau ID */
  searchQuery: string;
  /** Tab segmentasi filter (semua, saldo poin tinggi >100, atau baru) */
  filterTab: "semua" | "poin_tinggi" | "baru";
  /** Halaman aktif saat ini untuk paginasi data */
  currentPage: number;
}

/**
 * Metrik agregasi telemetri nasabah unit bank sampah.
 */
export interface NasabahStats {
  /** Total jumlah warga terdaftar di unit */
  totalNasabah: number;
  /** Total akumulasi seluruh poin beredar yang dimiliki nasabah */
  akumulasiPoin: number;
  /** Indikator sinkronisasi otomatis registrasi mandiri dari aplikasi warga */
  sinkronisasiOtomatis: boolean;
}
