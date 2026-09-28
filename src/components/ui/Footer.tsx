import Link from "next/link";
import { agent } from "@/content/agent";

export function Footer() {
  return (
    <footer className="border-t border-gold-deep/30 bg-ground-soft">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl text-gold-bright mb-2">{agent.name}</p>
          <p className="text-sm text-warm-gray uppercase tracking-widest">
            {agent.title}
          </p>
          <p className="text-sm text-warm-gray mt-1">{agent.brokerage}</p>
          <p className="text-xs text-warm-gray mt-4">{agent.license}</p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-widest text-gold mb-4">Contact</p>
          <ul className="space-y-2 text-sm text-paper/85">
            <li>
              <a href={agent.phoneHref} className="hover:text-gold-bright">
                {agent.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${agent.email}`} className="hover:text-gold-bright">
                {agent.email}
              </a>
            </li>
            <li className="text-warm-gray">{agent.office}</li>
          </ul>
        </div>

        <div>
          <p className="text-sm uppercase tracking-widest text-gold mb-4">Explore</p>
          <ul className="space-y-2 text-sm text-paper/85">
            <li><Link href="/listings" className="hover:text-gold-bright">Listings</Link></li>
            <li><Link href="/about" className="hover:text-gold-bright">About Kirk</Link></li>
            <li><Link href="/contact" className="hover:text-gold-bright">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm uppercase tracking-widest text-gold mb-4">Follow</p>
          <div className="flex gap-4">
            <a
              href={agent.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-paper/85 hover:text-gold-bright"
            >
              Facebook
            </a>
            <a
              href={agent.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-paper/85 hover:text-gold-bright"
            >
              Instagram
            </a>
            <a
              href={agent.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-paper/85 hover:text-gold-bright"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gold-deep/20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-6 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-warm-gray">
          <p>&copy; {new Date().getFullYear()} {agent.brokerage}. Equal Housing Opportunity.</p>
          <p>Listing data courtesy of CRMLS. All information deemed reliable but not guaranteed.</p>
        </div>
      </div>
    </footer>
  );
}
