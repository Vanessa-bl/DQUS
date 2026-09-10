import React, { useState } from "react";
import { motion } from "framer-motion";
import "./pageStyles.css";
import { Layout } from "./layout";
import { useT } from "../i18n/useT";

export const Contact: React.FC = () => {
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
    alert(t("contact.form.sent", "Message sent! Thanks for reaching out."));
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Layout darkHeader>
      <section className="page-section" aria-labelledby="contact-hero-title">
        <motion.div
          className="page-block"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="page-badge">{t("contact.hero.badge", "CONTACT US")}</span>

          <h1 id="contact-hero-title" className="page-title page-title--xl">
            {t("contact.hero.title.line1", "Contact")}{" "}
            <span className="page-title-mark">
              {t("contact.hero.title.line2", "Us")}
            </span>
          </h1>

          <p className="page-lede">
            {t(
              "contact.hero.lede",
              "Have questions? We would love to hear from you. Fill in the form and we will get back to you as soon as possible."
            )}
          </p>
        </motion.div>
      </section>

      <section className="page-section page-section--flush-top" aria-labelledby="contact-form-title">
        <h2 id="contact-form-title" className="sr-only">
          {t("contact.form.title", "Contact Form")}
        </h2>
        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="contact-form-group">
            <label htmlFor="name" className="contact-form-label">
              {t("contact.form.name.label", "Name")}
            </label>
            <input
              className="contact-form-input"
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder={t("contact.form.name.placeholder", "Your name")}
            />
          </div>

          <div className="contact-form-group">
            <label htmlFor="email" className="contact-form-label">
              {t("contact.form.email.label", "Email")}
            </label>
            <input
              className="contact-form-input"
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder={t("contact.form.email.placeholder", "Your email address")}
            />
          </div>

          <div className="contact-form-group">
            <label htmlFor="message" className="contact-form-label">
              {t("contact.form.message.label", "Message")}
            </label>
            <textarea
              className="contact-form-textarea"
              id="message"
              name="message"
              rows={6}
              value={form.message}
              onChange={handleChange}
              required
              placeholder={t("contact.form.message.placeholder", "Write your message here")}
            />
          </div>

          <button type="submit" className="contact-form-submit">
            {t("contact.form.submit", "Send Message")}
          </button>
        </motion.form>
      </section>
    </Layout>
  );
};
