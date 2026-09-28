"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { agent } from "@/content/agent";

const links = [
  { href: "/", label: "Home" },
  { href: "/listings", label: "Listings" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ground/90 backdrop-blur-md border-b border-gold-deep/30"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-7xl px-6 md:px-10 flex items-center justify-between h-20"
      >
        <Link
          href="/"
          className="font-display text-2xl tracking-wide text-gold-bright"
        >
          {agent.name}
          <span className="hidden sm:inline text-paper/70 font-body text-sm ml-3 align-middle tracking-widest uppercase">
            {agent.brokerage}
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 font-body text-sm tracking-wide uppercase">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-paper/85 hover:text-gold-bright transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={agent.phoneHref}
          className="hidden md:inline-block border border-gold text-gold-bright px-5 py-2 text-sm tracking-wide uppercase hover:bg-gold hover:text-ground transition-colors"
        >
          {agent.phone}
        </a>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          className="md:hidden text-paper"
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-ground border-t border-gold-deep/30 px-6 py-6 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-paper text-lg font-display"
            >
              {l.label}
            </Link>
          ))}
          <a href={agent.phoneHref} className="text-gold-bright text-lg font-display">
            {agent.phone}
          </a>
        </div>
      )}
    </header>
  );
}
