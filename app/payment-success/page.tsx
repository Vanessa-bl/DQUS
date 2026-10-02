import type { Metadata } from "next";
import { PaymentSuccess } from "@/src/screens/PaymentSuccess";

export const metadata: Metadata = {
  title: "Payment Successful",
  description: "Your payment has been processed successfully.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/payment-success" },
};

export default function PaymentSuccessPage() {
  return <PaymentSuccess locale="en" />;
}
