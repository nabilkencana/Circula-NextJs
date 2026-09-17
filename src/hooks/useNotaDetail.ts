"use client";

import { useState, useEffect } from "react";
import { TipeNota, NotaSetorDetail, NotaTukarDetail } from "@/types/nota";
import {
  getNotaSetorById,
  getNotaTukarById,
} from "@/services/notaService";

export function useNotaDetail(id: string) {
  const isTkrInitial = id ? id.toUpperCase().startsWith("TKR") : false;

  const [activeTab, setActiveTab] = useState<TipeNota>(isTkrInitial ? "tukar" : "setor");
  const [notaSetor, setNotaSetor] = useState<NotaSetorDetail | null>(null);
  const [notaTukar, setNotaTukar] = useState<NotaTukarDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function loadNota() {
      setIsLoading(true);
      try {
        if (id.toUpperCase().startsWith("TKR")) {
          const tkrData = await getNotaTukarById(id);
          if (isMounted) {
            setNotaTukar(tkrData);
            setActiveTab("tukar");
          }
        } else {
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

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

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
