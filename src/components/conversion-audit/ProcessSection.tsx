import React from "react";
import { SectionTag } from "./SectionTag";

interface ProcessStep {
  number: string;
  title: string;
  copy: string;
}

interface ProcessSectionProps {
  tag: string;
  title: string;
  steps: ProcessStep[];
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  tag,
  title,
  steps,
}) => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-32" id="process">
      <div className="text-center mb-20">
        <SectionTag>{tag}</SectionTag>
        <h2 className="text-4xl font-extrabold">{title}</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-12">
        {steps.map((step) => (
          <div key={step.title} className="flex flex-col group">
            <div className="text-6xl font-black text-[#9366ff]/10 mb-6 group-hover:text-[#9366ff]/20 transition-colors">
              {step.number}
            </div>
            <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
            <p className="text-gray-500 leading-relaxed font-medium">
              {step.copy}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
