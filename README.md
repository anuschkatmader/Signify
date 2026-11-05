# Signify demo

A OneTrust UCPM and CMP demo for Signify, in English. It is a demo environment, not a Signify website. All names, orders and addresses are fictional.

## Structure

```
signify-ucpm-demo/
├── index.html               Homepage and newsletter pop-up
├── account.html             My account: overview, orders, projects, addresses, profile, preference centre
├── css/site.css             All styling
├── js/onetrust-config.js    Web form IDs and switches
├── js/images.js             Photo loading
├── js/site.js               Demo behaviour and OneTrust wiring
├── images/                  Photo download script and fallback illustrations
└── README.md
```

Account sections open by hash, for example `account.html#preferences`.

## Run it

Open `index.html`, or serve the folder from any static host. There is no build step.

## Save the photos into the images folder

Run this once from the project folder, on Mac or Linux:

```
bash images/download-photos.sh
```

Each image tries `images/<name>.jpg` first, then the same photo from Pexels, then a drawn SVG. So the page still shows photos before you run the script, as long as you're online.

| File | Photo | Photographer |
| --- | --- | --- |
| `hero-city.jpg` | [Road and street lights at night](https://www.pexels.com/photo/road-and-street-lights-at-night-9920643/) | Elias Tigiser |
| `hero-stadium.jpg` | [Two football stadium lights](https://www.pexels.com/photo/two-football-stadium-lights-776805/) | Toni Cuenca |
| `hero-offices.jpg` | [Modern open space office with large windows](https://www.pexels.com/photo/modern-open-space-office-with-large-windows-28715052/) | Eric WANG |
| `tile-products.jpg` | [Pendant lamps hanging from the ceiling](https://www.pexels.com/photo/low-angle-photography-of-pendant-lamps-hanging-from-the-ceiling-1163109/) | FOX |
| `tile-applications.jpg` | [Modern open office space](https://www.pexels.com/photo/modern-open-office-space-with-workspace-cubicles-36631701/) | DOAN THANH BINH |
| `mosaic-smart-city.jpg` | [Aerial view of a modern illuminated city at night](https://www.pexels.com/photo/aerial-view-of-a-modern-illuminated-city-at-night-16705973/) | Jimmy Liao |
| `mosaic-retail-atrium.jpg` | [Indoor shopping mall with skylight](https://www.pexels.com/photo/modern-indoor-shopping-mall-interior-with-skylight-33803366/) | Erika Browne |
| `mosaic-facade.jpg` | [Illuminated historic building at night](https://www.pexels.com/photo/illuminated-historic-building-at-night-33357681/) | See photo page |
| `mosaic-modern-interior.jpg` | [Modern restaurant interior with ambient lighting](https://www.pexels.com/photo/cozy-modern-restaurant-interior-with-ambient-lighting-34686219/) | Alex Seb |
| `mosaic-home.jpg` | [Cozy living room with soft lighting](https://www.pexels.com/photo/cozy-living-room-with-soft-lighting-and-decor-34726411/) | Julia Cari |

The photos come from Pexels, marked free to use. Check [the Pexels licence](https://www.pexels.com/license/) before using them outside this demo.

## Add the cookie banner

Paste your OneTrust script between the two PASTE markers at the very top of `<head>`, in **both** `index.html` and `account.html`. Until then the pages show no cookie banner.

## Demo flow

1. Choose an option on the OneTrust cookie banner.
2. Click the Be the first! section. This is the only place that opens the newsletter pop-up. The Subscribe link in the top bar scrolls to it.
3. Subscribe, then open My account. Newsletter consent now shows Granted.
4. Open Communication preferences to change topics, frequency and channels, then save. Consent history updates.
5. Use Reset demo in the top strip to start again.

## Connect the web form

1. Paste your values into `js/onetrust-config.js`. Anything containing `REPLACE` counts as missing, and the built-in form shows instead.
2. Copy the script URL from OneTrust. Do not guess it.
3. Set `USE_WEB_FORM` to `true`.
4. Set `USE_INSTALL_CP` to `false` for INSTANT forms, or `true` for MANUAL forms.
5. Publish the collection point, authorise the demo domain, and hard refresh.

The collection point ID is the form ID without `ot-`. The code strips this for you.

### If the form doesn't render

Check that the collection point is published, the demo domain is authorised and the integration mode is correct. Then hard refresh.

Never pass an options object to `InstallCP`. The form renders into `#ot-container`, and the closed pop-up stays off-screen at full size because the SDK will not render into a hidden container.

### Other hooks

- Optional preference centre embed: `#ot-pref-center` on `account.html`.
- Auto-blocking demo: two dummy tags at the end of each page log to the console, categories C0002 and C0004.
- Footer Cookie Settings link: `id="ot-sdk-btn"`, class `ot-sdk-show-settings`.

## Good to know

- Demo state is kept in `sessionStorage` so it carries between the two pages. It stays in that browser tab and clears with Reset demo.
- Each page has a `noindex, nofollow` tag, and the demo notice in the top strip stays on every page.
