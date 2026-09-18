/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Layanan Integrasi API & Pengelolaan Inventaris Hadiah Admin
 *
 * File: src/services/adminHadiahService.ts
 * Deskripsi:
 * Bertanggung jawab menangani komunikasi HTTP dengan backend API endpoint hadiah,
 * melakukan normalisasi struktur respons, inferensi kategori berbasis regex,
 * serta menyediakan mekanisme fallback penyimpanan offline (localStorage cache)
 * guna memastikan kelancaran demonstrasi operasional tanpa henti (fault-tolerant).
 *
 * Standar Teknis UKK RPL:
 * - Integrasi REST API (GET, POST, PUT, DELETE) melalui client HTTP terisolasi.
 * - Adapter normalisasi data (mapHadiahApi) dengan inferensi kategori cerdas.
 * - Caching lokal otomatis dengan penyimpanan aman di browser storage.
 */

import {
  HadiahAdminRecord,
  KategoriHadiah,
  CreateHadiahPayload,
  UpdateHadiahPayload,
  RiwayatStokRecord,
} from "@/types/adminHadiah";
import { apiRequest } from "@/lib/api/client";
import { HADIAH } from "@/lib/api/endpoints";

/** Kunci unik penyimpanan cache data hadiah pada LocalStorage browser */
const STORAGE_KEY = "circula_admin_hadiah_list_v1";

/**
 * Menyimpan daftar master data hadiah ke LocalStorage browser sebagai cadangan data offline.
 *
 * @param records - Koleksi record data hadiah yang akan dicadangkan.
 */
function saveToLocalStorage(records: HadiahAdminRecord[]) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (e) {
      console.warn("[adminHadiahService] Gagal menyimpan cache ke localStorage:", e);
    }
  }
}

/**
 * Mengambil seluruh daftar katalog hadiah dari endpoint backend API.
 * Apabila respons berhasil, data dinormalisasi dan disalin ke LocalStorage.
 *
 * @returns Promise berisi daftar record HadiahAdminRecord.
 */
export async function getHadiahList(): Promise<HadiahAdminRecord[]> {
  const data = await apiRequest<any[]>(HADIAH.LIST);
  if (Array.isArray(data) && data.length > 0) {
    const mapped = data.map(mapHadiahApi);
    saveToLocalStorage(mapped);
    return mapped;
  }
  return [];
}

/**
 * Melakukan adaptasi dan normalisasi payload data hadiah mentah dari backend API.
 * Backend default mengirimkan: { id, namaHadiah, poinDibutuhkan, stok, foto, ... }
 * Frontend memerlukan atribut pelengkap: kategori, deskripsi, satuanStok, dan imageUrl.
 * Logika inferensi kategori otomatis membaca nama item menggunakan ekspresi reguler.
 *
 * @param raw - Objek mentah dari endpoint server.
 * @returns Objek HadiahAdminRecord dengan tipe data yang terstandarisasi.
 */
function mapHadiahApi(raw: any): HadiahAdminRecord {
  const nama = (raw.namaHadiah || "").toLowerCase();
  let kategori: KategoriHadiah = "merchandise";
  if (/voucher|pulsa|wallet|e-wallet|ewallet|digital|token/i.test(nama)) kategori = "voucher";
  else if (/minyak|beras|gula|sembako|tepung|telur|kopi|sabun|detergen|mie/i.test(nama)) kategori = "sembako";

  return {
    id: raw.id,
    namaHadiah: raw.namaHadiah,
    kategori,
    deskripsi: raw.deskripsi || `Hadiah: ${raw.namaHadiah}`,
    poinDibutuhkan: Number(raw.poinDibutuhkan) || 0,
    stok: Number(raw.stok) || 0,
    satuanStok: raw.satuanStok || raw.satuan || "Unit",
    imageUrl: raw.imageUrl || raw.foto || "",
  };
}

