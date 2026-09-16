import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NasabahPaginationProps {
  displayedCount: number;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function NasabahPagination({
  displayedCount,
  totalCount,
  currentPage,
  totalPages,
  onPageChange,
}: NasabahPaginationProps) {
  // Generate pages to display (1, 2, 3...)
  const pages = Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 bg-white border-t border-gray-200 text-xs text-gray-500">
      {/* Left Text */}
      <p className="text-gray-400 text-xs">
        Menampilkan{" "}
        <span className="font-semibold text-text-primary">{displayedCount}</span> dari{" "}
        <span className="font-semibold text-text-primary">{totalCount}</span> nasabah terdaftar
      </p>

      {/* Right Pagination Controls */}
      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
          className="w-7 h-7 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:text-text-primary hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          aria-label="Halaman sebelumnya"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Page Numbers */}
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ${
              currentPage === p
                ? "bg-dark-container text-white shadow-xs"
                : "text-gray-600 hover:text-text-primary hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        ))}

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage >= totalPages}
          className="w-7 h-7 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:text-text-primary hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          aria-label="Halaman berikutnya"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
