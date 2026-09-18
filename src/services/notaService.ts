import { NotaSetorDetail, NotaTukarDetail, ItemNotaSetor } from "@/types/nota";
import { fetchWithAuth } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";

/**
 * Memformat tanggal dari format ISO string menjadi representasi ramah pengguna Indonesia.
 * Contoh hasil: "26 Agu 2026, 09:35 WIB"
 *
 * @param iso Tanggal dalam format ISO string atau tanggal raw
 * @returns String tanggal terformat berbahasa Indonesia
 */
function formatTgl(iso?: string): string {
  if (!iso) return "-";
  try {
    return (
      new Date(iso).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }) + " WIB"
    );
  } catch {
    return iso;
  }
}

/**
 * Mengadaptasi payload respons mentah dari backend menjadi entitas `NotaSetorDetail` yang aman tipe.
 * Melakukan kalkulasi subtotal poin per baris, total akumulasi berat, estimasi nilai rupiah,
 * dan rekonsiliasi saldo sebelum/setelah transaksi.
 *
 * @param raw Objek mentah transaksi setor sampah dari API backend
 * @returns Objek terstruktur `NotaSetorDetail`
 */
export function adaptNotaSetor(raw: any): NotaSetorDetail {
  const nasabah = raw.nasabah || {};
  const detail = Array.isArray(raw.detailSetors) ? raw.detailSetors : [];

  // Transformasi daftar detail penimbangan sampah
  const items: ItemNotaSetor[] = detail.map((d: any, idx: number) => {
    const kat = d.kategoriSampah || {};
    return {
      sku: `SMP-${String(idx + 1).padStart(3, "0")}`,
      materialNama: kat.namaKategori || d.kategori || "Material Daur Ulang",
      kategori: (kat.jenis || d.jenis || "plastik") as any,
      timbanganRealKg: Number(d.beratKg) || 0,
      poinPerKg: Number(kat.poinPerKg || d.poinPerKg) || 10,
      subtotalPoin: Number(d.subtotalPoin) || 0,
    };
  });

  const totalBeratKg = Number(raw.totalBeratKg) || 0;
  const totalPoinDiterbitkan = Number(raw.totalPoin) || 0;
  const saldoAkhir = Number(nasabah.saldoPoin) || totalPoinDiterbitkan;
  const saldoSebelum = Math.max(0, saldoAkhir - totalPoinDiterbitkan);

  // Estimasi akumulasi nilai rupiah berdasarkan harga beli per kg
  const estimasiRupiah = detail.reduce((acc: number, curr: any) => {
    const harga = Number(curr.kategoriSampah?.hargaPerKg) || 2000;
    return acc + Math.round((Number(curr.beratKg) || 0) * harga);
  }, 0);

  return {
    tipe: "setor",
    kodeTransaksi: raw.kodeSetor || raw.kodeTransaksi || raw.id || "STR-NOT-SET",
    waktuVerifikasi: formatTgl(raw.updatedAt || raw.tanggal || raw.createdAt),
    namaUnit: raw.namaUnit || raw.adminBank?.namaUnit || "Unit Bank Sampah Circula",
    unitId: raw.unitId || raw.adminBankId || "UNIT-01",
    namaNasabah: nasabah.namaNasabah || nasabah.namaLengkap || "Nasabah Circula",
    noTelepon: nasabah.telp || "085678901234",
    items,
    totalBeratKg,
    estimasiNilaiRupiah: estimasiRupiah || totalBeratKg * 3000,
    saldoSebelumTransaksi: saldoSebelum,
    totalPoinDiterbitkan,
    totalSaldoAkhir: saldoAkhir,
    petugasPenimbang: "Petugas Lapangan Bank Sampah",
    catatanPetugas:
      raw.catatan || raw.catatanAdmin || "Berat sampah sesuai hasil timbangan real petugas.",
    digitalSignatureHash: (raw.id || "sig-hash").replace(/-/g, "").slice(0, 16).toUpperCase(),
    status: "selesai",
  };
}

/**
 * Mengadaptasi payload respons mentah dari backend menjadi entitas `NotaTukarDetail`.
 *
 * @param raw Objek mentah transaksi penukaran hadiah dari API backend
 * @returns Objek terstruktur `NotaTukarDetail`
 */
export function adaptNotaTukar(raw: any): NotaTukarDetail {
  const nasabah = raw.nasabah || {};
  const hadiah = raw.hadiah || {};
  return {
    tipe: "tukar",
    kodeTransaksi: raw.kodePenukaran || raw.kodeTransaksi || raw.id || "TKR-NOT-SET",
    waktuTransaksi: formatTgl(raw.updatedAt || raw.tanggal || raw.createdAt),
    namaNasabah: nasabah.namaNasabah || nasabah.namaLengkap || "Nasabah Circula",
    itemDitukar: hadiah.namaHadiah || raw.itemDitukar || "Voucher Hadiah",
    poinTerpakai: Number(raw.poinTerpakai) || 0,
    sisaSaldoPoin: Number(nasabah.saldoPoin) || 0,
    merchantClaimCode: (raw.id || "VOUCHER").slice(-8).toUpperCase(),
    status: "selesai",
  };
}

/**
 * Mengambil data rincian nota penyetoran sampah (STR) berdasarkan ID transaksi atau kode setor.
 * Dilengkapi dengan mekanisme fallback jika ID yang dicari berupa kode transaksi.
 *
 * @param id UUID transaksi atau kode unik penyetoran (STR-XXXX)
 * @returns Objek `NotaSetorDetail` jika ditemukan, atau null jika gagal
 */
export async function getNotaSetorById(id: string): Promise<NotaSetorDetail | null> {
  const result = await fetchWithAuth<any>(
    ENDPOINTS.SETOR.NOTA(id)
  );

  if (result.ok && result.data) {
    return adaptNotaSetor(result.data);
  }

  // Fallback tangguh: cari transaksi di daftar riwayat pengguna jika lookup ID langsung gagal
  try {
    const fallbackList = await fetchWithAuth<any[]>(ENDPOINTS.SETOR.MY_SETOR());
    if (fallbackList.ok && Array.isArray(fallbackList.data)) {
      const match = fallbackList.data.find(
        (it) => it.id === id || it.kodeSetor === id
      );
      if (match) {
        return adaptNotaSetor(match);
      }
    }
  } catch {
    // Abaikan error pada percobaan fallback
  }

  return null;
}

/**
 * Mengambil data rincian nota penukaran hadiah (TKR) berdasarkan ID transaksi atau kode klaim.
 *
 * @param id UUID transaksi penukaran atau kode nota voucher (TKR-XXXX)
 * @returns Objek `NotaTukarDetail` jika ditemukan, atau null jika tidak valid
 */
export async function getNotaTukarById(id: string): Promise<NotaTukarDetail | null> {
  const result = await fetchWithAuth<any>(
    ENDPOINTS.TUKAR_POIN.NOTA(id)
  );

  if (result.ok && result.data) {
    return adaptNotaTukar(result.data);
  }

  return null;
}
