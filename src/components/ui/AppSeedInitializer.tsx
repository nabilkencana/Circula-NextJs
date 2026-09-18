/**
 * @file AppSeedInitializer.tsx
 * @description Komponen penginisialisasi seed data aplikasi.
 * Dipertahankan sebagai komponen no-op (mengembalikan `null`) untuk mencegah
 * penghapusan (wipe) atau re-seed basis data yang tidak disengaja selama sesi penjelajahan
 * aktif pengguna maupun eksekusi pengujian otomatis.
 * 
 * @module Components/UI/AppSeedInitializer
 */

"use client";

/**
 * Komponen AppSeedInitializer
 * 
 * @component
 * @returns {null} Tidak merender markup visual apa pun.
 */
export default function AppSeedInitializer(): null {
  return null;
}
