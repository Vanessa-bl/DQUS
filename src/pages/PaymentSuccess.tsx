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
    transition: { duration: 0.5, ease: "easeOut", delay: 0.12 * i },
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
  margin: 'auto'
};

const gradientOrange = "linear-gradient(135deg, #c2410c 0%, #ea580c 40%, #f97316 100%)";

interface PaymentSuccessProps {
  locale?: "en" | "es";
}

export const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ locale = "es" }) => {
  const isMobile = window.innerWidth < 768;
  const t = useT();
  const { setLocale } = useLocale();

  useEffect(() => {
    setLocale(locale);
  }, [locale, setLocale]);

  const steps = [
    {
      step: "01",
      title: t("payment.success.step1.title", "Te Contactamos"),
      text: t("payment.success.step1.text", "En los próximos minutos nos pondremos en contacto contigo para confirmar tu pedido y conocerte mejor."),
    },
    {
      step: "02",
      title: t("payment.success.step2.title", "Agendamos una Reunión"),
      text: t("payment.success.step2.text", "Coordinaremos una reunión para entender a fondo tus necesidades, objetivos y la visión que tienes para tu presencia online."),
    },
    {
      step: "03",
      title: t("payment.success.step3.title", "Propuestas a Tu Medida"),
      text: t("payment.success.step3.text", "Pondremos sobre la mesa propuestas de diseño web personalizadas, enfocadas en atraer usuarios y alineadas a los requerimientos de tu negocio."),
    },
    {
      step: "04",
      title: t("payment.success.step4.title", "Desarrollo y Creación"),
      text: t("payment.success.step4.text", "Una vez que elijas el camino, crearemos tu sitio web profesional con las mejores prácticas y optimizado para todos los dispositivos."),
    },
    {
      step: "05",
      title: t("payment.success.step5.title", "Listo para Crecer"),
      text: t("payment.success.step5.text", "Dejamos todo preparado para cuando quieras hacer marketing digital. Tu web estará optimizada para campañas, SEO y redes sociales."),
    },
    {
      step: "06",
      title: t("payment.success.step6.title", "Te Acompañamos Siempre"),
      text: t("payment.success.step6.text", "Te acompañamos en cada decisión. No estarás solo: respondemos tus dudas y te guiamos en cada paso del camino."),
    },
  ];

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
          <span style={{ color: "#fff", fontSize: "2.2rem", position: "relative", zIndex: 1, lineHeight: 1 }}>✓</span>
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "600px" }}
        >
          <span style={badgeStyle}>{t("payment.success.badge", "PAGO CONFIRMADO")}</span>
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
            {t("payment.success.title", "¡Pago Exitoso!")}
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
            {t("payment.success.subtitle", "Tu pago se ha procesado correctamente.")}
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
            maxWidth: "900px",
            background: gradientOrange,
            borderRadius: "20px",
            padding: isMobile ? "1.5rem" : "2.5rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "200px",
              height: "200px",
              background: "rgba(251,146,60,0.2)",
              borderRadius: "50%",
              top: "-60px",
              right: "-50px",
              filter: "blur(40px)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "120px",
              height: "120px",
              background: "rgba(251,146,60,0.15)",
              borderRadius: "50%",
              bottom: "-40px",
              left: "-30px",
              filter: "blur(35px)",
              pointerEvents: "none",
            }}
          />
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "#fff",
              margin: 0,
              position: "relative",
              zIndex: 1,
              lineHeight: 1.5,
            }}
          >
            {t("payment.success.footer", "En los próximos minutos estaremos comunicándonos contigo. Mientras tanto, esto es lo que puedes esperar:")}
          </p>
        </motion.div>
      </section>

      <section
        style={{
          maxWidth: "1280px",
          margin: "80px auto 0",
          padding: isMobile ? "2rem 1.5rem" : "4rem 3rem",
          background: "var(--card-bg)",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span style={badgeStyle}>{t("payment.success.steps.badge", "PRÓXIMOS PASOS")}</span>
          <h2
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 800,
              fontSize: isMobile ? "1.6rem" : "clamp(1.8rem, 3vw, 2.2rem)",
              lineHeight: 1.15,
              color: "var(--card-text)",
              margin: "0.75rem 0 0",
              letterSpacing: "-0.02em",
            }}
          >
            {t("payment.success.steps.title", "¿Qué sigue ahora?")}
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {steps.map((item, i) => (
            <motion.div
              key={i}
              custom={i + 1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              style={{
                background: "var(--feature-pill-bg)",
                border: "1px solid var(--feature-pill-border)",
                borderRadius: "20px",
                padding: "1.75rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  color: "#c2410c",
                  opacity: 0.3,
                }}
              >
                {item.step}
              </span>
              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "var(--card-text)",
                  margin: "0.5rem 0 0.35rem",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                  color: "var(--card-text-regular)",
                  margin: 0,
                }}
              >
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        style={{
          maxWidth: "1280px",
          margin: "80px auto 80px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <motion.div custom={7} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
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
              padding: "0.9rem 2.5rem",
              cursor: "pointer",
              letterSpacing: "0.01em",
              textDecoration: "none",
              display: "inline-block",
              transition: "transform 0.2s ease",
            }}
          >
            {t("payment.success.cta", "Volver")}
          </Link>
        </motion.div>
      </section>
    </Layout>
  );
};
