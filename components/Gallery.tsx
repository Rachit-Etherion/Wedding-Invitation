"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gallery } from "@/lib/wedding";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const step = useCallback(
    (dir: number) => setActive((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length)),
    [],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, step]);

  return (
    <section id="gallery" className="velvet px-4 py-20">
      <SectionHeading eyebrow="Little moments" title="Our Gallery" dark />

      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3">
        {gallery.map((photo, i) => (
          <Reveal key={photo.src} delay={(i % 2) * 120} className={photo.wide ? "col-span-2" : ""}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className={`group border-gold-400/30 relative block w-full overflow-hidden rounded-xl border ${
                photo.wide ? "aspect-[16/10]" : "aspect-square"
              }`}
              aria-label={`View photo: ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={photo.wide ? "(max-width: 768px) 100vw, 768px" : "(max-width: 768px) 50vw, 384px"}
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </button>
          </Reveal>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
          onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touchStartX.current = null;
          }}
        >
          <div className="relative h-[80svh] w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <Image key={active} src={gallery[active].src} alt={gallery[active].alt} fill sizes="100vw" className="object-contain" />
          </div>

          <button type="button" aria-label="Close" onClick={() => setActive(null)} className="text-ivory absolute top-4 right-4 p-2">
            <X className="h-7 w-7" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => (e.stopPropagation(), step(-1))}
            className="text-ivory absolute left-2 rounded-full bg-black/40 p-2"
          >
            <ChevronLeft className="h-7 w-7" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => (e.stopPropagation(), step(1))}
            className="text-ivory absolute right-2 rounded-full bg-black/40 p-2"
          >
            <ChevronRight className="h-7 w-7" strokeWidth={1.5} />
          </button>
          <p className="font-caps text-gold-200 absolute bottom-6 text-xs tracking-[0.3em]">
            {active + 1} / {gallery.length}
          </p>
        </div>
      )}
    </section>
  );
}
