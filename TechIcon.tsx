import { useState, useMemo } from "react";

function normalize(raw: string) {
  return String(raw)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "") 
    .replace(/\./g, "")
    .replace(/-/g, "");
}

const ALIASES: Record<string, string> = {
  postgressql: "postgresql",
  postgres: "postgresql",
  nodejs: "nodejs",
  framermotion: "framer",
};

const MAP: Record<string, string> = {
  // front
  react: "/tech/react.svg",
  typescript: "/tech/typescript.svg",
  javascript: "/tech/javascript.svg",
  css3: "/tech/css3.svg",
  html5: "/tech/html5.svg",
  vite: "/tech/vite.svg",
  tailwindcss: "/tech/tailwindcss.svg",
  framer: "/tech/framer.svg",

  // backend / cloud
  firebase: "/tech/firebase.svg",
  cloudinary: "/tech/cloudinary.svg",
  express: "/tech/express.svg",
  mongodb: "/tech/mongodb.svg",
  jwt: "/tech/jwt.png",

  // ce qui posait souci : tout en minuscules
  postgresql: "/tech/postgresql.svg",
  prisma: "/tech/prisma.png",
  docker: "/tech/docker.svg",
  nodejs: "/tech/nodejs.svg",
};

const FALLBACK_DATA_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
       <circle cx='12' cy='12' r='10' fill='%239ca3af'/>
     </svg>`
  );

type Props = {
  name: string;
  size?: number;
  className?: string;
  title?: string;
  srcOverride?: string;
};

export default function TechIcon({
  name,
  size = 20,
  className = "",
  title,
  srcOverride,
}: Props) {
  const [errored, setErrored] = useState(false);

  const src = useMemo(() => {
    if (srcOverride) return srcOverride;
    const key = normalize(name);
    const canonical = ALIASES[key] ?? key;
    return MAP[canonical];
  }, [name, srcOverride]);

  const label = title || name;

  if (!src || errored) {
    return (
      <img
        src={FALLBACK_DATA_URI}
        width={size}
        height={size}
        alt={label}
        title={label}
        className={className}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <img
      src={src}
      width={size}
      height={size}
      alt={label}
      title={label}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setErrored(true)}
    />
  );
}
