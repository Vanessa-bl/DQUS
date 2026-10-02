import type { Metadata } from "next";
import { Services } from "@/src/screens/Services";

export const metadata: Metadata = {
  title: "Services — AI Prototypes, Rescue, Agent Workflows",
  description:
    "Services from DevQueens: build new AI prototypes, rescue broken ones, and wire agent workflows for chatbots, copilots, RAG apps, and multi-agent systems.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <Services />;
}
