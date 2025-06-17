import React from "react";
import { Card } from "../components/ui/card/Card";
import "./pageStyles.css";
import { Layout } from "./layout";

export const Services: React.FC = () => {
  const isMobile = window.innerWidth < 768;
  return (
    <Layout>
      <section aria-labelledby="services-hero-title" className="services-hero">
        <div className="services-hero__content">
          <p className="hero-title-accent">OUR SERVICES</p>
          <h1 id="services-hero-title" className="hero-title">
            What We Offer
          </h1>
          <p className="hero-text">
            Potenciamos tu negocio con soluciones digitales a medida. Explora
            nuestros servicios diseñados para llevar tu marca al siguiente
            nivel.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="services-grid-title"
        style={{
          padding: "4rem 2rem",
          maxWidth: "79rem",
          margin: "auto",
        }}
      >
        <h2 id="services-grid-title" className="sr-only">
          Servicios Disponibles
        </h2>
        <div
          className="cards-grid"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: "2rem",
          }}
        >
          <Card
            aria-label="Corporate Branding: Graphic Design"
            areaService="GRAPHIC DESIGN"
            title="Corporate Branding"
            content="Creamos identidades visuales únicas que reflejan la esencia de tu marca y conectan con tu audiencia."
          />
          <Card
            aria-label="Web Development"
            areaService="WEB DEVELOPMENT"
            title="Web Development"
            content="Desarrollamos sitios web rápidos, seguros y optimizados para SEO utilizando las últimas tecnologías."
          />
          <Card
            aria-label="Mobile Apps"
            areaService="MOBILE SOLUTIONS"
            title="Mobile Apps"
            content="Diseñamos y desarrollamos aplicaciones móviles nativas e híbridas con UX intuitivo."
          />
          <Card
            aria-label="Digital Consulting"
            areaService="DIGITAL CONSULTING"
            title="Digital Consulting"
            content="Te asesoramos en estrategia digital, marketing online y transformación tecnológica."
          />
          <Card
            aria-label="SEO & Positioning"
            areaService="SEO"
            title="SEO & Positioning"
            content="Mejoramos tu visibilidad en buscadores con técnicas de SEO on-page y off-page."
          />
          <Card
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
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <p className="hero-title-accent">OUR PROCESS</p>
        <h2
          id="process-title"
          className="hero-title"
          style={{ margin: "1rem 0" }}
        >
          How We Work
        </h2>
        <p
          style={{
            fontSize: "1.2rem",
            maxWidth: "60ch",
            margin: "auto",
          }}
        >
          Seguimos un enfoque ágil y colaborativo, desde el descubrimiento
          inicial hasta el soporte post-lanzamiento.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "2rem",
            maxWidth: "79rem",
            margin: "2rem auto",
          }}
        >
          <div style={{ flex: 1 }}>
            <h3>1. Discovery</h3>
            <p>
              Investigación, análisis de requisitos y definición de objetivos.
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <h3>2. Design</h3>
            <p>Wireframes, prototipos y validación de usabilidad.</p>
          </div>
          <div style={{ flex: 1 }}>
            <h3>3. Development</h3>
            <p>
              Construcción del producto con prácticas de código limpio y
              pruebas.
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <h3>4. Delivery & Support</h3>
            <p>Lanzamiento, monitoreo y soporte continuo.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};
