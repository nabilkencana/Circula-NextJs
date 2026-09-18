/**
 * CIRCULA - Platform Digital Bank Sampah & Ekonomi Sirkular Modern
 * Modul: Tipe Data Admin Profil & Pengaturan Unit Operasional
 *
 * File: src/types/adminProfil.ts
 * Deskripsi:
 * Mendefinisikan struktur tipe data TypeScript untuk profil identitas unit bank sampah,
 * atribut pengelola, kontak dan alamat loket penimbangan, jam buka, kapasitas tampung gudang,
 * token multi-tenant (App Key), metrik ringkasan kinerja fasilitas, serta payload pembaruan data.
 *
 * Standar Teknis UKK RPL:
 * - Kontrak entitas profil unit lengkap (`UnitBankSampahDetail`).
 * - Skema payload mutasi data formulir (`UpdateUnitProfilPayload`).
 * - Kontrak respons pembaruan unit (`UpdateUnitProfilResponse`).
 */

/**
 * Rincian data identitas dan parameter operasional unit bank sampah.
 */
export interface UnitBankSampahDetail {
  /** Identifier unik record unit */
  id: string; // e.g. "unit-04"
  /** Kode unit terdaftar resmi (cth: "UNIT-04") */
  kodeUnit: string; // e.g. "UNIT-04"
  /** Nama label resmi unit bank sampah */
  namaUnit: string;
  /** Nama lengkap penanggung jawab / pengelola unit */
  namaPengelola: string;
  /** Nomor kontak telepon seluler / WhatsApp aktif */
  telp: string;
  /** Alamat domisili lengkap loket dan gudang fasilitas */
  alamatLengkap: string;
  /** Jadwal jam layanan penimbangan warga */
  jamOperasional: string;
  /** Batas kapasitas maksimal penampungan gudang logistik */
  kapasitasGudang: string;
  /** Opsional: URL foto plang atau logo unit */
  logoPlangUrl?: string;
  /** Token kunci aplikasi multi-tenant unik */
  appKey: string;
  /** Status operasional akun unit saat ini */
  statusOperasional: "aktif" | "nonaktif";
  /** Total nasabah yang terdaftar di unit */
  totalNasabah: number;
  /** Jumlah nasabah baru yang bergabung di bulan berjalan */
  nasabahBaruBulanIni: number;
  /** Akumulasi total berat limbah (Ton) */
  akumulasiTonaseTon: number;
  /** Total transaksi penimbangan di bulan berjalan */
  transaksiBulanIni: number;
  /** Total poin reward yang telah dibagikan */
  rewardTerdistribusiPoin: number;
  /** Estimasi nilai tunai reward yang dibagikan */
  rewardTerdistribusiRupiah: number;
  /** Keterangan waktu pembaruan terakhir */
  terakhirDisimpan?: string;
}

/**
 * Payload data untuk pembaruan profil unit bank sampah dari form admin.
 */
export interface UpdateUnitProfilPayload {
  /** Nama unit bank sampah */
  namaUnit: string;
  /** Nama penanggung jawab pengelola */
  namaPengelola: string;
  /** Nomor telepon / kontak WA */
  telp: string;
  /** Alamat fisik loket */
  alamatLengkap: string;
  /** Jadwal jam operasional */
  jamOperasional: string;
  /** Kapasitas muat gudang */
  kapasitasGudang: string;
  /** Berkas foto plang baru (opsional) */
  logoPlang?: File | null;
}

/**
 * Kontrak respon hasil pembaruan data profil unit.
 */
export interface UpdateUnitProfilResponse {
  /** Penanda status keberhasilan */
  success: boolean;
  /** Pesan notifikasi hasil operasi */
  message: string;
  /** Objek data profil unit terbaru */
  data: UnitBankSampahDetail;
}
