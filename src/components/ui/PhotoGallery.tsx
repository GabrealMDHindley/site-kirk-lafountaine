"use client";

import { useState } from "react";
import Image from "next/image";

export function PhotoGallery({ photos, alt }: { photos: string[]; alt: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <button
          type="button"
          onClick={() => setLightboxIndex(0)}
          className="col-span-2 row-span-2 relative aspect-[4/3] md:aspect-auto overflow-hidden rounded-lg"
        >
          <Image
            src={photos[0]}
            alt={`${alt} — main photo`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </button>
        {photos.slice(1, 5).map((photo, i) => (
          <button
            type="button"
            key={photo}
            onClick={() => setLightboxIndex(i + 1)}
            className="relative aspect-square overflow-hidden rounded-lg"
          >
            <Image
              src={photo}
              alt={`${alt} — photo ${i + 2}`}
              fill
              sizes="25vw"
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
            {i === 3 && photos.length > 5 && (
              <div className="absolute inset-0 bg-ground/70 flex items-center justify-center text-paper font-display text-xl">
                +{photos.length - 5} more
              </div>
            )}
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            aria-label="Close gallery"
            className="absolute top-6 right-6 text-paper text-3xl"
            onClick={() => setLightboxIndex(null)}
          >
            &times;
          </button>

          <button
            type="button"
            aria-label="Previous photo"
            className="absolute left-4 md:left-8 text-paper text-4xl px-2"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i === null ? 0 : (i - 1 + photos.length) % photos.length));
            }}
          >
            &#8249;
          </button>

          <div
            className="relative w-full max-w-5xl aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightboxIndex]}
              alt={`${alt} — photo ${lightboxIndex + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            aria-label="Next photo"
            className="absolute right-4 md:right-8 text-paper text-4xl px-2"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i === null ? 0 : (i + 1) % photos.length));
            }}
          >
            &#8250;
          </button>

          <p className="absolute bottom-6 text-warm-gray text-sm">
            {lightboxIndex + 1} / {photos.length}
          </p>
        </div>
      )}
    </>
  );
}
