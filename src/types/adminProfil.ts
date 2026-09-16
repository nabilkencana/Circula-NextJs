export interface UnitBankSampahDetail {
  id: string; // e.g. "unit-04"
  kodeUnit: string; // e.g. "UNIT-04"
  namaUnit: string;
  namaPengelola: string;
  telp: string;
  alamatLengkap: string;
  jamOperasional: string;
  kapasitasGudang: string;
  logoPlangUrl?: string;
  appKey: string;
  statusOperasional: "aktif" | "nonaktif";
  totalNasabah: number;
  nasabahBaruBulanIni: number;
  akumulasiTonaseTon: number;
  transaksiBulanIni: number;
  rewardTerdistribusiPoin: number;
  rewardTerdistribusiRupiah: number;
  terakhirDisimpan?: string;
}

export interface UpdateUnitProfilPayload {
  namaUnit: string;
  namaPengelola: string;
  telp: string;
  alamatLengkap: string;
  jamOperasional: string;
  kapasitasGudang: string;
  logoPlang?: File | null;
}

export interface UpdateUnitProfilResponse {
  success: boolean;
  message: string;
  data: UnitBankSampahDetail;
}
