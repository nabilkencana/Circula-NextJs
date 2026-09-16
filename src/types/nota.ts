export type TipeNota = 'setor' | 'tukar';

export interface ItemNotaSetor {
  sku: string;
  materialNama: string;
  kategori: 'plastik' | 'kertas' | 'logam' | 'kaca';
  timbanganRealKg: number;
  poinPerKg: number;
  subtotalPoin: number;
}

export interface NotaSetorDetail {
  tipe: 'setor';
  kodeTransaksi: string; // e.g. "STR-202608-1001"
  waktuVerifikasi: string; // ISO string e.g. "2026-08-26T09:35:00Z"
  namaUnit: string;
  unitId: string;
  namaNasabah: string;
  noTelepon: string;
  items: ItemNotaSetor[];
  totalBeratKg: number;
  estimasiNilaiRupiah: number;
  saldoSebelumTransaksi: number;
  totalPoinDiterbitkan: number;
  totalSaldoAkhir: number;
  petugasPenimbang: string;
  catatanPetugas: string;
  digitalSignatureHash: string;
  status: 'selesai';
}

export interface NotaTukarDetail {
  tipe: 'tukar';
  kodeTransaksi: string; // e.g. "TKR-202608-5001"
  waktuTransaksi: string;
  namaNasabah: string;
  itemDitukar: string;
  poinTerpakai: number;
  sisaSaldoPoin: number;
  merchantClaimCode: string;
  status: 'selesai';
}
