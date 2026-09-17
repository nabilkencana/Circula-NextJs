import {
  RegisterAdminBankPayload,
  RegisterAdminBankResponse,
} from "@/types/adminAuth";
import { fetchWithAuth } from "@/lib/api/client";
import { AUTH } from "@/lib/api/endpoints";

export async function registerAdminBank(
  payload: RegisterAdminBankPayload
): Promise<RegisterAdminBankResponse> {
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

  const result = await fetchWithAuth<RegisterAdminBankResponse["data"]>(
    AUTH.REGISTER_ADMIN,
    {
      method: "POST",
      body: JSON.stringify(requestBody),
      timeoutMs: 8000,
    }
  );

  if (result.ok && result.data) {
    return {
      success: true,
      message: "Registrasi unit bank sampah berhasil didaftarkan.",
      data: result.data,
    };
  }

  throw new Error(
    result.error ||
      "Pendaftaran admin unit gagal. Periksa data kembali atau hubungi administrator."
  );
}

