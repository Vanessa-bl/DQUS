import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { ResultCase as ResultCaseType } from "../../lib/results";
import { Layout } from "./layout";
import "./Blog.css";

type Copy = {
  resultsLabel: string;
  publishedLabel: string;
  updatedLabel: string;
  clientLabel: string;
  categoryLabel: string;
  outcomeLabel: string;
  metricsLabel: string;
  relatedLabel: string;
};

type ResultCaseProps = {
  locale: "en" | "es";
  caseItem: ResultCaseType;
  related: ResultCaseType[];
  copy: Copy;
};

function formatDate(d: string, locale: "en" | "es"): string {
  return new Date(d).toLocaleDateString(
    locale === "es" ? "es-ES" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );
}

export function ResultCase({
  locale,
  caseItem,
  related,
  copy,
}: ResultCaseProps) {
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
            <Link href={`${localePrefix}/results`}>{copy.resultsLabel}</Link>
            {" / "}
            <span aria-current="page">{caseItem.category}</span>
          </nav>

          <header className="blog-article__hero">
            <span className="blog-article__eyebrow">{caseItem.category}</span>
            <h1 className="blog-article__title">{caseItem.title}</h1>
            <p className="blog-article__lede">{caseItem.description}</p>
          </header>

          <div className="blog-article__layout">
            <aside className="blog-article__sidebar">
              {caseItem.client && (
                <div className="blog-article__sidebar-block">
                  <span className="blog-article__sidebar-label">
                    {copy.clientLabel}
                  </span>
                  <span className="blog-article__sidebar-value">
                    {caseItem.client}
                  </span>
                </div>
              )}

              <div className="blog-article__sidebar-block">
                <span className="blog-article__sidebar-label">
                  {copy.categoryLabel}
                </span>
                <span className="blog-article__sidebar-value">
                  {caseItem.category}
                </span>
              </div>

              <div className="blog-article__sidebar-block">
                <span className="blog-article__sidebar-label">
                  {copy.publishedLabel}
                </span>
                <span className="blog-article__sidebar-value">
                  <time dateTime={caseItem.publishedAt}>
                    {formatDate(caseItem.publishedAt, locale)}
                  </time>
                </span>
              </div>

              {caseItem.updatedAt &&
                caseItem.updatedAt !== caseItem.publishedAt && (
                  <div className="blog-article__sidebar-block">
                    <span className="blog-article__sidebar-label">
                      {copy.updatedLabel}
                    </span>
                    <span className="blog-article__sidebar-value">
                      <time dateTime={caseItem.updatedAt}>
                        {formatDate(caseItem.updatedAt, locale)}
                      </time>
                    </span>
                  </div>
                )}
            </aside>

            <div className="blog-article__main">
              <aside
                className="blog-article__answer"
                aria-label={copy.outcomeLabel}
              >
                <strong style={{ display: "block", marginBottom: "0.4rem" }}>
                  {copy.outcomeLabel}
                </strong>
                {caseItem.outcome}
              </aside>

              {caseItem.metrics && caseItem.metrics.length > 0 && (
                <section
                  className="result-case__metrics"
                  aria-label={copy.metricsLabel}
                >
                  {caseItem.metrics.map((m, i) => (
                    <div key={i} className="result-case__metric">
                      <span className="result-case__metric-value">
                        {m.value}
                      </span>
                      <span className="result-case__metric-label">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </section>
              )}

              <div className="blog-article__body">
                <MDXRemote
                  source={caseItem.content}
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
            </div>
          </div>

          {related.length > 0 && (
            <section
              className="blog-article__related"
              aria-label={copy.relatedLabel}
            >
              <h2>{copy.relatedLabel}</h2>
              <div className="blog-article__related-grid">
                {related.map((r, i) => {
                  const accent = ((i % 4) + 1) as 1 | 2 | 3 | 4;
                  const headline = r.metrics?.[0];
                  return (
                    <Link
                      key={r.slug}
                      href={`${localePrefix}/results/${r.slug}`}
                      className="blog-card"
                    >
                      <div
                        className={`blog-card__cover blog-card__cover--stat blog-card__cover--${accent}`}
                      >
                        {headline && (
                          <>
                            <span className="blog-card__stat-value">
                              {headline.value}
                            </span>
                            <span className="blog-card__stat-label">
                              {headline.label}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="blog-card__body">
                        <span className="blog-card__chip">{r.category}</span>
                        <h3 className="blog-card__title">
                          <span className="blog-card__title-text">{r.title}</span>
                        </h3>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </article>
      </main>
    </Layout>
  );
}
