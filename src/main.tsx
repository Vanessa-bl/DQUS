// src/main.tsx
import { createRoot } from "react-dom/client";
import "./index.css"; // tu CSS global con las reglas de .no-transitions
import App from "./App";
import { ThemeProvider } from "./theme/ThemeContext";
import { LocaleProvider } from "./i18n/provider";

// ANTES de montar nada, añadimos la clase no-transitions
document.documentElement.classList.add("no-transitions");

createRoot(document.getElementById("root")!).render(
  <LocaleProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </LocaleProvider>
);
