/**
 * ============================================================================
 * Komponen: TransactionFeed
 * Direktori: src/components/histori/TransactionFeed.tsx
 *
 * Fungsi Utama:
 * Container penyaji daftar (feed) transaksi penyetoran sampah nasabah.
 * Mengatur 3 kondisi status rendering:
 * 1. Pemuatan Data (`isLoading = true`): Menampilkan Skeleton Shimmer cards.
 * 2. Data Kosong (`transactions.length === 0`): Menampilkan Empty State representatif
 *    dengan ilustrasi ikon kotak surat kosong (Inbox) dan pesan ramah pengguna.
 * 3. Data Tersedia: Melakukan mapping array transaksi ke komponen individual `TransactionCard`,
 *    dilengkapi animasi stagger bertingkat (`animationDelay`) saat kartu muncul.
 *
 * Karakteristik Teknis:
 * - Server / Client Reusable Container: Menerima array model data murni dan flag loading.
 * - Staggered Animation: Memberikan visual elegan kartu muncul satu per satu berurutan.
 * ============================================================================
 */

import React from "react";
import { TransaksiPenyetoran } from "@/types/historiSetor";
import TransactionCard from "./TransactionCard";
import { Inbox } from "lucide-react";

/**
 * Interface TransactionFeedProps:
 * Kontrak properti yang diterima oleh container TransactionFeed.
 */
interface TransactionFeedProps {
  /** Array berisi seluruh objek transaksi hasil filter */
  transactions: TransaksiPenyetoran[];
  /** Flag penanda proses pengambilan data backend sedang berlangsung */
  isLoading?: boolean;
}

export default function TransactionFeed({
  transactions,
  isLoading = false,
}: TransactionFeedProps) {
  // =========================================================================
  // KONDISI 1: Loading State (Animasi Skeleton Shimmer)
  // =========================================================================
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        {[1, 2].map((idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-gray-200 p-8 h-64 flex flex-col justify-between overflow-hidden relative"
          >
            <div className="w-1/3 h-5 bg-gray-200/80 rounded animate-shimmer" />
            <div className="grid grid-cols-3 gap-4">
              <div className="h-20 bg-gray-100 rounded-2xl animate-shimmer" />
              <div className="h-20 bg-gray-100 rounded-2xl animate-shimmer" />
              <div className="h-20 bg-gray-100 rounded-2xl animate-shimmer" />
            </div>
            <div className="w-full h-8 bg-gray-100 rounded-xl animate-shimmer" />
          </div>
        ))}
      </div>
    );
  }

  // =========================================================================
  // KONDISI 2: Empty State (Tidak Ada Transaksi Sesuai Filter/Pencarian)
  // =========================================================================
  if (transactions.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-4 animate-float shadow-inner">
          <Inbox className="w-8 h-8 text-gray-500" />
        </div>
        <h3 className="text-base font-bold text-text-primary">
          Tidak Ada Transaksi Penyetoran
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary max-w-sm mx-auto mt-1 leading-relaxed">
          Tidak ditemukan data penyetoran pada filter atau kata kunci yang Anda pilih.
        </p>
      </div>
    );
  }

  // =========================================================================
  // KONDISI 3: Success State (Render Kartu Transaksi dengan Stagger Delay)
  // =========================================================================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 space-y-5">
      {transactions.map((tx, idx) => (
        <div
          key={tx.id}
          className="animate-card-enter"
          style={{ animationDelay: `${Math.min(idx * 80, 480)}ms` }}
        >
          {/* Polymorphic card: Menentukan render varian selesai/menunggu/ditolak otomatis */}
          <TransactionCard transaksi={tx} />
        </div>
      ))}
    </div>
  );
}
