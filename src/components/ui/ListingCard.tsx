import Image from "next/image";
import Link from "next/link";
import type { Listing } from "@/content/listings";

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="group block overflow-hidden rounded-lg border border-gold-deep/30 bg-panel/40 transition-all hover:border-gold/70"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={`/listings/${listing.slug}/01.jpg`}
          alt={`${listing.address}, ${listing.city}, ${listing.state}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ground/80 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 bg-gold text-ground text-xs font-medium uppercase tracking-widest px-3 py-1 rounded-full">
          {listing.status}
        </span>
      </div>
      <div className="p-5">
        <p className="font-display text-2xl text-paper mb-1">
          ${listing.price.toLocaleString()}
        </p>
        <p className="text-paper/80 text-sm">
          {listing.address}, {listing.city}, {listing.state} {listing.zip}
        </p>
        <div className="flex gap-4 mt-3 text-xs text-warm-gray uppercase tracking-wide">
          {listing.beds != null && <span>{listing.beds} Beds</span>}
          {listing.baths != null && <span>{listing.baths} Baths</span>}
          {listing.sqft != null && <span>{listing.sqft.toLocaleString()} Sqft</span>}
        </div>
      </div>
    </Link>
  );
}
