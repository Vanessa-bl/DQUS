import type { Metadata } from "next";
import { PaymentSuccess } from "@/src/screens/PaymentSuccess";

const copyByLocale: Record<string, { title: string; description: string }> = {
  en: {
    title: "Payment Successful",
    description: "Your payment has been processed successfully.",
  },
  es: {
    title: "Pago Exitoso",
    description: "Tu pago fue procesado correctamente.",
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
      canonical:
        locale === "en" ? "/payment-success" : `/${locale}/payment-success`,
    },
  };
}

export default async function PaymentSuccessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <PaymentSuccess locale={locale as "en" | "es"} />;
}
