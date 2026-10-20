import type { Metadata } from "next";
import { AccountantsLanding } from "@/src/screens/AccountantsLanding";

// Edit this per-locale copy to match the product name once set.
const copyByLocale: Record<string, { title: string; description: string }> = {
  en: {
    title: "[PON_AQUÍ_EL_NOMBRE] — AI agent for real estate",
    description:
      "AI agent that answers real estate leads in under 60 seconds on WhatsApp, qualifies the buyer and books the showing in the agent's calendar. 14-day free trial.",
  },
  es: {
    title: "[PON_AQUÍ_EL_NOMBRE] — Agente IA para inmobiliarias",
    description:
      "Agente de IA que responde a cada lead en menos de 60 segundos por WhatsApp, califica al comprador y agenda la visita en el calendario del agente. Prueba gratis 14 días.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = copyByLocale[locale] ?? copyByLocale.en;
  return {
    // absolute override: the global template "%s | DevQueens" does not
    // apply here. This page shows only the product brand on the tab.
    title: { absolute: copy.title },
    description: copy.description,
    alternates: {
      canonical: locale === "en" ? "/accountants" : `/${locale}/accountants`,
      languages: {
        en: "/accountants",
        es: "/es/accountants",
        "x-default": "/accountants",
      },
    },
  };
}

export default function AccountantsPage() {
  return <AccountantsLanding />;
}
