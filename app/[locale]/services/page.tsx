import type { Metadata } from "next";
import { Services } from "@/src/screens/Services";

const copyByLocale: Record<string, { title: string; description: string }> = {
  en: {
    title: "Services | Automation, AI Agents, and AI Marketing",
    description:
      "Services from DevQueens: process automations that drain manual hours, AI agent surfaces on your product, and AI marketing that puts you inside ChatGPT, Claude, and Perplexity. Public prices, fixed scope, fixed timeline.",
  },
  es: {
    title: "Servicios | Automatización, Agentes de IA y Marketing para IA",
    description:
      "Servicios de DevQueens: automatizaciones que ahorran horas manuales, agentes de IA sobre tu producto y marketing para IA que te mete adentro de ChatGPT, Claude y Perplexity. Precios públicos, alcance fijo, plazo fijo.",
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
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: locale === "en" ? "/services" : `/${locale}/services`,
      languages: {
        en: "/services",
        es: "/es/services",
        "x-default": "/services",
      },
    },
  };
}

export default function ServicesPage() {
  return <Services />;
}
