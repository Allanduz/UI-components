type Props = { className?: string };

export default function Glow({ className = "" }: Props) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 -top-32 h-64 bg-glow blur-3xl ${className}`}
    />
  );
}
