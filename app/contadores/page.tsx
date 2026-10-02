import type { Metadata } from "next";
import { AccountantsLanding } from "@/src/screens/AccountantsLanding";

export const metadata: Metadata = {
  title: "Contadores — Sitios Web Profesionales",
  description:
    "Sitios web profesionales personalizados para contadores: diseñados para transmitir confianza, atraer nuevos clientes y posicionarte como referente.",
  alternates: {
    canonical: "/contadores",
    languages: {
      en: "/accountants",
      es: "/contadores",
    },
  },
};

export default function ContadoresPage() {
  return <AccountantsLanding />;
}
