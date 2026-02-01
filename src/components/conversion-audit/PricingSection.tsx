import React from "react";
import { SectionTag } from "./SectionTag";

export const PricingSection: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-32 text-center" id="pricing">
      <SectionTag className="mb-6">INVESTMENT</SectionTag>
      <h2 className="text-4xl font-extrabold mb-12">
        Simple Transparent Pricing
      </h2>
      <div className="max-w-xl mx-auto p-12 rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-[#9366ff]/5">
        <div className="text-7xl font-extrabold mb-4 text-gray-900">
          $1,495
        </div>
        <div className="text-[#9366ff] font-bold uppercase tracking-widest text-xs mb-10">
          One-Time Flat Fee
        </div>
        <p className="text-gray-500 mb-12 leading-relaxed font-medium">
          A fixed investment for a complete diagnostic report. No hidden costs,
          no recurring fees, and a 100% money-back guarantee if we find zero
          critical issues.
        </p>
        <button type="button" className="btn-primary w-full mb-6">
          Get My Diagnosis
        </button>
        <p className="text-sm text-gray-400 font-medium">
          Currently 3 spots available for this month
        </p>
      </div>
    </section>
  );
};
