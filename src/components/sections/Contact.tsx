"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Send,
  Terminal,
  XCircle,
} from "lucide-react";

import Section from "@/components/ui/Section";

const FORMSPREE_URL = "https://formspree.io/f/mqayvvjq";
const EMAIL = "zakideza19@gmail.com";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const reduce = useReducedMotion();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hp = (
      e.currentTarget.elements.namedItem("company") as HTMLInputElement | null
    )?.value;

    if (hp) return;

    setStatus("sending");

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Message submission failed");
      }

      setStatus("sent");
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      window.setTimeout(() => setStatus("idle"), 4500);
    } catch {
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 4500);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Let's Connect"
      title="Let's build something."
      subtitle="Open for opportunities, collaborations, and meaningful digital projects. Have something in mind? Let's talk."
    >
      <div className="overflow-hidden rounded-xl border border-border bg-bg">
        {/* DASHBOARD HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-bg-soft px-5 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-neon-green" />

            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-fg">
              Contact Interface
            </span>
          </div>

          <span className="font-mono text-[9px] tracking-wider text-fg-muted">
            ZD / COMMUNICATION
          </span>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.85fr]">
          {/* CONTACT FORM */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: reduce ? 0 : 0.4 }}
            className="min-w-0 border-b border-border p-5 sm:p-7 lg:border-b-0 lg:border-r lg:p-8"
          >
            <div className="mb-7">
              <div className="mb-3 flex items-center gap-2">
                <Terminal className="h-4 w-4 text-neon-green" />

                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-fg-muted">
                  01 / Send a message
                </span>
              </div>

              <h3 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                Start a conversation.
              </h3>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-fg-muted">
                Tell me a little about what you have in mind. I'll get back to
                you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* HONEYPOT */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="sr-only"
              />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field id="name" label="Your name" number="01">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    placeholder="John Doe"
                    className="contact-input"
                  />
                </Field>

                <Field id="email" label="Email address" number="02">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={254}
                    placeholder="john@example.com"
                    className="contact-input"
                  />
                </Field>
              </div>

              <Field id="message" label="Your message" number="03">
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={5000}
                  placeholder="Tell me about your project, collaboration, or opportunity..."
                  className="contact-input min-h-[150px] resize-y"
                />
              </Field>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-neon-green bg-neon-green px-5 text-sm font-semibold text-bg transition-colors hover:bg-transparent hover:text-neon-green disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={status}
                    initial={reduce ? false : { opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -5 }}
                    transition={{ duration: reduce ? 0 : 0.15 }}
                    className="inline-flex items-center gap-2"
                  >
                    {status === "idle" && (
                      <>
                        <Send className="h-4 w-4" />
                        Send message
                      </>
                    )}

                    {status === "sending" && (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending message...
                      </>
                    )}

                    {status === "sent" && (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Message sent successfully
                      </>
                    )}

                    {status === "error" && (
                      <>
                        <XCircle className="h-4 w-4" />
                        Unable to send message
                      </>
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>

              <p
                aria-live="polite"
                className="min-h-4 text-center text-[10px] text-fg-muted"
              >
                {status === "sent" &&
                  "Thank you for reaching out. Your message has been submitted."}

                {status === "error" &&
                  "Something went wrong. Please try again or contact me directly by email."}
              </p>
            </form>
          </motion.div>

          {/* CONTACT INFORMATION */}
          <motion.aside
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: reduce ? 0 : 0.4,
              delay: reduce ? 0 : 0.1,
            }}
            className="min-w-0 p-5 sm:p-7 lg:p-8"
          >
            {/* EMAIL */}
            <div>
              <PanelLabel number="02" title="Direct Contact" icon={Mail} />

              <div className="mt-5 rounded-lg border border-border bg-bg-soft p-4">
                <span className="font-mono text-[9px] uppercase tracking-wider text-fg-muted">
                  Email address
                </span>

                <div className="mt-2 flex items-center gap-2">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="min-w-0 flex-1 break-all text-sm font-medium text-fg transition-colors hover:text-neon-green"
                  >
                    {EMAIL}
                  </a>

                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label="Copy email address"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-fg-muted transition-colors hover:border-neon-green/50 hover:text-neon-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-neon-green" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <p className="mt-3 font-mono text-[9px] text-fg-muted">
                  {copied
                    ? "EMAIL COPIED TO CLIPBOARD"
                    : "AVAILABLE FOR DIRECT INQUIRIES"}
                </p>
              </div>
            </div>

            {/* SOCIAL LINKS */}
            <div className="mt-8">
              <PanelLabel number="03" title="Elsewhere" icon={GitHubIcon} />

              <div className="mt-4 space-y-2">
                <SocialLink
                  href="https://github.com/Zakid19"
                  label="GitHub"
                  description="Projects & repositories"
                  icon={<Github className="h-4 w-4" />}
                />

                <SocialLink
                  href="https://linkedin.com/in/zaki-deza-31666719a"
                  label="LinkedIn"
                  description="Professional network"
                  icon={<Linkedin className="h-4 w-4" />}
                />

                <SocialLink
                  href={`mailto:${EMAIL}`}
                  label="Email"
                  description="Direct communication"
                  icon={<Mail className="h-4 w-4" />}
                  external={false}
                />
              </div>
            </div>

            {/* LOCATION */}
            <div className="mt-8 border-t border-border pt-5">
              <PanelLabel number="04" title="Location" icon={MapPin} />

              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-bg-soft">
                  <MapPin className="h-4 w-4 text-neon-green" />
                </div>

                <div>
                  <p className="text-sm font-medium text-fg">Indonesia</p>

                  <p className="mt-1 font-mono text-[10px] text-fg-muted">
                    Remote / UTC+7
                  </p>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>

        {/* FOOTER */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-bg-soft px-5 py-3.5 sm:px-6">
          <span className="font-mono text-[9px] text-fg-muted">
            OPEN TO OPPORTUNITIES & COLLABORATIONS
          </span>

          <span className="font-mono text-[9px] text-neon-green">
            END / CONTACT
          </span>
        </div>
      </div>

      {/* INPUT STYLES */}
      <style jsx>{`
        :global(.contact-input) {
          display: block;
          width: 100%;
          margin-top: 0.5rem;
          padding: 0.8rem 0.9rem;
          border: 1px solid rgb(var(--border));
          border-radius: 0.5rem;
          background: rgb(var(--bg-soft));
          color: rgb(var(--fg));
          font-size: 0.8125rem;
          line-height: 1.6;
          outline: none;
          transition:
            border-color 180ms ease,
            box-shadow 180ms ease,
            background-color 180ms ease;
        }

        :global(.contact-input::placeholder) {
          color: rgb(var(--muted));
          opacity: 0.8;
        }

        :global(.contact-input:focus) {
          border-color: rgb(var(--neon-green));
          box-shadow: 0 0 0 3px rgb(var(--neon-green) / 0.1);
        }

        :global(.contact-input:disabled) {
          cursor: not-allowed;
          opacity: 0.6;
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.contact-input) {
            transition: none;
          }
        }
      `}</style>
    </Section>
  );
}

