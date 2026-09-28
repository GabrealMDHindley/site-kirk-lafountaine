import type { Metadata } from "next";
import { agent } from "@/content/agent";
import { ContactForm } from "@/components/ui/ContactForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${agent.name} of ${agent.brokerage} — ${agent.phone}, ${agent.email}.`,
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-24">
      <section className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-gold mb-2">Get in Touch</p>
          <h1 className="font-display text-5xl md:text-6xl text-paper mb-4">
            Let&rsquo;s talk real estate.
          </h1>
          <p className="text-paper/80 max-w-xl mb-14">
            Buying, selling, or just curious what your place in Gold Country is worth
            — reach out and Kirk will get back to you personally.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-5 gap-12">
          <Reveal from="left" className="md:col-span-3">
            <ContactForm />
          </Reveal>

          <Reveal from="right" delay={0.1} className="md:col-span-2 space-y-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-gold mb-2">Direct</p>
              <a href={agent.phoneHref} className="block font-display text-2xl text-gold-bright hover:text-gold-bright/80">
                {agent.phone}
              </a>
              <a href={`mailto:${agent.email}`} className="block text-paper/85 hover:text-gold-bright mt-1">
                {agent.email}
              </a>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-gold mb-2">Office</p>
              <p className="text-paper/85">{agent.office}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-gold mb-2">Service Area</p>
              <p className="text-paper/85">{agent.serviceArea}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-gold mb-2">Follow</p>
              <div className="flex gap-4">
                <a href={agent.social.facebook} target="_blank" rel="noopener noreferrer" className="text-paper/85 hover:text-gold-bright">
                  Facebook
                </a>
                <a href={agent.social.instagram} target="_blank" rel="noopener noreferrer" className="text-paper/85 hover:text-gold-bright">
                  Instagram
                </a>
                <a href={agent.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-paper/85 hover:text-gold-bright">
                  LinkedIn
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
