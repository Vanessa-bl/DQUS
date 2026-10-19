"use client";

import { useState } from "react";
import { useT } from "../../../i18n/useT";
import "./FAQSection.css";

type QA = { q: string; a: string };

export const FAQSection: React.FC = () => {
  const t = useT();
  const [open, setOpen] = useState<number | null>(0);

  const items: QA[] = [
    {
      q: t(
        "faq.q1.question",
        "What does DevQueens do?",
      ),
      a: t(
        "faq.q1.answer",
        "DevQueens is one studio that ships three deliverables for the same company: process automation that drains the manual queue, AI agents that transact against the customer's product, and AI marketing that puts the business inside ChatGPT, Claude, and Perplexity where buyers now search. Every build is tailored to the specific company.",
      ),
    },
    {
      q: t("faq.q2.question", "How much does DevQueens cost?"),
      a: t(
        "faq.q2.answer",
        "Public pricing. Paid proof of concept: $3,000 to $7,000 in 5 to 10 days. Production automation build: $5,000 to $20,000 in 4 to 6 weeks. Production AI agent connector: $10,000 to $25,000 in 3 to 5 weeks. AI marketing audit from $1,500 with optional $300 per month monitoring. Ops retainer $1,500 to $3,000 per month after production goes live.",
      ),
    },
    {
      q: t(
        "faq.q3.question",
        "How fast can DevQueens ship an automation or AI agent?",
      ),
      a: t(
        "faq.q3.answer",
        "A paid proof of concept ships in 5 to 10 days. A production automation ships in 4 to 6 weeks. A production AI agent connector ships in 3 to 5 weeks, including Meta WhatsApp Business platform review and Braintrust or Langfuse evals.",
      ),
    },
    {
      q: t(
        "faq.q4.question",
        "Why does every DevQueens engagement start paid?",
      ),
      a: t(
        "faq.q4.answer",
        "The price is the filter. A free proof of concept attracts window shoppers who cost time. A paid proof of concept in the $3,000 to $7,000 band filters for buyers who have a real queue to drain or a real agent surface to build, and it lets the team watch the thing actually work against the customer's data before anyone commits to production.",
      ),
    },
    {
      q: t("faq.q5.question", "How does DevQueens price its work?"),
      a: t(
        "faq.q5.answer",
        "Public prices, fixed scope, fixed timeline. The anchor is what you capture, not what we clock. An automation that clears 800 invoices a month returns 40 approver hours a week. An AI agent that captures 50 bookings a week unlocks real revenue. A profile audit that makes your business legible to ChatGPT turns searches into clients.",
      ),
    },
    {
      q: t(
        "faq.q6.question",
        "What is included in the DevQueens ops retainer?",
      ),
      a: t(
        "faq.q6.answer",
        "The monthly retainer covers OAuth token rotation, API schema drift, model release regressions that break tuned prompts, platform policy changes, eval maintenance including the security evals, and monthly security reviews. No emergency statements of work and no scope creep bills.",
      ),
    },
    {
      q: t(
        "faq.q7.question",
        "Does DevQueens offer custom solutions per company?",
      ),
      a: t(
        "faq.q7.answer",
        "Every build is tailored to the specific company. The three lines, process automation, AI agent surface, and AI marketing, are not shelf products: they are the three deliverables DevQueens builds around what the company already does and already has.",
      ),
    },
    {
      q: t(
        "faq.q8.question",
        "What makes DevQueens different from other AI agencies?",
      ),
      a: t(
        "faq.q8.answer",
        "Most studios do one of the three lines, automation, AI agents, or AI marketing, and the three never talk to each other. DevQueens delivers all three under one roof so the data model, schemas, catalog, pricing, and voice stay consistent across the automation that clears the queue, the agent that transacts on the product, and the marketing that puts the business in front of the buyer.",
      ),
    },
  ];

  return (
    <section className="faq" aria-labelledby="faq-title">
      <div className="faq__header">
        <span className="faq__eyebrow">
          {t("faq.eyebrow", "Common questions")}
        </span>
        <h2 id="faq-title" className="faq__headline">
          {t("faq.headline.line1", "What buyers ask")}
          <br />
          <span className="faq__headline-mark">
            {t("faq.headline.line2", "before signing.")}
          </span>
        </h2>
      </div>

      <ol className="faq__list">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={i} className={`faq__item${isOpen ? " is-open" : ""}`}>
              <button
                type="button"
                className="faq__question"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="faq__question-text">{item.q}</span>
                <span className="faq__question-icon" aria-hidden="true">
                  {isOpen ? "–" : "+"}
                </span>
              </button>
              <div
                id={`faq-answer-${i}`}
                className="faq__answer"
                role="region"
                hidden={!isOpen}
              >
                <p>{item.a}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};
