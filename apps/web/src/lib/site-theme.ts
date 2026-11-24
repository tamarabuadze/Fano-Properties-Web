// The website has two colour themes:
//   sand  the Fano team app's light "Calcite Sand" look (default)
//   navy  the earlier dark navy-and-gold fanoproperties.com look
// SITE_THEME on Railway picks the one visitors see first (website and /lp landing pages).
// Visitors can switch with the theme button; their choice is remembered in the browser.
export type SiteTheme = "sand" | "navy";
export const THEME_KEY = "fano-theme";

export function defaultTheme(): SiteTheme {
  return process.env.SITE_THEME?.trim().toLowerCase() === "navy" ? "navy" : "sand";
}

/** Inline script that applies the visitor's saved theme before the page paints */
export function themeScript(fallback: SiteTheme): string {
  return `(function(){var d=document.documentElement,t;try{t=localStorage.getItem(${JSON.stringify(THEME_KEY)})}catch(e){}d.dataset.theme=t==="navy"||t==="sand"?t:${JSON.stringify(fallback)}})();`;
}
