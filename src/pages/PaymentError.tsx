import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "./layout";
import { useT } from "../i18n/useT";
import { useLocale } from "../i18n/provider";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: 0.12 * i },
  }),
};

const badgeStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
  background: "var(--pill-bg)",
  color: "var(--pill-text)",
  fontFamily: "'Nunito Sans', sans-serif",
  fontSize: "0.78rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding: "0.4rem 1rem",
  borderRadius: "999px",
  width: "fit-content",
};

const gradientOrange = "linear-gradient(135deg, #c2410c 0%, #ea580c 40%, #f97316 100%)";

interface PaymentErrorProps {
  locale?: "en" | "es";
}

export const PaymentError: React.FC<PaymentErrorProps> = ({ locale = "es" }) => {
  const isMobile = window.innerWidth < 768;
  const t = useT();
  const { setLocale } = useLocale();

  useEffect(() => {
    setLocale(locale);
  }, [locale, setLocale]);

  return (
    <Layout>
      <section
        style={{
          maxWidth: "1280px",
          margin: "80px auto 0",
          padding: isMobile ? "3rem 1.5rem 2.5rem" : "5rem 3rem 4rem",
          background: "var(--card-bg)",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2.5rem",
          textAlign: "center",
        }}
      >
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: gradientOrange,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "60px",
              height: "60px",
              background: "rgba(251,146,60,0.25)",
              borderRadius: "50%",
              top: "-15px",
              right: "-15px",
              filter: "blur(20px)",
              pointerEvents: "none",
            }}
          />
          <span style={{ color: "#fff", fontSize: "2rem", position: "relative", zIndex: 1, lineHeight: 1, fontWeight: 700 }}>
            ✕
          </span>
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "600px" }}
        >
          <span style={badgeStyle}>{t("payment.error.badge", "ERROR EN EL PAGO")}</span>
          <h1
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 800,
              fontSize: isMobile ? "1.8rem" : "clamp(2.2rem, 3.5vw, 2.8rem)",
              lineHeight: 1.15,
              color: "var(--card-text)",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            {t("payment.error.title", "Error en el Pago")}
          </h1>
          <p
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "var(--card-text-regular)",
              margin: 0,
            }}
          >
            {t("payment.error.subtitle", "Hubo un problema al procesar tu pago. Por favor, intenta de nuevo.")}
          </p>
        </motion.div>

        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{
            width: "100%",
            maxWidth: "700px",
            background: "var(--feature-pill-bg)",
            border: "1px solid var(--feature-pill-border)",
            borderRadius: "20px",
            padding: isMobile ? "1.5rem" : "2rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.65,
              color: "var(--card-text-regular)",
              margin: 0,
            }}
          >
            {t("payment.error.desc", "Esto puede deberse a un problema temporal con el procesador de pagos o a fondos insuficientes. Si el problema persiste, no dudes en contactarnos directamente.")}
          </p>
        </motion.div>

        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            to="/contadores"
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "var(--btn-text)",
              background: "var(--btn-bg)",
              border: "none",
              borderRadius: "999px",
              padding: "0.9rem 2.25rem",
              cursor: "pointer",
              letterSpacing: "0.01em",
              textDecoration: "none",
              display: "inline-block",
              transition: "transform 0.2s ease",
            }}
          >
            {t("payment.error.back", "Volver")}
          </Link>
        </motion.div>
      </section>
    </Layout>
  );
};
