import React from "react";
import "./conversionAudit.css";
import { ConversionAuditHero } from "../components/conversion-audit/ConversionAuditHero";
import { QualificationSection } from "../components/conversion-audit/QualificationSection";
import { DiagnosisScopeSection } from "../components/conversion-audit/DiagnosisScopeSection";
import { InclusionsSection } from "../components/conversion-audit/InclusionsSection";
import { ProcessSection } from "../components/conversion-audit/ProcessSection";
import { DeliverablesSection } from "../components/conversion-audit/DeliverablesSection";
import { PricingSection } from "../components/conversion-audit/PricingSection";
import { ConversionAuditCta } from "../components/conversion-audit/ConversionAuditCta";
import { Header } from "../components/ui/Header/Header";
import Footer from "../components/ui/Footer/Footer";

export const ConversionAudit: React.FC = () => {
  return (
    <div className="conversion-audit bg-[#fafafa] text-[#1a1a1a] antialiased">
      <Header minimal />
      <main>
        <ConversionAuditHero />
        <QualificationSection />
        <DiagnosisScopeSection />
        <InclusionsSection />
        <ProcessSection />
        <DeliverablesSection />
        <PricingSection />
        <ConversionAuditCta />
      </main>
      <Footer minimal />
    </div>
  );
};
