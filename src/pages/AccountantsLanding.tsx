import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Palette, TrendingUp } from "lucide-react";
import VideoMaskHero from "../components/ui/VideoMaskHero/VideoMaskHero";
import { Card } from "../components/ui/card/Card";
import "./pageStyles.css";
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

const inputStyle: React.CSSProperties = {
  fontFamily: "'Nunito Sans', sans-serif",
  fontSize: "0.95rem",
  padding: "0.85rem 1rem",
  border: "1px solid var(--feature-pill-border)",
  borderRadius: "12px",
  background: "var(--feature-pill-bg)",
  color: "var(--card-text)",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'Nunito Sans', sans-serif",
  fontSize: "0.85rem",
  fontWeight: 600,
  color: "var(--card-text-regular)",
  letterSpacing: "0.01em",
};

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzu_6iYYMFNCQcaxxqFl_uQeamqAomcY2HWcclTlUM45_xaeRdfa2j50gUOfAf-9s_2uw/exec";

const anchorLinks = [
  { id: "hero", label: "Inicio", labelKey: "header.anchorNav.hero" },
  { id: "about", label: "Nosotros", labelKey: "header.anchorNav.about" },
  { id: "why", label: "Por Qué", labelKey: "header.anchorNav.why" },
  { id: "services", label: "Servicios", labelKey: "header.anchorNav.services" },
  { id: "offer", label: "Oferta", labelKey: "header.anchorNav.offer" },
  { id: "process", label: "Proceso", labelKey: "header.anchorNav.process" },
  { id: "compare", label: "Comparación", labelKey: "header.anchorNav.compare" },
  { id: "buy", label: "Comprar", labelKey: "header.anchorNav.buy" },
  { id: "contact", label: "Contacto", labelKey: "header.anchorNav.contact" },
];

