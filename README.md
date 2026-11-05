# Signify consent concept (demo)

A OneTrust UCPM and CMP demo for Signify, in English. It is a labelled concept, not a Signify website. All names, orders and addresses are fictional.

## Structure

```
signify-ucpm-demo/
├── index.html               Homepage: cookie banner and newsletter pop-up
├── account.html             My account: overview, orders, projects, addresses, profile, preference centre
├── css/site.css             All styling
├── js/onetrust-config.js    All OneTrust IDs and switches
├── js/site.js               Demo behaviour and OneTrust wiring
├── images/                  Original illustrations (SVG)
└── README.md
```

Account sections open by hash, for example `account.html#preferences`.

## Run it

Open `index.html`, or serve the folder from any static host. There is no build step.

## Demo flow

1. Choose an option on the cookie banner. The pop-up opens a moment later.
2. Subscribe in the pop-up.
3. Open My account. Newsletter consent now shows Granted.
4. Open Communication preferences to change topics, frequency and channels, then save. Consent history updates.
5. Use Reset demo in the top strip to start again.

The Show cookie banner and Show pop-up buttons replay either moment during a call.

## Connect OneTrust

1. Paste your values into `js/onetrust-config.js`. Anything containing `REPLACE` counts as missing, and the demo version runs instead.
2. Copy the script URLs from OneTrust. Do not guess them.
3. Set `USE_WEB_FORM` to `true`.
4. Set `USE_INSTALL_CP` to `false` for INSTANT forms, or `true` for MANUAL forms.
5. For the cookie banner, uncomment the otSDKStub block in the head of **both** `index.html` and `account.html`, and fill in its two values.
6. Publish the collection point, authorise the demo domain, and hard refresh.

The collection point ID is the form ID without `ot-`. The code strips this for you.

### If the form doesn't render

Check that the collection point is published, the demo domain is authorised and the integration mode is correct. Then hard refresh.

Never pass an options object to `InstallCP`. The form renders into `#ot-container`, and closed pop-ups stay off-screen at full size because the SDK will not render into a hidden container.

### Other hooks

- Optional preference centre embed: `#ot-pref-center` on `account.html`.
- Auto-blocking demo: two dummy tags at the end of each page log to the console, categories C0002 and C0004.
- Footer Cookie Settings link: `id="ot-sdk-btn"`, class `ot-sdk-show-settings`.

## Good to know

- Demo state is kept in `sessionStorage` so it carries between the two pages. It stays in that browser tab and clears with Reset demo.
- Before you add a live form, the top strip reads "Nothing you enter leaves this page". With the form on, it reads "Use test data only".
- Each page has a `noindex, nofollow` tag. The demo notice in the top strip stays in place on every page.
