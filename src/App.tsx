import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useLenis } from "./hooks/useLenis";
import { Home } from "./pages/home";
import { Services } from "./pages/Services";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";

export default function App() {
  useLenis();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
