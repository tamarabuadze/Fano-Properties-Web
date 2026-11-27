// Turns WhatsApp taps into leads. When someone taps any WhatsApp link on the website or the /lp
// landing pages, a small box first asks for their name and mobile:
//   Continue              checks the name and mobile, then shows four quick questions (looking to
//                         buy, invest or rent; property type; budget; when). Each is one tap and
//                         all are optional.
//   Continue to WhatsApp  the details and any answers go to /api/wa-lead (saved with the website's
//                         enquiries and copied to the team app's Lead inbox), then WhatsApp opens
//                         with the answers added to the visitor's first message
//   ✕ / Esc / outside     on the first step, closes the box and stays on the page; on the
//                         questions step, the name and mobile are already given, so the lead is
//                         sent with whatever was answered and the box closes without opening
//                         WhatsApp. Leaving the page on the questions step also sends the lead.
// There is no way past the box without a name and a valid mobile: no Skip button, and
// Ctrl/Cmd/Shift-clicks and middle-clicks on a WhatsApp link open the box too.
// After someone has left their details once, later taps in that browser session go straight to
// WhatsApp. The box is in Arabic, right to left, on Arabic pages. Answers are sent in English
// whatever the page language, so the team sees the same words on every lead.
//
// The tap itself still reaches the pages' own click handlers, so whatsapp_click keeps counting as a
// Google Ads conversion exactly as before. A sent lead is also reported as whatsapp_lead.
// Plain ES5 so it runs the same in the React site and the static /lp pages.

