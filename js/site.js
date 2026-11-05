(function(){
  "use strict";
  var CFG = window.OT_CONFIG, SW = window.DEMO_SWITCHES;
  var isSet = function(v){ return !!v && !/REPLACE/.test(v); };
  var $ = function(s,r){ return (r||document).querySelector(s); };
  var $$ = function(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); };

  var today = function(){ return new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}); };
  var LEVELS = ["Quarterly","Monthly","Every update"];
  var CHANNELS = ["Email","SMS","Post","Phone"];
  var PC = "Preference centre", POPUP = "Newsletter pop-up";

  function seed(){
    return {
      purposes:[
        {id:"news",title:"Product news",desc:"New luminaires, lamps and connected systems for the sectors you work in.",on:false,level:1,channels:["Email"],status:null},
        {id:"academy",title:"Training and Lighting Academy",desc:"Course dates, webinars and certificates.",on:true,level:2,channels:["Email","SMS"],status:"Opted in 12 October 2026 · Account registration"},
        {id:"events",title:"Events and trade fairs",desc:"Invitations to events near you.",on:true,level:0,channels:["Email","Post"],status:"Reduced to quarterly 3 September 2026 · "+PC},
        {id:"regulation",title:"Sustainability and regulation",desc:"Changes to energy rules and what they mean for your projects.",on:false,level:1,channels:["Email"],status:null},
        {id:"offers",title:"Offers for professionals",desc:"Promotions on products you buy.",on:false,level:1,channels:["Email"],status:"Opted out 4 July 2026 · "+PC},
        {id:"research",title:"Customer research",desc:"Short surveys that help improve products and service.",on:false,level:0,channels:["Email"],status:null},
        {id:"service",title:"Service messages",desc:"Order updates, recalls and warranty notices. These can't be turned off.",on:true,level:2,channels:["Email"],status:"Required for your orders and warranties",locked:true}
      ],
      receipts:[
        {d:"12 October 2026",t:"Training and Lighting Academy",c:"Opted in",s:"Account registration"},
        {d:"3 September 2026",t:"Events and trade fairs",c:"Reduced to quarterly",s:PC},
        {d:"4 July 2026",t:"Offers for professionals",c:"Opted out",s:PC}
      ],
      signedUp:false
    };
  }
  /* The demo spans two pages, so its state travels in sessionStorage. It stays in this browser tab. */
  var STORE = "signifyDemoState";
  function load(){ try { var r = sessionStorage.getItem(STORE); return r ? JSON.parse(r) : null; } catch(e){ return null; } }
  var stored = load();
  var state = stored ? stored.state : seed(), saved = JSON.stringify(state.purposes);
  var cookieGroups = stored ? stored.cookieGroups : null;
  function persist(){
    try { sessionStorage.setItem(STORE,JSON.stringify({state:state,popupShown:popupShown,cookieGroups:cookieGroups})); } catch(e){}
  }

  /* ---------- Toast ---------- */
  var toastTimer;
  function toast(msg){
    var t = $("#toast"); t.textContent = msg; t.classList.add("on");
    clearTimeout(toastTimer); toastTimer = setTimeout(function(){ t.classList.remove("on"); },3200);
  }

  /* ---------- Hero scenes ---------- */
  var CAPTIONS = ["Illustrated scene: cities","Illustrated scene: sports venues","Illustrated scene: offices"];
  $$(".dots button").forEach(function(d,i,all){
    d.addEventListener("click",function(){
      $$(".slide").forEach(function(s,j){ s.classList.toggle("on",i===j); });
      all.forEach(function(b,j){ b.setAttribute("aria-current",i===j?"true":"false"); });
      $("#slide-caption").textContent = CAPTIONS[i];
    });
  });

  /* ---------- Views ---------- */
  var PANELS = ["account","orders","projects","addresses","profile","preferences"];
  function route(){
    if(!$("#panel-account")) return; // the account panels only exist on account.html
    var h = location.hash.replace("#","");
    var panel = PANELS.indexOf(h) > -1 ? h : "account";
    PANELS.forEach(function(p){ $("#panel-"+p).classList.toggle("on",p===panel); });
    $$(".side a").forEach(function(a){
      if(a.getAttribute("href")==="#"+panel) a.setAttribute("aria-current","page"); else a.removeAttribute("aria-current");
    });
    window.scrollTo(0,0);
  }
  window.addEventListener("hashchange",route);

  /* ---------- Preference centre ---------- */
  function renderPurposes(){
    if(!$("#purposes")) return;
    $("#purposes").innerHTML = state.purposes.map(function(p){
      var meta = p.status ? '<div class="meta">'+p.status+'</div>' : '<div class="meta unset">Not set</div>';
      var more = p.locked ? "" :
        '<div class="purpose-more">'+
          '<fieldset><legend>How often</legend><div class="dimmer">'+
            LEVELS.map(function(l,i){ return '<label><input type="radio" name="lvl-'+p.id+'" value="'+i+'"'+(p.level===i?" checked":"")+'>'+l+'</label>'; }).join("")+
          '</div></fieldset>'+
          '<fieldset><legend>How to reach you</legend><div class="channels">'+
            CHANNELS.map(function(c){ return '<label><input type="checkbox" data-ch="'+c+'" data-p="'+p.id+'"'+(p.channels.indexOf(c)>-1?" checked":"")+'>'+c+'</label>'; }).join("")+
          '</div></fieldset>'+
        '</div>';
      return '<article class="purpose'+(p.on?" is-on":"")+'" data-id="'+p.id+'" style="--glow:'+(p.level+1)/3+'">'+
        '<div class="purpose-main"><div class="bulb" aria-hidden="true"></div>'+
        '<div><h3>'+p.title+'</h3><p>'+p.desc+'</p>'+meta+'</div>'+
        '<label class="switch"><input type="checkbox" data-toggle="'+p.id+'" aria-label="'+p.title+'"'+(p.on?" checked":"")+(p.locked?" disabled":"")+'><span></span></label>'+
        '</div>'+more+'</article>';
    }).join("");
  }
  function renderReceipts(){
    if(!$("#receipts")) return;
    $("#receipts").innerHTML = state.receipts.map(function(r){
      return "<tr><td>"+r.d+"</td><td>"+r.t+"</td><td>"+r.c+"</td><td>"+r.s+"</td></tr>";
    }).join("");
  }
  function renderOverview(){
    if(!$("#ov-summary")) return;
    var on = state.purposes.filter(function(p){ return p.on && !p.locked; }).length;
    var unset = state.purposes.filter(function(p){ return !p.status; }).length;
    $("#ov-summary").textContent = on+" of 6 marketing topics on. "+(unset ? unset+" still not set." : "All topics reviewed.");
    var pill = $("#ov-consent");
    pill.textContent = state.signedUp ? "Granted" : "To review";
    pill.classList.toggle("ok",state.signedUp);
    $("#ov-consent-text").textContent = state.signedUp ? "You subscribed to product news on "+today()+"." : "You haven't answered yet.";
  }
  function markDirty(){
    if(!$("#save-state")) return;
    var dirty = JSON.stringify(state.purposes) !== saved;
    $("#save-state").textContent = dirty ? "You have unsaved changes" : "No unsaved changes";
    $("#save-prefs").disabled = !dirty;
  }
  function getP(id){ return state.purposes.filter(function(p){ return p.id===id; })[0]; }

  if($("#purposes")) $("#purposes").addEventListener("change",function(e){
    var t = e.target, card = t.closest(".purpose"), p = getP(card.dataset.id);
    if(t.dataset.toggle){ p.on = t.checked; card.classList.toggle("is-on",p.on); }
    else if(t.type==="radio"){ p.level = +t.value; card.style.setProperty("--glow",(p.level+1)/3); }
    else if(t.dataset.ch){
      var i = p.channels.indexOf(t.dataset.ch);
      if(t.checked && i<0) p.channels.push(t.dataset.ch);
      if(!t.checked && i>-1) p.channels.splice(i,1);
    }
    markDirty();
  });

  function commit(source){
    var before = JSON.parse(saved), date = today(), count = 0;
    state.purposes.forEach(function(p,i){
      var b = before[i], change = null, stat = null;
      if(p.locked) return;
      if(p.on && !b.on) change = "Opted in";
      else if(!p.on && b.on) change = "Opted out";
      else if(p.on && p.level<b.level) change = "Reduced to "+LEVELS[p.level].toLowerCase();
      else if(p.on && p.level>b.level) change = "Increased to "+LEVELS[p.level].toLowerCase();
      else if(p.on && p.channels.slice().sort().join()!==b.channels.slice().sort().join()) change = "Channels changed";
      if(change){
        stat = change+" "+date+" · "+source;
        p.status = stat;
        state.receipts.unshift({d:date,t:p.title,c:change,s:source});
        count++;
      }
    });
    saved = JSON.stringify(state.purposes);
    renderPurposes(); renderReceipts(); renderOverview(); markDirty();
    persist();
    return count;
  }

  if($("#save-prefs")) $("#save-prefs").addEventListener("click",function(){
    var n = commit(PC);
    console.log("[Demo] Preferences saved",JSON.parse(saved));
    toast(n===1 ? "Preferences saved. 1 change recorded." : "Preferences saved. "+n+" changes recorded.");
  });
  if($("#optout-all")) $("#optout-all").addEventListener("click",function(){
    state.purposes.forEach(function(p){ if(!p.locked) p.on = false; });
    commit(PC);
    toast("All marketing turned off. Service messages still reach you.");
  });

  /* ---------- Modals ---------- */
  var lastFocus = null;
  function openModal(id){
    var m = $(id);
    if(m.classList.contains("open")) return;
    closeModals();
    lastFocus = document.activeElement;
    m.classList.add("open"); m.inert = false;
    $("#scrim").classList.add("on");
    var f = $("button:not(.close), input, select",m); if(f) f.focus({preventScroll:true});
  }
  function closeModals(){
    $$(".modal.open").forEach(function(m){ m.classList.remove("open"); m.inert = true; });
    $("#scrim").classList.remove("on");
    if(lastFocus && lastFocus.focus) lastFocus.focus({preventScroll:true});
    lastFocus = null;
  }
  $("#signup-close").addEventListener("click",closeModals);
  document.addEventListener("keydown",function(e){
    if(e.key==="Escape" && $("#signup").classList.contains("open")) closeModals();
  });

  /* ---------- Demo cookie banner ---------- */
  var COOKIE_KEY = "C0002,C0003,C0004";
  // Checks for the CMP itself. The web form SDK can also define window.OneTrust, so that alone proves nothing.
  var realCmpPresent = function(){
    return !!($("#onetrust-banner-sdk") || $("#onetrust-consent-sdk") || (window.OneTrust && typeof window.OneTrust.ToggleInfoDisplay === "function"));
  };
  var cmpScriptPasted = !!$('script[data-domain-script]');
  var firedTags = [];

  function activateTags(groups){
    $$("script[data-demo-tag]").forEach(function(tag,i){
      var m = tag.className.match(/C\d{4}/);
      if(m && groups.indexOf(m[0])>-1 && firedTags.indexOf(i)<0){
        firedTags.push(i);
        var s = document.createElement("script"); s.textContent = tag.textContent; document.body.appendChild(s);
      }
    });
  }
  function finishCookies(groups,label){
    cookieGroups = groups; persist();
    closeModals();
    console.log("[Demo] Cookie choice:",label,groups);
    activateTags(groups);
    toast(label);
    if(!state.signedUp && !popupShown) setTimeout(showPopupOnce,1200);
  }
  function showCookie(manage){
    if(realCmpPresent()) return;
    $("#cookie-manage").classList.toggle("on",!!manage);
    $("#ck-manage").textContent = manage ? "Save choices" : "Manage cookies";
    openModal("#cookie");
  }
  $("#ck-accept").addEventListener("click",function(){ finishCookies(COOKIE_KEY.split(","),"All cookies accepted"); });
  $("#ck-reject").addEventListener("click",function(){ finishCookies([],"Optional cookies rejected"); });
  $("#ck-manage").addEventListener("click",function(){
    if(!$("#cookie-manage").classList.contains("on")){
      $("#cookie-manage").classList.add("on"); this.textContent = "Save choices"; return;
    }
    var g = COOKIE_KEY.split(",").filter(function(c){ return $("#cat-"+c).checked; });
    finishCookies(g,"Cookie choices saved");
  });
  $("#ot-sdk-btn").addEventListener("click",function(e){
    e.preventDefault();
    if(!realCmpPresent()) showCookie(true); // with the real CMP, OneTrust binds this link itself
  });
  new MutationObserver(function(_,obs){
    if($("#onetrust-banner-sdk") || $("#onetrust-consent-sdk")){
      if($("#cookie").classList.contains("open")) closeModals();
      obs.disconnect();
    }
  }).observe(document.documentElement,{childList:true,subtree:true});

  /* ---------- Newsletter pop-up and web form ---------- */
  var popupShown = !!(stored && stored.popupShown);
  function showPopupOnce(){ if(!popupShown && !$(".modal.open")) showPopup(); }
  function showPopup(){
    popupShown = true; persist();
    openModal("#signup");
    installOnce();
  }

  function onSignup(payload,source){
    var p = getP("news");
    p.on = true; p.channels = ["Email"];
    state.signedUp = true;
    commit(source);
    closeModals();
    console.log("[Demo] Web form submitted",payload);
    toast("You're subscribed to product news.");
  }
  $("#fallback-form").addEventListener("submit",function(e){
    e.preventDefault();
    var d = {}; new FormData(this).forEach(function(v,k){ d[k]=v; });
    d.collectionPoint = "demo-fallback";
    onSignup(d,POPUP);
  });

  var webFormLive = false, cpInstalled = false;
  var collectionPointId = function(){ return String(CFG.WEB_FORM_ID).replace(/^ot-/,""); };
  function formReady(){
    if(!webFormLive && $("#ot-container").children.length){
      webFormLive = true;
      $("#fallback-form").style.display = "none";
    }
  }
  function installOnce(){
    if(!formEnabled || !SW.USE_INSTALL_CP || cpInstalled) return;
    var tries = 0;
    (function attempt(){
      if(cpInstalled) return;
      var api = window.OneTrust && window.OneTrust.webform;
      if(api && typeof api.InstallCP === "function"){
        cpInstalled = true; // set first, so it can never run twice
        api.InstallCP(collectionPointId(),function(){ formReady(); });
      } else if(++tries < 40){ setTimeout(attempt,250); }
      else { console.warn("[Demo] OneTrust web form SDK not ready. Check: collection point published, domain authorised, integration mode, hard refresh."); }
    })();
  }
  var formEnabled = SW.USE_WEB_FORM && isSet(CFG.FORM_STUB_URL) && isSet(CFG.FORM_DATA_ID) && isSet(CFG.WEB_FORM_ID);
  if(SW.USE_WEB_FORM && !formEnabled) console.warn("[Demo] USE_WEB_FORM is on but OT_CONFIG still has placeholders. Showing the fallback form.");
  if(formEnabled){
    $("#strip-data").textContent = "Use test data only.";
    window.OtSdk = window.OtSdk || function(){ (window.OtSdk.q = window.OtSdk.q || []).push(arguments); };
    var stub = document.createElement("script");
    stub.src = CFG.FORM_STUB_URL;
    stub.setAttribute("data-id",CFG.FORM_DATA_ID);
    stub.setAttribute("worker",CFG.WORKER);
    document.head.appendChild(stub);
    new MutationObserver(formReady).observe($("#ot-container"),{childList:true,subtree:true});
  }
  window.addEventListener("OnetrustFormLoaded",formReady);
  window.addEventListener("OneTrustWebFormSubmitted",function(e){ onSignup(e.detail,POPUP); });

  /* ---------- Page-level clicks ---------- */
  document.addEventListener("click",function(e){
    var a = e.target.closest("[data-dead]");
    if(a){ e.preventDefault(); toast("This link isn't part of the demo."); return; }
    var b = e.target.closest("[data-act]");
    if(!b) return;
    if(b.dataset.act==="replay-popup") showPopup();
    if(b.dataset.act==="replay-cookie") showCookie(false);
    if(b.dataset.act==="reset"){
      state = seed(); saved = JSON.stringify(state.purposes); popupShown = false; cookieGroups = null; firedTags = [];
      try { sessionStorage.removeItem(STORE); } catch(err){}
      closeModals(); $("#fallback-form").reset();
      renderPurposes(); renderReceipts(); renderOverview(); markDirty();
      showCookie(false);
      toast("Demo reset.");
    }
  });

  /* ---------- Start ---------- */
  renderPurposes(); renderReceipts(); renderOverview(); markDirty(); route();
  if(cmpScriptPasted){ setTimeout(showPopupOnce,2500); }
  else if(cookieGroups){ activateTags(cookieGroups); if(!state.signedUp && !popupShown) setTimeout(showPopupOnce,1200); }
  else { setTimeout(function(){ showCookie(false); },500); }
})();
