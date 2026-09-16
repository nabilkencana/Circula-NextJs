import React from "react";
import { TransaksiPenyetoran } from "@/types/historiSetor";
import CardMenungguKonfirmasi from "./CardMenungguKonfirmasi";
import CardSelesai from "./CardSelesai";
import CardDitolak from "./CardDitolak";

interface TransactionCardProps {
  transaksi: TransaksiPenyetoran;
}

export default function TransactionCard({ transaksi }: TransactionCardProps) {
  switch (transaksi.status) {
    case "selesai":
      return <CardSelesai transaksi={transaksi} />;
    case "ditolak":
      return <CardDitolak transaksi={transaksi} />;
    case "menunggu_konfirmasi":
    case "diverifikasi":
    default:
      return <CardMenungguKonfirmasi transaksi={transaksi} />;
  }
}
