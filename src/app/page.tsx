import Link from "next/link";
import Image from "next/image";
import { HeroScene } from "@/components/three/HeroScene";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { SoldStrip } from "@/components/sections/SoldStrip";
import { ListingCard } from "@/components/ui/ListingCard";
import { Reveal } from "@/components/ui/Reveal";
import { agent } from "@/content/agent";
import { activeListings } from "@/content/listings";

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[640px] flex items-center overflow-hidden">
        <HeroScene />
        <div className="absolute inset-0 bg-gradient-to-b from-ground/40 via-ground/10 to-ground pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 w-full">
          <p className="text-sm md:text-base uppercase tracking-[0.3em] text-gold mb-6">
            {agent.brokerage} &middot; Oroville, California
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-8xl leading-[0.95] text-paper max-w-4xl">
            Real estate,
            <br />
            <span className="text-gold-gradient">unearthed with care.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-paper/85">
            {agent.tagline} Two decades of Gold Country expertise, guiding buyers,
            sellers, and investors through Oroville and beyond.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/listings"
              className="px-8 py-3.5 bg-gold text-ground font-medium uppercase tracking-wide text-sm hover:bg-gold-bright transition-colors"
            >
              View Listings
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 border border-gold text-gold-bright font-medium uppercase tracking-wide text-sm hover:bg-gold/10 transition-colors"
            >
              Talk to Kirk
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-warm-gray text-xs uppercase tracking-widest animate-pulse">
          Scroll
        </div>
      </section>

      <StatsStrip />

      {/* FEATURED LISTINGS */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-24">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-gold mb-2">Available Now</p>
          <h2 className="font-display text-4xl md:text-5xl text-paper mb-12">
            Featured Listings
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeListings.map((listing, i) => (
            <Reveal key={listing.slug} delay={i * 0.08}>
              <ListingCard listing={listing} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <Link
              href="/listings"
              className="inline-block text-gold-bright border-b border-gold hover:text-gold-bright/80 uppercase text-sm tracking-widest pb-1"
            >
              See all listings
            </Link>
          </div>
        </Reveal>
      </section>

      {/* MEET KIRK */}
      <section className="border-t border-gold-deep/25 bg-ground-soft">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-24 grid md:grid-cols-2 gap-14 items-center">
          <Reveal from="left">
            <div className="relative aspect-[4/5] max-w-md mx-auto">
              <Image
                src={agent.headshot}
                alt={agent.name}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 90vw, 400px"
              />
              <div className="absolute -inset-3 border border-gold/40 rounded-lg -z-10" />
            </div>
          </Reveal>
          <Reveal from="right">
            <p className="text-xs uppercase tracking-widest text-gold mb-2">
              Meet Your Agent
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-paper mb-6">
              {agent.name}
            </h2>
            <p className="text-paper/85 leading-relaxed mb-6">{agent.bio}</p>
            <Link
              href="/about"
              className="text-gold-bright border-b border-gold uppercase text-sm tracking-widest pb-1"
            >
              More about Kirk
            </Link>
          </Reveal>
        </div>
      </section>

      <TestimonialCarousel />
      <SoldStrip />

      {/* CTA */}
      <section className="border-t border-gold-deep/25">
        <div className="mx-auto max-w-4xl px-6 md:px-10 py-24 text-center">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl text-paper mb-6">
              Ready to find your place in Gold Country?
            </h2>
            <p className="text-paper/80 mb-10 max-w-xl mx-auto">
              Whether buying, selling, or just exploring the market, Kirk is ready to
              help — call, email, or send a message below.
            </p>
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-gold text-ground font-medium uppercase tracking-wide text-sm hover:bg-gold-bright transition-colors"
            >
              Get in Touch
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
