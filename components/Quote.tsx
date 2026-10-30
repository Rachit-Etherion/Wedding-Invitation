import Ornament from "./Ornament";
import Reveal from "./Reveal";

export default function Quote() {
  return (
    <section className="velvet relative overflow-hidden px-6 py-24 text-center">
      <svg
        viewBox="0 0 200 200"
        className="text-gold-300 pointer-events-none absolute top-1/2 left-1/2 h-[140vw] max-h-[640px] w-[140vw] max-w-[640px] -translate-x-1/2 -translate-y-1/2 animate-[spin_120s_linear_infinite] opacity-[0.07]"
        aria-hidden="true"
      >
        {Array.from({ length: 16 }, (_, i) => (
          <ellipse key={i} cx="100" cy="50" rx="14" ry="48" fill="none" stroke="currentColor" strokeWidth="0.8" transform={`rotate(${i * 22.5} 100 100)`} />
        ))}
        <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="0.6" />
      </svg>

      <div className="relative mx-auto max-w-lg">
        <Reveal>
          <span className="font-display text-gold-400/60 block text-7xl leading-none">&ldquo;</span>
          <p className="font-hindi text-gold-200 text-[26px] leading-[1.8]">
            सात फेरे, सात वचन,
            <br />
            सात जन्मों का साथ —
            <br />
            दो दिल, एक धड़कन,
            <br />
            एक नई शुरुआत।
          </p>
        </Reveal>
        <Reveal delay={200} className="flex justify-center">
          <Ornament className="my-6" />
        </Reveal>
        <Reveal delay={350}>
          <p className="text-ivory/85 text-xl leading-relaxed italic">
            Seven sacred rounds, seven promises, a bond for seven lifetimes — two hearts, one heartbeat, and one
            beautiful beginning.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
