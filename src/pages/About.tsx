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

const badgeStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
  background: "var(--pill-bg)",
  color: "var(--pill-text)",
  fontFamily: "'Nunito Sans', sans-serif",
  fontSize: "0.78rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding: "0.4rem 1rem",
  borderRadius: "999px",
  width: "fit-content",
};

const featurePillStyle: React.CSSProperties = {
  fontFamily: "'Nunito Sans', sans-serif",
  fontSize: "0.78rem",
  fontWeight: 600,
  color: "var(--card-text-regular)",
  background: "var(--feature-pill-bg)",
  padding: "0.4rem 0.9rem",
  borderRadius: "999px",
  border: "1px solid var(--feature-pill-border)",
  whiteSpace: "nowrap",
};

export const About: React.FC = () => {
  const isMobile = window.innerWidth < 768;
  const t = useT();

  return (
    <Layout>
      <section
        aria-labelledby="hero-title"
        style={{
          maxWidth: "1280px",
          margin: "80px auto 0",
          padding: "5rem 3rem 4rem",
          background: "var(--card-bg)",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
        }}
      >
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "680px" }}
        >
          <span style={badgeStyle}>{t("about.hero.badge", "ABOUT US")}</span>

          <h1
            id="hero-title"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 800,
              fontSize: isMobile ? "2rem" : "clamp(2.2rem, 3.5vw, 3rem)",
              lineHeight: 1.1,
              color: "var(--card-text)",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            {t("about.hero.title.line1", "Who We")}
            <br />
            <span
              style={{
                color: "var(--card-text)",
                position: "relative",
                display: "inline-block",
              }}
            >
              {t("about.hero.title.line2", "Are")}
            </span>
          </h1>

          <p
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "var(--card-text-regular)",
              margin: 0,
            }}
          >
            Desde la concepción hasta el diseño, aportamos conocimientos estratégicos y soluciones creativas a cada proyecto. Nuestro equipo comparte ideas prácticas, técnicas probadas y las mejores prácticas del sector.
          </p>
        </motion.div>
      </section>

      <section
        aria-labelledby="story-title"
        style={{
          maxWidth: "1280px",
          margin: "80px auto 0",
          padding: "5rem 3rem 4rem",
          background: "var(--card-bg)",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "680px" }}>
          <span style={badgeStyle}>{t("about.story.badge", "OUR STORY")}</span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "3rem",
            alignItems: "flex-start",
          }}
        >
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2
              id="story-title"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 800,
                fontSize: isMobile ? "1.5rem" : "2rem",
                color: "var(--card-text)",
                margin: "0 0 1rem",
                letterSpacing: "-0.02em",
              }}
            >
              Our Story
            </h2>
            <p
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "1rem",
                lineHeight: 1.75,
                color: "var(--card-text-regular)",
                margin: 0,
              }}
            >
              {t("about.story.text", "What began as a small team of developers and designers with a shared vision has grown into a full-service digital agency serving clients worldwide. We've delivered over 100 projects across industries including fintech, healthcare, e-commerce, and education. Our approach combines agile methodologies with deep technical expertise, ensuring every solution we build is scalable, maintainable, and aligned with our clients' strategic goals.")}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginTop: "1.5rem" }}>
              {[t("about.story.features.0", "Founded in 2020"), t("about.story.features.1", "100+ Projects Delivered"), t("about.story.features.2", "Global Reach")].map((feat) => (
                <span key={feat} style={featurePillStyle}>
                  {feat}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1, 1fr)",
              gap: "16px",
            }}
          >
            <Card
              inverted
              areaService={t("about.mission.area", "MISSION")}
              title={t("about.mission.title", "Our Mission")}
              content="To bridge the gap between innovative technology and exceptional user experiences, delivering digital solutions that drive measurable business growth."
            />
            <Card
              inverted
              areaService={t("about.vision.area", "VISION")}
              title={t("about.vision.title", "Our Vision")}
              content="To become the most trusted technology partner for forward-thinking companies worldwide, setting the standard for quality, creativity, and client satisfaction in digital services."
            />
          </motion.div>
        </div>
      </section>

      <section
        aria-labelledby="team-title"
        style={{
          maxWidth: "1280px",
          margin: "80px auto 0",
          padding: "5rem 3rem 4rem",
          background: "var(--card-bg)",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "680px" }}>
          <span style={badgeStyle}>{t("about.team.badge", "MEET THE TEAM")}</span>

          <h2
            id="team-title"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 800,
              fontSize: isMobile ? "1.8rem" : "clamp(2rem, 3.5vw, 2.8rem)",
              lineHeight: 1.1,
              color: "var(--card-text)",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            {t("about.team.title.line1", "Passionate")}
            <br />
            <span
              style={{
                color: "var(--card-text)",
                position: "relative",
                display: "inline-block",
              }}
            >
              {t("about.team.title.line2", "Experts")}
            </span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          <Card
            inverted
            areaService={t("about.team.member1.area", "CEO")}
            title={t("about.team.member1.name", "Jane Doe")}
            content={t("about.team.member1.role", "Chief Executive Officer")}
          />
          <Card
            inverted
            areaService={t("about.team.member2.area", "CTO")}
            title={t("about.team.member2.name", "John Smith")}
            content={t("about.team.member2.role", "Chief Technology Officer")}
          />
          <Card
            inverted
            areaService={t("about.team.member3.area", "DESIGN")}
            title={t("about.team.member3.name", "Alice Johnson")}
            content={t("about.team.member3.role", "Lead Designer")}
          />
        </div>
      </section>

      <div style={{ margin: "80px 0 0" }}>
        <TechCarousel aria-label="Technologies Carousel" />
      </div>
    </Layout>
  );
};
