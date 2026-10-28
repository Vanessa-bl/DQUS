"use server";

import { headers } from "next/headers";
import { promises as dns } from "node:dns";

export type LeadFormState = {
  status: "idle" | "success" | "error" | "fallback";
  message?: string;
  fieldErrors?: Partial<
    Record<"email" | "name" | "company" | "process", string>
  >;
  mailto?: string;
};

type LeadField = "email" | "name" | "company" | "process";

const EMAIL_RE =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;

const PERSONAL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.es",
  "yahoo.co.uk",
  "yahoo.com.mx",
  "ymail.com",
  "hotmail.com",
  "hotmail.es",
  "hotmail.co.uk",
  "outlook.com",
  "outlook.es",
  "live.com",
  "live.es",
  "msn.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "pm.me",
  "gmx.com",
  "gmx.net",
  "gmx.es",
  "mail.com",
  "email.com",
  "zoho.com",
  "zohomail.com",
  "yandex.com",
  "yandex.ru",
  "mail.ru",
  "tutanota.com",
  "tuta.com",
  "hey.com",
  "fastmail.com",
  "hushmail.com",
  "qq.com",
  "163.com",
  "126.com",
  "naver.com",
  "daum.net",
  "web.de",
  "free.fr",
  "orange.fr",
  "laposte.net",
  "comcast.net",
  "verizon.net",
  "att.net",
  "sbcglobal.net",
  "bellsouth.net",
  "cox.net",
  "charter.net",
  "shaw.ca",
  "rogers.com",
  "btinternet.com",
  "sky.com",
]);

const PERSONAL_DOMAIN_LIST = [...PERSONAL_DOMAINS];

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "10minutemail.com",
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamailblock.com",
  "tempmail.com",
  "temp-mail.org",
  "tempmailo.com",
  "temporarymail.com",
  "throwawaymail.com",
  "throwaway.email",
  "yopmail.com",
  "sharklasers.com",
  "dispostable.com",
  "getnada.com",
  "maildrop.cc",
  "trashmail.com",
  "trash-mail.com",
  "fakeinbox.com",
  "mintemail.com",
  "spamgourmet.com",
  "mytrashmail.com",
  "mailnesia.com",
  "mailcatch.com",
  "spam4.me",
  "spam.la",
  "mailsac.com",
  "inboxkitten.com",
  "moakt.com",
  "tempr.email",
  "discard.email",
  "mailnull.com",
  "spamex.com",
  "pokemail.net",
  "trbvm.com",
  "wegwerfmail.de",
  "tempinbox.com",
  "mohmal.com",
  "emailfake.com",
  "generator.email",
  "mailtemp.net",
  "emailondeck.com",
  "burnermail.io",
]);

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_ATTEMPTS = 5;
const rateLimit = new Map<string, number[]>();

const DNS_CACHE_TTL_MS = 60 * 60 * 1000;
const dnsCache = new Map<string, { valid: boolean; expires: number }>();

const LEAD_RECIPIENT = "hello@devqueens.us";
const SUCCESS_MESSAGE = "Thanks. We'll reply within one business day.";
const FALLBACK_MESSAGE =
  "Your email app should open with the request. Hit send to finish.";
const WORK_EMAIL_MESSAGE =
  "Please use your work email. Personal addresses like Gmail, Yahoo, or Outlook aren't accepted.";
const DOMAIN_CHECK_MESSAGE =
  "We couldn't verify that company domain. Check the spelling or email hello@devqueens.us.";

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const requestHeaders = await headers();
  const ip = getClientIp(requestHeaders);

  if (process.env.NODE_ENV === "production" && !allowRequest(ip)) {
    return {
      status: "error",
      message:
        "Too many attempts. Try again in a few minutes or email us at hello@devqueens.us.",
    };
  }

  if (readString(formData, "website")) {
    return { status: "success", message: SUCCESS_MESSAGE };
  }

  const startedAt = Number(readString(formData, "startedAt"));
  if (
    Number.isFinite(startedAt) &&
    startedAt > 0 &&
    Date.now() - startedAt < 1200
  ) {
    return { status: "success", message: SUCCESS_MESSAGE };
  }

  const email = normalizeEmail(readString(formData, "email"));
  const name = cleanText(readString(formData, "name"), 80);
  const company = cleanText(readString(formData, "company"), 100);
  const processDescription = cleanText(readString(formData, "process"), 500);

  const fieldErrors: Partial<Record<LeadField, string>> = {};

  if (!email) {
    fieldErrors.email = "Enter your work email.";
  } else if (!isValidEmailShape(email)) {
    fieldErrors.email = "Enter a valid email address.";
  } else {
    const domainCheck = await checkWorkDomain(email.split("@")[1] ?? "");
    if (!domainCheck.ok) fieldErrors.email = domainCheck.message;
  }

  if (name.length < 2) fieldErrors.name = "Enter your name.";
  if (company.length < 2) fieldErrors.company = "Enter your company.";
  if (processDescription.length > 500) {
    fieldErrors.process = "Keep it under 500 characters.";
  }
  if (containsUrl(name) || containsUrl(company)) {
    if (!fieldErrors.name) {
      fieldErrors.name = "Remove links from this field.";
    }
    if (!fieldErrors.company) {
      fieldErrors.company = "Remove links from this field.";
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the fields below.",
      fieldErrors,
    };
  }

  const subject = `New process audit request: ${company}`;
  const body = [
    "New process audit request",
    "",
    `Name: ${name}`,
    `Work email: ${email}`,
    `Company: ${company}`,
    `Process: ${processDescription || "Not provided"}`,
    "Source: accountants landing",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  const delivery = await deliverLead({ subject, body, replyTo: email });

  if (delivery === "sent") {
    return { status: "success", message: SUCCESS_MESSAGE };
  }

  const mailto = buildMailto(subject, body);

  if (process.env.NODE_ENV !== "production") {
    console.info("[lead] captured", {
      email,
      name,
      company,
      process: processDescription,
    });
    return { status: "success", message: SUCCESS_MESSAGE };
  }

  if (delivery === "failed") {
    console.error("[lead] delivery failed, using mailto fallback");
  }

  return {
    status: "fallback",
    message: FALLBACK_MESSAGE,
    mailto,
  };
}

