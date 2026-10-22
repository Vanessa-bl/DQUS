import type { Metadata } from "next";
import {
  getPaginatedResults,
  getTotalPages,
} from "@/lib/results";
import type { Locale } from "@/lib/blog";
import { Results } from "@/src/screens/Results";

type Params = { locale: string };

const copyByLocale: Record<string, {
  title: string;
  description: string;
  eyebrow: string;
  titleLine1: string;
  titleMark: string;
  lede: string;
  readLabel: string;
  prevLabel: string;
  nextLabel: string;
}> = {
  en: {
    title: "Results | AI automation and agent surfaces that shipped",
    description:
      "Case studies from DevQueens: AI automations, agent surfaces, and GEO marketing that shipped to production with measurable outcomes.",
    eyebrow: "OUR CASES",
    titleLine1: "Our",
    titleMark: "Cases.",
    lede: "Short, anonymized case notes from engagements shipped in the last twelve months. Numbers are real; names are not.",
    readLabel: "Read Case",
    prevLabel: "Previous page",
    nextLabel: "Next page",
  },
  es: {
    title: "Resultados | Automatizaciones con IA y agentes en producción",
    description:
      "Casos de DevQueens: automatizaciones con IA, agentes y marketing GEO entregados a producción con resultados medibles.",
    eyebrow: "NUESTROS CASOS",
    titleLine1: "Nuestros",
    titleMark: "Casos.",
    lede: "Notas cortas y anonimizadas de proyectos entregados en los últimos doce meses. Los números son reales; los nombres no.",
    readLabel: "Ver caso",
    prevLabel: "Página anterior",
    nextLabel: "Página siguiente",
  },
};

export async function generateStaticParams(): Promise<Params[]> {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = copyByLocale[locale] ?? copyByLocale.en;
  const path = locale === "en" ? "/results" : `/${locale}/results`;
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        en: "/results",
        es: "/es/results",
        "x-default": "/results",
      },
    },
    openGraph: {
      type: "website",
      title: copy.title,
      description: copy.description,
      url: path,
    },
  };
}

export default async function ResultsIndexPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = locale === "es" ? "es" : "en";
  const cases = getPaginatedResults(safeLocale, 1);
  const totalPages = getTotalPages(safeLocale);
  const copy = copyByLocale[safeLocale] ?? copyByLocale.en;
  const localePrefix = safeLocale === "en" ? "" : `/${safeLocale}`;
  const pageHref = (page: number) =>
    page === 1
      ? `${localePrefix}/results`
      : `${localePrefix}/results/page/${page}`;
  return (
    <Results
      locale={safeLocale}
      cases={cases}
      copy={copy}
      currentPage={1}
      totalPages={totalPages}
      pageHref={pageHref}
    />
  );
}