export const AccountantsLanding: React.FC = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  );
  const sectionPad = isMobile ? "3rem 1.2rem 2.5rem" : "5rem 3rem 4rem";
  const sectionMargin = isMobile ? "50px auto 0" : "80px auto 0";
  const t = useT();
  const { setLocale } = useLocale();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [lastSubmit, setLastSubmit] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setLocale("es");
  }, [setLocale]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (formError) setFormError("");
  };

  const validateForm = useCallback((): string | null => {
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (name.length < 2 || name.length > 100) return "El nombre debe tener entre 2 y 100 caracteres.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Ingresá un email válido.";
    if (form.phone.trim() && !/^[\d\s\-\+\(\)]{4,25}$/.test(form.phone.trim())) return "El teléfono no tiene un formato válido.";
    if (message.length < 5) return "El mensaje debe tener al menos 5 caracteres.";
    if (message.length > 2000) return "El mensaje no puede exceder los 2000 caracteres.";
    return null;
  }, [form]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (Date.now() - lastSubmit < 5000) {
      setFormError("Esperá unos segundos antes de enviar de nuevo.");
      return;
    }

    if (submitting) return;

    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    if ((e.target as HTMLFormElement).querySelector<HTMLInputElement>('input[name="_honey"]')?.value) {
      setSent(true);
      setForm({ name: "", email: "", phone: "", message: "" });
      return;
    }

    setSubmitting(true);

    try {
      const controller = new AbortController();
      abortRef.current = controller;
      const timeout = setTimeout(() => controller.abort(), 10000);

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || "",
          message: form.message.trim(),
          _honey: "",
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);
      setSent(true);
      setForm({ name: "", email: "", phone: "", message: "" });
      setLastSubmit(Date.now());
    } catch (err: unknown) {
      const error = err as Error;
      if (error?.name === "AbortError") {
        setFormError("La solicitud tardó demasiado. Intenta de nuevo.");
      } else {
        setFormError("Hubo un error al enviar. Intenta de nuevo.");
      }
    } finally {
      setSubmitting(false);
      abortRef.current = null;
    }
  };

  return (
    <Layout anchorNav={anchorLinks} landingFooterLinks={anchorLinks}>
      <VideoMaskHero />

      <section id="hero"
        style={{
          maxWidth: "1280px", margin: sectionMargin, padding: sectionPad, overflow: "hidden",
          background: "var(--card-bg)", borderRadius: "15px",
          display: "flex", flexDirection: "column", gap: "2.5rem",
        }}
      >
        <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "720px" }}
        >
          <span style={badgeStyle}>{t("accountants.hero.badge", "SOLUCIONES PARA CONTADORES")}</span>
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? "1.8rem" : "clamp(2.2rem, 3.5vw, 3rem)", lineHeight: 1.1, color: "var(--card-text)", margin: 0, letterSpacing: "-0.02em" }}>
            {t("accountants.hero.title.line1", "Tu Presencia Online")}<br />
            <span className="accent-underline" style={{ color: "var(--card-text)" }}>
              {t("accountants.hero.title.line2", "Como Contador Profesional")}
            </span>
          </h1>
          <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1rem", lineHeight: 1.75, color: "var(--card-text-regular)", margin: 0 }}>
            {t("accountants.hero.desc", "Creamos sitios web profesionales diseñados específicamente para contadores. Una presencia online que refleja tu experiencia, atrae nuevos clientes y te posiciona como el referente que eres en tu mercado.")}
          </p>
        </motion.div>
      </section>

      <section id="about"
        style={{
          maxWidth: "1280px", margin: sectionMargin, padding: sectionPad, overflow: "hidden",
          background: "var(--card-bg)", borderRadius: "15px",
          display: "flex", flexDirection: "column", gap: "2.5rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "680px" }}>
          <span style={badgeStyle}>{t("accountants.about.badge", "QUIÉNES SOMOS")}</span>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? "1.6rem" : "clamp(1.8rem, 3vw, 2.5rem)", lineHeight: 1.15, color: "var(--card-text)", margin: 0, letterSpacing: "-0.02em" }}>
            {t("accountants.about.title.line1", "Expertos en Presencia Digital")}
            <br />
            <span className="accent-underline" style={{ color: "var(--card-text)" }}>
              {t("accountants.about.title.line2", "para Profesionales Contables")}
            </span>
          </h2>
        </div>
        <div className="about-grid" style={{ gap: "3rem", alignItems: "flex-start" }}>
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1rem", lineHeight: 1.75, color: "var(--card-text-regular)", margin: "0 0 1rem" }}>
              {t("accountants.about.p1", "En DevQueens nos especializamos en crear presencia digital para profesionales contables. Entendemos los desafíos únicos de tu industria: necesitás transmitir confianza, experiencia y profesionalismo en cada punto de contacto con tus clientes.")}
            </p>
            <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1rem", lineHeight: 1.75, color: "var(--card-text-regular)", margin: 0 }}>
              {t("accountants.about.p2", "Combinamos diseño estratégico, desarrollo web moderno y optimización para marketing digital. No solo creamos sitios web — construimos herramientas que convierten visitantes en clientes y posicionan tu práctica contable por encima de la competencia.")}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginTop: "1.5rem" }}>
              {[
                t("accountants.about.feature1", "Diseño UX/UI profesional"),
                t("accountants.about.feature2", "Desarrollo web y mobile"),
                t("accountants.about.feature3", "SEO y marketing digital"),
                t("accountants.about.feature4", "Asesoría continua personalizada"),
              ].map((feat) => (
                <span key={feat} style={{
                  fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.78rem", fontWeight: 600,
                  color: "var(--card-text-regular)", background: "var(--feature-pill-bg)",
                  padding: "0.4rem 0.9rem", borderRadius: "999px",
                  border: "1px solid var(--feature-pill-border)", whiteSpace: "nowrap",
                }}>
                  {feat}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{
              display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px",
            }}
          >
            <div style={{
              background: "linear-gradient(135deg, #c2410c 0%, #ea580c 40%, #f97316 100%)",
              borderRadius: "20px", padding: "1.75rem", textAlign: "center",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", width: "80px", height: "80px", background: "rgba(251,146,60,0.2)", borderRadius: "50%", top: "-20px", right: "-20px", filter: "blur(25px)", pointerEvents: "none" }} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "2rem", color: "#fff", margin: "0 0 4px", position: "relative", zIndex: 1 }}>100+</p>
              <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.82rem", color: "#fff", margin: 0, position: "relative", zIndex: 1 }}>{t("accountants.about.stat1", "Proyectos Entregados")}</p>
            </div>
            <div style={{
              background: "linear-gradient(135deg, #c2410c 0%, #ea580c 40%, #f97316 100%)",
              borderRadius: "20px", padding: "1.75rem", textAlign: "center",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", width: "80px", height: "80px", background: "rgba(251,146,60,0.2)", borderRadius: "50%", top: "-20px", right: "-20px", filter: "blur(25px)", pointerEvents: "none" }} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "2rem", color: "#fff", margin: "0 0 4px", position: "relative", zIndex: 1 }}>5+</p>
              <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.82rem", color: "#fff", margin: 0, position: "relative", zIndex: 1 }}>{t("accountants.about.stat2", "Años de Experiencia")}</p>
            </div>
            <div style={{
              background: "linear-gradient(135deg, #c2410c 0%, #ea580c 40%, #f97316 100%)",
              borderRadius: "20px", padding: "1.75rem", textAlign: "center",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", width: "80px", height: "80px", background: "rgba(251,146,60,0.2)", borderRadius: "50%", top: "-20px", right: "-20px", filter: "blur(25px)", pointerEvents: "none" }} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "2rem", color: "#fff", margin: "0 0 4px", position: "relative", zIndex: 1 }}>100%</p>
              <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.82rem", color: "#fff", margin: 0, position: "relative", zIndex: 1 }}>{t("accountants.about.stat3", "Clientes Satisfechos")}</p>
            </div>
            <div style={{
              background: "linear-gradient(135deg, #c2410c 0%, #ea580c 40%, #f97316 100%)",
              borderRadius: "20px", padding: "1.75rem", textAlign: "center",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", width: "80px", height: "80px", background: "rgba(251,146,60,0.2)", borderRadius: "50%", top: "-20px", right: "-20px", filter: "blur(25px)", pointerEvents: "none" }} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "2rem", color: "#fff", margin: "0 0 4px", position: "relative", zIndex: 1 }}>24/7</p>
              <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.82rem", color: "#fff", margin: 0, position: "relative", zIndex: 1 }}>{t("accountants.about.stat4", "Soporte Continuo")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="why"
        style={{
          maxWidth: "1280px", margin: sectionMargin, padding: sectionPad, overflow: "hidden",
          background: "var(--card-bg)", borderRadius: "15px",
          display: "flex", flexDirection: "column", gap: "2.5rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "680px" }}>
          <span style={badgeStyle}>{t("accountants.why.badge", "¿POR QUÉ ESTAR ONLINE?")}</span>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? "1.6rem" : "clamp(1.8rem, 3vw, 2.5rem)", lineHeight: 1.15, color: "var(--card-text)", margin: 0, letterSpacing: "-0.02em" }}>
            {t("accountants.why.title", "Tus Clientes Te Buscan en Internet. ¿Te Encuentran?")}
          </h2>
        </div>
        <div className="why-grid" style={{ gap: "20px" }}>
          {[
            { num: "93%", title: t("accountants.why.stat1.title", "Investigan Online"), text: t("accountants.why.stat1.text", "De los clientes potenciales investigan en internet antes de contratar un servicio profesional.") },
            { num: "75%", title: t("accountants.why.stat2.title", "Confían Más"), text: t("accountants.why.stat2.text", "Un sitio web profesional aumenta la confianza y credibilidad de tu servicio contable.") },
            { num: "3x", title: t("accountants.why.stat3.title", "Más Oportunidades"), text: t("accountants.why.stat3.text", "Los contadores con presencia online reciben hasta 3 veces más consultas de nuevos clientes.") },
          ].map((item, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ background: "linear-gradient(135deg, #c2410c 0%, #ea580c 40%, #f97316 100%)", borderRadius: "20px", padding: "2rem", position: "relative", overflow: "hidden" }}
            >
              <div style={{ position: "absolute", width: "100px", height: "100px", background: "rgba(251,146,60,0.25)", borderRadius: "50%", top: "-20px", right: "-20px", filter: "blur(30px)", pointerEvents: "none" }} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "2rem", color: "#fff", margin: "0 0 8px", position: "relative", zIndex: 1 }}>{item.num}</p>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#fff", margin: "0 0 6px", position: "relative", zIndex: 1 }}>{item.title}</h3>
              <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.85rem", lineHeight: 1.6, color: "#fff", margin: 0, position: "relative", zIndex: 1 }}>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="services"
        style={{
          maxWidth: "1280px", margin: sectionMargin, padding: sectionPad, overflow: "hidden",
          background: "var(--card-bg)", borderRadius: "15px",
          display: "flex", flexDirection: "column", gap: "2.5rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "680px" }}>
          <span style={badgeStyle}>{t("accountants.services.badge", "LO QUE OFRECEMOS")}</span>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? "1.6rem" : "clamp(1.8rem, 3vw, 2.5rem)", lineHeight: 1.15, color: "var(--card-text)", margin: 0, letterSpacing: "-0.02em" }}>
            {t("accountants.services.title.line1", "Tu Web Profesional")}<br />
            <span className="accent-underline" style={{ color: "var(--card-text)" }}>
              {t("accountants.services.title.line2", "Lista para Crecer")}
            </span>
          </h2>
        </div>
        <div className="cards-grid cards-grid--2col">
          <Card inverted areaService={t("accountants.services.card1.area", "SITIO WEB")} title={t("accountants.services.card1.title", "Web Profesional Personalizada")} content={t("accountants.services.card1.content", "Diseñamos tu sitio web a medida con información clara sobre tus servicios, experiencia y valores. Adaptado a web y mobile para que te vean impecable en cualquier dispositivo.")} />
          <Card inverted areaService={t("accountants.services.card2.area", "CATÁLOGO")} title={t("accountants.services.card2.title", "Catálogo de Servicios")} content={t("accountants.services.card2.content", "Presenta tus servicios contables de forma organizada y profesional. Tus clientes entenderán exactamente qué ofreces y por qué deberían elegirte.")} />
          <Card inverted areaService={t("accountants.services.card3.area", "SEO & MARKETING")} title={t("accountants.services.card3.title", "Optimización para Marketing")} content={t("accountants.services.card3.content", "Tu web lista para campañas de publicidad y marketing digital. Optimizada para SEO, Google Ads y redes sociales desde el día uno.")} />
          <Card inverted areaService={t("accountants.services.card4.area", "ASESORÍA")} title={t("accountants.services.card4.title", "Asesoría y Acompañamiento")} content={t("accountants.services.card4.content", "Te guiamos en cada decisión. Comparamos opciones del mercado, analizamos competidores y te ayudamos a destacar con fundamentos sólidos.")} />
        </div>
      </section>

      <section id="offer"
        style={{
          maxWidth: "1280px", margin: sectionMargin, padding: "0",
          background: "linear-gradient(135deg, #c2410c 0%, #ea580c 40%, #f97316 100%)",
          borderRadius: "20px", overflow: "hidden", position: "relative",
        }}
      >
        <div style={{ position: "absolute", width: "300px", height: "300px", background: "rgba(251,146,60,0.2)", borderRadius: "50%", top: "-80px", right: "-60px", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: "200px", height: "200px", background: "rgba(251,146,60,0.15)", borderRadius: "50%", bottom: "-60px", left: "-40px", filter: "blur(50px)", pointerEvents: "none" }} />
        <div className="offer-row" style={{ position: "relative", zIndex: 1, padding: isMobile ? "2.5rem 1.2rem" : "4rem 3rem", gap: "2rem" }}>
          <div>
            <span style={{ display: "inline-block", fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", marginBottom: "0.75rem" }}>
              {t("accountants.offer.badge", "OFERTA LANZAMIENTO")}
            </span>
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? "2rem" : "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: 1.1, color: "#fff", margin: "0 0 0.75rem" }}>
              {t("accountants.offer.title", "Tu Web Profesional desde")}
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 900, fontSize: isMobile ? "3rem" : "clamp(3rem, 6vw, 5rem)", color: "#fff", margin: 0, lineHeight: 1 }}>
              $100 <span style={{ fontSize: "0.4em", fontWeight: 700, opacity: 0.7 }}>USD</span>
            </p>
            <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.95rem", color: "#fff", margin: "1rem 0 0", maxWidth: "400px" }}>
              {t("accountants.offer.desc", "Incluye diseño personalizado, desarrollo web y mobile, optimización SEO básica y asesoría inicial. Todo lo que necesitás para empezar.")}
            </p>
          </div>
          <a href="#buy" data-umami-event="cta-aprovechar-oferta" onClick={(e) => { e.preventDefault(); document.getElementById("buy")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{
              fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.95rem", fontWeight: 700,
              color: "#c2410c", background: "#fff", border: "none", borderRadius: "999px",
              padding: "0.9rem 2.25rem", cursor: "pointer", letterSpacing: "0.01em",
              textDecoration: "none", whiteSpace: "nowrap", display: "inline-block",
              transition: "transform 0.2s ease",
            }}
          >
            {t("accountants.offer.cta", "Aprovechar Oferta")}
          </a>
        </div>
      </section>

      <section id="process"
        style={{
          maxWidth: "1280px", margin: sectionMargin, padding: sectionPad, overflow: "hidden",
          background: "var(--card-bg)", borderRadius: "15px",
          display: "flex", flexDirection: "column", gap: "2.5rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "680px" }}>
          <span style={badgeStyle}>{t("accountants.process.badge", "CÓMO FUNCIONA")}</span>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? "1.6rem" : "clamp(1.8rem, 3vw, 2.5rem)", lineHeight: 1.15, color: "var(--card-text)", margin: 0, letterSpacing: "-0.02em" }}>
            {t("accountants.process.title", "Del Primer Contacto a Tu Web Publicada")}
          </h2>
        </div>
        <div className="process-grid" style={{ gap: "20px" }}>
          {[
            { step: "01", title: t("accountants.process.step1.title", "Consultoría Gratuita"), text: t("accountants.process.step1.text", "Conversamos sobre tu práctica contable, tus objetivos y cómo querés mostrarte al mundo.") },
            { step: "02", title: t("accountants.process.step2.title", "Diseño a Tu Medida"), text: t("accountants.process.step2.text", "Creamos propuestas de diseño alineadas a tu identidad. Vos elegís o traés tus propias ideas.") },
            { step: "03", title: t("accountants.process.step3.title", "Desarrollo Ágil"), text: t("accountants.process.step3.text", "Construimos tu web con las mejores prácticas. Rápida, segura y optimizada para todos los dispositivos.") },
            { step: "04", title: t("accountants.process.step4.title", "Lanzamiento y Soporte"), text: t("accountants.process.step4.text", "Publicamos tu sitio y te acompañamos con soporte continuo para que todo funcione perfecto.") },
          ].map((item, i) => (
            <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ background: "var(--feature-pill-bg)", border: "1px solid var(--feature-pill-border)", borderRadius: "20px", padding: "1.75rem" }}
            >
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "var(--card-text)", opacity: 0.25 }}>{item.step}</span>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--card-text)", margin: "0.5rem 0 0.35rem" }}>{item.title}</h3>
              <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.85rem", lineHeight: 1.6, color: "var(--card-text-regular)", margin: 0 }}>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="compare"
        style={{
          maxWidth: "1280px", margin: sectionMargin, padding: sectionPad, overflow: "hidden",
          background: "var(--card-bg)", borderRadius: "15px",
          display: "flex", flexDirection: "column", gap: "2.5rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "680px" }}>
          <span style={badgeStyle}>{t("accountants.compare.badge", "COMPARACIÓN")}</span>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? "1.6rem" : "clamp(1.8rem, 3vw, 2.5rem)", lineHeight: 1.15, color: "var(--card-text)", margin: 0, letterSpacing: "-0.02em" }}>
            {t("accountants.compare.title.line1", "La Diferencia de")}<br />
            <span className="accent-underline" style={{ color: "var(--card-text)" }}>
              {t("accountants.compare.title.line2", "Tener Presencia Online")}
            </span>
          </h2>
        </div>
        <div className="compare-grid" style={{ gap: "24px" }}>
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ border: "1px solid var(--feature-pill-border)", borderRadius: "20px", padding: "2rem", background: "var(--feature-pill-bg)" }}
          >
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "var(--card-text)", margin: "0 0 1rem" }}>
              {t("accountants.compare.left.title", "Sin Presencia Online")}
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[t("accountants.compare.left.1", "Clientes no te encuentran en internet"), t("accountants.compare.left.2", "Sin material para hacer publicidad"), t("accountants.compare.left.3", "Imagen poco profesional"), t("accountants.compare.left.4", "Dependés solo del boca a boca")].map((item, i) => (
                <li key={i} style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.9rem", color: "var(--card-text-regular)", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <span style={{ color: "var(--card-text-regular)", opacity: 0.3, fontSize: "1.1rem", lineHeight: 1 }}>—</span>{item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ background: "linear-gradient(135deg, #c2410c 0%, #ea580c 40%, #f97316 100%)", borderRadius: "20px", padding: "2rem", position: "relative", overflow: "hidden" }}
          >
            <div style={{ position: "absolute", width: "140px", height: "140px", background: "rgba(251,146,60,0.25)", borderRadius: "50%", top: "-40px", right: "-30px", filter: "blur(35px)", pointerEvents: "none" }} />
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#fff", margin: "0 0 1rem", position: "relative", zIndex: 1 }}>
              {t("accountants.compare.right.title", "Con DevQueens")}
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem", position: "relative", zIndex: 1 }}>
              {[t("accountants.compare.right.1", "Web profesional 100% personalizada"), t("accountants.compare.right.2", "Lista para campañas de Google y redes"), t("accountants.compare.right.3", "Refleja tu experiencia y seriedad"), t("accountants.compare.right.4", "Flujo constante de nuevos clientes")].map((item, i) => (
                <li key={i} style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.9rem", color: "#fff", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <span style={{ color: "#fed7aa", fontSize: "1.1rem", lineHeight: 1 }}>✓</span>{item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section id="buy"
        style={{
          maxWidth: "1280px", margin: sectionMargin, padding: sectionPad, overflow: "hidden",
          background: "var(--card-bg)", borderRadius: "15px",
          display: "flex", flexDirection: "column", gap: "2.5rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "680px" }}>
          <span style={badgeStyle}>{t("accountants.buy.badge", "COMENZAR AHORA")}</span>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? "1.6rem" : "clamp(1.8rem, 3vw, 2.5rem)", lineHeight: 1.15, color: "var(--card-text)", margin: 0, letterSpacing: "-0.02em" }}>
            {t("accountants.buy.title.line1", "Obten Tu Sitio Web")}<br />
            <span className="accent-underline" style={{ color: "var(--card-text)" }}>
              {t("accountants.buy.title.line2", "Listo para Atraer Clientes")}
            </span>
          </h2>
          <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1rem", lineHeight: 1.75, color: "var(--card-text-regular)", margin: 0 }}>
            {t("accountants.buy.desc", "En menos de una semana tendrás tu sitio web profesional publicado, optimizado para atraer clientes y preparado para campañas de marketing digital. Sin complicaciones, sin letras chicas.")}
          </p>
        </div>

        <div className="buy-grid" style={{ gap: "24px" }}>
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{
              background: "linear-gradient(135deg, #c2410c 0%, #ea580c 40%, #f97316 100%)",
              borderRadius: "24px", padding: isMobile ? "2rem" : "2.5rem",
              position: "relative", overflow: "hidden",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
            }}
          >
            <div style={{ position: "absolute", width: "200px", height: "200px", background: "rgba(251,146,60,0.2)", borderRadius: "50%", top: "-60px", right: "-50px", filter: "blur(40px)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", width: "120px", height: "120px", background: "rgba(251,146,60,0.12)", borderRadius: "16px", transform: "rotate(15deg)", bottom: "30px", right: "20px", border: "1px solid rgba(255,255,255,0.1)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "#fff", margin: "0 0 1.25rem", lineHeight: 1.3 }}>
                {t("accountants.buy.includes.title", "Qué Incluye:")}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {[
                  t("accountants.buy.includes.1", "Diseño web profesional personalizado"),
                  t("accountants.buy.includes.2", "Optimizado para SEO desde el día uno"),
                  t("accountants.buy.includes.3", "Adaptado a mobile y todos los dispositivos"),
                  t("accountants.buy.includes.4", "Listo para Google Ads y redes sociales"),
                  t("accountants.buy.includes.5", "Soporte y acompañamiento continuo"),
                ].map((item, i) => (
                  <li key={i} style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.92rem", color: "#fff", display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <span style={{ color: "#fed7aa", flexShrink: 0 }}>✓</span>{item}
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 900, fontSize: "2.5rem", color: "#fff", lineHeight: 1 }}>$100</span>
                <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.9rem", color: "#fff", fontWeight: 600 }}>USD</span>
              </div>
              <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.8)", margin: "0 0 1.5rem" }}>
                {t("accountants.buy.guarantee", "Pago 100% seguro · Resultados en menos de 7 días")}
              </p>
            </div>
            <a href="https://buy.stripe.com/fZu4gz3Ac6DD1bRd5iaR203" data-umami-event="cta-comprar-stripe"
              style={{
                fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.95rem", fontWeight: 700,
                color: "#c2410c", background: "#fff", border: "none", borderRadius: "999px",
                padding: "0.9rem 2.5rem", cursor: "pointer", letterSpacing: "0.01em",
                textDecoration: "none", display: "inline-block", width: "fit-content",
                transition: "transform 0.2s ease", position: "relative", zIndex: 1,
              }}
            >
              {t("accountants.buy.cta", "Obtener Mi Sitio Web Ahora")}
            </a>
          </motion.div>

          <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{
              display: "flex", flexDirection: "column", gap: "20px", justifyContent: "center",
            }}
          >
            <div style={{
              background: "var(--feature-pill-bg)", border: "1px solid var(--feature-pill-border)",
              borderRadius: "16px", padding: "1.5rem",
              display: "flex", gap: "1rem", alignItems: "flex-start",
            }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg, #c2410c 0%, #ea580c 40%, #f97316 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <MessageCircle size={20} color="#fff" />
              </div>
              <div>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "var(--card-text)", margin: "0 0 0.3rem" }}>{t("accountants.buy.perk1.title", "Consultoría Inicial Sin Costo")}</h3>
                <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.85rem", lineHeight: 1.55, color: "var(--card-text-regular)", margin: 0 }}>{t("accountants.buy.perk1.text", "Conversamos sobre tu práctica y definimos juntos la mejor estrategia para tu web.")}</p>
              </div>
            </div>
            <div style={{
              background: "var(--feature-pill-bg)", border: "1px solid var(--feature-pill-border)",
              borderRadius: "16px", padding: "1.5rem",
              display: "flex", gap: "1rem", alignItems: "flex-start",
            }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg, #c2410c 0%, #ea580c 40%, #f97316 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Palette size={20} color="#fff" />
              </div>
              <div>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "var(--card-text)", margin: "0 0 0.3rem" }}>{t("accountants.buy.perk2.title", "Diseño que Refleja Tu Marca")}</h3>
                <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.85rem", lineHeight: 1.55, color: "var(--card-text-regular)", margin: 0 }}>{t("accountants.buy.perk2.text", "Creamos una identidad visual profesional alineada a tu imagen como contador.")}</p>
              </div>
            </div>
            <div style={{
              background: "var(--feature-pill-bg)", border: "1px solid var(--feature-pill-border)",
              borderRadius: "16px", padding: "1.5rem",
              display: "flex", gap: "1rem", alignItems: "flex-start",
            }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg, #c2410c 0%, #ea580c 40%, #f97316 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <TrendingUp size={20} color="#fff" />
              </div>
              <div>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "var(--card-text)", margin: "0 0 0.3rem" }}>{t("accountants.buy.perk3.title", "Preparado para Crecer")}</h3>
                <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.85rem", lineHeight: 1.55, color: "var(--card-text-regular)", margin: 0 }}>{t("accountants.buy.perk3.text", "Tu sitio listo para escalar con marketing digital cuando vos decidas.")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact"
        style={{
          maxWidth: "1280px", margin: sectionMargin, padding: sectionPad, overflow: "hidden",
          background: "var(--card-bg)", borderRadius: "15px",
          display: "flex", flexDirection: "column", gap: "2.5rem", position: "relative",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "680px" }}>
          <span style={badgeStyle}>{t("accountants.contact.badge", "PRIMER ASESORAMIENTO GRATIS")}</span>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? "1.6rem" : "clamp(1.8rem, 3vw, 2.5rem)", lineHeight: 1.15, color: "var(--card-text)", margin: 0, letterSpacing: "-0.02em" }}>
            {t("accountants.contact.title", "Empecemos a Construir Tu Presencia Online")}
          </h2>
          <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "1rem", lineHeight: 1.75, color: "var(--card-text-regular)", margin: 0 }}>
            {t("accountants.contact.desc", "Dejanos tus datos y te contactamos para una asesoría sin costo. Traé tus ideas o nosotros te proponemos diseños y posibilidades. Sin compromiso, solo oportunidades.")}
          </p>
        </div>

        <div className="contact-row" style={{ gap: isMobile ? "2rem" : "3rem" }}>
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" as const }}
              style={{ flex: "1 1 50%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "2rem" }}
            >
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#c2410c", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                <span style={{ color: "#fff", fontSize: "1.8rem" }}>✓</span>
              </div>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "var(--card-text)", margin: "0 0 0.5rem" }}>
                {t("accountants.form.sent.title", "¡Gracias por tu interés!")}
              </h3>
              <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.95rem", color: "var(--card-text-regular)", maxWidth: "360px" }}>
                {t("accountants.form.sent.text", "Hemos recibido tu solicitud. Te contactaremos en las próximas 24 horas para coordinar tu asesoría gratuita.")}
              </p>
            </motion.div>
          ) : (
            <motion.form onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" as const }}
              style={{ display: "flex", flexDirection: "column", gap: "1.5rem", flex: "1 1 50%" }}
            >
              <input type="text" name="_honey" tabIndex={-1} style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }} autoComplete="off" />

              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <label htmlFor="al-name" style={labelStyle}>{t("accountants.form.name", "Nombre completo")}</label>
                <input type="text" id="al-name" name="name" value={form.name} onChange={handleChange} required maxLength={100} placeholder={t("accountants.form.name.placeholder", "Tu nombre y apellido")} style={inputStyle} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <label htmlFor="al-email" style={labelStyle}>{t("accountants.form.email", "Email")}</label>
                <input type="email" id="al-email" name="email" value={form.email} onChange={handleChange} required maxLength={254} placeholder={t("accountants.form.email.placeholder", "Tu correo electrónico")} style={inputStyle} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <label htmlFor="al-phone" style={labelStyle}>{t("accountants.form.phone", "Teléfono (opcional)")}</label>
                <input type="tel" id="al-phone" name="phone" value={form.phone} onChange={handleChange} maxLength={20} placeholder={t("accountants.form.phone.placeholder", "Tu número de contacto")} style={inputStyle} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <label htmlFor="al-message" style={labelStyle}>{t("accountants.form.message", "Contanos sobre tu práctica")}</label>
                <textarea id="al-message" name="message" rows={4} value={form.message} onChange={handleChange} required maxLength={2000} placeholder={t("accountants.form.message.placeholder", "¿Qué servicios ofrecés? ¿Tenés alguna idea para tu web?")} style={{ ...inputStyle, resize: "vertical", minHeight: "100px" }} />
              </div>

              {formError && (
                <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.85rem", color: "#dc2626", margin: 0, padding: "0.6rem 1rem", background: "rgba(220,38,38,0.08)", borderRadius: "10px" }}>
                  {formError}
                </p>
              )}

              <button type="submit" disabled={submitting} data-umami-event="cta-formulario-contacto"
                style={{
                  fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.95rem", fontWeight: 700,
                  color: "var(--btn-text)", background: "var(--btn-bg)", border: "none",
                  borderRadius: "999px", padding: "0.9rem 2.5rem", cursor: submitting ? "not-allowed" : "pointer",
                  letterSpacing: "0.01em", width: "fit-content", transition: "transform 0.2s ease",
                  opacity: submitting ? 0.6 : 1,
                }}
              >
                {submitting ? "Enviando..." : t("accountants.form.submit", "Quiero Mi Asesoría Gratuita")}
              </button>
            </motion.form>
          )}

          {!isMobile && (
            <div style={{
              flex: "1 1 50%",
              background: "linear-gradient(135deg, #c2410c 0%, #ea580c 40%, #f97316 100%)",
              borderRadius: "24px", padding: "2.5rem",
              position: "relative", overflow: "hidden",
              display: "flex", flexDirection: "column", justifyContent: "center",
              minHeight: "400px",
            }}>
              <div style={{ position: "absolute", width: "200px", height: "200px", background: "rgba(251,146,60,0.25)", borderRadius: "50%", top: "-60px", right: "-50px", filter: "blur(40px)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", width: "120px", height: "120px", background: "rgba(251,146,60,0.15)", borderRadius: "16px", transform: "rotate(15deg)", bottom: "30px", right: "20px", border: "1px solid rgba(255,255,255,0.1)" }} />
              <div style={{ position: "absolute", width: "80px", height: "80px", background: "rgba(255,255,255,0.06)", borderRadius: "50%", top: "40%", left: "20px" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1.6rem", color: "#fff", margin: "0 0 1rem", lineHeight: 1.2 }}>
                  {t("accountants.form.side.title", "¿Por qué elegirnos?")}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  {[
                    t("accountants.form.side.1", "Primer asesoramiento sin costo"),
                    t("accountants.form.side.2", "Diseños personalizados o traé el tuyo"),
                    t("accountants.form.side.3", "Te acompañamos en cada decisión"),
                    t("accountants.form.side.4", "Web lista para marketing y publicidad"),
                  ].map((item, i) => (
                    <li key={i} style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: "0.95rem", color: "#fff", display: "flex", gap: "10px", alignItems: "flex-start" }}>
                      <span style={{ color: "#fed7aa", flexShrink: 0 }}>✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};
