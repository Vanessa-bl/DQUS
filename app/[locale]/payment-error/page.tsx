import type { Metadata } from "next";
import { PaymentError } from "@/src/screens/PaymentError";

const copyByLocale: Record<string, { title: string; description: string }> = {
  en: {
    title: "Payment Error",
    description:
      "There was an issue processing your payment. Please try again.",
  },
  es: {
    title: "Error en el Pago",
    description:
      "Hubo un problema al procesar tu pago. Por favor, intentá de nuevo.",
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
    robots: { index: false, follow: false },
    alternates: {
      canonical: locale === "en" ? "/payment-error" : `/${locale}/payment-error`,
    },
  };
}

export default async function PaymentErrorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <PaymentError locale={locale as "en" | "es"} />;
}
