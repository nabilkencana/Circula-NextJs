/**
 * @file TransactionCard.tsx
 * @description Komponen distributor kartu transaksi (Polymorphic / Strategy Pattern Component).
 * Memeriksa status transaksi penyetoran sampah dan secara dinamis merender komponen kartu yang sesuai:
 * 1. "selesai" -> `CardSelesai` (menampilkan timbangan real, poin yang diperoleh, dan nama petugas verifikator)
 * 2. "ditolak" -> `CardDitolak` (menampilkan alasan penolakan standar 3R oleh petugas)
 * 3. "menunggu_konfirmasi" / "diverifikasi" -> `CardMenungguKonfirmasi` (menampilkan estimasi berat dan tiket antrean)
 * 
 * Peran dalam UKK:
 * - Menunjukkan penerapan Clean Code & Single Responsibility Principle (SRP).
 * - Menghindari percabangan `if-else` kompleks di dalam satu file raksasa dengan membagi kartu per status.
 */

import React from "react";
import { TransaksiPenyetoran } from "@/types/historiSetor"; // Tipe data kontrak transaksi penyetoran
import CardMenungguKonfirmasi from "./CardMenungguKonfirmasi"; // Kartu transaksi berstatus menunggu/diverifikasi
import CardSelesai from "./CardSelesai"; // Kartu transaksi berstatus sukses tervalidasi
import CardDitolak from "./CardDitolak"; // Kartu transaksi berstatus ditolak petugas

/**
 * Interface props untuk TransactionCard
 * @property transaksi - Objek data transaksi penyetoran sampah
 */
interface TransactionCardProps {
  transaksi: TransaksiPenyetoran;
}

export default function TransactionCard({ transaksi }: TransactionCardProps) {
  /**
   * Percabangan Switch-Case menentukan kartu yang dirender berdasarkan status transaksi:
   */
  switch (transaksi.status) {
    case "selesai":
      // Transaksi berhasil ditimbang dan poin sudah masuk ke saldo nasabah
      return <CardSelesai transaksi={transaksi} />;

    case "ditolak":
      // Sampah tidak memenuhi standar atau kriteria pemilahan 3R
      return <CardDitolak transaksi={transaksi} />;

    case "menunggu_konfirmasi":
    case "diverifikasi":
    default:
      // Transaksi baru diajukan nasabah dan menunggu jadwal penimbangan fisik
      return <CardMenungguKonfirmasi transaksi={transaksi} />;
  }
}
