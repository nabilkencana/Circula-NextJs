/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Tipe Data Registrasi & Otentikasi Admin Unit Bank Sampah
 *
 * File: src/types/adminAuth.ts
 * Deskripsi:
 * Mendefinisikan kontrak tipe data TypeScript untuk payload formulir pendaftaran
 * administrator unit bank sampah baru serta struktur respons otentikasi dari backend API.
 *
 * Standar Teknis UKK RPL:
 * - Kontrak payload registrasi admin unit (`RegisterAdminBankPayload`).
 * - Kontrak respons sukses pendaftaran terpadu (`RegisterAdminBankResponse`).
 * - Skema relasi data unit bank sampah dan role hak akses "ADMIN".
 */

/**
 * Data formulir yang dikirimkan saat administrator mendaftarkan unit bank sampah baru.
 */
export interface RegisterAdminBankPayload {
  /** Nama resmi unit bank sampah (cth: "Bank Sampah Asri Jaya RW 05") */
  namaUnit: string;
  /** Nama lengkap penanggung jawab / pengelola fasilitas */
  namaPengelola: string;
  /** Nomor kontak seluler / WhatsApp aktif pengelola */
  telp: string;
  /** Username unik untuk akun kredensial login admin */
  username: string;
  /** Kata sandi otentikasi (minimal 6 karakter) */
  password: string;
  /** Konfirmasi pencocokan kata sandi */
  confirmPassword: string;
  /** Pernyataan persetujuan terhadap kepatuhan SOP dan kalibrasi timbangan */
  setujuKetentuan: boolean;
}

/**
 * Format struktur respons dari server setelah registrasi admin unit berhasil.
 */
export interface RegisterAdminBankResponse {
  /** Status keberhasilan operasi */
  success: boolean;
  /** Pesan notifikasi dari server */
  message: string;
  /** Objek data akun admin dan unit yang baru terbentuk */
  data?: {
    id: string;
    username: string;
    role: 'ADMIN';
    adminBank: {
      id: string;
      namaUnit: string;
      namaPengelola: string;
      telp: string;
    };
    token?: string;
    createdAt: string;
  };
}
