import type React from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import "./footer.css";
import { AnimatedLink } from "../Link/AnimatedLink/AnimatedLink";
import { getLocaleFromPath, toLocalePath } from "../../../i18n/locale";
import type { Locale } from "../../../i18n";

interface FooterProps {
  minimal?: boolean;
  showLocaleSwitcher?: boolean;
}

const Footer: React.FC<FooterProps> = ({
  minimal = false,
  showLocaleSwitcher = false,
}) => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  const currentLocale = getLocaleFromPath(location.pathname);

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.08 * i },
    }),
  };

  const handleLocaleChange = (locale: Locale) => {
    if (locale === currentLocale) return;
    const nextPath =
      toLocalePath(location.pathname, locale) +
      location.search +
      location.hash;
    navigate(nextPath);
  };

  const services = ["All services"];

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
        <div className="footer-content">
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
              We deliver exceptional digital experiences that drive growth and
              innovation.
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
              hello@devqueensus.com
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
                Services
              </h4>
              <nav className="footer-nav">
                {services.map((service) => (
                  <AnimatedLink
                    key={service}
                    to="/services"
                    size="0.9rem"
                    style={linkStyle}
                  >
                    {service}
                  </AnimatedLink>
                ))}
              </nav>
            </motion.div>
          )}

          {!minimal && (
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
                Company
              </h4>
              <nav className="footer-nav">
                <AnimatedLink to="/about" size="0.9rem" style={linkStyle}>
                  About us
                </AnimatedLink>
                <AnimatedLink to="/contact" size="0.9rem" style={linkStyle}>
                  Contact
                </AnimatedLink>
              </nav>
            </motion.div>
          )}

          {!minimal && (
            <motion.div className="footer-cta" custom={3} variants={fadeUp}>
              <div
                style={{
                  position: "absolute",
                  width: "160px",
                  height: "160px",
                  background: "rgba(168,85,247,0.2)",
                  borderRadius: "50%",
                  top: "-60px",
                  right: "-40px",
                  filter: "blur(40px)",
                  pointerEvents: "none",
                }}
              />
              <h4
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "#fff",
                  marginBottom: "6px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                Ready to Get Started?
              </h4>
              <p
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.75)",
                  marginBottom: "20px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                Let's talk about your next digital project.
              </p>
              <motion.a
                href="mailto:hello@devqueensus.com"
                style={{
                  display: "inline-block",
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "var(--card-text)",
                  background: "var(--card-bg)",
                  padding: "0.65rem 1.5rem",
                  borderRadius: "999px",
                  textDecoration: "none",
                  position: "relative",
                  zIndex: 1,
                }}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                Start a Project
              </motion.a>
            </motion.div>
          )}
        </div>

        <div className="footer-divider" />

        <motion.div className="footer-bottom" custom={4} variants={fadeUp}>
          <div className="footer-bottom-left">
            <p className="copyright">
              &copy; {currentYear} DevQueens. All Rights Reserved.
            </p>
          </div>

          <div className="footer-bottom-right">
            {showLocaleSwitcher && (
              <div className="footer-locale" aria-label="Locale switcher">
                <button
                  type="button"
                  className={`locale-button${currentLocale === "en" ? " is-active" : ""}`}
                  onClick={() => handleLocaleChange("en")}
                >
                  EN
                </button>
                <button
                  type="button"
                  className={`locale-button${currentLocale === "es" ? " is-active" : ""}`}
                  onClick={() => handleLocaleChange("es")}
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
