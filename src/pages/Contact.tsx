import React, { useState } from "react";
import "./pageStyles.css";
import { Layout } from "./layout";

export const Contact: React.FC = () => {
  const isMobile = window.innerWidth < 768;

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
      <section aria-labelledby="contact-hero-title" className="contact-hero">
        <div className="contact-hero__content">
          <p className="hero-title-accent">CONTACT US</p>
          <h1 id="contact-hero-title" className="hero-title">
            Get In Touch
          </h1>
          <p className="hero-text">
            ¿Tienes preguntas? ¡Nos encantaría saber de ti! Completa el
            formulario y te responderemos lo antes posible.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="contact-form-title"
        style={{
          padding: "4rem 2rem",
          maxWidth: "50rem",
          margin: "auto",
        }}
      >
        <h2 id="contact-form-title" className="sr-only">
          Contact Form
        </h2>
        <form
          onSubmit={handleSubmit}
          className="contact-form"
          aria-labelledby="contact-form-title"
        >
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Tu nombre"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Tu correo electrónico"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              name="message"
              rows={isMobile ? 5 : 8}
              value={form.message}
              onChange={handleChange}
              required
              placeholder="Escribe tu mensaje aquí"
            />
          </div>

          <button type="submit" className="btn-submit">
            Enviar Mensaje
          </button>
        </form>
      </section>
    </Layout>
  );
};
