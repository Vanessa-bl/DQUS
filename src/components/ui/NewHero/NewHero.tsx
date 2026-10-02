import { useT } from "../../../i18n/useT";
import "./NewHero.css";

const FEATURES = [
  {
    dot: "1",
    key: "feat1",
    title: "Every engagement starts paid",
    desc: "A $3K–$7K PoC in 5–10 days. One action against your test data — your team watches the agent transact through your actual API. Deliberately priced: skip procurement, filter tire-kickers, keep the pace tight. The most common PoC-week surprise is that your API leaks internal state in error messages. We fix that before the demo.",
  },
  {
    dot: "2",
    key: "feat2",
    title: "Priced against your value, not our hours",
    desc: "A barbershop where our connector delivers 50 bookings a month captures $2,000 in new revenue — a $500 retainer is a rounding error. Vertical SaaS: every one of your customers becomes agent-reservable while your competitor still isn't. The anchor is revenue captured, not hours logged.",
  },
  {
    dot: "3",
    key: "feat3",
    title: "Maintenance is priced in, not billed later",
    desc: "OAuth rotates. Schemas drift. Model releases crack fine-tuned prompts overnight. Meta rewrites WhatsApp Business policy on a random Friday. Common Friday break: token refresh silently fails 24h before hard expiry and evals miss it. Somebody watches, patches, re-runs evals — including the security ones. No surprise SOWs.",
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
  const startHref = btnStartTarget ? `#${btnStartTarget}` : "mailto:";
  const projectHref = btnProjectTarget ? `#${btnProjectTarget}` : "mailto:";

  return (
    <section className="nh" id={id}>
      {/* TOP: headline (left) / desc + CTA (right) */}
      <div className="nh__top">
        <div className="nh__top-left">
          <span className="nh__eyebrow">
            {t(`${tPrefix}.eyebrow`, "Two Product Lines. Public Prices.")}
          </span>
          <h2 className="nh__headline">
            {t(`${tPrefix}.headline.line1`, "Vertical SaaS: agent-native.")}
            <br />
            <span className="nh__headline-mark">
              {t(`${tPrefix}.headline.line2`, "SMBs: agent-discoverable.")}
            </span>
          </h2>
        </div>

        <div className="nh__top-right">
          <p className="nh__desc">
            {t(
              `${tPrefix}.desc`,
              "For vertical SaaS platforms: a paid PoC, then a production connector, then a retainer. For SMBs: an audit + monthly monitoring so agents get your business right. Fixed scope, fixed timeline, fixed money. Senior LATAM team, US LLC, US-timezone comms.",
            )}
          </p>
          <a href={startHref} className="nh__cta">
            {t(`${tPrefix}.cta`, "See pricing")}
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
          {t(`${tPrefix}.quote.line1`, "Paid to prove.")}
          <br />
          {t(`${tPrefix}.quote.line2`, "Priced to a number.")}
          {!hideLine3 && (
            <>
              <br />
              {t(`${tPrefix}.quote.line3`, "Retained to stay live.")}
            </>
          )}
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
                {t(`${tPrefix}.stat.support`, "US-timezone team")}
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
