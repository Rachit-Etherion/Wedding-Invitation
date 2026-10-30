import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Great_Vibes, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--nf-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--nf-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const greatVibes = Great_Vibes({
  variable: "--nf-script",
  subsets: ["latin"],
  weight: "400",
});

const tiro = Tiro_Devanagari_Hindi({
  variable: "--nf-hindi",
  subsets: ["devanagari", "latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Sumit & Shivani — Wedding Invitation",
  description:
    "With the blessings of our families, Sumit & Shivani (Seema) invite you to celebrate their wedding on 10th December 2026.",
  openGraph: {
    title: "Sumit & Shivani are getting married!",
    description: "Join us on 10th December 2026. Tap to open your invitation.",
    images: ["/images/celebrate-sunset.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#4a0e17",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${greatVibes.variable} ${tiro.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
