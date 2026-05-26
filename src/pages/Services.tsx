import React from "react";
import { motion } from "framer-motion";
import { Card } from "../components/ui/card/Card";
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

export const Services: React.FC = () => {
  const isMobile = window.innerWidth < 768;
  const t = useT();

  return (
    <Layout>
      <section
        aria-labelledby="services-hero-title"
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
          <span style={badgeStyle}>{t("services.hero.badge", "OUR SERVICES")}</span>

          <h1
            id="services-hero-title"
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
            {t("services.hero.title.line1", "What We")}
            <br />
            <span
              style={{
                color: "var(--card-text)",
                position: "relative",
                display: "inline-block",
              }}
            >
              {t("services.hero.title.line2", "Offer")}
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
            Potenciamos tu negocio con soluciones digitales a medida. Explora
            nuestros servicios diseñados para llevar tu marca al siguiente
            nivel.
          </p>
        </motion.div>
      </section>

      <section
        aria-labelledby="services-grid-title"
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
        <h2 id="services-grid-title" className="sr-only">
          Servicios Disponibles
        </h2>
        <div
          className="cards-grid"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          }}
        >
          <Card
            inverted
            aria-label="Corporate Branding: Graphic Design"
            areaService={t("services.card1.area", "GRAPHIC DESIGN")}
            title={t("services.card1.title", "Corporate Branding")}
            content={t("services.card1.content", "We create unique visual identities that reflect your brand essence and connect with your audience.")}
          />
          <Card
            inverted
            aria-label={t("services.card2.title", "Web Development")}
            areaService={t("services.card2.area", "WEB DEVELOPMENT")}
            title={t("services.card2.title", "Web Development")}
            content={t("services.card2.content", "We build fast, secure and SEO-optimized websites using the latest technologies.")}
          />
          <Card
            inverted
            aria-label={t("services.card3.title", "Mobile Apps")}
            areaService={t("services.card3.area", "MOBILE SOLUTIONS")}
            title={t("services.card3.title", "Mobile Apps")}
            content={t("services.card3.content", "We design and develop native and hybrid mobile applications with intuitive UX.")}
          />
          <Card
            inverted
            aria-label={t("services.card4.title", "Digital Consulting")}
            areaService={t("services.card4.area", "DIGITAL CONSULTING")}
            title={t("services.card4.title", "Digital Consulting")}
            content={t("services.card4.content", "We advise you on digital strategy, online marketing and technological transformation.")}
          />
          <Card
            inverted
            aria-label={t("services.card5.title", "SEO & Positioning")}
            areaService={t("services.card5.area", "SEO")}
            title={t("services.card5.title", "SEO & Positioning")}
            content={t("services.card5.content", "We improve your search engine visibility with on-page and off-page SEO techniques.")}
          />
          <Card
            inverted
            aria-label={t("services.card6.title", "UI/UX Design")}
            areaService={t("services.card6.area", "UI/UX DESIGN")}
            title={t("services.card6.title", "UI/UX Design")}
            content={t("services.card6.content", "Optimize your product user experience and interface to maximize conversions.")}
          />
        </div>
      </section>

      <section
        aria-labelledby="process-title"
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
          <span style={badgeStyle}>{t("services.process.badge", "OUR PROCESS")}</span>

          <h2
            id="process-title"
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
            {t("services.process.title.line1", "How We")}
            <br />
            <span
              style={{
                color: "var(--card-text)",
                position: "relative",
                display: "inline-block",
              }}
            >
              {t("services.process.title.line2", "Work")}
            </span>
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
            Seguimos un enfoque ágil y colaborativo, desde el descubrimiento
            inicial hasta el soporte post-lanzamiento.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {[
            { step: "1", title: t("services.process.step1.title", "Discovery"), text: t("services.process.step1.text", "Research, requirements analysis and goal definition.") },
            { step: "2", title: t("services.process.step2.title", "Design"), text: t("services.process.step2.text", "Wireframes, prototypes and usability validation.") },
            { step: "3", title: t("services.process.step3.title", "Development"), text: t("services.process.step3.text", "Product construction with clean code practices and testing.") },
            { step: "4", title: t("services.process.step4.title", "Delivery & Support"), text: t("services.process.step4.text", "Launch, monitoring and continuous support.") },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              style={{
                background: "var(--feature-pill-bg)",
                border: "1px solid var(--feature-pill-border)",
                borderRadius: "20px",
                padding: "1.75rem",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  color: "var(--card-text)",
                  opacity: 0.3,
                }}
              >
                {item.step}
              </span>
              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "var(--card-text)",
                  margin: "0.5rem 0 0.35rem",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                  color: "var(--card-text-regular)",
                  margin: 0,
                }}
              >
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
};
