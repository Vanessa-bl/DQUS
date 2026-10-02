import type { Metadata } from "next";
import { PaymentError } from "@/src/screens/PaymentError";

export const metadata: Metadata = {
  title: "Payment Error",
  description: "There was an issue processing your payment. Please try again.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/payment-error" },
};

export default function PaymentErrorPage() {
  return <PaymentError locale="en" />;
}
