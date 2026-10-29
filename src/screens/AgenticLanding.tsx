"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock3,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import {
  agenticLandings,
  type CalculatorInput,
  type LandingVertical,
} from "./agenticLandingContent";
import "./AgenticLanding.css";
import { LeadForm } from "./LeadForm";

type AgenticLandingProps = {
  vertical: LandingVertical;
};

type UmamiWindow = Window & {
  umami?: { track: (event: string, data?: Record<string, unknown>) => void };
};

const track = (event: string, data?: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  const umami = (window as UmamiWindow).umami;
  umami?.track?.(event, data);
};

const formatMoney = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);

const formatInputValue = (input: CalculatorInput, value: number) => {
  const formatted =
    input.prefix === "$" ? formatMoney(value) : formatNumber(value);
  const suffix =
    input.suffix === "%" ? "%" : input.suffix ? ` ${input.suffix}` : "";
  return `${formatted}${suffix}`;
};

export const AgenticLanding: React.FC<AgenticLandingProps> = ({ vertical }) => {
  const content = agenticLandings[vertical];
  const primaryHref =
    vertical === "accounting" ? "#lead-form" : content.auditHref;

  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(
      content.calculator.inputs.map((input) => [input.id, input.defaultValue]),
    ),
  );

  const calculator = useMemo(() => {
    const hours = values.hours ?? 0;
    const rate = values.rate ?? 0;
    const annualHours = hours * 52;
    const annualCost = annualHours * rate;

    return {
      value: formatMoney(annualCost),
      detail: `${formatNumber(annualHours)} hours per year, about ${Math.round(
        annualHours / 40,
      )} working weeks of one person's time.`,
    };
  }, [values]);

  const updateValue = (id: string, value: number) => {
    setValues((previous) => ({ ...previous, [id]: value }));
  };

  const ctaClick = (place: string) => {
    track("cta-click", { vertical, place });
  };

  const offerCopy = (
    <>
      <p className="dq-eyebrow dq-eyebrow--light">
        {content.offer.eyebrow}
      </p>
      <h2 className="dq-h2 dq-h2--light">
        {content.offer.title}
        <br />
        <em>{content.offer.titleAccent}</em>
      </h2>
      <p className="dq-lede dq-lede--light">{content.offer.lede}</p>
    </>
  );

  const offerCard = (
    <div className="dq-offer__card">
      <div className="dq-offer__top">
        <p className="dq-offer__kicker">
          <span className="dq-offer__brand-dot" aria-hidden="true" />
          A DevQueens product
        </p>
        <span className="dq-offer__tag">No pilot</span>
      </div>

      <p className="dq-offer__price">{content.offer.price}</p>
      <p className="dq-offer__note">{content.offer.priceNote}</p>

      <ul className="dq-offer__list">
        {content.offer.includes.map((item) => (
          <li key={item}>
            <Check size={15} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>

      {vertical !== "accounting" && (
        <a
          className="dq-btn dq-btn--primary dq-btn--full"
          href={primaryHref}
          data-umami-event="cta-pricing-audit"
          onClick={() => ctaClick("pricing")}
        >
          {content.offer.cta}
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      )}

      <p className="dq-offer__risk">{content.offer.risk}</p>
    </div>
  );

  return (
    <div
      className={`dq-landing dq-landing--${vertical}`}
      data-vertical={vertical}
    >
      <a className="dq-skip" href="#main">
        Skip to content
      </a>

      <header className="dq-nav">
        <div className="dq-nav__inner">
          <a className="dq-nav__brand" href="#top" aria-label="DevQueens">
            <img
              className="dq-nav__logo"
              src="/logodq.png"
              alt="DevQueens"
              width={140}
              height={47}
            />
            <span className="dq-nav__brand-tag">
              <span className="dq-nav__brand-dot" aria-hidden="true" />
              A DevQueens studio
            </span>
          </a>

          <nav className="dq-nav__links" aria-label="Page sections">
            {content.nav.links.map((link) => (
              <a key={link.href} className="dq-nav__link" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <a
            className="dq-btn dq-btn--primary dq-btn--small dq-nav__cta"
            href={primaryHref}
            data-umami-event="cta-nav-audit"
            onClick={() => ctaClick("nav")}
          >
            {content.nav.cta}
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </header>

      <main id="main">
        {/* ------------------------------------------------------------------
            HERO
        ------------------------------------------------------------------ */}
        <section className="dq-hero" id="top">
          <div className="dq-wrap dq-hero__grid">
            <div className="dq-hero__copy">
              <p className="dq-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="dq-h1">
                {content.hero.title}
                <br />
                <em>{content.hero.titleAccent}</em>
              </h1>
              <p className="dq-hero__sub">{content.hero.subtitle}</p>

              <div className="dq-hero__actions">
                <a
                  className="dq-btn dq-btn--primary"
                  href={primaryHref}
                  data-umami-event="cta-hero-audit"
                  onClick={() => ctaClick("hero")}
                >
                  {content.hero.primaryCta}
                  <ArrowRight size={17} aria-hidden="true" />
                </a>
                <a
                  className="dq-btn dq-btn--ghost"
                  href={content.hero.secondaryHref}
                  data-umami-event="cta-hero-process"
                  onClick={() => ctaClick("hero-secondary")}
                >
                  {content.hero.secondaryCta}
                </a>
              </div>

              <ul className="dq-hero__proof">
                {content.hero.proof.map((item) => (
                  <li key={item}>
                    <Check size={14} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="dq-run"
              role="group"
              aria-label={content.hero.card.header}
            >
              <div className="dq-run__head">
                <div>
                  <p className="dq-run__kicker">Process automation</p>
                  <p className="dq-run__title">{content.hero.card.header}</p>
                </div>
                <span className="dq-run__status">
                  <span className="dq-run__dot" aria-hidden="true" />
                  {content.hero.card.status}
                </span>
              </div>

              <ol className="dq-run__steps">
                {content.hero.card.steps.map((step, index) => (
                  <li
                    className="dq-run__step"
                    key={step.label}
                    style={{ animationDelay: `${120 + index * 140}ms` }}
                  >
                    <span className="dq-run__node" aria-hidden="true">
                      {index + 1}
                    </span>
                    <div>
                      <p className="dq-run__label">{step.label}</p>
                      <p className="dq-run__body">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="dq-run__foot">
                <p className="dq-run__result">{content.hero.card.result}</p>
                <span className="dq-run__badge">
                  <ShieldCheck size={14} aria-hidden="true" />
                  {content.hero.card.badge}
                </span>
              </div>
            </div>
          </div>

          <div className="dq-wrap dq-stack">
            <p className="dq-stack__label">{content.hero.stackLabel}</p>
            <ul className="dq-stack__items">
              {content.hero.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            PROBLEM
        ------------------------------------------------------------------ */}
        <section className="dq-section dq-problem" id="problem">
          <div className="dq-wrap dq-problem__grid">
            <div className="dq-problem__head">
              <p className="dq-eyebrow dq-eyebrow--light">
                {content.problem.eyebrow}
              </p>
              <h2 className="dq-h2 dq-h2--light">
                {content.problem.title}
                <br />
                <em>{content.problem.titleAccent}</em>
              </h2>
              <p className="dq-lede dq-lede--light">{content.problem.lede}</p>
            </div>

            <div className="dq-problem__list">
              {content.problem.items.map((item) => (
                <article className="dq-problem__item" key={item.number}>
                  <span className="dq-problem__num">{item.number}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            WORKFLOWS
        ------------------------------------------------------------------ */}
        <section className="dq-section dq-workflows" id="workflows">
          <div className="dq-wrap">
            <div className="dq-section__head">
              <div>
                <p className="dq-eyebrow">{content.workflows.eyebrow}</p>
                <h2 className="dq-h2">
                  {content.workflows.title}
                  <br />
                  <em>{content.workflows.titleAccent}</em>
                </h2>
              </div>
              <p className="dq-lede">{content.workflows.lede}</p>
            </div>

            <div className="dq-cards">
              {content.workflows.items.map((item) => (
                <article className="dq-card" key={item.number}>
                  <span className="dq-card__num">{item.number}</span>
                  <h3 className="dq-card__title">{item.title}</h3>
                  <p className="dq-card__body">{item.body}</p>

                  <div className="dq-card__split">
                    <div>
                      <span className="dq-card__label">Automated</span>
                      <p>{item.agent}</p>
                    </div>
                    <div>
                      <span className="dq-card__label dq-card__label--human">
                        Your team approves
                      </span>
                      <p>{item.human}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            PROCESS
        ------------------------------------------------------------------ */}
        <section className="dq-section dq-process" id="process">
          <div className="dq-wrap">
            <div className="dq-section__head">
              <div>
                <p className="dq-eyebrow">{content.process.eyebrow}</p>
                <h2 className="dq-h2">
                  {content.process.title}
                  <br />
                  <em>{content.process.titleAccent}</em>
                </h2>
              </div>
              <p className="dq-lede">{content.process.lede}</p>
            </div>

            <ol className="dq-timeline">
              {content.process.steps.map((step) => (
                <li className="dq-timeline__item" key={step.day}>
                  <span className="dq-timeline__dot" aria-hidden="true" />
                  <p className="dq-timeline__day">{step.day}</p>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>

            <p className="dq-process__note">
              <Clock3 size={16} aria-hidden="true" />
              {content.process.note}
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            OFFER
        ------------------------------------------------------------------ */}
        <section className="dq-section dq-offer" id="pricing">
          {vertical === "accounting" ? (
            <div className="dq-wrap">
              <div className="dq-offer__head">{offerCopy}</div>
              <div className="dq-offer__row dq-offer__row--form">
                {offerCard}
                <div className="dq-form-card" id="lead-form">
                  <LeadForm />
                </div>
              </div>
            </div>
          ) : (
            <div className="dq-wrap dq-offer__grid">
              <div>{offerCopy}</div>
              {offerCard}
            </div>
          )}
        </section>

        {/* ------------------------------------------------------------------
            CALCULATOR
        ------------------------------------------------------------------ */}
        <section className="dq-section dq-calculator" id="calculator">
          <div className="dq-wrap dq-calculator__grid">
            <div>
              <p className="dq-eyebrow">{content.calculator.eyebrow}</p>
              <h2 className="dq-h2">
                {content.calculator.title}
                <br />
                <em>{content.calculator.titleAccent}</em>
              </h2>
              <p className="dq-lede">{content.calculator.lede}</p>

              <p className="dq-calculator__note">
                <LockKeyhole size={15} aria-hidden="true" />
                {content.calculator.footnote}
              </p>
            </div>

            <div className="dq-calc-card">
              <div className="dq-calc-card__inputs">
                {content.calculator.inputs.map((input) => {
                  const value = values[input.id] ?? input.defaultValue;
                  const progress = Math.min(
                    100,
                    Math.max(
                      0,
                      ((value - input.min) / (input.max - input.min)) * 100,
                    ),
                  );

                  return (
                    <div className="dq-field" key={input.id}>
                      <div className="dq-field__head">
                        <label htmlFor={`dq-${input.id}`}>
                          {input.label}
                        </label>
                        <output htmlFor={`dq-${input.id}`}>
                          {formatInputValue(input, value)}
                        </output>
                      </div>
                      <input
                        id={`dq-${input.id}`}
                        type="range"
                        min={input.min}
                        max={input.max}
                        step={input.step}
                        value={value}
                        onChange={(event) =>
                          updateValue(input.id, Number(event.target.value))
                        }
                        style={
                          { "--dq-progress": `${progress}%` } as React.CSSProperties
                        }
                      />
                    </div>
                  );
                })}
              </div>

              <div className="dq-calc-card__output">
                <p className="dq-calc-card__label">
                  {content.calculator.outputLabel}
                </p>
                <p
                  className="dq-calc-card__value"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {calculator.value}
                </p>
                <p className="dq-calc-card__detail">{calculator.detail}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            PROOF
        ------------------------------------------------------------------ */}
        <section className="dq-section dq-proof" id="proof">
          <div className="dq-wrap">
            <div className="dq-section__head">
              <div>
                <p className="dq-eyebrow">{content.proof.eyebrow}</p>
                <h2 className="dq-h2">
                  {content.proof.title}
                  <br />
                  <em>{content.proof.titleAccent}</em>
                </h2>
              </div>
              <p className="dq-lede">{content.proof.lede}</p>
            </div>

            <div className="dq-proof__grid">
              <div className="dq-proof__cases">
                {content.proof.cases.map((item) => (
                  <Link
                    className="dq-case"
                    href={item.href}
                    key={item.value}
                    data-umami-event="case-study-click"
                    onClick={() =>
                      track("case-study-click", {
                        vertical,
                        href: item.href,
                      })
                    }
                  >
                    <p className="dq-case__value">{item.value}</p>
                    <p className="dq-case__label">{item.label}</p>
                    <p className="dq-case__source">{item.source}</p>
                    <span className="dq-case__cta">
                      {item.cta}
                      <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>

              <div className="dq-proof__points">
                {content.proof.points.map((point) => (
                  <div className="dq-proof__point" key={point.title}>
                    <h3>{point.title}</h3>
                    <p>{point.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            FAQ
        ------------------------------------------------------------------ */}
        <section className="dq-section dq-faq" id="faq">
          <div className="dq-wrap">
            <div className="dq-section__head">
              <div>
                <p className="dq-eyebrow">{content.faq.eyebrow}</p>
                <h2 className="dq-h2">
                  {content.faq.title}
                  <br />
                  <em>{content.faq.titleAccent}</em>
                </h2>
              </div>
            </div>

            <div className="dq-faq__grid">
              {content.faq.items.map((item, index) => (
                <details className="dq-faq__item" key={item.q}>
                  <summary>
                    <span className="dq-faq__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="dq-faq__q">{item.q}</span>
                    <span className="dq-faq__icon" aria-hidden="true" />
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            FINAL CTA
        ------------------------------------------------------------------ */}
        <section className="dq-final" id="contact">
          <div className="dq-wrap dq-final__inner">
            <p className="dq-eyebrow dq-eyebrow--light">
              {content.final.eyebrow}
            </p>
            <h2 className="dq-h2 dq-h2--light dq-final__title">
              {content.final.title}
              <br />
              <em>{content.final.titleAccent}</em>
            </h2>
            <p className="dq-lede dq-lede--light dq-final__body">
              {content.final.body}
            </p>

            <a
              className="dq-btn dq-btn--cream"
              href={vertical === "accounting" ? "#lead-form" : content.auditHref}
              data-umami-event={
                vertical === "accounting" ? "cta-final-form" : "cta-final-audit"
              }
              onClick={() => ctaClick("final")}
            >
              {content.final.cta}
              <ArrowRight size={17} aria-hidden="true" />
            </a>

            <p className="dq-final__email">
              Or email{" "}
              <a href={`mailto:${content.final.email}`}>
                {content.final.email}
              </a>
            </p>
            <p className="dq-final__note">{content.final.note}</p>
          </div>
        </section>
      </main>

      <footer className="dq-footer">
        <div className="dq-wrap dq-footer__inner">
          <div className="dq-footer__brand">
            <a
              className="dq-footer__logo-link"
              href="/"
              aria-label="DevQueens home"
            >
              <img
                className="dq-footer__logo"
                src="/logodq.png"
                alt="DevQueens"
                width={140}
                height={47}
              />
              <span className="dq-footer__brand-dot" aria-hidden="true" />
            </a>
            <p>{content.footer.tagline}</p>
          </div>

          <nav className="dq-footer__links" aria-label="Company">
            {content.footer.links.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="dq-footer__meta">
            <a href={`mailto:${content.footer.email}`}>
              {content.footer.email}
            </a>
            <p>{content.footer.location}</p>
            <p>© {new Date().getFullYear()} DevQueens. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <div className="dq-mobilecta">
        <a
          className="dq-btn dq-btn--primary dq-btn--full"
          href={primaryHref}
          data-umami-event="cta-mobile-audit"
          onClick={() => ctaClick("mobile")}
        >
          {content.final.cta}
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};
