import type { Metadata } from "next";
import { AgenticLanding } from "@/src/screens/AgenticLanding";
import { agenticLandings } from "@/src/screens/agenticLandingContent";

const content = agenticLandings["real-estate"];
const path = "/real-estate";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = locale === "en" ? path : `/${locale}${path}`;

  return {
    // absolute override: the product landing carries its own title.
    title: { absolute: content.meta.title },
    description: content.meta.description,
    alternates: {
      canonical,
      languages: {
        en: path,
        es: `/es${path}`,
        "x-default": path,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      url: canonical,
      title: content.meta.title,
      description: content.meta.description,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: content.meta.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.description,
      images: [{ url: "/og-image.jpg", alt: content.meta.ogAlt }],
    },
  };
}

export default function RealEstatePage() {
  return <AgenticLanding vertical="real-estate" />;
}
