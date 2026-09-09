import { useT } from "../../../i18n/useT";
import "./NewHero.css";

const FEATURES = [
  {
    dot: "1",
    key: "feat1",
    title: "Built for brands that refuse to settle",
    desc: "We bring the same obsessive craft to every engagement: deliberate UX, clean architecture, and interfaces that feel effortless from the very first interaction.",
  },
  {
    dot: "2",
    key: "feat2",
    title: "Intelligence built into every layer",
    desc: "From system design to micro-interactions, every decision is intentional. We ask the hard questions before we write the first line of code.",
  },
  {
    dot: "3",
    key: "feat3",
    title: "Performance you can count on at every stage",
    desc: "Speed, reliability, and scalability are non-negotiable. We engineer for where your product is going — not just where it is today.",
  },
] as const;

type NewHeroProps = {
  tPrefix?: string;
  id?: string;
  btnStartTarget?: string;
  btnProjectTarget?: string;
  hideLine3?: boolean;
};

export default function NewHero({
  tPrefix = "nh",
  id,
  btnStartTarget,
  btnProjectTarget,
  hideLine3 = false,
}: NewHeroProps) {
  const t = useT();
  const startHref = btnStartTarget ? `#${btnStartTarget}` : "mailto:hello@devqueensus.com";
  const projectHref = btnProjectTarget ? `#${btnProjectTarget}` : "mailto:hello@devqueensus.com";

  return (
    <section className="nh" id={id}>
      {/* TOP: headline (left) / desc + CTA (right) */}
      <div className="nh__top">
        <div className="nh__top-left">
          <span className="nh__eyebrow">
            {t(`${tPrefix}.eyebrow`, "Digital Product Studio")}
          </span>
          <h2 className="nh__headline">
            {t(`${tPrefix}.headline.line1`, "We Build Products")}<br />
            <span className="nh__headline-mark">
              {t(`${tPrefix}.headline.line2`, "Users Actually Love")}
            </span>
          </h2>
        </div>

        <div className="nh__top-right">
          <p className="nh__desc">
            {t(
              `${tPrefix}.desc`,
              "DevQueens is a full-service digital studio. We combine strategic design, modern engineering, and relentless attention to detail to ship products that stand out — and stand up to scrutiny."
            )}
          </p>
          <a href={startHref} className="nh__cta">
            {t(`${tPrefix}.cta`, "Start a project")}
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      <div className="nh__divider" />

      {/* FEATURE GRID */}
      <div className="nh__features">
        {FEATURES.map((f) => (
          <div key={f.key} className="nh__feat">
            <span className={`nh__feat-dot nh__feat-dot--${f.dot}`} aria-hidden="true" />
            <h3 className="nh__feat-title">{t(`${tPrefix}.${f.key}.title`, f.title)}</h3>
            <p className="nh__feat-desc">{t(`${tPrefix}.${f.key}.desc`, f.desc)}</p>
          </div>
        ))}
      </div>

      {/* DARK BANNER */}
      <div className="nh__banner">
        <p className="nh__quote">
          {t(`${tPrefix}.quote.line1`, "Designed to impress.")}
          <br />
          {t(`${tPrefix}.quote.line2`, "Engineered to perform.")}
          {!hideLine3 && (
            <>
              <br />
              {t(`${tPrefix}.quote.line3`, "Built to last.")}
            </>
          )}
        </p>

        <div className="nh__banner-aside">
          <div className="nh__stats">
            <div className="nh__stat">
              <span className="nh__stat-num">50+</span>
              <span className="nh__stat-label">
                {t(`${tPrefix}.stat.projects`, "Projects delivered")}
              </span>
            </div>
            <div className="nh__stat">
              <span className="nh__stat-num">100%</span>
              <span className="nh__stat-label">
                {t(`${tPrefix}.stat.satisfaction`, "Client satisfaction")}
              </span>
            </div>
            <div className="nh__stat">
              <span className="nh__stat-num">24/7</span>
              <span className="nh__stat-label">
                {t(`${tPrefix}.stat.support`, "Ongoing support")}
              </span>
            </div>
          </div>

          <a href={projectHref} className="nh__banner-cta">
            {t(`${tPrefix}.banner.cta`, "Work with us")}
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
