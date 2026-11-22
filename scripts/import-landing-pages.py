#!/usr/bin/env python3
"""One-off import of the ad landing pages from the Fano team app into the website.

  python3 scripts/import-landing-pages.py <folder with the downloaded pages>

The folder holds en.html, ar.html, symphony.html (English Symphony), en-<key>.html, ar-<key>.html,
lp.css and lp-rtl.css as served by the team app. The script writes the pages to apps/web/lp-pages/
and the styles to apps/web/public/lp-assets/, in the team app's light "Calcite Sand" look: the navy
fanoproperties.com layer (between /* lx:start */ and /* lx:end */) and the Dubai film behind the
page are removed, and the few dark-only colours after it are moved to the sand palette.
After this the website owns the pages; edit apps/web/lp-pages/*.html directly.
"""
import pathlib, re, sys

SRC = pathlib.Path(sys.argv[1])
ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGES = ROOT / "apps/web/lp-pages"
CSS = ROOT / "apps/web/public/lp-assets"
VERSION = "calcite1"

# Dark-theme colours that survive after /* lx:end */, and their sand equivalents
TAIL = [
    ("color:rgba(244,239,234,.86)", "color:var(--text)"),
    ("color:rgba(244,239,234,.85)", "color:var(--text)"),
    ("color:rgba(244,239,234,.8)", "color:var(--muted)"),
    ("color:rgba(244,239,234,.72)", "color:var(--muted)"),
    ("color:#F4EFEA", "color:var(--text)"),
    ("color:#F7D597", "color:var(--gold-deep)"),
    ("color:#E2A862", "color:var(--gold-deep)"),
    ("background:#1B2438", "background:var(--surface)"),
    ("background:rgba(11,18,32,.82)", "background:rgba(43,37,32,.9)"),
    ('font-family:"Playfair Display",Georgia,serif', "font-family:Montserrat,system-ui,sans-serif;font-weight:600"),
]

# Shared extras: the team app's WhatsApp button, section numerals and a few sand touches
EXTRA = """
/* ---- website-owned extras (Calcite Sand, same as the Fano team app) ---- */
.lx-numeral{display:inline-flex;align-items:center;gap:12px;margin:0 0 14px;font:600 11px Montserrat,system-ui,sans-serif;letter-spacing:.2em;color:var(--gold-deep)}
.lx-numeral::after{content:"";width:24px;height:1px;background:rgba(140,106,71,.45)}
.top .lang{color:var(--muted)}.top .lang:hover{color:var(--gold-deep)}
.hero-art{display:block}
.wa-float{position:fixed;right:24px;bottom:24px;z-index:40;display:flex;align-items:center;gap:10px;text-decoration:none}
html[dir=rtl] .wa-float{right:auto;left:24px;flex-direction:row-reverse}
.wa-float .dot{position:relative;width:60px;height:60px;border-radius:50%;background:#25D366;display:grid;place-items:center;box-shadow:0 12px 26px -8px rgba(18,140,74,.65),0 2px 6px rgba(0,0,0,.14);transition:transform .15s}
.wa-float .dot::after{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid #25D366;animation:waPulse 2.4s ease-out infinite}
.wa-float:hover .dot{transform:scale(1.07)}
.wa-float .lbl{order:-1;opacity:0;transform:translateX(6px);pointer-events:none;transition:opacity .2s,transform .2s;background:rgba(43,37,32,.9);color:#F4EFEA;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);font:600 14px Inter,system-ui,sans-serif;padding:9px 14px;border-radius:12px;box-shadow:var(--shadow);white-space:nowrap}
html[dir=rtl] .wa-float .lbl{order:0;font-family:"IBM Plex Sans Arabic",Inter,sans-serif}
.wa-float:hover .lbl,.wa-float:focus-visible .lbl{opacity:1;transform:none}
.wa-float:focus-visible .dot{box-shadow:0 0 0 4px rgba(226,168,98,.55)}
@keyframes waPulse{0%{transform:scale(1);opacity:.7}70%{transform:scale(1.45);opacity:0}100%{opacity:0}}
@media (max-width:720px){.wa-float,html[dir=rtl] .wa-float{bottom:calc(86px + env(safe-area-inset-bottom))}.wa-float{right:16px}html[dir=rtl] .wa-float{left:16px}.wa-float .dot{width:56px;height:56px}.wa-float .lbl{display:none}}
@media (prefers-reduced-motion:reduce){.wa-float .dot::after{animation:none;opacity:0}}
"""

