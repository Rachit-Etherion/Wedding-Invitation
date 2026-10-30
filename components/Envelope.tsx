"use client";

import { useEffect, useRef, useState } from "react";
import { Hand } from "lucide-react";
import { couple } from "@/lib/wedding";

type Props = {
  /** Called as the envelope starts fading away — the page behind can begin animating. */
  onReveal: () => void;
  /** Called once the envelope is fully gone and can be unmounted. */
  onDone: () => void;
};

type Phase = "idle" | "opening" | "leaving";

// Petals that drift down once the envelope opens
const PETAL_SHOWER = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  duration: `${5 + ((i * 7) % 4)}s`,
  delay: `${0.9 + ((i * 3) % 8) * 0.12}s`,
}));

const SPARKLES = [
  { top: "8%", left: "12%", delay: "0s" },
  { top: "14%", left: "82%", delay: "0.8s" },
  { top: "28%", left: "6%", delay: "1.6s" },
  { top: "36%", left: "92%", delay: "0.4s" },
  { top: "70%", left: "10%", delay: "1.2s" },
  { top: "78%", left: "86%", delay: "2s" },
  { top: "88%", left: "30%", delay: "0.6s" },
  { top: "92%", left: "70%", delay: "1.4s" },
  { top: "20%", left: "45%", delay: "2.4s" },
];

export default function Envelope({ onReveal, onDone }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");
  const touchStartY = useRef<number | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  function open() {
    if (phase !== "idle") return;
    setPhase("opening");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, reduced ? ms / 3 : ms));

    later(() => {
      setPhase("leaving");
      onReveal();
    }, 3000);
    later(onDone, 4600);
  }

  return (
    <div
      className={`envelope-overlay velvet fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-4 ${
        phase !== "idle" ? "is-opening" : ""
      } ${phase === "leaving" ? "is-leaving" : ""}`}
      onWheel={(e) => e.deltaY > 6 && open()}
      onTouchStart={(e) => (touchStartY.current = e.touches[0].clientY)}
      onTouchMove={(e) => {
        if (touchStartY.current !== null && touchStartY.current - e.touches[0].clientY > 40) open();
      }}
    >
      {SPARKLES.map((s, i) => (
        <span key={i} className="sparkle" style={{ top: s.top, left: s.left, animationDelay: s.delay }} />
      ))}

      {phase !== "idle" && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {PETAL_SHOWER.map((p, i) => (
            <span key={i} className="petal" style={{ left: p.left, animationDuration: p.duration, animationDelay: p.delay }} />
          ))}
        </div>
      )}

      <div className="envelope-zoom flex flex-col items-center">
        <div className="env-hint mb-10 text-center transition-all duration-500">
          <p className="font-hindi text-gold-300 text-base tracking-wide">॥ शुभ विवाह ॥</p>
          <p className="font-script gold-text mt-1 text-5xl leading-snug">You&rsquo;re Invited</p>
          <p className="font-caps text-gold-200/80 mt-2 text-[11px] tracking-[0.4em] uppercase">
            {couple.groom} &amp; {couple.bride}
          </p>
        </div>

        <div className="envelope-float relative">
          <div className="env-glow" aria-hidden="true" />
          <button type="button" aria-label="Open the invitation" className="envelope block" onClick={open}>
            <div className="env-back" />

            <div className="env-letter flex flex-col items-center justify-start p-[5%] text-center">
              <div className="border-gold-400/60 flex h-full w-full flex-col items-center rounded-sm border p-[4%] outline outline-1 outline-offset-[3px] outline-gold-400/40">
                <p className="font-hindi text-maroon-700 text-[clamp(10px,3vw,13px)]">॥ श्री गणेशाय नमः ॥</p>
                <p className="font-script text-maroon-800 mt-[3%] text-[clamp(26px,9vw,40px)] leading-none">
                  {couple.groom} &amp; {couple.bride}
                </p>
                <p className="font-caps text-gold-700 mt-[4%] text-[clamp(9px,2.6vw,12px)] tracking-[0.3em]">
                  10 · 12 · 2026
                </p>
              </div>
            </div>

            <div className="env-pocket" />
            <div className="env-pocket-bottom" />
            <p className="font-script text-maroon-800/80 absolute inset-x-0 bottom-[9%] z-[3] text-center text-[clamp(16px,5vw,22px)]">
              For You &amp; Family
            </p>

            <div className="env-flap" />

            <div className="env-seal">
              <div className="env-seal-wax flex items-center justify-center">
                <span className="font-script text-gold-300 text-[26px] leading-none drop-shadow">S&thinsp;S</span>
              </div>
            </div>
          </button>
        </div>

        <div className="env-hint mt-12 flex flex-col items-center gap-2 text-center transition-all duration-500">
          <Hand className="tap-hand text-gold-300 h-7 w-7" strokeWidth={1.4} />
          <p className="font-caps text-gold-200 text-xs tracking-[0.3em] uppercase">Tap to open</p>
          <p className="text-gold-200/60 text-sm italic">or swipe up</p>
        </div>
      </div>
    </div>
  );
}

