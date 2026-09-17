import {
  UnitBankSampahDetail,
  UpdateUnitProfilPayload,
  UpdateUnitProfilResponse,
} from "@/types/adminProfil";
import { apiRequest } from "@/lib/api/client";
import { AUTH } from "@/lib/api/endpoints";

const STORAGE_KEY = "circula_admin_unit_profile_v1";

const EMPTY_PROFILE: UnitBankSampahDetail = {
  id: "",
  kodeUnit: "",
  namaUnit: "",
  namaPengelola: "",
  telp: "",
  alamatLengkap: "",
  jamOperasional: "",
  kapasitasGudang: "",
  appKey: "",
  statusOperasional: "nonaktif",
  totalNasabah: 0,
  nasabahBaruBulanIni: 0,
  akumulasiTonaseTon: 0,
  transaksiBulanIni: 0,
  rewardTerdistribusiPoin: 0,
  rewardTerdistribusiRupiah: 0,
  terakhirDisimpan: "",
};

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

  try {
    const data = await apiRequest<{ adminBank?: Partial<UnitBankSampahDetail> }>(
      AUTH.ME
    );
    if (data && data.adminBank) {
      const adminBank = data.adminBank;
      return {
        ...EMPTY_PROFILE,
        namaUnit: adminBank.namaUnit || EMPTY_PROFILE.namaUnit,
        namaPengelola: adminBank.namaPengelola || EMPTY_PROFILE.namaPengelola,
        telp: adminBank.telp || EMPTY_PROFILE.telp,
        alamatLengkap: adminBank.alamatLengkap || EMPTY_PROFILE.alamatLengkap,
      };
    }
  } catch (err) {
    console.warn(
      "[adminProfilService] Network unreachable. Unit profile unavailable:",
      err
    );
  }

  return EMPTY_PROFILE;
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
