import React from "react";
import { CircleCheckBig } from "lucide-react";
import { Card } from "../components/ui/card/Card";
import { TechCarousel } from "../components/ui/TechCarousel/TechCarousel";
import "./pageStyles.css";
import { Layout } from "./layout";

export const About: React.FC = () => {
  const isMobile = window.innerWidth < 768;

  return (
    <Layout>
      <section aria-labelledby="hero-title" className="about-hero">
        <div className="about-hero__content">
          <p className="hero-title-accent">ABOUT US</p>
          <h1 id="hero-title" className="hero-title">
            Who We Are
          </h1>
          <p className="hero-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            nec iaculis mauris.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="story-title"
        style={{
          padding: "4rem 2rem",
          maxWidth: "79rem",
          margin: "auto",
          display: "grid",
          gap: "3rem",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
        }}
      >
        <div>
          <p className="hero-title-accent">OUR STORY</p>
          <div className="card-divider" style={{ marginBottom: "1rem" }} />
          <h2
            id="story-title"
            style={{ fontSize: "2rem", marginBottom: "1rem" }}
          >
            Our Story
          </h2>
          <p style={{ fontSize: "1.2rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <ul
            style={{
              listStyle: "none",
              paddingLeft: 0,
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            <li style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <CircleCheckBig size={20} color="purple" aria-hidden="true" />
              <strong>Founded in 2020</strong>
            </li>
            <li style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <CircleCheckBig size={20} color="purple" aria-hidden="true" />
              <strong>100+ Projects Delivered</strong>
            </li>
            <li style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <CircleCheckBig size={20} color="purple" aria-hidden="true" />
              <strong>Global Reach</strong>
            </li>
          </ul>
        </div>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Card
            areaService="MISSION"
            title="Our Mission"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac neque nec purus ultricies venenatis."
          />
          <Card
            areaService="VISION"
            title="Our Vision"
            content="Suspendisse potenti. Duis at velit maximus, molestie est a, tempor magna."
          />
        </div>
      </section>

      <section
        aria-labelledby="team-title"
        style={{
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <p className="hero-title-accent">MEET THE TEAM</p>
        <h2 id="team-title" className="hero-title" style={{ margin: "1rem 0" }}>
          Passionate Experts
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: "2rem",
            maxWidth: "79rem",
            margin: "auto",
          }}
        >
          <Card
            areaService="CEO"
            title="Jane Doe"
            content="Chief Executive Officer"
          />
          <Card
            areaService="CTO"
            title="John Smith"
            content="Chief Technology Officer"
          />
          <Card
            areaService="DESIGN"
            title="Alice Johnson"
            content="Lead Designer"
          />
        </div>
      </section>

      <TechCarousel aria-label="Technologies Carousel" />
    </Layout>
  );
};
