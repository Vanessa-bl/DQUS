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
import { getTranslations, type Locale } from "../i18n";

interface ConversionAuditProps {
  locale?: Locale;
}

export const ConversionAudit: React.FC<ConversionAuditProps> = ({
  locale = "en",
}) => {
  const translations = getTranslations(locale);
  const {
    hero,
    qualification,
    scope,
    inclusions,
    process,
    deliverables,
    pricing,
    cta,
  } = translations.conversionAudit;

  return (
    <div className="conversion-audit bg-[#fafafa] text-[#1a1a1a] antialiased">
      <Header minimal showThemeSwitch={false} />
      <main>
        <ConversionAuditHero
          tag={hero.tag}
          titleLead={hero.titleLead}
          titleHighlight={hero.titleHighlight}
          titleTail={hero.titleTail}
          description={hero.description}
          primaryCta={hero.primaryCta}
          secondaryCta={hero.secondaryCta}
        />
        <QualificationSection
          tag={qualification.tag}
          title={qualification.title}
          forYouTitle={qualification.forYouTitle}
          notForYouTitle={qualification.notForYouTitle}
          forYouItems={qualification.forYouItems}
          notForYouItems={qualification.notForYouItems}
        />
        <DiagnosisScopeSection
          tag={scope.tag}
          title={scope.title}
          analysisTag={scope.analysisTag}
          analysisItems={scope.analysisItems}
          problemsTag={scope.problemsTag}
          problemItems={scope.problemItems}
        />
        <InclusionsSection
          includedTitle={inclusions.includedTitle}
          excludedTitle={inclusions.excludedTitle}
          includedItems={inclusions.includedItems}
          excludedItems={inclusions.excludedItems}
        />
        <ProcessSection
          tag={process.tag}
          title={process.title}
          steps={process.steps}
        />
        <DeliverablesSection
          tag={deliverables.tag}
          title={deliverables.title}
          intro={deliverables.intro}
          items={deliverables.items}
        />
        <PricingSection
          tag={pricing.tag}
          title={pricing.title}
          price={pricing.price}
          feeLabel={pricing.feeLabel}
          description={pricing.description}
          button={pricing.button}
          availability={pricing.availability}
        />
        <ConversionAuditCta
          title={cta.title}
          description={cta.description}
          button={cta.button}
          trust={cta.trust}
        />
      </main>
      <Footer minimal showLocaleSwitcher />
    </div>
  );
};