async function deliverLead({
  subject,
  body,
  replyTo,
}: {
  subject: string;
  body: string;
  replyTo: string;
}): Promise<"sent" | "failed" | "unconfigured"> {
  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey) {
    try {
      const response = await fetchWithTimeout(
        "https://api.resend.com/emails",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from:
              process.env.LEADS_FROM_EMAIL ||
              "DevQueens <leads@devqueens.us>",
            to: [LEAD_RECIPIENT],
            subject,
            text: body,
            reply_to: replyTo,
          }),
        },
        8000,
      );

      if (response.ok) return "sent";
      console.error("[lead] Resend responded with", response.status);
    } catch (error) {
      console.error(
        "[lead] Resend request failed",
        error instanceof Error ? error.message : "unknown error",
      );
    }
  }

  const webhook = process.env.LEADS_WEBHOOK_URL;

  if (webhook) {
    try {
      const response = await fetchWithTimeout(
        webhook,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject,
            body,
            replyTo,
            source: "accountants-landing",
          }),
        },
        8000,
      );

      if (response.ok) return "sent";
      console.error("[lead] webhook responded with", response.status);
    } catch (error) {
      console.error(
        "[lead] webhook request failed",
        error instanceof Error ? error.message : "unknown error",
      );
    }
  }

  return resendKey || webhook ? "failed" : "unconfigured";
}

function getClientIp(requestHeaders: Headers): string {
  const forwarded = requestHeaders.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return requestHeaders.get("x-real-ip")?.trim() || "unknown";
}

function allowRequest(ip: string): boolean {
  const now = Date.now();
  const attempts = (rateLimit.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_WINDOW_MS,
  );

  if (attempts.length >= RATE_MAX_ATTEMPTS) {
    rateLimit.set(ip, attempts);
    return false;
  }

  attempts.push(now);
  rateLimit.set(ip, attempts);

  if (rateLimit.size > 5000) {
    for (const [key, timestamps] of rateLimit) {
      if (!timestamps.some((timestamp) => now - timestamp < RATE_WINDOW_MS)) {
        rateLimit.delete(key);
      }
    }
  }

  return true;
}

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

function cleanText(value: string, maxLength: number): string {
  return value
    .split("")
    .map((character) => {
      const code = character.charCodeAt(0);
      return code < 32 || code === 127 ? " " : character;
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function isValidEmailShape(email: string): boolean {
  if (email.length > 254) return false;

  const [local, domain] = email.split("@");
  if (!local || !domain || local.length > 64) return false;
  if (local.startsWith(".") || local.endsWith(".") || local.includes("..")) {
    return false;
  }

  return EMAIL_RE.test(email);
}

function containsUrl(value: string): boolean {
  return /(https?:\/\/|www\.)\S+/i.test(value);
}

function isPersonalDomain(domain: string): boolean {
  return (
    PERSONAL_DOMAINS.has(domain) ||
    PERSONAL_DOMAIN_LIST.some((personal) => domain.endsWith(`.${personal}`))
  );
}

async function checkWorkDomain(
  rawDomain: string,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const domain = rawDomain.toLowerCase().replace(/\.$/, "");

  if (
    !domain ||
    !domain.includes(".") ||
    domain.length < 4 ||
    domain === "localhost" ||
    domain.endsWith(".local") ||
    domain === "example.com" ||
    domain === "test.com"
  ) {
    return { ok: false, message: "Use a valid company domain." };
  }

  if (isPersonalDomain(domain)) {
    return { ok: false, message: WORK_EMAIL_MESSAGE };
  }

  if (DISPOSABLE_DOMAINS.has(domain)) {
    return {
      ok: false,
      message:
        "Use your work email. Disposable addresses aren't accepted.",
    };
  }

  const cached = dnsCache.get(domain);
  if (cached && cached.expires > Date.now()) {
    return cached.valid
      ? { ok: true }
      : { ok: false, message: DOMAIN_CHECK_MESSAGE };
  }

  let valid = false;

  try {
    const mxRecords = await withTimeout(dns.resolveMx(domain), 2500);
    valid = mxRecords.length > 0;
  } catch {
    valid = false;
  }

  if (!valid) {
    try {
      const aRecords = await withTimeout(dns.resolve4(domain), 2500);
      valid = aRecords.length > 0;
    } catch {
      valid = false;
    }
  }

  dnsCache.set(domain, {
    valid,
    expires: Date.now() + DNS_CACHE_TTL_MS,
  });

  return valid ? { ok: true } : { ok: false, message: DOMAIN_CHECK_MESSAGE };
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timeout")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

async function fetchWithTimeout(
  input: string,
  init: RequestInit,
  ms: number,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);

  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function buildMailto(subject: string, body: string): string {
  return `mailto:${LEAD_RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
