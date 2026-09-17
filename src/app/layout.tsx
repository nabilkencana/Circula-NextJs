import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/ToastProvider";
import TenantKeyModal from "@/components/ui/TenantKeyModal";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CIRCULA — Bank Sampah Digital & Daur Ulang Multi-Tenant (UKK Paket A)",
  description:
    "Platform digital multi-tenant pengelolaan sampah terintegrasi: timbangan digital akurat, indeks harga pasar transparan, dan penukaran poin reward instan untuk lingkungan bebas sampah.",
  keywords: [
    "Bank Sampah",
    "Circula",
    "Daur Ulang",
    "Eco-Waste Management",
    "UKK RPL 2026",
    "SMK Telkom Malang",
    "Tukar Poin Sampah",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} scroll-smooth`}>
      <body className="bg-surface-card text-text-primary min-h-screen flex flex-col font-sans selection:bg-brand-neon selection:text-text-primary">
        <ToastProvider>
          {children}
          {/* Global x-app-key hydration modal — shown once on first visit */}
          <TenantKeyModal />
        </ToastProvider>
      </body>
    </html>
  );
}
