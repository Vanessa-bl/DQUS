import type { Metadata } from "next";
import { ConversionAudit } from "@/src/screens/ConversionAudit";

export const metadata: Metadata = {
  title: "Auditoría de Conversión",
  description:
    "Auditoría experta única de UX, rendimiento técnico y claridad de copy para identificar exactamente dónde estás perdiendo clientes.",
  alternates: {
    canonical: "/es/conversion-audit",
    languages: {
      en: "/conversion-audit",
      es: "/es/conversion-audit",
    },
  },
};

export default function ConversionAuditEsPage() {
  return <ConversionAudit locale="es" />;
}
