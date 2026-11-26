// The copyright line on every Fano Properties page: the website footer and the /lp landing pages.
export const COPYRIGHT_HOLDER = "Fano Properties by Ali Raza";

export function copyrightLine(year: number = new Date().getFullYear()): string {
  return `© ${year} ${COPYRIGHT_HOLDER}. All Rights Reserved.`;
}

// The landing-page HTML (lp-pages/*.html and the "List your property" page) still carries the older
// credit, e.g. `© <span id="yr"></span> Fano Properties LLC.`; it is swapped for the line above when
// a page is served. The page's own script fills the year span, so the span stays; <bdi> keeps the
// English line in order on the Arabic (right-to-left) pages.
const LP_CREDIT = /©\s*<span id="yr">[^<]*<\/span>\s*(?:Fano Properties(?: LLC)?|فانو العقارية)\.?/g;

export function withCopyright(html: string): string {
  const year = new Date().getFullYear();
  return html.replace(LP_CREDIT, `<bdi>© <span id="yr">${year}</span> ${COPYRIGHT_HOLDER}. All Rights Reserved.</bdi>`);
}
