import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Locale = "en" | "es";

export type FAQEntry = {
  question: string;
  answer: string;
};

export type Author = {
  name: string;
  role: string;
  bio?: string;
  avatar?: string;
};

export type PostFrontmatter = {
  title: string;
  description: string;
  slug: string;
  locale: Locale;
  publishedAt: string;
  updatedAt: string;
  author: Author;
  category: string;
  tags: string[];
  coverImage?: string;
  coverImageAlt?: string;
  directAnswer: string;
  relatedService?: {
    label: string;
    href: string;
  };
  faq?: FAQEntry[];
};

export type Post = PostFrontmatter & {
  content: string;
  readingTimeMinutes: number;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function readingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

function readPostFile(filename: string): Post | null {
  const fullPath = path.join(CONTENT_DIR, filename);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(raw);
  const data = parsed.data as PostFrontmatter;
  if (!data.slug || !data.locale) return null;
  return {
    ...data,
    content: parsed.content,
    readingTimeMinutes: readingTime(parsed.content),
  };
}

function listMdxFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .sort();
}

export function getAllPosts(locale: Locale): Post[] {
  const posts = listMdxFiles()
    .map(readPostFile)
    .filter((p): p is Post => p !== null && p.locale === locale);
  posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return posts;
}

export function getPostSlugs(locale: Locale): string[] {
  return getAllPosts(locale).map((p) => p.slug);
}

export function getPostBySlug(slug: string, locale: Locale): Post | null {
  return (
    getAllPosts(locale).find((p) => p.slug === slug) ?? null
  );
}

export function getAllCategories(locale: Locale): string[] {
  const set = new Set<string>();
  for (const p of getAllPosts(locale)) set.add(p.category);
  return Array.from(set).sort();
}

export function getPostsByCategory(
  category: string,
  locale: Locale
): Post[] {
  const normalized = category.toLowerCase();
  return getAllPosts(locale).filter(
    (p) => p.category.toLowerCase() === normalized
  );
}

export function getRelatedPosts(
  slug: string,
  locale: Locale,
  limit = 3
): Post[] {
  const current = getPostBySlug(slug, locale);
  if (!current) return [];
  const scored = getAllPosts(locale)
    .filter((p) => p.slug !== slug)
    .map((p) => {
      const sharedTags = p.tags.filter((t) =>
        current.tags.includes(t)
      ).length;
      const sameCategory = p.category === current.category ? 1 : 0;
      return { post: p, score: sharedTags + sameCategory };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}

export function categorySlug(category: string): string {
  return category
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function categoryLabel(slug: string, locale: Locale): string {
  const found = getAllCategories(locale).find(
    (c) => categorySlug(c) === slug
  );
  return found ?? slug;
}

export const POSTS_PER_PAGE = 9;

export function getTotalPages(locale: Locale): number {
  const total = getAllPosts(locale).length;
  return Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
}

export function getPaginatedPosts(locale: Locale, page: number): Post[] {
  const all = getAllPosts(locale);
  const start = (page - 1) * POSTS_PER_PAGE;
  return all.slice(start, start + POSTS_PER_PAGE);
}
