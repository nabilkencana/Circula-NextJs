import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Star, Recycle, Box, Sparkles } from "lucide-react";
import { KategoriSampah } from "@/types/kategoriSampah";

/**
 * Interface properties untuk komponen kartu item katalog sampah (KatalogCard).
 */
interface KatalogCardProps {
  /** Objek data kategori sampah yang ditampilkan */
  item: KategoriSampah;
  /** Callback untuk membuka dialog popup kalkulator estimasi poin */
  onOpenEstimator: (item: KategoriSampah) => void;
}

/**
 * Pemetaan kelas warna lencana (badge) Tailwind berdasarkan klasifikasi jenis material
 */
const BADGE_COLOR_MAP: Record<string, string> = {
  plastik: "bg-dark-container/90 text-brand-neon border-brand-neon/40",
  kertas: "bg-dark-container/90 text-amber-300 border-amber-300/40",
  logam: "bg-dark-container/90 text-emerald-300 border-emerald-300/40",
  kaca: "bg-dark-container/90 text-cyan-300 border-cyan-300/40",
};

/**
 * Komponen Kartu Produk Katalog Sampah (KatalogCard)
 *
 * Menampilkan ringkasan informasi material anorganik:
 * 1. Thumbnail Foto: Dioptimalkan dengan Next.js Image dan fallback ilustrasi jika URL gambar rusak.
 * 2. Badge Kategori: Indikator jenis material dengan aksen warna khusus.
 * 3. Nama & Syarat Kondisi: Petunjuk kelayakan sampah sebelum disetorkan.
 * 4. Inset Tarif Harga & Poin: Harga beli per kg (Rp/kg) dan bonus poin per kg.
 * 5. Tombol Aksi: Membuka modal kalkulator simulasi reward instan.
 *
 * @param props Properti item kategori sampah
 * @returns JSX Element kartu katalog sampah
 */
export default function KatalogCard({ item, onOpenEstimator }: KatalogCardProps) {
  // State untuk menangani URL gambar yang gagal dimuat
  const [imgError, setImgError] = useState<boolean>(false);

  // Resolusi styling lencana kategori
  const badgeClass =
    BADGE_COLOR_MAP[item.jenisSampah] ||
    "bg-dark-container/90 text-white border-white/20";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
      {/* ================= FOTO THUMBNAIL & LENCANA KATEGORI ================= */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
        {!imgError && item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.namaKategori}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          /* Fallback visual jika citra gambar tidak ditemukan */
          <div className="w-full h-full bg-linear-to-br from-emerald-50 to-slate-100 flex flex-col items-center justify-center p-4 text-center">
            <Recycle className="w-10 h-10 text-emerald-600/60 mb-1 animate-pulse" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              {item.namaKategori}
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span
            className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md ${badgeClass}`}
          >
            {item.jenisSampah}
          </span>
        </div>
      </div>

      {/* ================= KONTEN INFORMASI & TARIF ================= */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-base text-text-primary leading-snug group-hover:text-emerald-700 transition-colors">
            {item.namaKategori}
          </h3>
          <p className="text-xs text-text-secondary mt-1.5 line-clamp-2 leading-relaxed">
            {item.syaratKondisi || item.deskripsi}
          </p>
        </div>

        {/* Panel Inset Harga Beli & Reward Poin */}
        <div className="mt-5 pt-3 border-t border-gray-200/80">
          <div className="grid grid-cols-2 gap-2 bg-inset-gray p-3 rounded-xl border border-gray-200 mb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-text-secondary block">
                Harga Beli / Kg
              </span>
              <span className="text-sm sm:text-base font-extrabold text-text-primary">
                Rp {item.hargaPerKg.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-text-secondary block">
                Nilai Reward
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-text-primary inline-flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {item.poinPerKg} Poin / kg
              </span>
            </div>
          </div>

          {/* Tombol Ajukan Setor / Buka Kalkulator Estimasi */}
          <button
            onClick={() => onOpenEstimator(item)}
            className="w-full border border-gray-200 hover:bg-brand-neon hover:border-brand-neon hover:text-text-primary text-text-primary text-xs font-bold py-2.5 rounded-full flex items-center justify-center gap-1.5 transition-all group/btn cursor-pointer shadow-sm hover:shadow"
          >
            <span>Ajukan Setor Ini</span>
            <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover/btn:text-text-primary group-hover/btn:translate-x-0.5 transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
}

