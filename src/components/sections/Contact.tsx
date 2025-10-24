"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { Mail, Send, Github, Linkedin } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const FORMSPREE_URL = "https://formspree.io/f/mqayvvjq"; // 🔥 Ganti sama endpoint lo

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else throw new Error("Failed to send message");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <Section id="contact" title="Get in Touch">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        {/* LEFT: Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl backdrop-blur-lg bg-white/10 dark:bg-primary/40 border border-neutral-200 dark:border-white/10 shadow-xl space-y-6"
        >
          <h3 className="text-2xl font-bold mb-4 text-neutral-800 dark:text-white">Send me a message</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-transparent border border-neutral-200 dark:border-white/10 text-neutral-800 dark:text-white dark:placeholder-white/40 focus:border-cyan-400 outline-none transition-all duration-200"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-transparent border border-neutral-200 dark:border-white/10 text-neutral-800 dark:text-white dark:placeholder-white/40 focus:border-cyan-400 outline-none transition-all duration-200"
            />
          </div>

          <textarea
            name="message"
            rows={5}
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-transparent border border-neutral-200 dark:border-white/10 dark:text-white dark:placeholder-white/40 focus:border-cyan-400 outline-none transition-all duration-200"
          />

          <motion.button
            type="submit"
            disabled={status === "sending"}
            whileTap={{ scale: 0.97 }}
            className={`w-full py-3 rounded-md font-semibold text-white transition-all duration-300 ${
              status === "sent"
                ? "bg-green-600"
                : status === "error"
                ? "bg-red-600"
                : "bg-gradient-to-br from-secondary-green to-secondary-blue hover:shadow-[0_0_30px_-10px_rgba(0,255,255,0.5)]"
            }`}
          >
            {status === "sending"
              ? "Sending..."
              : status === "sent"
              ? "Message Sent!"
              : status === "error"
              ? "Failed! Try Again"
              : "Send Message"}
            {status === "idle" && <Send className="inline-block ml-2 w-4 h-4" />}
          </motion.button>
        </motion.form>

        {/* RIGHT: Contact Info + Social Links */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center text-center md:text-left space-y-8"
        >
          <div>
            <h3 className="text-3xl font-bold text-neutral-800 dark:text-white mb-4">Let’s Connect</h3>
            <p className="text-base text-muted-foreground/90 leading-relaxed">
              I’m currently open for new opportunities and collaborations.
              Hit me up — let’s bring your ideas to life
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-4 mt-6">
            <a
              href="mailto:zakideza19@gmail.com"
              className="flex items-center justify-center md:justify-start gap-2 px-5 py-3 rounded-lg font-medium text-white
              bg-gradient-to-br from-secondary-green to-secondary-blue hover:scale-[1.05] transition-all duration-200 shadow-[0_0_20px_-5px_rgba(0,255,255,0.4)]"
            >
              <Mail className="w-4 h-4" /> zakideza19@gmail.com
            </a>

            <a
              href="https://www.linkedin.com/in/zaki-deza-31666719a/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center md:justify-start gap-2 px-5 py-3 rounded-lg border border-neutral-200 dark:border-white/10 text-neutral-800 dark:text-white/90
              hover:bg-white/10 transition-all duration-200"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>

            <a
              href="https://github.com/Zakid19"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center md:justify-start gap-2 px-5 py-3 rounded-lg border border-neutral-200 dark:border-white/10 text-neutral-800 dark:text-white/90
              hover:bg-white/10 transition-all duration-200"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
