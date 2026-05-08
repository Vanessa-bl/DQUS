import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { IntlProvider } from "react-intl";

type Locale = "en" | "es";

const messagesMap: Record<Locale, Record<string, string>> = {
  en: {},
  es: {},
};

async function loadMessages(locale: Locale): Promise<Record<string, string>> {
  if (Object.keys(messagesMap[locale]).length > 0) return messagesMap[locale];
  const mod = await import(`./messages/${locale}.json`);
  messagesMap[locale] = mod.default ?? mod;
  return messagesMap[locale];
}

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

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    try {
      const saved = localStorage.getItem("locale");
      if (saved === "en" || saved === "es") return saved;
    } catch {}
    return "en";
  });
  const [messages, setMessages] = useState<Record<string, string>>({});

  useEffect(() => {
    loadMessages(locale).then(setMessages);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try { localStorage.setItem("locale", next); } catch {}
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <IntlProvider locale={locale} messages={messages} defaultLocale="en" onError={() => {}}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
}
