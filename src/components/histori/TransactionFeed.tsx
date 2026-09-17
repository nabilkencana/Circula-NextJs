import React from "react";
import { TransaksiPenyetoran } from "@/types/historiSetor";
import TransactionCard from "./TransactionCard";
import { Inbox } from "lucide-react";

interface TransactionFeedProps {
  transactions: TransaksiPenyetoran[];
  isLoading?: boolean;
}

export default function TransactionFeed({
  transactions,
  isLoading = false,
}: TransactionFeedProps) {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 space-y-5">
      {transactions.map((tx, idx) => (
        <div
          key={tx.id}
          className="animate-card-enter"
          style={{ animationDelay: `${Math.min(idx * 80, 480)}ms` }}
        >
          <TransactionCard transaksi={tx} />
        </div>
      ))}
    </div>
  );
}
