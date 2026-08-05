"use client";

import { useState, type FormEvent } from "react";
import { BRAND, getMailtoUrl, getWhatsAppUrl } from "@/constants/brand";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = [
      `Nome: ${name}`,
      `E-mail: ${email}`,
      `Telefone: ${phone}`,
      "",
      message,
    ].join("\n");

    window.location.href = getMailtoUrl(
      `Contato pelo site — ${name || BRAND.name}`,
      body
    );
  }

  function handleWhatsApp() {
    const text = [
      `Olá! Meu nome é ${name || "[nome]"}.`,
      phone ? `Telefone: ${phone}` : null,
      email ? `E-mail: ${email}` : null,
      "",
      message || "Gostaria de saber mais sobre os serviços da Bahia Service.",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(getWhatsAppUrl(text), "_blank", "noopener,noreferrer");
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        id="contact-name"
        label="Nome"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
        autoComplete="name"
      />
      <Input
        id="contact-email"
        label="E-mail"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
        autoComplete="email"
      />
      <Input
        id="contact-phone"
        label="Telefone"
        type="tel"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        autoComplete="tel"
      />
      <Textarea
        id="contact-message"
        label="Mensagem"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        required
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" className="flex-1">
          Enviar por e-mail
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={handleWhatsApp}
        >
          Abrir WhatsApp
        </Button>
      </div>
    </form>
  );
}