WA_SVG = '<svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true"><path fill="#fff" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z"/></svg>'


def sand_css(css: str) -> str:
    i, j = css.find("/* lx:start"), css.find("/* lx:end */")
    if i < 0:
        head, tail = css, ""
    else:
        head, tail = css[:i], css[j + len("/* lx:end */"):] if j >= 0 else ""
    for a, b in TAIL:
        tail = tail.replace(a, b)
    return head + tail


def link(p: str) -> str:
    """Team-app page paths become /lp/... on the website."""
    m = re.match(r"^/(?:(en|ar)(?:/([a-z0-9-]+))?|(symphony))(?=$|[#?])(.*)$", p)
    if not m:
        return p
    if m.group(3):
        return "/lp/en/symphony" + m.group(4)
    return f"/lp/{m.group(1)}" + (f"/{m.group(2)}" if m.group(2) else "") + m.group(4)


def page(html: str) -> str:
    html = re.sub(r"<!--lpbg:start-->.*?<!--lpbg:end-->", "", html, flags=re.S)
    html = re.sub(r"<style>(.*?)</style>", lambda m: "<style>" + sand_css(m.group(1)) + "</style>", html, flags=re.S)
    html = re.sub(r'<link rel="stylesheet" href="/lp\.css[^"]*">', f'<link rel="stylesheet" href="/lp-assets/lp.css?v={VERSION}">', html)
    html = re.sub(r'<link rel="stylesheet" href="/lp-rtl\.css[^"]*">', f'<link rel="stylesheet" href="/lp-assets/lp-rtl.css?v={VERSION}">', html)
    if "/lp-assets/lp.css" not in html:  # pages that carry their styles inline still get the extras
        html = html.replace("</head>", f'<link rel="stylesheet" href="/lp-assets/extras.css?v={VERSION}">\n</head>', 1)
    html = html.replace("Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&", "Source+Serif+4:ital,wght@1,400&")
    html = html.replace('href="/icons/icon-192.png"', 'href="/icon"')
    html = html.replace('content="#0B1220"', 'content="#E6DFD5"')
    html = html.replace('style="color:#F4EFEA"', 'style="color:var(--text)"')
    html = html.replace('fill="#C4AD8E"', 'fill="#8C6A47"')  # logo: sand is for dark backgrounds, bronze for light
    html = html.replace('fetch("/api/lead"', 'fetch("/api/lp-lead"')
    html = re.sub(r'\b(href)="(/(?!/)[^"]*)"', lambda m: f'{m.group(1)}="{link(m.group(2))}"', html)
    if 'class="wa-float"' not in html:
        ar = 'lang="ar"' in html[:300]
        label = "تواصل معنا عبر واتساب" if ar else "Chat on WhatsApp"
        btn = f'<a class="wa-float" target="_blank" rel="noopener" data-wa href="https://wa.me/971525719164" aria-label="WhatsApp"><span class="dot">{WA_SVG}</span><span class="lbl">{label}</span></a>\n'
        # before the page script, so it fills the WhatsApp message for this property
        k = html.rfind("<script>")
        html = html[:k] + btn + html[k:] if k >= 0 else html.replace("</body>", btn + "</body>")
    return html


PAGES.mkdir(parents=True, exist_ok=True)
CSS.mkdir(parents=True, exist_ok=True)
(CSS / "lp.css").write_text(sand_css((SRC / "lp.css").read_text()) + EXTRA)
rtl = (SRC / "lp-rtl.css").read_text()
rtl = re.sub(r"/\* floating WhatsApp button.*", "", rtl, flags=re.S)  # replaced by EXTRA
(CSS / "lp-rtl.css").write_text(rtl)
(CSS / "extras.css").write_text(EXTRA)

for f in sorted(SRC.glob("*.html")):
    name = "en-symphony.html" if f.name == "symphony.html" else f.name
    (PAGES / name).write_text(page(f.read_text()))
    print("wrote", name)
