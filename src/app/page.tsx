import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import MissionSection from "@/components/landing/MissionSection";
import SolutionsSection from "@/components/landing/SolutionsSection";
import WasteCatalogSection from "@/components/landing/WasteCatalogSection";
import WorkflowSection from "@/components/landing/WorkflowSection";
import PreFooterCTA from "@/components/landing/PreFooterCTA";
import Footer from "@/components/layout/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-text-primary font-sans antialiased flex flex-col selection:bg-brand-neon selection:text-text-primary">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <MissionSection />
        <SolutionsSection />
        <WasteCatalogSection />
        <WorkflowSection />
        <PreFooterCTA />
      </main>
      <Footer />
    </div>
  );
}