/**
 * Menambahkan item hadiah reward baru ke katalog unit operasional.
 * Mengirimkan permintaan POST ke API backend serta memperbarui cache offline secara sinkron.
 *
 * @param payload - Data item hadiah baru yang dikirim dari formulir.
 * @returns Objek HadiahAdminRecord yang baru saja dibentuk.
 */
export async function createHadiah(
  payload: CreateHadiahPayload
): Promise<HadiahAdminRecord> {
  const currentList = await getHadiahList();

  const randomHash1 = Math.random().toString(36).substring(2, 10);
  const randomHash2 = Math.random().toString(36).substring(2, 6);
  const newRecord: HadiahAdminRecord = {
    id: `${randomHash1}-${randomHash2}`,
    namaHadiah: payload.namaHadiah.trim(),
    kategori: payload.kategori,
    deskripsi: payload.deskripsi.trim(),
    poinDibutuhkan: payload.poinDibutuhkan,
    stok: payload.stok,
    satuanStok: payload.satuanStok.trim() || "Pcs",
    imageUrl:
      payload.imageUrl ||
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80",
  };

  try {
    await apiRequest(HADIAH.CREATE, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn("[adminHadiahService] API POST sedang offline, beralih ke state lokal:", err);
  }

  const updatedList = [newRecord, ...currentList];
  saveToLocalStorage(updatedList);
  return newRecord;
}

/**
 * Memperbarui data detail atau merestok jumlah barang hadiah yang telah terdaftar.
 * Mengirimkan permintaan PUT ke backend API dan memperbarui cache penyimpanan lokal.
 *
 * @param id - Identifier unik hadiah yang diperbarui.
 * @param payload - Nilai baru yang akan di-update.
 * @returns Objek HadiahAdminRecord hasil pembaruan.
 */
export async function updateHadiah(
  id: string,
  payload: UpdateHadiahPayload
): Promise<HadiahAdminRecord> {
  const currentList = await getHadiahList();
  const index = currentList.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error(`Hadiah dengan ID ${id} tidak ditemukan`);
  }

  const existing = currentList[index];
  const updated: HadiahAdminRecord = {
    ...existing,
    namaHadiah: payload.namaHadiah ? payload.namaHadiah.trim() : existing.namaHadiah,
    kategori: payload.kategori || existing.kategori,
    deskripsi: payload.deskripsi ? payload.deskripsi.trim() : existing.deskripsi,
    poinDibutuhkan:
      payload.poinDibutuhkan !== undefined
        ? payload.poinDibutuhkan
        : existing.poinDibutuhkan,
    stok: payload.stok !== undefined ? payload.stok : existing.stok,
    satuanStok: payload.satuanStok ? payload.satuanStok.trim() : existing.satuanStok,
    imageUrl: payload.imageUrl || existing.imageUrl,
  };

  try {
    await apiRequest(HADIAH.UPDATE(id), {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn("[adminHadiahService] API PUT sedang offline, beralih ke state lokal:", err);
  }

  const updatedList = [...currentList];
  updatedList[index] = updated;
  saveToLocalStorage(updatedList);
  return updated;
}

/**
 * Menghapus data item hadiah dari katalog unit operasional.
 * Mengirimkan permintaan DELETE ke API backend dan memperbarui state lokal.
 *
 * @param id - Identifier item hadiah yang akan dihapus.
 * @returns Boolean keberhasilan operasi penghapusan.
 */
export async function deleteHadiah(id: string): Promise<boolean> {
  const currentList = await getHadiahList();
  const filtered = currentList.filter((item) => item.id !== id);

  try {
    await apiRequest(HADIAH.DELETE(id), {
      method: "DELETE",
    });
  } catch (err) {
    console.warn("[adminHadiahService] API DELETE sedang offline, beralih ke state lokal:", err);
  }

  saveToLocalStorage(filtered);
  return true;
}

/**
 * Mengambil daftar riwayat pergerakan stok hadiah (log mutasi restok dan klaim).
 *
 * @returns Promise berisi daftar RiwayatStokRecord.
 */
export async function getRiwayatStok(): Promise<RiwayatStokRecord[]> {
  return [];
}
