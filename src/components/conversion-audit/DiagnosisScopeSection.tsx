import React from "react";
import { SectionTag } from "./SectionTag";

const analysisItems = [
  {
    title: "Technical Foundation",
    copy: "We measure LCP, CLS, and FID metrics to ensure your technical performance isn't scaring off users before the page even loads.",
  },
  {
    title: "Cognitive Load & Copy",
    copy: "Evaluation of headline clarity, value proposition positioning, and the '5-second test' effectiveness across landing pages.",
  },
  {
    title: "UX Friction Points",
    copy: "Identifying 'dead-clicks', confusing navigation patterns, and form abandonment triggers in your funnel.",
  },
];

const problemItems = [
  {
    title: "Conversion Leaks",
    copy: "Specific steps in your checkout or signup flow where users drop off at higher-than-average rates.",
  },
  {
    title: "Device Inconsistency",
    copy: "Breakages on specific mobile browsers or screen resolutions that are invisible on desktop.",
  },
];

export const DiagnosisScopeSection: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="grid md:grid-cols-12 gap-16 items-start">
        <div className="md:col-span-4">
          <SectionTag>Audit Details</SectionTag>
          <h2 className="text-4xl font-extrabold sticky top-32 leading-tight">
            The Diagnosis Scope
          </h2>
        </div>
        <div className="md:col-span-8 space-y-20">
          <div>
            <SectionTag>WHAT IT ANALYZES</SectionTag>
            <div className="grid gap-10 mt-6">
              {analysisItems.map((item) => (
                <div key={item.title}>
                  <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    {item.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionTag>PROBLEMS IT DETECTS</SectionTag>
            <div className="grid gap-8 mt-6">
              {problemItems.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-5 p-6 rounded-2xl border border-gray-100 bg-white shadow-sm"
                >
                  <span className="material-symbols-outlined text-[#9366ff] text-3xl">
                    warning
                  </span>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-gray-500 font-medium">{item.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
