/**
 * @file Footer.tsx
 * @description Komponen footer universal untuk area publik Circula (Landing page, Katalog, Histori, Pengajuan).
 * Menampilkan identitas merek, sertifikasi standar lingkungan ISO 14001,
 * tautan rute layanan utama, direktori edukasi 3R, serta kontak informasi operasional loket.
 * 
 * @module Components/Layout/Footer
 */

import React from "react";
import Link from "next/link";
import { Leaf, ShieldCheck } from "lucide-react";

/**
 * Komponen Footer Publik Circula
 * 
 * @component
 * @returns {JSX.Element} Bagian kaki halaman berstruktur 4-kolom responsif dengan palet warna abu-abu bersih.
 */
export default function Footer() {
  return (
    <footer 
      aria-label="Kaki Halaman Publik Circula"
      className="border-t border-gray-100 bg-[#F9F9F8] pt-14 pb-10 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-xs">
          
          {/* ========================================================================= */}
          {/* KOLOM 1: IDENTITAS BRAND & BADGE SERTIFIKASI MUTU LINGKUNGAN              */}
          {/* ========================================================================= */}
          <div className="space-y-3.5">
            {/* Logo dan Teks Merk */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#111315] flex items-center justify-center text-[#CEF241] shadow-xs">
                <Leaf className="w-4 h-4 fill-[#CEF241]" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm tracking-wider text-gray-900 leading-none uppercase">
                  CIRCULA
                </span>
                <span className="text-[9px] font-semibold tracking-wide text-gray-500 uppercase mt-0.5">
                  BANK SAMPAH DIGITAL
                </span>
              </div>
            </div>

            {/* Narasi Ringkas Misi Lingkungan */}
            <p className="text-gray-500 leading-relaxed max-w-xs">
              Platform bank sampah digital terintegrasi untuk mendukung percepatan ekonomi sirkular ramah lingkungan di Indonesia.
            </p>

            {/* Lencana Verifikasi ISO 14001 */}
            <div className="pt-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200/80 text-[11px] font-semibold text-gray-700 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                <span>ISO 14001 Certified</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* KOLOM 2: TAUTAN LAYANAN OPERASIONAL NASABAH & PARTNER                     */}
          {/* ========================================================================= */}
          <div>
            <h3 className="font-extrabold text-gray-900 uppercase tracking-wider mb-3.5 text-xs">
              LAYANAN
            </h3>
            <ul className="space-y-2.5 text-gray-600 font-medium">
              <li>
                <Link href="/kategori-sampah" className="hover:text-black transition-colors">
                  Katalog Jenis Sampah
                </Link>
              </li>
              <li>
                <Link href="/setor/ajukan" className="hover:text-black transition-colors">
                  Setor Sampah Mandiri
                </Link>
              </li>
              <li>
                <Link href="/setor/ajukan" className="hover:text-black transition-colors">
                  Penjemputan Armada
                </Link>
              </li>
              <li>
                <Link href="/admin/register" className="hover:text-black transition-colors">
                  Kemitraan Komersial
                </Link>
              </li>
            </ul>
          </div>

          {/* ========================================================================= */}
          {/* KOLOM 3: PANDUAN EDUKASI 3R & PUSAT BANTUAN                              */}
          {/* ========================================================================= */}
          <div>
            <h3 className="font-extrabold text-gray-900 uppercase tracking-wider mb-3.5 text-xs">
              EDUKASI &amp; INFO
            </h3>
            <ul className="space-y-2.5 text-gray-600 font-medium">
              <li>
                <Link href="/kategori-sampah" className="hover:text-black transition-colors">
                  Panduan Pemilahan 3R
                </Link>
              </li>
              <li>
                <Link href="/kategori-sampah" className="hover:text-black transition-colors">
                  Standar Nilai Konversi
                </Link>
              </li>
              <li>
                <Link href="/#alur-setor" className="hover:text-black transition-colors">
                  Pusat Bantuan &amp; FAQ
                </Link>
              </li>
              <li>
                <Link href="/#" className="hover:text-black transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>

          {/* ========================================================================= */}
          {/* KOLOM 4: INFORMASI KONTAK DAN JAM OPERASIONAL LOKET                       */}
          {/* ========================================================================= */}
          <div>
            <h3 className="font-extrabold text-gray-900 uppercase tracking-wider mb-3.5 text-xs">
              KONTAK LOKET
            </h3>
            <div className="space-y-2 text-gray-600 font-medium">
              <p>Unit Pusat Grogol, Jakarta Barat</p>
              <p>Senin - Sabtu: 08.00 - 16.30 WIB</p>
              <p>
                <a
                  href="mailto:halo@circula.id"
                  className="font-bold text-gray-900 hover:underline"
                >
                  halo@circula.id
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* BARIS BAWAH: HAK CIPTA & KETERANGAN SISTEM                                */}
        {/* ========================================================================= */}
        <div className="mt-12 pt-6 border-t border-gray-200/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <p>© 2026 Circula Technologies. Hak cipta dilindungi undang-undang.</p>
          <p>Sistem Pengelolaan Sampah Digital Terintegrasi</p>
        </div>
      </div>
    </footer>
  );
}
