import React from "react";
import { SectionTag } from "./SectionTag";

const steps = [
  {
    number: "01",
    title: "Onboarding & Access",
    copy: "You provide URL and brief context. We request temporary read-only access to your analytics to see real-world behavior.",
  },
  {
    number: "02",
    title: "Deep-Dive Analysis",
    copy: "Our specialists manually audit your site through 50+ conversion checkpoints using our proprietary diagnostic framework.",
  },
  {
    number: "03",
    title: "The PDF Delivery",
    copy: "Receive a comprehensive PDF report with clear, ranked action items to improve your site's conversion rate immediately.",
  },
];

export const ProcessSection: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-32" id="process">
      <div className="text-center mb-20">
        <SectionTag>How it works</SectionTag>
        <h2 className="text-4xl font-extrabold">Our 3-Step Process</h2>
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
