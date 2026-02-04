import React from "react";
import { SectionTag } from "./SectionTag";

interface ConversionAuditHeroProps {
  tag: string;
  titleLead: string;
  titleHighlight: string;
  titleTail: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
}

export const ConversionAuditHero: React.FC<ConversionAuditHeroProps> = ({
  tag,
  titleLead,
  titleHighlight,
  titleTail,
  description,
  primaryCta,
  secondaryCta,
}) => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 md:py-36">
      <div className="max-w-3xl">
        <SectionTag className="mb-6">{tag}</SectionTag>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] mb-8">
          {titleLead} <span className="text-[#9366ff]">{titleHighlight}</span>{" "}
          {titleTail}
        </h1>
        <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl font-medium">
          {description}
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <button type="button" className="btn-primary">
            {primaryCta}
          </button>
          <a
            className="text-gray-900 font-bold border border-gray-200 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2"
            href="#process"
          >
            {secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
};
