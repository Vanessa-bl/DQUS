"use client";

import React from "react";
import NewHero from "../components/ui/NewHero/NewHero";
import SplitHero from "../components/ui/SplitHero/SplitHero";
import "./pageStyles.css";
import "./HomeSections.css";
import { Card } from "../components/ui/card/Card";
import { TechCarousel } from "../components/ui/TechCarousel/TechCarousel";
import { FAQSection } from "../components/ui/FAQSection/FAQSection";
import { Layout } from "./layout";
import { useT } from "../i18n/useT";

export const Home: React.FC = () => {
  const t = useT();

  return (
    <Layout transparentHeader>
      <SplitHero />
      <NewHero />

      <section className="hs-services" aria-labelledby="services-title">
        <div className="hs-services__header">
          <span className="hs__eyebrow">
            {t("home.services.eyebrow", "What we build")}
          </span>
          <h2 id="services-title" className="hs__headline">
            {t("home.services.headline.line1", "Three lines of work.")}<br />
            <span className="hs__headline-mark">
              {t("home.services.headline.line2", "Public prices.")}
            </span>
          </h2>
          <p className="hs__desc">
            {t(
              "home.services.desc",
              "Automation that removes manual hours. AI agents that transact on your product. Marketing that lands you inside the tools where buyers now search. No enterprise deck. No six month kickoff. No hourly bills after signing."
            )}
          </p>
        </div>

        <div className="hs-services__grid">
          <Card
            href="/servicio/diseno"
            inverted
            areaService={t("home.services.card1.area", "PROCESS AUTOMATION · $5K to $20K")}
            title={t("home.services.card1.title", "Automations That Clear the Queue")}
            content={t(
              "home.services.card1.content",
              "We start with a $3K to $7K paid proof of concept in 5 to 10 days. One real workflow against your real data. If it holds, we build and ship to production in 4 to 6 weeks. Three way invoice matching with the supporting evidence attached. Exception routing. Reconciliation and approval queues. 800 invoices a month, 90,000 cases a month, whatever your real volume is. Your team watches the queue drain before you sign off."
            )}
          />
          <Card
            href="#"
            inverted
            areaService={t("home.services.card2.area", "AI AGENT SURFACE · $10K to $25K")}
            title={t("home.services.card2.title", "AI Agents on Your Product")}
            content={t(
              "home.services.card2.content",
              "Same entry: a $3K to $7K paid proof of concept in 5 to 10 days, one action against your API. Then 3 to 5 weeks to ship the full agent surface in production: availability, booking, cancellation, payment, refund. Delivered into OpenAI Operator, Claude computer use, ChatGPT, and WhatsApp Business. Meta review, Braintrust or Langfuse evals, cost caps, and a runbook your team can operate."
            )}
          />
          <Card
            href="#"
            inverted
            areaService={t("home.services.card3.area", "OPS RETAINER · $1.5K to $3K / month")}
            title={t("home.services.card3.title", "The Thing That Keeps It Alive")}
            content={t(
              "home.services.card3.content",
              "APIs break. Schemas drift. Models update on a Friday afternoon. Meta rewrites WhatsApp Business policy without warning. Somebody watches the automations, patches the agents, and reruns the evals every week. That is the retainer. No emergency statements of work, no scope creep bills."
            )}
          />
          <Card
            inverted
            areaService={t("home.services.card4.area", "AI MARKETING · from $1.5K + $300/month")}
            title={t("home.services.card4.title", "Get Found by AI Agents")}
            content={t(
              "home.services.card4.content",
              "Marketing for the layer that comes after Google. We audit and restructure your hours, prices, catalog, availability, and profiles so ChatGPT, Gemini, Perplexity, Claude, and the WhatsApp agents your customers already use read your business right. Optional monthly monitoring flags the day they stop."
            )}
          />
        </div>
      </section>

      <section className="hs-work" aria-labelledby="work-title">
        <div className="hs-services__header">
          <span className="hs__eyebrow">
            {t("home.work.eyebrow", "Recent Work")}
          </span>
          <h2 id="work-title" className="hs__headline">
            {t("home.work.headline.line1", "Small team,")}<br />
            <span className="hs__headline-mark">
              {t("home.work.headline.line2", "receipts with numbers.")}
            </span>
          </h2>
          <p className="hs__desc">
            {t(
              "home.work.desc",
              "Three engagements from the last twelve months. Real volumes, real teams, anonymized where the contract asked."
            )}
          </p>
        </div>

        <div className="hs-work__grid">
          <Card
            href="#"
            inverted
            areaService={t("home.work.card1.area", "VERTICAL SAAS / AI AGENT")}
            title={t("home.work.card1.title", "Booking Connector Shipped in 5 Weeks")}
            content={t(
              "home.work.card1.content",
              "Production connector between a scheduling SaaS and OpenAI Operator, plus a WhatsApp Business agent on the consumer side. 40,000 bookings a month now run through the agent surface. Zero manual overrides. Their sales team leads with it against their two closest competitors."
            )}
          />
          <Card
            href="#"
            inverted
            areaService={t("home.work.card2.area", "FINANCE OPS / AUTOMATION")}
            title={t("home.work.card2.title", "Three Way Matching, Automated")}
            content={t(
              "home.work.card2.content",
              "Built a three way matching automation that compared invoices against purchase orders and delivery receipts, flagged price and quantity discrepancies, and routed exceptions to approvers with the supporting evidence attached. 800 invoices a month, days of manual review returned to the team every week."
            )}
          />
          <Card
            href="#"
            inverted
            areaService={t("home.work.card3.area", "STARTUP / RESCUE")}
            title={t("home.work.card3.title", "Rescued Their Investor Demo")}
            content={t(
              "home.work.card3.content",
              "Called in on a Tuesday. By Friday we had rewritten a broken agent loop, patched a retrieval bug, added evals and cost caps, and held the live demo through 30 minutes of investor questions with zero hallucinations."
            )}
          />
        </div>
      </section>

      <FAQSection />

      <div className="hs-tech">
        <TechCarousel />
      </div>
    </Layout>
  );
};
