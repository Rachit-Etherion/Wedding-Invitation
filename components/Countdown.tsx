"use client";

import { useEffect, useState } from "react";
import { weddingDateISO } from "@/lib/wedding";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const TARGET = new Date(weddingDateISO).getTime();

function remaining() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    Days: Math.floor(diff / 86_400_000),
    Hours: Math.floor(diff / 3_600_000) % 24,
    Minutes: Math.floor(diff / 60_000) % 60,
    Seconds: Math.floor(diff / 1000) % 60,
  };
}

export default function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof remaining> | null>(null);

  useEffect(() => {
    const tick = () => setTime(remaining());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const done = time !== null && Object.values(time).every((v) => v === 0);
  const units = time ?? { Days: null, Hours: null, Minutes: null, Seconds: null };

  return (
    <section id="countdown" className="velvet px-5 py-20">
      <SectionHeading eyebrow="Until we say I do" title="The Countdown" dark />

      <div className="mx-auto grid max-w-md grid-cols-4 gap-2.5 sm:gap-4">
        {Object.entries(units).map(([label, value], i) => (
          <Reveal key={label} delay={i * 120}>
            <div className="border-gold-400/50 bg-maroon-950/40 flex aspect-[3/4] flex-col items-center justify-center rounded-t-full border px-1 pt-3 shadow-[inset_0_0_20px_rgba(230,203,134,0.08)]">
              <span className="font-display text-gold-200 text-4xl font-semibold tabular-nums sm:text-5xl">
                {value === null ? "--" : String(value).padStart(2, "0")}
              </span>
              <span className="font-caps text-gold-300/80 mt-1 text-[9px] tracking-[0.2em] uppercase sm:text-[11px]">
                {label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={300}>
        <p className="text-gold-200/80 mx-auto mt-8 max-w-xs text-center text-lg italic">
          {done ? "The celebrations have begun!" : "…and every second brings us closer to celebrating with you."}
        </p>
      </Reveal>
    </section>
  );
}
