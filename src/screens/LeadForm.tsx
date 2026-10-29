"use client";

import React, { useActionState, useEffect, useState } from "react";
import { ArrowRight, Check, LockKeyhole } from "lucide-react";
import {
  submitLead,
  type LeadFormState,
} from "@/src/actions/lead";

type UmamiWindow = Window & {
  umami?: { track: (event: string, data?: Record<string, unknown>) => void };
};

const track = (event: string) => {
  if (typeof window === "undefined") return;
  const umami = (window as UmamiWindow).umami;
  umami?.track?.(event);
};

const initialState: LeadFormState = { status: "idle" };

export function LeadForm() {
  const [state, formAction, isPending] = useActionState(
    submitLead,
    initialState,
  );

  const [values, setValues] = useState({
    email: "",
    name: "",
    company: "",
    process: "",
  });

  const [startedAt, setStartedAt] = useState("");

  useEffect(() => {
    setStartedAt(String(Date.now()));
  }, []);

  useEffect(() => {
    if (state.status === "fallback" && state.mailto) {
      window.location.href = state.mailto;
    }
  }, [state]);

  const updateValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  };

  if (state.status === "success") {
    return (
      <div className="dq-form dq-form--status" role="status" aria-live="polite">
        <span className="dq-form__icon" aria-hidden="true">
          <Check size={20} />
        </span>
        <h3 className="dq-form__status-title">Request received.</h3>
        <p className="dq-form__status-body">{state.message}</p>
      </div>
    );
  }

  if (state.status === "fallback") {
    return (
      <div className="dq-form dq-form--status" role="status" aria-live="polite">
        <span className="dq-form__icon" aria-hidden="true">
          <Check size={20} />
        </span>
        <h3 className="dq-form__status-title">One last step.</h3>
        <p className="dq-form__status-body">{state.message}</p>
        {state.mailto && (
          <a
            className="dq-btn dq-btn--primary dq-btn--full"
            href={state.mailto}
          >
            Open your email app
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        )}
        <p className="dq-form__note">
          Or email{" "}
          <a href="mailto:hello@devqueens.us">hello@devqueens.us</a>.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="dq-form"
      aria-labelledby="lead-form-title"
      noValidate
    >
      <div className="dq-form__head">
        <p className="dq-form__kicker" id="lead-form-title">
          Free 20-minute audit
        </p>
        <p className="dq-form__lead">
          Tell us where to reply. Please use your work email.
        </p>
      </div>

      <div className="dq-form__grid">
        <div className="dq-form__field dq-form__field--full">
          <label htmlFor="lead-email">Work email</label>
          <input
            id="lead-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={values.email}
            onChange={updateValue}
            required
            aria-invalid={Boolean(state.fieldErrors?.email)}
            aria-describedby={
              state.fieldErrors?.email ? "lead-email-error" : undefined
            }
          />
          {state.fieldErrors?.email && (
            <p id="lead-email-error" className="dq-form__field-error">
              {state.fieldErrors.email}
            </p>
          )}
        </div>

        <div className="dq-form__field">
          <label htmlFor="lead-name">Name</label>
          <input
            id="lead-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={updateValue}
            required
            aria-invalid={Boolean(state.fieldErrors?.name)}
            aria-describedby={
              state.fieldErrors?.name ? "lead-name-error" : undefined
            }
          />
          {state.fieldErrors?.name && (
            <p id="lead-name-error" className="dq-form__field-error">
              {state.fieldErrors.name}
            </p>
          )}
        </div>

        <div className="dq-form__field">
          <label htmlFor="lead-company">Company</label>
          <input
            id="lead-company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Company name"
            value={values.company}
            onChange={updateValue}
            required
            aria-invalid={Boolean(state.fieldErrors?.company)}
            aria-describedby={
              state.fieldErrors?.company ? "lead-company-error" : undefined
            }
          />
          {state.fieldErrors?.company && (
            <p id="lead-company-error" className="dq-form__field-error">
              {state.fieldErrors.company}
            </p>
          )}
        </div>

        <div className="dq-form__field dq-form__field--full">
          <label htmlFor="lead-process">
            What would you like to automate first?{" "}
            <span className="dq-form__optional">(optional)</span>
          </label>
          <textarea
            id="lead-process"
            name="process"
            rows={3}
            maxLength={500}
            placeholder="Document chase, invoice intake, client onboarding..."
            value={values.process}
            onChange={updateValue}
            aria-invalid={Boolean(state.fieldErrors?.process)}
            aria-describedby={
              state.fieldErrors?.process ? "lead-process-error" : undefined
            }
          />
          {state.fieldErrors?.process && (
            <p id="lead-process-error" className="dq-form__field-error">
              {state.fieldErrors.process}
            </p>
          )}
        </div>
      </div>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="dq-form__hp"
        aria-hidden="true"
      />
      <input type="hidden" name="startedAt" value={startedAt} />
      <input type="hidden" name="vertical" value="accounting" />

      {state.status === "error" && state.message && (
        <p className="dq-form__form-error" role="alert">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        className="dq-btn dq-btn--primary dq-btn--full"
        disabled={isPending}
        data-umami-event="lead-form-submit"
        onClick={() => track("lead-form-submit")}
      >
        {isPending ? "Checking..." : "Book my free audit"}
        {!isPending && <ArrowRight size={16} aria-hidden="true" />}
      </button>

      <p className="dq-form__note">
        <LockKeyhole size={12} aria-hidden="true" />
        Please use your work email. We only use it to reply about your audit.
      </p>
    </form>
  );
}
