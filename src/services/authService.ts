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
  const username = payload.username.trim().toLowerCase();
  const password = payload.password;
  const namaNasabah = payload.namaLengkap.trim();
  const telp = payload.nomorWhatsapp.trim();
  const alamat = payload.alamatLengkap.trim();

  let body: BodyInit;

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
  };

  const result = await fetchWithAuth<any>(
    ENDPOINTS.AUTH.LOGIN,
    { method: "POST", body: JSON.stringify(body), timeoutMs: 8000 }
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

    if (payload.rememberMe) {
      storeSession(raw.token, userSession);
    }

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

export async function seedAppKey(): Promise<boolean> {
  const result = await fetchWithAuth(ENDPOINTS.AUTH.SEED, { method: "POST", timeoutMs: 8000 });
  if (result.ok) {
    // Save the env key as the verified working app key
    const envKey = process.env.NEXT_PUBLIC_DEFAULT_APP_KEY || "1d99c078-9a3f-45e0-978e-8e0806338593";
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
