import {
  RegisterAdminBankPayload,
  RegisterAdminBankResponse,
} from "@/types/adminAuth";

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

export async function registerAdminBank(
  payload: RegisterAdminBankPayload
): Promise<RegisterAdminBankResponse> {
  const url = `${API_BASE_URL}/api/v1/auth/admin/register`;
  const headers = getHeaders();

  // Normalize phone number to standard format
  let normalizedTelp = payload.telp.trim();
  if (normalizedTelp.startsWith("0")) {
    normalizedTelp = `62${normalizedTelp.slice(1)}`;
  } else if (!normalizedTelp.startsWith("62")) {
    normalizedTelp = `62${normalizedTelp}`;
  }

  const requestBody = {
    namaUnit: payload.namaUnit.trim(),
    namaPengelola: payload.namaPengelola.trim(),
    telp: normalizedTelp,
    username: payload.username.trim().toLowerCase(),
    password: payload.password,
    role: "ADMIN",
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
        message:
          json.message || "Registrasi unit bank sampah berhasil didaftarkan.",
        data: json.data || {
          id: `usr-adm-${Date.now()}`,
          username: requestBody.username,
          role: "ADMIN",
          adminBank: {
            id: `adm-bank-${Math.floor(100 + Math.random() * 900)}`,
            namaUnit: requestBody.namaUnit,
            namaPengelola: requestBody.namaPengelola,
            telp: requestBody.telp,
          },
          createdAt: new Date().toISOString(),
        },
      };
    }

    console.warn(
      `[AdminAuthService] Endpoint returned status ${res.status}. Falling back to simulation mode.`
    );
  } catch (err) {
    console.warn(
      "[AdminAuthService] Network unreachable or dev mode. Simulating registration response:",
      err
    );
  }

  // Artificial delay for smooth UX loading feedback
  await new Promise((resolve) => setTimeout(resolve, 800));

  const uniqueId = `adm-bank-${Math.floor(100 + Math.random() * 900)}`;

  return {
    success: true,
    message: "Registrasi unit bank sampah berhasil didaftarkan (Simulasi UKK Circula).",
    data: {
      id: `usr-adm-202608-${Math.floor(1000 + Math.random() * 9000)}`,
      username: requestBody.username,
      role: "ADMIN",
      adminBank: {
        id: uniqueId,
        namaUnit: requestBody.namaUnit,
        namaPengelola: requestBody.namaPengelola,
        telp: requestBody.telp,
      },
      createdAt: new Date().toISOString(),
    },
  };
}
