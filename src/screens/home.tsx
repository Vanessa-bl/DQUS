"use client";

import React from "react";
import NewHero from "../components/ui/NewHero/NewHero";
import SplitHero from "../components/ui/SplitHero/SplitHero";
import "./pageStyles.css";
import "./HomeSections.css";
import { Card } from "../components/ui/card/Card";
import { TechCarousel } from "../components/ui/TechCarousel/TechCarousel";
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
            {t("home.services.headline.line1", "Two product lines.")}<br />
            <span className="hs__headline-mark">
              {t("home.services.headline.line2", "Public prices.")}
            </span>
          </h2>
          <p className="hs__desc">
            {t(
              "home.services.desc",
              "Vertical SaaS: paid PoC → production connector → retainer. SMBs: agent discoverability. No enterprise deck. No six-month kickoff. No hourly bills after signing."
            )}
          </p>
        </div>

        <div className="hs-services__grid">
          <Card
            href="/servicio/diseno"
            inverted
            areaService={t("home.services.card1.area", "AGENT PoC · $3K–$7K")}
            title={t("home.services.card1.title", "Paid Proof-of-Concept")}
            content={t(
              "home.services.card1.content",
              "5–10 days. One action against your test data — availability, booking, quote, whatever your customers ask an agent for. Your team watches the agent do the thing before you sign off on production. Never free: the price is the filter."
            )}
          />
          <Card
            href="#"
            inverted
            areaService={t("home.services.card2.area", "PRODUCTION CONNECTOR · $10K–$25K")}
            title={t("home.services.card2.title", "Production Agent Connector")}
            content={t(
              "home.services.card2.content",
              "3–5 weeks. The full agent surface against your API: availability, booking, cancellation, payment, refund — whatever your platform actually supports. Meta WhatsApp Business review included. Braintrust or Langfuse evals, cost caps, and a runbook your team can operate. Ships to your customers, not a Loom link."
            )}
          />
          <Card
            href="#"
            inverted
            areaService={t("home.services.card3.area", "AGENT OPS RETAINER · $1.5K–$3K / mo")}
            title={t("home.services.card3.title", "Agent Ops Retainer")}
            content={t(
              "home.services.card3.content",
              "OAuth rotates. Schemas drift. Model releases break fine-tuned prompts. Meta rewrites WhatsApp Business policy on a Friday afternoon. Somebody watches, patches, re-runs evals. That's the retainer. No emergency SOWs, no scope-creep bills."
            )}
          />
          <Card
            inverted
            areaService={t("home.services.card4.area", "SMB AGENT DISCOVERABILITY · from $1.5K + $300/mo")}
            title={t("home.services.card4.title", "Get Your SMB Found by Agents")}
            content={t(
              "home.services.card4.content",
              "For local businesses and SMBs. We audit and restructure your hours, prices, policies, catalog, availability, and profiles so ChatGPT, Gemini, Perplexity, and the WhatsApp agents in your customers' hands read your business right. Optional monthly monitoring catches the day they stop."
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
              "Three engagements from the last twelve months. Real teams, real evals, anonymized where the contract asked."
            )}
          </p>
        </div>

        <div className="hs-work__grid">
          <Card
            href="#"
            inverted
            areaService={t("home.work.card1.area", "VERTICAL SAAS / CONNECTOR")}
            title={t("home.work.card1.title", "Booking Connector Shipped in 5 Weeks")}
            content={t(
              "home.work.card1.content",
              "Production connector between a scheduling SaaS and OpenAI's Operator plus a WhatsApp Business agent. 40,000+ bookings/month now run through the agent surface. Zero manual overrides. Their sales team leads with it against two closest competitors."
            )}
          />
          <Card
            href="#"
            inverted
            areaService={t("home.work.card2.area", "FINTECH / MULTI-AGENT FLOW")}
            title={t("home.work.card2.title", "6-Step Ops Flow, Automated")}
            content={t(
              "home.work.card2.content",
              "Replaced a manual reconciliation queue with a multi-agent workflow — tool use, human-in-the-loop, Braintrust evals, cost caps. 90,000+ cases a month, sub-2% escalations, ops team off weekend on-call for the first time in two years."
            )}
          />
          <Card
            href="#"
            inverted
            areaService={t("home.work.card3.area", "STARTUP / RESCUE")}
            title={t("home.work.card3.title", "Rescued Their Investor Demo")}
            content={t(
              "home.work.card3.content",
              "Called in on a Tuesday. By Friday we'd rewritten a broken agent loop, patched a retrieval bug, added evals and cost caps, and held the live demo through 30 minutes of investor questions with zero hallucinations."
            )}
          />
        </div>
      </section>

      <div className="hs-tech">
        <TechCarousel />
      </div>
    </Layout>
  );
};
