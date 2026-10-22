import Link from "next/link";
import type { ResultCase } from "../../lib/results";
import { Layout } from "./layout";
import { Paginator } from "../components/ui/Paginator/Paginator";
import "./Blog.css";
import "./Results.css";

const ACCENT_VARIANTS = [1, 2, 3] as const;

type Copy = {
  eyebrow: string;
  titleLine1: string;
  titleMark: string;
  lede: string;
  readLabel: string;
  prevLabel: string;
  nextLabel: string;
};

type ResultsProps = {
  locale: "en" | "es";
  cases: ResultCase[];
  copy: Copy;
  currentPage: number;
  totalPages: number;
  pageHref: (page: number) => string;
};

function yearOf(dateString: string): number {
  return new Date(dateString).getFullYear();
}

export function Results({
  locale,
  cases,
  copy,
  currentPage,
  totalPages,
  pageHref,
}: ResultsProps) {
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

          <div className="result-grid">
            {cases.map((c, i) => {
              const accent = ACCENT_VARIANTS[i % ACCENT_VARIANTS.length];
              return (
                <Link
                  key={c.slug}
                  href={`${localePrefix}/results/${c.slug}`}
                  className={`result-card result-card--${accent}`}
                >
                  <div className="result-card__eyebrow">
                    <span className="result-card__dot" aria-hidden="true" />
                    <span className="result-card__industry">
                      {c.category}
                    </span>
                    <span className="result-card__sep" aria-hidden="true">
                      ·
                    </span>
                    <span className="result-card__year">
                      {yearOf(c.publishedAt)}
                    </span>
                  </div>

                  <h2 className="result-card__title">{c.title}</h2>
                  <p className="result-card__desc">{c.description}</p>

                  {c.highlight && (
                    <div className="result-card__divider" aria-hidden="true" />
                  )}

                  {c.highlight && (
                    <div className="result-card__highlight">
                      <svg
                        className="result-card__check"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 12l2.5 2.5L16 9" />
                      </svg>
                      <span>{c.highlight}</span>
                    </div>
                  )}

                  <span className="result-card__cta">
                    {copy.readLabel}
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
                  </span>
                </Link>
              );
            })}
          </div>

          <Paginator
            currentPage={currentPage}
            totalPages={totalPages}
            basePath=""
            pageHref={pageHref}
            prevLabel={copy.prevLabel}
            nextLabel={copy.nextLabel}
          />
        </div>
      </main>
    </Layout>
  );
}
