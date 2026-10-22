"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import "./pageStyles.css";
import "./About.css";
import { Layout } from "./layout";
import { useT } from "../i18n/useT";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: 0.1 * i },
  }),
};

export const About: React.FC = () => {
  const t = useT();

  const values = [
    t("about.mvv.values.list.0", "Senior-only team"),
    t("about.mvv.values.list.1", "Confidential by default"),
    t("about.mvv.values.list.2", "Anchored to outcomes"),
    t("about.mvv.values.list.3", "Code owned by the client"),
  ];

  return (
    <Layout darkHeader>
      {/* HERO — bold black */}
      <section className="about-hero" aria-labelledby="about-hero-title">
        <motion.div
          className="about-hero__inner"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <span className="about-hero__eyebrow">
            {t("about.hero.badge", "ABOUT DEVQUEENS")}
          </span>
          <h1 id="about-hero-title" className="about-hero__title">
            {t("about.hero.title.line1", "An agency built for")}
            <br />
            <span className="about-hero__title-mark">
              {t("about.hero.title.line2", "teams moving real volume.")}
            </span>
          </h1>
          <p className="about-hero__lede">
            {t(
              "about.hero.desc",
              "DevQueens is an independent AI agency helping B2B teams move from legacy processes to production-grade AI. Without the hype, the slides, or the risk."
            )}
          </p>
          <Link href="/results" className="about-hero__cta">
            {t("about.hero.cta", "See our cases")}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </section>

      {/* RIGHT PARTNER — 2 col with proof panel */}
      <section className="about-partner" aria-labelledby="partner-title">
        <div className="about-partner__visual">
          <div className="about-partner__orb" aria-hidden="true" />
          <div className="about-partner__proof">
            <span className="about-partner__proof-label">
              {t("about.partner.proof.label", "Across our engagements")}
            </span>
            <ul className="about-partner__stats">
              <li>
                <span className="about-partner__stat-value">40h</span>
                <span className="about-partner__stat-label">
                  {t(
                    "about.partner.proof.stat1",
                    "Returned per week to client teams"
                  )}
                </span>
              </li>
              <li>
                <span className="about-partner__stat-value">10 days</span>
                <span className="about-partner__stat-label">
                  {t(
                    "about.partner.proof.stat2",
                    "From kickoff to proof of concept"
                  )}
                </span>
              </li>
              <li>
                <span className="about-partner__stat-value">100%</span>
                <span className="about-partner__stat-label">
                  {t(
                    "about.partner.proof.stat3",
                    "Of engagements shipped under NDA"
                  )}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <motion.div
          className="about-partner__content"
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="about-partner__eyebrow">
            {t("about.partner.eyebrow", "WHY DEVQUEENS")}
          </span>
          <h2 id="partner-title" className="about-partner__title">
            {t(
              "about.partner.title",
              "The right partner for teams making production bets on AI."
            )}
          </h2>
          <p className="about-partner__desc">
            {t(
              "about.partner.desc",
              "We've been shipping AI automations, agent surfaces, and GEO marketing into real production environments."
            )}
          </p>
        </motion.div>
      </section>

      {/* MISSION / VISION / VALUES — 3-col grid */}
      <section className="about-mvv" aria-label="Mission, Vision, Values">
        <div className="about-mvv__item">
          <span className="about-mvv__dot about-mvv__dot--magenta" aria-hidden="true" />
          <span className="about-mvv__eyebrow">
            {t("about.mvv.mission.area", "MISSION")}
          </span>
          <h3 className="about-mvv__title">
            {t("about.mvv.mission.title", "Mission")}
          </h3>
          <p className="about-mvv__text">
            {t(
              "about.mvv.mission.content",
              "To turn AI from boardroom slides into production code that moves real metrics."
            )}
          </p>
        </div>
        <div className="about-mvv__item">
          <span className="about-mvv__dot about-mvv__dot--orange" aria-hidden="true" />
          <span className="about-mvv__eyebrow">
            {t("about.mvv.vision.area", "VISION")}
          </span>
          <h3 className="about-mvv__title">
            {t("about.mvv.vision.title", "Vision")}
          </h3>
          <p className="about-mvv__text">
            {t(
              "about.mvv.vision.content",
              "To be the agency B2B teams call when the proof of concept has to work on day one."
            )}
          </p>
        </div>
        <div className="about-mvv__item">
          <span className="about-mvv__dot about-mvv__dot--black" aria-hidden="true" />
          <span className="about-mvv__eyebrow">
            {t("about.mvv.values.area", "VALUES")}
          </span>
          <h3 className="about-mvv__title">
            {t("about.mvv.values.title", "Values")}
          </h3>
          <ul className="about-mvv__list">
            {values.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* OUR APPROACH — banner (crema warm) */}
      <section className="about-approach" aria-labelledby="approach-title">
        <motion.div
          className="about-approach__inner"
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="about-approach__eyebrow">
            {t("about.approach.eyebrow", "OUR APPROACH")}
          </span>
          <h2 id="approach-title" className="about-approach__title">
            {t(
              "about.approach.title",
              "AI should work on day one. Not after a six-month implementation."
            )}
          </h2>
          <p className="about-approach__desc">
            {t(
              "about.approach.desc",
              "We assemble a senior team per engagement, prove the concept in 10 days against your real data, and ship to production in 4 to 6 weeks."
            )}
          </p>
          <Link href="/services" className="about-approach__cta">
            {t("about.approach.cta", "See the services")}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </section>

      {/* FOUNDER — single person, portrait + bio */}
      <section className="about-founder" aria-labelledby="founder-title">
        <motion.div
          className="about-founder__inner"
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="about-founder__photo">
            <div className="about-founder__photo-frame">
              <img
                src="/team/iraima-hurtado.jpg"
                alt={t("about.founder.name", "Iraima Merchan")}
                loading="lazy"
              />
            </div>
          </div>
          <div className="about-founder__text">
            <span className="about-founder__eyebrow">
              {t("about.founder.eyebrow", "FOUNDER")}
            </span>
            <h2 id="founder-title" className="about-founder__name">
              {t("about.founder.name", "Iraima Merchan")}
            </h2>
            <a
              href="https://www.youtube.com/@ira_hurtado"
              target="_blank"
              rel="noopener noreferrer"
              className="about-founder__social"
              aria-label="Iraima Merchan on YouTube"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span>@ira_hurtado</span>
            </a>
            <p className="about-founder__role">
              {t("about.founder.role", "Founder")}
            </p>
            <p className="about-founder__bio">
              {t(
                "about.founder.bio",
                "Iraima Hurtado is a psychologist and expert in technology and project management."
              )}
            </p>
            <blockquote className="about-founder__quote">
              <span className="about-founder__quote-mark" aria-hidden="true">
                "
              </span>
              {t(
                "about.founder.quote",
                "AI projects fail when the team under-estimates the human change. We build on both."
              )}
            </blockquote>
          </div>
        </motion.div>
      </section>

      {/* TRUST / NDA — dark bg */}
      <section className="about-trust" aria-labelledby="trust-title">
        <motion.div
          className="about-trust__inner"
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="about-trust__eyebrow">
            {t("about.trust.eyebrow", "DISCRETION & TRUST")}
          </span>
          <h2 id="trust-title" className="about-trust__title">
            {t("about.trust.title", "Discretion. Expertise. Ownership.")}
          </h2>
          <p className="about-trust__desc">
            {t(
              "about.trust.desc",
              "Every engagement runs under a strict NDA. Our clients' data, know-how, and architecture live only with their teams."
            )}
          </p>
        </motion.div>
      </section>

      {/* FINAL CTA — magenta */}
      <section className="about-cta" aria-labelledby="about-cta-title">
        <motion.div
          className="about-cta__inner"
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 id="about-cta-title" className="about-cta__title">
            {t("about.cta.title", "Ready to put AI in production?")}
          </h2>
          <p className="about-cta__desc">
            {t(
              "about.cta.desc",
              "A 10-day proof of concept against your real data. Fixed scope. Senior team. No surprise SOWs."
            )}
          </p>
          <Link href="/contact" className="about-cta__button">
            {t("about.cta.button", "Book a call")}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </section>
    </Layout>
  );
};
