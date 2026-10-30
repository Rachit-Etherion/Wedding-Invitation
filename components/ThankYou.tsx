import { Heart } from "lucide-react";
import { couple } from "@/lib/wedding";
import Ornament from "./Ornament";
import Reveal from "./Reveal";

export default function ThankYou() {
  return (
    <section className="paper px-6 pt-24 pb-16 text-center">
      <Reveal>
        <p className="font-hindi text-maroon-700 text-4xl">धन्यवाद</p>
        <h2 className="font-script text-maroon-800 mt-2 text-6xl">Thank You</h2>
      </Reveal>
      <Reveal delay={150} className="flex justify-center">
        <Ornament className="my-5" />
      </Reveal>
      <Reveal delay={250}>
        <p className="text-ink/80 mx-auto max-w-sm text-xl leading-relaxed">
          Your presence and blessings are the most precious gifts we could ask for. We can&rsquo;t wait to celebrate
          this new chapter with you.
        </p>
        <p className="text-ink/60 mt-8 italic">With love,</p>
        <p className="font-script text-maroon-800 mt-1 text-5xl">
          {couple.groom} &amp; {couple.bride}
        </p>
        <Heart className="heart-beat fill-maroon-700 text-maroon-700 mx-auto mt-6 h-6 w-6" />
        <p className="font-caps text-gold-700 mt-6 text-xs tracking-[0.3em]">{couple.hashtag}</p>
      </Reveal>
    </section>
  );
}
