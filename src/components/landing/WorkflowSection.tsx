import React from "react";
import { Recycle, FileText, Scale, Gift, CheckCircle2 } from "lucide-react";
import { WORKFLOW_STEPS } from "@/data/landingData";

const iconMap = {
  Recycle,
  FileText,
  Scale,
  Gift,
};

export default function WorkflowSection() {
  return (
    <section id="alur-setor" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="bg-inset-gray rounded-3xl p-6 sm:p-10 md:p-14 border border-gray-200">
        {/* Header - Clean without badge */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            Bagaimana Cara Kerja Bank Sampah Digital Circula?
          </h2>
          <p className="text-text-secondary text-sm sm:text-base mt-2 leading-relaxed">
            4 langkah mudah menyulap limbah rumah tangga menjadi pundi tabungan dan reward
            eksklusif.
          </p>
        </div>

        {/* 4-Step Flow Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {WORKFLOW_STEPS.map((step) => {
            const IconComponent = iconMap[step.iconName];
            return (
              <div
                key={step.stepNumber}
                className="bg-white rounded-2xl p-6 border border-gray-200 relative flex flex-col justify-between hover:shadow-lg transition-all hover:border-gray-400"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-dark-container text-brand-neon flex items-center justify-center font-bold text-lg mb-5 shadow-sm">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">
                    Langkah {step.stepNumber}
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mt-1">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{step.tagline}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
