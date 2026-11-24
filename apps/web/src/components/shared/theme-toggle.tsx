"use client";

import { THEME_KEY } from "@/lib/site-theme";

// Switches the website between the sand (team app) and navy colour themes and remembers the choice.
// The same choice applies on the /lp landing pages, which read the same saved setting.
export function ThemeToggle() {
  function toggle() {
    const d = document.documentElement;
    const next = d.dataset.theme === "navy" ? "sand" : "navy";
    d.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
  }

  return (
    <button type="button" onClick={toggle} className="theme-tg" aria-label="Switch colour theme" title="Switch colour theme (sand / navy)">
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
      </svg>
    </button>
  );
}
