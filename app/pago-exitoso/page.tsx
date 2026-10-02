import type { Metadata } from "next";
import { PaymentSuccess } from "@/src/screens/PaymentSuccess";

export const metadata: Metadata = {
  title: "Pago Exitoso",
  description: "Tu pago se ha procesado correctamente.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/pago-exitoso" },
};

export default function PagoExitosoPage() {
  return <PaymentSuccess locale="es" />;
}
