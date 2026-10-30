import Ornament from "./Ornament";
import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  dark?: boolean;
};

export default function SectionHeading({ eyebrow, title, dark = false }: Props) {
  return (
    <Reveal className="mb-10 flex flex-col items-center text-center">
      <p className={`font-caps text-xs tracking-[0.35em] uppercase ${dark ? "text-gold-300" : "text-gold-700"}`}>
        {eyebrow}
      </p>
      <h2 className={`font-script mt-2 text-5xl leading-tight sm:text-6xl ${dark ? "gold-text" : "text-maroon-800"}`}>
        {title}
      </h2>
      <Ornament className="mt-3" />
    </Reveal>
  );
}
