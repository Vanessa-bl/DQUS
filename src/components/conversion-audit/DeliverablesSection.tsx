import React from "react";
import { SectionTag } from "./SectionTag";

const deliverables = [
  {
    icon: "description",
    title: "Executive Summary for Stakeholders",
  },
  {
    icon: "list_alt",
    title: "Prioritized Fix List (Low vs High Effort)",
  },
  {
    icon: "camera_alt",
    title: "Annotated Screenshots of Issues",
  },
  {
    icon: "trending_up",
    title: "Expected Impact Estimations",
  },
];

export const DeliverablesSection: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24" id="deliverables">
      <div className="bg-[#9366ff]/5 rounded-3xl p-10 md:p-16 border border-[#9366ff]/10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTag>THE OUTPUT</SectionTag>
            <h2 className="text-4xl font-extrabold mb-8">The PDF Report</h2>
            <p className="text-lg text-gray-600 mb-10 font-medium">
              This isn&apos;t an automated scan. It&apos;s a curated, human-written
              document containing:
            </p>
            <ul className="space-y-6">
              {deliverables.map((item) => (
                <li key={item.title} className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#9366ff]">
                    <span className="material-symbols-outlined">
                      {item.icon}
                    </span>
                  </span>
                  <span className="font-bold text-gray-800">{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 flex flex-col gap-5 overflow-hidden">
            <div className="h-4 w-1/3 bg-[#9366ff]/20 rounded-full"></div>
            <div className="h-10 w-3/4 bg-[#9366ff] rounded-lg"></div>
            <div className="h-40 w-full bg-gray-50 rounded-xl mt-4"></div>
            <div className="space-y-4 mt-4">
              <div className="h-3 w-full bg-gray-50 rounded-full"></div>
              <div className="h-3 w-full bg-gray-50 rounded-full"></div>
              <div className="h-3 w-2/3 bg-gray-50 rounded-full"></div>
            </div>
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#9366ff]/10 rounded-full blur-3xl"></div>
            <div className="absolute top-6 right-6 opacity-10">
              <span className="material-symbols-outlined text-9xl">
                picture_as_pdf
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
