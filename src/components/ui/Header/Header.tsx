import React from "react";
import { Menu, Sun, Moon } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Header.css";
import { useTheme } from "../../../theme/ThemeContext";
import Logo from "../Logo/Logo";
import { AnimatedLink } from "../Link/AnimatedLink/AnimatedLink";
import { ThemeSwitch } from "../ThemeSwitch/ThemeSwitch";

interface HeaderProps {
  onMenuClick?: () => void;
  shrinkPointPx?: number;
  minimal?: boolean;
  showThemeSwitch?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  shrinkPointPx = 200,
  minimal = false,
  showThemeSwitch = true,
}) => {
  const { scrollY } = useScroll();

  const borderColor = useTransform(
    scrollY,
    [0, shrinkPointPx],
    ["rgba(0,0,0,0)", "rgba(0,0,0,0.06)"]
  );

  const boxShadow = useTransform(
    scrollY,
    [0, shrinkPointPx],
    [
      "0 0 0 rgba(0,0,0,0)",
      "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
    ]
  );

  const { theme, toggleTheme } = useTheme();

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
      className={`header${minimal ? " header--minimal" : ""}`}
      style={{
        borderColor,
        boxShadow,
      }}
    >
      {!minimal && (
        <button
          className="button-header mobile-only"
          aria-label="Abrir menú"
          onClick={handleMenuClick}
        >
          <Menu size={20} color="var(--card-text)" />
        </button>
      )}

      <Logo />

      {!minimal && (
        <nav className="header__desktop-nav" aria-label="Main navigation">
          <ul>
            <li>
              <AnimatedLink to="/" size="0.85rem" aria-label="Ir a Home" style={navLinkStyle}>
                Home
              </AnimatedLink>
            </li>
            <li>
              <AnimatedLink to="/services" size="0.85rem" aria-label="Ir a Services" style={navLinkStyle}>
                Services
              </AnimatedLink>
            </li>
            <li>
              <AnimatedLink to="/about" size="0.85rem" aria-label="Ir a About" style={navLinkStyle}>
                About
              </AnimatedLink>
            </li>
            <li>
              <AnimatedLink to="/contact" size="0.85rem" aria-label="Ir a Contact" style={navLinkStyle}>
                Contact
              </AnimatedLink>
            </li>
          </ul>
        </nav>
      )}

      <nav className="header__nav" aria-label="Redes sociales">
        <ul>
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
