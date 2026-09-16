import React from "react";
import { Search, Plus } from "lucide-react";
import { JenisSampah } from "@/types/adminKategori";

interface KategoriToolbarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedJenis: "semua" | JenisSampah;
  onJenisChange: (jenis: "semua" | JenisSampah) => void;
  onOpenCreate: () => void;
}

export default function KategoriToolbar({
  searchQuery,
  onSearchChange,
  selectedJenis,
  onJenisChange,
  onOpenCreate,
}: KategoriToolbarProps) {
  const categories: { label: string; value: "semua" | JenisSampah }[] = [
    { label: "Semua Kategori", value: "semua" },
    { label: "Plastik", value: "plastik" },
    { label: "Kertas", value: "kertas" },
    { label: "Logam", value: "logam" },
    { label: "Kaca", value: "kaca" },
  ];

  return (
    <section
      className="max-w-7xl mx-auto pt-8 pb-3 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4"
      aria-label="Toolbar Pencarian dan Filter Kategori"
    >
      {/* Left: Search Input & Category Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
        {/* Search Bar */}
        <div className="relative flex-1 sm:w-80 md:w-96">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari kategori material sampah..."
            className="w-full h-11 sm:h-12 pl-11 pr-4 rounded-full border border-gray-200 bg-inset-gray text-xs sm:text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:border-brand-neon focus:bg-white focus:ring-2 focus:ring-brand-neon/30 transition-all shadow-2xs"
          />
        </div>

        {/* Category Filter Segment Pills */}
        <div className="bg-[#F4F5F4] p-1 rounded-full flex items-center gap-1 shrink-0 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => onJenisChange(cat.value)}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedJenis === cat.value
                  ? "bg-dark-container text-white shadow-xs"
                  : "text-text-secondary hover:text-text-primary font-semibold"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right: CTA "+ Tambah Kategori Baru" */}
      <div className="shrink-0 flex justify-end">
        <button
          type="button"
          onClick={onOpenCreate}
          className="w-full sm:w-auto bg-brand-neon hover:bg-brand-neon-hover text-text-primary font-bold text-xs sm:text-sm px-6 py-3 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Tambah Kategori Baru</span>
        </button>
      </div>
    </section>
  );
}
