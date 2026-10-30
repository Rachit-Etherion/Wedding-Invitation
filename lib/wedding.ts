// All invitation content lives here — edit this file to update names, dates and venues.

export const couple = {
  groom: "Sumit",
  bride: "Shivani",
  brideAlias: "Seema",
  hashtag: "#SumitWedsShivani",
};

// Countdown target: Baraat on the wedding day (IST)
export const weddingDateISO = "2026-12-10T18:00:00+05:30";
export const weddingDateLabel = "10th December 2026";

export type Venue = {
  name: string;
  address: string;
  // Text used to search Google Maps, e.g. "Hotel Name, City". Leave empty until known.
  mapsQuery: string;
};

export type WeddingEvent = {
  id: string;
  number: string;
  title: string;
  hindiTitle: string;
  date: string;
  day: string;
  theme: "haldi" | "wedding" | "reception";
  schedule: { time?: string; label: string; note?: string }[];
  venue: Venue;
};

const venueTBA: Venue = {
  name: "Venue to be announced",
  address: "Address coming soon",
  mapsQuery: "",
};

export const events: WeddingEvent[] = [
  {
    id: "haldi-mehndi",
    number: "01",
    title: "Haldi & Mehndi",
    hindiTitle: "हल्दी एवं मेहंदी",
    date: "7th December 2026",
    day: "Monday",
    theme: "haldi",
    schedule: [{ time: "11 AM onwards", label: "Celebrations begin" }],
    venue: { ...venueTBA },
  },
  {
    id: "wedding",
    number: "02",
    title: "Wedding",
    hindiTitle: "शुभ विवाह",
    date: "10th December 2026",
    day: "Thursday",
    theme: "wedding",
    schedule: [
      { time: "6:00 PM", label: "Baraat" },
      { time: "7:00 PM", label: "Dinner" },
      { time: "Midnight", label: "Wedding Ceremony" },
      { label: "Vidai", note: "Taaron Ki Chhaon Mein" },
    ],
    venue: { ...venueTBA },
  },
  {
    id: "reception",
    number: "03",
    title: "Reception",
    hindiTitle: "प्रीतिभोज",
    date: "12th December 2026",
    day: "Saturday",
    theme: "reception",
    schedule: [{ time: "6 PM onwards", label: "Celebrations begin" }],
    venue: { ...venueTBA },
  },
];

export const gallery = [
  { src: "/images/sumit-shivani.jpg", alt: "Sumit and Shivani in wedding attire", wide: true },
  { src: "/images/story-laugh.jpg", alt: "Sumit and Shivani laughing together" },
  { src: "/images/story-proposal.jpg", alt: "The proposal at sunset" },
  { src: "/images/story-dating.jpg", alt: "Coffee date in the garden" },
  { src: "/images/celebrate-sunset.jpg", alt: "Walking together at sunset" },
];

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#countdown", label: "Countdown" },
  { href: "#calendar", label: "Save the Date" },
  { href: "#events", label: "Events" },
  { href: "#venue", label: "Venue" },
  { href: "#gallery", label: "Gallery" },
];

export function mapsSearchUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function mapsEmbedUrl(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}
