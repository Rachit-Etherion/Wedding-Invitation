"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { couple, navLinks, weddingDateLabel } from "@/lib/wedding";

export default function Navbar({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-700 ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"
        } ${scrolled ? "bg-maroon-900/90 shadow-lg shadow-black/20 backdrop-blur-md" : "bg-gradient-to-b from-black/40 to-transparent"}`}
      >
        <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 pt-[env(safe-area-inset-top)]">
          <a href="#home" className="font-script gold-text text-3xl leading-none" aria-label="Back to top">
            {couple.groom[0]}&thinsp;&amp;&thinsp;{couple.bride[0]}
          </a>

          <ul className="hidden items-center gap-6 md:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="font-caps text-gold-200 hover:text-gold-300 text-xs tracking-[0.2em] uppercase">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="text-gold-200 border-gold-300/40 flex h-10 w-10 items-center justify-center rounded-full border md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </nav>
      </header>

      <div
        className={`velvet fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          className="text-gold-200 border-gold-300/40 absolute top-[calc(env(safe-area-inset-top)+8px)] right-4 flex h-10 w-10 items-center justify-center rounded-full border"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>

        <p className="font-script gold-text mb-8 text-5xl">
          {couple.groom} &amp; {couple.bride}
        </p>
        <ul className="flex flex-col items-center gap-5">
          {navLinks.map((l, i) => (
            <li
              key={l.href}
              className="transition-all duration-500"
              style={{
                transitionDelay: menuOpen ? `${120 + i * 60}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "none" : "translateY(12px)",
              }}
            >
              <a
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="font-caps text-gold-200 active:text-gold-300 text-lg tracking-[0.25em] uppercase"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="font-caps text-gold-300/70 mt-10 text-[11px] tracking-[0.35em] uppercase">{weddingDateLabel}</p>
      </div>
    </>
  );
}
