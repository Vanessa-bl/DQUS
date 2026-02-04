import React from "react";
import { SectionTag } from "./SectionTag";

interface PricingSectionProps {
  tag: string;
  title: string;
  price: string;
  feeLabel: string;
  description: string;
  button: string;
  availability: string;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  tag,
  title,
  price,
  feeLabel,
  description,
  button,
  availability,
}) => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-32 text-center" id="pricing">
      <SectionTag className="mb-6">{tag}</SectionTag>
      <h2 className="text-4xl font-extrabold mb-12">{title}</h2>
      <div className="max-w-xl mx-auto p-12 rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-[#9366ff]/5">
        <div className="text-7xl font-extrabold mb-4 text-gray-900">
          {price}
        </div>
        <div className="text-[#9366ff] font-bold uppercase tracking-widest text-xs mb-10">
          {feeLabel}
        </div>
        <p className="text-gray-500 mb-12 leading-relaxed font-medium">
          {description}
        </p>
        <button type="button" className="btn-primary w-full mb-6">
          {button}
        </button>
        <p className="text-sm text-gray-400 font-medium">{availability}</p>
      </div>
    </section>
  );
};
