import { motion, type Variants } from "framer-motion";
import { useT } from "../../../i18n/useT";
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
  const titleWords = t("hero.split.title", "Beautifully Effective.").split(" ");

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
          {t("hero.split.preTitle", "Digital Marketing Agency")}
        </motion.p>

        <h1
          id="split-hero-title"
          className="split-hero__title"
          aria-label={t("hero.split.title", "Beautifully Effective.")}
        >
          {titleWords.map((word, i) => (
            <span className="word-parent" key={word}>
              <motion.span
                className="word-child"
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordUp}
              >
                {word}
              </motion.span>
              {i < titleWords.length - 1 ? " " : null}
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
            "The craft to look good, the strategy to sell well"
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
            "Standing out in a crowded market is only the start — every visit should turn into measurable results. We help ambitious brands transform great work into lasting growth by uniting strategy, design, development, and data into one integrated playbook built around how your clients actually buy."
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
            {t("hero.split.ctaPrimary", "Explore our capabilities")}
          </a>
          <a className="split-hero__cta-link" href="/about">
            {t("hero.split.ctaSecondary", "Check out our tech")}
          </a>
        </motion.div>
      </div>

      <div className="split-hero__media" aria-hidden="true">
        {/* Espacio reservado para la imagen del hero */}
      </div>
      </div>
    </section>
  );
}
