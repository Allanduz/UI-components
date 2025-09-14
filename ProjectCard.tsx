import TechIcon from "./TechIcon";

type ProjectCardProps = {
  title: string;
  description?: string;
  tech: string[];
  image?: string;       // ex: "/projects/rentease-ts.jpg"
  image2x?: string;     // ex: "/projects/rentease-ts@2x.jpg" (optionnel pour Retina)
  liveUrl?: string;
  repoUrl?: string;
  variant?: "default" | "compact";
};

export default function ProjectCard({
  title,
  description,
  tech,
  image,
  image2x,
  liveUrl,
  repoUrl,
  variant = "default",
}: ProjectCardProps) {
  const compact = variant === "compact";

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-2xl border bg-card shadow-soft transition",
        "focus-within:ring-2 focus-within:ring-accent",
        compact ? "p-4" : ""
      ].join(" ")}
      aria-label={title}
    >
      {/* ------ Media ------ */}
      {!compact && (
        <div className="relative aspect-video w-full overflow-hidden">
          {image ? (
            <>
              <picture>
                {image2x && (
                  <source
                    srcSet={`${image2x} 2x, ${image} 1x`}
                    type="image/jpeg"
                  />
                )}
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  className="
                    h-full w-full object-cover
                    transition-transform duration-700
                    group-hover:scale-[1.02] group-hover:-translate-y-[2px]
                    will-change-transform
                    saturate-[1.03] contrast-[.98] brightness-[1.0]
                    object-center lg:object-[60%_50%]
                  "
                />
              </picture>

              {/* Dégradé latéral → fond plus propre côté contenu */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-background/10 to-background/25" />

              {/* Vignette douce (mask radial) */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(80% 65% at 70% 50%, black 60%, transparent 100%)",
                  maskImage:
                    "radial-gradient(80% 65% at 70% 50%, black 60%, transparent 100%)",
                  backgroundColor: "rgba(0,0,0,0.14)",
                }}
              />

              <div className="pointer-events-none absolute inset-0 mix-blend-multiply bg-[linear-gradient(120deg,rgba(99,102,241,0.06),rgba(56,189,248,0.05)_40%,rgba(52,211,153,0.05))]" />

              {repoUrl && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0"
                  aria-label={`${title} – open live`}
                />
              )}
            </>
          ) : (
            // Skeleton si pas d’image
            <div className="h-full w-full animate-pulse bg-gradient-to-br from-muted/40 to-muted/10" />
          )}
        </div>
      )}

      {/* ------ Body ------ */}
      <div className={compact ? "p-0" : "p-5"}>
        <h3 className={compact ? "text-base font-semibold" : "text-lg font-semibold"}>
          {title}
        </h3>

        {description && (
          <p className={compact ? "mt-1 text-xs text-muted-foreground" : "mt-2 text-sm text-muted-foreground"}>
            {description}
          </p>
        )}

        {/* Tech icons */}
        {tech?.length > 0 && (
          <div className={compact ? "mt-3 flex flex-wrap items-center gap-2" : "mt-4 flex flex-wrap items-center gap-2.5"}>
            {tech.map((t) => (
              <TechIcon key={t} name={t} size={compact ? 16 : 18} className="opacity-90" />
            ))}
          </div>
        )}

        {(liveUrl || repoUrl) && (
          <div className={compact ? "mt-3 flex items-center gap-3" : "mt-5 flex items-center gap-4"}>
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline-offset-4 hover:underline"
              >
                Live
              </a>
            )}
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline-offset-4 hover:underline"
              >
                Code
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
