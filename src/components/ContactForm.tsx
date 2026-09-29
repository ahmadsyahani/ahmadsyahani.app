"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulasi pengiriman form (karena belum ada backend API)
    // Nanti bisa diganti dengan fetch ke Formspree atau Resend
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-[480px] rounded-2xl border border-green-200 bg-green-50 p-8 text-center"
      >
        <h3 className="text-[18px] font-medium text-green-900">Message sent!</h3>
        <p className="mt-2 text-[15px] text-green-700">
          Thank you for reaching out. I&apos;ll get back to you as soon as possible.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-[480px] flex-col gap-4 text-left">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-[13px] font-medium text-stone-600">Name</label>
        <input
          type="text"
          id="name"
          required
          className="w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-[14px] text-stone-900 outline-none transition-colors focus:border-stone-900"
          placeholder="John Doe"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-[13px] font-medium text-stone-600">Email</label>
        <input
          type="email"
          id="email"
          required
          className="w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-[14px] text-stone-900 outline-none transition-colors focus:border-stone-900"
          placeholder="john@example.com"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-[13px] font-medium text-stone-600">Message</label>
        <textarea
          id="message"
          required
          rows={4}
          className="w-full resize-none rounded-lg border border-stone-200 bg-white px-4 py-3 text-[14px] text-stone-900 outline-none transition-colors focus:border-stone-900"
          placeholder="Tell me about your project..."
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 flex w-full items-center justify-center rounded-lg bg-stone-900 px-4 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-stone-800 disabled:opacity-70"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
