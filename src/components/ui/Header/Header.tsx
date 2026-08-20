import React from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import "./Header.css";
import { useTheme } from "../../../theme/ThemeContext";
import { useT } from "../../../i18n/useT";
import { useLocale } from "../../../i18n/provider";
import Logo from "../Logo/Logo";
import { AnimatedLink } from "../Link/AnimatedLink/AnimatedLink";
import { ThemeSwitch } from "../ThemeSwitch/ThemeSwitch";

interface HeaderProps {
  onMenuClick?: () => void;
  minimal?: boolean;
  showThemeSwitch?: boolean;
  transparent?: boolean;
  anchorNav?: { id: string; label: string; labelKey?: string }[];
}

export const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  minimal = false,
  showThemeSwitch = false,
  transparent = false,
  anchorNav,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale } = useLocale();
  const t = useT();

  const handleMenuClick = onMenuClick ?? (() => {});

  const navLinkStyle: React.CSSProperties = {
    fontFamily: "'Nunito Sans', sans-serif",
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "var(--card-text)",
    letterSpacing: "0.01em",
  };

  return (
    <motion.header
      role="banner"
      className={`header${minimal ? " header--minimal" : ""}${transparent ? " header--transparent" : ""}`}
      {...(transparent ? { "data-theme": "dark" } : {})}
    >
      {!minimal && (
        <button
          className="button-header mobile-only"
          aria-label={t("header.menu.open", "Open menu")}
          onClick={handleMenuClick}
        >
          <svg width="25" height="16" viewBox="0 0 20 13" fill="none" aria-hidden="true">
            <line x1="0" y1="1"  x2="20" y2="1"  stroke="#d4d4d4" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="3" y1="6.5" x2="20" y2="6.5" stroke="#d4d4d4" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="6" y1="12" x2="20" y2="12" stroke="#d4d4d4" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
      )}

      <Logo />

      {!minimal && (
        <nav className="header__desktop-nav" aria-label="Main navigation">
          <ul>
            {anchorNav ? (
              anchorNav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    style={{
                      fontFamily: "'Nunito Sans', sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "var(--card-text)",
                      letterSpacing: "0.01em",
                      textDecoration: "none",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(item.id);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {item.labelKey ? t(item.labelKey, item.label) : item.label}
                  </a>
                </li>
              ))
            ) : (
              <>
                <li>
                  <AnimatedLink to="/" size="0.85rem" aria-label={t("header.nav.home", "Go to Home")} style={navLinkStyle}>
                    {t("header.home", "Home")}
                  </AnimatedLink>
                </li>
                <li>
                  <AnimatedLink to="/services" size="0.85rem" aria-label={t("header.nav.services", "Go to Services")} style={navLinkStyle}>
                    {t("header.services", "Services")}
                  </AnimatedLink>
                </li>
                <li>
                  <AnimatedLink to="/about" size="0.85rem" aria-label={t("header.nav.about", "Go to About")} style={navLinkStyle}>
                    {t("header.about", "About")}
                  </AnimatedLink>
                </li>
                <li>
                  <AnimatedLink to="/contact" size="0.85rem" aria-label={t("header.nav.contact", "Go to Contact")} style={navLinkStyle}>
                    {t("header.contact", "Contact")}
                  </AnimatedLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}

      <nav className="header__nav" aria-label="Redes sociales">
        <ul>
          <li>
            <a className="header__cta" href="/contact">
              {t("header.letsTalk", "Let's Talk")}
            </a>
          </li>
          <li>
            <div className="header__locale">
              <button
                className={`header__locale-btn${locale === "en" ? " is-active" : ""}`}
                onClick={() => setLocale("en")}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                className={`header__locale-btn${locale === "es" ? " is-active" : ""}`}
                onClick={() => setLocale("es")}
                aria-label="Cambiar a Español"
              >
                ES
              </button>
            </div>
          </li>
          <li>
            {showThemeSwitch &&
              (minimal ? (
                <ThemeSwitch />
              ) : (
                <button
                  className="button-header button-header--theme"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                  {theme === "dark" ? (
                    <Sun size={18} strokeWidth={1.5} color="var(--card-text)" />
                  ) : (
                    <Moon size={18} strokeWidth={1.5} color="var(--card-text)" />
                  )}
                </button>
              ))}
          </li>
        </ul>
      </nav>
    </motion.header>
  );
};
