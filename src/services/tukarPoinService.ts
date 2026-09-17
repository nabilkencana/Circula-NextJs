import {
  HadiahItem,
  TukarPoinPayload,
  TukarPoinResponse,
  SaldoNasabahSummary,
} from "@/types/tukarPoin";
import { apiRequest } from "@/lib/api/client";
import { HADIAH, PENUKARAN, DASHBOARD } from "@/lib/api/endpoints";

// ─── Service Functions ────────────────────────────────────────────────────────

// Backend hadiah field: { id, namaHadiah, poinDibutuhkan, stok, foto, ... }.
// Frontend HadiahItem butuh { kategori, deskripsi, imageUrl, satuan, ... }.
// Map + infer kategori dari nama (backend tak kirim kategori/deskripsi/satuan).
function mapHadiah(raw: any): HadiahItem {
  const nama = (raw.namaHadiah || "").toLowerCase();
  let kategori: HadiahItem["kategori"] = "merchandise";
  if (/voucher|pulsa|wallet|e-wallet|ewallet|token|digital/i.test(nama)) kategori = "voucher";
  else if (/minyak|beras|gula|sembako|tepung|telur|kopi|sabun|detergen|mie/i.test(nama)) kategori = "sembako";

  return {
    id: raw.id,
    namaHadiah: raw.namaHadiah,
    kategori,
    deskripsi:
      raw.deskripsi ||
      (raw.namaKategori ? `Kategori: ${raw.namaKategori}` : `Stok tersedia: ${raw.stok ?? 0} unit`),
    poinDibutuhkan: Number(raw.poinDibutuhkan) || 0,
    stok: Number(raw.stok) || 0,
    imageUrl: raw.imageUrl || raw.foto || "",
    mitraMerchant: raw.mitraMerchant || raw.namaMerchant || undefined,
    satuan: raw.satuan || "unit",
  };
}

export async function getHadiahList(): Promise<HadiahItem[]> {
  try {
    const data = await apiRequest<any[]>(HADIAH.LIST);
    if (Array.isArray(data) && data.length > 0) return data.map(mapHadiah);
    return [];
  } catch {
    return [];
  }
}

export async function getSaldoNasabah(): Promise<SaldoNasabahSummary | null> {
  try {
    const data = await apiRequest<any>(DASHBOARD.SUMMARY);
    if (!data) return null;
    const saldoPoin = Number(
      data.saldoPoin ?? data.saldoPoinSaatIni ?? data.saldoPoinAktif ?? 0
    );
    return {
      ...data,
      saldoPoinSaatIni: saldoPoin,
      saldoPoinAktif: saldoPoin,
      totalSampahDisetorKg: Number(data.totalSampahDisetorKg ?? data.totalSampahKg ?? 0),
    };
  } catch {
    return null;
  }
}

export async function tukarPoinHadiah(
  payload: TukarPoinPayload
): Promise<TukarPoinResponse> {
  try {
    const data = await apiRequest<TukarPoinResponse["data"]>(PENUKARAN.TUKAR, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (data) {
      return {
        success: true,
        message: "Penukaran poin berhasil diproses!",
        data,
      };
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Gagal memproses penukaran poin.";
    throw new Error(msg);
  }

  throw new Error("Gagal memproses penukaran poin. Coba lagi.");
}

export async function getMyPenukaran() {
  try {
    return await apiRequest(PENUKARAN.MY_PENUKARAN);
  } catch {
    return [];
  }
}

export async function getNotaPenukaran(id: string) {
  try {
    return await apiRequest(PENUKARAN.NOTA(id));
  } catch {
    return null;
  }
}
