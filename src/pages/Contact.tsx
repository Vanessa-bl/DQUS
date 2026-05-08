import React, { useState } from "react";
import { motion } from "framer-motion";
import "./pageStyles.css";
import { Layout } from "./layout";
import { useT } from "../i18n/useT";

const badgeStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
  background: "var(--pill-bg)",
  color: "var(--pill-text)",
  fontFamily: "'Nunito Sans', sans-serif",
  fontSize: "0.78rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding: "0.4rem 1rem",
  borderRadius: "999px",
  width: "fit-content",
};

const inputStyle: React.CSSProperties = {
  fontFamily: "'Nunito Sans', sans-serif",
  fontSize: "0.95rem",
  padding: "0.85rem 1rem",
  border: "1px solid var(--feature-pill-border)",
  borderRadius: "12px",
  background: "var(--feature-pill-bg)",
  color: "var(--card-text)",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  width: "100%",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'Nunito Sans', sans-serif",
  fontSize: "0.85rem",
  fontWeight: 600,
  color: "var(--card-text-regular)",
  letterSpacing: "0.01em",
};

export const Contact: React.FC = () => {
  const isMobile = window.innerWidth < 768;
  const t = useT();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mensaje enviado! Gracias por contactarnos.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Layout>
      <section
        aria-labelledby="contact-hero-title"
        style={{
          maxWidth: "1280px",
          margin: "80px auto 0",
          padding: "5rem 3rem 4rem",
          background: "var(--card-bg)",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "680px" }}
        >
          <span style={badgeStyle}>{t("contact.hero.badge", "CONTACT US")}</span>

          <h1
            id="contact-hero-title"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 800,
              fontSize: isMobile ? "2rem" : "clamp(2.2rem, 3.5vw, 3rem)",
              lineHeight: 1.1,
              color: "var(--card-text)",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            {t("contact.hero.title.line1", "Get In")}
            <br />
            <span
              style={{
                color: "var(--card-text)",
                position: "relative",
                display: "inline-block",
              }}
            >
              {t("contact.hero.title.line2", "Touch")}
            </span>
          </h1>

          <p
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "var(--card-text-regular)",
              margin: 0,
            }}
          >
            ¿Tienes preguntas? ¡Nos encantaría saber de ti! Completa el
            formulario y te responderemos lo antes posible.
          </p>
        </motion.div>
      </section>

      <section
        aria-labelledby="contact-form-title"
        style={{
          maxWidth: "1280px",
          margin: "80px auto 0",
          padding: "5rem 3rem 4rem",
          background: "var(--card-bg)",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <h2 id="contact-form-title" className="sr-only">
          Contact Form
        </h2>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            maxWidth: "600px",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label htmlFor="name" style={labelStyle}>{t("contact.form.name.label", "Name")}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder={t("contact.form.name.placeholder", "Your name")}
              style={inputStyle}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(124,127,198,0.5)";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,127,198,0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--feature-pill-border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label htmlFor="email" style={labelStyle}>{t("contact.form.email.label", "Email")}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder={t("contact.form.email.placeholder", "Your email address")}
              style={inputStyle}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(124,127,198,0.5)";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,127,198,0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--feature-pill-border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label htmlFor="message" style={labelStyle}>{t("contact.form.message.label", "Message")}</label>
            <textarea
              id="message"
              name="message"
              rows={isMobile ? 5 : 8}
              value={form.message}
              onChange={handleChange}
              required
              placeholder={t("contact.form.message.placeholder", "Write your message here")}
              style={{
                ...inputStyle,
                resize: "vertical",
                minHeight: "120px",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(124,127,198,0.5)";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,127,198,0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--feature-pill-border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 700,
              color: "var(--btn-text)",
              background: "var(--btn-bg)",
              border: "none",
              borderRadius: "999px",
              padding: "0.85rem 2.25rem",
              cursor: "pointer",
              letterSpacing: "0.01em",
              width: "fit-content",
              transition: "transform 0.2s ease, opacity 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            {t("contact.form.submit", "Send Message")}
          </button>
        </motion.form>
      </section>
    </Layout>
  );
};
