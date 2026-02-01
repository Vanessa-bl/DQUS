import React from "react";

export const ConversionAuditCta: React.FC = () => {
  return (
    <section className="border-t border-gray-100 py-32 bg-[#f8f7ff]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-extrabold mb-8">
          Ready to fix your conversion leaks?
        </h2>
        <p className="text-xl text-gray-500 mb-14 font-medium max-w-2xl mx-auto">
          Professional clarity for your website is just one report away. No
          pressure, just data and actionable steps.
        </p>
        <button type="button" className="btn-primary mx-auto">
          Start Your Website Audit
        </button>
        <p className="mt-12 text-sm text-gray-400 font-bold uppercase tracking-widest">
          Trusted by 200+ companies worldwide
        </p>
      </div>
    </section>
  );
};
