import type { Metadata } from "next";
import { PaymentError } from "@/src/screens/PaymentError";

export const metadata: Metadata = {
  title: "Error en el Pago",
  description: "Hubo un problema al procesar tu pago. Por favor, intenta de nuevo.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/pago-error" },
};

export default function PagoErrorPage() {
  return <PaymentError locale="es" />;
}
