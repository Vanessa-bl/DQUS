// src/theme/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";

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

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme;
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
    document.documentElement.classList.remove("no-transitions");
  }, []);

  const toggleTheme = () => {
    const destination: Theme = theme === "light" ? "dark" : "light";
    setNextTheme(destination);
    document.documentElement.classList.add("no-transitions");
    setAnimating(true);
  };

  const handleOverlayRef = (el: HTMLDivElement | null) => {
    if (!el) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTheme(nextTheme);
        localStorage.setItem("theme", nextTheme);
        document.documentElement.setAttribute("data-theme", nextTheme);
        el.style.opacity = "0";
      });
    });
  };

  const handleOverlayEnd = () => {
    setAnimating(false);
    document.documentElement.classList.remove("no-transitions");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, animating }}>
      {children}
      {animating &&
        createPortal(
          <div
            data-theme={nextTheme}
            onTransitionEnd={handleOverlayEnd}
            ref={handleOverlayRef}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "var(--color-bg)",
              zIndex: 9999,
              pointerEvents: "none",
              opacity: 1,
              transition: "opacity 0.3s ease-in-out",
            }}
          />,
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
