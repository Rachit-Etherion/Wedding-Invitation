import { events } from "@/lib/wedding";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const YEAR = 2026;
const MONTH = 11; // December (0-indexed)
const WEDDING_DAY = 10;
const OTHER_EVENT_DAYS = [7, 12];
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export default function CalendarSection() {
  const firstWeekday = new Date(YEAR, MONTH, 1).getDay();
  const daysInMonth = new Date(YEAR, MONTH + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <section id="calendar" className="paper px-5 py-20">
      <SectionHeading eyebrow="Save the date" title="December 2026" />

      <Reveal className="mx-auto max-w-sm">
        <div className="border-gold-400/50 rounded-2xl border bg-white/70 p-5 shadow-[0_20px_50px_-25px_rgba(74,14,23,0.35)]">
          <div className="border-gold-400/30 mb-3 grid grid-cols-7 border-b pb-3">
            {WEEKDAYS.map((d, i) => (
              <span key={i} className="font-caps text-gold-700 text-center text-xs tracking-wider">
                {d}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-2">
            {cells.map((day, i) => {
              if (day === null) return <span key={i} />;
              if (day === WEDDING_DAY) {
                return (
                  <span key={i} className="relative flex aspect-square items-center justify-center">
                    <svg viewBox="0 0 24 24" className="heart-beat text-maroon-700 absolute h-[130%] w-[130%] drop-shadow-md" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.2 0 3.6 1.2 4.3 2.4h2c.7-1.2 2.1-2.4 4.3-2.4 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"
                      />
                    </svg>
                    <span className="font-display text-ivory relative -mt-0.5 text-lg font-bold">{day}</span>
                    <span className="sr-only">Wedding day</span>
                  </span>
                );
              }
              const isEvent = OTHER_EVENT_DAYS.includes(day);
              return (
                <span
                  key={i}
                  className={`font-display relative flex aspect-square items-center justify-center text-lg ${
                    isEvent ? "border-gold-500 text-maroon-800 rounded-full border font-semibold" : "text-ink/75"
                  }`}
                >
                  {day}
                </span>
              );
            })}
          </div>
        </div>

        <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-base">
          {events.map((e) => (
            <li key={e.id} className="text-ink/80 flex items-center gap-2">
              {e.theme === "wedding" ? (
                <span className="text-maroon-700">♥</span>
              ) : (
                <span className="border-gold-500 inline-block h-3 w-3 rounded-full border" />
              )}
              {e.title} · {e.date.split(" ")[0].replace(/\D/g, "")} Dec
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
