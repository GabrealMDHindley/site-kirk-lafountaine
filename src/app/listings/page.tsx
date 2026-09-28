import type { Metadata } from "next";
import { activeListings } from "@/content/listings";
import { ListingCard } from "@/components/ui/ListingCard";
import { Reveal } from "@/components/ui/Reveal";
import { SoldStrip } from "@/components/sections/SoldStrip";

export const metadata: Metadata = {
  title: "Listings",
  description: "Current homes and land for sale in Oroville and Butte County, CA with Kirk LaFountaine.",
};

export default function ListingsPage() {
  return (
    <div className="pt-28">
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-12">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-gold mb-2">
            Oroville &amp; Butte County
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-paper mb-6">
            Current Listings
          </h1>
          <p className="text-paper/80 max-w-2xl mb-12">
            Every home below is a live, active listing. Open any property to see the
            full gallery, details, and a built-in calculator estimating your monthly
            cost.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeListings.map((listing, i) => (
            <Reveal key={listing.slug} delay={i * 0.06}>
              <ListingCard listing={listing} />
            </Reveal>
          ))}
        </div>
      </section>

      <SoldStrip />
    </div>
  );
}
