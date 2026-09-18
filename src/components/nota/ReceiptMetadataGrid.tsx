import React from "react";

/**
 * Interface properties untuk komponen grid metadata nota.
 */
interface ReceiptMetadataGridProps {
  /** Nomor unik transaksi (STR-XXXX atau TKR-XXXX) */
  kodeTransaksi: string;
  /** Timestamp waktu verifikasi resmi transaksi */
  waktuVerifikasi: string;
  /** Nama lengkap nasabah penyetor atau penerima reward */
  namaNasabah: string;
  /** Nomor telepon kontak nasabah */
  noTelepon: string;
}

/**
 * Komponen Grid Metadata Struk Transaksi (ReceiptMetadataGrid)
 *
 * Menampilkan 4 data kunci transaksi dalam panel inset abu-abu:
 * 1. Nomor Transaksi: Kode alfanumerik unik sistem bank sampah digital.
 * 2. Waktu Verifikasi: Tanggal dan jam penimbangan/klaim disahkan loket.
 * 3. Nama Nasabah: Identitas resmi pemilik akun.
 * 4. No. Telepon: Kontak terdaftar nasabah untuk validasi keamanan.
 *
 * @param props Properti rincian metadata transaksi
 * @returns JSX Element panel informasi metadata nota
 */
export default function ReceiptMetadataGrid({
  kodeTransaksi,
  waktuVerifikasi,
  namaNasabah,
  noTelepon,
}: ReceiptMetadataGridProps) {
  return (
    <div className="bg-inset-gray border border-gray-200 rounded-2xl p-5 my-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {/* Kolom 1: Nomor Transaksi Resmi */}
      <div>
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary block mb-1">
          Nomor Transaksi
        </span>
        <span className="font-mono font-bold text-sm sm:text-base text-text-primary tracking-tight block">
          {kodeTransaksi}
        </span>
      </div>

      {/* Kolom 2: Waktu Verifikasi Loket */}
      <div>
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary block mb-1">
          Waktu Verifikasi
        </span>
        <span className="text-xs sm:text-sm font-semibold text-text-primary block">
          {waktuVerifikasi}
        </span>
      </div>

      {/* Kolom 3: Nama Lengkap Nasabah */}
      <div>
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary block mb-1">
          Nama Nasabah
        </span>
        <span className="font-bold text-xs sm:text-sm text-text-primary block">
          {namaNasabah}
        </span>
      </div>

      {/* Kolom 4: Nomor Telepon Kontak */}
      <div>
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary block mb-1">
          No. Telepon
        </span>
        <span className="font-mono text-xs sm:text-sm font-semibold text-text-primary block">
          {noTelepon}
        </span>
      </div>
    </div>
  );
}

