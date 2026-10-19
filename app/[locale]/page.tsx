import type { Metadata } from "next";
import { Home } from "@/src/screens/home";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      canonical: locale === "en" ? "/" : `/${locale}`,
      languages: {
        en: "/",
        es: "/es",
        "x-default": "/",
      },
    },
  };
}

export default function HomePage() {
  return <Home />;
}
