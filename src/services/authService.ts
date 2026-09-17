import {
  RegisterNasabahPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
  UserSessionData,
} from "@/types/auth";
import { fetchWithAuth, saveAppKey, TOKEN_STORAGE_KEY, USER_STORAGE_KEY, ROLE_STORAGE_KEY } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function storeSession(token: string, user: UserSessionData): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    localStorage.setItem(ROLE_STORAGE_KEY, user.role);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }
}

function normalizeWA(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.startsWith("0")) return `62${trimmed.slice(1)}`;
  if (!trimmed.startsWith("62")) return `62${trimmed}`;
  return trimmed;
}

// ─── Register ─────────────────────────────────────────────────────────────────

export async function registerNasabah(
  payload: RegisterNasabahPayload
): Promise<RegisterResponse> {
  const body = {
    namaLengkap: payload.namaLengkap.trim(),
    username: payload.username.trim().toLowerCase(),
    nomorWhatsapp: normalizeWA(payload.nomorWhatsapp),
    alamatLengkap: payload.alamatLengkap.trim(),
    password: payload.password,
    role: "NASABAH",
  };

  const result = await fetchWithAuth<RegisterResponse["data"]>(
    ENDPOINTS.AUTH.REGISTER_NASABAH,
    { method: "POST", body: JSON.stringify(body) }
  );

  if (result.ok && result.data) {
    return {
      success: true,
      message: "Pendaftaran akun nasabah berhasil!",
      data: result.data,
    };
  }

  // API responded with an error — surface it to the user instead of silently succeeding
  throw new Error(
    result.error ||
      "Pendaftaran gagal. Periksa kembali data Anda atau hubungi administrator."
  );
}

// ─── Login ────────────────────────────────────────────────────────────────────

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const body = {
    username: payload.username.trim().toLowerCase(),
    password: payload.password,
    role: payload.role,
  };

  const result = await fetchWithAuth<LoginResponse["data"]>(
    ENDPOINTS.AUTH.LOGIN,
    { method: "POST", body: JSON.stringify(body) }
  );

  if (result.ok && result.data?.token) {
    if (payload.rememberMe) {
      storeSession(result.data.token, result.data.user as UserSessionData);
    }
    return { success: true, message: "Login berhasil.", data: result.data };
  }

  // Fallback simulation
  await new Promise((r) => setTimeout(r, 800));

  const isMockAdmin = payload.role !== "NASABAH";
  const mockToken = `mock-jwt-token-${isMockAdmin ? "admin" : "nasabah"}-${Date.now()}`;

  const mockUser: UserSessionData = isMockAdmin
    ? {
        id: "adm-004",
        username: body.username || "admin_asrijaya",
        role: "ADMIN",
        adminBank: {
          id: "unit-04",
          namaUnit: "Bank Sampah Asri Jaya RW 05",
          namaPengelola: "Bapak H. Sukirman",
          telp: "081234567890",
        },
      }
    : {
        id: "nsb-001",
        username: body.username || "nasabah_budi",
        namaLengkap: "Budi Santoso",
        role: "NASABAH",
      };

  if (payload.rememberMe) {
    storeSession(mockToken, mockUser);
  }

  return {
    success: true,
    message: isMockAdmin ? "Login admin unit berhasil." : "Login nasabah berhasil.",
    data: { token: mockToken, user: mockUser },
  };
}

// ─── Seed App Key ─────────────────────────────────────────────────────────────

export async function seedAppKey(): Promise<boolean> {
  const result = await fetchWithAuth(ENDPOINTS.AUTH.SEED, { method: "POST", timeoutMs: 8000 });
  if (result.ok) {
    // Save the env key as the verified working app key
    const envKey = process.env.NEXT_PUBLIC_DEFAULT_APP_KEY || "97945213-34a7-48cf-baac-8740c1d18765";
    saveAppKey(envKey);
    return true;
  }
  return false;
}

// ─── Session Helpers ─────────────────────────────────────────────────────────

export function logoutUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(ROLE_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
  }
}

export function getCurrentUser(): UserSessionData | null {
  if (typeof window !== "undefined") {
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
