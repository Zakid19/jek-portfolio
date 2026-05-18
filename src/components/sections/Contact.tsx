"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Copy,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Send,
  XCircle,
} from "lucide-react";
import Section from "@/components/ui/Section";

const FORMSPREE_URL = "https://formspree.io/f/mqayvvjq";
const EMAIL = "zakideza19@gmail.com";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const reduce = useReducedMotion();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Honeypot — bots fill hidden field
    const hp = (e.currentTarget.elements.namedItem("company") as HTMLInputElement | null)?.value;
    if (hp) return;

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Send failed");
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4500);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Get in touch"
      title="Let's build something."
      subtitle="Open for new opportunities and collaborations. Drop a message or reach out via email — I usually reply within a day."
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3 p-7 sm:p-9 rounded-2xl glass neon-edge space-y-5"
          noValidate
        >
          <h3 className="text-xl font-semibold text-fg">Send me a message</h3>

          {/* Honeypot */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="sr-only"
            aria-hidden
          />

          <div className="grid sm:grid-cols-2 gap-5">
            <Field id="name" label="Name" required>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Jane Doe"
                className="input"
              />
            </Field>

            <Field id="email" label="Email" required>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="jane@company.com"
                className="input"
              />
            </Field>
          </div>

          <Field id="message" label="Message" required>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell me about your project, timeline, and what you're trying to build…"
              className="input resize-y min-h-[140px]"
            />
          </Field>

          <button
            type="submit"
            disabled={status === "sending"}
            className={`w-full inline-flex items-center justify-center gap-2 h-12 rounded-lg font-medium text-white transition-all duration-500 ${
              status === "sent"
                ? "bg-emerald-500/90 shadow-glow-green"
                : status === "error"
                ? "bg-rose-500/90"
                : "bg-brand-gradient bg-[length:200%_100%] hover:bg-[position:100%_0] shadow-glow-soft hover:shadow-glow"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={status}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="inline-flex items-center gap-2"
              >
                {status === "sending" && <Loader2 className="w-4 h-4 animate-spin" />}
                {status === "sent" && <CheckCircle2 className="w-4 h-4" />}
                {status === "error" && <XCircle className="w-4 h-4" />}
                {status === "idle" && <Send className="w-4 h-4" />}
                {status === "sending"
                  ? "Sending…"
                  : status === "sent"
                  ? "Message sent — talk soon!"
                  : status === "error"
                  ? "Something went wrong"
                  : "Send message"}
              </motion.span>
            </AnimatePresence>
          </button>
        </motion.form>

        {/* Side panel */}
        <motion.aside
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-2 space-y-5"
        >
          {/* Email card */}
          <div className="p-7 rounded-2xl glass neon-edge">
            <div className="font-mono text-xs uppercase tracking-widest text-neon-cyan mb-3">
              Email
            </div>
            <div className="flex items-center justify-between gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="text-base font-medium text-fg hover:text-neon-cyan transition-colors break-all link-underline"
              >
                {EMAIL}
              </a>
              <button
                onClick={copyEmail}
                aria-label="Copy email"
                className="flex-shrink-0 w-10 h-10 rounded-lg border border-border dark:border-white/15 bg-bg-elev/60 flex items-center justify-center text-fg-soft hover:text-neon-cyan hover:border-neon-cyan/50 transition-all"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "ok" : "copy"}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                  >
                    {copied ? (
                      <CheckCircle2 className="w-4 h-4 text-neon-green" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Location */}
          <div className="p-5 rounded-2xl glass neon-edge flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-bg-elev border border-border dark:border-white/10 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-neon-cyan" />
            </div>
            <div>
              <div className="font-mono text-[0.7rem] uppercase tracking-widest text-fg-muted">
                Location
              </div>
              <div className="text-sm text-fg">Remote · Indonesia (UTC+7)</div>
            </div>
          </div>

          {/* Socials */}
          <div className="p-5 rounded-2xl glass neon-edge">
            <div className="font-mono text-[0.7rem] uppercase tracking-widest text-fg-muted mb-3">
              Elsewhere
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <SocialLink
                href="https://github.com/Zakid19"
                icon={<Github className="w-4 h-4" />}
                label="GitHub"
              />
              <SocialLink
                href="https://linkedin.com/in/zaki-deza-31666719a"
                icon={<Linkedin className="w-4 h-4" />}
                label="LinkedIn"
              />
              <SocialLink
                href={`mailto:${EMAIL}`}
                icon={<Mail className="w-4 h-4" />}
                label="Email"
                external={false}
              />
            </div>
          </div>
        </motion.aside>
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          background: rgb(var(--bg-elev));
          border: 1px solid rgb(var(--border));
          color: rgb(var(--fg));
          font-size: 0.9rem;
          transition: border-color 200ms, box-shadow 200ms, background-color 200ms;
          outline: none;
        }
        :global(.dark .input) {
          background: rgb(255 255 255 / 0.02);
          border-color: rgb(255 255 255 / 0.08);
        }
        :global(.input::placeholder) {
          color: rgb(var(--muted));
        }
        :global(.input:focus) {
          border-color: rgb(var(--neon-cyan) / 0.6);
          box-shadow: 0 0 0 3px rgb(var(--neon-cyan) / 0.12);
        }
        :global(.dark .input:focus) {
          background: rgb(255 255 255 / 0.04);
        }
      `}</style>
    </Section>
  );
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="block text-xs font-mono uppercase tracking-widest text-fg-muted mb-1.5">
        {label}
        {required && <span className="text-neon-cyan ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}

function SocialLink({
  href,
  icon,
  label,
  external = true,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex items-center gap-2 px-3 h-10 rounded-lg border border-border dark:border-white/10 text-sm text-fg-soft hover:text-neon-cyan hover:border-neon-cyan/50 transition-all"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
