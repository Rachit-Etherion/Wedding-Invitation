import { CalendarDays, Clock, MapPin, Sparkles } from "lucide-react";
import { events, mapsSearchUrl, type WeddingEvent } from "@/lib/wedding";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const THEMES: Record<WeddingEvent["theme"], { header: string; accent: string }> = {
  haldi: { header: "bg-gradient-to-br from-[#f7cf5a] via-[#e9a92c] to-[#d9822b]", accent: "text-[#b86b12]" },
  wedding: { header: "bg-gradient-to-br from-[#9e2338] via-[#821c30] to-[#4a0e17]", accent: "text-maroon-700" },
  reception: { header: "bg-gradient-to-br from-[#d4b064] via-[#a77c32] to-[#6f4e1c]", accent: "text-gold-700" },
};

export default function Events() {
  return (
    <section id="events" className="bg-cream px-5 py-20">
      <SectionHeading eyebrow="Join us for" title="The Celebrations" />

      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
        {events.map((event, i) => (
          <Reveal key={event.id} delay={i * 100}>
            <EventCard event={event} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function EventCard({ event }: { event: WeddingEvent }) {
  const theme = THEMES[event.theme];
  const lightText = event.theme !== "haldi";

  return (
    <article className="overflow-hidden rounded-t-[999px] rounded-b-2xl bg-white shadow-[0_25px_50px_-25px_rgba(74,14,23,0.45)]">
      <header className={`${theme.header} relative px-6 pt-14 pb-7 text-center`}>
        <span
          className={`font-caps absolute top-6 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.35em] ${lightText ? "text-gold-200/80" : "text-maroon-900/70"}`}
        >
          EVENT {event.number}
        </span>
        <p className={`font-hindi text-lg ${lightText ? "text-gold-200" : "text-maroon-900"}`}>{event.hindiTitle}</p>
        <h3 className={`font-script text-5xl leading-tight ${lightText ? "text-ivory" : "text-maroon-950"}`}>{event.title}</h3>
      </header>

      <div className="px-6 pt-6 pb-7">
        <p className="text-ink flex items-center justify-center gap-2 text-lg">
          <CalendarDays className={`h-4 w-4 ${theme.accent}`} strokeWidth={1.6} />
          <span className="font-semibold">{event.date}</span>
          <span className="text-ink/60">· {event.day}</span>
        </p>

        <ol className="border-gold-400/40 mt-5 space-y-3 border-t pt-5">
          {event.schedule.map((item) => (
            <li key={item.label} className="flex items-start gap-3">
              {item.time ? (
                <Clock className={`mt-1 h-4 w-4 shrink-0 ${theme.accent}`} strokeWidth={1.6} />
              ) : (
                <Sparkles className={`mt-1 h-4 w-4 shrink-0 ${theme.accent}`} strokeWidth={1.6} />
              )}
              <div className="flex-1">
                <p className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <span className="text-ink text-lg font-semibold">{item.label}</span>
                  {item.time && <span className={`font-caps text-sm tracking-wider ${theme.accent}`}>{item.time}</span>}
                </p>
                {item.note && (
                  <p className="text-ink/70 italic">
                    {item.note} <span className="font-hindi not-italic">· तारों की छाँव में</span>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>

        <div className="bg-ivory border-gold-400/40 mt-6 rounded-xl border border-dashed p-4 text-center">
          <p className="flex items-center justify-center gap-1.5">
            <MapPin className={`h-4 w-4 ${theme.accent}`} strokeWidth={1.6} />
            <span className="text-ink font-semibold">{event.venue.name}</span>
          </p>
          <p className="text-ink/60 text-base">{event.venue.address}</p>
          {event.venue.mapsQuery && (
            <a
              href={mapsSearchUrl(event.venue.mapsQuery)}
              target="_blank"
              rel="noopener noreferrer"
              className={`font-caps mt-2 inline-block text-xs tracking-[0.2em] underline underline-offset-4 ${theme.accent}`}
            >
              Get Directions
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
