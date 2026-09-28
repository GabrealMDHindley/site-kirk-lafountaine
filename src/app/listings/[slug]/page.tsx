import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { activeListings, getListingBySlug, listingPhotos } from "@/content/listings";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { MortgageCalculator } from "@/components/ui/MortgageCalculator";
import { Reveal } from "@/components/ui/Reveal";
import { agent } from "@/content/agent";

type Params = { slug: string };

export function generateStaticParams() {
  return activeListings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) return {};

  const title = `${listing.address}, ${listing.city}, ${listing.state} — $${listing.price.toLocaleString()}`;
  const description = listing.description.slice(0, 155);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [`/listings/${listing.slug}/01.jpg`],
    },
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) notFound();

  const photos = listingPhotos(listing);
  const address = `${listing.address}, ${listing.city}, ${listing.state}`;

  return (
    <div className="pt-28 pb-24">
      <section className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <Link href="/listings" className="text-sm text-warm-gray hover:text-gold-bright">
            &larr; All Listings
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="flex flex-wrap items-end justify-between gap-4 mt-4 mb-8">
            <div>
              <span className="inline-block bg-gold text-ground text-xs font-medium uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                {listing.status}
              </span>
              <h1 className="font-display text-4xl md:text-5xl text-paper">
                {listing.address}
              </h1>
              <p className="text-paper/70 mt-1">
                {listing.city}, {listing.state} {listing.zip}
              </p>
            </div>
            <p className="font-display text-4xl md:text-5xl text-gold-bright">
              ${listing.price.toLocaleString()}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <PhotoGallery photos={photos} alt={address} />
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[
            { label: "Beds", value: listing.beds ?? "—" },
            { label: "Baths", value: listing.baths ?? "—" },
            { label: "Sqft", value: listing.sqft?.toLocaleString() ?? "—" },
            { label: "Lot Size", value: listing.lotSize },
            { label: "Year Built", value: listing.yearBuilt ?? "—" },
            { label: "Type", value: listing.propertyType },
          ].map((item) => (
            <div key={item.label} className="border border-gold-deep/30 rounded-lg px-5 py-4">
              <p className="text-xs uppercase tracking-widest text-warm-gray">{item.label}</p>
              <p className="font-display text-2xl text-paper mt-1">{item.value}</p>
            </div>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="grid md:grid-cols-3 gap-10 mt-14">
            <div className="md:col-span-2">
              <h2 className="font-display text-3xl text-paper mb-4">About This Home</h2>
              <p className="text-paper/85 leading-relaxed whitespace-pre-line">
                {listing.description}
              </p>

              <h3 className="font-display text-2xl text-paper mt-10 mb-4">Features</h3>
              <ul className="grid sm:grid-cols-2 gap-2 text-paper/85 text-sm">
                {listing.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-gold">&#9670;</span>
                    {f}
                  </li>
                ))}
              </ul>

              <p className="text-xs text-warm-gray mt-8">
                MLS# {listing.mlsNumber} &middot; Listed by {agent.brokerage},{" "}
                {agent.name} &middot; Data courtesy of CRMLS. Information deemed
                reliable but not guaranteed.
              </p>
            </div>

            <div className="border border-gold-deep/30 bg-panel/40 rounded-lg p-6 h-fit sticky top-28">
              <h3 className="font-display text-xl text-paper mb-3">Interested?</h3>
              <p className="text-sm text-paper/80 mb-5">
                Contact {agent.name} for a private showing or more information.
              </p>
              <a
                href={agent.phoneHref}
                className="block text-center px-6 py-3 bg-gold text-ground font-medium uppercase tracking-wide text-sm hover:bg-gold-bright transition-colors mb-3"
              >
                {agent.phone}
              </a>
              <Link
                href={{ pathname: "/contact", query: { property: address } }}
                className="block text-center px-6 py-3 border border-gold text-gold-bright font-medium uppercase tracking-wide text-sm hover:bg-gold/10 transition-colors"
              >
                Request Info
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16">
            <MortgageCalculator homePrice={listing.price} address={address} />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
