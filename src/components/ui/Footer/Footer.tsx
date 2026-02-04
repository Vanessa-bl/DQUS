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

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.15,
      },
    },
  };

  const handleLocaleChange = (locale: Locale) => {
    if (locale === currentLocale) {
      return;
    }

    const nextPath =
      toLocalePath(location.pathname, locale) +
      location.search +
      location.hash;

    navigate(nextPath);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const services = ["All services"];
  {
    /*const socialLinks = [{ name: "LinkedIn", href: "#" }];*/
  }

  return (
    <motion.footer
      className="footer"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      role="contentinfo"
    >
      <div className="footer-container">
        {/* Main Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <motion.div className="footer-brand" variants={itemVariants}>
            <motion.h3 className="footer-logo" variants={titleVariants}>
              <span className="animated-title">DevQueens</span>
            </motion.h3>
            <p className="footer-description">
              We deliver exceptional digital experiences that drive growth and
              innovation.
            </p>
            <div className="footer-contact-info">
              <a href="mailto:hello@devqueensus.com" className="contact-link">
                hello@devqueensus.com
              </a>
            </div>
          </motion.div>

          {/* Services Section */}
          {!minimal && (
            <motion.div className="footer-section" variants={itemVariants}>
              <h4 className="section-title">Services</h4>
              <nav className="footer-nav">
                {services.map((service) => (
                  <AnimatedLink
                    key={service}
                    to="/services"
                    className="nav-link contact-link"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {service}
                  </AnimatedLink>
                ))}
              </nav>
            </motion.div>
          )}

          {/* Company Section */}
          {!minimal && (
            <motion.div className="footer-section" variants={itemVariants}>
              <h4 className="section-title">Company</h4>
              <nav className="footer-nav">
                <AnimatedLink
                  to="/about"
                  className="nav-link contact-link"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  About us
                </AnimatedLink>
                <AnimatedLink
                  to="/contact"
                  className="nav-link contact-link"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  Contact
                </AnimatedLink>
              </nav>
            </motion.div>
          )}

          {/* CTA Section */}
          {!minimal && (
            <motion.div className="footer-cta" variants={itemVariants}>
              <h4 className="cta-title">Ready to Get Started?</h4>
              <p className="cta-description">
                Let’s talk about your next digital project.
              </p>
              <motion.a
                href="mailto:hello@devqueensus.com"
                className="cta-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                Start a Project
              </motion.a>
            </motion.div>
          )}
        </div>

        {/* Divider */}
        <motion.div
          className="footer-divider"
          variants={itemVariants}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Bottom Section */}
        <motion.div className="footer-bottom" variants={itemVariants}>
          <div className="footer-bottom-left">
            <p className="copyright">
              © {currentYear} DevQueens. All Rights Reserved.
            </p>
          </div>

          <div className="footer-bottom-center">
            <div className="social-links">
              {/*{socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="social-link"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {social.name}
                </motion.a>
              ))}
                */}
            </div>
          </div>

          <div className="footer-bottom-right">
            {showLocaleSwitcher ? (
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
            ) : null}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
