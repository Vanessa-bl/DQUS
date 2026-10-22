import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "./blog";

export type ResultMetric = {
  value: string;
  label: string;
};

export type ResultFrontmatter = {
  title: string;
  description: string;
  slug: string;
  locale: Locale;
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  coverImage?: string;
  coverImageAlt?: string;
  coverFit?: "cover" | "contain";
  clientLogo?: string;
  clientLogoAlt?: string;
  client?: string;
  highlight?: string;
  outcome: string;
  metrics: ResultMetric[];
};

export type ResultCase = ResultFrontmatter & {
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "results");

function readResultFile(filename: string): ResultCase | null {
  const fullPath = path.join(CONTENT_DIR, filename);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(raw);
  const data = parsed.data as ResultFrontmatter;
  if (!data.slug || !data.locale) return null;
  return { ...data, content: parsed.content };
}

function listMdxFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .sort();
}

export function getAllResults(locale: Locale): ResultCase[] {
  const items = listMdxFiles()
    .map(readResultFile)
    .filter((r): r is ResultCase => r !== null && r.locale === locale);
  items.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return items;
}

export const RESULTS_PER_PAGE = 6;

export function getTotalPages(locale: Locale): number {
  const total = getAllResults(locale).length;
  return Math.max(1, Math.ceil(total / RESULTS_PER_PAGE));
}

export function getPaginatedResults(
  locale: Locale,
  page: number
): ResultCase[] {
  const all = getAllResults(locale);
  const start = (page - 1) * RESULTS_PER_PAGE;
  return all.slice(start, start + RESULTS_PER_PAGE);
}

export function getResultBySlug(
  slug: string,
  locale: Locale
): ResultCase | null {
  return getAllResults(locale).find((r) => r.slug === slug) ?? null;
}

export function getRelatedResults(
  slug: string,
  locale: Locale,
  limit = 2
): ResultCase[] {
  const current = getResultBySlug(slug, locale);
  if (!current) return [];
  const scored = getAllResults(locale)
    .filter((r) => r.slug !== slug)
    .map((r) => {
      const sharedTags = r.tags.filter((t) => current.tags.includes(t)).length;
      const sameCategory = r.category === current.category ? 1 : 0;
      return { r, score: sharedTags + sameCategory };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.r);
}
