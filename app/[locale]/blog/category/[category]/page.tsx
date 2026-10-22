import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCategories,
  getPostsByCategory,
  categorySlug,
  categoryLabel,
  type Locale,
} from "@/lib/blog";
import { Blog } from "@/src/screens/Blog";

type Params = { locale: string; category: string };

const copyByLocale: Record<string, {
  eyebrow: string;
  titleLine1: string;
  titleMark: string;
  lede: string;
  allCategoriesLabel: string;
  readLabel: string;
}> = {
  en: {
    eyebrow: "DEVQUEENS BLOG",
    titleLine1: "Browsing",
    titleMark: "{category}.",
    lede: "Short, source-cited reads on AI automation, GEO marketing, and e-commerce agents.",
    allCategoriesLabel: "All",
    readLabel: "Read",
  },
  es: {
    eyebrow: "BLOG DEVQUEENS",
    titleLine1: "Explorando",
    titleMark: "{category}.",
    lede: "Lecturas cortas con fuente sobre automatización con IA, GEO marketing y agentes de e-commerce.",
    allCategoriesLabel: "Todas",
    readLabel: "Leer",
  },
};

export async function generateStaticParams(): Promise<Params[]> {
  const out: Params[] = [];
  for (const locale of ["en", "es"] as const) {
    for (const cat of getAllCategories(locale)) {
      out.push({ locale, category: categorySlug(cat) });
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  const safeLocale: Locale = locale === "es" ? "es" : "en";
  const label = categoryLabel(category, safeLocale);
  const base = copyByLocale[safeLocale] ?? copyByLocale.en;
  const title =
    safeLocale === "es"
      ? `${label} | Blog DevQueens`
      : `${label} | DevQueens Blog`;
  const description = base.lede;
  const path =
    safeLocale === "en"
      ? `/blog/category/${category}`
      : `/${safeLocale}/blog/category/${category}`;
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        en: `/blog/category/${category}`,
        es: `/es/blog/category/${category}`,
        "x-default": `/blog/category/${category}`,
      },
    },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, category } = await params;
  const safeLocale: Locale = locale === "es" ? "es" : "en";
  const categories = getAllCategories(safeLocale);
  const match = categories.find((c) => categorySlug(c) === category);
  if (!match) notFound();
  const posts = getPostsByCategory(match, safeLocale);
  const base = copyByLocale[safeLocale] ?? copyByLocale.en;
  const copy = {
    ...base,
    titleMark: base.titleMark.replace("{category}", match),
  };
  return (
    <Blog
      locale={safeLocale}
      posts={posts}
      categories={categories}
      activeCategory={category}
      copy={copy}
    />
  );
}
