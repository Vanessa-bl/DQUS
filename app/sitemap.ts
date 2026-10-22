import type { MetadataRoute } from "next";
import { routing } from "@/src/i18n/routing";
import {
  getAllPosts,
  getAllCategories,
  categorySlug,
  getTotalPages,
} from "@/lib/blog";
import {
  getAllResults,
  getTotalPages as getResultsTotalPages,
} from "@/lib/results";

const SITE = "https://www.devqueens.us";

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const PATHS: Entry[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "services", priority: 0.9, changeFrequency: "monthly" },
  { path: "about", priority: 0.7, changeFrequency: "monthly" },
  { path: "contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "conversion-audit", priority: 0.6, changeFrequency: "monthly" },
  { path: "accountants", priority: 0.5, changeFrequency: "monthly" },
  { path: "blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "results", priority: 0.9, changeFrequency: "monthly" },
];

function urlFor(locale: string, path: string): string {
  const suffix = path ? `/${path}` : "";
  if (locale === routing.defaultLocale) {
    return `${SITE}${suffix}`;
  }
  return `${SITE}/${locale}${suffix}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const entry of PATHS) {
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      languages[locale] = urlFor(locale, entry.path);
    }

    for (const locale of routing.locales) {
      entries.push({
        url: urlFor(locale, entry.path),
        lastModified: now,
        changeFrequency: entry.changeFrequency,
        priority: entry.priority,
        alternates: {
          languages: {
            ...languages,
            "x-default": urlFor(routing.defaultLocale, entry.path),
          },
        },
      });
    }
  }

  // Blog posts: one entry per locale per slug, with hreflang alternates
  const slugs = new Set<string>();
  for (const locale of routing.locales) {
    for (const post of getAllPosts(locale)) slugs.add(post.slug);
  }
  for (const slug of slugs) {
    const langs: Record<string, string> = {};
    for (const locale of routing.locales) {
      langs[locale] = urlFor(locale, `blog/${slug}`);
    }
    for (const locale of routing.locales) {
      const post = getAllPosts(locale).find((p) => p.slug === slug);
      if (!post) continue;
      entries.push({
        url: urlFor(locale, `blog/${slug}`),
        lastModified: new Date(post.updatedAt),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            ...langs,
            "x-default": urlFor(routing.defaultLocale, `blog/${slug}`),
          },
        },
      });
    }
  }

  // Blog categories: one entry per locale per category
  for (const locale of routing.locales) {
    for (const cat of getAllCategories(locale)) {
      entries.push({
        url: urlFor(locale, `blog/category/${categorySlug(cat)}`),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  // Blog paginated pages (page 2..N per locale)
  for (const locale of routing.locales) {
    const total = getTotalPages(locale);
    for (let p = 2; p <= total; p++) {
      entries.push({
        url: urlFor(locale, `blog/page/${p}`),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  // Results cases: one entry per locale per slug
  const resultSlugs = new Set<string>();
  for (const locale of routing.locales) {
    for (const r of getAllResults(locale)) resultSlugs.add(r.slug);
  }
  for (const slug of resultSlugs) {
    const langs: Record<string, string> = {};
    for (const locale of routing.locales) {
      langs[locale] = urlFor(locale, `results/${slug}`);
    }
    for (const locale of routing.locales) {
      const r = getAllResults(locale).find((p) => p.slug === slug);
      if (!r) continue;
      entries.push({
        url: urlFor(locale, `results/${slug}`),
        lastModified: new Date(r.updatedAt),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            ...langs,
            "x-default": urlFor(routing.defaultLocale, `results/${slug}`),
          },
        },
      });
    }
  }

  // Results paginated pages
  for (const locale of routing.locales) {
    const total = getResultsTotalPages(locale);
    for (let p = 2; p <= total; p++) {
      entries.push({
        url: urlFor(locale, `results/page/${p}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
