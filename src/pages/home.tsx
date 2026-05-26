import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import NewHero from "../components/ui/NewHero/NewHero";
import VideoMaskHero from "../components/ui/VideoMaskHero/VideoMaskHero";
import "./pageStyles.css";
import { Card } from "../components/ui/card/Card";
import {
  Medal,
  UsersRound,
} from "lucide-react";
import { TechCarousel } from "../components/ui/TechCarousel/TechCarousel";
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

const useParallaxY = (ref: React.RefObject<HTMLElement | null>, range: [number, number] = [-12, 12]) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return useTransform(scrollYProgress, [0, 1], range);
};

export const Home: React.FC = () => {
  const isMobile = window.innerWidth < 768;
  const t = useT();
  const welcomeRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const expertiseRef = useRef<HTMLElement>(null);
  const welcomeParallax = useParallaxY(welcomeRef, [-10, 10]);
  const servicesParallax = useParallaxY(servicesRef, [-8, 8]);
  const aboutParallax = useParallaxY(aboutRef, [-10, 10]);
  const expertiseParallax = useParallaxY(expertiseRef, [-8, 8]);
  return (
    <Layout>
      <VideoMaskHero />
      <NewHero />
      <motion.section
        ref={welcomeRef}
        aria-labelledby="welcome-title"
        style={{
          maxWidth: "1280px",
          margin: "80px auto 0",
          padding: "5rem 3rem 4rem",
          background: "var(--card-bg)",
          borderRadius: "15px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
          y: isMobile ? 0 : welcomeParallax,
          willChange: "transform",
        }}
      >
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
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <span
              style={{
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
              }}
            >
              {t("home.welcome.badge", "WELCOME TO DEVQUEENS")}
            </span>

            <h1
              id="welcome-title"
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
              {t("home.welcome.title.line1", "Your Strategic Partner")}
              <br />
              <span
                style={{
                  color: "var(--card-text)",
                  position: "relative",
                  display: "inline-block",
                }}
              >
                {t("home.welcome.title.line2", "for Digital Excellence")}
              </span>
            </h1>
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "1rem",
                lineHeight: 1.75,
                color: "var(--card-text-regular)",
                margin: 0,
              }}
            >
              DevQueens is your strategic partner for innovative, scalable, and
              purpose-driven digital solutions. We specialize in crafting
              high-impact experiences that not only look exceptional but also
              perform flawlessly across all platforms.
            </p>
            <p
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "1rem",
                lineHeight: 1.75,
                color: "var(--card-text-regular)",
                margin: "1rem 0 0",
              }}
            >
              With a solid track record of successful projects across industries,
              our multidisciplinary team blends creativity, technical excellence,
              and user-centered thinking to bring your vision to life.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.6rem",
                marginTop: "1.5rem",
              }}
            >
              {[
                t("home.welcome.features.0", "Enterprise-Grade Solutions"),
                t("home.welcome.features.1", "24/7 Technical Support"),
                t("home.welcome.features.2", "Agile Development Process"),
                t("home.welcome.features.3", "Scalable Architecture"),
              ].map((feat) => (
                <span
                  key={feat}
                  style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "var(--card-text-regular)",
                    background: "var(--feature-pill-bg)",
                    padding: "0.4rem 0.9rem",
                    borderRadius: "999px",
                    border: "1px solid var(--feature-pill-border)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {feat}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: "20px",
          }}
        >
          {[
            {
              Icon: UsersRound,
              title: t("home.cards.collaborative.title", "Collaborative Approach"),
              subtitle: t("home.cards.collaborative.subtitle", "Partnership-driven development"),
              text: "We don't just build solutions — we build partnerships. Our collaborative approach ensures every project aligns with your business goals and exceeds expectations.",
              gradient: "linear-gradient(135deg, #c2410c 0%, #ea580c 40%, #f97316 100%)",
              glow: "rgba(249,115,22,0.35)",
            },
            {
              Icon: Medal,
              title: "Excellence Recognition",
              subtitle: "Award-winning quality",
              text: "Our commitment to excellence has been recognized with industry awards and client accolades, reflecting the high standards we maintain in every project.",
              gradient: "linear-gradient(135deg, #c2410c 0%, #ea580c 40%, #f97316 100%)",
              glow: "rgba(251,146,60,0.35)",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              custom={i + 2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              style={{
                position: "relative",
                background: item.gradient,
                borderRadius: "24px",
                padding: "2.25rem",
                overflow: "hidden",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "240px",
                  height: "240px",
                  background: item.glow,
                  borderRadius: "50%",
                  top: "-60px",
                  right: "-60px",
                  filter: "blur(50px)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(8px)",
                  width: "52px",
                  height: "52px",
                  borderRadius: "16px",
                  marginBottom: "1.25rem",
                  border: "1px solid rgba(255,255,255,0.15)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <item.Icon size={22} color="white" aria-hidden="true" />
              </div>
              <h2
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "4px",
                  letterSpacing: "-0.01em",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {item.title}
              </h2>
              <p
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: "1rem",
                  letterSpacing: "0.03em",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {item.subtitle}
              </p>
              <div
                style={{
                  width: "28px",
                  height: "2px",
                  background: "rgba(255,255,255,0.25)",
                  borderRadius: "1px",
                  marginBottom: "1rem",
                }}
              />
              <p
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.75)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        ref={servicesRef}
        aria-labelledby="services-title"
        style={{
          maxWidth: "1280px",
          margin: "80px auto 0",
          padding: "5rem 3rem 4rem",
          background: "var(--card-bg)",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
          y: isMobile ? 0 : servicesParallax,
          willChange: "transform",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "680px" }}>
          <span
            style={{
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
            }}
          >
            {t("home.services.badge", "Our Services")}
          </span>

          <h2
            id="services-title"
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
            {t("home.services.title.line1", "Comprehensive")}
            <br />
            <span
              style={{
                color: "var(--card-text)",
                position: "relative",
                display: "inline-block",
              }}
            >
              {t("home.services.title.line2", "Digital Solutions")}
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
            We offer a comprehensive suite of digital services designed to elevate
            your brand and accelerate your growth with enterprise-grade solutions
            and strategic expertise.
          </p>
        </div>
        <div className="cards-grid" style={{ gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)" }}>
          <Card
            href="/servicio/diseno"
            target="_blank"
            inverted
            rel="noopener noreferrer"
            aria-label="Corporate Branding: Graphic Design"
            areaService={t("home.services.card1.area", "GRAPHIC DESIGN")}
            title={t("home.services.card1.title", "Corporate Branding")}
            content="We create unique visual identities that perfectly reflect your company's mission and values."
          />
          <Card
            href="#"
            inverted
            aria-label="Fast Code & Deployment: Web Development"
            areaService={t("home.services.card2.area", "WEB DEVELOPMENT")}
            title={t("home.services.card2.title", "Fast Code & Deployment")}
            content="From concept to launch, we streamline your e-commerce or business website in record time."
          />
          <Card
            href="#"
            inverted
            aria-label="Seamless Integration: Mobile Solutions"
            areaService={t("home.services.card3.area", "MOBILE SOLUTIONS")}
            title={t("home.services.card3.title", "Seamless Integration")}
            content="Build cross-platform mobile apps that deliver native performance and unmatched user experience."
          />
          <Card
            inverted
            aria-label="Strategic Guidance: Digital Consulting"
            areaService={t("home.services.card4.area", "DIGITAL CONSULTING")}
            title={t("home.services.card4.title", "Strategic Guidance")}
            content="Leverage our expert insights to refine your digital strategy, optimize processes, and boost ROI."
          />
        </div>
      </motion.section>

      <motion.section
        ref={aboutRef}
        aria-labelledby="about-title"
        style={{
          maxWidth: "1280px",
          margin: "80px auto 0",
          padding: "5rem 3rem 4rem",
          background: "var(--card-bg)",
          borderRadius: "15px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
          y: isMobile ? 0 : aboutParallax,
          willChange: "transform",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "720px" }}>
          <span
            style={{
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
            }}
          >
            {t("home.about.badge", "ABOUT US")}
          </span>

          <h2
            id="about-title"
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
            {t("home.about.title.line1", "Stay Ahead of")}
            <br />
            <span
              style={{
                color: "var(--card-text)",
                position: "relative",
                display: "inline-block",
              }}
            >
              {t("home.about.title.line2", "the Curve")}
            </span>
          </h2>
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
            <p
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "1rem",
                lineHeight: 1.75,
                color: "var(--card-text-regular)",
                margin: 0,
              }}
            >
              Stay ahead of the curve with our carefully curated collection of
              articles, tutorials, and expert resources. From cutting-edge
              design trends to development techniques and strategic insights, we
              provide practical knowledge and thought leadership.
            </p>
            <p
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "1rem",
                lineHeight: 1.75,
                color: "var(--card-text-regular)",
                margin: "1rem 0 0",
              }}
            >
              Whether you're a designer, developer, or digital strategist,
              you'll find valuable guidance to sharpen your skills, make
              informed decisions, and drive meaningful results in your projects.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.6rem",
                marginTop: "1.5rem",
              }}
            >
              {[
                t("home.about.features.0", "Expert Tutorials"),
                t("home.about.features.1", "Best Practices"),
                t("home.about.features.2", "Industry Insights"),
                t("home.about.features.3", "Case Studies"),
              ].map((feat) => (
                <span
                  key={feat}
                  style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "var(--card-text-regular)",
                    background: "var(--feature-pill-bg)",
                    padding: "0.4rem 0.9rem",
                    borderRadius: "999px",
                    border: "1px solid var(--feature-pill-border)",
                    whiteSpace: "nowrap",
                  }}
                >
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
              display: "flex",
              flexDirection: "column",
              gap: "2.5rem",
            }}
          >
            <div style={{ display: "flex", gap: "3rem", alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "2.4rem",
                    color: "var(--card-text)",
                    lineHeight: 1,
                  }}
                >
                  150+
                </span>
                <span
                  style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: "0.82rem",
                    color: "var(--card-text-regular)",
                    letterSpacing: "0.03em",
                  }}
                >
                  Articles Published
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "2.4rem",
                    color: "var(--card-text)",
                    lineHeight: 1,
                  }}
                >
                  50K+
                </span>
                <span
                  style={{
                    fontFamily: "'Nunito Sans', sans-serif",
                    fontSize: "0.82rem",
                    color: "var(--card-text-regular)",
                    letterSpacing: "0.03em",
                  }}
                >
                  Developers Reached
                </span>
              </div>
            </div>

            <div
              style={{
                position: "relative",
                background: "linear-gradient(135deg, #c2410c 0%, #ea580c 40%, #f97316 100%)",
                borderRadius: "20px",
                padding: "1.75rem 2rem",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "200px",
                  height: "200px",
                  background: "rgba(251,146,60,0.15)",
                  borderRadius: "50%",
                  top: "-80px",
                  right: "-40px",
                  filter: "blur(60px)",
                  pointerEvents: "none",
                }}
              />
              <p
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.8)",
                  margin: 0,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                We combine deep industry expertise with a passion for innovation, delivering resources that empower teams to build better digital products — faster.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <div style={{ margin: "80px 0 0" }}>
        <TechCarousel aria-label="Technologies Carousel" />
      </div>

      <motion.section
        ref={expertiseRef}
        aria-labelledby="expertise-title"
        style={{
          maxWidth: "1280px",
          margin: "80px auto 0",
          padding: "5rem 3rem 4rem",
          background: "var(--card-bg)",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
          y: isMobile ? 0 : expertiseParallax,
          willChange: "transform",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "680px" }}>
          <span
            style={{
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
            }}
          >
            What We Do
          </span>

          <h2
            id="expertise-title"
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
            Expertise That
            <br />
            <span
              style={{
                color: "var(--card-text)",
                position: "relative",
                display: "inline-block",
              }}
            >
              Moves Brands Forward
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
            From concept to design, we bring strategic know-how and creative
            solutions to every project. Our team shares actionable insights,
            proven techniques, and industry best practices.
          </p>
        </div>

        <div className="cards-grid" style={{ gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)" }}>
          <Card
            inverted
            areaService={t("home.expertise.card1.area", "Accessibility")}
            title={t("home.expertise.card1.title", "Improving Accessibility in React")}
            content="Learn best practices to ensure your React components are fully accessible and compliant with WCAG standards, creating inclusive digital experiences."
          />
          <Card
            inverted
            areaService={t("home.expertise.card2.area", "Web Development")}
            title={t("home.expertise.card2.title", "Optimizing Performance with Next.js")}
            content="Discover advanced techniques to boost page speed and SEO, from image optimization to smart caching strategies and Core Web Vitals improvement."
          />
          <Card
            inverted
            areaService={t("home.expertise.card3.area", "UI/UX Design")}
            title={t("home.expertise.card3.title", "UI/UX Design Best Practices")}
            content="Explore design principles that create intuitive interfaces and memorable user experiences, backed by research and real-world case studies."
          />
          <Card
            inverted
            areaService={t("home.expertise.card4.area", "Seo and Positioning")}
            title={t("home.expertise.card4.title", "SEO Strategies for Modern Web Apps")}
            content="Understand how to structure content, optimize meta tags, and implement technical SEO strategies to improve search rankings and visibility."
          />
        </div>
      </motion.section>
    </Layout>
  );
};
