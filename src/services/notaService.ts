import { NotaSetorDetail, NotaTukarDetail } from "@/types/nota";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://learn.smktelkom-mlg.sch.id/bank_sampah/";

export const MOCK_NOTA_SETOR: NotaSetorDetail = {
  tipe: "setor",
  kodeTransaksi: "STR-202608-1001",
  waktuVerifikasi: "2026-08-26T09:35:00Z",
  namaUnit: "Unit Bank Sampah Asri Jaya (ID: UNIT-04)",
  unitId: "UNIT-04",
  namaNasabah: "Budi Santoso",
  noTelepon: "085678901234",
  items: [
    {
      sku: "PLS-PET-01",
      materialNama: "Botol Plastik PET (Bersih)",
      kategori: "plastik",
      timbanganRealKg: 10.0,
      poinPerKg: 10,
      subtotalPoin: 100,
    },
    {
      sku: "KRT-BOX-02",
      materialNama: "Kardus & Karton Bekas",
      kategori: "kertas",
      timbanganRealKg: 5.0,
      poinPerKg: 5,
      subtotalPoin: 25,
    },
  ],
  totalBeratKg: 15.0,
  estimasiNilaiRupiah: 45000,
  saldoSebelumTransaksi: 25,
  totalPoinDiterbitkan: 125,
  totalSaldoAkhir: 150,
  petugasPenimbang: "Ahmad Fauzi (Admin Unit)",
  catatanPetugas:
    "Berat sampah sesuai hasil timbangan real petugas dan memenuhi standar 3R.",
  digitalSignatureHash: "9498c6d6-c2de-450d-a391-e80fbff5386c",
  status: "selesai",
};

export const MOCK_NOTA_TUKAR: NotaTukarDetail = {
  tipe: "tukar",
  kodeTransaksi: "TKR-202608-5001",
  waktuTransaksi: "2026-08-26T11:20:00Z",
  namaNasabah: "Budi Santoso",
  itemDitukar: "Voucher Pulsa / E-Wallet Rp 25.000",
  poinTerpakai: 75,
  sisaSaldoPoin: 75,
  merchantClaimCode: "PLSA-8823-9912",
  status: "selesai",
};

export async function getNotaSetorById(id: string): Promise<NotaSetorDetail> {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const response = await fetch(`${API_BASE_URL}api/v1/setor-sampah/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-app-key": "circula-ukk-2026",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      return {
        ...MOCK_NOTA_SETOR,
        kodeTransaksi: id || MOCK_NOTA_SETOR.kodeTransaksi,
      };
    }

    const json = await response.json();
    if (json && json.data) {
      return json.data;
    }

    return {
      ...MOCK_NOTA_SETOR,
      kodeTransaksi: id || MOCK_NOTA_SETOR.kodeTransaksi,
    };
  } catch {
    return {
      ...MOCK_NOTA_SETOR,
      kodeTransaksi: id || MOCK_NOTA_SETOR.kodeTransaksi,
    };
  }
}

export async function getNotaTukarById(id: string): Promise<NotaTukarDetail> {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const response = await fetch(`${API_BASE_URL}api/v1/penukaran-poin/nota/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-app-key": "circula-ukk-2026",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      return {
        ...MOCK_NOTA_TUKAR,
        kodeTransaksi: id || MOCK_NOTA_TUKAR.kodeTransaksi,
      };
    }

    const json = await response.json();
    if (json && json.data) {
      return json.data;
    }

    return {
      ...MOCK_NOTA_TUKAR,
      kodeTransaksi: id || MOCK_NOTA_TUKAR.kodeTransaksi,
    };
  } catch {
    return {
      ...MOCK_NOTA_TUKAR,
      kodeTransaksi: id || MOCK_NOTA_TUKAR.kodeTransaksi,
    };
  }
}
