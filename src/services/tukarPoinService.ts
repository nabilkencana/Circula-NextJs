import {
  HadiahItem,
  TukarPoinPayload,
  TukarPoinResponse,
  SaldoNasabahSummary,
} from "@/types/tukarPoin";
import { apiRequest, getToken } from "@/lib/api/client";
import { HADIAH, PENUKARAN, DASHBOARD } from "@/lib/api/endpoints";

// ─── Service Functions ────────────────────────────────────────────────────────

// Backend hadiah field: { id, namaHadiah, poinDibutuhkan, stok, foto, ... }.
// Frontend HadiahItem butuh { kategori, deskripsi, imageUrl, satuan, ... }.
// Map + infer kategori dari nama (backend tak kirim kategori/deskripsi/satuan).
export const DEFAULT_HADIAH_ITEMS: HadiahItem[] = [
  {
    id: "hd-beras-5kg",
    namaHadiah: "Beras Premium Slyp Super 5 Kg",
    kategori: "sembako",
    categoryLabel: "Sembako",
    badge: "TERLARIS",
    poinDibutuhkan: 150,
    nilaiRupiahText: "Setara Rp 52.500",
    lokasiInfo: "Tersedia di Loket Asri Jaya (Sisa 18 pack)",
    stok: 18,
    satuan: "pack",
    deskripsi: "Beras putih premium kualitas super pulen kemasan 5 kg.",
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "hd-minyak-2l",
    namaHadiah: "Minyak Goreng Sawit Higienis 2L",
    kategori: "sembako",
    categoryLabel: "Dapur",
    badge: "FAVORIT",
    poinDibutuhkan: 90,
    nilaiRupiahText: "Setara Rp 31.500",
    lokasiInfo: "Tersedia langsung di lokasi (Sisa 24 pouch)",
    stok: 24,
    satuan: "pouch",
    deskripsi: "Minyak goreng kelapa sawit higienis kemasan pouch 2 liter.",
    imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "hd-gula-1kg",
    namaHadiah: "Gula Pasir Kristal Putih 1 Kg",
    kategori: "sembako",
    categoryLabel: "Konsumsi",
    poinDibutuhkan: 50,
    nilaiRupiahText: "Setara Rp 17.500",
    lokasiInfo: "Tersedia (Sisa 40 pack)",
    stok: 40,
    satuan: "pack",
    deskripsi: "Gula pasir kristal putih murni higienis 1 kg.",
    imageUrl: "https://images.unsplash.com/photo-1622484212850-cab596d66e74?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "hd-telur-tray",
    namaHadiah: "Telur Ayam Negeri Segar 1 Tray (30 Butir)",
    kategori: "sembako",
    categoryLabel: "Sembako",
    poinDibutuhkan: 80,
    nilaiRupiahText: "Setara Rp 28.000",
    lokasiInfo: "Tersedia di Loket Utama (Sisa 15 tray)",
    stok: 15,
    satuan: "tray",
    deskripsi: "Telur ayam negeri segar langsung dari peternak lokal binaan.",
    imageUrl: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "hd-ewallet-50k",
    namaHadiah: "Saldo GoPay / OVO / Dana Rp 50.000",
    kategori: "voucher",
    categoryLabel: "E-Wallet",
    badge: "INSTANT DIGITAL",
    poinDibutuhkan: 160,
    nilaiRupiahText: "Nominal Rp 50.000",
    lokasiInfo: "Pengiriman Otomatis via WhatsApp (24 Jam)",
    stok: 50,
    satuan: "voucher",
    deskripsi: "Saldo uang elektronik langsung ke akun GoPay, OVO, atau Dana.",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "hd-pulsa-25k",
    namaHadiah: "Paket Data / Pulsa Telkomsel & Indosat Rp 25.000",
    kategori: "pulsa",
    categoryLabel: "Pulsa & Data",
    poinDibutuhkan: 85,
    nilaiRupiahText: "Nominal Rp 25.000",
    lokasiInfo: "Instan 24 Jam (Top-up Otomatis)",
    stok: 35,
    satuan: "voucher",
    deskripsi: "Pulsa reguler atau paket kuota internet Telkomsel, Indosat, XL.",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "hd-donasi-sembako",
    namaHadiah: "Donasi Paket Sembako Berkelanjutan",
    kategori: "merchandise",
    categoryLabel: "Donasi",
    isDonasi: true,
    poinDibutuhkan: 100,
    nilaiRupiahText: "Penyaluran Terbuka",
    lokasiInfo: "Penyaluran via Komunitas Warga (RT/RW Binaan)",
    stok: 999,
    satuan: "paket",
    deskripsi: "Salurkan poin tabungan sampahmu untuk bantuan sembako warga prasejahtera.",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "hd-voucher-100k",
    namaHadiah: "Voucher Belanja Minimarket Rp 100.000",
    kategori: "voucher",
    categoryLabel: "Voucher",
    poinDibutuhkan: 320,
    nilaiRupiahText: "Nominal Rp 100.000",
    lokasiInfo: "Klaim Digital via Barcode Kasir",
    stok: 20,
    satuan: "voucher",
    deskripsi: "Voucher belanja resmi dapat digunakan di Indomaret & Alfamart.",
    imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "hd-shopeepay-25k",
    namaHadiah: "Saldo ShopeePay / LinkAja Rp 25.000",
    kategori: "voucher",
    categoryLabel: "E-Wallet",
    poinDibutuhkan: 80,
    nilaiRupiahText: "Nominal Rp 25.000",
    lokasiInfo: "Top-up Instan Realtime",
    stok: 30,
    satuan: "voucher",
    deskripsi: "Saldo ShopeePay atau LinkAja untuk belanja & bayar QRIS.",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "hd-pln-50k",
    namaHadiah: "Token Listrik PLN Prabayar Rp 50.000",
    kategori: "pulsa",
    categoryLabel: "Tagihan",
    poinDibutuhkan: 165,
    nilaiRupiahText: "Nominal Rp 50.000",
    lokasiInfo: "20 Digit Stroom Dikirim via WA/SMS",
    stok: 40,
    satuan: "token",
    deskripsi: "Token listrik PLN prabayar untuk meteran rumah tangga.",
    imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "hd-kuota-10gb",
    namaHadiah: "Paket Kuota Internet 10GB All Operator",
    kategori: "pulsa",
    categoryLabel: "Pulsa & Data",
    poinDibutuhkan: 120,
    nilaiRupiahText: "Nominal Rp 38.000",
    lokasiInfo: "Aktif 30 Hari (Semua Jaringan)",
    stok: 25,
    satuan: "paket",
    deskripsi: "Paket kuota data 10GB untuk Telkomsel, Indosat, XL, Tri.",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "hd-tumbler-eco",
    namaHadiah: "Tumbler Stainless Steel Eco Circula 500ml",
    kategori: "merchandise",
    categoryLabel: "Merchandise Eco",
    poinDibutuhkan: 75,
    nilaiRupiahText: "Setara Rp 45.000",
    lokasiInfo: "Ambil di Bank Sampah Induk (Sisa 30 pcs)",
    stok: 30,
    satuan: "pcs",
    deskripsi: "Tumbler ramah lingkungan tahan panas & dingin 12 jam.",
    imageUrl: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80",
  },
];

function mapHadiah(raw: any): HadiahItem {
  const nama = (raw.namaHadiah || "").toLowerCase();
  let kategori: HadiahItem["kategori"] = "merchandise";
  if (/pulsa|data|token|listrik|tagihan/i.test(nama)) kategori = "pulsa";
  else if (/voucher|wallet|e-wallet|ewallet|digital/i.test(nama)) kategori = "voucher";
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
    badge: raw.badge,
    categoryLabel: raw.categoryLabel,
    nilaiRupiahText: raw.nilaiRupiahText,
    lokasiInfo: raw.lokasiInfo,
    isDonasi: Boolean(raw.isDonasi),
  };
}

export async function getHadiahList(): Promise<HadiahItem[]> {
  try {
    const data = await apiRequest<any[]>(HADIAH.LIST);
    if (Array.isArray(data) && data.length > 0) return data.map(mapHadiah);
    return DEFAULT_HADIAH_ITEMS;
  } catch {
    return DEFAULT_HADIAH_ITEMS;
  }
}

export async function getSaldoNasabah(): Promise<SaldoNasabahSummary | null> {
  try {
    const token = getToken();
    if (!token) return null;

    const data = await apiRequest<any>(DASHBOARD.SUMMARY, { silent: true });
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
