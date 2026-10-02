import type { Metadata } from "next";
import { AccountantsLanding } from "@/src/screens/AccountantsLanding";

export const metadata: Metadata = {
  title: "Accountants — Professional Websites",
  description:
    "Custom professional websites for accountants: designed to convey trust, attract new clients, and position you as a market reference.",
  alternates: {
    canonical: "/accountants",
    languages: {
      en: "/accountants",
      es: "/contadores",
    },
  },
};

export default function AccountantsPage() {
  return <AccountantsLanding />;
}
