import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useLenis } from "./hooks/useLenis";
import { Home } from "./pages/home";
import { Services } from "./pages/Services";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { ConversionAudit } from "./pages/ConversionAudit";
import { AccountantsLanding } from "./pages/AccountantsLanding";
import { PaymentSuccess } from "./pages/PaymentSuccess";
import { PaymentError } from "./pages/PaymentError";

const LenisController: React.FC = () => {
  const location = useLocation();
  const disableLenis =
    location.pathname === "/conversion-audit" ||
    location.pathname === "/es/conversion-audit" ||
    location.pathname === "/pago-exitoso" ||
    location.pathname === "/payment-success" ||
    location.pathname === "/pago-error" ||
    location.pathname === "/payment-error";

  useLenis(!disableLenis);

  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <LenisController />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/conversion-audit" element={<ConversionAudit locale="en" />} />
        <Route path="/es/conversion-audit" element={<ConversionAudit locale="es" />} />
        <Route path="/contadores" element={<AccountantsLanding />} />
        <Route path="/accountants" element={<AccountantsLanding />} />
        <Route path="/pago-exitoso" element={<PaymentSuccess locale="es" />} />
        <Route path="/payment-success" element={<PaymentSuccess locale="en" />} />
        <Route path="/pago-error" element={<PaymentError locale="es" />} />
        <Route path="/payment-error" element={<PaymentError locale="en" />} />
      </Routes>
    </BrowserRouter>
  );
}
