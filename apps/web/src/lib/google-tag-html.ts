import { CONSENT_COUNTRIES } from "@/lib/analytics";

// Google tag IDs, read when a page is served so they can be set on Railway without a code change.
// Any of the three can be set; the website and the /lp landing pages use the same ones.
//   GTM_ID              Google Tag Manager container, GTM-XXXXXXX (add every other tag inside GTM)
//   GA_MEASUREMENT_ID   Google Analytics 4, G-XXXXXXXXXX
//   GOOGLE_ADS_ID       Google Ads, AW-XXXXXXXXXX
const tagId = (value: string | undefined, prefix: string) =>
  value && new RegExp(`^${prefix}-[A-Z0-9-]+$`).test(value.trim().toUpperCase()) ? value.trim().toUpperCase() : undefined;

export function googleTagIds() {
  return {
    gtmId: tagId(process.env.GTM_ID, "GTM"),
    gaId: tagId(process.env.GA_MEASUREMENT_ID, "G"),
    adsId: tagId(process.env.GOOGLE_ADS_ID, "AW"),
  };
}

const GRANTED = { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted", analytics_storage: "granted" };
const DENIED = { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" };

/**
 * The <head> snippet for the static landing pages: Consent Mode v2 (same rules as the rest of the
 * site), then Google Tag Manager and/or the Google tag. Calls and WhatsApp taps are reported as
 * conversions; the pages report generate_lead themselves after an enquiry is sent, and the
 * enquirer's email and phone go to the tag first so Google Ads can match the lead to the click.
 */
export function googleTagHead(): string {
  const { gtmId, gaId, adsId } = googleTagIds();
  const ids = [gaId, adsId].filter(Boolean) as string[];
  if (!gtmId && !ids.length) return "";
  const j = JSON.stringify;
  return `<script>
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',${j({ ...DENIED, region: CONSENT_COUNTRIES, wait_for_update: 500 })});
gtag('consent','default',${j(GRANTED)});
try{if(localStorage.getItem('fano-cookie-consent')==='granted')gtag('consent','update',${j(GRANTED)});}catch(e){}
gtag('js',new Date());
${ids.map((id) => `gtag('config',${j(id)});`).join("\n")}
(function(){
  document.addEventListener('click',function(e){
    var a=e.target&&e.target.closest&&e.target.closest('a[href]');if(!a)return;
    var h=a.getAttribute('href')||'';
    if(h.indexOf('tel:')===0)gtag('event','click_to_call',{link_url:h,page_path:location.pathname});
    else if(h.indexOf('wa.me/')>-1&&!a.hasAttribute('data-wa'))gtag('event','whatsapp_click',{page_path:location.pathname});
  });
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
${ids.length ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${ids[0]}"></script>\n` : ""}${
    gtmId
      ? `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${j(gtmId)});</script>\n`
      : ""
  }`;
}
