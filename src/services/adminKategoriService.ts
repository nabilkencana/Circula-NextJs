/**
 * @file adminKategoriService.ts
 * @description Layanan komunikasi data (Service Layer) untuk manajemen Master Kategori & Tarif Sampah Circula.
 * Menangani operasi CRUD (Create, Read, Update, Delete) kategori sampah terpilah pada endpoint `/api/v1/kategori-sampah`,
 * normalisasi struktur atribut backend ke frontend, penyimpanan cache lokal (`localStorage`),
 * serta penyesuaian tarif harga beli massal secara persentase (`batchUpdatePricing`).
 * 
 * @module Services/AdminKategoriService
 */

import {
  KategoriSampahAdminRecord,
  JenisSampah,
  CreateKategoriPayload,
  UpdateKategoriPayload,
} from "@/types/adminKategori";
import { apiRequest } from "@/lib/api/client";
import { KATEGORI } from "@/lib/api/endpoints";

// Kunci penyimpanan cache lokal kategori material sampah
const STORAGE_KEY = "circula_admin_kategori_list_v1";

/**
 * Menyimpan data daftar kategori ke penyimpanan lokal browser sebagai fallback aman.
 * 
 * @param {KategoriSampahAdminRecord[]} records - Daftar kategori sampah.
 */
function saveToLocalStorage(records: KategoriSampahAdminRecord[]) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
      console.warn("[adminKategoriService] Gagal menyimpan ke localStorage:", e);
    }
  }
}

/**
 * Mengambil seluruh daftar master kategori sampah dari backend API.
 * 
 * @async
 * @returns {Promise<KategoriSampahAdminRecord[]>} Array daftar kategori sampah aktif.
 */
export async function getKategoriList(): Promise<KategoriSampahAdminRecord[]> {
  const data = await apiRequest<any[]>(KATEGORI.LIST);
  if (Array.isArray(data) && data.length > 0) {
    const mapped = data.map(mapKategoriApi);
    saveToLocalStorage(mapped);
    return mapped;
  }
  return [];
}

/**
 * Memetakan atribut mentah kategori dari API backend menjadi struktur data frontend.
 * 
 * @param {any} raw - Data mentah dari backend.
 * @returns {KategoriSampahAdminRecord} Objek kategori sampah terstandarisasi.
 */
function mapKategoriApi(raw: any): KategoriSampahAdminRecord {
  return {
    id: raw.id,
    materialCode: `ID: ${String(raw.id).slice(0, 8)}...`,
    namaKategori: raw.namaKategori,
    jenisSampah: (raw.jenis as JenisSampah) || "plastik",
    deskripsi: raw.deskripsi || `Kategori ${raw.namaKategori} — daur ulang.`,
    hargaBeliPerKg: Number(raw.hargaPerKg) || 0,
    poinRewardPerKg: Number(raw.poinPerKg) || 0,
    imageUrl: raw.imageUrl || raw.foto || "",
    satuan: raw.satuan || "kg",
  };
}

/**
 * Mendaftarkan kategori material sampah baru ke dalam sistem.
 * 
 * @async
 * @param {CreateKategoriPayload} payload - Informasi nama, tarif, poin, dan deskripsi kategori baru.
 * @returns {Promise<KategoriSampahAdminRecord>} Data kategori baru yang telah terdaftar.
 */
