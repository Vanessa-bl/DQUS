import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Palette, TrendingUp } from "lucide-react";
import VideoMaskHero from "../components/ui/VideoMaskHero/VideoMaskHero";
import NewHero from "../components/ui/NewHero/NewHero";
import { Card } from "../components/ui/card/Card";
import { ImageCard } from "../components/ui/ImageCard/ImageCard";
import "./pageStyles.css";
import "./AccountantsLanding.css";
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

const stats = [
  { num: "100+", key: "stat1", fallback: "Proyectos Entregados" },
  { num: "5+", key: "stat2", fallback: "Años de Experiencia" },
  { num: "100%", key: "stat3", fallback: "Clientes Satisfechos" },
  { num: "24/7", key: "stat4", fallback: "Soporte Continuo" },
];

const processSteps = [
  { step: "01", key: "step1", titleFallback: "Consultoría Gratuita", textFallback: "Conversamos sobre tu práctica contable, tus objetivos y cómo querés mostrarte al mundo." },
  { step: "02", key: "step2", titleFallback: "Diseño a Tu Medida", textFallback: "Creamos propuestas de diseño alineadas a tu identidad. Vos elegís o traés tus propias ideas." },
  { step: "03", key: "step3", titleFallback: "Desarrollo Ágil", textFallback: "Construimos tu web con las mejores prácticas. Rápida, segura y optimizada para todos los dispositivos." },
  { step: "04", key: "step4", titleFallback: "Lanzamiento y Soporte", textFallback: "Publicamos tu sitio y te acompañamos con soporte continuo para que todo funcione perfecto." },
];

