/**
 * Interface data kategori sampah untuk tampilan halaman beranda (landing page).
 */
export interface WasteCategory {
  /** Identifier unik kategori sampah */
  id: string;
  /** Nama kategori material */
  name: string;
  /** Kategori material (Plastik, Kertas, Logam, Kaca) */
  category: "Plastik" | "Kertas" | "Logam" | "Kaca";
  /** Harga beli per kilogram (Rp/kg) */
  pricePerKg: number;
  /** Poin reward per kilogram */
  pointsPerKg: number;
  /** Kode warna heksadesimal aksen visual */
  color: string;
  /** Kelas utility Tailwind untuk styling lencana */
  badgeBg: string;
  /** URL citra gambar beresolusi tinggi */
  image: string;
  /** Deskripsi singkat karakteristik sampah */
  desc: string;
}

/**
 * Interface representasi tahapan alur kerja bank sampah pada landing page.
 */
export interface WorkflowStep {
  /** Nomor urut langkah (contoh: "01") */
  stepNumber: string;
  /** Judul instruksi langkah */
  title: string;
  /** Penjelasan detail alur kerja */
  desc: string;
  /** Nama ikon Lucide React */
  iconName: "Recycle" | "FileText" | "Scale" | "Gift";
  /** Tagline status kesiapan */
  tagline: string;
}

// ─── Re-export Barrel Types Ekosistem Circula ─────────────────────────────────
export * from "./kategoriSampah";
export * from "./setorSampah";
export * from "./historiSetor";
export * from "./tukarPoin";
export * from "./nota";
export * from "./auth";
export * from "./adminAuth";

