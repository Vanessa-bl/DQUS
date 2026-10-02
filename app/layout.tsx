import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Providers } from "./providers";
import "@/src/index.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.devqueens.us"),
  title: {
    default: "DevQueens — Agent Studio for Vertical SaaS | Paid PoC, Connector, Retainer",
    template: "%s | DevQueens",
  },
  description:
    "Agent studio for vertical SaaS. Paid PoC in 10 days ($3K–$7K), production connector in 5 weeks ($10K–$25K), retainer ($1.5K–$3K/mo). Also SMB agent discoverability.",
  keywords: [
    "agent studio",
    "vertical SaaS agents",
    "AI agent connector",
    "ChatGPT connector",
    "WhatsApp Business agent",
    "OpenAI Operator integration",
    "Claude computer use",
    "Gemini agent",
    "SMB agent discoverability",
    "generative engine optimization",
    "AI agent development",
    "multi-agent workflows",
    "LLM API integration",
    "paid AI PoC",
  ],
  authors: [{ name: "DevQueens" }],
  publisher: "DevQueens",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      es: "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "DevQueens",
    locale: "en_US",
    alternateLocale: "es_ES",
    url: "/",
    title: "DevQueens — Agent Studio for Vertical SaaS",
    description:
      "Paid PoC in 10 days ($3K–$7K), production connector in 5 weeks ($10K–$25K), retainer ($1.5K–$3K/mo). Priced against your value, not our hours.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DevQueens — Agent Studio for Vertical SaaS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevQueens — Agent Studio for Vertical SaaS",
    description:
      "Paid PoC → production connector → retainer. Public prices, fixed scope. Priced against your revenue, not our hours.",
    images: [
      {
        url: "/og-image.jpg",
        alt: "DevQueens — Agent Studio for Vertical SaaS",
      },
    ],
  },
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.devqueens.us/#organization",
      name: "DevQueens",
      alternateName: "DevQueens Agent Studio",
      url: "https://www.devqueens.us/",
      logo: {
        "@type": "ImageObject",
        url: "https://www.devqueens.us/logo.svg",
        width: 512,
        height: 512,
      },
      image: "https://www.devqueens.us/og-image.jpg",
      description:
        "Agent studio for vertical SaaS. Vertical SaaS platforms own the workflow — calendar, inventory, checkout — that consumer-facing agents need to execute. We build the connectors that plug your product into ChatGPT, WhatsApp Business, OpenAI Operator, Claude computer use, and Google Gemini agents.",
      foundingDate: "2020",
      areaServed: "Worldwide",
      knowsAbout: [
        "AI agent connectors",
        "Vertical SaaS agent integration",
        "OpenAI Operator integration",
        "Claude computer use integration",
        "Google Gemini agent integration",
        "WhatsApp Business API agent",
        "Meta WhatsApp Business review",
        "LLM evaluation with Braintrust and Langfuse",
        "Multi-agent workflows",
        "Retrieval-Augmented Generation",
        "AI agent observability and cost caps",
        "Generative engine optimization for SMBs",
        "AI answer engine optimization",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.devqueens.us/#website",
      url: "https://www.devqueens.us/",
      name: "DevQueens",
      publisher: { "@id": "https://www.devqueens.us/#organization" },
      inLanguage: ["en", "es"],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.devqueens.us/#service",
      name: "DevQueens Agent Studio for Vertical SaaS",
      url: "https://www.devqueens.us/",
      image: "https://www.devqueens.us/og-image.jpg",
      provider: { "@id": "https://www.devqueens.us/#organization" },
      areaServed: "Worldwide",
      serviceType:
        "Agent connector development for vertical SaaS platforms and SMB agent discoverability",
      description:
        "Paid PoC → production connector → retainer for vertical SaaS. Audit + monthly monitoring for SMBs. Public prices, fixed scope, fixed timelines.",
      priceRange: "$1500 - $25000",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Agent Studio Services",
        itemListElement: [
          {
            "@type": "Offer",
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
              minPrice: 3000,
              maxPrice: 7000,
            },
            itemOffered: {
              "@type": "Service",
              name: "Agent Paid Proof-of-Concept",
              description:
                "5–10 days. One action against your test data through the customer's real API. Team watches the agent transact before committing to production. Deliberately priced to filter tire-kickers.",
            },
          },
          {
            "@type": "Offer",
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
              minPrice: 10000,
              maxPrice: 25000,
            },
            itemOffered: {
              "@type": "Service",
              name: "Production Agent Connector",
              description:
                "3–5 weeks. Full agent surface against the customer's API — availability, booking, cancellation, payment. Meta WhatsApp Business review, Braintrust or Langfuse evals, cost caps, and a runbook.",
            },
          },
          {
            "@type": "Offer",
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              priceCurrency: "USD",
              minPrice: 1500,
              maxPrice: 3000,
              unitCode: "MON",
            },
            itemOffered: {
              "@type": "Service",
              name: "Agent Ops Retainer",
              description:
                "Monthly retainer covering OAuth rotation, schema drift, model release regressions, Meta platform policy changes, eval maintenance, and security reviews.",
            },
          },
          {
            "@type": "Offer",
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
              minPrice: 1500,
              maxPrice: 4000,
            },
            itemOffered: {
              "@type": "Service",
              name: "SMB Agent Discoverability Audit",
              description:
                "Audit and restructure business data — hours, prices, policies, catalog, availability, profiles — so ChatGPT, Gemini, Perplexity, and WhatsApp agents represent the business correctly.",
            },
          },
          {
            "@type": "Offer",
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              priceCurrency: "USD",
              minPrice: 300,
              maxPrice: 800,
              unitCode: "MON",
            },
            itemOffered: {
              "@type": "Service",
              name: "SMB Agent Discoverability Monitoring",
              description:
                "Ongoing monthly monitoring of how the business appears in ChatGPT, Gemini, Perplexity, and WhatsApp agents, with alerts when representation drifts.",
            },
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.devqueens.us/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does DevQueens do?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "DevQueens is an agent studio for vertical SaaS. We build the connectors that let AI agents — ChatGPT, WhatsApp Business agents, OpenAI Operator, Claude computer use, and Google Gemini — book, quote, cancel, or pay through the customer's existing API. Second product line: SMB agent discoverability.",
          },
        },
        {
          "@type": "Question",
          name: "How much does an AI agent connector cost with DevQueens?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Public pricing: paid proof-of-concept $3,000–$7,000 in 5–10 days. Production agent connector $10,000–$25,000 in 3–5 weeks. Agent ops retainer $1,500–$3,000 per month. SMB agent discoverability audit starts at $1,500 with optional monthly monitoring from $300.",
          },
        },
        {
          "@type": "Question",
          name: "How fast can DevQueens ship an agent connector?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A paid proof-of-concept ships in 5–10 days. A production connector against the customer's API ships in 3–5 weeks, including Meta WhatsApp Business platform review and Braintrust or Langfuse evals.",
          },
        },
        {
          "@type": "Question",
          name: "How does DevQueens price its work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Public prices, fixed scope, fixed timeline. The anchor is revenue captured by the agent surface, not hours logged. Every engagement starts with a paid proof-of-concept — never free — to filter serious buyers from window shoppers.",
          },
        },
        {
          "@type": "Question",
          name: "Does DevQueens work with SMBs and local businesses?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, through a separate product line. DevQueens audits and restructures SMB business data — hours, prices, policies, catalog, availability, and profiles — so ChatGPT, Gemini, Perplexity, and WhatsApp agents represent the business correctly. Starts at $1,500 with optional monthly monitoring from $300.",
          },
        },
        {
          "@type": "Question",
          name: "What is included in the agent ops retainer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The monthly retainer covers OAuth token rotation, API schema drift, model release regressions that break fine-tuned prompts, Meta WhatsApp Business platform policy changes, evaluation maintenance, and security reviews. No emergency SOWs and no scope-creep bills.",
          },
        },
        {
          "@type": "Question",
          name: "Who does DevQueens work with?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Vertical SaaS platforms — booking, scheduling, invoicing, marketplaces, vertical-native apps — and their engineering teams. Second track: SMBs that want to be discoverable by consumer-facing AI agents. Senior LATAM team, US LLC, US-timezone communications.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@100..900&family=Nunito+Sans:wght@100..900&family=Figtree:wght@300..900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function () { try { var t = localStorage.getItem('theme'); if (t === 'dark' || t === 'light') { document.documentElement.classList.add('no-transitions'); document.documentElement.setAttribute('data-theme', t); } } catch (_) {} })();`,
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="eb8ecd40-820a-49d4-8a2e-1a1a8f04d46f"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
