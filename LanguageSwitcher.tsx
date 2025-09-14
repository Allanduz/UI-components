import { useEffect, useRef, useState } from "react";
import i18n from "../../i18n";

const LANGS = [
  { code: "en", label: "EN 🇺🇸" },
  { code: "fr", label: "FR 🇫🇷" },
  { code: "pt", label: "PT 🇵🇹" },
];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const current = (i18n.language || "en").slice(0, 2);
  const ref = useRef<HTMLDivElement>(null);

  function change(code: string) {
    i18n.changeLanguage(code);
    setOpen(false);
  }

  // close on outside click / Esc
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative z-50">
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-10 items-center justify-center rounded-lg border px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change language"
      >
        {current.toUpperCase()}
        <svg viewBox="0 0 24 24" className="ml-1 h-4 w-4" aria-hidden>
          <path fill="currentColor" d="M7 10l5 5 5-5z" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-28 overflow-hidden rounded-lg border bg-popover shadow-lg"
        >
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => change(l.code)}
              role="menuitem"
              className={`flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${
                current === l.code ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <span>{l.label}</span>
              {current === l.code && (
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                  <path fill="currentColor" d="M9 16.2 4.8 12l1.4-1.4L9 13.4l8.8-8.8L19.2 6 9 16.2z" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
