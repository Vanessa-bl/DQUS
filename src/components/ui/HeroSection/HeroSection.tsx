import { motion } from "framer-motion";
import "./Hero.css";

export default function Hero() {
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.4 },
    },
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <div className="hero-badge">
            <span>Soluciones Tecnológicas</span>
          </div>

          <h1 className="hero-title">
            We Turn Your
            <span className="hero-title-accent" style={{ fontSize: "38px" }}>
              {" "}
              Digital Ideas
            </span>
            <br />
            into Reality
          </h1>

          <p className="hero-description">
            At DevQueens, we craft exceptional digital experiences. From
            innovative UI/UX to cutting-edge web and mobile development, we
            elevate your business to the next level of technology.
          </p>

          <motion.div
            className="hero-buttons"
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
          >
            <button
              className="btn-primary"
              onClick={() =>
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                })
              }
            >
              Get Started
            </button>
            <a href="mailto:hello@devqueensus.com" className="btn-secondary">
              Start a Project
            </a>
          </motion.div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Satisfaction</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
