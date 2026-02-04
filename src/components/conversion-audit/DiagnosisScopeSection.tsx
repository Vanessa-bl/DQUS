import React from "react";
import { SectionTag } from "./SectionTag";

interface DiagnosisScopeItem {
  title: string;
  copy: string;
}

interface DiagnosisScopeSectionProps {
  tag: string;
  title: string;
  analysisTag: string;
  analysisItems: DiagnosisScopeItem[];
  problemsTag: string;
  problemItems: DiagnosisScopeItem[];
}

export const DiagnosisScopeSection: React.FC<DiagnosisScopeSectionProps> = ({
  tag,
  title,
  analysisTag,
  analysisItems,
  problemsTag,
  problemItems,
}) => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="grid md:grid-cols-12 gap-16 items-start">
        <div className="md:col-span-4">
          <SectionTag>{tag}</SectionTag>
          <h2 className="text-4xl font-extrabold sticky top-32 leading-tight">
            {title}
          </h2>
        </div>
        <div className="md:col-span-8 space-y-20">
          <div>
            <SectionTag>{analysisTag}</SectionTag>
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
            <SectionTag>{problemsTag}</SectionTag>
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
