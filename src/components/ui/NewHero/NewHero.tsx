import { motion, type Variants } from "framer-motion";
import { useT } from "../../../i18n/useT";
import "./NewHero.css";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: 0.15 * i },
  }),
};

type NewHeroProps = {
  tPrefix?: string;
  id?: string;
  btnStartTarget?: string;
  btnProjectTarget?: string;
  hideLine3?: boolean;
};

export default function NewHero({ tPrefix = "hero", id, btnStartTarget, btnProjectTarget, hideLine3 }: NewHeroProps) {
  const t = useT();
  const tk = (key: string, fallback: string) => t(`${tPrefix}.${key}`, fallback);
  const line3 = tk("title.line3", "");

  const scrollTo = (target: string) => {
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="nh" id={id}>
      {/* ── TOP ROW: meta left / title right ── */}
      <div className="nh__top">
        <motion.div
          className="nh__meta"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="nh__badge-grid">
            <div className="nh__badge-row">
              <span className="nh__badge">{tk("badge.web", "Web Development")}</span>
              <span className="nh__badge">{tk("badge.mobile", "Mobile Development")}</span>
              <span className="nh__badge">{tk("badge.app", "App Development")}</span>
            </div>
            <div className="nh__badge-row">
              <span className="nh__badge">{tk("badge.ux", "User Experience")}</span>
              <span className="nh__badge">{tk("badge.uiux", "UI/UX Design")}</span>
            </div>
            <div className="nh__badge-row">
              <span className="nh__badge">{tk("badge.a11y", "Accessibility")}</span>
              <span className="nh__badge">{tk("badge.seo", "SEO")}</span>
              <span className="nh__badge">{tk("badge.perf", "Optimization")}</span>
            </div>
            <div className="nh__badge-row">
              <span className="nh__badge">{tk("badge.cloud", "Cloud & DevOps")}</span>
              <span className="nh__badge nh__badge--main">{tk("badge", "Tech Solutions")}</span>
            </div>
          </div>
          <div className="nh__meta-row nh__meta-row--info">
            <div className="nh__meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>{tk("meta.web", "Specialist in Web & Mobile Development")}</span>
            </div>
            <div className="nh__meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              <span>{tk("meta.location", "Remote • Worldwide")}</span>
            </div>
          </div>
        </motion.div>

        <motion.h1
          className="nh__title"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {tk("title.line1", "We Turn Your")}<br />
          <span className="nh__title-accent">{tk("title.line2", "Digital Ideas")}</span>
          {line3 && !hideLine3 && <><br />{line3}</>}
        </motion.h1>
      </div>

      {/* ── BANNER ── */}
      <motion.div
        className="nh__banner"
        custom={2}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <div className="nh__banner-inner">
          <div className="nh__shape nh__shape--1" />
          <div className="nh__shape nh__shape--2" />
          <div className="nh__shape nh__shape--3" />
          <div className="nh__shape nh__shape--4" />
          <div className="nh__shape nh__shape--5" />
          <div className="nh__shape nh__shape--6" />
          <div className="nh__banner-overlay" />
        </div>
      </motion.div>

      {/* ── BOTTOM: desc left / stats + buttons right ── */}
      <div className="nh__bottom">
        <motion.p
          className="nh__desc"
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {tk("desc", "At DevQueens, we craft exceptional digital experiences. From innovative UI/UX to cutting-edge web and mobile development, we elevate your business to the next level of technology.")}
        </motion.p>

        <motion.div
          className="nh__bottom-right"
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="nh__stats">
            <div className="nh__stat">
              <span className="nh__stat-num">{tk("stat.num1", "50+")}</span>
              <span className="nh__stat-label">{tk("stat.projects", "Projects")}</span>
            </div>
            <div className="nh__stat">
              <span className="nh__stat-num">{tk("stat.num2", "100%")}</span>
              <span className="nh__stat-label">{tk("stat.satisfaction", "Satisfaction")}</span>
            </div>
            <div className="nh__stat">
              <span className="nh__stat-num">{tk("stat.num3", "24/7")}</span>
              <span className="nh__stat-label">{tk("stat.support", "Support")}</span>
            </div>
          </div>

          <div className="nh__btns">
            <button
              className="nh__btn-primary"
              onClick={() =>
                btnStartTarget
                  ? scrollTo(btnStartTarget)
                  : window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
              }
            >
              {tk("btn.start", "Get Started")}
            </button>
            {btnProjectTarget ? (
              <button
                className="nh__btn-secondary"
                onClick={() => scrollTo(btnProjectTarget)}
              >
                {tk("btn.project", "Start a Project")}
              </button>
            ) : (
              <a href="mailto:hello@devqueensus.com" className="nh__btn-secondary">
                {tk("btn.project", "Start a Project")}
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}