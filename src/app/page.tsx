import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import MissionSection from "@/components/landing/MissionSection";
import SolutionsSection from "@/components/landing/SolutionsSection";
import WasteCatalogSection from "@/components/landing/WasteCatalogSection";
import WorkflowSection from "@/components/landing/WorkflowSection";
import PreFooterCTA from "@/components/landing/PreFooterCTA";
import Footer from "@/components/layout/Footer";
import { WasteCategory } from "@/types";
import { UKK_WASTE_CATEGORIES } from "@/data/landingData";

/** Base URL API backend Circula */
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://learn.smktelkom-mlg.sch.id/bank_sampah";

/** App Key tenant aktif — prioritas env variable */
const APP_KEY =
  process.env.NEXT_PUBLIC_DEFAULT_APP_KEY ||
  "1d99c078-9a3f-45e0-978e-8e0806338593";

/**
 * Metadata warna dan gambar per jenis sampah untuk rendering katalog.
 * Karena API tidak mengembalikan warna/gambar, kita perkaya dengan metadata visual ini.
 */
const JENIS_METADATA: Record<
  string,
  { color: string; badgeBg: string; image: string; categoryLabel: WasteCategory["category"] }
> = {
  plastik: {
    color: "#3B82F6",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
    image:
      "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=600&q=80",
    categoryLabel: "Plastik",
  },
  kertas: {
    color: "#F59E0B",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
    image:
      "https://images.unsplash.com/photo-1507560461415-997cd00bfd45?auto=format&fit=crop&w=600&q=80",
    categoryLabel: "Kertas",
  },
  logam: {
    color: "#10B981",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    image:
      "https://images.unsplash.com/photo-1561503412-852800622772?auto=format&fit=crop&w=600&q=80",
    categoryLabel: "Logam",
  },
  kaca: {
    color: "#8B5CF6",
    badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
    image:
      "https://images.unsplash.com/photo-1608745167260-e15bc0e0521f?auto=format&fit=crop&w=600&q=80",
    categoryLabel: "Kaca",
  },
};

/**
 * Mengambil daftar kategori sampah aktif dari API backend secara server-side.
 * Jika gagal (jaringan putus / API error), mengembalikan array kosong agar
 * komponen dapat fallback ke data statis dari `landingData.ts`.
 */
async function fetchKategoriSampah(): Promise<WasteCategory[]> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/kategori-sampah`, {
      headers: { "x-app-key": APP_KEY },
      next: { revalidate: 300 }, // Cache 5 menit (ISR)
    });
    if (!res.ok) return [];
    const json = await res.json();
    if (!json.success || !Array.isArray(json.data)) return [];

    // Mapping dari KategoriSampah (API) ke WasteCategory (landing UI)
    return json.data
      .filter((item: { isActive?: boolean }) => item.isActive !== false)
      .map(
        (item: {
          id?: string;
          namaKategori?: string;
          jenisSampah?: string;
          jenis?: string;
          deskripsi?: string;
          syaratKondisi?: string;
          hargaPerKg?: number | string;
          poinPerKg?: number | string;
          imageUrl?: string;
          foto?: string;
        }): WasteCategory => {
          const jenisRaw = (
            (item.jenisSampah ?? item.jenis ?? "plastik") as string
          ).toLowerCase();
          const meta =
            JENIS_METADATA[jenisRaw] ?? JENIS_METADATA["plastik"];

          return {
            id: item.id ?? String(Math.random()),
            name: item.namaKategori ?? "Kategori Sampah",
            category: meta.categoryLabel,
            pricePerKg: Number(item.hargaPerKg) || 0,
            pointsPerKg: Number(item.poinPerKg) || 0,
            color: meta.color,
            badgeBg: meta.badgeBg,
            image:
              item.imageUrl && item.imageUrl.startsWith("http")
                ? item.imageUrl
                : item.foto && (item.foto as string).startsWith("http")
                ? item.foto as string
                : meta.image,
            desc:
              item.syaratKondisi ||
              item.deskripsi ||
              `Sampah ${jenisRaw} bersih dan kering siap timbang.`,
          };
        }
      );
  } catch {
    return [];
  }
}

/**
 * Mengambil statistik global bank sampah dari endpoint dashboard/stats.
 * Mengembalikan nilai default jika API tidak tersedia.
 */
async function fetchDashboardStats(): Promise<{
  totalNasabah: number;
  totalKategoriSampah: number;
  totalTransaksiSetor: number;
  totalHadiah: number;
  totalBeratSampahKg: number;
  totalPoinTersalurkan: number;
}> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/dashboard/stats`, {
      headers: { "x-app-key": APP_KEY },
      next: { revalidate: 300 }, // Cache 5 menit (ISR)
    });
    if (!res.ok) return { totalNasabah: 0, totalKategoriSampah: 0, totalTransaksiSetor: 0, totalHadiah: 0, totalBeratSampahKg: 0, totalPoinTersalurkan: 0 };
    const json = await res.json();
    if (!json.success) return { totalNasabah: 0, totalKategoriSampah: 0, totalTransaksiSetor: 0, totalHadiah: 0, totalBeratSampahKg: 0, totalPoinTersalurkan: 0 };
    return json.data;
  } catch {
    return { totalNasabah: 0, totalKategoriSampah: 0, totalTransaksiSetor: 0, totalHadiah: 0, totalBeratSampahKg: 0, totalPoinTersalurkan: 0 };
  }
}

