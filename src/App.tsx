import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import { Home } from "./pages/home";
import { Services } from "./pages/Services";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";

const LazyConversionAudit = lazy(() =>
  import("./pages/ConversionAudit").then((m) => ({ default: m.ConversionAudit }))
);
const LazyAccountantsLanding = lazy(() =>
  import("./pages/AccountantsLanding").then((m) => ({ default: m.AccountantsLanding }))
);
const LazyPaymentSuccess = lazy(() =>
  import("./pages/PaymentSuccess").then((m) => ({ default: m.PaymentSuccess }))
);
const LazyPaymentError = lazy(() =>
  import("./pages/PaymentError").then((m) => ({ default: m.PaymentError }))
);

const PageFallback = () => (
  <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ width: "32px", height: "32px", border: "3px solid var(--feature-pill-border)", borderTopColor: "#c2410c", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/conversion-audit" element={<LazyConversionAudit locale="en" />} />
          <Route path="/es/conversion-audit" element={<LazyConversionAudit locale="es" />} />
          <Route path="/contadores" element={<LazyAccountantsLanding />} />
          <Route path="/accountants" element={<LazyAccountantsLanding />} />
          <Route path="/pago-exitoso" element={<LazyPaymentSuccess locale="es" />} />
          <Route path="/payment-success" element={<LazyPaymentSuccess locale="en" />} />
          <Route path="/pago-error" element={<LazyPaymentError locale="es" />} />
          <Route path="/payment-error" element={<LazyPaymentError locale="en" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
