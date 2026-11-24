import { CONSENT_COUNTRIES } from "@/lib/analytics";

// The website's Google tag for the plain-HTML ad landing pages under /lp (they are not React
// pages, so the site layout's <GoogleTag> does not reach them).
//
// Same consent rules as the rest of the site (components/analytics/google-tag.tsx): ads and
// analytics cookies are off in the EEA, UK and Switzerland unless the visitor accepted them on
// fanoproperties.com, and on everywhere else.
const GRANTED = { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted", analytics_storage: "granted" };
const DENIED = { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" };

const tagId = (value: string | undefined, prefix: string) =>
  value && new RegExp(`^${prefix}-[A-Z0-9-]+$`).test(value.trim()) ? value.trim() : undefined;

export function landingPageGoogleTag(): string {
  const ids = [tagId(process.env.GA_MEASUREMENT_ID, "G"), tagId(process.env.GOOGLE_ADS_ID, "AW")].filter(Boolean) as string[];
  if (!ids.length) return "";
  const j = JSON.stringify;
  return `<script async src="https://www.googletagmanager.com/gtag/js?id=${ids[0]}"></script>
<script>
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',${j({ ...DENIED, region: CONSENT_COUNTRIES, wait_for_update: 500 })});
gtag('consent','default',${j(GRANTED)});
try{if(localStorage.getItem('fano-cookie-consent')==='granted')gtag('consent','update',${j(GRANTED)});}catch(e){}
gtag('js',new Date());
${ids.map((id) => `gtag('config',${j(id)});`).join("\n")}
(function(){
  // Calls and WhatsApp taps count as conversions, as on the rest of the site. The page reports its own
  // WhatsApp buttons (data-wa), so only the other WhatsApp links are reported here.
  document.addEventListener('click',function(e){
    var a=e.target&&e.target.closest&&e.target.closest('a[href]');if(!a)return;
    var h=a.getAttribute('href')||'';
    if(h.indexOf('tel:')===0)gtag('event','click_to_call',{link_url:h,page_path:location.pathname});
    else if(h.indexOf('wa.me/')>-1&&!a.hasAttribute('data-wa'))gtag('event','whatsapp_click',{page_path:location.pathname});
  });
  // Hand the enquirer's email and phone to the Google tag before the page reports the lead
  // (same as trackLead in lib/analytics.ts), so Google Ads can match the lead to the ad click.
  function e164(raw){var t=String(raw||'').trim(),d=t.replace(/\\D/g,''),p;if(!d)return;
    if(t.charAt(0)==='+')p='+'+d;else if(d.indexOf('00')===0)p='+'+d.slice(2);else if(d.indexOf('971')===0)p='+'+d;
    else{if(d.charAt(0)==='0')d=d.slice(1);p=(d.length===8||d.length===9)?'+971'+d:'+'+d;}
    return p.length>=9&&p.length<=16?p:undefined;}
  document.addEventListener('submit',function(e){
    var f=e.target;if(!f||f.id!=='lead-form')return;var u={};
    var m=f.email&&String(f.email.value||'').trim().toLowerCase();if(m)u.email=m;
    var ph=f.phone&&e164(String(f.phone.value||'').replace(/[٠-٩]/g,function(c){return String(c.charCodeAt(0)-0x660)}));if(ph)u.phone_number=ph;
    if(u.email||u.phone_number)gtag('set','user_data',u);
  },true);
})();
</script>
`;
}
