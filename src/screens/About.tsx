"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "../components/ui/card/Card";
import { TechCarousel } from "../components/ui/TechCarousel/TechCarousel";
import "./pageStyles.css";
import { Layout } from "./layout";
import { useT } from "../i18n/useT";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: 0.12 * i },
  }),
};

export const About: React.FC = () => {
  const t = useT();

  const features = [
    t("about.story.features.0", "Senior team"),
    t("about.story.features.1", "In production"),
    t("about.story.features.2", "Code you own"),
  ];

  return (
    <Layout darkHeader>
      <section className="page-section" aria-labelledby="hero-title">
        <motion.div
          className="page-block"
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="page-badge">{t("about.hero.badge", "ABOUT US")}</span>

          <h1 id="hero-title" className="page-title">
            {t("about.hero.title.line1", "Who We")}
            <br />
            <span className="page-title-mark">
              {t("about.hero.title.line2", "Are")}
            </span>
          </h1>

          <p className="page-lede">
            {t(
              "about.hero.lede",
              "From concept to design, we bring strategic insight and creative solutions to every project. Our team shares practical ideas, proven techniques, and industry best practices."
            )}
          </p>
        </motion.div>
      </section>

      <section className="page-section page-section--flush-top" aria-labelledby="story-title">
        <div className="page-block">
          <span className="page-badge">{t("about.story.badge", "OUR STORY")}</span>
        </div>

        <div className="about-story-grid">
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 id="story-title" className="about-story-title">
              {t("about.story.title", "Who we are")}
            </h2>
            <p className="about-story-text">
              {t(
                "about.story.text",
                "DevQueens is an agency focused on building AI solutions. For every project, we assemble a team of senior specialists tailored to your case, from architecture and automation to design and marketing. We work with companies that need concrete results, not promises."
              )}
            </p>

            <div className="about-features">
              {features.map((feat) => (
                <span key={feat} className="about-feature-pill">
                  {feat}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="about-cards-stack"
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Card
              inverted
              areaService={t("about.mission.area", "MISSION")}
              title={t("about.mission.title", "Our Mission")}
              content={t(
                "about.mission.content",
                "To bridge the gap between innovative technology and exceptional user experiences, delivering digital solutions that drive measurable business growth."
              )}
            />
            <Card
              inverted
              areaService={t("about.vision.area", "VISION")}
              title={t("about.vision.title", "Our Vision")}
              content={t(
                "about.vision.content",
                "To become the most trusted technology partner for forward-thinking companies worldwide, setting the standard for quality, creativity, and client satisfaction in digital services."
              )}
            />
          </motion.div>
        </div>
      </section>

      <div className="about-marquee-wrap">
        <TechCarousel />
      </div>
    </Layout>
  );
};
