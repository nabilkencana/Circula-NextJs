/**
 * @file client.ts
 * @description Klien API Terpusat (Centralized API Client) Circula untuk UKK RPL Paket A.
 * Mengimplementasikan pola pemanggilan `apiRequest<T>` dengan fitur unggulan:
 * - Injeksi otomatis header `x-app-key` multi-tenant (environment -> localStorage -> default).
 * - Injeksi otomatis header otorisasi `Authorization: Bearer <token>`.
 * - Penanganan galat terstruktur dari pesan backend dan batas waktu request (timeout).
 * - Pemantauan invalidasi sesi otomatis (401 / Token kedaluwarsa) dengan pembersihan memori
 *   serta penyiaran custom event `circula_auth_invalidated`.
 * 
 * @module Lib/API/Client
 */

/**
 * URL dasar server backend API Circula.
 */
export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://learn.smktelkom-mlg.sch.id/bank_sampah";

/**
 * Nilai kunci default tenant aplikasi untuk lingkungan pengujian UKK.
 */
export const DEFAULT_APP_KEY =
  process.env.NEXT_PUBLIC_DEFAULT_APP_KEY ||
  "1d99c078-9a3f-45e0-978e-8e0806338593";

// =============================================================================
// KUNCI PENYIMPANAN LOCALSTORAGE (SINGLE SOURCE OF TRUTH)
// =============================================================================
export const APP_KEY_STORAGE_KEY = "circula_app_key";
export const TOKEN_STORAGE_KEY = "circula_token";
export const USER_STORAGE_KEY = "circula_user";
export const ROLE_STORAGE_KEY = "circula_role";

// =============================================================================
// STRUKTUR DATA RESPON ENVELOPE RESMI BACKEND
// =============================================================================

/**
 * Tipe amplop respons baku API Circula
 * 
 * @interface ApiResponse
 * @template T - Tipe data muatan (payload) yang dikembalikan.
 */
export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  timestamp?: string;
}

// =============================================================================
// FUNGSI BANTU PENGELOLAAN KUNCI & SESI AUTENTIKASI
// =============================================================================

/**
 * Mengambil nilai `x-app-key` aktif dari environment, localStorage, atau fallback default.
 * 
 * @returns {string} String kunci aplikasi aktif.
 */
export function getAppKey(): string {
  if (process.env.NEXT_PUBLIC_DEFAULT_APP_KEY) {
    return process.env.NEXT_PUBLIC_DEFAULT_APP_KEY;
  }
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(APP_KEY_STORAGE_KEY);
    if (stored) return stored;
  }
  return DEFAULT_APP_KEY;
}

/**
 * Mengambil token otentikasi JWT yang tersimpan di localStorage.
 * 
 * @returns {string | null} String token JWT atau null jika belum login.
 */
export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  }
  return null;
}

/**
 * Menyimpan App Key baru ke penyimpanan lokal browser.
 * 
 * @param {string} key - String kunci aplikasi baru.
 */
export function saveAppKey(key: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(APP_KEY_STORAGE_KEY, key);
  }
}

/**
 * Memeriksa ketersediaan App Key yang valid.
 * 
 * @returns {boolean} True jika kunci terdefinisi.
 */
export function hasAppKey(): boolean {
  return !!getAppKey();
}

/**
 * Menghapus seluruh data sesi autentikasi dari localStorage (Logout / Token Invalid).
 */
export function clearAuth(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(ROLE_STORAGE_KEY);
  }
}

// =============================================================================
// FUNGSI INTI PERMINTAAN API (CORE REQUEST FUNCTION)
// =============================================================================

/**
 * Opsi tambahan untuk pemanggilan API
 * 
 * @interface ApiRequestOptions
 * @extends RequestInit
 * @property {number} [timeoutMs] - Batas waktu dalam milidetik sebelum dibatalkan (default: 25000ms).
 * @property {boolean} [silent] - Jika true, galat tidak dicetak ke console browser.
 */
export interface ApiRequestOptions extends RequestInit {
  timeoutMs?: number;
  silent?: boolean;
}

/**
 * Menjalankan request HTTP terautentikasi ke backend Circula dengan injeksi otomatis.
 * 
 * @async
 * @template T
 * @param {string} endpoint - Path endpoint API (misal: `/api/v1/auth/me`).
 * @param {ApiRequestOptions} [options={}] - Opsi konfigurasi fetch tambahan.
 * @returns {Promise<T>} Data payload yang diekstrak dari properti `data` pada respons JSON.
 * @throws {Error} Pesan kesalahan jika request gagal atau server merespons kode galat.
 */
