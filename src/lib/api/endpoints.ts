/**
 * @file endpoints.ts
 * @description Pendaftaran Endpoint API Terpusat (API Endpoints Registry) Circula untuk UKK RPL Paket A.
 * Mengelompokkan seluruh rute URL RESTful backend sebagai konstanta dan fungsi pembangun URL bertipe kuat.
 * Mencegah duplikasi string rute acak (magic strings) pada layer service.
 * 
 * @module Lib/API/Endpoints
 */

// =============================================================================
// MODUL AUTENTIKASI & SETUP (AUTH & SEED)
// =============================================================================
export const AUTH = {
  /** Masuk akun multi-peran (Nasabah & Admin Unit) */
  LOGIN: "/api/v1/auth/login",
  /** Registrasi akun warga/nasabah baru */
  REGISTER_NASABAH: "/api/v1/auth/nasabah/register",
  /** Registrasi unit operasional bank sampah admin baru */
  REGISTER_ADMIN: "/api/v1/auth/admin/register",
  /** Mendapatkan data profil akun yang sedang login */
  ME: "/api/v1/auth/me",
  /** Endpoint auto-seeding data pengujian UKK */
  SEED: "/api/v1/seed",
} as const;

// =============================================================================
// MODUL KATEGORI & TARIF SAMPAH
// =============================================================================
export const KATEGORI = {
  /** Daftar seluruh kategori sampah terpilah */
  LIST: "/api/v1/kategori-sampah",
  /** Tambah kategori sampah baru (Admin) */
  CREATE: "/api/v1/kategori-sampah",
  /** Ubah data tarif/poin kategori sampah (Admin) */
  UPDATE: (id: string) => `/api/v1/kategori-sampah/${id}`,
  /** Hapus kategori sampah (Admin) */
  DELETE: (id: string) => `/api/v1/kategori-sampah/${id}`,
} as const;

// =============================================================================
// MODUL PENGAJUAN SETOR SAMPAH (NASABAH)
// =============================================================================
export const SETOR = {
  /** Pengajuan setoran sampah baru (Antar Sendiri atau Jemput Armada) */
  PENGAJUAN: "/api/v1/setor-sampah/pengajuan",
  /** Riwayat seluruh transaksi penyetoran nasabah yang login */
  MY_SETOR: (bulan?: string) =>
    `/api/v1/setor-sampah/my-setor${bulan ? `?bulan=${bulan}` : ""}`,
  /** Rincian transaksi penyetoran sampah */
  DETAIL: (id: string) => `/api/v1/setor-sampah/${id}`,
  /** Nota/struk digital transaksi penyetoran sampah */
  NOTA: (id: string) => `/api/v1/setor-sampah/${id}`,
} as const;

// =============================================================================
// MODUL VERIFIKASI OPERASIONAL TIMBANGAN (ADMIN UNIT)
// =============================================================================
export const ADMIN_SETOR = {
  /** Daftar antrean penyetoran warga dengan filter status atau bulan */
  LIST: (params?: { status?: string; bulan?: string }) => {
    const q = new URLSearchParams();
    if (params?.status) q.set("status", params.status);
    if (params?.bulan) q.set("bulan", params.bulan);
    const qs = q.toString();
    return `/api/v1/setor-sampah/admin/list${qs ? `?${qs}` : ""}`;
  },
  /** Verifikasi penimbangan fisik dan approval pencairan poin */
  VERIFY: (id: string) => `/api/v1/setor-sampah/admin/verify/${id}`,
  /** Alias verifikasi untuk kompatibilitas retroaktif */
  VERIFIKASI: (id: string) => `/api/v1/setor-sampah/admin/verify/${id}`,
} as const;

// =============================================================================
// MODUL HADIAH & PENUKARAN POIN (REWARD & REDEMPTION)
// =============================================================================
export const HADIAH = {
  /** Daftar katalog produk hadiah sembako/voucher yang tersedia */
  LIST: "/api/v1/hadiah",
  /** Tambah item hadiah reward baru (Admin) */
  CREATE: "/api/v1/hadiah",
  /** Perbarui stok atau harga poin hadiah (Admin) */
  UPDATE: (id: string) => `/api/v1/hadiah/${id}`,
  /** Hapus item hadiah dari katalog (Admin) */
  DELETE: (id: string) => `/api/v1/hadiah/${id}`,
} as const;

export const PENUKARAN = {
  /** Penukaran saldo poin nasabah menjadi hadiah fisik/voucher */
  TUKAR: "/api/v1/penukaran-poin/tukar",
  /** Riwayat klaim penukaran poin nasabah yang login */
  MY_PENUKARAN: "/api/v1/penukaran-poin/my-penukaran",
  /** Daftar penukaran poin seluruh warga untuk verifikasi admin unit */
  ADMIN_LIST: (bulan?: string) =>
    `/api/v1/penukaran-poin/admin/list${bulan ? `?bulan=${bulan}` : ""}`,
  /** Pembaruan status penyerahan hadiah (DISETUJUI / DITOLAK / SELESAI) */
  ADMIN_STATUS: (id: string) => `/api/v1/penukaran-poin/admin/status/${id}`,
  /** Nota struk penukaran poin digital */
  NOTA: (id: string) => `/api/v1/penukaran-poin/nota/${id}`,
} as const;

// =============================================================================
// MODUL DATA NASABAH (ADMIN UNIT)
// =============================================================================
export const NASABAH = {
  /** Buku tabungan dan daftar nasabah warga terdaftar di unit */
  LIST: "/api/v1/admin/nasabah",
  /** Detail profil, saldo, dan riwayat transaksi nasabah perorangan */
  DETAIL: (id: string) => `/api/v1/admin/nasabah/${id}`,
} as const;

// =============================================================================
// MODUL DASHBOARD ANALITIK & LAPORAN REKAPITULASI
// =============================================================================
export const DASHBOARD = {
  /** Ringkasan total tonase, nasabah aktif, dan saldo poin unit */
  SUMMARY: "/api/v1/dashboard/summary",
  /** Data statistik grafik tren penerimaan sampah harian/bulanan */
  STATS: "/api/v1/dashboard/stats",
} as const;

export const LAPORAN = {
  /** Rekapitulasi bulanan tonase sampah dan estimasi nilai konversi ekonomi */
  REKAPITULASI_BULANAN: (bulan: string) =>
    `/api/v1/rekapitulasi/bulanan?bulan=${bulan}`,
} as const;

// =============================================================================
// OBJEK GABUNGAN KOMPATIBILITAS RETROAKTIF (LEGACY ENDPOINTS)
// =============================================================================
export const ENDPOINTS = {
  AUTH,
  KATEGORI,
  SETOR: {
    ...SETOR,
    PENGAJUAN: SETOR.PENGAJUAN,
    LIST: ADMIN_SETOR.LIST,
    NOTA: SETOR.NOTA,
    DETAIL: SETOR.DETAIL,
  },
  ADMIN_SETOR,
  HADIAH,
  TUKAR_POIN: {
    LIST: HADIAH.LIST,
    NOTA: PENUKARAN.NOTA,
  },
  NASABAH,
  LAPORAN,
  DASHBOARD,
  PENUKARAN,
} as const;
