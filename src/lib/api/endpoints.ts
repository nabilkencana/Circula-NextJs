/**
 * API Endpoints Registry — UKK RPL Paket A
 * All endpoint paths as functions/constants — no magic strings in services.
 */

// ─── Auth ────────────────────────────────────────────────────────────────────
export const AUTH = {
  LOGIN: "/api/v1/auth/login",
  REGISTER_NASABAH: "/api/v1/auth/nasabah/register",
  REGISTER_ADMIN: "/api/v1/auth/admin/register",
  ME: "/api/v1/auth/me",
  SEED: "/api/v1/seed",
} as const;

// ─── Kategori Sampah ─────────────────────────────────────────────────────────
export const KATEGORI = {
  LIST: "/api/v1/kategori-sampah",
  CREATE: "/api/v1/kategori-sampah",
  UPDATE: (id: string) => `/api/v1/kategori-sampah/${id}`,
  DELETE: (id: string) => `/api/v1/kategori-sampah/${id}`,
} as const;

// ─── Setor Sampah ────────────────────────────────────────────────────────────
export const SETOR = {
  PENGAJUAN: "/api/v1/setor-sampah/pengajuan",
  MY_SETOR: (bulan?: string) =>
    `/api/v1/setor-sampah/my-setor${bulan ? `?bulan=${bulan}` : ""}`,
  DETAIL: (id: string) => `/api/v1/setor-sampah/${id}`,
  NOTA: (id: string) => `/api/v1/setor-sampah/${id}`,
} as const;

// ─── Admin Setor Verifikasi ───────────────────────────────────────────────────
export const ADMIN_SETOR = {
  LIST: (params?: { status?: string; bulan?: string }) => {
    const q = new URLSearchParams();
    if (params?.status) q.set("status", params.status);
    if (params?.bulan) q.set("bulan", params.bulan);
    const qs = q.toString();
    return `/api/v1/setor-sampah/admin/list${qs ? `?${qs}` : ""}`;
  },
  VERIFY: (id: string) => `/api/v1/setor-sampah/admin/verify/${id}`,
  // Alias deprecated — backend hanya terima /admin/verify/
  VERIFIKASI: (id: string) => `/api/v1/setor-sampah/admin/verify/${id}`,
} as const;

// ─── Hadiah & Penukaran Poin ─────────────────────────────────────────────────
export const HADIAH = {
  LIST: "/api/v1/hadiah",
  CREATE: "/api/v1/hadiah",
  UPDATE: (id: string) => `/api/v1/hadiah/${id}`,
  DELETE: (id: string) => `/api/v1/hadiah/${id}`,
} as const;

export const PENUKARAN = {
  TUKAR: "/api/v1/penukaran-poin/tukar",
  MY_PENUKARAN: "/api/v1/penukaran-poin/my-penukaran",
  ADMIN_LIST: (bulan?: string) =>
    `/api/v1/penukaran-poin/admin/list${bulan ? `?bulan=${bulan}` : ""}`,
  ADMIN_STATUS: (id: string) => `/api/v1/penukaran-poin/admin/status/${id}`,
  NOTA: (id: string) => `/api/v1/penukaran-poin/nota/${id}`,
} as const;

// ─── Nasabah (Admin) ──────────────────────────────────────────────────────────
export const NASABAH = {
  LIST: "/api/v1/admin/nasabah",
  DETAIL: (id: string) => `/api/v1/admin/nasabah/${id}`,
} as const;

// ─── Dashboard & Laporan ──────────────────────────────────────────────────────
export const DASHBOARD = {
  SUMMARY: "/api/v1/dashboard/summary",
  STATS: "/api/v1/dashboard/stats",
} as const;

export const LAPORAN = {
  REKAPITULASI_BULANAN: (bulan: string) =>
    `/api/v1/rekapitulasi/bulanan?bulan=${bulan}`,
} as const;

// ─── Legacy compatibility (old ENDPOINTS object) ──────────────────────────────
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
