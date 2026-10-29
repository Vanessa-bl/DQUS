/**
 * Shared content for the two vertical landing pages.
 *
 * One offer, two buyer contexts: process automation for companies that need
 * hours back from repetitive work. Keep the structure and the promise in sync.
 */

export type LandingVertical = "accounting" | "real-estate";

export type HeroStep = { label: string; body: string };

export type WorkflowCard = {
  number: string;
  title: string;
  body: string;
  agent: string;
  human: string;
};

export type ProcessStep = { day: string; title: string; body: string };

export type FaqItem = { q: string; a: string };

export type CalculatorInput = {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  prefix?: string;
  suffix?: string;
};

export type LandingContent = {
  vertical: LandingVertical;
  verticalLabel: string;
  meta: { title: string; description: string; ogAlt: string };
  auditHref: string;
  nav: {
    links: { label: string; href: string }[];
    cta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    secondaryHref: string;
    proof: string[];
    card: {
      header: string;
      status: string;
      steps: HeroStep[];
      result: string;
      badge: string;
    };
    stackLabel: string;
    stack: string[];
  };
  problem: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    lede: string;
    items: { number: string; title: string; body: string }[];
  };
  workflows: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    lede: string;
    items: WorkflowCard[];
  };
  process: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    lede: string;
    steps: ProcessStep[];
    note: string;
  };
  offer: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    lede: string;
    price: string;
    priceNote: string;
    includes: string[];
    risk: string;
    cta: string;
  };
  calculator: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    lede: string;
    inputs: CalculatorInput[];
    outputLabel: string;
    footnote: string;
  };
  proof: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    lede: string;
    cases: {
      value: string;
      label: string;
      source: string;
      href: string;
      cta: string;
    }[];
    points: { title: string; body: string }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    items: FaqItem[];
  };
  final: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    body: string;
    cta: string;
    email: string;
    note: string;
  };
  footer: {
    tagline: string;
    links: { label: string; href: string }[];
    location: string;
    email: string;
  };
};

export const CONTACT_EMAIL = "hello@devqueens.us";