export const AccountantsLanding: React.FC = () => {
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
    if (form.phone.trim() && !/^[\d\s\-+()]{4,25}$/.test(form.phone.trim())) return "El teléfono no tiene un formato válido.";
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

      <NewHero tPrefix="accountants.hero" id="hero" btnStartTarget="offer" btnProjectTarget="contact" hideLine3 />

      <section id="about" className="page-section page-section--clip">
        <div className="page-block">
          <span className="page-badge">{t("accountants.about.badge", "QUIÉNES SOMOS")}</span>
          <h2 className="al-section-title">
            {t("accountants.about.title.line1", "Expertos en Presencia Digital")}
            <br />
            <span className="accent-underline">
              {t("accountants.about.title.line2", "para Profesionales Contables")}
            </span>
          </h2>
        </div>
        <div className="al-about-grid">
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="al-story-p">
              {t("accountants.about.p1", "En DevQueens nos especializamos en crear presencia digital para profesionales contables. Entendemos los desafíos únicos de tu industria: necesitás transmitir confianza, experiencia y profesionalismo en cada punto de contacto con tus clientes.")}
            </p>
            <p className="al-story-p">
              {t("accountants.about.p2", "Combinamos diseño estratégico, desarrollo web moderno y optimización para marketing digital. No solo creamos sitios web, construimos herramientas que convierten visitantes en clientes y posicionan tu práctica contable por encima de la competencia.")}
            </p>
            <div className="al-story-features">
              {[
                t("accountants.about.feature1", "Diseño UX/UI profesional"),
                t("accountants.about.feature2", "Desarrollo web y mobile"),
                t("accountants.about.feature3", "SEO y marketing digital"),
                t("accountants.about.feature4", "Asesoría continua personalizada"),
              ].map((feat) => (
                <span key={feat} className="al-story-feature-pill">{feat}</span>
              ))}
            </div>
          </motion.div>
          <motion.div className="al-stats" custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            {stats.map((s) => (
              <div key={s.key} className="al-stat">
                <div className="al-stat-glow" aria-hidden="true" />
                <p className="al-stat-num">{s.num}</p>
                <p className="al-stat-label">{t(`accountants.about.${s.key}`, s.fallback)}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="why" className="page-section page-section--clip">
        <div className="page-block">
          <span className="page-badge">{t("accountants.why.badge", "¿POR QUÉ ESTAR ONLINE?")}</span>
          <h2 className="al-section-title">
            {t("accountants.why.title", "Tus Clientes Te Buscan en Internet. ¿Te Encuentran?")}
          </h2>
        </div>
        <div className="why-grid">
          <ImageCard
            index={0}
            image="https://res.cloudinary.com/dljbxdjl7/image/upload/v1779879898/card-one_bweqvl.jpg"
            stat="93%"
            title={t("accountants.why.stat1.title", "Investigan Online")}
            description={t("accountants.why.stat1.text", "De los clientes potenciales investigan en internet antes de contratar un servicio profesional.")}
          />
          <ImageCard
            index={1}
            image="https://res.cloudinary.com/dljbxdjl7/image/upload/v1779879898/card-two_dc7czx.jpg"
            stat="75%"
            title={t("accountants.why.stat2.title", "Confían Más")}
            description={t("accountants.why.stat2.text", "Un sitio web profesional aumenta la confianza y credibilidad de tu servicio contable.")}
          />
          <ImageCard
            index={2}
            image="https://res.cloudinary.com/dljbxdjl7/image/upload/v1779879898/card-three_hktgir.jpg"
            stat="3x"
            title={t("accountants.why.stat3.title", "Más Oportunidades")}
            description={t("accountants.why.stat3.text", "Los contadores con presencia online reciben hasta 3 veces más consultas de nuevos clientes.")}
          />
        </div>
      </section>

      <section id="services" className="page-section page-section--clip">
        <div className="page-block">
          <span className="page-badge">{t("accountants.services.badge", "LO QUE OFRECEMOS")}</span>
          <h2 className="al-section-title">
            {t("accountants.services.title.line1", "Tu Web Profesional")}
            <br />
            <span className="accent-underline">
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

      <section id="offer" className="page-section--flush al-offer">
        <div className="al-offer__overlay" aria-hidden="true" />
        <div className="al-offer__glow--top" aria-hidden="true" />
        <div className="al-offer__glow--bottom" aria-hidden="true" />
        <div className="al-offer__body">
          <div>
            <span className="al-offer__eyebrow">
              {t("accountants.offer.badge", "OFERTA LANZAMIENTO")}
            </span>
            <h2 className="al-offer__title">
              {t("accountants.offer.title", "Tu Web Profesional desde")}
            </h2>
            <p className="al-offer__price">
              $100 <span className="al-offer__price-unit">USD</span>
            </p>
            <p className="al-offer__desc">
              {t("accountants.offer.desc", "Incluye diseño personalizado, desarrollo web y mobile, optimización SEO básica y asesoría inicial. Todo lo que necesitás para empezar.")}
            </p>
          </div>
          <a
            className="al-offer__cta"
            href="#buy"
            data-umami-event="cta-aprovechar-oferta"
            onClick={(e) => { e.preventDefault(); document.getElementById("buy")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            {t("accountants.offer.cta", "Aprovechar Oferta")}
          </a>
        </div>
      </section>

      <section id="process" className="page-section page-section--clip">
        <div className="page-block">
          <span className="page-badge">{t("accountants.process.badge", "CÓMO FUNCIONA")}</span>
          <h2 className="al-section-title">
            {t("accountants.process.title", "Del Primer Contacto a Tu Web Publicada")}
          </h2>
        </div>
        <div className="al-process-grid">
          {processSteps.map((item, i) => (
            <motion.div
              key={item.step}
              className="al-process-step"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <span className="al-process-step-num">{item.step}</span>
              <h3 className="al-process-step-title">{t(`accountants.process.${item.key}.title`, item.titleFallback)}</h3>
              <p className="al-process-step-text">{t(`accountants.process.${item.key}.text`, item.textFallback)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="compare" className="page-section page-section--clip">
        <div className="page-block">
          <span className="page-badge">{t("accountants.compare.badge", "COMPARACIÓN")}</span>
          <h2 className="al-section-title">
            {t("accountants.compare.title.line1", "La Diferencia de")}
            <br />
            <span className="accent-underline">
              {t("accountants.compare.title.line2", "Tener Presencia Online")}
            </span>
          </h2>
        </div>
        <div className="al-compare-grid">
          <motion.div
            className="al-compare-card"
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h3 className="al-compare-card__title">
              {t("accountants.compare.left.title", "Sin Presencia Online")}
            </h3>
            <ul className="al-compare-list">
              {[
                t("accountants.compare.left.1", "Clientes no te encuentran en internet"),
                t("accountants.compare.left.2", "Sin material para hacer publicidad"),
                t("accountants.compare.left.3", "Imagen poco profesional"),
                t("accountants.compare.left.4", "Dependés solo del boca a boca"),
              ].map((item) => (
                <li key={item} className="al-compare-list-item">
                  <span className="al-compare-list-marker" aria-hidden="true">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className="al-compare-card al-compare-card--positive"
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="al-compare-card__glow" aria-hidden="true" />
            <h3 className="al-compare-card__title">
              {t("accountants.compare.right.title", "Con DevQueens")}
            </h3>
            <ul className="al-compare-list">
              {[
                t("accountants.compare.right.1", "Web profesional 100% personalizada"),
                t("accountants.compare.right.2", "Lista para campañas de Google y redes"),
                t("accountants.compare.right.3", "Refleja tu experiencia y seriedad"),
                t("accountants.compare.right.4", "Flujo constante de nuevos clientes"),
              ].map((item) => (
                <li key={item} className="al-compare-list-item">
                  <span className="al-compare-list-marker al-compare-list-marker--pos" aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section id="buy" className="page-section page-section--clip">
        <div className="page-block">
          <span className="page-badge">{t("accountants.buy.badge", "COMENZAR AHORA")}</span>
          <h2 className="al-section-title">
            {t("accountants.buy.title.line1", "Obten Tu Sitio Web")}
            <br />
            <span className="accent-underline">
              {t("accountants.buy.title.line2", "Listo para Atraer Clientes")}
            </span>
          </h2>
          <p className="page-lede">
            {t("accountants.buy.desc", "En menos de una semana tendrás tu sitio web profesional publicado, optimizado para atraer clientes y preparado para campañas de marketing digital. Sin complicaciones, sin letras chicas.")}
          </p>
        </div>

        <div className="al-buy-grid">
          <motion.div
            className="al-pack al-pack--basic"
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="al-pack__overlay" aria-hidden="true" />
            <div className="al-pack__glow-big" aria-hidden="true" />
            <div className="al-pack__glow-small" aria-hidden="true" />
            <div className="al-pack__glass">
              <span className="al-pack__badge">{t("accountants.pack1.badge", "BÁSICO")}</span>
              <h3 className="al-pack__title">
                {t("accountants.pack1.title", "Sitio Web Profesional")}
              </h3>
              <p className="al-pack__desc">
                {t("accountants.pack1.desc", "Todo lo esencial para tu presencia online.")}
              </p>
              <div className="al-pack__divider" />
              <ul className="al-pack__features">
                {[
                  t("accountants.buy.includes.1", "Diseño web profesional personalizado"),
                  t("accountants.buy.includes.2", "Optimizado para SEO desde el día uno"),
                  t("accountants.buy.includes.3", "Adaptado a mobile y todos los dispositivos"),
                  t("accountants.buy.includes.4", "Listo para Google Ads y redes sociales"),
                  t("accountants.buy.includes.5", "Soporte y acompañamiento continuo"),
                ].map((item) => (
                  <li key={item} className="al-pack__feature">
                    <span className="al-pack__feature-check" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="al-pack__price-row">
                <span className="al-pack__price">$100</span>
                <span className="al-pack__price-unit">USD</span>
              </div>
              <a
                className="al-pack__cta"
                href="https://buy.stripe.com/fZu4gz3Ac6DD1bRd5iaR203"
                data-umami-event="cta-comprar-stripe-basic"
              >
                {t("accountants.buy.cta", "Obtener Mi Sitio Web Ahora")}
              </a>
              <p className="al-pack__guarantee">
                {t("accountants.buy.guarantee", "Pago 100% seguro · Resultados en menos de 7 días")}
              </p>
            </div>
          </motion.div>

          <motion.div
            className="al-pack al-pack--pro"
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="al-pack__overlay" aria-hidden="true" />
            <div className="al-pack__glow-big" aria-hidden="true" />
            <div className="al-pack__glow-small" aria-hidden="true" />
            <div className="al-pack__glass">
              <span className="al-pack__badge al-pack__badge--pro">{t("accountants.pack2.badge", "AVANZADO · MÁS POPULAR")}</span>
              <h3 className="al-pack__title">
                {t("accountants.pack2.title", "Web + Fanpage + Campaña")}
              </h3>
              <p className="al-pack__desc">
                {t("accountants.pack2.desc", "Presencia digital completa con publicidad incluida.")}
              </p>
              <div className="al-pack__divider" />
              <ul className="al-pack__features">
                {[
                  t("accountants.pack2.includes.1", "Diseño web profesional personalizado"),
                  t("accountants.pack2.includes.2", "Creación y optimización de Fanpage de Facebook"),
                  t("accountants.pack2.includes.3", "Configuración de 1 campaña publicitaria"),
                  t("accountants.pack2.includes.4", "Acompañamiento en cada etapa del proceso"),
                  t("accountants.pack2.includes.5", "Soporte continuo"),
                ].map((item) => (
                  <li key={item} className="al-pack__feature">
                    <span className="al-pack__feature-check" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="al-pack__price-row">
                <span className="al-pack__price">$150</span>
                <span className="al-pack__price-unit">USD</span>
              </div>
              <a
                className="al-pack__cta"
                href="https://buy.stripe.com/14AfZh9YA3rraMraXaaR204"
                data-umami-event="cta-comprar-stripe-pro"
              >
                {t("accountants.pack2.cta", "Obtener Mi Plan Avanzado")}
              </a>
              <p className="al-pack__guarantee">
                {t("accountants.pack2.guarantee", "Pago 100% seguro · Resultados en menos de 7 días")}
              </p>
            </div>
          </motion.div>

          <motion.div
            className="al-perks"
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="al-perk">
              <div className="al-perk__icon">
                <MessageCircle size={20} color="#fff" />
              </div>
              <div>
                <h3 className="al-perk__title">{t("accountants.buy.perk1.title", "Consultoría Inicial Sin Costo")}</h3>
                <p className="al-perk__text">{t("accountants.buy.perk1.text", "Conversamos sobre tu práctica y definimos juntos la mejor estrategia para tu web.")}</p>
              </div>
            </div>
            <div className="al-perk">
              <div className="al-perk__icon">
                <Palette size={20} color="#fff" />
              </div>
              <div>
                <h3 className="al-perk__title">{t("accountants.buy.perk2.title", "Diseño que Refleja Tu Marca")}</h3>
                <p className="al-perk__text">{t("accountants.buy.perk2.text", "Creamos una identidad visual profesional alineada a tu imagen como contador.")}</p>
              </div>
            </div>
            <div className="al-perk">
              <div className="al-perk__icon">
                <TrendingUp size={20} color="#fff" />
              </div>
              <div>
                <h3 className="al-perk__title">{t("accountants.buy.perk3.title", "Preparado para Crecer")}</h3>
                <p className="al-perk__text">{t("accountants.buy.perk3.text", "Tu sitio listo para escalar con marketing digital cuando vos decidas.")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="page-section page-section--clip">
        <div className="page-block">
          <span className="page-badge">{t("accountants.contact.badge", "PRIMER ASESORAMIENTO GRATIS")}</span>
          <h2 className="al-section-title">
            {t("accountants.contact.title", "Empecemos a Construir Tu Presencia Online")}
          </h2>
          <p className="page-lede">
            {t("accountants.contact.desc", "Dejanos tus datos y te contactamos para una asesoría sin costo. Traé tus ideas o nosotros te proponemos diseños y posibilidades. Sin compromiso, solo oportunidades.")}
          </p>
        </div>

        <div className="al-contact-row">
          {sent ? (
            <motion.div
              className="al-sent"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" as const }}
            >
              <div className="al-sent__icon" aria-hidden="true">✓</div>
              <h3 className="al-sent__title">
                {t("accountants.form.sent.title", "¡Gracias por tu interés!")}
              </h3>
              <p className="al-sent__text">
                {t("accountants.form.sent.text", "Hemos recibido tu solicitud. Te contactaremos en las próximas 24 horas para coordinar tu asesoría gratuita.")}
              </p>
            </motion.div>
          ) : (
            <motion.form
              className="al-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" as const }}
            >
              <input className="al-honeypot" type="text" name="_honey" tabIndex={-1} autoComplete="off" />

              <div className="al-form-group">
                <label htmlFor="al-name" className="al-form-label">{t("accountants.form.name", "Nombre completo")}</label>
                <input
                  className="al-form-input"
                  type="text"
                  id="al-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  placeholder={t("accountants.form.name.placeholder", "Tu nombre y apellido")}
                />
              </div>
              <div className="al-form-group">
                <label htmlFor="al-email" className="al-form-label">{t("accountants.form.email", "Email")}</label>
                <input
                  className="al-form-input"
                  type="email"
                  id="al-email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  maxLength={254}
                  placeholder={t("accountants.form.email.placeholder", "Tu correo electrónico")}
                />
              </div>
              <div className="al-form-group">
                <label htmlFor="al-phone" className="al-form-label">{t("accountants.form.phone", "Teléfono (opcional)")}</label>
                <input
                  className="al-form-input"
                  type="tel"
                  id="al-phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength={20}
                  placeholder={t("accountants.form.phone.placeholder", "Tu número de contacto")}
                />
              </div>
              <div className="al-form-group">
                <label htmlFor="al-message" className="al-form-label">{t("accountants.form.message", "Contanos sobre tu práctica")}</label>
                <textarea
                  className="al-form-textarea"
                  id="al-message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  required
                  maxLength={2000}
                  placeholder={t("accountants.form.message.placeholder", "¿Qué servicios ofrecés? ¿Tenés alguna idea para tu web?")}
                />
              </div>

              {formError && (
                <p className="al-form-error">{formError}</p>
              )}

              <button
                type="submit"
                className="al-form-submit"
                disabled={submitting}
                data-umami-event="cta-formulario-contacto"
              >
                {submitting ? "Enviando..." : t("accountants.form.submit", "Quiero Mi Asesoría Gratuita")}
              </button>
            </motion.form>
          )}

          <div className="al-contact-side">
            <div className="al-contact-side__overlay" aria-hidden="true" />
            <div className="al-contact-side__glow-big" aria-hidden="true" />
            <div className="al-contact-side__glow-small" aria-hidden="true" />
            <div className="al-contact-side__glass">
              <p className="al-contact-side__title">
                {t("accountants.form.side.title", "¿Por qué elegirnos?")}
              </p>
              <ul className="al-contact-side__list">
                {[
                  t("accountants.form.side.1", "Primer asesoramiento sin costo"),
                  t("accountants.form.side.2", "Diseños personalizados o traé el tuyo"),
                  t("accountants.form.side.3", "Te acompañamos en cada decisión"),
                  t("accountants.form.side.4", "Web lista para marketing y publicidad"),
                ].map((item) => (
                  <li key={item} className="al-contact-side__item">
                    <span className="al-contact-side__check" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
