import { MapPin, Navigation } from "lucide-react";
import { events, mapsEmbedUrl, mapsSearchUrl, type Venue } from "@/lib/wedding";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

// Events that share a venue are shown together on one card.
function groupByVenue() {
  const groups = new Map<string, { venue: Venue; titles: string[] }>();
  for (const e of events) {
    const key = `${e.venue.name}|${e.venue.mapsQuery}`;
    const group = groups.get(key) ?? { venue: e.venue, titles: [] };
    group.titles.push(e.title);
    groups.set(key, group);
  }
  return [...groups.values()];
}

export default function VenueSection() {
  return (
    <section id="venue" className="paper px-5 py-20">
      <SectionHeading eyebrow="Where to find us" title="The Venue" />

      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        {groupByVenue().map(({ venue, titles }, i) => (
          <Reveal key={i} delay={i * 100}>
            <article className="border-gold-400/40 overflow-hidden rounded-2xl border bg-white shadow-[0_20px_50px_-25px_rgba(74,14,23,0.35)]">
              {venue.mapsQuery ? (
                <iframe
                  title={`Map of ${venue.name}`}
                  src={mapsEmbedUrl(venue.mapsQuery)}
                  className="h-56 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="velvet relative flex h-48 flex-col items-center justify-center">
                  <MapPin className="text-gold-300 h-12 w-12 animate-bounce" strokeWidth={1.3} />
                  <span className="bg-gold-300/30 mt-1 h-1.5 w-8 rounded-full blur-[1px]" />
                  <p className="font-caps text-gold-200/80 mt-4 text-[11px] tracking-[0.3em] uppercase">Map coming soon</p>
                </div>
              )}

              <div className="p-6 text-center">
                <p className="font-caps text-gold-700 text-[11px] tracking-[0.3em] uppercase">{titles.join(" · ")}</p>
                <h3 className="font-display text-maroon-800 mt-2 text-2xl font-semibold">{venue.name}</h3>
                <p className="text-ink/70 mt-1">{venue.address}</p>

                {venue.mapsQuery ? (
                  <a
                    href={mapsSearchUrl(venue.mapsQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-maroon-800 text-gold-200 font-caps mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs tracking-[0.2em] uppercase shadow-lg transition active:scale-95"
                  >
                    <Navigation className="h-4 w-4" strokeWidth={1.6} />
                    Open in Google Maps
                  </a>
                ) : (
                  <p className="text-ink/50 mt-4 text-base italic">Location details will be shared soon.</p>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
