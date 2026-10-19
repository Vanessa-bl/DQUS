import type { Metadata } from "next";
import { Contact } from "@/src/screens/Contact";

const copyByLocale: Record<string, { title: string; description: string }> = {
  en: {
    title: "Contact | Start a Paid Proof of Concept",
    description:
      "Contact DevQueens to start a $3K to $7K paid proof of concept in 5 to 10 days. Automations, AI agents, or AI marketing, tailored to your company.",
  },
  es: {
    title: "Contacto | Arrancá una Prueba de Concepto Paga",
    description:
      "Contactá a DevQueens para arrancar una prueba de concepto paga de USD 3K a 7K en 5 a 10 días. Automatizaciones, agentes de IA o marketing para IA, a la medida de tu empresa.",
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
      canonical: locale === "en" ? "/contact" : `/${locale}/contact`,
      languages: {
        en: "/contact",
        es: "/es/contact",
        "x-default": "/contact",
      },
    },
  };
}

export default function ContactPage() {
  return <Contact />;
}
