export interface SetorSampahItemInput {
  tempId: string;
  kategoriSampahId: string;
  namaKategori: string;
  jenisSampah: string;
  beratKg: number;
  hargaPerKg: number;
  poinPerKg: number;
  subtotalPoin: number;
  subtotalRupiah: number;
}

export interface CreateSetorSampahPayload {
  tanggal: string; // ISO string format YYYY-MM-DD
  catatan?: string;
  metodePenyerahan: 'drop-off' | 'jemput';
  items: {
    kategoriSampahId: string;
    beratKg: number;
  }[];
}

export interface SetorSampahSubmissionResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    kodeSetor: string; // e.g. "STR-202608-1002"
    tanggal: string;
    totalEstimasiBeratKg: number;
    totalEstimasiPoin: number;
    totalEstimasiRupiah: number;
    status: 'menunggu_konfirmasi';
  };
}
