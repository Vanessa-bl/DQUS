import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPaginatedResults, getTotalPages } from "@/lib/results";
import type { Locale } from "@/lib/blog";
import { Results } from "@/src/screens/Results";

type Params = { locale: string; page: string };

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
  pageSuffix: (n: number) => string;
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
    pageSuffix: (n) => ` — Page ${n}`,
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
    pageSuffix: (n) => ` — Página ${n}`,
  },
};

export async function generateStaticParams(): Promise<Params[]> {
  const out: Params[] = [];
  for (const locale of ["en", "es"] as const) {
    const total = getTotalPages(locale);
    for (let p = 2; p <= total; p++) {
      out.push({ locale, page: String(p) });
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, page } = await params;
  const pageNum = Number(page);
  const safeLocale: Locale = locale === "es" ? "es" : "en";
  const copy = copyByLocale[safeLocale] ?? copyByLocale.en;
  const total = getTotalPages(safeLocale);
  if (!Number.isInteger(pageNum) || pageNum < 2 || pageNum > total) {
    return {};
  }
  const prefix = safeLocale === "en" ? "" : `/${safeLocale}`;
  const path = `${prefix}/results/page/${pageNum}`;
  return {
    title: `${copy.title}${copy.pageSuffix(pageNum)}`,
    description: copy.description,
    alternates: { canonical: path },
    robots: { index: true, follow: true },
  };
}

export default async function ResultsPaginatedPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, page } = await params;
  const pageNum = Number(page);
  const safeLocale: Locale = locale === "es" ? "es" : "en";
  const total = getTotalPages(safeLocale);
  if (!Number.isInteger(pageNum) || pageNum < 2 || pageNum > total) {
    notFound();
  }
  const cases = getPaginatedResults(safeLocale, pageNum);
  const copy = copyByLocale[safeLocale] ?? copyByLocale.en;
  const localePrefix = safeLocale === "en" ? "" : `/${safeLocale}`;
  const pageHref = (p: number) =>
    p === 1 ? `${localePrefix}/results` : `${localePrefix}/results/page/${p}`;
  return (
    <Results
      locale={safeLocale}
      cases={cases}
      copy={copy}
      currentPage={pageNum}
      totalPages={total}
      pageHref={pageHref}
    />
  );
}
