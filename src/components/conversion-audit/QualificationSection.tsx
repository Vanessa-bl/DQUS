import React from "react";
import { SectionTag } from "./SectionTag";

const forYouItems = [
  "You have an established product with steady traffic.",
  "You want to optimize existing conversion paths for better ROI.",
  "You suspect your UX or copy is causing friction.",
];

const notForYouItems = [
  "You are in the pre-launch phase with zero traffic.",
  "You need a full website redesign from scratch.",
  "You are looking for long-term SEO or marketing management.",
];

export const QualificationSection: React.FC = () => {
  return (
    <section className="bg-[#f8f7ff] border-y border-gray-100 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTag>Qualification</SectionTag>
        <h2 className="text-4xl font-extrabold mb-16">Is this for you?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-10 rounded-2xl border border-white bg-white shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 mb-6">
              <span className="material-symbols-outlined text-3xl">
                check_circle
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-6">For you if</h3>
            <ul className="space-y-4 text-gray-600 leading-relaxed font-medium">
              {forYouItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="material-symbols-outlined text-green-600 text-[20px]">
                    check
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-10 rounded-2xl border border-white bg-white shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600 mb-6">
              <span className="material-symbols-outlined text-3xl">
                cancel
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-6">Not for you if</h3>
            <ul className="space-y-4 text-gray-600 leading-relaxed font-medium">
              {notForYouItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="material-symbols-outlined text-red-600 text-[20px]">
                    close
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
