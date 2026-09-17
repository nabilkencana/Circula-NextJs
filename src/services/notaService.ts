import { NotaSetorDetail, NotaTukarDetail } from "@/types/nota";
import { fetchWithAuth } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";

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
  const result = await fetchWithAuth<NotaSetorDetail>(
    ENDPOINTS.SETOR.NOTA(id)
  );

  if (result.ok && result.data) {
    return result.data;
  }

  return {
    ...MOCK_NOTA_SETOR,
    kodeTransaksi: id || MOCK_NOTA_SETOR.kodeTransaksi,
  };
}

export async function getNotaTukarById(id: string): Promise<NotaTukarDetail> {
  const result = await fetchWithAuth<NotaTukarDetail>(
    ENDPOINTS.TUKAR_POIN.NOTA(id)
  );

  if (result.ok && result.data) {
    return result.data;
  }

  return {
    ...MOCK_NOTA_TUKAR,
    kodeTransaksi: id || MOCK_NOTA_TUKAR.kodeTransaksi,
  };
}
