"use client";

import { createContext, useContext, type ReactNode } from "react";
import { IntlProvider } from "react-intl";
import enMessages from "./messages/en.json";
import esMessages from "./messages/es.json";

type Locale = "en" | "es";

const MESSAGES: Record<Locale, Record<string, string>> = {
  en: enMessages as Record<string, string>,
  es: esMessages as Record<string, string>,
};

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  setLocale: () => {},
});

export function useLocale() {
  return useContext(LocaleContext);
}

type LocaleProviderProps = {
  children: ReactNode;
  initialLocale?: Locale;
};

export function LocaleProvider({
  children,
  initialLocale = "en",
}: LocaleProviderProps) {
  const locale: Locale = initialLocale;
  const messages = MESSAGES[locale] ?? MESSAGES.en;

  return (
    <LocaleContext.Provider value={{ locale, setLocale: () => {} }}>
      <IntlProvider
        locale={locale}
        messages={messages}
        defaultLocale="en"
        onError={() => {}}
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
}
