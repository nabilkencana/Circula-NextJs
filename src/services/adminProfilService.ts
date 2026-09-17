import {
  UnitBankSampahDetail,
  UpdateUnitProfilPayload,
  UpdateUnitProfilResponse,
} from "@/types/adminProfil";
import { apiRequest, buildAuthHeaders, BASE_URL } from "@/lib/api/client";

const STORAGE_KEY = "circula_admin_unit_profile_v1";

const INITIAL_MOCK_PROFILE: UnitBankSampahDetail = {
  id: "unit-04",
  kodeUnit: "UNIT-04",
  namaUnit: "Bank Sampah Asri Jaya RW 05",
  namaPengelola: "Bapak H. Sukirman",
  telp: "81234567890",
  alamatLengkap:
    "Balai RW 05, Jl. Merdeka No. 10, Kel. Sukun, Kec. Sukun, Kota Malang, Jawa Timur 65147",
  jamOperasional: "Sabtu & Minggu (08:00 - 15:00 WIB)",
  kapasitasGudang: "Maks. 5 Ton / Periode",
  appKey: "97945213-34a7-48cf-baac-8740c1d18765",
  statusOperasional: "aktif",
  totalNasabah: 142,
  nasabahBaruBulanIni: 12,
  akumulasiTonaseTon: 12.5,
  transaksiBulanIni: 38,
  rewardTerdistribusiPoin: 4250,
  rewardTerdistribusiRupiah: 1487500,
  terakhirDisimpan: "Hari ini, 09:12 WIB",
};

function getHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const appKey = process.env.NEXT_PUBLIC_APP_KEY || INITIAL_MOCK_PROFILE.appKey;
  if (appKey) {
    headers["x-app-key"] = appKey;
  }

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("circula_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
}

export async function getUnitProfil(): Promise<UnitBankSampahDetail> {
  // Check local storage persistence first
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("[adminProfilService] Failed to read from localStorage:", e);
    }
  }

  const url = `${BASE_URL}/api/v1/auth/me`;
  const headers = getHeaders();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(url, {
      method: "GET",
      headers,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.adminBank) {
        const adminBank = json.data.adminBank;
        return {
          ...INITIAL_MOCK_PROFILE,
          namaUnit: adminBank.namaUnit || INITIAL_MOCK_PROFILE.namaUnit,
          namaPengelola: adminBank.namaPengelola || INITIAL_MOCK_PROFILE.namaPengelola,
          telp: adminBank.telp || INITIAL_MOCK_PROFILE.telp,
          alamatLengkap: adminBank.alamatLengkap || INITIAL_MOCK_PROFILE.alamatLengkap,
        };
      }
    }
  } catch (err) {
    console.warn(
      "[adminProfilService] Network unreachable or dev mode. Simulating unit data:",
      err
    );
  }

  return INITIAL_MOCK_PROFILE;
}

export async function updateUnitProfil(
  payload: UpdateUnitProfilPayload
): Promise<UpdateUnitProfilResponse> {
  const current = await getUnitProfil();

  // Create formatted timestamp
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const timeFormatted = `Hari ini, ${hours}:${minutes} WIB`;

  const updated: UnitBankSampahDetail = {
    ...current,
    namaUnit: payload.namaUnit.trim(),
    namaPengelola: payload.namaPengelola.trim(),
    telp: payload.telp.trim(),
    alamatLengkap: payload.alamatLengkap.trim(),
    jamOperasional: payload.jamOperasional.trim(),
    kapasitasGudang: payload.kapasitasGudang.trim(),
    terakhirDisimpan: timeFormatted,
  };

  // Artificial delay for smooth UX
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Persist locally
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("[adminProfilService] Failed to write to localStorage:", e);
    }
  }

  return {
    success: true,
    message: "Pembaruan profil unit berhasil disimpan.",
    data: updated,
  };
}