/**
 * Halaman Beranda Utama Aplikasi (Landing Page - Route `/`)
 *
 * Dikonstruksi sebagai React Server Component (RSC) berkinerja tinggi dengan:
 * - Pengambilan data real-time dari API backend via server-side fetch (ISR 5 menit).
 * - Fallback otomatis ke data statis `landingData.ts` jika API tidak tersedia.
 * - Tidak ada loading state tambahan — data sudah tersedia saat HTML dikirim ke browser.
 *
 * Data yang di-fetch server-side:
 * - `kategoriList`: Daftar kategori sampah aktif untuk katalog & kalkulator.
 * - `stats`: Statistik global (total nasabah, kategori, transaksi, dll).
 */
export default async function LandingPage() {
  // Ambil data paralel dari 2 endpoint API secara bersamaan di server
  const [apiCategories, stats] = await Promise.all([
    fetchKategoriSampah(),
    fetchDashboardStats(),
  ]);

  // Fallback ke data statis jika API belum memiliki kategori
  const categories =
    apiCategories.length > 0 ? apiCategories : UKK_WASTE_CATEGORIES;

  return (
    <div className="min-h-screen bg-white text-text-primary font-sans antialiased flex flex-col selection:bg-brand-neon selection:text-text-primary">
      {/* Navigasi Bar Global */}
      <Navbar />

      {/* Konten Utama Beranda */}
      <main className="flex-1">
        {/* Seksi 1: Hero & Nilai Proposisi (dengan data real nasabah & kategori) */}
        <HeroSection
          totalNasabah={stats.totalNasabah}
          totalKategori={stats.totalKategoriSampah}
        />

        {/* Seksi 2: Visi Misi & 3 Pilar Transparansi (dengan data real volume & transaksi) */}
        <MissionSection
          totalBeratKg={stats.totalBeratSampahKg}
          totalTransaksi={stats.totalTransaksiSetor}
        />

        {/* Seksi 3: Solusi Cerdas untuk Unit & Pengelola Sampah */}
        <SolutionsSection />

        {/* Seksi 4: Katalog Kategori Sampah Real & Kalkulator Live */}
        <WasteCatalogSection categories={categories} />

        {/* Seksi 5: 4 Tahap Alur Kerja Penyetoran */}
        <WorkflowSection />

        {/* Seksi 6: Call To Action Registrasi Pengguna Baru */}
        <PreFooterCTA />
      </main>

      {/* Footer Global */}
      <Footer />
    </div>
  );
}
