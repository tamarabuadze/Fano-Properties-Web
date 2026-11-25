// Turns WhatsApp taps into leads. When someone taps any WhatsApp link on the website or the /lp
// landing pages, a small box first asks for their name and mobile:
//   Continue to WhatsApp  the details go to /api/wa-lead (saved with the website's enquiries and
//                         copied to the team app's Lead inbox), then WhatsApp opens as normal
//   Skip                  WhatsApp opens straight away, so nobody is blocked from chatting
//   ✕ / Esc / outside     closes the box and stays on the page
// After someone has left their details once, later taps in that browser session go straight to
// WhatsApp. The box is in Arabic, right to left, on Arabic pages.
//
// The tap itself still reaches the pages' own click handlers, so whatsapp_click keeps counting as a
// Google Ads conversion exactly as before. A sent lead is also reported as whatsapp_lead, a skip as
// whatsapp_gate_skip. Plain ES5 so it runs the same in the React site and the static /lp pages.

const GATE_JS = String.raw`(function(){
if(window.__fanoWaGate)return;window.__fanoWaGate=1;
var DONE="fano-wa-lead",WA=/^https:\/\/(wa\.me|api\.whatsapp\.com|(www\.)?whatsapp\.com)\//i;
var T={
 en:{t:"Before we open WhatsApp",s:"Leave your name and mobile so an advisor can follow up, even if the chat drops.",n:"Your name",p:"Mobile number",go:"Continue to WhatsApp",skip:"Skip",en:"Please enter your name.",ep:"Please enter a valid mobile number.",x:"Close"},
 ar:{t:"قبل فتح واتساب",s:"اترك اسمك ورقم جوالك ليتابع معك أحد مستشارينا، حتى لو انقطعت المحادثة.",n:"الاسم",p:"رقم الجوال",go:"المتابعة إلى واتساب",skip:"تخطي",en:"يرجى كتابة اسمك.",ep:"يرجى كتابة رقم جوال صحيح.",x:"إغلاق"}};
function store(k,v){try{if(v===undefined)return sessionStorage.getItem(k);sessionStorage.setItem(k,v)}catch(e){}}
function isAr(){var h=document.documentElement;return (h.lang||"").toLowerCase().indexOf("ar")===0||h.dir==="rtl"}
function latin(s){return String(s).replace(/[٠-٩]/g,function(d){return String(d.charCodeAt(0)-0x660)}).replace(/[۰-۹]/g,function(d){return String(d.charCodeAt(0)-0x6F0)})}
function track(name){var p={page_path:location.pathname};try{if(window.gtag)window.gtag("event",name,p);else if(window.dataLayer)window.dataLayer.push({event:name,page_path:p.page_path})}catch(e){}}
function attribution(){var a={},q,k,keys=["c","gclid","gbraid","wbraid","utm_source","utm_medium","utm_campaign"];
 try{var s=JSON.parse(store("fano-attribution")||"{}");for(k in s)if(typeof s[k]==="string")a[k]=s[k]}catch(e){}
 try{q=new URLSearchParams(location.search);keys.forEach(function(k){var v=q.get(k);if(v&&!a[k])a[k]=v})}catch(e){}
 var out={};keys.concat(["ref"]).forEach(function(k){if(a[k])out[k]=String(a[k]).slice(0,k==="ref"?300:200)});
 if(!out.ref){try{if(document.referrer&&new URL(document.referrer).origin!==location.origin)out.ref=document.referrer.slice(0,300)}catch(e){}}
 return out}
var box=null,link=null,opened=0;
function openWa(){var h=link&&link.href;close();if(!h||!WA.test(h))return;
 if((link.getAttribute("target")||"")==="_blank"){var w=window.open(h,"_blank");if(w){try{w.opener=null}catch(e){}}else location.href=h}
 else location.href=h}
function close(){if(box&&box.parentNode)box.parentNode.removeChild(box);box=null;document.removeEventListener("keydown",onKey,true)}
function onKey(e){if(e.key==="Escape"){e.preventDefault();close()}}
function show(a){link=a;opened=Date.now();var L=T[isAr()?"ar":"en"];
 box=document.createElement("div");box.setAttribute("role","dialog");box.setAttribute("aria-modal","true");box.setAttribute("aria-labelledby","fano-wa-t");box.dir=isAr()?"rtl":"ltr";
 box.style.cssText="position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(24,19,15,.55);font-family:inherit;";
 box.innerHTML='<form novalidate style="position:relative;width:100%;max-width:380px;box-sizing:border-box;background:#FBF8F3;color:#2B2520;border-radius:18px;padding:24px 22px 18px;box-shadow:0 24px 60px rgba(0,0,0,.35);text-align:start;line-height:1.45">'
 +'<button type="button" data-x aria-label="'+L.x+'" style="position:absolute;top:10px;inset-inline-end:10px;width:36px;height:36px;border:0;background:transparent;color:#6B5E52;font-size:22px;line-height:1;cursor:pointer">&times;</button>'
 +'<h2 id="fano-wa-t" style="margin:0 0 6px;padding-inline-end:28px;font-size:19px;font-weight:600;color:#2B2520">'+L.t+'</h2>'
 +'<p style="margin:0 0 16px;font-size:14px;color:#6B5E52">'+L.s+'</p>'
 +'<input name="name" autocomplete="name" maxlength="80" placeholder="'+L.n+'" aria-label="'+L.n+'" style="display:block;width:100%;box-sizing:border-box;height:46px;margin:0 0 10px;padding:0 12px;border:1px solid #D9CFC0;border-radius:10px;background:#fff;color:#2B2520;font:inherit;font-size:16px">'
 +'<input name="phone" type="tel" inputmode="tel" autocomplete="tel" maxlength="30" dir="ltr" placeholder="'+L.p+'" aria-label="'+L.p+'" style="display:block;width:100%;box-sizing:border-box;height:46px;margin:0 0 6px;padding:0 12px;border:1px solid #D9CFC0;border-radius:10px;background:#fff;color:#2B2520;font:inherit;font-size:16px;text-align:'+(isAr()?"right":"left")+'">'
 +'<input name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">'
 +'<p data-err role="alert" style="min-height:18px;margin:0 0 8px;font-size:13px;color:#B3261E"></p>'
 +'<button type="submit" style="display:block;width:100%;height:48px;border:0;border-radius:24px;background:#1F8A5B;color:#fff;font:inherit;font-size:16px;font-weight:600;cursor:pointer">'+L.go+'</button>'
 +'<button type="button" data-skip style="display:block;margin:8px auto 0;padding:8px 16px;border:0;background:transparent;color:#6B5E52;font:inherit;font-size:14px;text-decoration:underline;cursor:pointer">'+L.skip+'</button>'
 +'</form>';
 document.body.appendChild(box);document.addEventListener("keydown",onKey,true);
 var f=box.querySelector("form"),err=box.querySelector("[data-err]"),fn=f.querySelector("[name=name]"),fp=f.querySelector("[name=phone]"),fw=f.querySelector("[name=website]");
 box.addEventListener("click",function(e){if(e.target===box||e.target.closest("[data-x]")){close()}else if(e.target.closest("[data-skip]")){track("whatsapp_gate_skip");openWa()}});
 f.addEventListener("input",function(){err.textContent=""});
 f.addEventListener("submit",function(e){e.preventDefault();
  var name=fn.value.trim(),phone=latin(fp.value.trim()),d=phone.replace(/\D/g,"");
  if(name.length<2){err.textContent=L.en;fn.focus();return}
  if(d.length<7||d.length>15||/^(\d)\1+$/.test(d)){err.textContent=L.ep;fp.focus();return}
  var body=attribution();body.name=name.slice(0,80);body.phone=phone.slice(0,30);body.website=fw.value;body.ms=Date.now()-opened;
  body.page=(location.pathname+location.search).slice(0,300);body.title=(document.title||"").slice(0,160);
  try{fetch("/api/wa-lead",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body),keepalive:true}).catch(function(){})}catch(x){}
  store(DONE,"1");track("whatsapp_lead");openWa()});
 setTimeout(function(){try{fn.focus({preventScroll:true})}catch(e){}},30)}
document.addEventListener("click",function(e){
 if(e.defaultPrevented||e.button>0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
 var a=e.target&&e.target.closest&&e.target.closest("a");if(!a||(box&&box.contains(a)))return;
 if(!WA.test(a.href||"")&&!a.hasAttribute("data-wa"))return;
 if(store(DONE)==="1")return;
 e.preventDefault();if(!box)show(a)},true);
})();`;

/** The script itself, for an inline <script> in the React pages */
export function whatsAppGateJs(): string {
  return GATE_JS;
}

/** The script as a tag, for the static /lp pages */
export function whatsAppGateTag(): string {
  return `<script>${GATE_JS}</script>\n`;
}
