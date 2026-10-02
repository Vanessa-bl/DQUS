import type { Metadata } from "next";
import { About } from "@/src/screens/About";

export const metadata: Metadata = {
  title: "About — Senior AI Prototype Studio",
  description:
    "DevQueens is a senior AI studio focused on shipping AI prototypes, rescuing broken ones, and wiring the agent workflows behind them.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <About />;
}
