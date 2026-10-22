import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCategories,
  getPaginatedPosts,
  getTotalPages,
  type Locale,
} from "@/lib/blog";
import { Blog } from "@/src/screens/Blog";

type Params = { locale: string; page: string };

const copyByLocale: Record<string, {
  title: string;
  description: string;
  eyebrow: string;
  titleLine1: string;
  titleMark: string;
  lede: string;
  allCategoriesLabel: string;
  readLabel: string;
  prevLabel: string;
  nextLabel: string;
  pageSuffix: (n: number) => string;
}> = {
  en: {
    title: "Blog | AI automation, GEO marketing, and e-commerce",
    description:
      "Practical guides and cases on AI automation, GEO marketing, and e-commerce agents from the DevQueens team.",
    eyebrow: "DEVQUEENS BLOG",
    titleLine1: "Guides for teams that ship",
    titleMark: "with AI.",
    lede: "Short, source-cited reads on AI automation, GEO marketing, and e-commerce agents. Written by the team that builds them.",
    allCategoriesLabel: "All",
    readLabel: "Read Now",
    prevLabel: "Previous page",
    nextLabel: "Next page",
    pageSuffix: (n) => ` — Page ${n}`,
  },
  es: {
    title: "Blog | Automatización con IA, GEO Marketing y e-commerce",
    description:
      "Guías prácticas y casos sobre automatización con IA, GEO marketing y agentes de e-commerce del equipo de DevQueens.",
    eyebrow: "BLOG DEVQUEENS",
    titleLine1: "Guías para equipos que entregan",
    titleMark: "con IA.",
    lede: "Lecturas cortas con fuente sobre automatización con IA, GEO marketing y agentes de e-commerce. Escritas por el equipo que las construye.",
    allCategoriesLabel: "Todas",
    readLabel: "Leer ahora",
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
  const path = `${prefix}/blog/page/${pageNum}`;
  return {
    title: `${copy.title}${copy.pageSuffix(pageNum)}`,
    description: copy.description,
    alternates: {
      canonical: path,
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPaginatedPage({
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
  const posts = getPaginatedPosts(safeLocale, pageNum);
  const categories = getAllCategories(safeLocale);
  const copy = copyByLocale[safeLocale] ?? copyByLocale.en;
  const localePrefix = safeLocale === "en" ? "" : `/${safeLocale}`;
  const pageHref = (p: number) =>
    p === 1 ? `${localePrefix}/blog` : `${localePrefix}/blog/page/${p}`;
  return (
    <Blog
      locale={safeLocale}
      posts={posts}
      categories={categories}
      copy={copy}
      currentPage={pageNum}
      totalPages={total}
      pageHref={pageHref}
    />
  );
}
