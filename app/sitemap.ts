import type { MetadataRoute } from "next";
import { routing } from "@/src/i18n/routing";

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

  return entries;
}
