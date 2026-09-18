/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Layanan Otentikasi Terpadu (Nasabah & Admin Multi-Role)
 *
 * File: src/services/authService.ts
 * Deskripsi:
 * Mengelola seluruh operasi otentikasi akun pengguna pada platform Circula:
 * registrasi akun nasabah warga (termasuk upload foto profil multipart/form-data),
 * proses login multi-role (NASABAH vs ADMIN), penyimpanan sesi token JWT dan role
 * pada LocalStorage browser, manajemen logout, pembacaan pengguna aktif,
 * serta inisialisasi App Key default sistem (seedAppKey).
 *
 * Standar Teknis UKK RPL:
 * - Dukungan payload multipart (FormData) untuk registrasi nasabah dengan foto profil.
 * - Manajemen token JWT dan state otentikasi browser terintegrasi dengan RouteGuard.
 * - Single Source of Truth untuk data sesi pengguna aktif (`getCurrentUser`, `logoutUser`).
 */

import {
  RegisterNasabahPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
  UserSessionData,
} from "@/types/auth";
import {
  fetchWithAuth,
  saveAppKey,
  clearAuth,
  getToken,
  TOKEN_STORAGE_KEY,
  USER_STORAGE_KEY,
  ROLE_STORAGE_KEY,
} from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Menghapus seluruh status otentikasi dan kredensial dari browser.
 */
export function logout(): void {
  clearAuth();
}

/**
 * Menyimpan data sesi otentikasi ke LocalStorage browser.
 *
 * @param token - Token otorisasi JWT dari server.
 * @param user - Objek sesi pengguna (id, username, role, namaLengkap).
 */
function storeSession(token: string, user: UserSessionData): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    localStorage.setItem(ROLE_STORAGE_KEY, user.role);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }
}

/**
 * Normalisasi format nomor kontak seluler / WhatsApp ke kode negara Indonesia (+62).
 *
 * @param raw - String nomor telepon mentah.
 * @returns Nomor telepon terstandarisasi diawali '62'.
 */
function normalizeWA(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.startsWith("0")) return `62${trimmed.slice(1)}`;
  if (!trimmed.startsWith("62")) return `62${trimmed}`;
  return trimmed;
}

// ─── Register ─────────────────────────────────────────────────────────────────

/**
 * Mendaftarkan akun nasabah baru ke sistem backend Circula.
 * Mendukung pengiriman multipart/form-data jika menyertakan foto profil fisik.
 *
 * @param payload - Data formulir pendaftaran nasabah.
 * @returns Promise berisi RegisterResponse.
 */
export async function registerNasabah(
  payload: RegisterNasabahPayload
): Promise<RegisterResponse> {
  const username = payload.username.trim().toLowerCase();
  const password = payload.password;
  const namaNasabah = payload.namaLengkap.trim();
  const telp = payload.nomorWhatsapp.trim();
  const alamat = payload.alamatLengkap.trim();

  let body: BodyInit;

  // Jika menyertakan file foto profil, gunakan multipart FormData
  if (payload.fotoProfil && payload.fotoProfil instanceof File) {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("namaNasabah", namaNasabah);
    formData.append("telp", telp);
    formData.append("alamat", alamat);
    formData.append("foto", payload.fotoProfil);
    body = formData;
  } else {
    body = JSON.stringify({
      username,
      password,
      namaNasabah,
      telp,
      alamat,
    });
  }

  const result = await fetchWithAuth<any>(
    ENDPOINTS.AUTH.REGISTER_NASABAH,
    { method: "POST", body, timeoutMs: 8000 }
  );

  if (result.ok && result.data) {
    const raw: any = result.data;
    const nasabahObj = raw.nasabah || {};
    const formattedData = {
      id: nasabahObj.id || raw.id || `nsb-${Date.now()}`,
      username: raw.username || username,
      namaLengkap: nasabahObj.namaNasabah || namaNasabah,
      role: "NASABAH" as const,
      createdAt: raw.createdAt || new Date().toISOString(),
    };

    if (raw.token) {
      storeSession(raw.token, {
        id: raw.id,
        username: raw.username || username,
        role: "NASABAH",
        namaLengkap: nasabahObj.namaNasabah || namaNasabah,
      });
    }

    return {
      success: true,
      message: raw.message || "Pendaftaran akun nasabah berhasil!",
      data: formattedData,
    };
  }

  // Laporkan galat dari server ke pengguna secara jelas
  throw new Error(
    result.error ||
      "Pendaftaran gagal. Periksa kembali data Anda atau hubungi administrator."
  );
}

// ─── Login ────────────────────────────────────────────────────────────────────

/**
 * Melakukan proses otentikasi login multi-role (Nasabah atau Admin).
 *
 * @param payload - Username dan password pengguna.
 * @returns Promise berisi LoginResponse lengkap dengan token dan data sesi.
 */
export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const body = {
    username: payload.username.trim().toLowerCase(),
    password: payload.password,
  };

  const result = await fetchWithAuth<any>(
    ENDPOINTS.AUTH.LOGIN,
    { method: "POST", body: JSON.stringify(body), timeoutMs: 25000 }
  );

  if (result.ok && result.data?.token) {
    const raw: any = result.data;
    const userSession: UserSessionData = {
      id: raw.id,
      username: raw.username,
      role: raw.role,
      namaLengkap: raw.nasabah?.namaNasabah || raw.adminBank?.namaPengelola || raw.username,
      adminBank: raw.adminBank
        ? {
            id: raw.adminBank.id,
            namaUnit: raw.adminBank.namaUnit,
            namaPengelola: raw.adminBank.namaPengelola,
            telp: raw.adminBank.telp,
          }
        : undefined,
    };

    // Selalu simpan sesi agar RouteGuard konsisten dengan state login
    storeSession(raw.token, userSession);

    return {
      success: true,
      message: raw.message || `Login ${raw.role} berhasil.`,
      data: { token: raw.token, user: userSession },
    };
  }

  throw new Error(
    result.error || "Login gagal. Periksa kembali username dan kata sandi Anda."
  );
}

// ─── Seed App Key ─────────────────────────────────────────────────────────────

/**
 * Melakukan inisialisasi App Key default ke database backend bila belum tersedia.
 *
 * @returns Promise boolean status keberhasilan seeding.
 */
export async function seedAppKey(): Promise<boolean> {
  const result = await fetchWithAuth(ENDPOINTS.AUTH.SEED, { method: "POST", timeoutMs: 8000 });
  if (result.ok) {
    const envKey = process.env.NEXT_PUBLIC_DEFAULT_APP_KEY || "1d99c078-9a3f-45e0-978e-8e0806338593";
    saveAppKey(envKey);
    return true;
  }
  return false;
}

// ─── Session Helpers ─────────────────────────────────────────────────────────

/**
 * Menghapus data sesi otentikasi login dari browser LocalStorage.
 */
export function logoutUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(ROLE_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
  }
}

/**
 * Mengambil data sesi pengguna yang sedang aktif login dari LocalStorage browser.
 *
 * @returns UserSessionData jika sesi aktif ditemukan, atau null jika belum login.
 */
export function getCurrentUser(): UserSessionData | null {
  if (typeof window !== "undefined") {
    const token = getToken();
    if (!token) return null;
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (raw) {
      try {
        return JSON.parse(raw) as UserSessionData;
      } catch {
        return null;
      }
    }
  }
  return null;
}
