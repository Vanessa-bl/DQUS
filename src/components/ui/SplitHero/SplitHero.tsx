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
  const title = t("hero.split.title", "Your Product. Bookable by Agents.");
  const rawWords = title.split(" ");
  let titleWords: string[];
  if (rawWords.length <= 2) {
    titleWords = [rawWords.join(" ")];
  } else if (rawWords.length === 3) {
    titleWords = [rawWords[0], rawWords.slice(1).join(" ")];
  } else {
    titleWords = [
      rawWords.slice(0, 2).join(" "),
      ...rawWords.slice(2, -2),
      rawWords.slice(-2).join(" "),
    ];
  }

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
          {t("hero.split.preTitle", "Agent Studio for Vertical SaaS")}
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
            "Paid PoC in 10 days. Production connector in 5 weeks. A retainer for what breaks after."
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
            "Vertical SaaS platforms own the workflow — the calendar, the inventory, the checkout — that consumer-facing agents need to execute. We build the connectors that plug your product into OpenAI Operator, Claude computer use, Google Gemini, and the ChatGPT and WhatsApp Business agents already reaching your customers. Meta WhatsApp Business review, Braintrust evals, cost caps, and observability included."
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
            {t("hero.split.ctaPrimary", "See pricing")}
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
