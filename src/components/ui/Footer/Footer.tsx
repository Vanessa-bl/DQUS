import type React from "react";
import { motion } from "framer-motion";
import "./footer.css";
import { AnimatedLink } from "../Link/AnimatedLink/AnimatedLink";
import { useT } from "../../../i18n/useT";
import { useLocale } from "../../../i18n/provider";

interface FooterProps {
  minimal?: boolean;
  showLocaleSwitcher?: boolean;
  landingLinks?: { id: string; label: string }[];
}

const Footer: React.FC<FooterProps> = ({
  minimal = false,
  showLocaleSwitcher = false,
  landingLinks,
}) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const currentYear = new Date().getFullYear();
  const t = useT();
  const { locale, setLocale } = useLocale();

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const, delay: 0.08 * i },
    }),
  };

  const linkStyle: React.CSSProperties = {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: "0.9rem",
    fontWeight: 500,
    color: "var(--card-text-regular)",
  };

  return (
    <motion.footer
      className="footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      role="contentinfo"
    >
      <div className="footer-container">
        <div className="footer-content" style={landingLinks ? { gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1.5fr" } : undefined}>
          <motion.div className="footer-brand" custom={0} variants={fadeUp}>
            <h3
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 800,
                fontSize: "1.5rem",
                color: "var(--card-text)",
                margin: "0 0 12px",
                letterSpacing: "-0.02em",
              }}
            >
              DevQueens
            </h3>
            <p
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                color: "var(--card-text-regular)",
                marginBottom: "24px",
              }}
            >
              {t("footer.description", "Small, senior team fixing ecommerce and logistics stacks when they start bleeding revenue.")}
            </p>
            <a
              href="mailto:hello@devqueensus.com"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "var(--card-text)",
                textDecoration: "none",
              }}
            >
              {t("footer.email", "hello@devqueensus.com")}
            </a>
          </motion.div>

          {!minimal && (
            <motion.div className="footer-section" custom={1} variants={fadeUp}>
              <h4
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: "var(--card-text)",
                  marginBottom: "20px",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                }}
              >
                {landingLinks ? t("footer.sections", "Secciones") : t("footer.services", "Services")}
              </h4>
              <nav className="footer-nav" style={landingLinks ? { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" } : undefined}>
                {landingLinks ? (
                  landingLinks.map((link) => (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
                      }}
                      style={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        color: "var(--card-text-regular)",
                        textDecoration: "none",
                      }}
                    >
                      {link.label}
                    </a>
                  ))
                ) : (
                  <AnimatedLink to="/services" size="0.9rem" style={linkStyle}>
                    {t("footer.services.all", "All services")}
                  </AnimatedLink>
                )}
              </nav>
            </motion.div>
          )}

          {!minimal && !landingLinks && (
            <motion.div className="footer-section" custom={2} variants={fadeUp}>
              <h4
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: "var(--card-text)",
                  marginBottom: "20px",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                }}
              >
                {t("footer.company", "Company")}
              </h4>
              <nav className="footer-nav">
                <AnimatedLink to="/about" size="0.9rem" style={linkStyle}>
                  {t("footer.company.about", "About us")}
                </AnimatedLink>
                <AnimatedLink to="/contact" size="0.9rem" style={linkStyle}>
                  {t("footer.company.contact", "Contact")}
                </AnimatedLink>
              </nav>
            </motion.div>
          )}

          {!minimal && (
            <motion.div className="footer-cta" custom={3} variants={fadeUp}>
              <div className="footer-cta__glow" aria-hidden="true" />
              <h4 className="footer-cta__title">
                {t("footer.cta.title", "Something breaking?")}
              </h4>
              <p className="footer-cta__desc">
                {t("footer.cta.desc", "Book a free 30-min audit. We'll show you where you're leaking revenue and what it takes to fix.")}
              </p>
              <motion.a
                href="mailto:hello@devqueensus.com"
                className="footer-cta__button"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {t("footer.cta.button", "Book a Free Audit")}
              </motion.a>
            </motion.div>
          )}
        </div>

        <div className="footer-divider" />

        <motion.div className="footer-bottom" custom={4} variants={fadeUp}>
          <div className="footer-bottom-left">
            <p className="copyright">
              &copy; {currentYear} {t("footer.copyright", "DevQueens. All Rights Reserved.")}
            </p>
          </div>

          <div className="footer-bottom-right">
            {showLocaleSwitcher && (
              <div className="footer-locale" aria-label="Locale switcher">
                <button
                  type="button"
                  className={`locale-button${locale === "en" ? " is-active" : ""}`}
                  onClick={() => setLocale("en")}
                >
                  EN
                </button>
                <button
                  type="button"
                  className={`locale-button${locale === "es" ? " is-active" : ""}`}
                  onClick={() => setLocale("es")}
                >
                  ES
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
