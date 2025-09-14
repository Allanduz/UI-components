import { useState, useMemo } from "react";

type Props = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
};

export default function PortraitCard({
  src,
  alt = "Portrait",
  width,
  height,
}: Props) {
  const [errored, setErrored] = useState(false);

  const url = useMemo(() => {
    if (!src.startsWith("/")) {
      return `/${src}`;
    }
    return src;
  }, [src]);


  const fallback =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'>
        <defs>
          <linearGradient id='g' x1='0' x2='1'>
            <stop offset='0' stop-color='#6366F1'/><stop offset='1' stop-color='#34D399'/>
          </linearGradient>
        </defs>
        <rect width='400' height='400' fill='#0b0b0d'/>
        <circle cx='200' cy='150' r='80' fill='url(#g)' opacity='0.35'/>
        <rect x='110' y='250' width='180' height='80' rx='40' fill='url(#g)' opacity='0.2'/>
      </svg>`
    );

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-tr from-indigo-500/20 via-sky-500/10 to-emerald-400/20 blur-2xl" />
      <div className="overflow-hidden rounded-2xl border bg-card shadow-soft">
        <img
          src={errored ? fallback : url}
          alt={alt}
          width={width}
          height={height}
          className="aspect-square w-full object-cover"
          loading="eager"
          decoding="async"
          sizes="(min-width: 768px) 33vw, 100vw"
          onError={() => setErrored(true)}
        />
      </div>
    </div>
  );
}
