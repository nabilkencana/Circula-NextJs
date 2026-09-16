import React from "react";
import { Download } from "lucide-react";

interface NasabahTableHeaderProps {
  totalCount: number;
  onExportCsv: () => void;
}

export default function NasabahTableHeader({
  totalCount,
  onExportCsv,
}: NasabahTableHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 bg-white border-b border-gray-200">
      {/* Left: Title & Count Badge */}
      <div className="flex items-center gap-3">
        <h2 className="font-bold text-base text-text-primary tracking-tight">
          Daftar Nasabah Terdaftar
        </h2>
        <span className="bg-inset-gray border border-gray-200 text-xs text-gray-600 px-3 py-1 rounded-full font-semibold">
          {totalCount} Total Data
        </span>
      </div>

      {/* Right: Export CSV Button */}
      <button
        type="button"
        onClick={onExportCsv}
        className="border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-text-primary px-4 py-2 rounded-full flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
      >
        <Download className="w-3.5 h-3.5 text-gray-600" />
        <span>Unduh Data (CSV/Excel)</span>
      </button>
    </div>
  );
}
