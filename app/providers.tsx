"use client";

import { useEffect, type ReactNode } from "react";
import { LocaleProvider } from "@/src/i18n/provider";
import { ThemeProvider } from "@/src/theme/ThemeContext";

type ProvidersProps = {
  children: ReactNode;
  initialLocale?: "en" | "es";
};

export function Providers({ children, initialLocale }: ProvidersProps) {
  useEffect(() => {
    document.documentElement.classList.remove("no-transitions");
  }, []);

  return (
    <LocaleProvider initialLocale={initialLocale}>
      <ThemeProvider>{children}</ThemeProvider>
    </LocaleProvider>
  );
}
