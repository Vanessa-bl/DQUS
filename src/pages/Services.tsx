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

export const Services: React.FC = () => {
  const t = useT();

  const steps = [
    { step: "1", title: t("services.process.step1.title", "Discovery"), text: t("services.process.step1.text", "Research, requirements analysis and goal definition.") },
    { step: "2", title: t("services.process.step2.title", "Design"), text: t("services.process.step2.text", "Wireframes, prototypes and usability validation.") },
    { step: "3", title: t("services.process.step3.title", "Development"), text: t("services.process.step3.text", "Product construction with clean code practices and testing.") },
    { step: "4", title: t("services.process.step4.title", "Delivery & Support"), text: t("services.process.step4.text", "Launch, monitoring and continuous support.") },
  ];

  return (
    <Layout darkHeader>
      <section className="page-section" aria-labelledby="services-hero-title">
        <motion.div
          className="page-block"
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="page-badge">{t("services.hero.badge", "OUR SERVICES")}</span>

          <h1 id="services-hero-title" className="page-title">
            {t("services.hero.title.line1", "What We")}
            <br />
            <span className="page-title-mark">
              {t("services.hero.title.line2", "Offer")}
            </span>
          </h1>

          <p className="page-lede">
            {t(
              "services.hero.lede",
              "Potenciamos tu negocio con soluciones digitales a medida. Explora nuestros servicios diseñados para llevar tu marca al siguiente nivel."
            )}
          </p>
        </motion.div>
      </section>

      <section className="page-section page-section--flush-top" aria-labelledby="services-grid-title">
        <h2 id="services-grid-title" className="sr-only">
          {t("services.grid.title", "Available Services")}
        </h2>
        <div className="cards-grid cards-grid--2col">
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

      <section className="page-section" aria-labelledby="process-title">
        <div className="page-block">
          <span className="page-badge">{t("services.process.badge", "OUR PROCESS")}</span>

          <h2 id="process-title" className="page-title page-title--sm">
            {t("services.process.title.line1", "How We")}
            <br />
            <span className="page-title-mark">
              {t("services.process.title.line2", "Work")}
            </span>
          </h2>

          <p className="page-lede">
            {t(
              "services.process.lede",
              "Seguimos un enfoque ágil y colaborativo, desde el descubrimiento inicial hasta el soporte post-lanzamiento."
            )}
          </p>
        </div>

        <div className="svc-process-grid">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              className="svc-step"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <span className="svc-step-num">{item.step}</span>
              <h3 className="svc-step-title">{item.title}</h3>
              <p className="svc-step-text">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
};
