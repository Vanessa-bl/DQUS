import React from "react";
import Hero from "../components/ui/HeroSection/HeroSection";
import "./pageStyles.css";
import { Card } from "../components/ui/card/Card";
import {
  ChartNoAxesCombined,
  CircleCheckBig,
  Medal,
  UsersRound,
} from "lucide-react";
import { TechCarousel } from "../components/ui/TechCarousel/TechCarousel";
import { Layout } from "./layout";

export const Home: React.FC = () => {
  const isMobile = window.innerWidth < 768;
  return (
    <Layout>
      <Hero />
      <section
        aria-labelledby="welcome-title"
        style={{
          padding: "6rem 2rem 3rem",
          maxWidth: "79rem",
          margin: "auto",
          display: "grid",
          gap: "4rem",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
        }}
      >
        <div>
          <p
            className="hero-title-accent"
            style={{
              fontSize: "1rem",
              letterSpacing: "2px",
            }}
          >
            WELCOME TO DEVQUEENS
          </p>
          <div className="card-divider" style={{ marginBottom: "1.5rem" }} />
          <h1
            id="welcome-title"
            className="hero-title"
            style={{ fontSize: "2.5rem", marginBottom: "1rem" }}
          >
            Your Strategic Partner for Digital Excellence
          </h1>
          <p style={{ fontSize: "1.2rem", lineHeight: 1.5, fontWeight: 300 }}>
            DevQueens is your strategic partner for innovative, scalable, and
            purpose-driven digital solutions. We specialize in crafting
            high-impact experiences that not only look exceptional but also
            perform flawlessly across all platforms.
          </p>
          <p
            style={{ fontSize: "1.2rem", marginTop: "1.5rem", fontWeight: 300 }}
          >
            With a solid track record of successful projects across industries,
            our multidisciplinary team blends creativity, technical excellence,
            and user-centered thinking to bring your vision to life.
          </p>
          <ul
            style={{
              listStyle: "none",
              paddingLeft: 0,
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              marginTop: "1.7rem",
            }}
          >
            <li
              style={{
                display: "flex",
                gap: "10px",
                verticalAlign: "middle",
              }}
            >
              <CircleCheckBig size={20} color="purple" aria-hidden="true" />
              <strong>Enterprise-Grade Solutions</strong>
            </li>
            <li
              style={{
                display: "flex",
                gap: "10px",
                verticalAlign: "middle",
              }}
            >
              <CircleCheckBig size={20} color="purple" aria-hidden="true" />
              <strong>24/7 Technical Support</strong>
            </li>
            <li
              style={{
                display: "flex",
                gap: "10px",
                verticalAlign: "middle",
              }}
            >
              <CircleCheckBig size={20} color="purple" aria-hidden="true" />
              <strong>Agile Development Process</strong>
            </li>
            <li
              style={{
                display: "flex",
                gap: "10px",
                verticalAlign: "middle",
              }}
            >
              <CircleCheckBig size={20} color="purple" aria-hidden="true" />
              <strong>Scalable Architecture</strong>
            </li>
          </ul>
        </div>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <div
            className="card"
            style={{
              borderRadius: 20,
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              height: "fit-content",
            }}
          >
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "linear-gradient(135deg, #7c7fc6, #a855f7)",
                  width: "48px",
                  height: "48px",
                  borderRadius: "16px",
                }}
              >
                <UsersRound size={24} color="white" aria-hidden="true" />
              </div>
              <div>
                <h2 style={{ fontSize: "1.2rem", marginBottom: "2px" }}>
                  Collaborative Approach
                </h2>
                <p>Partnership-driven development</p>
              </div>
            </div>
            <p style={{ lineHeight: 1.4 }}>
              We don't just build solutions — we build partnerships. Our
              collaborative approach ensures every project aligns with your
              business goals and exceeds expectations.
            </p>
          </div>
          <div
            className="card"
            style={{
              borderRadius: 20,
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              height: "fit-content",
            }}
          >
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "linear-gradient(135deg, #7c7fc6, #a855f7)",
                  width: "48px",
                  height: "48px",
                  borderRadius: "16px",
                }}
              >
                <Medal size={24} color="white" aria-hidden="true" />
              </div>
              <div>
                <h2 style={{ fontSize: "1.2rem", marginBottom: "2px" }}>
                  Excellence Recognition
                </h2>
                <p>Award-winning quality</p>
              </div>
            </div>
            <p style={{ lineHeight: 1.4 }}>
              Our commitment to excellence has been recognized with industry
              awards and client accolades, reflecting the high standards we
              maintain in every project.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="services-title"
        style={{
          padding: "6rem 2rem 3rem",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <p
          className="hero-title-accent"
          style={{
            fontSize: "1rem",
            letterSpacing: "2px",
          }}
        >
          Our Services
        </p>
        <h2
          id="services-title"
          className="hero-title"
          style={{ fontSize: "2.5rem", margin: "1rem 0" }}
        >
          Comprehensive Digital Solutions
        </h2>
        <p
          style={{
            fontSize: "1.2rem",
            maxWidth: "79rem",
            margin: "auto",
            padding: "0 2rem",
          }}
        >
          We offer a comprehensive suite of digital services designed to elevate
          your brand and accelerate your growth with enterprise-grade solutions
          and strategic expertise.
        </p>
        <div className="cards-grid">
          <Card
            href="/servicio/diseno"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Corporate Branding: Graphic Design"
            areaService="GRAPHIC DESIGN"
            title="Corporate Branding"
            content="We create unique visual identities that perfectly reflect your company’s mission and values."
          />
          <Card
            href="#"
            aria-label="Fast Code & Deployment: Web Development"
            areaService="WEB DEVELOPMENT"
            title="Fast Code &amp; Deployment"
            content="From concept to launch, we streamline your e-commerce or business website in record time."
          />
          <Card
            href="#"
            aria-label="Seamless Integration: Mobile Solutions"
            areaService="MOBILE SOLUTIONS"
            title="Seamless Integration"
            content="Build cross-platform mobile apps that deliver native performance and unmatched user experience."
          />
          <Card
            aria-label="Strategic Guidance: Digital Consulting"
            areaService="DIGITAL CONSULTING"
            title="Strategic Guidance"
            content="Leverage our expert insights to refine your digital strategy, optimize processes, and boost ROI."
          />
        </div>
      </section>

      <section
        aria-labelledby="about-title"
        style={{
          padding: "3rem 2rem 6rem",
          maxWidth: "79rem",
          margin: "auto",
          display: "flex",
          flexDirection: "row-reverse",
          gap: "4rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1" }}>
          <p
            className="hero-title-accent"
            style={{
              fontSize: "1rem",
              letterSpacing: "2px",
            }}
          >
            ABOUT US
          </p>
          <div className="card-divider" style={{ marginBottom: "1.5rem" }} />
          <div className="card" style={{ borderRadius: "8px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "linear-gradient(135deg, #7c7fc6, #a855f7)",
                  width: "48px",
                  height: "48px",
                  borderRadius: "16px",
                }}
              >
                <ChartNoAxesCombined
                  size={24}
                  color="white"
                  aria-hidden="true"
                />
              </div>
              <h2
                id="about-title"
                className="hero-title"
                style={{ fontSize: "1.5rem", margin: "0 1rem" }}
              >
                Stay Ahead of the Curve
              </h2>
            </div>
            <p style={{ fontSize: "1.2rem", fontWeight: 300 }}>
              Stay ahead of the curve with our carefully curated collection of
              articles, tutorials, and expert resources. From cutting-edge
              design trends to development techniques and strategic insights, we
              provide practical knowledge and thought leadership.
            </p>
            <p
              style={{
                fontSize: "1.2rem",
                marginTop: "1.5rem",
                fontWeight: 300,
              }}
            >
              Whether you're a designer, developer, or digital strategist,
              you'll find valuable guidance to sharpen your skills, make
              informed decisions, and drive meaningful results in your projects.
            </p>
            <ul
              style={{
                listStyle: "none",
                paddingLeft: 0,
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                marginTop: "1.5rem",
              }}
            >
              <li
                style={{
                  display: "flex",
                  gap: "10px",
                  verticalAlign: "middle",
                }}
              >
                <CircleCheckBig size={20} color="purple" aria-hidden="true" />
                <strong>Expert Tutorials</strong>
              </li>
              <li
                style={{
                  display: "flex",
                  gap: "10px",
                  verticalAlign: "middle",
                }}
              >
                <CircleCheckBig size={20} color="purple" aria-hidden="true" />
                <strong>Best Practices</strong>
              </li>
              <li
                style={{
                  display: "flex",
                  gap: "10px",
                  verticalAlign: "middle",
                }}
              >
                <CircleCheckBig size={20} color="purple" aria-hidden="true" />
                <strong>Industry Insights</strong>
              </li>
              <li
                style={{
                  display: "flex",
                  gap: "10px",
                  verticalAlign: "middle",
                }}
              >
                <CircleCheckBig size={20} color="purple" aria-hidden="true" />
                <strong>Case Studies</strong>
              </li>
            </ul>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flex: "1",
            gap: "16px",
            flexWrap: "wrap",
            height: "fit-content",
            margin: "auto",
          }}
        >
          <h2>Industry Insights & Resources</h2>
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <div
              className="card"
              style={{ flex: "1", textAlign: "center", borderRadius: "8px" }}
            >
              <p
                style={{
                  color: "#2563eb",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  fontSize: "26px",
                }}
              >
                150+
              </p>
              <p>Articles Published</p>
            </div>
            <div
              className="card"
              style={{ flex: "1", textAlign: "center", borderRadius: "8px" }}
            >
              <p
                style={{
                  color: "#a559f3",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  fontSize: "26px",
                }}
              >
                50K+
              </p>
              <p>Developers Reached</p>
            </div>
          </div>
        </div>
      </section>

      <TechCarousel aria-label="Technologies Carousel" />

      <section
        aria-labelledby="expertise-title"
        style={{
          padding: "6rem 2rem 3rem",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <p
          className="hero-title-accent"
          style={{
            fontSize: "1rem",
            letterSpacing: "2px",
          }}
        >
          What We Do
        </p>
        <h2
          id="expertise-title"
          className="hero-title"
          style={{ fontSize: "2.5rem", margin: "1rem 0" }}
        >
          Expertise That Moves Brands Forward
        </h2>
        <p
          style={{
            fontSize: "1.2rem",
            maxWidth: "79rem",
            margin: "auto",
            padding: "0 2rem",
          }}
        >
          From concept to design, we bring strategic know-how and creative
          solutions to every project. Our team shares actionable insights,
          proven techniques, and industry best practices.
        </p>
        <div className="cards-grid">
          <Card
            areaService="Accessibility"
            title="Improving Accessibility in React"
            content="Learn best practices to ensure your React components are fully accessible and compliant with WCAG standards, creating inclusive digital experiences."
          />
          <Card
            areaService="Web Development"
            title="Optimizing Performance with Next.js"
            content="Discover advanced techniques to boost page speed and SEO, from image optimization to smart caching strategies and Core Web Vitals improvement."
          />
          <Card
            areaService="UI/UX Design"
            title="UI/UX Design Best Practices"
            content="Explore design principles that create intuitive interfaces and memorable user experiences, backed by research and real-world case studies."
          />
          <Card
            areaService="Seo and Positioning"
            title="SEO Strategies for Modern Web Apps"
            content="Understand how to structure content, optimize meta tags, and implement technical SEO strategies to improve search rankings and visibility."
          />
        </div>
      </section>
    </Layout>
  );
};
