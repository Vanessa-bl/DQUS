import React from "react";
import { Menu } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Header.css";
import { useTheme } from "../../../theme/ThemeContext";
import Logo from "../Logo/Logo";

interface HeaderProps {
  onMenuClick: () => void;
  shrinkPointPx?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  shrinkPointPx = 200,
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

  return (
    <motion.header
      role="banner"
      className="header"
      style={{
        width,
        backgroundColor,
      }}
    >
      <button
        className="button-header"
        aria-label="Abrir menú"
        onClick={onMenuClick}
      >
        <Menu />
      </button>

      <Logo />

      <nav className="header__nav" aria-label="Redes sociales">
        <ul>
          {/* 
                      <li>
            <a href="#" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </li>
          <li>
            <a href="#" aria-label="Soporte">
              <Headset size={20} />
            </a>
          </li>
          */}
          <li>
            <button
              className="button-header"
              onClick={toggleTheme}
              style={{ fontSize: "1.1rem" }}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
};
