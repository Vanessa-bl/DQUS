import { motion } from "framer-motion";
import "./NewHero.css";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.15 * i },
  }),
};

export default function NewHero() {
  return (
    <section className="nh">
      {/* ── TOP ROW: meta left / title right ── */}
      <div className="nh__top">
        <motion.div
          className="nh__meta"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="nh__meta-row">
            <span className="nh__badge">Soluciones Tecnológicas</span>
          </div>
          <div className="nh__meta-row nh__meta-row--info">
            <div className="nh__meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>Web &amp; Mobile Development</span>
            </div>
            <div className="nh__meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              <span>Remote &bull; Worldwide</span>
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
          We Turn Your<br />
          <span className="nh__title-accent">Digital Ideas</span><br />
          into Reality
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
          At DevQueens, we craft exceptional digital experiences. From
          innovative UI/UX to cutting-edge web and mobile development, we
          elevate your business to the next level of technology.
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
              <span className="nh__stat-num">50+</span>
              <span className="nh__stat-label">Projects</span>
            </div>
            <div className="nh__stat">
              <span className="nh__stat-num">100%</span>
              <span className="nh__stat-label">Satisfaction</span>
            </div>
            <div className="nh__stat">
              <span className="nh__stat-num">24/7</span>
              <span className="nh__stat-label">Support</span>
            </div>
          </div>

          <div className="nh__btns">
            <button
              className="nh__btn-primary"
              onClick={() =>
                window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
              }
            >
              Get Started
            </button>
            <a href="mailto:hello@devqueensus.com" className="nh__btn-secondary">
              Start a Project
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}