import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { getLocale } from "next-intl/server";
import "@/src/index.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.devqueens.us"),
  title: {
    default: "DQueens | Workforce IA",
    template: "%s | DQueens",
  },
  description:
    "Automations that drain manual hours. AI agents that transact on your product. AI marketing that puts your business inside ChatGPT, Claude, and Perplexity where buyers now search. Paid proof of concept in 10 days. Production build in 5 weeks. Fixed scope, fixed timeline, fixed price.",
  keywords: [
    "process automation",
    "AI agent development",
    "AI marketing",
    "three way invoice matching",
    "invoice automation",
    "exception routing automation",
    "approval flow automation",
    "AI agent connector",
    "ChatGPT agent integration",
    "Claude computer use integration",
    "OpenAI Operator integration",
    "WhatsApp Business agent",
    "generative engine optimization",
    "AI answer engine optimization",
    "AI SEO",
    "AI search visibility",
    "paid AI proof of concept",
    "LLM API integration",
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
  openGraph: {
    type: "website",
    siteName: "DevQueens",
    locale: "en_US",
    url: "/",
    title: "DevQueens | Automation, AI, and Marketing. One Roof.",
    description:
      "Automate the work. Capture the market. Process automations, AI agents on your product, and AI marketing that puts you inside ChatGPT, Claude, and Perplexity. Paid proof of concept in 10 days.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DevQueens | Automation, AI, and Marketing. One Roof.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevQueens | Automation, AI, and Marketing. One Roof.",
    description:
      "Automations that drain manual hours. AI agents that transact on your product. AI marketing inside ChatGPT, Claude, Perplexity. Paid PoC in 10 days, production in 5 weeks.",
    images: [
      {
        url: "/og-image.jpg",
        alt: "DevQueens | Automation, AI, and Marketing.",
      },
    ],
  },
  icons: {
    icon: "/favicon.svg",
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
      alternateName: "DevQueens",
      url: "https://www.devqueens.us/",
      logo: {
        "@type": "ImageObject",
        url: "https://www.devqueens.us/logo.svg",
        width: 512,
        height: 512,
      },
      image: "https://www.devqueens.us/og-image.jpg",
      description:
        "DevQueens ships three deliverables for the same company: process automation that drains manual hours, AI agents that transact against the product's API, and AI marketing that puts the business inside ChatGPT, Claude, and Perplexity where buyers now search. Fixed scope, fixed timeline, fixed price. Measured in revenue.",
      foundingDate: "2020",
      areaServed: "Worldwide",
      knowsAbout: [
        "Process automation",
        "Three way invoice matching",
        "Exception routing automation",
        "Reconciliation and approval flows",
        "AI agent connectors",
        "OpenAI Operator integration",
        "Claude computer use integration",
        "Google Gemini agent integration",
        "WhatsApp Business API agent",
        "Meta WhatsApp Business review",
        "LLM evaluation with Braintrust and Langfuse",
        "AI agent observability and cost caps",
        "AI marketing",
        "Generative engine optimization",
        "AI answer engine optimization",
        "ChatGPT visibility for businesses",
        "Perplexity citation optimization",
        "Claude retrieval optimization",
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
      name: "DevQueens | Automation, AI, and Marketing",
      url: "https://www.devqueens.us/",
      image: "https://www.devqueens.us/og-image.jpg",
      provider: { "@id": "https://www.devqueens.us/#organization" },
      areaServed: "Worldwide",
      serviceType:
        "Process automation, AI agent development, and AI marketing for companies that want fewer manual hours and more revenue.",
      description:
        "Three lines of work. Process automation ($5K to $20K). AI agent surface ($10K to $25K). AI marketing (from $1.5K setup + $300 per month). Entry via a $3K to $7K paid proof of concept in 5 to 10 days. Public prices, fixed scope, fixed timeline.",
      priceRange: "$1500 - $25000",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "DevQueens Services",
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
              name: "Paid Proof of Concept",
              description:
                "5 to 10 days. One real action against the customer's real data: an invoice reconciled against a purchase order, a booking placed through the API, or a lead captured from an agent conversation. Priced to filter serious buyers, never free.",
            },
          },
          {
            "@type": "Offer",
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
              minPrice: 5000,
              maxPrice: 20000,
            },
            itemOffered: {
              "@type": "Service",
              name: "Process Automation Build",
              description:
                "4 to 6 weeks. Production automation that drains manual hours. Three way invoice matching with supporting evidence attached. Exception routing. Reconciliation and approval flows. Handles 800 invoices a month, 90,000 cases a month, or whatever the customer's real volume is.",
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
              name: "AI Agent Surface",
              description:
                "3 to 5 weeks. Full agent surface against the customer's API: availability, booking, cancellation, payment, refund. Delivered into OpenAI Operator, Claude computer use, ChatGPT, and WhatsApp Business. Meta WhatsApp Business platform review, Braintrust or Langfuse evals, cost caps, and a runbook.",
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
              name: "Ops Retainer",
              description:
                "Monthly retainer covering OAuth token rotation, API schema drift, model release regressions that break tuned prompts, platform policy changes, eval maintenance including security evals, and monthly security reviews. No emergency statements of work and no scope creep bills.",
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
              name: "AI Marketing Audit and Restructure",
              description:
                "Audit and restructure the business's hours, prices, catalog, availability, policies, and profiles so ChatGPT, Gemini, Perplexity, Claude, and the WhatsApp agents the customer's buyers already use represent the business correctly.",
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
              name: "AI Marketing Monthly Monitoring",
              description:
                "Ongoing monthly monitoring of how the business appears inside ChatGPT, Gemini, Perplexity, Claude, and WhatsApp agents, with alerts when representation drifts.",
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
            text: "DevQueens ships three deliverables for the same company: process automation that drains manual hours, AI agents that transact against the customer's product, and AI marketing that puts the business inside ChatGPT, Claude, and Perplexity where buyers now search. Every build is tailored to the specific company.",
          },
        },
        {
          "@type": "Question",
          name: "How much does DevQueens cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Public pricing. Paid proof of concept: $3,000 to $7,000 in 5 to 10 days. Production automation build: $5,000 to $20,000 in 4 to 6 weeks. Production AI agent connector: $10,000 to $25,000 in 3 to 5 weeks. AI marketing audit from $1,500 with optional $300 per month monitoring. Ops retainer $1,500 to $3,000 per month after production goes live.",
          },
        },
        {
          "@type": "Question",
          name: "How fast can DevQueens ship an automation or AI agent?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A paid proof of concept ships in 5 to 10 days. A production automation ships in 4 to 6 weeks. A production AI agent connector ships in 3 to 5 weeks, including Meta WhatsApp Business platform review and Braintrust or Langfuse evals.",
          },
        },
        {
          "@type": "Question",
          name: "Why does every DevQueens engagement start paid?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The price is the filter. A free proof of concept attracts window shoppers who cost time. A paid proof of concept in the $3,000 to $7,000 band filters for buyers who have real manual hours to automate or a real agent surface to build, and it lets the team watch the thing actually work against the customer's data before anyone commits to production.",
          },
        },
        {
          "@type": "Question",
          name: "How does DevQueens price its work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Public prices, fixed scope, fixed timeline. The anchor is what you capture, not what we clock. An automation that clears 800 invoices a month returns 40 approver hours a week. An AI agent that captures 50 bookings a week unlocks real revenue. A profile audit that makes your business legible to ChatGPT turns searches into clients.",
          },
        },
        {
          "@type": "Question",
          name: "What is included in the DevQueens ops retainer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The monthly retainer covers OAuth token rotation, API schema drift, model release regressions that break tuned prompts, platform policy changes, eval maintenance including the security evals, and monthly security reviews. No emergency statements of work and no scope creep bills.",
          },
        },
        {
          "@type": "Question",
          name: "Does DevQueens offer custom solutions per company?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Every build is tailored to the specific company. The three lines, process automation, AI agent surface, and AI marketing, are not shelf products: they are the three deliverables DevQueens builds around what the company already does and already has.",
          },
        },
        {
          "@type": "Question",
          name: "What makes DevQueens different from other AI agencies?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most agencies do one of the three lines, automation, AI agents, or AI marketing, and the three never talk to each other. DevQueens delivers all three under one roof so the data model, schemas, catalog, pricing, and voice stay consistent across the automation that drains manual hours, the agent that transacts on the product, and the marketing that puts the business in front of the buyer.",
          },
        },
      ],
    },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
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
        {children}
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
