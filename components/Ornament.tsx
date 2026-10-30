type Props = {
  className?: string;
};

/** Thin gold divider with a small lotus-diamond in the middle. */
export default function Ornament({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 240 24" className={`h-5 w-48 ${className}`} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="orn-gold" x1="0" x2="1">
          <stop offset="0" stopColor="#c09443" stopOpacity="0" />
          <stop offset="0.5" stopColor="#d4b064" />
          <stop offset="1" stopColor="#c09443" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 12h96M144 12h96" stroke="url(#orn-gold)" strokeWidth="1" />
      <path d="M120 2l8 10-8 10-8-10z" stroke="#c09443" strokeWidth="1" />
      <path d="M120 7l4 5-4 5-4-5z" fill="#c09443" />
      <path d="M104 12c4-5 8-5 10 0-2 5-6 5-10 0zM136 12c-4-5-8-5-10 0 2 5 6 5 10 0z" stroke="#c09443" strokeWidth="0.8" />
      <circle cx="98" cy="12" r="1.4" fill="#c09443" />
      <circle cx="142" cy="12" r="1.4" fill="#c09443" />
    </svg>
  );
}
