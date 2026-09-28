import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { agent } from "@/content/agent";
import { Reveal } from "@/components/ui/Reveal";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";

export const metadata: Metadata = {
  title: "About Kirk LaFountaine",
  description: agent.bio.slice(0, 155),
};

export default function AboutPage() {
  return (
    <div className="pt-28">
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-16 grid md:grid-cols-2 gap-14 items-center">
        <Reveal from="left">
          <div className="relative aspect-[4/5] max-w-md mx-auto">
            <Image
              src={agent.headshot}
              alt={agent.name}
              fill
              priority
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 90vw, 480px"
            />
            <div className="absolute -inset-3 border border-gold/40 rounded-lg -z-10" />
          </div>
        </Reveal>
        <Reveal from="right">
          <p className="text-xs uppercase tracking-widest text-gold mb-2">
            {agent.title}
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-paper mb-4">
            {agent.name}
          </h1>
          <p className="text-gold-bright uppercase tracking-widest text-sm mb-6">
            {agent.brokerage} &middot; {agent.license}
          </p>
          <p className="text-paper/85 leading-relaxed mb-4">{agent.bio}</p>
          <p className="text-paper/70 text-sm">{agent.serviceArea}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={agent.phoneHref}
              className="px-8 py-3 bg-gold text-ground font-medium uppercase tracking-wide text-sm hover:bg-gold-bright transition-colors"
            >
              {agent.phone}
            </a>
            <Link
              href="/contact"
              className="px-8 py-3 border border-gold text-gold-bright font-medium uppercase tracking-wide text-sm hover:bg-gold/10 transition-colors"
            >
              Send a Message
            </Link>
          </div>
        </Reveal>
      </section>

      <StatsStrip />
      <TestimonialCarousel />
    </div>
  );
}
