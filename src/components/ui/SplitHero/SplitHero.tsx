import { motion, type Variants } from "framer-motion";
import { useT } from "../../../i18n/useT";
import HeroPulse from "./HeroPulse";
import "./SplitHero.css";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: 0.12 * i },
  }),
};

const wordUp: Variants = {
  hidden: { y: "110%" },
  visible: (i = 0) => ({
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 * i },
  }),
};

export default function SplitHero() {
  const t = useT();
  const title = t("hero.split.title", "Fewer Hours. More Revenue.");
  const titleWords = title
    .split(/\.\s+/)
    .filter(Boolean)
    .map((s) => (s.endsWith(".") ? s : `${s}.`));

  return (
    <section className="split-hero" aria-labelledby="split-hero-title">
      <div className="split-hero__inner">
      <div className="split-hero__text">
        <motion.p
          className="split-hero__pre-title"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {t("hero.split.preTitle", "Automation. AI. Marketing. One studio.")}
        </motion.p>

        <h1
          id="split-hero-title"
          className="split-hero__title"
          aria-label={title}
        >
          {titleWords.map((word, i) => (
            <span className="word-parent" key={`${i}-${word}`}>
              <motion.span
                className="word-child"
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordUp}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="split-hero__intro"
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {t(
            "hero.split.intro",
            "Automate the work. Capture the market."
          )}
        </motion.p>

        <motion.p
          className="split-hero__body"
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {t(
            "hero.split.body",
            "Paid proof of concept in 10 days. Production build in 5 weeks. A retainer for what breaks after. Automations, AI agents, and marketing shipped under one roof. Fixed scope, fixed timeline, fixed price."
          )}
        </motion.p>

        <motion.div
          className="split-hero__actions"
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <a className="split-hero__btn" href="/services">
            {t("hero.split.ctaPrimary", "Write us")}
          </a>
          <a className="split-hero__cta-link" href="/contact">
            {t("hero.split.ctaSecondary", "Book a discovery call")}
          </a>
        </motion.div>
      </div>

      <div className="split-hero__media" aria-hidden="true">
        <HeroPulse />
      </div>
      </div>
    </section>
  );
}
