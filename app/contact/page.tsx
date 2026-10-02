import type { Metadata } from "next";
import { Contact } from "@/src/screens/Contact";

export const metadata: Metadata = {
  title: "Contact — Start an AI Prototype or Rescue",
  description:
    "Contact DevQueens to start a new AI prototype, rescue a broken one, or wire an agent workflow. Founders, product teams, and startups welcome.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <Contact />;
}