const GATE_JS = String.raw`(function(){
if(window.__fanoWaGate)return;window.__fanoWaGate=1;
var DONE="fano-wa-lead",WA=/^https:\/\/(wa\.me|api\.whatsapp\.com|(www\.)?whatsapp\.com)\//i;
var T={
 en:{t:"Before we open WhatsApp",s:"Leave your name and mobile so an advisor can follow up, even if the chat drops.",n:"Your name",p:"Mobile number",next:"Continue",go:"Continue to WhatsApp",en:"Please enter your name.",ep:"Please enter a valid mobile number.",x:"Close",
  qt:"A few quick questions",qs:"Optional. Tap what fits so your advisor can send the right options.",mine:"My interest: "},
 ar:{t:"قبل فتح واتساب",s:"اترك اسمك ورقم جوالك ليتابع معك أحد مستشارينا، حتى لو انقطعت المحادثة.",n:"الاسم",p:"رقم الجوال",next:"متابعة",go:"المتابعة إلى واتساب",en:"يرجى كتابة اسمك.",ep:"يرجى كتابة رقم جوال صحيح.",x:"إغلاق",
  qt:"أسئلة سريعة",qs:"اختياري. اختر ما يناسبك ليرسل لك مستشارك الخيارات المناسبة.",mine:"اهتمامي: "}};
// Each question: the key sent to /api/wa-lead, its label, and its choices as [value sent, English, Arabic]
var Q=[
 {k:"look",en:"Looking to",ar:"الغرض",o:[["Buy","Buy","شراء"],["Invest","Invest","استثمار"],["Rent","Rent","إيجار"]]},
 {k:"type",en:"Property",ar:"نوع العقار",o:[["Office","Office","مكتب"],["Apartment","Apartment","شقة"],["Shop","Shop","محل"],["Other","Other","أخرى"]]},
 {k:"budget",en:"Budget",ar:"الميزانية",o:[["Under AED 1M","Under AED 1M","أقل من 1 مليون درهم"],["AED 1M-2M","AED 1M–2M","من 1 إلى 2 مليون درهم"],["AED 2M-5M","AED 2M–5M","من 2 إلى 5 ملايين درهم"],["AED 5M+","AED 5M+","أكثر من 5 ملايين درهم"]],
  rent:[["Under AED 100K a year","Under AED 100K a year","أقل من 100 ألف درهم سنوياً"],["AED 100K-250K a year","AED 100K–250K a year","من 100 إلى 250 ألف درهم سنوياً"],["AED 250K+ a year","AED 250K+ a year","أكثر من 250 ألف درهم سنوياً"]]},
 {k:"when",en:"When",ar:"متى",o:[["Now","Now","الآن"],["Within 3 months","Within 3 months","خلال 3 أشهر"],["Later","Later","لاحقاً"]]}];
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
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var box=null,link=null,opened=0,who=null,ans={},sent=0;
// The visitor's answers in the page language, added to the WhatsApp message they are about to send
function withAnswers(h){var L=T[isAr()?"ar":"en"],ar=isAr(),parts=[];
 Q.forEach(function(q){var v=ans[q.k];if(!v)return;(q.k==="budget"&&ans.look==="Rent"?q.rent:q.o).forEach(function(o){if(o[0]===v)parts.push(ar?o[2]:o[1])})});
 if(!parts.length)return h;
 try{var u=new URL(h),t=u.searchParams.get("text")||"";u.searchParams.delete("text");var qs=u.search;
  return u.origin+u.pathname+(qs?qs+"&":"?")+"text="+encodeURIComponent((t?t+"\n\n":"")+L.mine+parts.join(" · "))+u.hash}catch(e){return h}}
// Sends the lead once, with whatever has been answered so far
function send(){if(sent||!who)return;sent=1;
 var body=attribution(),k;for(k in who)body[k]=who[k];body.ms=Date.now()-opened;
 Q.forEach(function(q){if(ans[q.k])body[q.k]=ans[q.k]});
 try{fetch("/api/wa-lead",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body),keepalive:true}).catch(function(){})}catch(x){}
 store(DONE,"1");track("whatsapp_lead")}
function onHide(){if(document.visibilityState==="hidden")send()}
function openWa(){var h=link&&link.href;close();if(!h||!WA.test(h))return;h=withAnswers(h);
 if((link.getAttribute("target")||"")==="_blank"){var w=window.open(h,"_blank");if(w){try{w.opener=null}catch(e){}}else location.href=h}
 else location.href=h}
function close(){if(who)send();if(box&&box.parentNode)box.parentNode.removeChild(box);box=null;
 document.removeEventListener("keydown",onKey,true);window.removeEventListener("pagehide",send);document.removeEventListener("visibilitychange",onHide)}
function onKey(e){if(e.key==="Escape"){e.preventDefault();close()}}
var BTN="display:block;width:100%;height:48px;border:0;border-radius:24px;background:#1F8A5B;color:#fff;font:inherit;font-size:16px;font-weight:600;cursor:pointer";
var CHIP="display:inline-block;margin:0 0 6px;margin-inline-end:6px;padding:8px 13px;border:1px solid #D9CFC0;border-radius:18px;background:#fff;color:#2B2520;font:inherit;font-size:14px;line-height:1.2;cursor:pointer";
function chip(on){return CHIP+(on?";background:#2B2520;border-color:#2B2520;color:#FBF8F3":"")}
function questions(){var L=T[isAr()?"ar":"en"],ar=isAr(),f=box.querySelector("form"),html="";
 Q.forEach(function(q){var list=q.k==="budget"&&ans.look==="Rent"?q.rent:q.o;
  html+='<div role="group" aria-label="'+esc(ar?q.ar:q.en)+'" style="margin:0 0 8px"><p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#6B5E52">'+esc(ar?q.ar:q.en)+'</p>';
  list.forEach(function(o){var on=ans[q.k]===o[0];html+='<button type="button" data-q="'+q.k+'" data-v="'+esc(o[0])+'" aria-pressed="'+on+'" style="'+chip(on)+'">'+esc(ar?o[2]:o[1])+'</button>'});
  html+='</div>'});
 f.querySelector("[data-qs]").innerHTML=html}
function step2(){var L=T[isAr()?"ar":"en"],f=box.querySelector("form");
 f.querySelector("[data-one]").style.display="none";
 var two=f.querySelector("[data-two]");two.style.display="block";
 f.querySelector("#fano-wa-t").textContent=L.qt;f.querySelector("[data-sub]").textContent=L.qs;
 questions();f.querySelector("button[type=submit]").textContent=L.go;
 window.addEventListener("pagehide",send);document.addEventListener("visibilitychange",onHide);
 setTimeout(function(){try{f.querySelector("[data-q]").focus({preventScroll:true})}catch(e){}},30)}
function show(a){link=a;opened=Date.now();who=null;ans={};sent=0;var L=T[isAr()?"ar":"en"];
 box=document.createElement("div");box.setAttribute("role","dialog");box.setAttribute("aria-modal","true");box.setAttribute("aria-labelledby","fano-wa-t");box.dir=isAr()?"rtl":"ltr";
 box.style.cssText="position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(24,19,15,.55);font-family:inherit;";
 box.innerHTML='<form novalidate style="position:relative;width:100%;max-width:380px;max-height:calc(100vh - 32px);overflow-y:auto;box-sizing:border-box;background:#FBF8F3;color:#2B2520;border-radius:18px;padding:24px 22px 18px;box-shadow:0 24px 60px rgba(0,0,0,.35);text-align:start;line-height:1.45">'
 +'<button type="button" data-x aria-label="'+L.x+'" style="position:absolute;top:10px;inset-inline-end:10px;width:36px;height:36px;border:0;background:transparent;color:#6B5E52;font-size:22px;line-height:1;cursor:pointer">&times;</button>'
 +'<h2 id="fano-wa-t" style="margin:0 0 6px;padding-inline-end:28px;font-size:19px;font-weight:600;color:#2B2520">'+L.t+'</h2>'
 +'<p data-sub style="margin:0 0 16px;font-size:14px;color:#6B5E52">'+L.s+'</p>'
 +'<div data-one>'
 +'<input name="name" autocomplete="name" maxlength="80" placeholder="'+L.n+'" aria-label="'+L.n+'" style="display:block;width:100%;box-sizing:border-box;height:46px;margin:0 0 10px;padding:0 12px;border:1px solid #D9CFC0;border-radius:10px;background:#fff;color:#2B2520;font:inherit;font-size:16px">'
 +'<input name="phone" type="tel" inputmode="tel" autocomplete="tel" maxlength="30" dir="ltr" placeholder="'+L.p+'" aria-label="'+L.p+'" style="display:block;width:100%;box-sizing:border-box;height:46px;margin:0 0 6px;padding:0 12px;border:1px solid #D9CFC0;border-radius:10px;background:#fff;color:#2B2520;font:inherit;font-size:16px;text-align:'+(isAr()?"right":"left")+'">'
 +'<input name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">'
 +'<p data-err role="alert" style="min-height:18px;margin:0 0 8px;font-size:13px;color:#B3261E"></p>'
 +'</div>'
 +'<div data-two style="display:none;margin:0 0 10px"><div data-qs></div></div>'
 +'<button type="submit" style="'+BTN+'">'+L.next+'</button>'
 +'</form>';
 document.body.appendChild(box);document.addEventListener("keydown",onKey,true);
 var f=box.querySelector("form"),err=box.querySelector("[data-err]"),fn=f.querySelector("[name=name]"),fp=f.querySelector("[name=phone]"),fw=f.querySelector("[name=website]");
 box.addEventListener("click",function(e){if(e.target===box||e.target.closest("[data-x]")){close();return}
  var c=e.target.closest("[data-q]");if(!c)return;var k=c.getAttribute("data-q"),v=c.getAttribute("data-v"),was=ans.look;
  if(ans[k]===v)delete ans[k];else ans[k]=v;
  // A rent budget and a purchase budget are different scales, so switching between them clears it
  if(k==="look"&&(was==="Rent")!==(ans.look==="Rent"))delete ans.budget;
  questions();try{box.querySelector('[data-q="'+k+'"][data-v="'+(ans[k]||v).replace(/"/g,"")+'"]').focus({preventScroll:true})}catch(x){}});
 f.addEventListener("input",function(){err.textContent=""});
 f.addEventListener("submit",function(e){e.preventDefault();
  if(who){openWa();return}
  var name=fn.value.trim(),phone=latin(fp.value.trim()),d=phone.replace(/\D/g,"");
  if(name.length<2){err.textContent=L.en;fn.focus();return}
  if(d.length<7||d.length>15||/^(\d)\1+$/.test(d)){err.textContent=L.ep;fp.focus();return}
  who={name:name.slice(0,80),phone:phone.slice(0,30),website:fw.value,page:(location.pathname+location.search).slice(0,300),title:(document.title||"").slice(0,160)};
  step2()});
 setTimeout(function(){try{fn.focus({preventScroll:true})}catch(e){}},30)}
function gate(e){
 if(e.defaultPrevented||e.button>1)return;
 var a=e.target&&e.target.closest&&e.target.closest("a");if(!a||(box&&box.contains(a)))return;
 if(!WA.test(a.href||"")&&!a.hasAttribute("data-wa"))return;
 if(store(DONE)==="1")return;
 e.preventDefault();if(!box)show(a)}
document.addEventListener("click",gate,true);
document.addEventListener("auxclick",gate,true);
})();`;

/** The script itself, for an inline <script> in the React pages */
export function whatsAppGateJs(): string {
  return GATE_JS;
}

/** The script as a tag, for the static /lp pages */
export function whatsAppGateTag(): string {
  return `<script>${GATE_JS}</script>\n`;
}
