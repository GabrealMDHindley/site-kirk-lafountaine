import { soldListings } from "@/content/listings";
import { Reveal } from "@/components/ui/Reveal";

export function SoldStrip() {
  return (
    <section className="py-20 border-t border-gold-deep/25">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-gold mb-2">Track Record</p>
          <h2 className="font-display text-3xl md:text-4xl text-paper mb-10">Recently Sold</h2>
        </Reveal>

        <div className="overflow-x-auto">
          <div className="flex gap-4 min-w-max pb-2">
            {soldListings.map((s, i) => (
              <Reveal key={s.address} delay={i * 0.05} from="right">
                <div className="w-64 shrink-0 border border-gold-deep/25 bg-panel/40 rounded-lg p-5">
                  <p className="text-xs uppercase tracking-widest text-warm-gray mb-2">Sold</p>
                  <p className="font-display text-xl text-gold-bright mb-1">
                    ${s.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-paper/85">{s.address}</p>
                  <p className="text-xs text-warm-gray">{s.city}</p>
                  {s.beds != null && (
                    <p className="text-xs text-warm-gray mt-2">
                      {s.beds} bd / {s.baths} ba &middot; {s.sqft?.toLocaleString()} sqft
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
