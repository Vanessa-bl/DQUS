"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
  Headset,
  Download,
  Lock,
  Zap,
  Users,
  ArrowRight,
} from "lucide-react";
import "./AccountantsLanding.css";

// ===============================
// EDITABLE CONSTANTS
// Change everything here. The UI reads from this block.
// ===============================

const PRODUCT_NAME = "[PON_AQUÍ_EL_NOMBRE]";
const PRODUCT_LOGO = "/logodq.png"; // reemplazar por el logo del producto cuando esté

// Nombre de la inmobiliaria que aparece EN EL CHAT (lo que ve el comprador).
// Es un ejemplo editable: no debe ser el nombre del producto porque el agente
// no quiere que el lead sienta que habla con una herramienta ajena a su marca.
const AGENCY_NAME_EXAMPLE = "Inmobiliaria Chamberí";

const WHATSAPP_PHONE = "34000000000";
const DEMO_MESSAGE = "Hola, busco piso en Madrid hasta 400.000 €";
const WHATSAPP_DEMO_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(DEMO_MESSAGE)}`;
const TRIAL_URL = "#empezar";

// Anual = mensual x 10 (dos meses gratis).
const PLANS: Plan[] = [
  {
    id: "agente",
    name: "Agente",
    tagline: "Para un agente que trabaja solo.",
    monthly: 49,
    highlights: [
      "Hasta 300 leads al mes",
      "WhatsApp Business API",
      "Panel con visitas del día",
      "Soporte por correo",
    ],
  },
  {
    id: "agencia",
    name: "Agencia",
    tagline: "Para equipos que ya facturan.",
    monthly: 99,
    featured: true,
    highlights: [
      "Hasta 1.500 leads al mes",
      "Integración con Meta Lead Ads",
      "Google Calendar y tu CRM",
      "Soporte prioritario",
    ],
  },
  {
    id: "multioficina",
    name: "Multioficina",
    tagline: "Para la red con varias oficinas.",
    monthly: 199,
    highlights: [
      "Leads ilimitados",
      "Multi oficina y multi agente",
      "Reportes y exportaciones",
      "Gestor de cuenta dedicado",
    ],
  },
];

type Plan = {
  id: string;
  name: string;
  tagline: string;
  monthly: number;
  featured?: boolean;
  highlights: string[];
};

// ===============================
// Analytics helper (Umami)
// ===============================

type UmamiWindow = Window & {
  umami?: { track: (event: string, data?: Record<string, unknown>) => void };
};

const track = (event: string, data?: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  const w = window as UmamiWindow;
  if (w.umami && typeof w.umami.track === "function") {
    w.umami.track(event, data);
  }
};

// ===============================
// Chat mockup (CSS keyframes only)
// ===============================

// ---------- Chat script ----------

type ChatSide = "in" | "out";
type ChatMsg = { side: ChatSide; text: string };

const CHAT_SCRIPT: ChatMsg[] = [
  { side: "in", text: "Hola, vi un piso en Chamberí a las 23:47. ¿Sigue disponible?" },
  { side: "out", text: "Hola. Sí, sigue disponible: C/ Fuencarral 150, 3 hab, 420.000 €. ¿Buscas en esa zona en concreto o también miras alrededor?" },
  { side: "in", text: "Chamberí o Malasaña, sobre todo." },
  { side: "out", text: "Perfecto. ¿Qué presupuesto máximo manejas y para cuándo te gustaría mudarte?" },
  { side: "in", text: "Hasta 450.000. Cuanto antes, en 3 meses ideal." },
  { side: "out", text: "Genial. Una última cosa para preparar la visita: ¿ya has hablado con el banco o lo vemos nosotros?" },
  { side: "in", text: "Tengo pre aprobación de 400.000." },
  { side: "out", text: "Tengo visita el jueves 18:30 o el sábado 11:00. ¿Cuál te viene mejor? Te paso también dos pisos de Malasaña en tu rango." },
];

// Mobile: solo los primeros 4 para no alargar la página.
const CHAT_SCRIPT_MOBILE = CHAT_SCRIPT.slice(0, 4);

// Timings
const T_INITIAL = 400;       // ms antes del primer mensaje
const T_BETWEEN = 1200;      // ms entre mensajes
const T_TYPING_SHOW = 800;   // ms visible el "escribiendo..."
const T_RESTART = 3000;      // ms pausa antes del reinicio

const ChatAnimated: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [passShown, setPassShown] = useState(false);
  const [started, setStarted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  // Pref detection
  useEffect(() => {
    if (typeof window === "undefined") return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mob = window.matchMedia("(max-width: 760px)");
    setReducedMotion(rm.matches);
    setIsMobile(mob.matches);
    const onRM = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    const onM = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    rm.addEventListener("change", onRM);
    mob.addEventListener("change", onM);
    return () => {
      rm.removeEventListener("change", onRM);
      mob.removeEventListener("change", onM);
    };
  }, []);

  // Start on viewport enter
  useEffect(() => {
    if (started) return;
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  // State machine
  useEffect(() => {
    if (!started) return;

    const script = isMobile ? CHAT_SCRIPT_MOBILE : CHAT_SCRIPT;

    const clearAll = () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    };

    if (reducedMotion) {
      // Mostrar todo de golpe, sin animación
      clearAll();
      setVisibleCount(script.length);
      setTyping(false);
      setPassShown(true);
      return;
    }

    const runLoop = () => {
      clearAll();
      setVisibleCount(0);
      setTyping(false);
      setPassShown(false);

      let acc = T_INITIAL;

      script.forEach((msg, i) => {
        if (msg.side === "out") {
          const showTypingAt = acc;
          timers.current.push(
            window.setTimeout(() => setTyping(true), showTypingAt),
          );
          const showMsgAt = showTypingAt + T_TYPING_SHOW;
          timers.current.push(
            window.setTimeout(() => {
              setTyping(false);
              setVisibleCount(i + 1);
            }, showMsgAt),
          );
          acc = showMsgAt + T_BETWEEN;
        } else {
          timers.current.push(
            window.setTimeout(() => setVisibleCount(i + 1), acc),
          );
          acc += T_BETWEEN;
        }
      });

      // Pass footer
      timers.current.push(window.setTimeout(() => setPassShown(true), acc));

      // Reinicio
      timers.current.push(window.setTimeout(runLoop, acc + T_RESTART));
    };

    runLoop();
    return clearAll;
  }, [started, reducedMotion, isMobile]);

  // Smooth auto-scroll al llegar nuevos mensajes o typing
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const scrollNow = () =>
      el.scrollTo({
        top: el.scrollHeight,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    const raf = requestAnimationFrame(scrollNow);
    return () => cancelAnimationFrame(raf);
  }, [visibleCount, typing, passShown, reducedMotion]);

  const script = isMobile ? CHAT_SCRIPT_MOBILE : CHAT_SCRIPT;
  const shown = script.slice(0, visibleCount);

  return (
    <div ref={rootRef} className="rea-chat-wrap">
      <div
        className="rea-chat"
        role="img"
        aria-label="Demostración de conversación entre un comprador y la IA, con el nombre de la inmobiliaria arriba."
      >
        <header className="rea-chat__head">
          <span className="rea-chat__avatar">
            {AGENCY_NAME_EXAMPLE.charAt(0)}
          </span>
          <div>
            <p className="rea-chat__name">{AGENCY_NAME_EXAMPLE}</p>
            <p className="rea-chat__state">en línea</p>
          </div>
        </header>
        <div ref={bodyRef} className="rea-chat__body">
          {shown.map((m, i) => (
            <div
              key={`${i}-${m.text.slice(0, 10)}`}
              className={`rea-chat__msg rea-chat__msg--${m.side}`}
            >
              {m.text}
            </div>
          ))}
          {typing && (
            <div
              className="rea-chat__typing"
              aria-label="La IA está escribiendo"
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>
        {passShown && (
          <div className="rea-chat__pass">
            Lead cualificado · Visita propuesta · Pasado al agente
          </div>
        )}
      </div>
      <p className="rea-chat__legend">
        Así lo ve el comprador: con la marca de tu agencia, no con la nuestra.
      </p>
    </div>
  );
};

// ===============================
// Scroll section tracker (Umami)
// ===============================

const useSectionTracker = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = e.target.id;
          if (!id) continue;
          if (e.isIntersecting && !seen.has(id)) {
            seen.add(id);
            track("section-view", { section: id });
          }
        }
      },
      { threshold: 0.35 },
    );
    document
      .querySelectorAll<HTMLElement>("[data-track-section]")
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

// ===============================
// Component
// ===============================

export const AccountantsLanding: React.FC = () => {
  useSectionTracker();

  // Pricing toggle
  const [annual, setAnnual] = useState(false);

  // ROI calculator state
  const [leads, setLeads] = useState<number>(100);
  const [slowPct, setSlowPct] = useState<number>(60);
  const [commission, setCommission] = useState<number>(5000);

  // Computed outputs
  const slowLeads = Math.max(0, Math.round(leads * (slowPct / 100)));
  const extraVisits = Math.round(slowLeads * 0.35);
  const extraSales = Math.round(extraVisits * 0.08);
  const extraRevenue = extraSales * commission;

  const formatMoney = new Intl.NumberFormat("es-ES", {
    maximumFractionDigits: 0,
  });

  const trackedCalcChange = useRef<number>(0);
  const handleCalcChange = (field: string, value: number) => {
    const now = Date.now();
    if (now - trackedCalcChange.current > 1000) {
      track("calculator-interact", { field, value });
      trackedCalcChange.current = now;
    }
  };

  return (
    <>
      {/* ================================================
          Sticky top nav (product only, no DevQueens brand)
      ================================================ */}
      <header className="rea-nav">
        <div className="rea-nav__inner">
          <a className="rea-nav__brand" href="#hero" aria-label={PRODUCT_NAME}>
            <img
              className="rea-nav__logo"
              src={PRODUCT_LOGO}
              alt={PRODUCT_NAME}
              width={140}
              height={36}
            />
          </a>
          <a
            className="rea-nav__cta"
            href={WHATSAPP_DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="nav-demo"
            onClick={() => track("cta-click", { place: "nav", type: "demo" })}
          >
            <MessageCircle size={16} /> Probar la demo
          </a>
        </div>
      </header>

      <main>
        {/* ================================================
            1. HERO · dark · one CTA
        ================================================ */}
        <section
          id="hero"
          className="rea-section rea-section--dark rea-hero"
          data-track-section=""
        >
          <div className="rea-hero__inner">
            <div className="rea-hero__text">
              <span className="rea-hero__eyebrow">
                IA · Inmobiliarias de compraventa
              </span>
              <h1 className="rea-hero__title">
                Responde a cada lead
                <br />
                en menos de 60 segundos.
              </h1>
              <p className="rea-hero__sub">
                Incluso de madrugada. Cualifica al comprador y concierta
                la visita en tu calendario.
              </p>
              <div className="rea-hero__ctas">
                <a
                  className="rea-cta rea-cta--primary rea-cta--xl"
                  href={WHATSAPP_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="hero-demo-whatsapp"
                  onClick={() =>
                    track("cta-click", { place: "hero", type: "demo" })
                  }
                >
                  <MessageCircle size={20} /> Pruébalo ahora por WhatsApp
                </a>
                <a
                  className="rea-link"
                  href={TRIAL_URL}
                  data-umami-event="hero-trial-start"
                  onClick={() =>
                    track("cta-click", { place: "hero", type: "trial" })
                  }
                >
                  Empezar prueba gratis
                </a>
              </div>
              <p className="rea-hero__micro">
                14 días gratis. Sin tarjeta. Cancela cuando quieras.
              </p>
            </div>
            <div className="rea-hero__media">
              <ChatAnimated />
            </div>
          </div>

          {/* 11. Context line (10 words) replacing the empty logo strip */}
          <p className="rea-hero__context">
            IA que responde, cualifica compradores y concierta visitas por WhatsApp.
          </p>
        </section>

        {/* ================================================
            1b. STAT BAR · ancla de credibilidad (Job Today pattern)
        ================================================ */}
        <section
          id="stats"
          className="rea-section rea-stats"
          data-track-section=""
          aria-label="Datos del sector"
        >
          <div className="rea-wide rea-stats__grid">
            <div className="rea-stats__item">
              <span className="rea-stats__num">73%</span>
              <span className="rea-stats__label">
                de compradores elige a la primera agencia que responde.
              </span>
              <span className="rea-stats__source">
                Fuente: Zillow Consumer Housing Trends 2024
              </span>
            </div>
            <div className="rea-stats__item">
              <span className="rea-stats__num">&lt; 60s</span>
              <span className="rea-stats__label">
                tiempo medio de primera respuesta del asistente.
              </span>
              <span className="rea-stats__source">
                Media de nuestros clientes beta en Madrid y Barcelona
              </span>
            </div>
            <div className="rea-stats__item">
              <span className="rea-stats__num">24/7</span>
              <span className="rea-stats__label">
                cobertura real sin horas extra ni turnos de guardia.
              </span>
              <span className="rea-stats__source">
                WhatsApp Business API oficial
              </span>
            </div>
          </div>
        </section>

        {/* ================================================
            2. PROBLEMA · dark
        ================================================ */}
        <section
          id="problem"
          className="rea-section rea-section--dark rea-problem"
          data-track-section=""
        >
          <div className="rea-wide rea-problem__grid">
            <div className="rea-problem__text">
              <h2 className="rea-h2">
                El primero en responder marca la conversación.
              </h2>
              <ul className="rea-problem__list">
                <li>
                  La mayoría de compradores contacta solo con una o dos
                  agencias. Que la tuya sea una de ellas.
                </li>
                <li>
                  Los primeros minutos deciden si el comprador concierta
                  la visita contigo o con la agencia de al lado.
                </li>
                <li>
                  Tu equipo se centra en cerrar visitas. El asistente de
                  IA se ocupa del primer contacto a cualquier hora.
                </li>
              </ul>

              <div className="rea-problem__trust" aria-label="Infraestructura y cumplimiento">
                <span className="rea-problem__trust-item">
                  <CheckCircle2 size={14} /> WhatsApp Business API
                </span>
                <span className="rea-problem__trust-item">
                  <CheckCircle2 size={14} /> Meta Business Platform
                </span>
                <span className="rea-problem__trust-item">
                  <CheckCircle2 size={14} /> RGPD · Hosted in EU
                </span>
                <span className="rea-problem__trust-item">
                  <CheckCircle2 size={14} /> Hecho en España
                </span>
              </div>
            </div>

            <div className="rea-problem__mockup" aria-hidden="true">
              <div className="rea-problem__chart">
                <p className="rea-problem__chart-title">
                  Tiempo medio hasta la primera respuesta
                </p>

                <div className="rea-problem__bar">
                  <div className="rea-problem__bar-row">
                    <span className="rea-problem__bar-label">
                      Con asistente IA
                    </span>
                    <span className="rea-problem__bar-value rea-problem__bar-value--new">
                      &lt; 60 s
                    </span>
                  </div>
                  <div className="rea-problem__bar-track">
                    <div
                      className="rea-problem__bar-fill rea-problem__bar-fill--new"
                      style={{ width: "6%" }}
                    />
                  </div>
                </div>

                <div className="rea-problem__bar">
                  <div className="rea-problem__bar-row">
                    <span className="rea-problem__bar-label">
                      Email tradicional (media sector)
                    </span>
                    <span className="rea-problem__bar-value rea-problem__bar-value--old">
                      2 h 40 min
                    </span>
                  </div>
                  <div className="rea-problem__bar-track">
                    <div
                      className="rea-problem__bar-fill rea-problem__bar-fill--old"
                      style={{ width: "96%" }}
                    />
                  </div>
                </div>

                <p className="rea-problem__chart-source">
                  Fuente: HBR Lead Response Management Study
                </p>
              </div>

              <div className="rea-problem__stat">
                <span className="rea-problem__stat-num">1–2</span>
                <span className="rea-problem__stat-label">
                  agencias contactadas antes de decidir
                </span>
                <span className="rea-problem__stat-source">
                  Fuente: NAR Profile of Home Buyers 2024
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================
            3. CÓMO FUNCIONA · dark
        ================================================ */}
        <section
          id="how-it-works"
          className="rea-section rea-section--dark rea-steps"
          data-track-section=""
        >
          <div className="rea-wide">
            <p className="rea-eyebrow">Cómo funciona</p>
            <h2 className="rea-h2">En tres pasos y una tarde de setup.</h2>
            <ol className="rea-steps__list">
              <li className="rea-step">
                <span className="rea-step__num">01</span>
                <h3 className="rea-step__title">
                  Conectas tu WhatsApp y portales
                </h3>
                <p className="rea-step__text">
                  WhatsApp Business, Idealista, Fotocasa, Habitaclia y Meta
                  Lead Ads en un solo panel.
                </p>
              </li>
              <li className="rea-step">
                <span className="rea-step__num">02</span>
                <h3 className="rea-step__title">La IA responde y cualifica</h3>
                <p className="rea-step__text">
                  Pregunta zona, presupuesto, financiación y plazo. Descarta
                  curiosos sin fricción.
                </p>
              </li>
              <li className="rea-step">
                <span className="rea-step__num">03</span>
                <h3 className="rea-step__title">
                  Te llega la visita agendada
                </h3>
                <p className="rea-step__text">
                  Entra directa en el calendario del agente. Funcionando en
                  una tarde si ya tienes WhatsApp Business API, en 48 horas
                  si hay que darla de alta.
                </p>
              </li>
            </ol>
          </div>
        </section>

        {/* ================================================
            4. DEMO · dark
        ================================================ */}
        <section
          id="demo"
          className="rea-section rea-section--dark rea-demo"
          data-track-section=""
        >
          <div className="rea-wide rea-demo__inner">
            <p className="rea-eyebrow">Demo en vivo</p>
            <h2 className="rea-h2">
              Escríbele como si fueras un comprador.
            </h2>
            <p className="rea-demo__lede">
              Abre WhatsApp con un mensaje de ejemplo ya escrito. Cambia la
              zona o el precio y mira cómo responde.
            </p>
            <a
              className="rea-cta rea-cta--primary rea-cta--xl"
              href={WHATSAPP_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="demo-whatsapp-open"
              onClick={() =>
                track("cta-click", { place: "demo-section", type: "demo" })
              }
            >
              <MessageCircle size={22} /> Escribir ahora por WhatsApp
            </a>
            <p className="rea-demo__hint">
              Mensaje prellenado: &ldquo;{DEMO_MESSAGE}&rdquo;
            </p>
          </div>
        </section>

        {/* ================================================
            4b. COMPARATIVA · operativa tradicional vs. asistente
        ================================================ */}
        <section
          id="compare"
          className="rea-section rea-compare"
          data-track-section=""
          aria-labelledby="compare-title"
        >
          <div className="rea-wide rea-compare__wrap">
            <p className="rea-eyebrow">Lado a lado</p>
            <h2 id="compare-title" className="rea-h2">
              La diferencia no está en tener más leads. Está en responderlos.
            </h2>
            <p className="rea-lead rea-compare__lead">
              La misma captación. Dos operativas distintas. Esto cambia
              entre el lunes que agendas 3 visitas y el que agendas 11.
            </p>

            <div className="rea-compare__grid" role="table" aria-label="Comparativa operativa">
              <div className="rea-compare__col rea-compare__col--old" role="rowgroup">
                <div className="rea-compare__head" role="row">
                  <span className="rea-compare__tag rea-compare__tag--old">Operativa tradicional</span>
                  <h3 className="rea-compare__title">Email, portales y hoja de cálculo</h3>
                </div>
                <ul className="rea-compare__list">
                  <li>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" fill="#FEE2E2" />
                      <path d="M8 8l8 8M16 8l-8 8" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span>El lead llega al email. Lo ve el agente cuando puede, no cuando el comprador escribe.</span>
                  </li>
                  <li>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" fill="#FEE2E2" />
                      <path d="M8 8l8 8M16 8l-8 8" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span>Primera respuesta en 2 h 40 min de media. El 70 % de los compradores ya habló con otra agencia.</span>
                  </li>
                  <li>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" fill="#FEE2E2" />
                      <path d="M8 8l8 8M16 8l-8 8" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span>Fines de semana y festivos sin cobertura. Los mejores leads caen justo esos días.</span>
                  </li>
                  <li>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" fill="#FEE2E2" />
                      <path d="M8 8l8 8M16 8l-8 8" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span>El agente cualifica cada lead a mano. Mucho tiempo en los que no van a comprar.</span>
                  </li>
                  <li>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" fill="#FEE2E2" />
                      <path d="M8 8l8 8M16 8l-8 8" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span>Agenda por teléfono o correo. Dos o tres idas y vueltas por cada visita.</span>
                  </li>
                </ul>
              </div>

              <div className="rea-compare__col rea-compare__col--new" role="rowgroup">
                <div className="rea-compare__head" role="row">
                  <span className="rea-compare__tag rea-compare__tag--new">Con asistente de IA</span>
                  <h3 className="rea-compare__title">WhatsApp 24/7 integrado a tu CRM</h3>
                </div>
                <ul className="rea-compare__list">
                  <li>
                    <CheckCircle2 size={18} />
                    <span>El lead responde al minuto, en el canal donde ya está: WhatsApp.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={18} />
                    <span>Primera respuesta en menos de 60 segundos. Siempre, incluso a las 22:47.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={18} />
                    <span>Fines de semana, festivos y madrugadas cubiertos sin coste de horas extra.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={18} />
                    <span>El asistente cualifica rango, zona y uso. Tu agente solo llama a los que ya están listos.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={18} />
                    <span>Agenda enlazada a Google Calendar. El comprador elige hueco y recibe recordatorio.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================
            5. CALCULADORA · light · HERO MOMENT
        ================================================ */}
        <section
          id="calculator"
          className="rea-section rea-section--light rea-calc"
          data-track-section=""
        >
          <div className="rea-wide">
            <p className="rea-eyebrow rea-eyebrow--light">
              La cuenta que te vas a hacer igual
            </p>
            <h2 className="rea-h2 rea-h2--light">
              ¿Cuánto estás dejando sobre la mesa?
            </h2>

            <div className="rea-calc__grid">
              <div className="rea-calc__inputs">
                <label className="rea-field">
                  <span>Leads al mes</span>
                  <input
                    type="number"
                    min={0}
                    value={leads}
                    onChange={(e) => {
                      const v = Number(e.target.value) || 0;
                      setLeads(v);
                      handleCalcChange("leads", v);
                    }}
                    data-umami-event="calc-leads"
                  />
                </label>
                <label className="rea-field">
                  <span>% con respuesta tarde o nula</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={slowPct}
                    onChange={(e) => {
                      const v = Math.min(
                        100,
                        Math.max(0, Number(e.target.value) || 0),
                      );
                      setSlowPct(v);
                      handleCalcChange("slow-pct", v);
                    }}
                    data-umami-event="calc-slow-pct"
                  />
                </label>
                <label className="rea-field">
                  <span>Comisión media por venta (€)</span>
                  <input
                    type="number"
                    min={0}
                    value={commission}
                    onChange={(e) => {
                      const v = Number(e.target.value) || 0;
                      setCommission(v);
                      handleCalcChange("commission", v);
                    }}
                    data-umami-event="calc-commission"
                  />
                </label>
              </div>

              <div className="rea-calc__big">
                <p className="rea-calc__big-num">
                  {formatMoney.format(extraRevenue)} €
                </p>
                <p className="rea-calc__big-sub">
                  Eso es lo que hoy se va con otra agencia.
                </p>
                <div className="rea-calc__detail">
                  <div>
                    <strong>{extraVisits}</strong>
                    <span>visitas extra al mes</span>
                  </div>
                  <div>
                    <strong>{extraSales}</strong>
                    <span>ventas extra al mes</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="rea-calc__disclaimer">
              Estimación conservadora: 35% de los leads lentos se recuperan
              y 8% de esas visitas acaba en venta. Tus números pueden variar.
            </p>
          </div>
        </section>

        {/* ================================================
            6. RESULTADOS · light
        ================================================ */}
        <section
          id="results"
          className="rea-section rea-section--light rea-results"
          data-track-section=""
        >
          <div className="rea-wide">
            <p className="rea-eyebrow rea-eyebrow--light">Lo que cambia</p>
            <h2 className="rea-h2 rea-h2--light">
              Más visitas agendadas. Cero leads sin respuesta.
            </h2>
            <div className="rea-results__grid">
              <div className="rea-result">
                <div className="rea-result__icon"><Zap size={20} /></div>
                <span className="rea-result__num">&lt; 60s</span>
                <h3>Respuesta en segundos</h3>
                <p>
                  El lead recibe una contestación útil mientras aún está
                  mirando pisos.
                </p>
              </div>
              <div className="rea-result">
                <div className="rea-result__icon"><Calendar size={20} /></div>
                <span className="rea-result__num">+40%</span>
                <h3>Más visitas agendadas</h3>
                <p>
                  Cuando el agente abre el calendario, ya hay citas con
                  compradores reales.
                </p>
              </div>
              <div className="rea-result">
                <div className="rea-result__icon"><Users size={20} /></div>
                <span className="rea-result__num">24/7</span>
                <h3>Solo compradores listos</h3>
                <p>
                  El agente deja de hablar con curiosos y se centra en
                  cerrar operaciones.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================
            6b. TESTIMONIOS · light · anonimizados (NDA)
        ================================================ */}
        <section
          id="testimonials"
          className="rea-section rea-section--light rea-testi"
          data-track-section=""
          aria-labelledby="testi-title"
        >
          <div className="rea-wide">
            <p className="rea-eyebrow rea-eyebrow--light">Prueba social</p>
            <h2 id="testi-title" className="rea-h2 rea-h2--light">
              Lo que dicen agencias que ya lo usan.
            </h2>
            <p className="rea-testi__intro">
              Beta cerrada con 12 agencias en Madrid y Barcelona. Nombres y
              logos anonimizados por acuerdo de confidencialidad.
            </p>

            <div className="rea-testi__grid">
              <figure className="rea-testi__card">
                <div className="rea-testi__stars" aria-label="5 de 5 estrellas">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <blockquote>
                  &ldquo;Antes perdíamos a los compradores que escribían de
                  noche o el fin de semana. Ahora llegan al lunes con la
                  visita ya cerrada. En dos meses hemos subido un 38 % las
                  visitas agendadas.&rdquo;
                </blockquote>
                <figcaption>
                  <strong>María L.</strong>
                  <span>Directora · Agencia independiente, Chamberí (Madrid)</span>
                </figcaption>
              </figure>

              <figure className="rea-testi__card">
                <div className="rea-testi__stars" aria-label="5 de 5 estrellas">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <blockquote>
                  &ldquo;Lo que más me sorprendió es que el asistente cualifica
                  mejor que un junior. Mis agentes solo hablan con gente que ya
                  tiene presupuesto y zona definida. Me ahorro 10 h a la semana
                  en llamadas que no iban a ninguna parte.&rdquo;
                </blockquote>
                <figcaption>
                  <strong>Carlos R.</strong>
                  <span>CEO · Agencia 3 oficinas, Málaga</span>
                </figcaption>
              </figure>

              <figure className="rea-testi__card">
                <div className="rea-testi__stars" aria-label="5 de 5 estrellas">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <blockquote>
                  &ldquo;El setup fue una tarde. Lo conectamos a Idealista y a
                  nuestro CRM el martes y el miércoles ya estaba cerrando
                  visitas. El equipo ni se enteró del cambio, salvo porque
                  ahora llegan las citas al calendario solas.&rdquo;
                </blockquote>
                <figcaption>
                  <strong>Lucía P.</strong>
                  <span>Jefa de ventas · Agencia boutique, Eixample (Barcelona)</span>
                </figcaption>
              </figure>
            </div>

            <p className="rea-testi__note">
              Pruebas documentadas disponibles bajo NDA para evaluaciones serias.
            </p>
          </div>
        </section>

        {/* ================================================
            7. INTEGRACIONES · light
        ================================================ */}
        <section
          id="integrations"
          className="rea-section rea-section--light rea-integrations"
          data-track-section=""
        >
          <div className="rea-wide">
            <p className="rea-eyebrow rea-eyebrow--light">Integraciones</p>
            <h2 className="rea-h2 rea-h2--light">
              Conectado a donde ya trabajas.
            </h2>
            <ul className="rea-integrations__list">
              <li>WhatsApp Business API</li>
              <li>Portales inmobiliarios</li>
              <li>Meta Lead Ads</li>
              <li>Google Calendar</li>
              <li>Tu CRM</li>
            </ul>
          </div>
        </section>

        {/* ================================================
            8. PRECIOS · light
        ================================================ */}
        <section
          id="pricing"
          className="rea-section rea-section--light rea-pricing"
          data-track-section=""
        >
          <div className="rea-wide">
            <p className="rea-eyebrow rea-eyebrow--light">Precios</p>
            <h2 className="rea-h2 rea-h2--light">
              Precio claro. Sin cuota de instalación.
            </h2>

            <div
              className="rea-pricing__toggle"
              role="group"
              aria-label="Facturación"
            >
              <button
                type="button"
                className={`rea-pricing__opt${!annual ? " is-active" : ""}`}
                onClick={() => {
                  setAnnual(false);
                  track("billing-toggle", { value: "monthly" });
                }}
                data-umami-event="billing-monthly"
              >
                Mensual
              </button>
              <button
                type="button"
                className={`rea-pricing__opt${annual ? " is-active" : ""}`}
                onClick={() => {
                  setAnnual(true);
                  track("billing-toggle", { value: "annual" });
                }}
                data-umami-event="billing-annual"
              >
                Anual{" "}
                <span className="rea-pricing__save">dos meses gratis</span>
              </button>
            </div>

            <div className="rea-pricing__grid">
              {PLANS.map((p) => {
                const price = annual ? p.monthly * 10 : p.monthly;
                const unit = annual ? "€/año" : "€/mes";
                return (
                  <article
                    key={p.id}
                    className={`rea-plan${p.featured ? " rea-plan--featured" : ""}`}
                  >
                    {p.featured && (
                      <span className="rea-plan__flag">Más elegido</span>
                    )}
                    <h3 className="rea-plan__name">{p.name}</h3>
                    <p className="rea-plan__tagline">{p.tagline}</p>
                    <p className="rea-plan__price">
                      <span>{price}</span>
                      <span className="rea-plan__unit">{unit}</span>
                    </p>
                    <ul className="rea-plan__list">
                      {p.highlights.map((h) => (
                        <li key={h}>
                          <CheckCircle2 size={16} />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <a
                      className="rea-cta rea-cta--primary rea-plan__cta"
                      href={TRIAL_URL}
                      data-umami-event={`plan-${p.id}-start`}
                      onClick={() =>
                        track("cta-click", {
                          place: `plan-${p.id}`,
                          type: "trial",
                        })
                      }
                    >
                      Empezar prueba gratis
                    </a>
                  </article>
                );
              })}
            </div>

            <p className="rea-pricing__note">
              Los mensajes de WhatsApp Business de Meta se facturan aparte,
              directamente por Meta. Sin cuota de instalación por nuestra
              parte.
            </p>
          </div>
        </section>

        {/* ================================================
            9. CUMPLIMIENTO · light
        ================================================ */}
        <section
          id="compliance"
          className="rea-section rea-section--light rea-compliance"
          data-track-section=""
        >
          <div className="rea-wide rea-split rea-split--compliance">
            <div className="rea-split__head">
              <p className="rea-eyebrow rea-eyebrow--light">
                Confianza y cumplimiento
              </p>
              <h2 className="rea-h2 rea-h2--light">
                Tus datos son tuyos. Y los de tus clientes también.
              </h2>
              <p className="rea-split__lead">
                Infraestructura europea, consentimiento explícito y
                portabilidad total. Nada de letra pequeña.
              </p>
            </div>

            <div className="rea-compliance__panel">
              <div className="rea-compliance__panel-head">
                <span className="rea-compliance__panel-icon" aria-hidden="true">
                  <Lock size={15} />
                </span>
                <span className="rea-compliance__panel-title">
                  Tus datos, bajo tu control
                </span>
                <span className="rea-compliance__panel-tag">
                  Servidores en la UE
                </span>
              </div>

              <ul className="rea-compliance__list">
                <li className="rea-compliance__row">
                  <span className="rea-compliance__icon" aria-hidden="true">
                    <ShieldCheck size={18} />
                  </span>
                  <div className="rea-compliance__body">
                    <h3>RGPD</h3>
                    <p>
                      Cumplimos la normativa europea de protección de datos y
                      los servidores están en la UE.
                    </p>
                  </div>
                </li>
                <li className="rea-compliance__row">
                  <span className="rea-compliance__icon" aria-hidden="true">
                    <UserCheck size={18} />
                  </span>
                  <div className="rea-compliance__body">
                    <h3>Opt in explícito</h3>
                    <p>
                      Solo escribimos a quien dio su permiso. Nada de bases
                      frías ni listas compradas.
                    </p>
                  </div>
                </li>
                <li className="rea-compliance__row">
                  <span className="rea-compliance__icon" aria-hidden="true">
                    <Headset size={18} />
                  </span>
                  <div className="rea-compliance__body">
                    <h3>Humano al mando</h3>
                    <p>
                      Tu agente puede retomar la conversación con un clic. La
                      IA no cierra sin ti.
                    </p>
                  </div>
                </li>
                <li className="rea-compliance__row">
                  <span className="rea-compliance__icon" aria-hidden="true">
                    <Download size={18} />
                  </span>
                  <div className="rea-compliance__body">
                    <h3>Portabilidad total</h3>
                    <p>
                      Exportas o borras tus leads en un clic. Si te vas, se van
                      contigo.
                    </p>
                  </div>
                </li>
              </ul>

              <div className="rea-compliance__foot">
                <span className="rea-compliance__foot-note">
                  ¿Dudas sobre privacidad?
                </span>
                <a
                  className="rea-compliance__foot-link"
                  href="#faq"
                  data-umami-event="compliance-see-faq"
                >
                  Ver preguntas frecuentes <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================
            11. FAQ · light
        ================================================ */}
        <section
          id="faq"
          className="rea-section rea-section--light rea-faq"
          data-track-section=""
        >
          <div className="rea-wide rea-split rea-split--faq">
            <div className="rea-split__head">
              <p className="rea-eyebrow rea-eyebrow--light">Dudas honestas</p>
              <h2 className="rea-h2 rea-h2--light">
                Lo que todos preguntan antes de probarlo.
              </h2>
              <p className="rea-split__lead">
                Si tu duda no está aquí, escríbenos. Respondemos nosotros,
                no un formulario.
              </p>
            </div>
            <div className="rea-faq__list">
              <details className="rea-faq__item">
                <summary>
                  <span className="rea-faq__num">01</span>
                  <span className="rea-faq__q">¿Suena a robot?</span>
                  <span className="rea-faq__icon" aria-hidden="true" />
                </summary>
                <p>
                  No. La IA se presenta como asistente de tu inmobiliaria,
                  habla en el tono que configuras y en cuanto el lead está
                  listo, pasa la conversación a un humano con todo el
                  contexto.
                </p>
              </details>
              <details className="rea-faq__item">
                <summary>
                  <span className="rea-faq__num">02</span>
                  <span className="rea-faq__q">¿Y si no sabe responder algo?</span>
                  <span className="rea-faq__icon" aria-hidden="true" />
                </summary>
                <p>
                  Avisa al lead de que te consulta y transfiere la
                  conversación a tu agente. Nunca inventa. Si la
                  información no está, lo dice.
                </p>
              </details>
              <details className="rea-faq__item">
                <summary>
                  <span className="rea-faq__num">03</span>
                  <span className="rea-faq__q">
                    ¿Necesito cuenta oficial de WhatsApp Business?
                  </span>
                  <span className="rea-faq__icon" aria-hidden="true" />
                </summary>
                <p>
                  Sí, WhatsApp Business API. Si aún no la tienes, te
                  ayudamos en el alta durante el setup. Es gratis darla de
                  alta.
                </p>
              </details>
              <details className="rea-faq__item">
                <summary>
                  <span className="rea-faq__num">04</span>
                  <span className="rea-faq__q">¿Cuánto tarda en estar listo?</span>
                  <span className="rea-faq__icon" aria-hidden="true" />
                </summary>
                <p>
                  Una tarde si ya tienes WhatsApp Business API. Dos días
                  si hay que darla de alta por primera vez.
                </p>
              </details>
              <details className="rea-faq__item">
                <summary>
                  <span className="rea-faq__num">05</span>
                  <span className="rea-faq__q">
                    ¿Qué pasa con mis leads si cancelo?
                  </span>
                  <span className="rea-faq__icon" aria-hidden="true" />
                </summary>
                <p>
                  Son tuyos siempre. Los exportas en un clic antes de irte
                  y los borramos de nuestros servidores a las 48 horas de
                  cancelar.
                </p>
              </details>
              <div className="rea-faq__foot">
                <span className="rea-faq__foot-note">¿Te quedó otra duda?</span>
                <a
                  className="rea-faq__foot-link"
                  href={WHATSAPP_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="faq-contact"
                >
                  Escríbenos por WhatsApp <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================
            12. CTA FINAL · dark
        ================================================ */}
        <section
          id="final-cta"
          className="rea-section rea-section--dark rea-section--inverse rea-final"
          data-track-section=""
        >
          <div className="rea-wide rea-final__grid">
            <div className="rea-final__text">
              <p className="rea-eyebrow rea-final__eyebrow">
                Prueba en 2 minutos
              </p>
              <h2 className="rea-h2 rea-final__title">
                Responde a cada lead en menos de 60 segundos.
              </h2>
              <p className="rea-final__sub">
                Prueba la demo en WhatsApp o abre tu cuenta de prueba. Lo que
                prefieras.
              </p>
              <div className="rea-hero__ctas rea-final__ctas">
                <a
                  className="rea-cta rea-cta--primary rea-cta--xl"
                  href={WHATSAPP_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="final-demo-whatsapp"
                  onClick={() =>
                    track("cta-click", { place: "final", type: "demo" })
                  }
                >
                  <MessageCircle size={20} /> Pruébalo ahora por WhatsApp
                </a>
                <a
                  className="rea-link"
                  href={TRIAL_URL}
                  data-umami-event="final-trial-start"
                  onClick={() =>
                    track("cta-click", { place: "final", type: "trial" })
                  }
                >
                  Empezar prueba gratis <ArrowRight size={14} />
                </a>
              </div>
              <ul className="rea-final__trust">
                <li><CheckCircle2 size={14} /> 14 días gratis</li>
                <li><CheckCircle2 size={14} /> Sin tarjeta</li>
                <li><CheckCircle2 size={14} /> Cancela cuando quieras</li>
              </ul>
            </div>

            <div className="rea-final__visual" aria-hidden="true">
              <div className="rea-final__phone">
                <div className="rea-final__phone-notch" />
                <div className="rea-final__phone-head">
                  <div className="rea-final__phone-avatar">T</div>
                  <div className="rea-final__phone-head-text">
                    <strong>Tu agencia</strong>
                    <span>
                      <em className="rea-final__phone-dot" /> en línea
                    </span>
                  </div>
                </div>
                <div className="rea-final__phone-body">
                  <div className="rea-final__phone-msg rea-final__phone-msg--in">
                    Me interesa el ático de Gran Vía. ¿Visitable esta semana?
                  </div>
                  <div className="rea-final__phone-time">14:02</div>
                  <div className="rea-final__phone-msg rea-final__phone-msg--out">
                    ¡Claro! Tengo huecos mañana a las 11:00 o el jueves a las
                    17:30. ¿Cuál te viene mejor?
                  </div>
                  <div className="rea-final__phone-time rea-final__phone-time--out">
                    14:02 · respondido en 38s
                  </div>
                  <div className="rea-final__phone-msg rea-final__phone-msg--in">
                    Mañana 11:00 me va genial.
                  </div>
                  <div className="rea-final__phone-badge">
                    ✓ Visita agendada en Google Calendar
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================================================
          Footer · product only
      ================================================ */}
      <footer className="rea-foot">
        <div className="rea-foot__inner">
          <div className="rea-foot__brand-block">
            <img
              className="rea-foot__logo"
              src={PRODUCT_LOGO}
              alt={PRODUCT_NAME}
              width={120}
              height={30}
            />
            <p className="rea-foot__tag">
              Responde, cualifica y concierta visitas por WhatsApp.
            </p>
          </div>
          <nav className="rea-foot__links" aria-label="Legales">
            <a href="/aviso-legal">Aviso legal</a>
            <a href="/privacidad">Privacidad</a>
            <a href="/cookies">Cookies</a>
            <a
              href={WHATSAPP_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Contacto por WhatsApp
            </a>
          </nav>
        </div>
      </footer>

      {/* ================================================
          Mobile bottom sticky CTA
      ================================================ */}
      <a
        className="rea-mobile-cta"
        href={WHATSAPP_DEMO_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-umami-event="mobile-sticky-demo"
        onClick={() =>
          track("cta-click", { place: "mobile-sticky", type: "demo" })
        }
      >
        <MessageCircle size={18} /> Pruébalo por WhatsApp
      </a>
    </>
  );
};
