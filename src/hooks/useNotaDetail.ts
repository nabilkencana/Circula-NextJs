"use client";

import { useState, useEffect } from "react";
import { TipeNota, NotaSetorDetail, NotaTukarDetail } from "@/types/nota";
import {
  getNotaSetorById,
  getNotaTukarById,
} from "@/services/notaService";

/**
 * Custom Hook Manajemen & Pemuatan Data Nota Digital (`useNotaDetail`)
 *
 * Mengatur siklus hidup pengambilan data struk resmi berdasarkan parameter ID transaksi:
 * 1. Mendeteksi secara cerdas tipe nota awal dari prefiks ID:
 *    - Jika ID diawali "TKR", maka otomatis mengaktifkan tab penukaran hadiah (`tukar`).
 *    - Jika ID lainnya (UUID atau diawali "STR"), maka mengaktifkan tab penyetoran sampah (`setor`).
 * 2. Mengelola status pemuatan data (`isLoading`) dan pencegahan memory leak (`isMounted`).
 * 3. Menyediakan fungsi utilitas cetak fisik (`handlePrint`) dan simpan PDF digital (`handleDownloadPdf`)
 *    yang terintegrasi langsung dengan dialog cetak peramban bawaan (`window.print()`).
 *
 * @param id Parameter URL ID transaksi unik atau kode transaksi (STR-XXXX / TKR-XXXX)
 * @returns Objek state nota dan fungsi pengendali cetak
 */
export function useNotaDetail(id: string) {
  // Deteksi awal apakah kode transaksi mengindikasikan penukaran reward
  const isTkrInitial = id ? id.toUpperCase().startsWith("TKR") : false;

  // State tab aktif ('setor' atau 'tukar')
  const [activeTab, setActiveTab] = useState<TipeNota>(isTkrInitial ? "tukar" : "setor");
  // State data nota penyetoran sampah (STR)
  const [notaSetor, setNotaSetor] = useState<NotaSetorDetail | null>(null);
  // State data nota penukaran poin (TKR)
  const [notaTukar, setNotaTukar] = useState<NotaTukarDetail | null>(null);
  // State indikator loading selama proses request ke backend berlangsung
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function loadNota() {
      setIsLoading(true);
      try {
        if (id.toUpperCase().startsWith("TKR")) {
          // Ambil data nota penukaran poin
          const tkrData = await getNotaTukarById(id);
          if (isMounted) {
            setNotaTukar(tkrData);
            setActiveTab("tukar");
          }
        } else {
          // Ambil data nota penyetoran sampah
          const strData = await getNotaSetorById(id);
          if (isMounted) {
            setNotaSetor(strData);
            setActiveTab("setor");
          }
        }
      } catch {
        if (isMounted) {
          setNotaSetor(null);
          setNotaTukar(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (id) {
      loadNota();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  /**
   * Menjalankan dialog cetak browser (terhubung dengan media CSS print)
   */
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  /**
   * Mengunduh nota sebagai berkas PDF melalui printer virtual "Save as PDF" bawaan sistem
   */
  const handleDownloadPdf = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return {
    activeTab,
    setActiveTab,
    notaSetor,
    notaTukar,
    isLoading,
    handlePrint,
    handleDownloadPdf,
  };
}

