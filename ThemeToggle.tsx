import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) { root.classList.add("dark"); localStorage.setItem("theme", "dark"); }
    else { root.classList.remove("dark"); localStorage.setItem("theme", "light"); }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(v => !v)}
      className="inline-flex items-center rounded-lg border px-3 py-2 text-sm hocus:bg-accent hocus:text-accent-foreground"
      aria-label="Basculer le thème"
      title="Basculer le thème"
    >
      {isDark ? "☾ Dark" : "☀︎ Light"}
    </button>
  );
}