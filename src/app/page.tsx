import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import MissionSection from "@/components/landing/MissionSection";
import SolutionsSection from "@/components/landing/SolutionsSection";
import WasteCatalogSection from "@/components/landing/WasteCatalogSection";
import WorkflowSection from "@/components/landing/WorkflowSection";
import PreFooterCTA from "@/components/landing/PreFooterCTA";
import Footer from "@/components/layout/Footer";

/**
 * Halaman Beranda Utama Aplikasi (Landing Page - Route `/`)
 *
 * Titik masuk utama (entry point) aplikasi web Circula Bank Sampah Digital.
 * Dikonstruksi sebagai React Server Component (RSC) berkinerja tinggi yang menggabungkan:
 * 1. `Navbar`: Bar navigasi universal dengan tautan menu dan tombol masuk/daftar.
 * 2. `HeroSection`: Pembuka beranda dengan visual fasilitas modern dan 3 kartu deck keunggulan.
 * 3. `MissionSection`: Penjelasan 3 pilar transparansi insentif daur ulang ramah lingkungan.
 * 4. `SolutionsSection`: Solusi terpadu pengelola loket unit operasional dengan metrik efisiensi.
 * 5. `WasteCatalogSection`: 4 kartu harga sampah baku nasional & kalkulator simulasi nilai setor.
 * 6. `WorkflowSection`: 4 langkah alur kerja penyetoran sampah dari rumah tangga.
 * 7. `PreFooterCTA`: Banner ajakan registrasi akun sebelum footer.
 * 8. `Footer`: Catatan hak cipta, navigasi tautan kebijakan privasi, dan media sosial.
 *
 * @returns JSX Element struktur utuh halaman landing page Circula
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-text-primary font-sans antialiased flex flex-col selection:bg-brand-neon selection:text-text-primary">
      {/* Navigasi Bar Global */}
      <Navbar />

      {/* Konten Utama Beranda */}
      <main className="flex-1">
        {/* Seksi 1: Hero & Nilai Proposisi */}
        <HeroSection />

        {/* Seksi 2: Visi Misi & 3 Pilar Transparansi */}
        <MissionSection />

        {/* Seksi 3: Solusi Cerdas untuk Unit & Pengelola Sampah */}
        <SolutionsSection />

        {/* Seksi 4: Katalog 4 Kategori Sampah & Kalkulator Live */}
        <WasteCatalogSection />

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
