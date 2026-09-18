/**
 * @file setorSampah.ts
 * @description Deklarasi tipe data (Type Definitions) untuk modul Pengajuan Setor Sampah (Setor Sampah).
 * Mendefinisikan struktur item input penimbangan multi-item, payload pengiriman ke API server,
 * serta format respon tiket pendaftaran penimbangan.
 * 
 * Peran dalam UKK:
 * - Menstandarisasi transaksi multi-item (1 transaksi setor dapat memuat banyak jenis sampah: plastik, kardus, logam).
 * - Menjamin validitas tipe data numerik (beratKg, hargaPerKg, poinPerKg) untuk perhitungan subtotal presisi.
 */

/**
 * Interface item sampah sementara di sisi client saat nasabah mengisi keranjang setor
 * @property tempId - ID unik sementara lokal (misal: "item-1719283921")
 * @property kategoriSampahId - ID kategori sampah yang dipilih dari katalog
 * @property namaKategori - Nama label kategori (misal: "Botol Plastik Bersih")
 * @property jenisSampah - Kategori besar ("plastik" | "kertas" | "logam" | "elektronik")
 * @property beratKg - Estimasi berat sampah yang disetor dalam Kilogram
 * @property hargaPerKg - Valuasi rupiah per kilogram berdasarkan katalog aktif
 * @property poinPerKg - Nilai poin per kilogram
 * @property subtotalPoin - Hasil perkalian beratKg * poinPerKg
 * @property subtotalRupiah - Hasil perkalian beratKg * hargaPerKg
 */
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

/**
 * Interface payload JSON yang dikirimkan melalui HTTP POST ke endpoint backend `/api/v1/setor`
 */
export interface CreateSetorSampahPayload {
  tanggal: string; // Tanggal rencana setor (format: YYYY-MM-DD)
  catatan?: string; // Catatan opsional dari nasabah
  metodePenyerahan: 'drop-off' | 'jemput'; // Drop-off mandiri ke loket atau penjemputan oleh armada
  items: {
    kategoriSampahId: string;
    beratKg: number;
  }[];
}

/**
 * Interface respon kembalian dari backend saat pengajuan setor berhasil dibuat
 */
export interface SetorSampahSubmissionResponse {
  success: boolean;
  message: string;
  data: {
    id: string; // ID transaksi baru
    kodeSetor: string; // Kode tiket antrean unik (misal: "STR-202608-1002")
    tanggal: string;
    totalEstimasiBeratKg: number;
    totalEstimasiPoin: number;
    totalEstimasiRupiah: number;
    status: 'menunggu_konfirmasi'; // Status awal selalu menunggu konfirmasi
  };
}
