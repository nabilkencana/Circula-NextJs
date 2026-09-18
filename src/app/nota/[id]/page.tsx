import React from "react";
import NotaPageClient from "./NotaPageClient";

/**
 * Halaman Server Rute Dinamis Nota Transaksi (`/nota/[id]`)
 *
 * Mengimplementasikan konvensi Next.js 15+ App Router di mana `params` di-resolve
 * secara asinkron (`Promise<{ id: string }>`) sebelum diinjeksikan ke dalam
 * komponen antarmuka klien `NotaPageClient`.
 *
 * @param props Parameter dinamis rute yang memuat ID / kode transaksi
 * @returns JSX Element halaman detail nota transaksi
 */
export default async function NotaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await params promise sesuai standar Next.js 15+
  const { id } = await params;

  return <NotaPageClient id={id} />;
}

