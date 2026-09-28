"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { getGsap } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  from?: "up" | "left" | "right";
};

export function Reveal({ children, className, delay = 0, y = 40, from = "up" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    const { gsap, ScrollTrigger } = getGsap();
    const x = from === "left" ? -50 : from === "right" ? 50 : 0;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y, x },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, ref);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
