import { agent } from "@/content/agent";
import { testimonials } from "@/content/testimonials";
import { activeListings, soldListings } from "@/content/listings";
import { faqs } from "@/content/faq";

/**
 * Builds the chatbot's knowledge base directly from the same content modules
 * that render the site's pages. There is exactly one source of truth per
 * fact (agent bio, listings, testimonials, FAQs) — editing a content file
 * updates both the page that displays it and the next answer this function
 * feeds the chatbot. No separate sync step or re-indexing is required.
 */
export function buildSiteKnowledge(): string {
  const listingsBlock = activeListings
    .map((l) => {
      const price = l.price.toLocaleString("en-US");
      return `- ${l.address}, ${l.city}, ${l.state} ${l.zip} | $${price} | ${l.beds ?? "?"} bed / ${l.baths ?? "?"} bath | ${l.sqft ?? "?"} sqft | lot ${l.lotSize} | built ${l.yearBuilt ?? "?"} | ${l.propertyType} | MLS# ${l.mlsNumber} | page: /listings/${l.slug}\n  Description: ${l.description}\n  Features: ${l.features.join(", ")}`;
    })
    .join("\n\n");

  const soldBlock = soldListings
    .map((s) => `- ${s.address}, ${s.city} — sold for $${s.price.toLocaleString("en-US")}${s.beds ? ` (${s.beds} bed / ${s.baths} bath, ${s.sqft} sqft)` : ""}`)
    .join("\n");

  const testimonialsBlock = testimonials
    .map((t) => `- "${t.quote}" — ${t.author}`)
    .join("\n");

  const faqBlock = faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n");

  return `
AGENT PROFILE
Name: ${agent.name}
Title: ${agent.title}, ${agent.brokerage}
License: ${agent.license}
Tagline: ${agent.tagline}
Phone: ${agent.phone}
Email: ${agent.email}
Office: ${agent.office}
Service area: ${agent.serviceArea}
Bio: ${agent.bio}
Social: Facebook ${agent.social.facebook} | Instagram ${agent.social.instagram} | LinkedIn ${agent.social.linkedin}

CURRENT ACTIVE LISTINGS
${listingsBlock}

RECENTLY SOLD (for proof of track record — these are NOT for sale)
${soldBlock}

CLIENT TESTIMONIALS
${testimonialsBlock}

FREQUENTLY ASKED QUESTIONS
${faqBlock}

TOOLS AVAILABLE ON THIS SITE
- Every active listing's page (/listings/<slug>) has a mortgage/affordability calculator pre-filled with that home's price, where a visitor can adjust down payment, interest rate, and loan term to see an estimated monthly payment (principal, interest, taxes, insurance).
- The Contact page (/contact) has a lead form for buyers/sellers to reach Kirk directly.
`.trim();
}
