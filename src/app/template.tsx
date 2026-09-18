/**
 * @file template.tsx
 * @description Komponen template halaman Next.js App Router.
 * Merender pembungkus animasi transisi halus (`animate-page-enter`)
 * setiap kali pengguna berpindah antar rute dalam aplikasi Circula.
 * 
 * @module App/Template
 */

"use client";

import React from "react";

/**
 * Komponen Template Pembungkus Animasi Halaman
 * 
 * @component
 * @param {{ children: React.ReactNode }} props - Komponen halaman yang sedang aktif.
 * @returns {JSX.Element} Elemen div flex-1 dengan kelas animasi transisi masuk.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-page-enter flex-1 flex flex-col">
      {children}
    </div>
  );
}
