// The "List your property" ad landing page, in English and Arabic: complete HTML documents served by
// app/lp/en/list-your-property and app/lp/ar/list-your-property. Their form posts to /api/lp/listing.
// <!--GOOGLE_TAG--> is replaced with the website's Google tag when the page is served.
// The two languages share one layout: when you change one, make the same change in the other.

export const LIST_YOUR_PROPERTY_PAGES = {
  en: String.raw`<!doctype html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>List your property with Fano Properties | Dubai</title>
<meta name="description" content="Selling or leasing in Dubai? Share your property's details and a senior Fano advisor will come back to you within 24 hours. No obligation.">
<meta name="theme-color" content="#0a0907">
<meta property="og:title" content="List your property with Fano Properties | Dubai">
<meta property="og:description" content="Selling or leasing in Dubai? Share your property's details and a senior Fano advisor will come back to you within 24 hours. No obligation.">
<meta property="og:type" content="website">
<link rel="canonical" href="https://fanoproperties.com/lp/en/list-your-property">
<link rel="alternate" hreflang="en" href="https://fanoproperties.com/lp/en/list-your-property">
<link rel="alternate" hreflang="ar" href="https://fanoproperties.com/lp/ar/list-your-property">
<link rel="icon" href="https://fano-ai.fanoproperties.workers.dev/icons/icon-192.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&family=Montserrat:wght@600&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600&display=swap" rel="stylesheet">
<!--GOOGLE_TAG-->
<style>
:root{
  --s0:#0a0907;--s1:#13110e;--s2:#1c1915;
  --ink:#f4efe6;--muted:#a39b8c;
  --gold:#c9a96a;--gold3:#e2cc9a;--gold7:#8a6a2f;
  --hair:rgba(201,169,106,.24);--div:rgba(244,239,230,.08);--ctl:#5a5347;
  --danger:#e8816f;--logo:#C4AD8E;
  --serif:"Source Serif 4","Source Serif Pro",Georgia,serif;
  --sans:Inter,"Helvetica Neue",Arial,system-ui,sans-serif;
  --pad:clamp(20px,5vw,80px);
}
[dir=rtl]{--serif:"IBM Plex Sans Arabic","Noto Sans Arabic",Tahoma,sans-serif;--sans:"IBM Plex Sans Arabic","Noto Sans Arabic",Tahoma,sans-serif}
*{box-sizing:border-box}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{margin:0;background:var(--s0);color:var(--ink);font-family:var(--sans);font-size:15px;line-height:24px;-webkit-font-smoothing:antialiased;overflow-x:hidden;color-scheme:dark}
[dir=rtl] body{font-size:16px;line-height:28px}
a{color:inherit}
:focus-visible{outline:2px solid var(--gold3);outline-offset:2px}
.wrap{max-width:1280px;margin:0 auto;padding-inline:var(--pad)}
.label{font-size:11px;line-height:16px;font-weight:600;letter-spacing:.18em;text-transform:uppercase}
[dir=rtl] .label,[dir=rtl] .btn,[dir=rtl] .chip span{letter-spacing:0;text-transform:none;font-size:13px}
.eyebrow{color:var(--gold);margin:0}
.muted{color:var(--muted)}
.ltr{direction:ltr;unicode-bidi:isolate;display:inline-block}

/* buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:44px;padding:0 20px;border-radius:6px;border:1px solid var(--hair);background:transparent;color:var(--ink);text-decoration:none;font:600 11px/16px var(--sans);letter-spacing:.18em;text-transform:uppercase;cursor:pointer;transition:border-color .3s ease-out,color .3s ease-out,background .3s ease-out,box-shadow .3s ease-out}
.btn:hover{border-color:var(--gold);color:var(--gold)}
.btn.ghost{border-color:transparent;color:var(--muted);padding:0 12px}
.btn.ghost:hover{color:var(--ink)}
.btn.pri{width:100%;min-height:52px;border:0;background:var(--gold);color:var(--s0);font-size:12px}
.btn.pri:hover{background:var(--gold3);color:var(--s0);box-shadow:0 0 0 1px rgba(201,169,106,.35),0 8px 30px rgba(201,169,106,.18)}
.btn.pri:active{background:var(--gold7)}
.btn.pri[disabled]{opacity:.6;cursor:progress}
.btn.icon{width:44px;padding:0}
.btn svg{flex:none}
[dir=rtl] .flip{transform:scaleX(-1)}

/* header */
.top{position:absolute;inset:0 0 auto 0;z-index:5;background:rgba(10,9,7,.62);-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);border-bottom:1px solid var(--div)}
.top .wrap{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:80px}
.top .logo{display:inline-flex;color:var(--logo)}
svg[aria-label="Fano Properties"]{direction:ltr}
.top nav{display:flex;align-items:center;gap:8px}
.lang{color:var(--muted);text-decoration:none;font-size:14px;padding:0 10px;min-height:44px;display:inline-flex;align-items:center}
.lang:hover{color:var(--ink)}

/* hero with the Dubai film */
.hero{position:relative;overflow:hidden;min-height:100vh;padding-top:80px}
.film{position:absolute;inset:0;z-index:0;background:var(--s0)}
.film img,.film video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.film img{opacity:.55}
.film video{opacity:0;transition:opacity 1.6s ease-out}
.film video.on{opacity:1}
.scrim{position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(10,9,7,.94) 0%,rgba(10,9,7,.78) 45%,rgba(10,9,7,.5) 100%),linear-gradient(180deg,rgba(10,9,7,0) 60%,var(--s0) 100%)}
[dir=rtl] .scrim{background:linear-gradient(270deg,rgba(10,9,7,.94) 0%,rgba(10,9,7,.78) 45%,rgba(10,9,7,.5) 100%),linear-gradient(180deg,rgba(10,9,7,0) 60%,var(--s0) 100%)}
.hero-in{position:relative;z-index:2;display:flex;flex-wrap:wrap;align-items:flex-start;gap:clamp(40px,5vw,72px);padding-block:clamp(40px,6vw,80px) clamp(72px,9vw,120px)}
.copy{flex:1 1 520px;min-width:0;display:flex;flex-direction:column;gap:24px;padding-top:clamp(0px,3vw,40px)}
h1{margin:0;font-family:var(--serif);font-weight:300;font-size:clamp(40px,4.5vw,64px);line-height:1.07;letter-spacing:-.01em;max-width:620px}
[dir=rtl] h1{font-weight:500;letter-spacing:0;line-height:1.3}
.lead{margin:0;font-size:18px;line-height:28px;font-weight:300;color:#cfc7b8;max-width:540px}
[dir=rtl] .lead{font-size:18px;line-height:32px;font-weight:400}
.ctas{display:flex;flex-wrap:wrap;gap:12px}
.facts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;max-width:600px;padding-top:8px}
.fact{border-top:1px solid var(--hair);padding-top:16px;display:flex;flex-direction:column;gap:6px}
.fact b{font:400 30px/34px var(--serif)}
[dir=rtl] .fact b{font-weight:500;font-size:26px}
.fact span{font-size:13px;line-height:20px;color:var(--muted)}
.film-toggle{position:absolute;z-index:3;inset-inline-start:var(--pad);bottom:24px;width:44px;height:44px;border-radius:6px;border:1px solid var(--hair);background:rgba(10,9,7,.62);color:var(--ink);display:flex;align-items:center;justify-content:center;cursor:pointer}
.film-toggle[hidden]{display:none}

/* form card */
.card{flex:0 1 500px;min-width:0;background:rgba(19,17,14,.82);-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);border:1px solid var(--hair);border-radius:14px;box-shadow:0 24px 60px rgba(0,0,0,.55);padding:clamp(24px,2.4vw,32px);scroll-margin-top:100px}
.card h2{margin:0;font:400 28px/34px var(--serif)}
[dir=rtl] .card h2{font-weight:500}
form{display:flex;flex-direction:column;gap:22px;margin:0}
.head{display:flex;flex-direction:column;gap:8px}
.head p{margin:0;font-size:14px;line-height:22px;color:var(--muted)}
fieldset{margin:0;padding:0;border:0;min-width:0}
legend,.fl{display:block;padding:0 0 10px;color:var(--muted)}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{position:relative;display:inline-flex}
.chip input{position:absolute;opacity:0;width:1px;height:1px;pointer-events:none}
.chip span{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:0 16px;border-radius:999px;border:1px solid var(--ctl);color:var(--ink);font-size:14px;line-height:20px;cursor:pointer;transition:border-color .2s,color .2s,background .2s}
.chip span svg{display:none}
.chip:hover span{border-color:var(--muted)}
.chip input:checked+span{border-color:var(--gold);color:var(--gold);background:rgba(201,169,106,.1)}
.chip input:checked+span svg{display:block}
.chip input:focus-visible+span{outline:2px solid var(--gold3);outline-offset:2px}
.grid2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.fld{display:flex;flex-direction:column;gap:8px;min-width:0}
.fld i{font-style:normal;text-transform:none;letter-spacing:0}
.inp{width:100%;min-height:48px;padding:0 14px;background:var(--s2);border:1px solid var(--ctl);border-radius:6px;color:var(--ink);font:400 15px/22px var(--sans)}
textarea.inp{padding:12px 14px;min-height:76px;resize:vertical}
select.inp{padding:0 12px}
.inp:focus{outline:2px solid var(--gold3);outline-offset:2px;border-color:var(--gold)}
.inp.bad,.bad+span{border-color:var(--danger)}
.hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}
.consent{display:flex;gap:12px;align-items:flex-start;font-size:13px;line-height:20px;color:var(--muted);cursor:pointer}
.consent input{flex:none;width:20px;height:20px;margin:0;accent-color:var(--gold)}
.err{margin:0;min-height:0;font-size:14px;line-height:22px;color:var(--danger)}
.err:empty{display:none}
.err a{color:var(--ink)}
.note{margin:0;font-size:13px;line-height:20px;color:var(--muted);text-align:center}
.done{display:flex;flex-direction:column;gap:18px;padding:24px 0}
.done .tick{width:56px;height:56px;border-radius:6px;border:1px solid var(--gold);color:var(--gold);display:flex;align-items:center;justify-content:center}
.done p{margin:0;color:var(--muted)}
.done h2{font-size:32px;line-height:38px}

/* sections */
section.band{border-top:1px solid var(--div)}
.band .wrap{padding-block:clamp(64px,7vw,96px);display:flex;flex-direction:column;gap:40px}
.sh{display:flex;flex-direction:column;gap:12px;max-width:640px}
h2.t{margin:0;font:400 clamp(28px,2.4vw,32px)/1.2 var(--serif)}
[dir=rtl] h2.t{font-weight:500;line-height:1.4}
.cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px}
.pc{background:var(--s1);border:1px solid var(--hair);border-radius:14px;padding:28px;display:flex;flex-direction:column;gap:12px}
.pc .n{color:var(--muted)}
h3{margin:0;font:500 22px/28px var(--serif)}
.pc p,.steps p{margin:0;color:var(--muted)}
.steps{margin:0;padding:0;list-style:none;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:32px}
.steps li{border-top:1px solid var(--hair);padding-top:20px;display:flex;flex-direction:column;gap:10px}
.steps .n{display:flex;align-items:center;gap:10px;color:var(--muted)}
.dot{width:6px;height:6px;border-radius:999px;background:var(--gold)}
figure.q{max-width:880px;margin:0 auto;padding:clamp(64px,7vw,96px) var(--pad);display:flex;flex-direction:column;align-items:center;gap:24px;text-align:center}
figure.q blockquote{margin:0;font:italic 300 clamp(26px,2.8vw,38px)/1.3 var(--serif)}
[dir=rtl] figure.q blockquote{font-style:normal;font-weight:400;line-height:1.6}
figure.q figcaption{color:var(--muted)}
.contacts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
.ct{display:flex;align-items:flex-start;gap:14px;padding:20px;background:var(--s1);border:1px solid var(--hair);border-radius:14px;text-decoration:none;color:var(--ink);transition:border-color .3s}
a.ct:hover{border-color:var(--gold)}
.ct svg{flex:none;margin-top:2px;color:var(--muted)}
.ct span{display:flex;flex-direction:column;gap:4px;min-width:0}
.ct em{font-style:normal;font-size:16px;line-height:24px;overflow-wrap:anywhere}
footer{border-top:1px solid var(--hair)}
footer .wrap{padding-block:48px 96px;display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:24px}
.tag{margin:0;font:italic 400 17px/26px var(--serif);color:var(--muted)}
[dir=rtl] .tag{font-style:normal}
.legal{display:flex;flex-direction:column;gap:6px;font-size:13px;line-height:20px;color:var(--muted)}
.legal a{color:var(--ink);text-decoration-color:rgba(201,169,106,.5);text-underline-offset:3px}
.wa-float{position:fixed;inset-inline-end:20px;bottom:20px;z-index:20;width:56px;height:56px;display:flex;align-items:center;justify-content:center;background:var(--s1);border:1px solid var(--gold);border-radius:6px;color:var(--gold);box-shadow:0 24px 60px rgba(0,0,0,.55)}

@media (max-width:1100px){.cards,.steps,.contacts{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:860px){
  .hero{min-height:0}
  .scrim,[dir=rtl] .scrim{background:linear-gradient(180deg,rgba(10,9,7,.72) 0%,rgba(10,9,7,.8) 55%,var(--s0) 100%)}
  .card{flex-basis:100%}
  .film-toggle{bottom:auto;top:96px;inset-inline-start:auto;inset-inline-end:var(--pad)}
}
@media (max-width:640px){
  .cards,.steps,.contacts,.grid2{grid-template-columns:minmax(0,1fr)}
  .facts{grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
  .fact b{font-size:24px;line-height:30px}
  .top .wrap{min-height:72px}
  .hero{padding-top:72px}
  .wa-lbl{display:none}
  .top .btn.wa{width:44px;padding:0}
}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}.film video{display:none}*{transition:none!important}}
</style>
</head>
<body>

<header class="top">
  <div class="wrap">
    <a class="logo" href="https://fanoproperties.com" aria-label="Fano Properties home">
      <svg viewBox="0 0 300 92" width="150" role="img" aria-label="Fano Properties"><g transform="translate(-6,-6) scale(1.07)"><path fill="#C4AD8E" d="M9 89.4V31L42 10L76.6 31V89.4H37V70H47V80H66.6V37L42 22L19 37V89.4Z"/><path fill="#C4AD8E" fill-rule="evenodd" d="M42.6 33.9a13.5 13.5 0 1 1 0 27a13.5 13.5 0 1 1 0-27zM42.6 41a6.4 6.4 0 1 0 0 12.8a6.4 6.4 0 1 0 0-12.8z"/></g><text x="96" y="58" fill="#C4AD8E" font-family="Montserrat,system-ui,sans-serif" font-weight="600" font-size="52" letter-spacing="7">FANO</text><text x="98" y="86" fill="#C4AD8E" font-family="Montserrat,system-ui,sans-serif" font-weight="600" font-size="19.5" letter-spacing="5.6">PROPERTIES</text></svg>
    </a>
    <nav aria-label="Contact">
      <a class="lang" href="/lp/ar/list-your-property" hreflang="ar" lang="ar">العربية</a>
      <a class="btn icon" href="tel:+97145644635" aria-label="Call Fano Properties on +971 4 564 4635"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/></svg></a>
      <a class="btn wa" data-wa href="https://wa.me/971525719164" target="_blank" rel="noopener" aria-label="WhatsApp Fano Properties"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.7L4 20z"/></svg><span class="wa-lbl">WhatsApp</span></a>
    </nav>
  </div>
</header>

<main>
<section class="hero">
  <div class="film" id="lp-bg" aria-hidden="true"><img src="https://fano-ai.fanoproperties.workers.dev/icons/bg-ambient.jpg" alt=""></div>
  <div class="scrim" aria-hidden="true"></div>
  <button class="film-toggle" id="lp-bg-toggle" type="button" hidden></button>
  <div class="wrap hero-in">
    <div class="copy">
      <p class="label eyebrow">List your property · Dubai</p>
      <h1>Your property, in front of the right buyers.</h1>
      <p class="lead">Fano works by introduction. Our buyers are pre-qualified, discreet and motivated, and many acquisitions are agreed before a property is ever listed publicly. Tell us about yours and a senior advisor will come back to you within 24 hours.</p>
      <div class="ctas">
        <a class="btn" href="#list-form">Start your listing<svg class="flip" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
        <a class="btn ghost" data-wa href="https://wa.me/971525719164" target="_blank" rel="noopener"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.7L4 20z"/></svg>WhatsApp an advisor</a>
      </div>
      <div class="facts">
        <div class="fact"><b>24 h</b><span>Senior advisor reply</span></div>
        <div class="fact"><b>One</b><span>Advisor from valuation to transfer</span></div>
        <div class="fact"><b class="ltr">49852</b><span>RERA ORN, Business Bay</span></div>
      </div>
    </div>

    <div class="card" id="list-form">
      <div id="form-box">
      <form id="lead-form" novalidate>
        <div class="head">
          <p class="label eyebrow">Property listing</p>
          <h2>Tell us about your property</h2>
          <p>A senior advisor reviews every submission and replies within 24 hours.</p>
        </div>

        <fieldset>
          <legend class="label">Property type</legend>
          <div class="chips" id="ptype"><label class="chip"><input type="radio" name="ptype" value="Apartment"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>Apartment</span></label><label class="chip"><input type="radio" name="ptype" value="Penthouse"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>Penthouse</span></label><label class="chip"><input type="radio" name="ptype" value="Villa"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>Villa</span></label><label class="chip"><input type="radio" name="ptype" value="Townhouse"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>Townhouse</span></label><label class="chip"><input type="radio" name="ptype" value="Office"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>Office</span></label><label class="chip"><input type="radio" name="ptype" value="Retail"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>Retail</span></label><label class="chip"><input type="radio" name="ptype" value="Plot"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>Plot</span></label><label class="chip"><input type="radio" name="ptype" value="Other"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>Other</span></label></div>
        </fieldset>

        <fieldset>
          <legend class="label">Looking to</legend>
          <div class="chips"><label class="chip"><input type="radio" name="intent" value="Sell"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>Sell</span></label><label class="chip"><input type="radio" name="intent" value="Lease"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>Lease</span></label></div>
        </fieldset>

        <fieldset>
          <legend class="label">Status</legend>
          <div class="chips"><label class="chip"><input type="radio" name="status" value="Ready to move in"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>Ready to move in</span></label><label class="chip"><input type="radio" name="status" value="Off-plan"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>Off-plan</span></label><label class="chip"><input type="radio" name="status" value="Under construction"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>Under construction</span></label><label class="chip"><input type="radio" name="status" value="Tenanted"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>Tenanted</span></label></div>
        </fieldset>

        <div class="grid2">
          <div class="fld"><label class="label fl" for="f-beds">Bedrooms</label>
            <select class="inp" id="f-beds" name="beds"><option value="N/A">N/A (commercial)</option><option value="Studio">Studio</option><option value="1 BR">1 BR</option><option value="2 BR">2 BR</option><option value="3 BR">3 BR</option><option value="4 BR">4 BR</option><option value="5 BR+">5 BR+</option></select></div>
          <div class="fld"><label class="label fl" for="f-area">Community or building</label>
            <input class="inp" id="f-area" name="area" maxlength="120" autocomplete="off"></div>
          <div class="fld"><label class="label fl" for="f-name">Your name</label>
            <input class="inp" id="f-name" name="name" maxlength="80" autocomplete="name" required></div>
          <div class="fld"><label class="label fl" for="f-phone">Mobile / WhatsApp</label>
            <input class="inp" id="f-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" maxlength="25" dir="ltr" required></div>
        </div>
        <div class="fld"><label class="label fl" for="f-email">Email <i>(optional)</i></label>
          <input class="inp" id="f-email" name="email" type="email" autocomplete="email" maxlength="120" dir="ltr"></div>
        <div class="fld"><label class="label fl" for="f-msg">Anything else <i>(optional)</i></label>
          <textarea class="inp" id="f-msg" name="message" rows="2" maxlength="1000"></textarea></div>
        <div class="hp" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div>
        <label class="consent"><input type="checkbox" name="consent" id="f-consent" required><span>I agree that Fano Properties may contact me by phone, WhatsApp or email about this property.</span></label>
        <button class="btn pri" type="submit" id="f-send">Submit your property</button>
        <p class="err" id="f-err" role="alert"></p>
        <p class="note">No obligation. Discreet by design.</p>
      </form>
      </div>
    </div>
  </div>
</section>

<section class="band" id="why">
  <div class="wrap">
    <div class="sh"><p class="label eyebrow">Why owners list with Fano</p><h2 class="t">A quieter way to sell.</h2></div>
    <div class="cards">
      <div class="pc"><span class="label n">01</span><h3>Qualified buyers only</h3><p>Every buyer in our network is verified. No time-wasters, no low-ball offers.</p></div>
      <div class="pc"><span class="label n">02</span><h3>Discreet, by design</h3><p>Many of our listings never appear publicly. Your property is introduced directly to the buyers it suits.</p></div>
      <div class="pc"><span class="label n">03</span><h3>Fair pricing, backed by data</h3><p>Before anything starts, your advisor gives you an evidence-based valuation. No inflated figures.</p></div>
      <div class="pc"><span class="label n">04</span><h3>One point of contact</h3><p>A single senior advisor manages your listing, from valuation to transfer at the Dubai Land Department.</p></div>
    </div>
  </div>
</section>

<section class="band" id="how">
  <div class="wrap">
    <div class="sh"><p class="label eyebrow">How it works</p><h2 class="t">From first details to transfer.</h2></div>
    <ol class="steps">
      <li><span class="label n"><span class="dot" aria-hidden="true"></span>Step 01</span><h3>Share the details</h3><p>Complete the short form: property type, status and how to reach you.</p></li>
      <li><span class="label n"><span class="dot" aria-hidden="true"></span>Step 02</span><h3>A senior advisor reviews</h3><p>We look at your property and contact you within 24 hours to talk through next steps. No obligation.</p></li>
      <li><span class="label n"><span class="dot" aria-hidden="true"></span>Step 03</span><h3>Valuation and a plan</h3><p>An evidence-based valuation, then marketing, private introductions, or both.</p></li>
      <li><span class="label n"><span class="dot" aria-hidden="true"></span>Step 04</span><h3>Transfer at the DLD</h3><p>Your advisor stays with you through to transfer at the Dubai Land Department.</p></li>
    </ol>
  </div>
</section>

<section class="band">
  <figure class="q">
    <blockquote>“Fano arranged a buyer before we even discussed marketing.”</blockquote>
    <figcaption class="label">Private seller · Business Bay</figcaption>
  </figure>
</section>

<section class="band">
  <div class="wrap">
    <div class="sh"><p class="label eyebrow">Prefer to talk first</p><h2 class="t">Speak to a senior advisor directly.</h2></div>
    <div class="contacts">
      <a class="ct" data-wa href="https://wa.me/971525719164" target="_blank" rel="noopener"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.7L4 20z"/></svg><span><span class="label muted">WhatsApp</span><em class="ltr">+971 52 571 9164</em></span></a>
      <a class="ct" href="tel:+97145644635"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/></svg><span><span class="label muted">Office</span><em class="ltr">+971 4 564 4635</em></span></a>
      <a class="ct" href="mailto:info@fanoproperties.com"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true"><rect x="3" y="5" width="18" height="14"/><path d="M3 6l9 7 9-7"/></svg><span><span class="label muted">Email</span><em class="ltr">info@fanoproperties.com</em></span></a>
      <div class="ct"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true"><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg><span><span class="label muted">Visit</span><em>3404, 34th Floor, Churchill Executive Tower, Business Bay, Dubai</em></span></div>
    </div>
  </div>
</section>
</main>

<footer>
  <div class="wrap">
    <div style="display:flex;flex-direction:column;gap:14px">
      <svg viewBox="0 0 300 92" width="132" role="img" aria-label="Fano Properties"><g transform="translate(-6,-6) scale(1.07)"><path fill="#C4AD8E" d="M9 89.4V31L42 10L76.6 31V89.4H37V70H47V80H66.6V37L42 22L19 37V89.4Z"/><path fill="#C4AD8E" fill-rule="evenodd" d="M42.6 33.9a13.5 13.5 0 1 1 0 27a13.5 13.5 0 1 1 0-27zM42.6 41a6.4 6.4 0 1 0 0 12.8a6.4 6.4 0 1 0 0-12.8z"/></g><text x="96" y="58" fill="#C4AD8E" font-family="Montserrat,system-ui,sans-serif" font-weight="600" font-size="52" letter-spacing="7">FANO</text><text x="98" y="86" fill="#C4AD8E" font-family="Montserrat,system-ui,sans-serif" font-weight="600" font-size="19.5" letter-spacing="5.6">PROPERTIES</text></svg>
      <p class="tag">Real Estate. Real Relationships.</p>
    </div>
    <div class="legal">
      <span>Fano Properties L.L.C. · RERA ORN 49852 · Licensed real estate broker, Dubai</span>
      <span>© <span id="yr">2026</span> Fano Properties · <a href="https://fanoproperties.com">fanoproperties.com</a></span>
    </div>
  </div>
</footer>

<a class="wa-float" data-wa href="https://wa.me/971525719164" target="_blank" rel="noopener" aria-label="WhatsApp Fano Properties"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.7L4 20z"/></svg></a>

<script>
/* Live Dubai film behind the hero: the same free-licence Pexels clips as the Fano team app and the other /lp pages,
   cross-fading. HD on computers, lighter SD on phones; stays on the still photo with data-saver or reduced motion; pausable (WCAG 2.2.2). */
(function(){
  var box=document.getElementById("lp-bg"),btn=document.getElementById("lp-bg-toggle");
  var KEY="fano-lp-film-paused",L={pause:"Pause background video",play:"Play background video"};
  var IP='<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg>';
  var IY='<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5l11 7-11 7z"/></svg>';
  var conn=navigator.connection||{};
  if(!box||(window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches)||conn.saveData)return;
  var V=["8397996","8397024","8396973","8396982"];
  var q=(window.matchMedia&&matchMedia("(max-width:860px)").matches)?"sd_640_360_25fps":"hd_1280_720_25fps";
  function url(n){return"https://videos.pexels.com/video-files/"+V[n]+"/"+V[n]+"-"+q+".mp4"}
  function mk(){var v=document.createElement("video");v.muted=true;v.defaultMuted=true;v.playsInline=true;v.setAttribute("muted","");v.setAttribute("playsinline","");v.preload="auto";v.disablePictureInPicture=true;v.tabIndex=-1;box.appendChild(v);return v}
  var a=mk(),c=mk(),cur=a,i=Math.floor(Math.random()*V.length),fails=0,paused=false;
  try{paused=localStorage.getItem(KEY)==="1"}catch(e){}
  function go(v,n){v._next=0;v.src=url(n);try{v.defaultPlaybackRate=.8;v.playbackRate=.8}catch(e){}v.load();var p=v.play();if(p&&p.catch)p.catch(function(){})}
  function next(){i=(i+1)%V.length;cur=cur===a?c:a;go(cur,i)}
  function wire(v){
    v.addEventListener("playing",function(){if(v!==cur)return;fails=0;v.classList.add("on");(v===a?c:a).classList.remove("on")});
    v.addEventListener("timeupdate",function(){if(v===cur&&!v._next&&v.duration&&v.duration-v.currentTime<2.2){v._next=1;next()}});
    v.addEventListener("ended",function(){if(v===cur&&!v._next){v._next=1;next()}});
    v.addEventListener("error",function(){if(v!==cur)return;fails++;if(fails<V.length)next();else{a.classList.remove("on");c.classList.remove("on");btn.hidden=true}});
  }
  function show(){btn.hidden=false;btn.innerHTML=paused?IY:IP;btn.setAttribute("aria-pressed",paused?"true":"false");btn.setAttribute("aria-label",paused?L.play:L.pause)}
  btn.addEventListener("click",function(){paused=!paused;try{localStorage.setItem(KEY,paused?"1":"0")}catch(e){}
    if(paused){try{cur.pause()}catch(e){}cur.classList.remove("on")}else if(!cur.src){go(cur,i)}else{var p=cur.play();if(p&&p.catch)p.catch(function(){});cur.classList.add("on")}show()});
  wire(a);wire(c);show();
  function start(){if(!paused)go(a,i)}
  if(document.readyState==="complete")setTimeout(start,250);else addEventListener("load",function(){setTimeout(start,250)},{once:true});
  document.addEventListener("visibilitychange",function(){if(paused)return;if(document.hidden){try{cur.pause()}catch(e){}}else{var p=cur.play();if(p&&p.catch)p.catch(function(){})}});
})();

/* Listing form -> the website (/api/lp/listing), which saves it under Inquiries in the website admin and
   copies it to the Fano team app's Lead inbox, like the website's own List Your Property form. */
(function(){
"use strict";
var LEAD_ENDPOINT="/api/lp/listing",WA="971525719164",LANG=document.documentElement.lang;
var T={"wa": "Hello Fano Properties, I'd like to list my property with you.", "eType": "Please choose the property type.", "eName": "Please enter your name.", "ePhone": "Please enter a valid mobile number, with country code if outside the UAE.", "eEmail": "That email doesn't look right.", "eConsent": "Please tick the box so we can contact you.", "eFail": "Sorry, that didn't go through.", "eRetry": "Please try again, or", "eWa": "message us on WhatsApp", "sending": "Sending…", "submit": "Submit your property", "doneEyebrow": "Details received", "doneTitle": "Thank you, {name}.", "doneBody": "A senior advisor will call you on {phone} within 24 hours to talk through your property.", "doneWa": "Chat now on WhatsApp"};
document.getElementById("yr").textContent=new Date().getFullYear();
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
var waUrl="https://wa.me/"+WA+"?text="+encodeURIComponent(T.wa);
[].forEach.call(document.querySelectorAll("[data-wa]"),function(a){a.href=waUrl});
// The website's Google tag skips data-wa links, so this page reports its own WhatsApp taps
document.addEventListener("click",function(e){var w=e.target.closest&&e.target.closest("[data-wa]");if(w&&window.gtag)gtag("event","whatsapp_click",{page_path:location.pathname})});
var form=document.getElementById("lead-form"),err=document.getElementById("f-err"),send=document.getElementById("f-send");
var qs=new URLSearchParams(location.search),started=Date.now();
function bad(el,msg){el.classList.add("bad");el.focus();err.textContent=msg;return false}
[].forEach.call(form.querySelectorAll(".inp"),function(el){el.addEventListener("input",function(){el.classList.remove("bad");err.textContent=""})});
[].forEach.call(form.querySelectorAll("[name=ptype]"),function(el){el.addEventListener("change",function(){[].forEach.call(form.querySelectorAll("[name=ptype]"),function(x){x.classList.remove("bad")});err.textContent=""})});
function val(n){var x=form.querySelector("[name="+n+"]:checked");return x?x.value:""}
form.addEventListener("submit",function(e){
  e.preventDefault();err.textContent="";
  var type=val("ptype"),name=form.name.value.trim(),phone=form.phone.value.trim(),email=form.email.value.trim();
  var phoneDigits=phone.replace(/[٠-٩]/g,function(c){return String(c.charCodeAt(0)-0x660)});
  if(!type){var f=form.querySelector("[name=ptype]");f.classList.add("bad");f.focus();err.textContent=T.eType;return}
  if(name.length<2)return bad(form.name,T.eName);
  var digits=phoneDigits.replace(/\D/g,"");
  if(digits.length<7||digits.length>15)return bad(form.phone,T.ePhone);
  if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))return bad(form.email,T.eEmail);
  if(!form.consent.checked){err.textContent=T.eConsent;form.consent.focus();return}
  var beds=form.beds.value,area=form.area.value.trim(),intent=val("intent"),status=val("status");
  var att={};["c","gclid","gbraid","wbraid","fbclid","utm_source","utm_medium","utm_campaign","utm_content","utm_term"].forEach(function(k){var v=qs.get(k);if(v)att[k]=v.slice(0,200)});
  if(document.referrer)att.ref=document.referrer.slice(0,300);
  var data={
    name:name,phone:phoneDigits,email:email,propertyType:type,intent:intent,status:status,bedrooms:beds,area:area,
    notes:form.message.value.trim(),website:form.website.value,lang:LANG,page:location.pathname,ms:Date.now()-started,attribution:att
  };
  send.disabled=true;send.textContent=T.sending;
  fetch(LEAD_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)})
    .then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(!r.ok||!j.ok)throw new Error(j.error||"failed");return j})})
    .then(function(){
      document.getElementById("form-box").innerHTML='<div class="done" tabindex="-1" id="done"><div class="tick"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div><p class="label eyebrow" style="color:var(--gold)">'+T.doneEyebrow+'</p><h2>'+T.doneTitle.replace("{name}",esc(name.split(" ")[0]))+'</h2><p>'+T.doneBody.replace("{phone}",'<b class="ltr" style="color:var(--ink)">'+esc(phone)+'</b>')+'</p><div><a class="btn" target="_blank" rel="noopener" href="'+waUrl+'">'+T.doneWa+'</a></div></div>';
      var d=document.getElementById("done");if(d)d.focus();
      // Same event as the website's own List Your Property form (trackLead in lib/analytics.ts)
      if(window.gtag)gtag("event","generate_lead",{form_name:"listing_submission",currency:"AED",property_type:type,page_path:location.pathname});
      if(window.fbq)window.fbq("track","Lead");
    })
    .catch(function(x){
      send.disabled=false;send.textContent=T.submit;
      err.innerHTML=esc(x&&x.message&&x.message!=="failed"&&x.message.length<120?x.message:T.eFail)+' '+T.eRetry+' <a href="'+waUrl+'" target="_blank" rel="noopener">'+T.eWa+'</a>.';
    });
});
})();
</script>
</body>
</html>
`,
  ar: String.raw`<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>اعرض عقارك مع فانو العقارية | دبي</title>
<meta name="description" content="هل تبيع أو تؤجر عقاراً في دبي؟ شاركنا تفاصيل عقارك وسيتواصل معك مستشار أول من فانو العقارية خلال 24 ساعة، دون أي التزام.">
<meta name="theme-color" content="#0a0907">
<meta property="og:title" content="اعرض عقارك مع فانو العقارية | دبي">
<meta property="og:description" content="هل تبيع أو تؤجر عقاراً في دبي؟ شاركنا تفاصيل عقارك وسيتواصل معك مستشار أول من فانو العقارية خلال 24 ساعة، دون أي التزام.">
<meta property="og:type" content="website">
<link rel="canonical" href="https://fanoproperties.com/lp/ar/list-your-property">
<link rel="alternate" hreflang="en" href="https://fanoproperties.com/lp/en/list-your-property">
<link rel="alternate" hreflang="ar" href="https://fanoproperties.com/lp/ar/list-your-property">
<link rel="icon" href="https://fano-ai.fanoproperties.workers.dev/icons/icon-192.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&family=Montserrat:wght@600&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600&display=swap" rel="stylesheet">
<!--GOOGLE_TAG-->
<style>
:root{
  --s0:#0a0907;--s1:#13110e;--s2:#1c1915;
  --ink:#f4efe6;--muted:#a39b8c;
  --gold:#c9a96a;--gold3:#e2cc9a;--gold7:#8a6a2f;
  --hair:rgba(201,169,106,.24);--div:rgba(244,239,230,.08);--ctl:#5a5347;
  --danger:#e8816f;--logo:#C4AD8E;
  --serif:"Source Serif 4","Source Serif Pro",Georgia,serif;
  --sans:Inter,"Helvetica Neue",Arial,system-ui,sans-serif;
  --pad:clamp(20px,5vw,80px);
}
[dir=rtl]{--serif:"IBM Plex Sans Arabic","Noto Sans Arabic",Tahoma,sans-serif;--sans:"IBM Plex Sans Arabic","Noto Sans Arabic",Tahoma,sans-serif}
*{box-sizing:border-box}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{margin:0;background:var(--s0);color:var(--ink);font-family:var(--sans);font-size:15px;line-height:24px;-webkit-font-smoothing:antialiased;overflow-x:hidden;color-scheme:dark}
[dir=rtl] body{font-size:16px;line-height:28px}
a{color:inherit}
:focus-visible{outline:2px solid var(--gold3);outline-offset:2px}
.wrap{max-width:1280px;margin:0 auto;padding-inline:var(--pad)}
.label{font-size:11px;line-height:16px;font-weight:600;letter-spacing:.18em;text-transform:uppercase}
[dir=rtl] .label,[dir=rtl] .btn,[dir=rtl] .chip span{letter-spacing:0;text-transform:none;font-size:13px}
.eyebrow{color:var(--gold);margin:0}
.muted{color:var(--muted)}
.ltr{direction:ltr;unicode-bidi:isolate;display:inline-block}

/* buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:44px;padding:0 20px;border-radius:6px;border:1px solid var(--hair);background:transparent;color:var(--ink);text-decoration:none;font:600 11px/16px var(--sans);letter-spacing:.18em;text-transform:uppercase;cursor:pointer;transition:border-color .3s ease-out,color .3s ease-out,background .3s ease-out,box-shadow .3s ease-out}
.btn:hover{border-color:var(--gold);color:var(--gold)}
.btn.ghost{border-color:transparent;color:var(--muted);padding:0 12px}
.btn.ghost:hover{color:var(--ink)}
.btn.pri{width:100%;min-height:52px;border:0;background:var(--gold);color:var(--s0);font-size:12px}
.btn.pri:hover{background:var(--gold3);color:var(--s0);box-shadow:0 0 0 1px rgba(201,169,106,.35),0 8px 30px rgba(201,169,106,.18)}
.btn.pri:active{background:var(--gold7)}
.btn.pri[disabled]{opacity:.6;cursor:progress}
.btn.icon{width:44px;padding:0}
.btn svg{flex:none}
[dir=rtl] .flip{transform:scaleX(-1)}

/* header */
.top{position:absolute;inset:0 0 auto 0;z-index:5;background:rgba(10,9,7,.62);-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);border-bottom:1px solid var(--div)}
.top .wrap{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:80px}
.top .logo{display:inline-flex;color:var(--logo)}
svg[aria-label="Fano Properties"]{direction:ltr}
.top nav{display:flex;align-items:center;gap:8px}
.lang{color:var(--muted);text-decoration:none;font-size:14px;padding:0 10px;min-height:44px;display:inline-flex;align-items:center}
.lang:hover{color:var(--ink)}

/* hero with the Dubai film */
.hero{position:relative;overflow:hidden;min-height:100vh;padding-top:80px}
.film{position:absolute;inset:0;z-index:0;background:var(--s0)}
.film img,.film video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.film img{opacity:.55}
.film video{opacity:0;transition:opacity 1.6s ease-out}
.film video.on{opacity:1}
.scrim{position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(10,9,7,.94) 0%,rgba(10,9,7,.78) 45%,rgba(10,9,7,.5) 100%),linear-gradient(180deg,rgba(10,9,7,0) 60%,var(--s0) 100%)}
[dir=rtl] .scrim{background:linear-gradient(270deg,rgba(10,9,7,.94) 0%,rgba(10,9,7,.78) 45%,rgba(10,9,7,.5) 100%),linear-gradient(180deg,rgba(10,9,7,0) 60%,var(--s0) 100%)}
.hero-in{position:relative;z-index:2;display:flex;flex-wrap:wrap;align-items:flex-start;gap:clamp(40px,5vw,72px);padding-block:clamp(40px,6vw,80px) clamp(72px,9vw,120px)}
.copy{flex:1 1 520px;min-width:0;display:flex;flex-direction:column;gap:24px;padding-top:clamp(0px,3vw,40px)}
h1{margin:0;font-family:var(--serif);font-weight:300;font-size:clamp(40px,4.5vw,64px);line-height:1.07;letter-spacing:-.01em;max-width:620px}
[dir=rtl] h1{font-weight:500;letter-spacing:0;line-height:1.3}
.lead{margin:0;font-size:18px;line-height:28px;font-weight:300;color:#cfc7b8;max-width:540px}
[dir=rtl] .lead{font-size:18px;line-height:32px;font-weight:400}
.ctas{display:flex;flex-wrap:wrap;gap:12px}
.facts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;max-width:600px;padding-top:8px}
.fact{border-top:1px solid var(--hair);padding-top:16px;display:flex;flex-direction:column;gap:6px}
.fact b{font:400 30px/34px var(--serif)}
[dir=rtl] .fact b{font-weight:500;font-size:26px}
.fact span{font-size:13px;line-height:20px;color:var(--muted)}
.film-toggle{position:absolute;z-index:3;inset-inline-start:var(--pad);bottom:24px;width:44px;height:44px;border-radius:6px;border:1px solid var(--hair);background:rgba(10,9,7,.62);color:var(--ink);display:flex;align-items:center;justify-content:center;cursor:pointer}
.film-toggle[hidden]{display:none}

/* form card */
.card{flex:0 1 500px;min-width:0;background:rgba(19,17,14,.82);-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);border:1px solid var(--hair);border-radius:14px;box-shadow:0 24px 60px rgba(0,0,0,.55);padding:clamp(24px,2.4vw,32px);scroll-margin-top:100px}
.card h2{margin:0;font:400 28px/34px var(--serif)}
[dir=rtl] .card h2{font-weight:500}
form{display:flex;flex-direction:column;gap:22px;margin:0}
.head{display:flex;flex-direction:column;gap:8px}
.head p{margin:0;font-size:14px;line-height:22px;color:var(--muted)}
fieldset{margin:0;padding:0;border:0;min-width:0}
legend,.fl{display:block;padding:0 0 10px;color:var(--muted)}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{position:relative;display:inline-flex}
.chip input{position:absolute;opacity:0;width:1px;height:1px;pointer-events:none}
.chip span{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:0 16px;border-radius:999px;border:1px solid var(--ctl);color:var(--ink);font-size:14px;line-height:20px;cursor:pointer;transition:border-color .2s,color .2s,background .2s}
.chip span svg{display:none}
.chip:hover span{border-color:var(--muted)}
.chip input:checked+span{border-color:var(--gold);color:var(--gold);background:rgba(201,169,106,.1)}
.chip input:checked+span svg{display:block}
.chip input:focus-visible+span{outline:2px solid var(--gold3);outline-offset:2px}
.grid2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.fld{display:flex;flex-direction:column;gap:8px;min-width:0}
.fld i{font-style:normal;text-transform:none;letter-spacing:0}
.inp{width:100%;min-height:48px;padding:0 14px;background:var(--s2);border:1px solid var(--ctl);border-radius:6px;color:var(--ink);font:400 15px/22px var(--sans)}
textarea.inp{padding:12px 14px;min-height:76px;resize:vertical}
select.inp{padding:0 12px}
.inp:focus{outline:2px solid var(--gold3);outline-offset:2px;border-color:var(--gold)}
.inp.bad,.bad+span{border-color:var(--danger)}
.hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}
.consent{display:flex;gap:12px;align-items:flex-start;font-size:13px;line-height:20px;color:var(--muted);cursor:pointer}
.consent input{flex:none;width:20px;height:20px;margin:0;accent-color:var(--gold)}
.err{margin:0;min-height:0;font-size:14px;line-height:22px;color:var(--danger)}
.err:empty{display:none}
.err a{color:var(--ink)}
.note{margin:0;font-size:13px;line-height:20px;color:var(--muted);text-align:center}
.done{display:flex;flex-direction:column;gap:18px;padding:24px 0}
.done .tick{width:56px;height:56px;border-radius:6px;border:1px solid var(--gold);color:var(--gold);display:flex;align-items:center;justify-content:center}
.done p{margin:0;color:var(--muted)}
.done h2{font-size:32px;line-height:38px}

/* sections */
section.band{border-top:1px solid var(--div)}
.band .wrap{padding-block:clamp(64px,7vw,96px);display:flex;flex-direction:column;gap:40px}
.sh{display:flex;flex-direction:column;gap:12px;max-width:640px}
h2.t{margin:0;font:400 clamp(28px,2.4vw,32px)/1.2 var(--serif)}
[dir=rtl] h2.t{font-weight:500;line-height:1.4}
.cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px}
.pc{background:var(--s1);border:1px solid var(--hair);border-radius:14px;padding:28px;display:flex;flex-direction:column;gap:12px}
.pc .n{color:var(--muted)}
h3{margin:0;font:500 22px/28px var(--serif)}
.pc p,.steps p{margin:0;color:var(--muted)}
.steps{margin:0;padding:0;list-style:none;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:32px}
.steps li{border-top:1px solid var(--hair);padding-top:20px;display:flex;flex-direction:column;gap:10px}
.steps .n{display:flex;align-items:center;gap:10px;color:var(--muted)}
.dot{width:6px;height:6px;border-radius:999px;background:var(--gold)}
figure.q{max-width:880px;margin:0 auto;padding:clamp(64px,7vw,96px) var(--pad);display:flex;flex-direction:column;align-items:center;gap:24px;text-align:center}
figure.q blockquote{margin:0;font:italic 300 clamp(26px,2.8vw,38px)/1.3 var(--serif)}
[dir=rtl] figure.q blockquote{font-style:normal;font-weight:400;line-height:1.6}
figure.q figcaption{color:var(--muted)}
.contacts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
.ct{display:flex;align-items:flex-start;gap:14px;padding:20px;background:var(--s1);border:1px solid var(--hair);border-radius:14px;text-decoration:none;color:var(--ink);transition:border-color .3s}
a.ct:hover{border-color:var(--gold)}
.ct svg{flex:none;margin-top:2px;color:var(--muted)}
.ct span{display:flex;flex-direction:column;gap:4px;min-width:0}
.ct em{font-style:normal;font-size:16px;line-height:24px;overflow-wrap:anywhere}
footer{border-top:1px solid var(--hair)}
footer .wrap{padding-block:48px 96px;display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:24px}
.tag{margin:0;font:italic 400 17px/26px var(--serif);color:var(--muted)}
[dir=rtl] .tag{font-style:normal}
.legal{display:flex;flex-direction:column;gap:6px;font-size:13px;line-height:20px;color:var(--muted)}
.legal a{color:var(--ink);text-decoration-color:rgba(201,169,106,.5);text-underline-offset:3px}
.wa-float{position:fixed;inset-inline-end:20px;bottom:20px;z-index:20;width:56px;height:56px;display:flex;align-items:center;justify-content:center;background:var(--s1);border:1px solid var(--gold);border-radius:6px;color:var(--gold);box-shadow:0 24px 60px rgba(0,0,0,.55)}

@media (max-width:1100px){.cards,.steps,.contacts{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:860px){
  .hero{min-height:0}
  .scrim,[dir=rtl] .scrim{background:linear-gradient(180deg,rgba(10,9,7,.72) 0%,rgba(10,9,7,.8) 55%,var(--s0) 100%)}
  .card{flex-basis:100%}
  .film-toggle{bottom:auto;top:96px;inset-inline-start:auto;inset-inline-end:var(--pad)}
}
@media (max-width:640px){
  .cards,.steps,.contacts,.grid2{grid-template-columns:minmax(0,1fr)}
  .facts{grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
  .fact b{font-size:24px;line-height:30px}
  .top .wrap{min-height:72px}
  .hero{padding-top:72px}
  .wa-lbl{display:none}
  .top .btn.wa{width:44px;padding:0}
}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}.film video{display:none}*{transition:none!important}}
</style>
</head>
<body>

<header class="top">
  <div class="wrap">
    <a class="logo" href="https://fanoproperties.com" aria-label="الصفحة الرئيسية لفانو العقارية">
      <svg viewBox="0 0 300 92" width="150" role="img" aria-label="Fano Properties"><g transform="translate(-6,-6) scale(1.07)"><path fill="#C4AD8E" d="M9 89.4V31L42 10L76.6 31V89.4H37V70H47V80H66.6V37L42 22L19 37V89.4Z"/><path fill="#C4AD8E" fill-rule="evenodd" d="M42.6 33.9a13.5 13.5 0 1 1 0 27a13.5 13.5 0 1 1 0-27zM42.6 41a6.4 6.4 0 1 0 0 12.8a6.4 6.4 0 1 0 0-12.8z"/></g><text x="96" y="58" fill="#C4AD8E" font-family="Montserrat,system-ui,sans-serif" font-weight="600" font-size="52" letter-spacing="7">FANO</text><text x="98" y="86" fill="#C4AD8E" font-family="Montserrat,system-ui,sans-serif" font-weight="600" font-size="19.5" letter-spacing="5.6">PROPERTIES</text></svg>
    </a>
    <nav aria-label="التواصل">
      <a class="lang" href="/lp/en/list-your-property" hreflang="en" lang="en">English</a>
      <a class="btn icon" href="tel:+97145644635" aria-label="اتصل بفانو العقارية على ‎+971 4 564 4635"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/></svg></a>
      <a class="btn wa" data-wa href="https://wa.me/971525719164" target="_blank" rel="noopener" aria-label="تواصل مع فانو العقارية عبر واتساب"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.7L4 20z"/></svg><span class="wa-lbl">واتساب</span></a>
    </nav>
  </div>
</header>

<main>
<section class="hero">
  <div class="film" id="lp-bg" aria-hidden="true"><img src="https://fano-ai.fanoproperties.workers.dev/icons/bg-ambient.jpg" alt=""></div>
  <div class="scrim" aria-hidden="true"></div>
  <button class="film-toggle" id="lp-bg-toggle" type="button" hidden></button>
  <div class="wrap hero-in">
    <div class="copy">
      <p class="label eyebrow">اعرض عقارك · دبي</p>
      <h1>عقارك أمام المشترين المناسبين.</h1>
      <p class="lead">تعمل فانو العقارية عبر التعارف المباشر. مشترونا مؤهَّلون مسبقاً وجادّون ويقدّرون الخصوصية، وكثير من الصفقات تُتّفق قبل أن يُعرض العقار للعموم. أخبرنا عن عقارك وسيتواصل معك مستشار أول خلال 24 ساعة.</p>
      <div class="ctas">
        <a class="btn" href="#list-form">ابدأ عرض عقارك<svg class="flip" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
        <a class="btn ghost" data-wa href="https://wa.me/971525719164" target="_blank" rel="noopener"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.7L4 20z"/></svg>تحدّث مع مستشار عبر واتساب</a>
      </div>
      <div class="facts">
        <div class="fact"><b>24 ساعة</b><span>رد من مستشار أول</span></div>
        <div class="fact"><b>مستشار واحد</b><span>من التقييم حتى نقل الملكية</span></div>
        <div class="fact"><b class="ltr">49852</b><span>رقم ترخيص ريرا، الخليج التجاري</span></div>
      </div>
    </div>

    <div class="card" id="list-form">
      <div id="form-box">
      <form id="lead-form" novalidate>
        <div class="head">
          <p class="label eyebrow">عرض عقار</p>
          <h2>أخبرنا عن عقارك</h2>
          <p>يراجع مستشار أول كل طلب ويرد خلال 24 ساعة.</p>
        </div>

        <fieldset>
          <legend class="label">نوع العقار</legend>
          <div class="chips" id="ptype"><label class="chip"><input type="radio" name="ptype" value="Apartment"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>شقة</span></label><label class="chip"><input type="radio" name="ptype" value="Penthouse"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>بنتهاوس</span></label><label class="chip"><input type="radio" name="ptype" value="Villa"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>فيلا</span></label><label class="chip"><input type="radio" name="ptype" value="Townhouse"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>تاون هاوس</span></label><label class="chip"><input type="radio" name="ptype" value="Office"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>مكتب</span></label><label class="chip"><input type="radio" name="ptype" value="Retail"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>محل تجاري</span></label><label class="chip"><input type="radio" name="ptype" value="Plot"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>أرض</span></label><label class="chip"><input type="radio" name="ptype" value="Other"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>غير ذلك</span></label></div>
        </fieldset>

        <fieldset>
          <legend class="label">أرغب في</legend>
          <div class="chips"><label class="chip"><input type="radio" name="intent" value="Sell"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>البيع</span></label><label class="chip"><input type="radio" name="intent" value="Lease"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>التأجير</span></label></div>
        </fieldset>

        <fieldset>
          <legend class="label">حالة العقار</legend>
          <div class="chips"><label class="chip"><input type="radio" name="status" value="Ready to move in"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>جاهز للسكن</span></label><label class="chip"><input type="radio" name="status" value="Off-plan"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>على الخارطة</span></label><label class="chip"><input type="radio" name="status" value="Under construction"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>قيد الإنشاء</span></label><label class="chip"><input type="radio" name="status" value="Tenanted"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>مؤجَّر</span></label></div>
        </fieldset>

        <div class="grid2">
          <div class="fld"><label class="label fl" for="f-beds">غرف النوم</label>
            <select class="inp" id="f-beds" name="beds"><option value="N/A">لا ينطبق (تجاري)</option><option value="Studio">استوديو</option><option value="1 BR">غرفة واحدة</option><option value="2 BR">غرفتان</option><option value="3 BR">3 غرف</option><option value="4 BR">4 غرف</option><option value="5 BR+">5 غرف أو أكثر</option></select></div>
          <div class="fld"><label class="label fl" for="f-area">المنطقة أو المبنى</label>
            <input class="inp" id="f-area" name="area" maxlength="120" autocomplete="off"></div>
          <div class="fld"><label class="label fl" for="f-name">الاسم الكامل</label>
            <input class="inp" id="f-name" name="name" maxlength="80" autocomplete="name" required></div>
          <div class="fld"><label class="label fl" for="f-phone">رقم الجوال / واتساب</label>
            <input class="inp" id="f-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" maxlength="25" dir="ltr" required></div>
        </div>
        <div class="fld"><label class="label fl" for="f-email">البريد الإلكتروني <i>(اختياري)</i></label>
          <input class="inp" id="f-email" name="email" type="email" autocomplete="email" maxlength="120" dir="ltr"></div>
        <div class="fld"><label class="label fl" for="f-msg">ملاحظات <i>(اختياري)</i></label>
          <textarea class="inp" id="f-msg" name="message" rows="2" maxlength="1000"></textarea></div>
        <div class="hp" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div>
        <label class="consent"><input type="checkbox" name="consent" id="f-consent" required><span>أوافق على أن تتواصل معي فانو العقارية عبر الهاتف أو واتساب أو البريد الإلكتروني بخصوص هذا العقار.</span></label>
        <button class="btn pri" type="submit" id="f-send">أرسل تفاصيل عقاري</button>
        <p class="err" id="f-err" role="alert"></p>
        <p class="note">دون أي التزام. وبخصوصية تامة.</p>
      </form>
      </div>
    </div>
  </div>
</section>

<section class="band" id="why">
  <div class="wrap">
    <div class="sh"><p class="label eyebrow">لماذا يختار الملّاك فانو</p><h2 class="t">طريقة أهدأ للبيع.</h2></div>
    <div class="cards">
      <div class="pc"><span class="label n">01</span><h3>مشترون مؤهَّلون فقط</h3><p>كل مشترٍ في شبكتنا موثَّق. لا مضيعة للوقت ولا عروض متدنية.</p></div>
      <div class="pc"><span class="label n">02</span><h3>الخصوصية أولاً</h3><p>كثير من عقاراتنا لا تُعرض للعموم أبداً. نقدّم عقارك مباشرة إلى المشترين المناسبين له.</p></div>
      <div class="pc"><span class="label n">03</span><h3>تسعير عادل مبني على البيانات</h3><p>قبل أي خطوة، يقدّم لك مستشارك تقييماً قائماً على الأدلة، بلا أرقام مبالغ فيها.</p></div>
      <div class="pc"><span class="label n">04</span><h3>جهة تواصل واحدة</h3><p>مستشار أول واحد يدير عرض عقارك من التقييم حتى نقل الملكية في دائرة الأراضي والأملاك في دبي.</p></div>
    </div>
  </div>
</section>

<section class="band" id="how">
  <div class="wrap">
    <div class="sh"><p class="label eyebrow">كيف نعمل</p><h2 class="t">من التفاصيل الأولى حتى نقل الملكية.</h2></div>
    <ol class="steps">
      <li><span class="label n"><span class="dot" aria-hidden="true"></span>الخطوة 01</span><h3>شارك التفاصيل</h3><p>املأ النموذج القصير: نوع العقار وحالته وطريقة التواصل معك.</p></li>
      <li><span class="label n"><span class="dot" aria-hidden="true"></span>الخطوة 02</span><h3>يراجع مستشار أول طلبك</h3><p>ندرس عقارك ونتواصل معك خلال 24 ساعة لمناقشة الخطوات التالية، دون أي التزام.</p></li>
      <li><span class="label n"><span class="dot" aria-hidden="true"></span>الخطوة 03</span><h3>التقييم والخطة</h3><p>تقييم قائم على الأدلة، ثم التسويق أو التعارف المباشر مع المشترين، أو كلاهما.</p></li>
      <li><span class="label n"><span class="dot" aria-hidden="true"></span>الخطوة 04</span><h3>نقل الملكية في دائرة الأراضي</h3><p>يبقى مستشارك معك حتى نقل الملكية في دائرة الأراضي والأملاك في دبي.</p></li>
    </ol>
  </div>
</section>

<section class="band">
  <figure class="q">
    <blockquote>«رتّبت فانو مشترياً قبل أن نتحدث عن التسويق أصلاً.»</blockquote>
    <figcaption class="label">بائع خاص · الخليج التجاري</figcaption>
  </figure>
</section>

<section class="band">
  <div class="wrap">
    <div class="sh"><p class="label eyebrow">تفضّل الحديث أولاً؟</p><h2 class="t">تحدّث مباشرة مع مستشار أول.</h2></div>
    <div class="contacts">
      <a class="ct" data-wa href="https://wa.me/971525719164" target="_blank" rel="noopener"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.7L4 20z"/></svg><span><span class="label muted">واتساب</span><em class="ltr">+971 52 571 9164</em></span></a>
      <a class="ct" href="tel:+97145644635"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/></svg><span><span class="label muted">المكتب</span><em class="ltr">+971 4 564 4635</em></span></a>
      <a class="ct" href="mailto:info@fanoproperties.com"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true"><rect x="3" y="5" width="18" height="14"/><path d="M3 6l9 7 9-7"/></svg><span><span class="label muted">البريد الإلكتروني</span><em class="ltr">info@fanoproperties.com</em></span></a>
      <div class="ct"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true"><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg><span><span class="label muted">زورونا</span><em>مكتب 3404، الطابق 34، برج تشرشل التنفيذي، الخليج التجاري، دبي</em></span></div>
    </div>
  </div>
</section>
</main>

<footer>
  <div class="wrap">
    <div style="display:flex;flex-direction:column;gap:14px">
      <svg viewBox="0 0 300 92" width="132" role="img" aria-label="Fano Properties"><g transform="translate(-6,-6) scale(1.07)"><path fill="#C4AD8E" d="M9 89.4V31L42 10L76.6 31V89.4H37V70H47V80H66.6V37L42 22L19 37V89.4Z"/><path fill="#C4AD8E" fill-rule="evenodd" d="M42.6 33.9a13.5 13.5 0 1 1 0 27a13.5 13.5 0 1 1 0-27zM42.6 41a6.4 6.4 0 1 0 0 12.8a6.4 6.4 0 1 0 0-12.8z"/></g><text x="96" y="58" fill="#C4AD8E" font-family="Montserrat,system-ui,sans-serif" font-weight="600" font-size="52" letter-spacing="7">FANO</text><text x="98" y="86" fill="#C4AD8E" font-family="Montserrat,system-ui,sans-serif" font-weight="600" font-size="19.5" letter-spacing="5.6">PROPERTIES</text></svg>
      <p class="tag">عقارات حقيقية. علاقات حقيقية.</p>
    </div>
    <div class="legal">
      <span>فانو العقارية ش.ذ.م.م · رقم ترخيص ريرا 49852 · وسيط عقاري مرخَّص في دبي</span>
      <span>© <span id="yr">2026</span> فانو العقارية · <a href="https://fanoproperties.com">fanoproperties.com</a></span>
    </div>
  </div>
</footer>

<a class="wa-float" data-wa href="https://wa.me/971525719164" target="_blank" rel="noopener" aria-label="تواصل مع فانو العقارية عبر واتساب"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.7L4 20z"/></svg></a>

<script>
/* Live Dubai film behind the hero: the same free-licence Pexels clips as the Fano team app and the other /lp pages,
   cross-fading. HD on computers, lighter SD on phones; stays on the still photo with data-saver or reduced motion; pausable (WCAG 2.2.2). */
(function(){
  var box=document.getElementById("lp-bg"),btn=document.getElementById("lp-bg-toggle");
  var KEY="fano-lp-film-paused",L={pause:"إيقاف الفيديو في الخلفية",play:"تشغيل الفيديو في الخلفية"};
  var IP='<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg>';
  var IY='<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5l11 7-11 7z"/></svg>';
  var conn=navigator.connection||{};
  if(!box||(window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches)||conn.saveData)return;
  var V=["8397996","8397024","8396973","8396982"];
  var q=(window.matchMedia&&matchMedia("(max-width:860px)").matches)?"sd_640_360_25fps":"hd_1280_720_25fps";
  function url(n){return"https://videos.pexels.com/video-files/"+V[n]+"/"+V[n]+"-"+q+".mp4"}
  function mk(){var v=document.createElement("video");v.muted=true;v.defaultMuted=true;v.playsInline=true;v.setAttribute("muted","");v.setAttribute("playsinline","");v.preload="auto";v.disablePictureInPicture=true;v.tabIndex=-1;box.appendChild(v);return v}
  var a=mk(),c=mk(),cur=a,i=Math.floor(Math.random()*V.length),fails=0,paused=false;
  try{paused=localStorage.getItem(KEY)==="1"}catch(e){}
  function go(v,n){v._next=0;v.src=url(n);try{v.defaultPlaybackRate=.8;v.playbackRate=.8}catch(e){}v.load();var p=v.play();if(p&&p.catch)p.catch(function(){})}
  function next(){i=(i+1)%V.length;cur=cur===a?c:a;go(cur,i)}
  function wire(v){
    v.addEventListener("playing",function(){if(v!==cur)return;fails=0;v.classList.add("on");(v===a?c:a).classList.remove("on")});
    v.addEventListener("timeupdate",function(){if(v===cur&&!v._next&&v.duration&&v.duration-v.currentTime<2.2){v._next=1;next()}});
    v.addEventListener("ended",function(){if(v===cur&&!v._next){v._next=1;next()}});
    v.addEventListener("error",function(){if(v!==cur)return;fails++;if(fails<V.length)next();else{a.classList.remove("on");c.classList.remove("on");btn.hidden=true}});
  }
  function show(){btn.hidden=false;btn.innerHTML=paused?IY:IP;btn.setAttribute("aria-pressed",paused?"true":"false");btn.setAttribute("aria-label",paused?L.play:L.pause)}
  btn.addEventListener("click",function(){paused=!paused;try{localStorage.setItem(KEY,paused?"1":"0")}catch(e){}
    if(paused){try{cur.pause()}catch(e){}cur.classList.remove("on")}else if(!cur.src){go(cur,i)}else{var p=cur.play();if(p&&p.catch)p.catch(function(){});cur.classList.add("on")}show()});
  wire(a);wire(c);show();
  function start(){if(!paused)go(a,i)}
  if(document.readyState==="complete")setTimeout(start,250);else addEventListener("load",function(){setTimeout(start,250)},{once:true});
  document.addEventListener("visibilitychange",function(){if(paused)return;if(document.hidden){try{cur.pause()}catch(e){}}else{var p=cur.play();if(p&&p.catch)p.catch(function(){})}});
})();

/* Listing form -> the website (/api/lp/listing), which saves it under Inquiries in the website admin and
   copies it to the Fano team app's Lead inbox, like the website's own List Your Property form. */
(function(){
"use strict";
var LEAD_ENDPOINT="/api/lp/listing",WA="971525719164",LANG=document.documentElement.lang;
var T={"wa": "مرحباً فانو العقارية، أرغب في عرض عقاري لديكم.", "eType": "يرجى اختيار نوع العقار.", "eName": "يرجى إدخال اسمك.", "ePhone": "يرجى إدخال رقم جوال صحيح، مع رمز الدولة إن كنت خارج الإمارات.", "eEmail": "يبدو أن البريد الإلكتروني غير صحيح.", "eConsent": "يرجى وضع علامة في المربع لنتمكن من التواصل معك.", "eFail": "عذراً، لم يتم الإرسال.", "eRetry": "يرجى المحاولة مرة أخرى، أو", "eWa": "راسلنا عبر واتساب", "sending": "جارٍ الإرسال…", "submit": "أرسل تفاصيل عقاري", "doneEyebrow": "تم استلام التفاصيل", "doneTitle": "شكراً لك، {name}.", "doneBody": "سيتصل بك مستشار أول على {phone} خلال 24 ساعة لمناقشة عقارك.", "doneWa": "تحدّث الآن عبر واتساب"};
document.getElementById("yr").textContent=new Date().getFullYear();
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
var waUrl="https://wa.me/"+WA+"?text="+encodeURIComponent(T.wa);
[].forEach.call(document.querySelectorAll("[data-wa]"),function(a){a.href=waUrl});
// The website's Google tag skips data-wa links, so this page reports its own WhatsApp taps
document.addEventListener("click",function(e){var w=e.target.closest&&e.target.closest("[data-wa]");if(w&&window.gtag)gtag("event","whatsapp_click",{page_path:location.pathname})});
var form=document.getElementById("lead-form"),err=document.getElementById("f-err"),send=document.getElementById("f-send");
var qs=new URLSearchParams(location.search),started=Date.now();
function bad(el,msg){el.classList.add("bad");el.focus();err.textContent=msg;return false}
[].forEach.call(form.querySelectorAll(".inp"),function(el){el.addEventListener("input",function(){el.classList.remove("bad");err.textContent=""})});
[].forEach.call(form.querySelectorAll("[name=ptype]"),function(el){el.addEventListener("change",function(){[].forEach.call(form.querySelectorAll("[name=ptype]"),function(x){x.classList.remove("bad")});err.textContent=""})});
function val(n){var x=form.querySelector("[name="+n+"]:checked");return x?x.value:""}
form.addEventListener("submit",function(e){
  e.preventDefault();err.textContent="";
  var type=val("ptype"),name=form.name.value.trim(),phone=form.phone.value.trim(),email=form.email.value.trim();
  var phoneDigits=phone.replace(/[٠-٩]/g,function(c){return String(c.charCodeAt(0)-0x660)});
  if(!type){var f=form.querySelector("[name=ptype]");f.classList.add("bad");f.focus();err.textContent=T.eType;return}
  if(name.length<2)return bad(form.name,T.eName);
  var digits=phoneDigits.replace(/\D/g,"");
  if(digits.length<7||digits.length>15)return bad(form.phone,T.ePhone);
  if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))return bad(form.email,T.eEmail);
  if(!form.consent.checked){err.textContent=T.eConsent;form.consent.focus();return}
  var beds=form.beds.value,area=form.area.value.trim(),intent=val("intent"),status=val("status");
  var att={};["c","gclid","gbraid","wbraid","fbclid","utm_source","utm_medium","utm_campaign","utm_content","utm_term"].forEach(function(k){var v=qs.get(k);if(v)att[k]=v.slice(0,200)});
  if(document.referrer)att.ref=document.referrer.slice(0,300);
  var data={
    name:name,phone:phoneDigits,email:email,propertyType:type,intent:intent,status:status,bedrooms:beds,area:area,
    notes:form.message.value.trim(),website:form.website.value,lang:LANG,page:location.pathname,ms:Date.now()-started,attribution:att
  };
  send.disabled=true;send.textContent=T.sending;
  fetch(LEAD_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)})
    .then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(!r.ok||!j.ok)throw new Error(j.error||"failed");return j})})
    .then(function(){
      document.getElementById("form-box").innerHTML='<div class="done" tabindex="-1" id="done"><div class="tick"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div><p class="label eyebrow" style="color:var(--gold)">'+T.doneEyebrow+'</p><h2>'+T.doneTitle.replace("{name}",esc(name.split(" ")[0]))+'</h2><p>'+T.doneBody.replace("{phone}",'<b class="ltr" style="color:var(--ink)">'+esc(phone)+'</b>')+'</p><div><a class="btn" target="_blank" rel="noopener" href="'+waUrl+'">'+T.doneWa+'</a></div></div>';
      var d=document.getElementById("done");if(d)d.focus();
      // Same event as the website's own List Your Property form (trackLead in lib/analytics.ts)
      if(window.gtag)gtag("event","generate_lead",{form_name:"listing_submission",currency:"AED",property_type:type,page_path:location.pathname});
      if(window.fbq)window.fbq("track","Lead");
    })
    .catch(function(x){
      send.disabled=false;send.textContent=T.submit;
      err.innerHTML=esc(x&&x.message&&x.message!=="failed"&&x.message.length<120?x.message:T.eFail)+' '+T.eRetry+' <a href="'+waUrl+'" target="_blank" rel="noopener">'+T.eWa+'</a>.';
    });
});
})();
</script>
</body>
</html>
`,
} as const;
