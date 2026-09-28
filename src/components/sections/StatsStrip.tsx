import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

const stats = [
  { value: 20, suffix: "+", label: "Years of Experience" },
  { value: 3, prefix: "Top ", suffix: "%", label: "Of High-Achieving Agents" },
  { value: 4, label: "Active Listings" },
  { value: 6, label: "Recent Closings" },
];

export function StatsStrip() {
  return (
    <section className="border-y border-gold-deep/25 bg-ground-soft">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <p className="font-display text-4xl md:text-5xl text-gold-bright tabular-nums">
              <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </p>
            <p className="text-xs md:text-sm uppercase tracking-widest text-warm-gray mt-2">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
