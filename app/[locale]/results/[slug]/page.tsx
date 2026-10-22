import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import {
  getAllResults,
  getResultBySlug,
  getRelatedResults,
} from "@/lib/results";
import type { Locale } from "@/lib/blog";
import { ResultCase } from "@/src/screens/ResultCase";

type Params = { locale: string; slug: string };

const SITE_URL = "https://www.devqueens.us";

const copyByLocale: Record<string, {
  resultsLabel: string;
  publishedLabel: string;
  updatedLabel: string;
  clientLabel: string;
  categoryLabel: string;
  outcomeLabel: string;
  metricsLabel: string;
  relatedLabel: string;
}> = {
  en: {
    resultsLabel: "Our Cases",
    publishedLabel: "Published",
    updatedLabel: "Updated",
    clientLabel: "Client",
    categoryLabel: "Category",
    outcomeLabel: "Outcome",
    metricsLabel: "Key metrics",
    relatedLabel: "Related cases",
  },
  es: {
    resultsLabel: "Nuestros Casos",
    publishedLabel: "Publicado",
    updatedLabel: "Actualizado",
    clientLabel: "Cliente",
    categoryLabel: "Categoría",
    outcomeLabel: "Resultado",
    metricsLabel: "Métricas clave",
    relatedLabel: "Casos relacionados",
  },
};

export async function generateStaticParams(): Promise<Params[]> {
  const out: Params[] = [];
  for (const locale of ["en", "es"] as const) {
    for (const r of getAllResults(locale)) {
      out.push({ locale, slug: r.slug });
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const safeLocale: Locale = locale === "es" ? "es" : "en";
  const r = getResultBySlug(slug, safeLocale);
  if (!r) return {};
  const path =
    safeLocale === "en" ? `/results/${slug}` : `/${safeLocale}/results/${slug}`;
  return {
    title: r.title,
    description: r.description,
    alternates: {
      canonical: path,
      languages: {
        en: `/results/${slug}`,
        es: `/es/results/${slug}`,
        "x-default": `/results/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: r.title,
      description: r.description,
      url: path,
      publishedTime: r.publishedAt,
      modifiedTime: r.updatedAt,
      tags: r.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: r.title,
      description: r.description,
    },
  };
}

export default async function ResultCasePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  const safeLocale: Locale = locale === "es" ? "es" : "en";
  const r = getResultBySlug(slug, safeLocale);
  if (!r) notFound();
  const related = getRelatedResults(slug, safeLocale, 2);
  const copy = copyByLocale[safeLocale] ?? copyByLocale.en;

  const url =
    safeLocale === "en"
      ? `${SITE_URL}/results/${slug}`
      : `${SITE_URL}/${safeLocale}/results/${slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: r.title,
      description: r.description,
      datePublished: r.publishedAt,
      dateModified: r.updatedAt,
      publisher: {
        "@type": "Organization",
        name: "DevQueens",
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      articleSection: r.category,
      keywords: r.tags.join(", "),
      inLanguage: safeLocale,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: safeLocale === "es" ? "Inicio" : "Home",
          item:
            safeLocale === "en" ? SITE_URL : `${SITE_URL}/${safeLocale}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: copy.resultsLabel,
          item:
            safeLocale === "en"
              ? `${SITE_URL}/results`
              : `${SITE_URL}/${safeLocale}/results`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: r.title,
          item: url,
        },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((obj, i) => (
        <Script
          key={i}
          id={`result-jsonld-${i}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
      <ResultCase
        locale={safeLocale}
        caseItem={r}
        related={related}
        copy={copy}
      />
    </>
  );
}
