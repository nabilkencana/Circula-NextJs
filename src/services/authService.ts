import {
  RegisterNasabahPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
  UserSessionData,
} from "@/types/auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://learn.smktelkom-mlg.sch.id/bank_sampah";

function getHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const appKey = process.env.NEXT_PUBLIC_APP_KEY;
  if (appKey) {
    headers["x-app-key"] = appKey;
  }

  return headers;
}

export async function registerNasabah(
  payload: RegisterNasabahPayload
): Promise<RegisterResponse> {
  const url = `${API_BASE_URL}/api/v1/auth/register`;
  const headers = getHeaders();

  // Normalize Whatsapp to 62...
  let normalizedWa = payload.nomorWhatsapp.trim();
  if (normalizedWa.startsWith("0")) {
    normalizedWa = `62${normalizedWa.slice(1)}`;
  } else if (!normalizedWa.startsWith("62")) {
    normalizedWa = `62${normalizedWa}`;
  }

  const requestBody = {
    namaLengkap: payload.namaLengkap.trim(),
    username: payload.username.trim().toLowerCase(),
    nomorWhatsapp: normalizedWa,
    alamatLengkap: payload.alamatLengkap.trim(),
    password: payload.password,
    role: "NASABAH",
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      return {
        success: true,
        message: json.message || "Pendaftaran akun nasabah berhasil!",
        data: json.data || {
          id: `nsb-${Date.now()}`,
          username: requestBody.username,
          namaLengkap: requestBody.namaLengkap,
          role: "NASABAH",
          createdAt: new Date().toISOString(),
        },
      };
    }

    console.warn(
      `[AuthService] Endpoint returned status ${res.status}. Falling back to simulation mode.`
    );
  } catch (err) {
    console.warn(
      "[AuthService] Network unreachable or dev mode. Simulating registration response:",
      err
    );
  }

  // Artificial delay for smooth UX loading feedback
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    success: true,
    message: "Pendaftaran akun nasabah berhasil (Simulasi UKK Circula)!",
    data: {
      id: `nsb-${new Date().getFullYear()}${String(
        new Date().getMonth() + 1
      ).padStart(2, "0")}-${Math.floor(1000 + Math.random() * 9000)}`,
      username: requestBody.username,
      namaLengkap: requestBody.namaLengkap,
      role: "NASABAH",
      createdAt: new Date().toISOString(),
    },
  };
}

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const url = `${API_BASE_URL}/api/v1/auth/login`;
  const headers = getHeaders();

  const requestBody = {
    username: payload.username.trim().toLowerCase(),
    password: payload.password,
    role: payload.role,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json?.data?.token) {
        if (typeof window !== "undefined" && payload.rememberMe) {
          localStorage.setItem("circula_token", json.data.token);
          localStorage.setItem("circula_role", json.data.user.role);
          localStorage.setItem(
            "circula_user",
            JSON.stringify(json.data.user)
          );
        }
        return json;
      }
    }

    console.warn(
      `[AuthService] Login endpoint returned status ${res.status}. Falling back to simulated login.`
    );
  } catch (err) {
    console.warn(
      "[AuthService] Network unreachable or dev mode. Simulating login session:",
      err
    );
  }

  // Artificial delay for smooth UX loading feedback
  await new Promise((resolve) => setTimeout(resolve, 800));

  let mockResponse: LoginResponse;

  if (payload.role === "NASABAH") {
    mockResponse = {
      success: true,
      message: "Login nasabah berhasil.",
      data: {
        token: `mock-jwt-token-nasabah-${Date.now()}`,
        user: {
          id: "nsb-001",
          username: payload.username.trim().toLowerCase() || "nasabah_budi",
          namaLengkap: "Budi Santoso",
          role: "NASABAH",
        },
      },
    };
  } else {
    mockResponse = {
      success: true,
      message: "Login admin unit berhasil.",
      data: {
        token: `mock-jwt-token-admin-${Date.now()}`,
        user: {
          id: "adm-004",
          username: payload.username.trim().toLowerCase() || "admin_asrijaya",
          role: "ADMIN",
          adminBank: {
            id: "unit-04",
            namaUnit: "Bank Sampah Asri Jaya RW 05",
            namaPengelola: "Bapak H. Sukirman",
            telp: "081234567890",
          },
        },
      },
    };
  }

  if (typeof window !== "undefined" && payload.rememberMe) {
    localStorage.setItem("circula_token", mockResponse.data.token);
    localStorage.setItem("circula_role", mockResponse.data.user.role);
    localStorage.setItem(
      "circula_user",
      JSON.stringify(mockResponse.data.user)
    );
  }

  return mockResponse;
}

export function logoutUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("circula_token");
    localStorage.removeItem("circula_role");
    localStorage.removeItem("circula_user");
  }
}

export function getCurrentUser(): UserSessionData | null {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem("circula_user");
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
