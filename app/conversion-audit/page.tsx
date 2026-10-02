import type { Metadata } from "next";
import { ConversionAudit } from "@/src/screens/ConversionAudit";

export const metadata: Metadata = {
  title: "Conversion Audit",
  description:
    "A one-time, expert audit of your website's UX, technical performance, and copy clarity to identify exactly where you are losing customers.",
  alternates: {
    canonical: "/conversion-audit",
    languages: {
      en: "/conversion-audit",
      es: "/es/conversion-audit",
    },
  },
};

export default function ConversionAuditPage() {
  return <ConversionAudit locale="en" />;
}
