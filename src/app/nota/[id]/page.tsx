import React from "react";
import NotaPageClient from "./NotaPageClient";

export default async function NotaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <NotaPageClient id={id} />;
}
