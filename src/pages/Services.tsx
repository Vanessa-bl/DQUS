import React from "react";
import { motion } from "framer-motion";
import { Card } from "../components/ui/card/Card";
import "./pageStyles.css";
import { Layout } from "./layout";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.12 * i },
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
          <span style={badgeStyle}>OUR SERVICES</span>

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
            What We
            <br />
            <span
              style={{
                color: "var(--card-text)",
                position: "relative",
                display: "inline-block",
              }}
            >
              Offer
              <span
                style={{
                  content: '""',
                  position: "absolute",
                  bottom: "2px",
                  left: 0,
                  width: "100%",
                  height: "3px",
                  background: "var(--card-text)",
                  borderRadius: "2px",
                  display: "block",
                }}
              />
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
            areaService="GRAPHIC DESIGN"
            title="Corporate Branding"
            content="Creamos identidades visuales únicas que reflejan la esencia de tu marca y conectan con tu audiencia."
          />
          <Card
            inverted
            aria-label="Web Development"
            areaService="WEB DEVELOPMENT"
            title="Web Development"
            content="Desarrollamos sitios web rápidos, seguros y optimizados para SEO utilizando las últimas tecnologías."
          />
          <Card
            inverted
            aria-label="Mobile Apps"
            areaService="MOBILE SOLUTIONS"
            title="Mobile Apps"
            content="Diseñamos y desarrollamos aplicaciones móviles nativas e híbridas con UX intuitivo."
          />
          <Card
            inverted
            aria-label="Digital Consulting"
            areaService="DIGITAL CONSULTING"
            title="Digital Consulting"
            content="Te asesoramos en estrategia digital, marketing online y transformación tecnológica."
          />
          <Card
            inverted
            aria-label="SEO & Positioning"
            areaService="SEO"
            title="SEO & Positioning"
            content="Mejoramos tu visibilidad en buscadores con técnicas de SEO on-page y off-page."
          />
          <Card
            inverted
            aria-label="UI/UX Design"
            areaService="UI/UX DESIGN"
            title="UI/UX Design"
            content="Optimiza la experiencia de usuario y la interfaz de tu producto para maximizar conversiones."
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
          <span style={badgeStyle}>OUR PROCESS</span>

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
            How We
            <br />
            <span
              style={{
                color: "var(--card-text)",
                position: "relative",
                display: "inline-block",
              }}
            >
              Work
              <span
                style={{
                  content: '""',
                  position: "absolute",
                  bottom: "2px",
                  left: 0,
                  width: "100%",
                  height: "3px",
                  background: "var(--card-text)",
                  borderRadius: "2px",
                  display: "block",
                }}
              />
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
            { step: "1", title: "Discovery", text: "Investigación, análisis de requisitos y definición de objetivos." },
            { step: "2", title: "Design", text: "Wireframes, prototipos y validación de usabilidad." },
            { step: "3", title: "Development", text: "Construcción del producto con prácticas de código limpio y pruebas." },
            { step: "4", title: "Delivery & Support", text: "Lanzamiento, monitoreo y soporte continuo." },
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
