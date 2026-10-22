import Link from "next/link";
import type { Post } from "../../lib/blog";
import { Layout } from "./layout";
import { Paginator } from "../components/ui/Paginator/Paginator";
import "./Blog.css";

type Copy = {
  eyebrow: string;
  titleLine1: string;
  titleMark: string;
  lede: string;
  allCategoriesLabel: string;
  readLabel: string;
  prevLabel?: string;
  nextLabel?: string;
};

type BlogProps = {
  locale: "en" | "es";
  posts: Post[];
  categories: string[];
  activeCategory?: string;
  copy: Copy;
  currentPage?: number;
  totalPages?: number;
  pageHref?: (page: number) => string;
};

const ACCENT_VARIANTS = [1, 2, 3] as const;

function formatDate(dateString: string, locale: "en" | "es"): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function Blog({
  locale,
  posts,
  copy,
  currentPage,
  totalPages,
  pageHref,
}: BlogProps) {
  const localePrefix = locale === "en" ? "" : "/es";

  return (
    <Layout darkHeader>
      <main className="blog-page">
        <div className="blog-shell">
          <header className="blog-hero">
            <p className="blog-hero__eyebrow">{copy.eyebrow}</p>
            <h1 className="blog-hero__title">
              {copy.titleLine1}{" "}
              <span className="blog-hero__title-mark">{copy.titleMark}</span>
            </h1>
            <p className="blog-hero__lede">{copy.lede}</p>
          </header>

          <div className="blog-grid">
            {posts.map((post, i) => {
              const accent = ACCENT_VARIANTS[i % ACCENT_VARIANTS.length];
              return (
                <Link
                  key={post.slug}
                  href={`${localePrefix}/blog/${post.slug}`}
                  className="blog-card"
                >
                  <div
                    className={`blog-card__cover blog-card__cover--${accent}`}
                  >
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.coverImageAlt ?? ""}
                        className="blog-card__cover-img"
                        loading="lazy"
                      />
                    ) : (
                      <span className="blog-card__cover-brand">DEVQUEENS</span>
                    )}
                  </div>
                  <div className="blog-card__body">
                    <span className="blog-card__chip">{post.category}</span>
                    <h2 className="blog-card__title">
                      <span className="blog-card__title-text">{post.title}</span>
                    </h2>
                    <p className="blog-card__desc">{post.description}</p>
                    <div className="blog-card__footer">
                      <span className="blog-card__meta">
                        <time dateTime={post.publishedAt}>
                          {formatDate(post.publishedAt, locale)}
                        </time>
                        {" · "}
                        {post.readingTimeMinutes} min
                      </span>
                      <span className="blog-card__read" aria-hidden="true">
                        {copy.readLabel}
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {currentPage && totalPages && pageHref ? (
            <Paginator
              currentPage={currentPage}
              totalPages={totalPages}
              basePath=""
              pageHref={pageHref}
              prevLabel={copy.prevLabel}
              nextLabel={copy.nextLabel}
            />
          ) : null}
        </div>
      </main>
    </Layout>
  );
}
