window.OT_CONFIG = {
  CMP_DOMAIN_SCRIPT:    "REPLACE_WITH_DOMAIN_SCRIPT_ID",   // also paste into the commented otSDKStub block below
  FORM_STUB_URL:        "REPLACE_WITH_OtFormStub.js_URL",  // copy from the OneTrust web form script. Do not guess it.
  FORM_DATA_ID:         "REPLACE_WITH_WEB_FORM_DATA_ID",   // the data-id on the OtFormStub script
  WEB_FORM_ID:          "ot-REPLACE_WITH_FORM_OR_BUTTON_ID", // collection point ID = this without "ot-"
  WORKER:               "https://consent-api.onetrust.com",
  PREFERENCE_CENTER_ID: "REPLACE_WITH_PREFERENCE_CENTRE_ID"  // optional, for the #ot-pref-center slot
};
window.DEMO_SWITCHES = {
  USE_WEB_FORM:   false, // true = load the OneTrust web form into the pop-up
  USE_INSTALL_CP: false  // false = INSTANT mode (form loads itself). true = MANUAL mode (InstallCP once).
};
