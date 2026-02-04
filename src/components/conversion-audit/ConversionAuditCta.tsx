import React from "react";

interface ConversionAuditCtaProps {
  title: string;
  description: string;
  button: string;
  trust: string;
}

export const ConversionAuditCta: React.FC<ConversionAuditCtaProps> = ({
  title,
  description,
  button,
  trust,
}) => {
  return (
    <section className="border-t border-gray-100 py-32 bg-[#f8f7ff]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-extrabold mb-8">{title}</h2>
        <p className="text-xl text-gray-500 mb-14 font-medium max-w-2xl mx-auto">
          {description}
        </p>
        <button type="button" className="btn-primary mx-auto">
          {button}
        </button>
        <p className="mt-12 text-sm text-gray-400 font-bold uppercase tracking-widest">
          {trust}
        </p>
      </div>
    </section>
  );
};
