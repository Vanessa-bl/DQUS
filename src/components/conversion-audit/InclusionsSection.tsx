import React from "react";

const includedItems = [
  "Complete UX Friction Audit",
  "Technical Performance Benchmark",
  "Copy Clarity Analysis",
  "Actionable Improvement Checklist",
  "Final PDF Executive Report",
];

const excludedItems = [
  "Implementation or Coding",
  "Graphic Design or UI Assets",
  "Ongoing SEO Management",
  "Content Writing Services",
  "Advertising/PPC Management",
];

export const InclusionsSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-24 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="p-12">
              <h3 className="text-xl font-extrabold mb-10 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#9366ff]/10 flex items-center justify-center text-[#9366ff]">
                  <span className="material-symbols-outlined text-[20px]">
                    task_alt
                  </span>
                </span>
                Included
              </h3>
              <ul className="space-y-4">
                {includedItems.map((item) => (
                  <li
                    key={item}
                    className="pb-4 border-b border-gray-50 flex items-center justify-between text-gray-700 font-medium last:border-b-0"
                  >
                    {item}
                    <span className="material-symbols-outlined text-[#9366ff] text-sm">
                      check
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-12 bg-gray-50/50">
              <h3 className="text-xl font-extrabold mb-10 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500">
                  <span className="material-symbols-outlined text-[20px]">
                    block
                  </span>
                </span>
                Not Included
              </h3>
              <ul className="space-y-4 text-gray-500 font-medium">
                {excludedItems.map((item) => (
                  <li
                    key={item}
                    className="pb-4 border-b border-gray-200 flex items-center justify-between last:border-b-0"
                  >
                    {item}
                    <span className="material-symbols-outlined text-gray-300 text-sm">
                      close
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
