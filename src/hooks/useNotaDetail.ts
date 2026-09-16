"use client";

import { useState, useEffect } from "react";
import { TipeNota, NotaSetorDetail, NotaTukarDetail } from "@/types/nota";
import {
  getNotaSetorById,
  getNotaTukarById,
  MOCK_NOTA_SETOR,
  MOCK_NOTA_TUKAR,
} from "@/services/notaService";

export function useNotaDetail(id: string) {
  const isTkrInitial = id ? id.toUpperCase().startsWith("TKR") : false;

  const [activeTab, setActiveTab] = useState<TipeNota>(isTkrInitial ? "tukar" : "setor");
  const [notaSetor, setNotaSetor] = useState<NotaSetorDetail>(MOCK_NOTA_SETOR);
  const [notaTukar, setNotaTukar] = useState<NotaTukarDetail>(MOCK_NOTA_TUKAR);
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
        // use fallback
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
