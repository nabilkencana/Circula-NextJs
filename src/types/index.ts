export interface WasteCategory {
  id: string;
  name: string;
  category: "Plastik" | "Kertas" | "Logam" | "Kaca";
  pricePerKg: number;
  pointsPerKg: number;
  color: string;
  badgeBg: string;
  image: string;
  desc: string;
}

export interface WorkflowStep {
  stepNumber: string;
  title: string;
  desc: string;
  iconName: "Recycle" | "FileText" | "Scale" | "Gift";
  tagline: string;
}

export * from "./kategoriSampah";
export * from "./setorSampah";
export * from "./historiSetor";
export * from "./tukarPoin";
export * from "./nota";
export * from "./auth";
export * from "./adminAuth";
