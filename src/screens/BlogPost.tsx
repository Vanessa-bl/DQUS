import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { Post } from "../../lib/blog";
import { Layout } from "./layout";
import "./Blog.css";

type Copy = {
  blogLabel: string;
  directAnswerLabel: string;
  publishedLabel: string;
  updatedLabel: string;
  readingTimeSuffix: string;
  relatedLabel: string;
  ctaDescription: string;
  ctaButton: string;
};

type BlogPostProps = {
  locale: "en" | "es";
  post: Post;
  related: Post[];
  copy: Copy;
};

function formatDate(dateString: string, locale: "en" | "es"): string {
  return new Date(dateString).toLocaleDateString(
    locale === "es" ? "es-ES" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );
}

export function BlogPost({ locale, post, related, copy }: BlogPostProps) {
  const localePrefix = locale === "en" ? "" : "/es";

  return (
    <Layout darkHeader>
      <main className="blog-page">
        <article className="blog-shell blog-shell--article">
          <nav className="blog-article__crumbs" aria-label="Breadcrumb">
            <Link href={`${localePrefix}/`}>
              {locale === "es" ? "Inicio" : "Home"}
            </Link>
            {" / "}
            <Link href={`${localePrefix}/blog`}>{copy.blogLabel}</Link>
            {" / "}
            <span aria-current="page">{post.category}</span>
          </nav>

          <header className="blog-article__hero">
            <span className="blog-article__eyebrow">{post.category}</span>
            <h1 className="blog-article__title">{post.title}</h1>
            <p className="blog-article__lede">{post.description}</p>
          </header>

          {post.coverImage && (
            <div className="blog-article__cover">
              <img
                src={post.coverImage}
                alt={post.coverImageAlt ?? ""}
              />
            </div>
          )}

          <div className="blog-article__layout">
            <aside className="blog-article__sidebar">
              <div className="blog-article__sidebar-block">
                <span className="blog-article__sidebar-label">
                  {locale === "es" ? "Autor" : "Author"}
                </span>
                <span className="blog-article__sidebar-value">
                  {post.author.name}
                  <br />
                  <span style={{ fontWeight: 400, color: "#6b7280", fontSize: "0.8rem" }}>
                    {post.author.role}
                  </span>
                </span>
              </div>

              <div className="blog-article__sidebar-block">
                <span className="blog-article__sidebar-label">
                  {copy.publishedLabel}
                </span>
                <span className="blog-article__sidebar-value">
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt, locale)}
                  </time>
                </span>
              </div>

              {post.updatedAt && post.updatedAt !== post.publishedAt && (
                <div className="blog-article__sidebar-block">
                  <span className="blog-article__sidebar-label">
                    {copy.updatedLabel}
                  </span>
                  <span className="blog-article__sidebar-value">
                    <time dateTime={post.updatedAt}>
                      {formatDate(post.updatedAt, locale)}
                    </time>
                  </span>
                </div>
              )}

              <div className="blog-article__sidebar-block">
                <span className="blog-article__sidebar-label">
                  {locale === "es" ? "Lectura" : "Reading"}
                </span>
                <span className="blog-article__sidebar-value">
                  {post.readingTimeMinutes} {copy.readingTimeSuffix}
                </span>
              </div>

              {post.relatedService && (
                <Link
                  href={post.relatedService.href}
                  className="blog-article__sidebar-cta"
                >
                  {copy.ctaButton}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </aside>

            <div className="blog-article__main">
              <aside
                className="blog-article__answer"
                aria-label={copy.directAnswerLabel}
              >
                {post.directAnswer}
              </aside>

              <div className="blog-article__body">
                <MDXRemote
                  source={post.content}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                      rehypePlugins: [
                        rehypeSlug,
                        [
                          rehypeAutolinkHeadings,
                          {
                            behavior: "wrap",
                            properties: { className: "heading-anchor" },
                          },
                        ],
                      ],
                    },
                  }}
                />
              </div>

              {post.relatedService && (
                <div className="blog-article__cta">
                  <p>{copy.ctaDescription}</p>
                  <Link href={post.relatedService.href}>
                    {post.relatedService.label}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {related.length > 0 && (
            <section className="blog-article__related" aria-label={copy.relatedLabel}>
              <h2>{copy.relatedLabel}</h2>
              <div className="blog-article__related-grid">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`${localePrefix}/blog/${r.slug}`}
                    className="blog-card"
                  >
                    <div className="blog-card__cover blog-card__cover--1">
                      {r.coverImage ? (
                        <img
                          src={r.coverImage}
                          alt={r.coverImageAlt ?? ""}
                          className="blog-card__cover-img"
                          loading="lazy"
                        />
                      ) : (
                        <span className="blog-card__cover-brand">DEVQUEENS</span>
                      )}
                    </div>
                    <div className="blog-card__body">
                      <span className="blog-card__chip">{r.category}</span>
                      <h3 className="blog-card__title">
                        <span className="blog-card__title-text">{r.title}</span>
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
    </Layout>
  );
}
