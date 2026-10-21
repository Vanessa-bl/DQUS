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
            {t("home.services.headline.line1", "AI Automations.")}<br />
            <span className="hs__headline-mark">
              {t("home.services.headline.line2", "GEO Marketing.")}
            </span>
          </h2>
          <p className="hs__desc">
            {t(
              "home.services.desc",
              "We analyze your systems' workflow and identify what we can automate to save you time. Plus, marketing to get you found through AIs like ChatGPT, Claude, and Gemini."
            )}
          </p>
        </div>

        <div className="hs-services__grid">
          <Card
            href="/servicio/diseno"
            inverted
            areaService={t("home.services.card1.area", "PROCESS AUTOMATION")}
            title={t("home.services.card1.title", "Automate repeat work.")}
            content={t(
              "home.services.card1.content",
              "Three-way invoice matching, exception routing, approvals with evidence attached. 800 invoices a month processed before sign-off. Proof of concept in 5 to 10 days."
            )}
          />
          <Card
            href="#"
            inverted
            areaService={t("home.services.card2.area", "AI AGENT SURFACE")}
            title={t("home.services.card2.title", "Agents on your product.")}
            content={t(
              "home.services.card2.content",
              "Full agent surface in production: availability, booking, payment, refund. Delivered into OpenAI Operator, Claude, ChatGPT, and WhatsApp. 3 to 5 weeks from PoC to ship."
            )}
          />
          <Card
            href="#"
            inverted
            areaService={t("home.services.card3.area", "OPS RETAINER")}
            title={t("home.services.card3.title", "Keep it alive.")}
            content={t(
              "home.services.card3.content",
              "APIs break. Schemas drift. Someone watches the automations, patches the agents, reruns the evals weekly. No emergency SOWs."
            )}
          />
          <Card
            inverted
            areaService={t("home.services.card4.area", "AI MARKETING")}
            title={t("home.services.card4.title", "Found by AI agents.")}
            content={t(
              "home.services.card4.content",
              "Marketing for the layer after Google. Your hours, catalog, and profiles restructured so ChatGPT, Gemini, and Perplexity read your business right."
            )}
          />
        </div>
      </section>

      <section className="hs-work" aria-labelledby="work-title">
        <div className="hs-services__header">
          <span className="hs__eyebrow">
            {t("home.work.eyebrow", "Recent work")}
          </span>
          <h2 id="work-title" className="hs__headline">
            {t("home.work.headline.line1", "Receipts.")}<br />
            <span className="hs__headline-mark">
              {t("home.work.headline.line2", "Not slides.")}
            </span>
          </h2>
          <p className="hs__desc">
            {t(
              "home.work.desc",
              "Three engagements from the last twelve months. Real volume, real teams, anonymized where the contract asked."
            )}
          </p>
        </div>

        <div className="hs-work__grid">
          <Card
            href="#"
            inverted
            areaService={t("home.work.card1.area", "VERTICAL SAAS / AI AGENT")}
            title={t("home.work.card1.title", "Booking connector in 5 weeks.")}
            content={t(
              "home.work.card1.content",
              "Production connector between a scheduling SaaS, OpenAI Operator, and a WhatsApp Business agent. 40,000 bookings a month through the agent surface. Zero manual overrides."
            )}
          />
          <Card
            href="#"
            inverted
            areaService={t("home.work.card2.area", "FINANCE OPS / AUTOMATION")}
            title={t("home.work.card2.title", "Three-way matching, automated.")}
            content={t(
              "home.work.card2.content",
              "Invoices matched against POs and delivery receipts, exceptions routed with evidence attached. 800 invoices a month, days of manual review returned every week."
            )}
          />
          <Card
            href="#"
            inverted
            areaService={t("home.work.card3.area", "STARTUP / RESCUE")}
            title={t("home.work.card3.title", "Rescued the investor demo.")}
            content={t(
              "home.work.card3.content",
              "Called in Tuesday. By Friday: broken agent loop rewritten, retrieval bug patched, evals and cost caps added. Held the live demo through 30 minutes of investor questions. Zero hallucinations."
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