export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { timeoutMs = 25000, silent = false, ...fetchOptions } = options;

  const token = getToken();
  const appKey = getAppKey();

  const headers = new Headers(fetchOptions.headers || {});

  // Injeksi header wajib x-app-key multi-tenant
  if (appKey) {
    headers.set("x-app-key", appKey);
  }

  // Injeksi header Authorization Bearer jika token tersedia
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Set default Content-Type JSON jika bukan muatan FormData
  if (!(fetchOptions.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // Kontrol pembatalan permintaan berdasarkan batas waktu (timeout)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    let resJson: any = {};
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      resJson = await response.json().catch(() => ({}));
    }

    // Evaluasi status respons HTTP dan indikator sukses backend
    if (!response.ok || !resJson.success) {
      const errorMsg =
        (Array.isArray(resJson.errors) && resJson.errors.length > 0
          ? resJson.errors.join(", ")
          : resJson.message) || `HTTP Error ${response.status}`;

      // Deteksi jika sesi login tidak valid / token kadaluarsa / user tidak ditemukan di backend
      const isAuthEndpoint =
        endpoint.includes("/auth/login") ||
        endpoint.includes("/auth/nasabah/register") ||
        endpoint.includes("/auth/admin/register");

      const isSessionInvalid =
        !isAuthEndpoint &&
        (response.status === 401 ||
          errorMsg.includes("User tidak ditemukan") ||
          errorMsg.includes("Token autentikasi tidak valid") ||
          errorMsg.includes("kadaluarsa") ||
          errorMsg.includes("Bearer token) tidak ditemukan"));

      // Jika sesi rusak/kedaluwarsa, bersihkan sesi dan siarkan event ke UI
      if (isSessionInvalid) {
        clearAuth();
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("circula_auth_invalidated"));
        }
      }

      throw new Error(errorMsg);
    }

    return resJson.data;
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    const msg =
      error instanceof Error
        ? error.name === "AbortError"
          ? "Request timeout — server tidak merespons."
          : error.message
        : "Network error";

    if (!silent) {
      console.error(
        `[API] ${fetchOptions.method ?? "GET"} ${endpoint}: ${msg}`
      );
    }
    throw new Error(msg);
  }
}

// =============================================================================
// PEMBUAT HEADER OTENTIKASI MANUAL (AUTH HEADER BUILDER)
// =============================================================================

/**
 * Membangun objek header mentah yang menyertakan token dan app key.
 * 
 * @param {Record<string, string>} [extra={}] - Header tambahan opsional.
 * @returns {Record<string, string>} Header lengkap dengan otentikasi.
 */
export function buildAuthHeaders(
  extra: Record<string, string> = {}
): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...extra,
  };
  const appKey = getAppKey();
  if (appKey) headers["x-app-key"] = appKey;
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

// =============================================================================
// ALIAS KOMPATIBILITAS RETROAKTIF (FETCH WITH AUTH)
// =============================================================================

/**
 * Pembungkus fetch legacy untuk kompatibilitas fungsi lama yang mengembalikan tuple status.
 * 
 * @template T
 * @param {string} url - URL lengkap atau endpoint.
 * @param {ApiRequestOptions} [options={}] - Opsi pemanggilan.
 * @returns {Promise<{ data: T | null; error: string | null; status: number | null; ok: boolean }>}
 */
export const fetchWithAuth = async <T>(
  url: string,
  options: ApiRequestOptions = {}
): Promise<{ data: T | null; error: string | null; status: number | null; ok: boolean }> => {
  // Buang prefix BASE_URL jika disertakan agar menjadi endpoint relatif
  const endpoint = url.startsWith(BASE_URL)
    ? url.slice(BASE_URL.length)
    : url.startsWith("http")
    ? url // Panggilan URL absolut eksternal
    : url;

  try {
    if (endpoint.startsWith("http")) {
      const { timeoutMs = 25000, ...fetchOptions } = options;
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), timeoutMs);
      const res = await fetch(endpoint, {
        ...fetchOptions,
        headers: buildAuthHeaders(fetchOptions.headers as Record<string, string>),
        signal: controller.signal,
      });
      clearTimeout(t);
      let data: T | null = null;
      const ct = res.headers.get("content-type") ?? "";
      if (ct.includes("application/json")) {
        try {
          const json = await res.json();
          data = (json?.data ?? json) as T;
        } catch { data = null; }
      }
      return { data, error: res.ok ? null : `HTTP ${res.status}`, status: res.status, ok: res.ok };
    }

    const data = await apiRequest<T>(endpoint, { silent: options.silent ?? true, ...options });
    return { data, error: null, status: 200, ok: true };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : "Error", status: null, ok: false };
  }
};
