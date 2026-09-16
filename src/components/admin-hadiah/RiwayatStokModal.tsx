import React from "react";
import { X, ArrowDownLeft, ArrowUpRight, History } from "lucide-react";
import { RiwayatStokRecord } from "@/types/adminHadiah";

interface RiwayatStokModalProps {
  isOpen: boolean;
  records: RiwayatStokRecord[];
  onClose: () => void;
}

export default function RiwayatStokModal({
  isOpen,
  records,
  onClose,
}: RiwayatStokModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark-container/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-gray-200 z-10 animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-neon/20 border border-brand-neon/40 flex items-center justify-center text-dark-container shrink-0">
              <History className="w-5 h-5 text-dark-container" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-text-primary">
                Riwayat Pergerakan Stok Hadiah
              </h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Log mutasi masuk (restok) &amp; keluar (klaim nasabah)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-text-primary transition-colors cursor-pointer"
            aria-label="Tutup riwayat stok"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Table Content */}
        <div className="py-4 overflow-y-auto flex-1">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 bg-[#FAFBF9] text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3 px-3">TANGGAL &amp; ID</th>
                <th className="py-3 px-3">ITEM HADIAH</th>
                <th className="py-3 px-3">MUTASI</th>
                <th className="py-3 px-3">KETERANGAN</th>
              </tr>
            </thead>
            <tbody>
              {records.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-100 hover:bg-[#FAFBF9] transition-colors"
                >
                  <td className="py-3 px-3">
                    <p className="font-semibold text-text-primary">{row.tanggal}</p>
                    <span className="font-mono text-[10px] text-gray-400">{row.id}</span>
                  </td>
                  <td className="py-3 px-3 font-bold text-text-primary">
                    {row.namaHadiah}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center gap-1 font-bold text-xs px-2.5 py-0.5 rounded-full ${
                        row.tipe === "masuk"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {row.tipe === "masuk" ? (
                        <>
                          <ArrowDownLeft className="w-3 h-3 text-emerald-600" />
                          +{row.jumlah}
                        </>
                      ) : (
                        <>
                          <ArrowUpRight className="w-3 h-3 text-red-600" />
                          -{row.jumlah}
                        </>
                      )}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-text-secondary">
                    {row.keterangan}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-gray-400">
            Total {records.length} riwayat mutasi tercatat
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
