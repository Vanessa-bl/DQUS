import React from "react";
import { Menu } from "lucide-react";
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
}

export const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  shrinkPointPx = 200,
  minimal = false,
}) => {
  const { scrollY } = useScroll();

  // ancho que se reduce al hacer scroll
  const width = useTransform(scrollY, [0, shrinkPointPx], ["100%", "90%"]);
  // background que pasa de transparente a semitransparente al hacer scroll
  const backgroundColor = useTransform(
    scrollY,
    [0, shrinkPointPx],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.5)"]
  );

  const { theme, toggleTheme } = useTheme();

  const handleMenuClick = onMenuClick ?? (() => {});

  return (
    <motion.header
      role="banner"
      className={`header${minimal ? " header--minimal" : ""}`}
      style={{
        width,
        backgroundColor,
      }}
    >
      {!minimal && (
        <button
          className="button-header mobile-only"
          aria-label="Abrir menú"
          onClick={handleMenuClick}
        >
          <Menu />
        </button>
      )}

      <Logo />

      {!minimal && (
        <nav className="header__desktop-nav" aria-label="Main navigation">
          <ul>
            <li>
              <AnimatedLink to="/" size="1rem" aria-label="Ir a Home">
                Home
              </AnimatedLink>
            </li>
            <li>
              <AnimatedLink to="/services" size="1rem" aria-label="Ir a Services">
                Services
              </AnimatedLink>
            </li>
            <li>
              <AnimatedLink to="/about" size="1rem" aria-label="Ir a About">
                About
              </AnimatedLink>
            </li>
            <li>
              <AnimatedLink to="/contact" size="1rem" aria-label="Ir a Contact">
                Contact
              </AnimatedLink>
            </li>
          </ul>
        </nav>
      )}

      <nav className="header__nav" aria-label="Redes sociales">
        <ul>
          <li>
            {minimal ? (
              <ThemeSwitch />
            ) : (
              <button
                className="button-header"
                onClick={toggleTheme}
                style={{ fontSize: "1.1rem" }}
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button>
            )}
          </li>
        </ul>
      </nav>
    </motion.header>
  );
};
