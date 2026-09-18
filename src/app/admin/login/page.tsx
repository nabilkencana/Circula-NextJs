/**
 * @file page.tsx (Admin Login Redirect Page)
 * @description Halaman pengarah (redirect utility route) untuk rute URL `/admin/login`.
 * Di arsitektur Circula, autentikasi multi-role (Nasabah & Admin Unit) telah disatukan (unified)
 * ke dalam halaman login tunggal dengan capsule switcher role di `/login`.
 * Komponen ini secara otomatis mengalihkan pengguna ke rute resmi `/login`.
 *
 * @author Tim Pengembang Circula
 * @version 1.0.0
 */

import { redirect } from "next/navigation";

/**
 * Komponen AdminLoginRedirectPage
 * 
 * Server Component yang mengeksekusi navigasi pengalihan instan ke `/login`
 * melalui utilitas `redirect` bawaan Next.js App Router.
 */
export default function AdminLoginRedirectPage() {
  redirect("/login");
}
