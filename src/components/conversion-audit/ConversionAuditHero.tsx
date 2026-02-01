import React from "react";
import { SectionTag } from "./SectionTag";

export const ConversionAuditHero: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 md:py-36">
      <div className="max-w-3xl">
        <SectionTag className="mb-6">Website Conversion Audit</SectionTag>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] mb-8">
          Stop leaking conversions with{" "}
          <span className="text-[#9366ff]">professional</span> diagnosis.
        </h1>
        <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl font-medium">
          A one-time, expert audit of your website&apos;s UX, technical
          performance, and copy clarity to identify exactly where you are losing
          customers.
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <button type="button" className="btn-primary">
            Get Started Now
          </button>
          <a
            className="btn-secondary"
            href="#"
          >
            View Sample Report
          </a>
        </div>
      </div>
    </section>
  );
};