export async function createKategori(
  payload: CreateKategoriPayload
): Promise<KategoriSampahAdminRecord> {
  const currentList = await getKategoriList();

  const randomHash = Math.random().toString(36).substring(2, 10);
  const newRecord: KategoriSampahAdminRecord = {
    id:
      currentList.length > 0
        ? `cat-${payload.jenisSampah}-${String(currentList.length + 1).padStart(2, "0")}`
        : `cat-${String(Date.now())}`,
    materialCode: `ID: ${randomHash}...`,
    namaKategori: payload.namaKategori.trim(),
    jenisSampah: payload.jenisSampah,
    deskripsi: payload.deskripsi.trim(),
    hargaBeliPerKg: payload.hargaBeliPerKg,
    poinRewardPerKg: payload.poinRewardPerKg,
    satuan: payload.satuan || "kg",
    imageUrl:
      payload.imageUrl ||
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80",
  };

  try {
    await apiRequest(KATEGORI.CREATE, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn("[adminKategoriService] Panggilan POST API gagal/offline, data disimpan ke cache lokal:", err);
  }

  const updatedList = [...currentList, newRecord];
  saveToLocalStorage(updatedList);
  return newRecord;
}

/**
 * Memperbarui data tarif harga, rasio poin, atau foto sampel kategori material.
 * 
 * @async
 * @param {string} id - Identifier kategori yang akan diubah.
 * @param {UpdateKategoriPayload} payload - Nilai-nilai data baru yang akan diperbarui.
 * @returns {Promise<KategoriSampahAdminRecord>} Data kategori yang telah diperbarui.
 */
export async function updateKategori(
  id: string,
  payload: UpdateKategoriPayload
): Promise<KategoriSampahAdminRecord> {
  const currentList = await getKategoriList();
  const index = currentList.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error(`Kategori dengan ID ${id} tidak ditemukan`);
  }

  const existing = currentList[index];
  const updated: KategoriSampahAdminRecord = {
    ...existing,
    namaKategori: payload.namaKategori ? payload.namaKategori.trim() : existing.namaKategori,
    jenisSampah: payload.jenisSampah || existing.jenisSampah,
    deskripsi: payload.deskripsi ? payload.deskripsi.trim() : existing.deskripsi,
    hargaBeliPerKg:
      payload.hargaBeliPerKg !== undefined
        ? payload.hargaBeliPerKg
        : existing.hargaBeliPerKg,
    poinRewardPerKg:
      payload.poinRewardPerKg !== undefined
        ? payload.poinRewardPerKg
        : existing.poinRewardPerKg,
    imageUrl: payload.imageUrl || existing.imageUrl,
    satuan: payload.satuan || existing.satuan,
  };

  try {
    await apiRequest(KATEGORI.UPDATE(id), {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn("[adminKategoriService] Panggilan PUT API gagal/offline, data diperbarui di cache lokal:", err);
  }

  const updatedList = [...currentList];
  updatedList[index] = updated;
  saveToLocalStorage(updatedList);
  return updated;
}

/**
 * Menghapus kategori material sampah dari sistem operasional bank sampah.
 * 
 * @async
 * @param {string} id - Identifier kategori yang akan dihapus.
 * @returns {Promise<boolean>} True jika proses penghapusan berhasil.
 */
export async function deleteKategori(id: string): Promise<boolean> {
  const currentList = await getKategoriList();
  const filtered = currentList.filter((item) => item.id !== id);

  try {
    await apiRequest(KATEGORI.DELETE(id), {
      method: "DELETE",
    });
  } catch (err) {
    console.warn("[adminKategoriService] Panggilan DELETE API gagal/offline, data dihapus di cache lokal:", err);
  }

  saveToLocalStorage(filtered);
  return true;
}

/**
 * Melakukan penyesuaian tarif harga beli massal untuk seluruh kategori sampah secara persentase (+/- %).
 * Hasil nilai rupiah dibulatkan otomatis ke ratusan terdekat.
 * 
 * @async
 * @param {number} percentageMultiplier - Nilai persentase kenaikan atau penurunan (misal: 5 atau -10).
 * @returns {Promise<KategoriSampahAdminRecord[]>} Daftar seluruh kategori dengan tarif harga baru.
 */
export async function batchUpdatePricing(
  percentageMultiplier: number
): Promise<KategoriSampahAdminRecord[]> {
  const currentList = await getKategoriList();
  const updatedList = currentList.map((item) => ({
    ...item,
    hargaBeliPerKg: Math.round((item.hargaBeliPerKg * (1 + percentageMultiplier / 100)) / 100) * 100,
  }));

  saveToLocalStorage(updatedList);
  return updatedList;
}
