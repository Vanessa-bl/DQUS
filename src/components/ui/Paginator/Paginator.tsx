import Link from "next/link";
import "./Paginator.css";

type PaginatorProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
  pageHref: (page: number) => string;
  prevLabel?: string;
  nextLabel?: string;
};

function buildWindow(current: number, total: number): (number | "...")[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const items: (number | "...")[] = [];
  const show = new Set<number>([1, total, current - 1, current, current + 1]);
  const sorted = Array.from(show)
    .filter((n) => n >= 1 && n <= total)
    .sort((a, b) => a - b);
  for (let i = 0; i < sorted.length; i++) {
    items.push(sorted[i]);
    if (i < sorted.length - 1 && sorted[i + 1] - sorted[i] > 1) {
      items.push("...");
    }
  }
  return items;
}

export function Paginator({
  currentPage,
  totalPages,
  pageHref,
  prevLabel = "Previous page",
  nextLabel = "Next page",
}: PaginatorProps) {
  if (totalPages <= 1) return null;

  const window = buildWindow(currentPage, totalPages);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav className="paginator" aria-label="Pagination">
      {hasPrev ? (
        <Link
          href={pageHref(currentPage - 1)}
          className="paginator__nav"
          aria-label={prevLabel}
          rel="prev"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
      ) : (
        <span className="paginator__nav paginator__nav--disabled" aria-hidden="true">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </span>
      )}

      <ol className="paginator__list">
        {window.map((item, i) =>
          item === "..." ? (
            <li
              key={`gap-${i}`}
              className="paginator__gap"
              aria-hidden="true"
            >
              …
            </li>
          ) : item === currentPage ? (
            <li key={item} className="paginator__item paginator__item--current">
              <span aria-current="page">{item}</span>
            </li>
          ) : (
            <li key={item} className="paginator__item">
              <Link href={pageHref(item)} aria-label={`Page ${item}`}>
                {item}
              </Link>
            </li>
          )
        )}
      </ol>

      {hasNext ? (
        <Link
          href={pageHref(currentPage + 1)}
          className="paginator__nav"
          aria-label={nextLabel}
          rel="next"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </Link>
      ) : (
        <span className="paginator__nav paginator__nav--disabled" aria-hidden="true">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </span>
      )}
    </nav>
  );
}
