import { useT } from "../../../i18n/useT";
import "./NewHero.css";

const FEATURES = [
  {
    dot: "1",
    key: "feat1",
    title: "Proof first. Ship fast.",
    desc: "A proof of concept in 5 to 10 days. One real action against your real data. Your team watches it work before you sign off on production.",
  },
  {
    dot: "2",
    key: "feat2",
    title: "Anchored to outcomes.",
    desc: "An automation that returns 40 approver hours a week. An agent that captures 50 bookings a week. We anchor to what you capture, not to what we clock.",
  },
  {
    dot: "3",
    key: "feat3",
    title: "Maintenance included.",
    desc: "APIs break. Schemas drift. Models update overnight. Someone watches, patches, and reruns the evals every week, including the security ones. No surprise SOWs.",
  },
] as const;

type NewHeroProps = {
  tPrefix?: string;
  id?: string;
  btnStartTarget?: string;
  btnProjectTarget?: string;
};

export default function NewHero({
  tPrefix = "nh",
  id,
  btnStartTarget,
  btnProjectTarget,
}: NewHeroProps) {
  const t = useT();
  const startHref = btnStartTarget ? `#${btnStartTarget}` : "mailto:hello@devqueens.us";
  const projectHref = btnProjectTarget ? `#${btnProjectTarget}` : "mailto:hello@devqueens.us";

  return (
    <section className="nh" id={id}>
      {/* TOP: headline (left) / desc + CTA (right) */}
      <div className="nh__top">
        <div className="nh__top-left">
          <span className="nh__eyebrow">
            {t(`${tPrefix}.eyebrow`, "How we work")}
          </span>
          <h2 className="nh__headline">
            {t(`${tPrefix}.headline.line1`, "From proof.")}
            <br />
            <span className="nh__headline-mark">
              {t(`${tPrefix}.headline.line2`, "To production.")}
            </span>
          </h2>
        </div>

        <div className="nh__top-right">
          <p className="nh__desc">
            {t(
              `${tPrefix}.desc`,
              "Automations, agents, and AI marketing. Shipped under one roof. Proof of concept in 10 days. Fixed scope and timeline.",
            )}
          </p>
          <a href={startHref} className="nh__cta">
            {t(`${tPrefix}.cta`, "Book a Demo")}
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
            <span
              className={`nh__feat-dot nh__feat-dot--${f.dot}`}
              aria-hidden="true"
            />
            <h3 className="nh__feat-title">
              {t(`${tPrefix}.${f.key}.title`, f.title)}
            </h3>
            <p className="nh__feat-desc">
              {t(`${tPrefix}.${f.key}.desc`, f.desc)}
            </p>
          </div>
        ))}
      </div>

      {/* DARK BANNER */}
      <div className="nh__banner">
        <p className="nh__quote">
          {t(`${tPrefix}.quote.line1`, "Repetitive work, shipped.")}
          <br />
          {t(`${tPrefix}.quote.line2`, "New buyers, landed.")}
        </p>

        <div className="nh__banner-aside">
          <div className="nh__stats">
            <div className="nh__stat">
              <span className="nh__stat-num">50+</span>
              <span className="nh__stat-label">
                {t(`${tPrefix}.stat.projects`, "Projects shipped")}
              </span>
            </div>
            <div className="nh__stat">
              <span className="nh__stat-num">100%</span>
              <span className="nh__stat-label">
                {t(`${tPrefix}.stat.satisfaction`, "Founder satisfaction")}
              </span>
            </div>
            <div className="nh__stat">
              <span className="nh__stat-num">24/7</span>
              <span className="nh__stat-label">
                {t(`${tPrefix}.stat.support`, "Dedicated support")}
              </span>
            </div>
          </div>

          <a href={projectHref} className="nh__banner-cta">
            {t(`${tPrefix}.banner.cta`, "Talk to an Expert")}
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
