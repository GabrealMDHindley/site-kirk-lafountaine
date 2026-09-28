"use client";

import { useState } from "react";
import { testimonials } from "@/content/testimonials";
import { Reveal } from "@/components/ui/Reveal";

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  return (
    <section className="mx-auto max-w-4xl px-6 md:px-10 py-24 text-center">
      <Reveal>
        <p className="text-xs uppercase tracking-widest text-gold mb-4">What Clients Say</p>
        <blockquote className="font-display text-2xl md:text-3xl leading-snug text-paper/95 min-h-[10rem] md:min-h-[8rem] flex items-center justify-center">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <p className="mt-6 text-gold-bright tracking-wide uppercase text-sm">&mdash; {t.author}</p>

        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === index ? "bg-gold" : "bg-gold-deep/40 hover:bg-gold-deep"
              }`}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
