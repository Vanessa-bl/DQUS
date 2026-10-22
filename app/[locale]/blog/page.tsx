import type { Metadata } from "next";
import {
  getAllCategories,
  getPaginatedPosts,
  getTotalPages,
  type Locale,
} from "@/lib/blog";
import { Blog } from "@/src/screens/Blog";

type Params = { locale: string };

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
  const path = locale === "en" ? "/blog" : `/${locale}/blog`;
  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: path,
      languages: {
        en: "/blog",
        es: "/es/blog",
        "x-default": "/blog",
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

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = locale === "es" ? "es" : "en";
  const posts = getPaginatedPosts(safeLocale, 1);
  const totalPages = getTotalPages(safeLocale);
  const categories = getAllCategories(safeLocale);
  const copy = copyByLocale[safeLocale] ?? copyByLocale.en;
  const localePrefix = safeLocale === "en" ? "" : `/${safeLocale}`;
  const pageHref = (page: number) =>
    page === 1 ? `${localePrefix}/blog` : `${localePrefix}/blog/page/${page}`;
  return (
    <Blog
      locale={safeLocale}
      posts={posts}
      categories={categories}
      copy={copy}
      currentPage={1}
      totalPages={totalPages}
      pageHref={pageHref}
    />
  );
}
