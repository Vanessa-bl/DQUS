import type { Metadata } from "next";
import { AccountantsLanding } from "@/src/screens/AccountantsLanding";

const copyByLocale: Record<string, { title: string; description: string }> = {
  en: {
    title: "Accountants, Professional Websites",
    description:
      "Custom professional websites for accountants: designed to convey trust, attract new clients, and position you as a market reference.",
  },
  es: {
    title: "Contadores, Sitios Web Profesionales",
    description:
      "Sitios web profesionales personalizados para contadores: diseñados para transmitir confianza, atraer nuevos clientes y posicionarte como referente.",
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
