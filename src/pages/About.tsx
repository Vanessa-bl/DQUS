import React from "react";
import { motion } from "framer-motion";
import { Card } from "../components/ui/card/Card";
import { TechCarousel } from "../components/ui/TechCarousel/TechCarousel";
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
          <span style={badgeStyle}>ABOUT US</span>

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
            Who We
            <br />
            <span
              style={{
                color: "var(--card-text)",
                position: "relative",
                display: "inline-block",
              }}
            >
              Are
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
          <span style={badgeStyle}>OUR STORY</span>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginTop: "1.5rem" }}>
              {["Founded in 2020", "100+ Projects Delivered", "Global Reach"].map((feat) => (
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
              areaService="MISSION"
              title="Our Mission"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac neque nec purus ultricies venenatis."
            />
            <Card
              inverted
              areaService="VISION"
              title="Our Vision"
              content="Suspendisse potenti. Duis at velit maximus, molestie est a, tempor magna."
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
          <span style={badgeStyle}>MEET THE TEAM</span>

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
            Passionate
            <br />
            <span
              style={{
                color: "var(--card-text)",
                position: "relative",
                display: "inline-block",
              }}
            >
              Experts
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
            areaService="CEO"
            title="Jane Doe"
            content="Chief Executive Officer"
          />
          <Card
            inverted
            areaService="CTO"
            title="John Smith"
            content="Chief Technology Officer"
          />
          <Card
            inverted
            areaService="DESIGN"
            title="Alice Johnson"
            content="Lead Designer"
          />
        </div>
      </section>

      <div style={{ margin: "80px 0 0" }}>
        <TechCarousel aria-label="Technologies Carousel" />
      </div>
    </Layout>
  );
};