function Field({
  id,
  label,
  number,
  children,
}: {
  id: string;
  label: string;
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-wider text-fg"
      >
        <span className="text-neon-green">{number}</span>
        {label}
        <span className="text-neon-green">*</span>
      </label>

      {children}
    </div>
  );
}

function PanelLabel({
  number,
  title,
  icon: Icon,
}: {
  number: string;
  title: string;
  icon: typeof Mail;
}) {
  return (
    <div className="flex items-center gap-2.5 border-b border-border pb-3">
      <Icon className="h-4 w-4 text-neon-green" strokeWidth={1.7} />

      <h3 className="font-mono text-[10px] font-medium uppercase tracking-[0.13em] text-fg">
        {number} / {title}
      </h3>
    </div>
  );
}

function SocialLink({
  href,
  icon,
  label,
  description,
  external = true,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center gap-3 rounded-lg border border-border bg-bg p-3 transition-colors duration-200 hover:border-neon-green/40 hover:bg-bg-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-bg-soft text-fg-muted transition-colors group-hover:text-neon-green">
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-xs font-medium text-fg">{label}</span>

        <span className="mt-0.5 block text-[10px] text-fg-muted">
          {description}
        </span>
      </span>

      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-fg-muted transition-colors group-hover:text-neon-green" />
    </a>
  );
}

function GitHubIcon() {
  return <Github className="h-4 w-4" />;
}
