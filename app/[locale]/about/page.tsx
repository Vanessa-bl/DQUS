import type { Metadata } from "next";
import { About } from "@/src/screens/About";

const copyByLocale: Record<string, { title: string; description: string }> = {
  en: {
    title: "About | One Roof for Automation, AI, and Marketing",
    description:
      "DevQueens ships three deliverables for the same company: process automation, AI agents on your product, and AI marketing inside ChatGPT, Claude, and Perplexity.",
  },
  es: {
    title: "Nosotros | Un Lugar para Automatización, IA y Marketing",
    description:
      "DevQueens entrega tres cosas para la misma empresa: automatización de procesos, agentes de IA sobre tu producto, y marketing para IA adentro de ChatGPT, Claude y Perplexity.",
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
      canonical: locale === "en" ? "/about" : `/${locale}/about`,
      languages: {
        en: "/about",
        es: "/es/about",
        "x-default": "/about",
      },
    },
  };
}

export default function AboutPage() {
  return <About />;
}
