# Connecting Google Tag, Analytics and Ads

The website and every landing page (`fanoproperties.com/lp/...`) load the same Google tags. You only
paste the IDs into Railway; no code change and no new deploy of code is needed.

## 1. Find your IDs

| What | Where to find it | Looks like |
|---|---|---|
| Google Tag Manager (recommended) | tagmanager.google.com → your container → the ID at the top | `GTM-ABC1234` |
| Google Analytics 4 | analytics.google.com → Admin → Data streams → your web stream → Measurement ID | `G-ABC123XYZ9` |
| Google Ads | ads.google.com → Tools → Google tag → your tag → Tag ID | `AW-123456789` |

Use either Tag Manager on its own (and add Analytics and Ads inside it), or the Analytics and Ads IDs
directly. Setting both is fine too.

## 2. Paste them into Railway

1. Open railway.app → the Fano website project → the **web** service → **Variables**.
2. Click **New Variable** and add any of:
   - `GTM_ID` = your `GTM-...` ID
   - `GA_MEASUREMENT_ID` = your `G-...` ID
   - `GOOGLE_ADS_ID` = your `AW-...` ID
3. Railway restarts the site by itself. After about two minutes the tags are live.

## 3. Check it works

Open fanoproperties.com and fanoproperties.com/lp/en with **Tag Assistant** (tagassistant.google.com).
You should see the tag(s) load.

## Events the site sends (use them as conversions in Google Ads)

| Event | When |
|---|---|
| `generate_lead` | An enquiry form is sent (website and landing pages) |
| `whatsapp_click` | Any WhatsApp button or link is tapped |
| `click_to_call` | A phone number is tapped |

In Tag Manager these arrive in the data layer under the same names, so a trigger of type
**Custom Event** with the event name above is all a conversion tag needs. Before `generate_lead` the
enquirer's email and phone are handed to the tag as user-provided data, so Google Ads enhanced
conversions can match the lead to the ad click.

Visitors in the EU, UK and Switzerland see a cookie banner; ads and analytics cookies stay off for
them until they accept (Consent Mode v2).
