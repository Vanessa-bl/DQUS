import type { Metadata } from "next";
import { ConversionAudit } from "@/src/screens/ConversionAudit";

const copyByLocale: Record<string, { title: string; description: string }> = {
  en: {
    title: "Conversion Audit",
    description:
      "A one-time, expert audit of your website's UX, technical performance, and copy clarity to identify exactly where you are losing customers.",
  },
  es: {
    title: "Auditoría de Conversión",
    description:
      "Auditoría experta única de UX, rendimiento técnico y claridad de copy para identificar exactamente dónde estás perdiendo clientes.",
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
      canonical:
        locale === "en" ? "/conversion-audit" : `/${locale}/conversion-audit`,
      languages: {
        en: "/conversion-audit",
        es: "/es/conversion-audit",
        "x-default": "/conversion-audit",
      },
    },
  };
}

export default async function ConversionAuditPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ConversionAudit locale={locale as "en" | "es"} />;
}
