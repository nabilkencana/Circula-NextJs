/**
 * @file layout.tsx
 * @description Tata letak akar (Root Layout) untuk seluruh aplikasi Next.js Circula App Router.
 * Mengonfigurasi metadata SEO aplikasi, tipografi modern Plus Jakarta Sans,
 * penyedia konteks notifikasi toast global (`ToastProvider`), pelindung otorisasi rute (`RouteGuard`),
 * inisialisasi background seed (`AppSeedInitializer`), serta modal konfigurasi kunci tenant (`TenantKeyModal`).
 * 
 * @module App/RootLayout
 */

import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/ToastProvider";
import TenantKeyModal from "@/components/ui/TenantKeyModal";
import AppSeedInitializer from "@/components/ui/AppSeedInitializer";
import RouteGuard from "@/components/auth/RouteGuard";

// Konfigurasi Tipografi Utama Google Font: Plus Jakarta Sans
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

/**
 * Metadata global aplikasi Circula untuk kebutuhan indexing dan SEO
 */
export const metadata: Metadata = {
  title: "CIRCULA — Bank Sampah Digital & Daur Ulang Terintegrasi",
  description:
    "Platform digital multi-tenant pengelolaan sampah terintegrasi: timbangan digital akurat, indeks harga pasar transparan, dan penukaran poin reward instan untuk lingkungan bebas sampah.",
  keywords: [
    "Bank Sampah",
    "Circula",
    "Daur Ulang",
    "Eco-Waste Management",
    "Ekonomi Sirkular",
    "Sistem Bank Sampah Modern",
    "Tukar Poin Sampah",
  ],
};

/**
 * Komponen RootLayout
 * 
 * @component
 * @param {{ children: React.ReactNode }} props - Komponen halaman turunan.
 * @returns {JSX.Element} Elemen HTML root dengan provider global dan konfigurasi font.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} scroll-smooth`}>
      <body className="bg-surface-card text-text-primary min-h-screen flex flex-col font-sans selection:bg-brand-neon selection:text-text-primary">
        {/* Penyedia Konteks Notifikasi Global */}
        <ToastProvider>
          {/* Batas Pelindung Otorisasi Rute Pengguna */}
          <RouteGuard>
            {children}
          </RouteGuard>
          
          {/* Komponen Inisialisasi Database Seeding Latar Belakang */}
          <AppSeedInitializer />
          
          {/* Modal Setup App Key Multi-Tenant saat Pertama Kali Diakses */}
          <TenantKeyModal />
        </ToastProvider>
      </body>
    </html>
  );
}
