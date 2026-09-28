"use client";

import { useState } from "react";
import { activeListings } from "@/content/listings";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      interestedProperty: String(data.get("interestedProperty") || ""),
      message: String(data.get("message") || ""),
      source: "website-contact-form",
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) {
        setErrorMsg(result.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setErrorMsg("Couldn't send your message. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-gold/50 bg-panel/60 rounded-lg p-8 text-center">
        <p className="font-display text-2xl text-gold-bright mb-2">Message sent</p>
        <p className="text-paper/80">
          Thanks for reaching out — Kirk will get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm underline text-warm-gray hover:text-gold-bright"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm text-paper/80 mb-1.5">
            Name <span className="text-gold">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full bg-ground border border-gold-deep/40 rounded px-4 py-2.5 text-paper focus:outline-none focus:border-gold"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm text-paper/80 mb-1.5">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full bg-ground border border-gold-deep/40 rounded px-4 py-2.5 text-paper focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-paper/80 mb-1.5">
          Email <span className="text-gold">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full bg-ground border border-gold-deep/40 rounded px-4 py-2.5 text-paper focus:outline-none focus:border-gold"
        />
      </div>

      <div>
        <label htmlFor="interestedProperty" className="block text-sm text-paper/80 mb-1.5">
          Property of Interest
        </label>
        <select
          id="interestedProperty"
          name="interestedProperty"
          className="w-full bg-ground border border-gold-deep/40 rounded px-4 py-2.5 text-paper focus:outline-none focus:border-gold"
          defaultValue=""
        >
          <option value="">General inquiry</option>
          {activeListings.map((l) => (
            <option key={l.slug} value={`${l.address}, ${l.city}, ${l.state}`}>
              {l.address}, {l.city} — ${l.price.toLocaleString()}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-paper/80 mb-1.5">
          Message <span className="text-gold">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full bg-ground border border-gold-deep/40 rounded px-4 py-2.5 text-paper focus:outline-none focus:border-gold resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-300 bg-red-950/40 border border-red-800/40 rounded px-4 py-2.5">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full md:w-auto px-10 py-3 bg-gold text-ground font-medium tracking-wide uppercase text-sm hover:bg-gold-bright transition-colors disabled:opacity-50"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
