"use client";

import dynamic from "next/dynamic";

function HeroFallback() {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      aria-hidden="true"
    >
      <div
        className="w-56 h-56 md:w-72 md:h-72 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #e8c97a, #c9a24b 45%, #8a6a2c 75%, transparent 100%)",
          filter: "blur(2px)",
          opacity: 0.85,
        }}
      />
    </div>
  );
}

const GoldCrystalScene = dynamic(() => import("./GoldCrystalScene"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

export function HeroScene() {
  return (
    <div className="absolute inset-0">
      <GoldCrystalScene />
    </div>
  );
}