const mailto = (subject: string, body: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const accountingAuditHref = mailto(
  "Free process audit: Accounting firm",
  [
    "Hi DevQueens,",
    "",
    "I'd like to book a free 20-minute process audit.",
    "",
    "Firm:",
    "Team size:",
    "Most repetitive process:",
    "Current stack (practice management, inbox, docs):",
    "",
    "Thanks,",
  ].join("\n"),
);

const realEstateAuditHref = mailto(
  "Free process audit: Real estate team",
  [
    "Hi DevQueens,",
    "",
    "I'd like to book a free 20-minute process audit.",
    "",
    "Brokerage / team:",
    "Agents:",
    "Most repetitive process:",
    "Current stack (CRM, calendar, transaction tools):",
    "",
    "Thanks,",
  ].join("\n"),
);

export const accountingLanding: LandingContent = {
  vertical: "accounting",
  verticalLabel: "Accounting firms",
  meta: {
    title: "Process Automation for Accounting Firms | DevQueens",
    description:
      "DevQueens automates the repetitive work inside accounting firms: document chase, client onboarding, inbox triage, and month-end prep. Automated processes from $190 a month. Free 20-minute process audit. No setup fee.",
    ogAlt: "Process automation for accounting firms | DevQueens",
  },
  auditHref: accountingAuditHref,
  nav: {
    links: [
      { label: "What we automate", href: "#workflows" },
      { label: "How it works", href: "#process" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Book a free process audit",
  },
  hero: {
    eyebrow: "Process automation for accounting firms",
    title: "Stop paying for work",
    titleAccent: "that repeats itself.",
    subtitle:
      "Your firm is at capacity because your best people spend the week on document chase, status emails, and manual prep. We automate those processes end to end, so the hours go back to the work clients pay for.",
    primaryCta: "Book a free process audit",
    secondaryCta: "See the 5-day plan",
    secondaryHref: "#process",
    proof: [
      "Free 20-minute process audit",
      "Working automation in 5 to 10 days",
      "No setup fee.",
    ],
    card: {
      header: "Process run: Invoice intake",
      status: "LIVE",
      steps: [
        {
          label: "Trigger",
          body: "127 invoices land in the AP inbox.",
        },
        {
          label: "Extract",
          body: "Vendor, amount, PO, and due date are pulled and matched.",
        },
        {
          label: "Exceptions",
          body: "3 mismatches routed with the source pages attached.",
        },
        {
          label: "Approval",
          body: "Controller approves. The ERP is updated.",
        },
      ],
      result: "9 minutes, 127 invoices processed, 0 manual entry.",
      badge: "Exceptions go to a person",
    },
    stackLabel: "Built into the tools you already run",
    stack: [
      "QuickBooks",
      "Xero",
      "Karbon",
      "TaxDome",
      "Outlook",
      "Gmail",
      "Slack",
    ],
  },
  problem: {
    eyebrow: "The real constraint",
    title: "The capacity crunch",
    titleAccent: "is a process problem.",
    lede: "You can't hire your way out of work that shouldn't exist. Every manual handoff adds days to onboarding and hours to busy season.",
    items: [
      {
        number: "01",
        title: "Partners are stuck reviewing work.",
        body: "Senior time goes to document chase, status updates, and cleanup. The highest-value conversations wait.",
      },
      {
        number: "02",
        title: "Every new client starts with a scavenger hunt.",
        body: "Missing W-2s, 1099s, statements, and signatures turn onboarding into a week of follow-ups.",
      },
      {
        number: "03",
        title: "Busy season turns your best people into inbox managers.",
        body: "The same questions, the same status updates, the same copy-paste replies while the queue keeps growing.",
      },
    ],
  },
  workflows: {
    eyebrow: "What we automate",
    title: "Four processes.",
    titleAccent: "One at a time.",
    lede: "We pick the process that costs you the most hours and has the cleanest success criteria.",
    items: [
      {
        number: "01",
        title: "Invoice & document intake",
        body: "The automation reads invoices, statements, and receipts, extracts the data, matches it to the right client, and routes only the exceptions to your team.",
        agent: "Reads, extracts, matches, and files every document.",
        human: "Approves exceptions and the final post.",
      },
      {
        number: "02",
        title: "Client onboarding & document chase",
        body: "It checks the client's checklist, sends one clear request, and follows up until the file is complete without anyone remembering to chase.",
        agent: "Tracks what's missing, drafts the request, and follows up.",
        human: "Approves the request and handles exceptions.",
      },
      {
        number: "03",
        title: "Inbox triage & client status",
        body: "Every client email is classified, routine replies are drafted, and the threads that need a person are routed to the right teammate.",
        agent: "Classifies, drafts, routes, and logs every thread.",
        human: "Reviews client-facing replies and escalations.",
      },
      {
        number: "04",
        title: "Month-end close prep",
        body: "Reconciliations, anomaly flags, and workpapers are assembled before your team opens the file.",
        agent: "Matches transactions, flags exceptions, prepares workpapers.",
        human: "Signs off on the close.",
      },
    ],
  },
  process: {
    eyebrow: "How it works",
    title: "From audit to a working automation",
    titleAccent: "in 5 days.",
    lede: "We map one process, define what success looks like, and build it.",
    steps: [
      {
        day: "Day 0",
        title: "Free 20-minute audit",
        body: "We map the process, count the hours, and agree on what “working” means.",
      },
      {
        day: "Days 1 to 5",
        title: "Build the automation",
        body: "We connect your inbox, docs, and practice tools. We test it on real examples in a sandbox.",
      },
      {
        day: "Days 6 to 10",
        title: "Run it live",
        body: "Your team reviews exceptions. We measure against the success criteria. You decide whether to go to production.",
      },
    ],
    note: "Most processes go live in 5 to 10 days. No setup fee.",
  },
  offer: {
    eyebrow: "The product",
    title: "Automated processes",
    titleAccent: "from $190 a month.",
    lede: "One process, running in your stack, for a flat monthly fee.",
    price: "From $190",
    priceNote: "per month. No setup fee.",
    includes: [
      "One process automated end to end",
      "Connected to your inbox, docs, and tools",
      "Hosted, monitored, and maintained",
      "Approval step where a person is needed",
      "Monthly report on hours saved",
    ],
    risk: "No setup fee. Cancel anytime. Add another process when you're ready.",
    cta: "Start with one process",
  },
  calculator: {
    eyebrow: "The math",
    title: "What is repetitive work",
    titleAccent: "costing you?",
    lede: "A conservative estimate. We validate the real number in the audit.",
    inputs: [
      {
        id: "hours",
        label: "Hours per week your team spends on repetitive work",
        min: 5,
        max: 120,
        step: 5,
        defaultValue: 30,
        suffix: "hrs",
      },
      {
        id: "rate",
        label: "Loaded hourly cost",
        min: 25,
        max: 200,
        step: 5,
        defaultValue: 65,
        prefix: "$",
      },
    ],
    outputLabel: "Estimated annual cost of repetitive work",
    footnote:
      "Estimate only. Based on 52 working weeks. Your audit replaces this with your actual numbers.",
  },
  proof: {
    eyebrow: "Proof",
    title: "Built by people who ship,",
    titleAccent: "See for yourself.",
    lede: "We've shipped automation that replaced manual triage, routing, and follow-up. Here's one.",
    cases: [
      {
        value: "42m to 4m",
        label: "Mean time to acknowledge an incident",
        source:
          "After we automated triage and on-call routing for an IT operations team.",
        href: "/results/incident-automation-ops",
        cta: "Read the case study",
      },
    ],
    points: [
      {
        title: "Senior builders only.",
        body: "The people who scope the work are the people who build it.",
      },
      {
        title: "Your data stays yours.",
        body: "The automation runs in your tools, with your accounts and your data.",
      },
      {
        title: "Your team stays in control.",
        body: "The automation prepares. Your team approves anything client-facing.",
      },
    ],
  },
  faq: {
    eyebrow: "Honest answers",
    title: "What managing partners",
    titleAccent: "ask us first.",
    items: [
      {
        q: "What counts as a repetitive process?",
        a: "Any task your team does the same way more than a few times a week: re-keying data, chasing documents, sending status updates, building the same report, routing the same kind of email. If it has a clear trigger and a clear finish line, it can usually be automated.",
      },
      {
        q: "How do you choose what to automate first?",
        a: "We look for work that repeats often, has a clear trigger and finish line, and eats the most hours. That's where the return comes fastest. If a process isn't worth automating, we'll tell you.",
      },
      {
        q: "Will it work with our practice management software?",
        a: "We build into the stack you already run: QuickBooks, Xero, Karbon, TaxDome, Outlook, Gmail, Slack, and most tools with an API. If there's no API, we'll tell you before you pay.",
      },
      {
        q: "What about client confidentiality?",
        a: "We use least-privilege access, keep data in your systems wherever possible, and log every step. We don't use your client data to train anything.",
      },
      {
        q: "Who approves the work?",
        a: "Your team. The automation prepares and drafts; a person approves anything client-facing. You can automate more later, process by process.",
      },
      {
        q: "What if it doesn't work?",
        a: "We agree on the success criteria before we start. If the first process doesn't hit them, you can cancel. No setup fee, no long contract.",
      },
      {
        q: "How do we start?",
        a: "Book a free 20-minute audit. Bring one process. We'll tell you if it's worth automating, and what it would take.",
      },
    ],
  },
  final: {
    eyebrow: "Start today",
    title: "Bring one process.",
    titleAccent: "Leave with a plan.",
    body: "In 20 minutes, we'll map the process, estimate the hours, and tell you whether automation is the right fix. If it is, we can start this week.",
    cta: "Book the free audit",
    email: CONTACT_EMAIL,
    note: "It's free, there's no deck, and we reply within one business day.",
  },
  footer: {
    tagline: "Process automation studio for accounting firms.",
    links: [
      { label: "Services", href: "/services" },
      { label: "Selected work", href: "/results" },
      { label: "About", href: "/about" },
    ],
    location: "Miami, FL. Working across the US.",
    email: CONTACT_EMAIL,
  },
};

export const realEstateLanding: LandingContent = {
  vertical: "real-estate",
  verticalLabel: "Real estate teams",
  meta: {
    title: "Process Automation for Real Estate Teams | DevQueens",
    description:
      "DevQueens automates the repetitive work inside real estate teams: lead follow-up, showing scheduling, transaction coordination, and reporting. Automated processes from $190 a month. Free 20-minute process audit. No setup fee.",
    ogAlt: "Process automation for real estate teams | DevQueens",
  },
  auditHref: realEstateAuditHref,
  nav: {
    links: [
      { label: "What we automate", href: "#workflows" },
      { label: "How it works", href: "#process" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Book a free process audit",
  },
  hero: {
    eyebrow: "Process automation for real estate teams",
    title: "Stop paying for work",
    titleAccent: "that repeats itself.",
    subtitle:
      "Your agents are in showings all day. We automate the repetitive work around every deal: lead follow-up, scheduling, transaction admin, and reporting. Your team spends its time selling.",
    primaryCta: "Book a free process audit",
    secondaryCta: "See the 5-day plan",
    secondaryHref: "#process",
    proof: [
      "Free 20-minute process audit",
      "Working automation in 5 to 10 days",
      "No setup fee.",
    ],
    card: {
      header: "Process run: New lead at 11:47 pm",
      status: "LIVE",
      steps: [
        {
          label: "Trigger",
          body: "Meta lead: “Looking for a 3-bed in Austin under $650k.”",
        },
        {
          label: "Qualify",
          body: "Timeline, budget, and financing asked in one thread.",
        },
        {
          label: "Schedule",
          body: "Two showing slots offered from the agent's calendar.",
        },
        {
          label: "CRM",
          body: "Logged in Follow Up Boss. The agent is notified.",
        },
      ],
      result: "58 seconds, showing booked, CRM updated.",
      badge: "Your agent closes",
    },
    stackLabel: "Built into the tools you already run",
    stack: [
      "Follow Up Boss",
      "kvCORE",
      "Salesforce",
      "HubSpot",
      "Google Calendar",
      "DocuSign",
      "Gmail",
    ],
  },
  problem: {
    eyebrow: "The real constraint",
    title: "Speed is the product.",
    titleAccent: "Most teams lose the lead before the first reply.",
    lede: "Your agents can't answer at 11:47 pm, and the best lead of the month won't wait until Monday.",
    items: [
      {
        number: "01",
        title: "Your agents are busy showing homes.",
        body: "The lead arrives while everyone is driving, showing, or closing. The first five minutes decide who gets the conversation.",
      },
      {
        number: "02",
        title: "A lead that waits is a lead your competitor already called.",
        body: "Speed-to-lead is the whole game. Most teams lose it in the first five minutes, long before the offer.",
      },
      {
        number: "03",
        title: "Follow-up dies in the CRM.",
        body: "The first text goes out. The second, third, and fourth never do. The pipeline looks healthy until you count the no-replies.",
      },
    ],
  },
  workflows: {
    eyebrow: "What we automate",
    title: "Four processes.",
    titleAccent: "One at a time.",
    lede: "Start with the process that protects the most revenue. Usually, it's the first five minutes.",
    items: [
      {
        number: "01",
        title: "Speed-to-lead & qualification",
        body: "The automation replies in seconds, asks the four questions that matter, and routes the lead to the right agent.",
        agent: "Replies, qualifies budget/timeline/financing, and routes the lead.",
        human: "Takes over the conversation when it's ready.",
      },
      {
        number: "02",
        title: "Showing scheduling & confirmations",
        body: "It offers real calendar slots, books the showing, confirms, and reschedules no-shows.",
        agent: "Offers slots, books, confirms, and reschedules.",
        human: "Shows the home.",
      },
      {
        number: "03",
        title: "Transaction coordination",
        body: "It tracks deadlines, documents, inspections, and vendors, and flags anything at risk.",
        agent: "Tracks deadlines, requests docs, and nudges vendors.",
        human: "Approves contracts and disclosures.",
      },
      {
        number: "04",
        title: "Listing & reporting admin",
        body: "Listing copy, social posts, and weekly seller reports are drafted from your CRM data.",
        agent: "Drafts copy, schedules follow-up, and builds the weekly report.",
        human: "Approves the brand voice and sends.",
      },
    ],
  },
  process: {
    eyebrow: "How it works",
    title: "From audit to a working automation",
    titleAccent: "in 5 days.",
    lede: "We map one process, define what success looks like, and build it.",
    steps: [
      {
        day: "Day 0",
        title: "Free 20-minute audit",
        body: "We map your lead flow, count the minutes to first response, and agree on success.",
      },
      {
        day: "Days 1 to 5",
        title: "Build the automation",
        body: "We connect your CRM, calendar, and inbox. We test the qualification script on real leads in a sandbox.",
      },
      {
        day: "Days 6 to 10",
        title: "Run it live",
        body: "The automation works real leads with your team reviewing exceptions. We measure response time, appointments, and handoffs.",
      },
    ],
    note: "Most processes go live in 5 to 10 days. No setup fee.",
  },
  offer: {
    eyebrow: "The product",
    title: "Automated processes",
    titleAccent: "from $190 a month.",
    lede: "One process, running in your stack, for a flat monthly fee.",
    price: "From $190",
    priceNote: "per month. No setup fee.",
    includes: [
      "One process automated end to end",
      "Connected to your CRM, calendar, and inbox",
      "Hosted, monitored, and maintained",
      "Human handoff where it matters",
      "Monthly report on hours saved",
    ],
    risk: "No setup fee. Cancel anytime. Add another process when you're ready.",
    cta: "Start with one process",
  },
  calculator: {
    eyebrow: "The math",
    title: "What is repetitive work",
    titleAccent: "costing you?",
    lede: "A conservative estimate. We validate your numbers in the audit.",
    inputs: [
      {
        id: "hours",
        label: "Hours per week your team spends on repetitive work",
        min: 5,
        max: 120,
        step: 5,
        defaultValue: 25,
        suffix: "hrs",
      },
      {
        id: "rate",
        label: "Loaded hourly cost",
        min: 25,
        max: 200,
        step: 5,
        defaultValue: 55,
        prefix: "$",
      },
    ],
    outputLabel: "Estimated annual cost of repetitive work",
    footnote:
      "Illustrative estimate. Based on 52 working weeks. Your audit replaces this with your actual numbers.",
  },
  proof: {
    eyebrow: "Proof",
    title: "Built by people who ship,",
    titleAccent: "See for yourself.",
    lede: "We've shipped automation that cut response time from 42 minutes to 4, and security work for a real estate marketplace. Here are two.",
    cases: [
      {
        value: "42m to 4m",
        label: "Mean time to acknowledge an incident",
        source:
          "After we automated triage and on-call routing for an IT operations team.",
        href: "/results/incident-automation-ops",
        cta: "Read the case study",
      },
      {
        value: "100%",
        label: "OWASP top-10 attempts blocked",
        source:
          "In a production red-team drill for a real estate marketplace before its Series B.",
        href: "/results/real-estate-portal-security",
        cta: "Read the case study",
      },
    ],
    points: [
      {
        title: "Senior builders only.",
        body: "The people who scope the work are the people who build it.",
      },
      {
        title: "Your data stays yours.",
        body: "The automation runs in your tools, with your accounts and your data.",
      },
      {
        title: "Your team stays in control.",
        body: "The automation qualifies and schedules. Your licensed agents close.",
      },
    ],
  },
  faq: {
    eyebrow: "Honest answers",
    title: "What brokerage leaders",
    titleAccent: "ask us first.",
    items: [
      {
        q: "What counts as a repetitive process?",
        a: "Any task your team does the same way more than a few times a week: answering the same lead questions, booking showings, chasing documents, updating the CRM, building the same report. If it has a clear trigger and a clear finish line, it can usually be automated.",
      },
      {
        q: "Will it work with our CRM?",
        a: "We build into Follow Up Boss, kvCORE, Salesforce, HubSpot, Google Calendar, DocuSign, Gmail, and most tools with an API. If there's no API, we'll tell you before you pay.",
      },
      {
        q: "Will it text leads without consent?",
        a: "No. We build consent capture and opt-out handling into the flow. TCPA compliance is built into the design from the start.",
      },
      {
        q: "Will it sound like a robot?",
        a: "It writes in your team's voice, with your scripts and rules. Your agents can take over at any point.",
      },
      {
        q: "What about Fair Housing?",
        a: "The automation doesn't steer, filter, or make discriminatory recommendations. We constrain the qualification questions and review the flow with you before launch.",
      },
      {
        q: "Does it negotiate or sign contracts?",
        a: "No. It qualifies, schedules, and coordinates. Offers, contracts, and disclosures stay with your licensed agents.",
      },
      {
        q: "What if it doesn't work?",
        a: "We agree on the success criteria before we start. If the first process doesn't hit them, you can cancel. No setup fee, no long contract.",
      },
      {
        q: "How do we start?",
        a: "Book a free 20-minute audit. Bring one process. We'll tell you if it's worth automating, and what it would take.",
      },
    ],
  },
  final: {
    eyebrow: "Start today",
    title: "Bring one process.",
    titleAccent: "Leave with a plan.",
    body: "In 20 minutes, we'll map the process, estimate the upside, and tell you whether automation is the right fix. If it is, we can start this week.",
    cta: "Book the free audit",
    email: CONTACT_EMAIL,
    note: "It's free, there's no deck, and we reply within one business day.",
  },
  footer: {
    tagline: "Process automation studio for real estate teams.",
    links: [
      { label: "Services", href: "/services" },
      { label: "Selected work", href: "/results" },
      { label: "About", href: "/about" },
    ],
    location: "Miami, FL. Working across the US.",
    email: CONTACT_EMAIL,
  },
};

export const agenticLandings: Record<LandingVertical, LandingContent> = {
  accounting: accountingLanding,
  "real-estate": realEstateLanding,
};
