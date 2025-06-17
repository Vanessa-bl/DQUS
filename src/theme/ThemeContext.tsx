// src/theme/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import "./ThemeClips.css";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  animating: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [nextTheme, setNextTheme] = useState<Theme>("light");
  const [animating, setAnimating] = useState(false);
  const [scrollYPos, setScrollYPos] = useState(0);
  const WAVE_DURATION = 0.5;

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme;
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
    document.documentElement.classList.remove("no-transitions");
  }, []);

  // Escuchar scroll para guardar la posición actual
  useEffect(() => {
    const onScroll = () => {
      setScrollYPos(window.scrollY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const toggleTheme = () => {
    const destination: Theme = theme === "light" ? "dark" : "light";
    setNextTheme(destination);
    document.documentElement.classList.add("no-transitions");
    setAnimating(true);
  };

  const handleAnimationComplete = () => {
    setAnimating(false);
    setTimeout(() => {
      setTheme(nextTheme);
      localStorage.setItem("theme", nextTheme);
      document.documentElement.setAttribute("data-theme", nextTheme);
      setTimeout(() => {
        document.documentElement.classList.remove("no-transitions");
      }, 50);
    }, 0);
  };

  const waveVariants = {
    initial: {
      clipPath: "circle(0% at 100% 0%)",
      WebkitClipPath: "circle(0% at 100% 0%)",
    },
    animate: {
      clipPath: "circle(150% at 100% 0%)",
      WebkitClipPath: "circle(150% at 100% 0%)",
      transition: { duration: WAVE_DURATION, ease: "easeInOut" },
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, animating }}>
      <div>{children}</div>
      {animating &&
        createPortal(
          <AnimatePresence>
            <motion.div
              key="theme-wave"
              className="clippedLayer"
              variants={waveVariants}
              initial="initial"
              animate="animate"
              onAnimationStart={() => console.log("🏄 wave: inicio anim")}
              onAnimationComplete={handleAnimationComplete}
            >
              <div
                data-theme={nextTheme}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "var(--color-bg)",
                }}
              />
              <div
                data-theme={nextTheme}
                style={{
                  position: "fixed",
                  top: -scrollYPos,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  background: "transparent",
                }}
              >
                {children}
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe usarse dentro de ThemeProvider");
  }
  return context;
}
