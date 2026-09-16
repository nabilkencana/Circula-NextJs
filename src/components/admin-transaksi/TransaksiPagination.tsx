import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TransaksiPaginationProps {
  displayedCount: number;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  selectedBulan: string;
  onPageChange: (page: number) => void;
}

export default function TransaksiPagination({
  displayedCount,
  totalCount,
  currentPage,
  totalPages,
  selectedBulan,
  onPageChange,
}: TransaksiPaginationProps) {
  // Generate page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="p-4 sm:p-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
      <div>
        Menampilkan <span className="font-semibold text-text-primary">{displayedCount}</span> dari{" "}
        <span className="font-semibold text-text-primary">{totalCount}</span> transaksi bulan {selectedBulan}
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer text-text-primary font-medium"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Sebelumnya</span>
        </button>

        {pageNumbers.map((p) => {
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-dark-container text-white shadow-2xs"
                  : "border border-gray-200 hover:bg-gray-50 text-text-primary"
              }`}
            >
              {p}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer text-text-primary font-medium"
        >
          <span>Selanjutnya</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
