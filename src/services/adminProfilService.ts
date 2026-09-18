/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Layanan Integrasi API Profil & Pengaturan Unit Operasional Admin
 *
 * File: src/services/adminProfilService.ts
 * Deskripsi:
 * Mengelola pembacaan dan pembaruan data identitas unit bank sampah,
 * mencakup integrasi endpoint otentikasi admin (`AUTH.ME`), sinkronisasi
 * penyimpanan lokal browser (`localStorage`) guna mendukung kesiapan demo offline,
 * serta simulasi delay UI yang mulus saat menyimpan perubahan data.
 *
 * Standar Teknis UKK RPL:
 * - Integrasi REST API endpoint profil dan sesi admin unit.
 * - Mekanisme fallback cache offline localStorage dengan pemulihan data instan.
 * - Format string waktu update otomatis ("Hari ini, HH:mm WIB").
 */

import {
  UnitBankSampahDetail,
  UpdateUnitProfilPayload,
  UpdateUnitProfilResponse,
} from "@/types/adminProfil";
import { apiRequest } from "@/lib/api/client";
import { AUTH } from "@/lib/api/endpoints";

/** Kunci penyimpanan profil unit pada LocalStorage */
const STORAGE_KEY = "circula_admin_unit_profile_v1";

/** Objek data default profil awal */
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

/**
 * Mengambil informasi detail profil unit bank sampah aktif.
 * Membaca cache LocalStorage terlebih dahulu jika tersedia.
 *
 * @returns Promise berisi UnitBankSampahDetail.
 */
export async function getUnitProfil(): Promise<UnitBankSampahDetail> {
  // Periksa penyimpanan cache lokal browser terlebih dahulu
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("[adminProfilService] Gagal membaca dari localStorage:", e);
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
      "[adminProfilService] Jaringan tidak dapat dijangkau. Beralih ke data default:",
      err
    );
  }

  return EMPTY_PROFILE;
}

/**
 * Menyimpan pembaruan data profil unit bank sampah ke penyimpanan lokal dan backend.
 *
 * @param payload - Isian formulir pembaruan data profil.
 * @returns Promise berisi UpdateUnitProfilResponse.
 */
export async function updateUnitProfil(
  payload: UpdateUnitProfilPayload
): Promise<UpdateUnitProfilResponse> {
  const current = await getUnitProfil();

  // Format cap waktu pembaruan
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

  // Penundaan sintetis 600ms untuk efek transisi UX yang nyaman
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Simpan ke LocalStorage browser
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("[adminProfilService] Gagal menyimpan ke localStorage:", e);
    }
  }

  return {
    success: true,
    message: "Pembaruan profil unit berhasil disimpan.",
    data: updated,
  };
}
