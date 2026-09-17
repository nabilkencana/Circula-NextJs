export type KategoriHadiah = 'semua' | 'voucher' | 'sembako' | 'merchandise';

export interface HadiahItem {
  id: string;
  namaHadiah: string;
  kategori: 'voucher' | 'sembako' | 'merchandise';
  deskripsi: string;
  poinDibutuhkan: number;
  stok: number;
  imageUrl: string;
  mitraMerchant?: string;
  satuan: string;
}

export interface TukarPoinPayload {
  hadiahId: string;
}

export interface TukarPoinResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    kodeNota: string; // e.g. "TKR-202608-5001"
    tanggal: string;
    hadiahId: string;
    namaHadiah: string;
    poinTerpakai: number;
    sisaPoin: number;
    status: 'diproses' | 'selesai';
    kodeKlaimMerchant?: string;
  };
}

export interface SaldoNasabahSummary {
  saldoPoinSaatIni: number;
  saldoPoinAktif: number;
  totalSampahDisetorKg?: number;
  totalPoinDidapat?: number;
  totalPoinDitukar?: number;
  nilaiKonversiRupiah?: number;
  poinTerpakaiBulanIni?: number;
  totalTransaksiSelesai?: number;
  transaksiTerakhirSetor?: {
    kodeSetor: string;
    tanggal: string;
    beratKg: number;
    poin: number;
    status: string;
  };
  transaksiTerakhirTukar?: {
    kodePenukaran: string;
    tanggal: string;
    hadiah: string;
    poin: number;
    status: string;
  };
}
