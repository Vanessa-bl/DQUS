"use client";

import { useEffect, type ReactNode } from "react";
import { LocaleProvider } from "@/src/i18n/provider";
import { ThemeProvider } from "@/src/theme/ThemeContext";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.remove("no-transitions");
  }, []);

  return (
    <LocaleProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </LocaleProvider>
  );
}
