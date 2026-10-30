import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { couple, weddingDateLabel } from "@/lib/wedding";
import Ornament from "./Ornament";

const PETALS = [
  { left: "6%", duration: "11s", delay: "0s" },
  { left: "18%", duration: "14s", delay: "3s" },
  { left: "30%", duration: "12s", delay: "6s" },
  { left: "44%", duration: "15s", delay: "1.5s" },
  { left: "57%", duration: "13s", delay: "8s" },
  { left: "68%", duration: "11.5s", delay: "4.5s" },
  { left: "80%", duration: "14.5s", delay: "2s" },
  { left: "92%", duration: "12.5s", delay: "7s" },
];

export default function Hero() {
  return (
    <section id="home" className="bg-maroon-950 relative flex h-svh min-h-[560px] items-end overflow-hidden">
      <Image
        src="/images/celebrate-sunset.jpg"
        alt={`${couple.groom} and ${couple.bride} walking hand in hand at sunset`}
        fill
        preload
        sizes="100vw"
        className="hero-photo object-cover object-[50%_35%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#2e070d]" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#2e070d] via-[#2e070d]/80 to-transparent" />

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {PETALS.map((p, i) => (
          <span key={i} className="petal" style={{ left: p.left, animationDuration: p.duration, animationDelay: p.delay }} />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-xl px-6 pb-[max(4.5rem,env(safe-area-inset-bottom))] text-center">
        <p
          className="hero-in font-caps text-gold-200 text-xs tracking-[0.45em] uppercase"
          style={{ "--delay": "200ms" } as React.CSSProperties}
        >
          We are getting married
        </p>

        <h1 className="mt-4 flex flex-col items-center">
          <span
            className="hero-in font-script gold-text text-7xl leading-[1.05] sm:text-8xl"
            style={{ "--delay": "450ms" } as React.CSSProperties}
          >
            {couple.groom}
          </span>
          <span
            className="hero-in font-script text-gold-300 -my-1 text-4xl"
            style={{ "--delay": "650ms" } as React.CSSProperties}
          >
            &amp;
          </span>
          <span
            className="hero-in font-script gold-text text-7xl leading-[1.05] sm:text-8xl"
            style={{ "--delay": "850ms" } as React.CSSProperties}
          >
            {couple.bride}
          </span>
          <span
            className="hero-in font-display text-gold-200/90 mt-1 text-xl italic"
            style={{ "--delay": "1000ms" } as React.CSSProperties}
          >
            ({couple.brideAlias})
          </span>
        </h1>

        <div className="hero-in mt-5 flex flex-col items-center" style={{ "--delay": "1200ms" } as React.CSSProperties}>
          <Ornament />
          <p className="font-caps text-ivory mt-3 text-base tracking-[0.3em] uppercase">{weddingDateLabel}</p>
        </div>
      </div>

      <a
        href="#countdown"
        aria-label="Scroll to countdown"
        className="hero-in text-gold-200/80 absolute bottom-5 left-1/2 z-10 -translate-x-1/2 animate-bounce"
        style={{ "--delay": "1800ms" } as React.CSSProperties}
      >
        <ChevronDown className="h-6 w-6" strokeWidth={1.5} />
      </a>
    </section>
  );
}
