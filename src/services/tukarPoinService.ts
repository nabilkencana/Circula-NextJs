import {
  HadiahItem,
  TukarPoinPayload,
  TukarPoinResponse,
  SaldoNasabahSummary,
} from "@/types/tukarPoin";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://learn.smktelkom-mlg.sch.id/bank_sampah/";

export const MOCK_HADIAH_LIST: HadiahItem[] = [
  {
    id: "hd-01",
    namaHadiah: "Voucher Pulsa / E-Wallet Rp 25.000",
    kategori: "voucher",
    deskripsi: "Merchant: GoPay, OVO, ShopeePay | Stok: 50 unit",
    poinDibutuhkan: 75,
    stok: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
    mitraMerchant: "GoPay, OVO, ShopeePay",
    satuan: "unit",
  },
  {
    id: "hd-02",
    namaHadiah: "Minyak Goreng Pouch 1 Liter",
    kategori: "sembako",
    deskripsi: "Kebutuhan Pokok Higienis | Sisa Stok: 25 pouch",
    poinDibutuhkan: 100,
    stok: 25,
    imageUrl:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
    mitraMerchant: "Koperasi Sembako Circula",
    satuan: "pouch",
  },
  {
    id: "hd-03",
    namaHadiah: "Beras Super Pulen 2.5 Kg",
    kategori: "sembako",
    deskripsi: "Kualitas Premium Organik | Sisa Stok: 15 sak",
    poinDibutuhkan: 180,
    stok: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    mitraMerchant: "Lumbung Pangan Organik",
    satuan: "sak",
  },
  {
    id: "hd-04",
    namaHadiah: "Tumbler Stainless Steel 500ml",
    kategori: "merchandise",
    deskripsi: "Insulasi Panas & Dingin 12 Jam | Stok: 18 unit",
    poinDibutuhkan: 120,
    stok: 18,
    imageUrl:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    mitraMerchant: "Circula Eco Living",
    satuan: "unit",
  },
];

export const MOCK_SALDO_SUMMARY: SaldoNasabahSummary = {
  saldoPoinAktif: 150,
  nilaiKonversiRupiah: 52500, // 150 * Rp 350
  poinTerpakaiBulanIni: 75,
  totalTransaksiSelesai: 1,
};

export async function getHadiahList(): Promise<HadiahItem[]> {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const response = await fetch(`${API_BASE_URL}api/v1/hadiah`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-app-key": "circula-ukk-2026",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      return MOCK_HADIAH_LIST;
    }

    const json = await response.json();
    if (json && json.data && Array.isArray(json.data) && json.data.length > 0) {
      return json.data;
    }

    return MOCK_HADIAH_LIST;
  } catch {
    return MOCK_HADIAH_LIST;
  }
}

export async function tukarPoinHadiah(payload: TukarPoinPayload): Promise<TukarPoinResponse> {
  const matchingItem = MOCK_HADIAH_LIST.find((h) => h.id === payload.hadiahId) || MOCK_HADIAH_LIST[0];

  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const response = await fetch(`${API_BASE_URL}api/v1/penukaran-poin/tukar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-app-key": "circula-ukk-2026",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const json = await response.json();
      return json;
    }
  } catch {
    // fallback simulation
  }

  // Fallback transaction simulation
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const kodeNota = `TKR-202608-${randomSuffix}`;
  const now = new Date().toISOString();

  return {
    success: true,
    message: "Penukaran poin berhasil diproses!",
    data: {
      id: `penukaran-${Date.now()}`,
      kodeNota,
      tanggal: now,
      hadiahId: matchingItem.id,
      namaHadiah: matchingItem.namaHadiah,
      poinTerpakai: matchingItem.poinDibutuhkan,
      sisaPoin: Math.max(0, 150 - matchingItem.poinDibutuhkan),
      status: "diproses",
      kodeKlaimMerchant: `CLM-${randomSuffix}`,
    },
  };
}
