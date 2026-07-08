/* Morapay checkout widget — https://docs.morapay.io/products/widget */
"use strict";(()=>{var uo=t=>{throw TypeError(t)};var ir=(t,e,o)=>e.has(t)||uo("Cannot "+o);var r=(t,e,o)=>(ir(t,e,"read from private field"),o?o.call(t):e.get(t)),y=(t,e,o)=>e.has(t)?uo("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,o),i=(t,e,o,a)=>(ir(t,e,"write to private field"),a?a.call(t,o):e.set(t,o),o),s=(t,e,o)=>(ir(t,e,"access private method"),o);var ar=(t,e,o,a)=>({set _(l){i(t,e,l,o)},get _(){return r(t,e,a)}});function po(t){return t.replace(/\/+$/,"")}function Mt(t,e){try{let o=new URL(po(e)).origin;return t===o}catch{return t.startsWith("https://checkout.morapay.io")}}function Pt(t){if(!t||typeof t!="object")return null;let e=t;return e.type==="MORAPAY_CHECKOUT_SUCCESS"||e.type==="MORAPAY_CHECKOUT_FAILURE"||e.type==="MORAPAY_CHECKOUT_CLOSE"||e.type==="MORAPAY_CANVAS_READY"||e.type==="MORAPAY_REQUEST_WALLET"?{type:e.type,payload:e.payload}:null}function sr(t,e,o){let a=new URL(po(e)).origin;t.contentWindow?.postMessage(o,a)}var lr=`
:host {
  --mp-bg: #0f1117;
  --mp-surface: #181b24;
  --mp-border: rgba(255, 255, 255, 0.08);
  --mp-text: #f4f4f5;
  --mp-muted: #a1a1aa;
  --mp-accent: #34d399;
  --mp-accent-fg: #052e1f;
  --mp-danger: #fb7185;
  --mp-radius: 16px;
  --mp-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  color: var(--mp-text);
}

*, *::before, *::after { box-sizing: border-box; }

.backdrop {
  position: fixed;
  inset: 0;
  z-index: 2147483000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(6, 8, 12, 0.62);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  animation: mp-fade-in 180ms ease-out;
}

.dialog {
  width: min(100%, 440px);
  max-height: min(92vh, 720px);
  display: flex;
  flex-direction: column;
  background: var(--mp-surface);
  border: 1px solid var(--mp-border);
  border-radius: var(--mp-radius);
  box-shadow: var(--mp-shadow);
  overflow: hidden;
  animation: mp-slide-up 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

.header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 18px 12px;
  border-bottom: 1px solid var(--mp-border);
}

.eyebrow {
  margin: 0 0 4px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--mp-muted);
}

.title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.3;
}

.close {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.06);
  color: var(--mp-text);
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  transition: background 150ms ease;
}

.close:hover { background: rgba(255, 255, 255, 0.12); }
.close:focus-visible { outline: 2px solid var(--mp-accent); outline-offset: 2px; }

.body {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 16px 18px 18px;
}

.lead {
  margin: 0 0 14px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--mp-muted);
}

.wallet-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0 0 12px;
  padding: 0;
  list-style: none;
}

.wallet-btn,
.primary-btn,
.ghost-btn {
  width: 100%;
  min-height: 44px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 120ms ease, background 150ms ease, opacity 150ms ease;
}

.wallet-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 12px 14px;
  border: 1px solid var(--mp-border);
  background: rgba(255, 255, 255, 0.03);
  color: var(--mp-text);
}

.wallet-btn:hover { background: rgba(255, 255, 255, 0.07); }
.wallet-btn:disabled { opacity: 0.55; cursor: not-allowed; }

.primary-btn {
  border: 0;
  background: var(--mp-accent);
  color: var(--mp-accent-fg);
}

.primary-btn:hover { filter: brightness(1.05); }
.primary-btn:disabled { opacity: 0.55; cursor: not-allowed; }

.ghost-btn {
  margin-top: 8px;
  border: 1px solid var(--mp-border);
  background: transparent;
  color: var(--mp-muted);
}

.ghost-btn:hover { color: var(--mp-text); background: rgba(255,255,255,0.04); }

.status {
  margin: 0 0 12px;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 13px;
  line-height: 1.4;
}

.status.error {
  background: rgba(251, 113, 133, 0.12);
  color: #fecdd3;
}

.status.success {
  background: rgba(52, 211, 153, 0.12);
  color: #a7f3d0;
}

.connected-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 12px;
  padding: 10px 12px;
  border: 1px solid var(--mp-border);
  border-radius: 12px;
  background: rgba(52, 211, 153, 0.08);
  font-size: 13px;
}

.mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; }

.canvas-wrap {
  min-height: 420px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--mp-border);
  background: #0b0d12;
}

.canvas-wrap iframe {
  display: block;
  width: 100%;
  min-height: 420px;
  border: 0;
  background: transparent;
}

.canvas-wrap-flush {
  border: 0;
  background: transparent;
  border-radius: 0;
}

.hidden { display: none !important; }

@keyframes mp-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes mp-slide-up {
  from { opacity: 0; transform: translateY(12px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.dialog-sheet-handle {
  display: none;
  flex-shrink: 0;
  width: 2.5rem;
  height: 0.25rem;
  margin: 0.625rem auto 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
}

.backdrop[data-mp-presentation="bottom-sheet"] {
  align-items: flex-end;
  justify-content: center;
  padding: 0;
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

.backdrop[data-mp-presentation="bottom-sheet"] .dialog {
  width: 100%;
  max-width: 100%;
  max-height: min(94vh, 100%);
  border-radius: 1.125rem 1.125rem 0 0;
}

.backdrop[data-mp-presentation="bottom-sheet"] .dialog-sheet-handle {
  display: block;
}

@media (max-width: 640px) {
  .backdrop[data-mp-presentation="auto"] {
    align-items: flex-end;
    justify-content: center;
    padding: 0;
    padding-bottom: env(safe-area-inset-bottom, 0px);
  }

  .backdrop[data-mp-presentation="auto"] .dialog {
    width: 100%;
    max-width: 100%;
    max-height: min(94vh, 100%);
    border-radius: 1.125rem 1.125rem 0 0;
  }

  .backdrop[data-mp-presentation="auto"] .dialog-sheet-handle {
    display: block;
  }

  .backdrop[data-mp-presentation="modal"] {
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .backdrop[data-mp-presentation="modal"] .dialog {
    width: min(100%, 440px);
    max-height: min(92vh, 720px);
    border-radius: var(--mp-radius);
  }
}

/* \u2500\u2500 Dialog enter motion (one-shot on open via JS) \u2500\u2500 */

.backdrop.shell-backdrop-prep {
  opacity: 0;
}

.backdrop.shell-backdrop-open {
  opacity: 1;
  transition: opacity 0.28s cubic-bezier(0.25, 1, 0.5, 1);
}

.dialog.shell-sheet-motion {
  transition:
    transform 0.38s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.28s cubic-bezier(0.25, 1, 0.5, 1);
}

.dialog.shell-sheet-prep {
  opacity: 0;
  transform: translateY(100%);
}

.dialog.shell-sheet-open {
  opacity: 1;
  transform: translateY(0);
}

.dialog.shell-modal-prep {
  opacity: 0;
  transform: scale(0.96) translateY(12px);
}

.dialog.shell-modal-open {
  opacity: 1;
  transform: scale(1) translateY(0);
  transition:
    transform 0.42s cubic-bezier(0.25, 1, 0.5, 1),
    opacity 0.28s cubic-bezier(0.25, 1, 0.5, 1);
}

@media (prefers-reduced-motion: reduce) {
  .backdrop.shell-backdrop-prep,
  .dialog.shell-sheet-prep,
  .dialog.shell-modal-prep {
    opacity: 1;
  }

  .dialog.shell-sheet-prep,
  .dialog.shell-sheet-open,
  .dialog.shell-modal-prep,
  .dialog.shell-modal-open {
    transform: none;
    transition: none;
  }
}
`;function rt(t,e){let o=t??e?.presentation;return o==="modal"||o==="bottom-sheet"||o==="auto"?o:"auto"}function St(t,e=typeof window<"u"?window.innerWidth:641){return t==="bottom-sheet"?!0:t==="auto"?e<=640:!1}var Ti=["velvet-obsidian","clay","dusk","frost","sand","ink"],_i="velvet-obsidian",Ai={none:"0px",sm:"8px",md:"12px",lg:"16px",xl:"24px"};function Li(t){return Ti.includes(t)}function mo(t){return Ai[t??"lg"]}function cr(t,e){if(!e)return;let o=e.theme??_i;Li(o)&&t.set("theme",o);let a=e.fontScale??"default";t.set("scale",a);let l=e.borderRadius??"lg";t.set("radius",l),e.accentColor?.trim()&&t.set("accent",e.accentColor.trim()),e.showMerchantLogo===!1&&t.set("logo","0"),e.colorMode==="dark"&&t.set("mode","dark")}function ho(t,e){e==="onramp"&&t.set("flow","onramp"),e==="offramp"&&t.set("flow","offramp")}function fo(t,e){t.set("embed","1"),t.set("hybrid","1"),e?.canvas!==!1&&t.set("canvas","1");let o=e?.wallet?.trim();o?.startsWith("0x")&&o.length>=42&&t.set("wallet",o)}function $e(t,e="https://checkout.morapay.io",o){let a=e.replace(/\/+$/,""),l=t.trim();if(!l)throw new Error("businessSlug is required.");let d=new URLSearchParams;return o?.hybrid||o?.canvas?fo(d,o):d.set("embed","1"),o?.amount!=null&&Number.isFinite(o.amount)&&o.amount>0&&d.set("amount",String(o.amount)),o?.currency?.trim()&&d.set("currency",o.currency.trim().toUpperCase()),o?.metadata&&Object.keys(o.metadata).length>0&&d.set("metadata",JSON.stringify(o.metadata)),ho(d,o?.flow),cr(d,o?.customization),`${a}/pay/${encodeURIComponent(l)}?${d.toString()}`}function He(t,e="https://checkout.morapay.io",o){let a=e.replace(/\/+$/,""),l=t.trim();if(!l)throw new Error("publicCode is required.");let d=new URLSearchParams;return o?.hybrid||o?.canvas?fo(d,o):d.set("embed","1"),ho(d,o?.flow),cr(d,o?.customization),`${a}/${encodeURIComponent(l)}?${d.toString()}`}function Ri(t,e){return t.isMetaMask?"MetaMask":t.isCoinbaseWallet?"Coinbase Wallet":e===0?"Browser wallet":`Wallet ${e+1}`}function Tt(){if(typeof window>"u")return[];let t=window.ethereum;if(!t)return[];let e=Array.isArray(t.providers)&&t.providers.length>0?t.providers:[t],o=new Set;return e.filter(a=>o.has(a)?!1:(o.add(a),typeof a.request=="function")).map((a,l)=>({id:`injected-${l}`,name:Ri(a,l),provider:a}))}async function _t(t){let e=await t.request({method:"eth_requestAccounts"}),o=Array.isArray(e)?e:[],a=typeof o[0]=="string"?o[0]:"";if(!a.startsWith("0x")||a.length<42)throw new Error("Wallet did not return a valid address.");return a}var Lt="morapay-checkout-modal";function Oi(t){return t.length<12?t:`${t.slice(0,6)}\u2026${t.slice(-4)}`}function Ii(t){switch(t){case"onramp":return"Onramp";case"offramp":return"Offramp";case"business":return"Business checkout";default:return"Payment"}}function $i(t){if(t==="onramp")return"onramp";if(t==="offramp")return"offramp"}function Hi(t){return t.skipWalletStep!==!1}function Ui(){var e,o,a,l,d,m,h,k,g,b,dr,go,ur,yo,ko,lt,bo,x,M,pr,mr,vo,wo,Ge,At;if(typeof customElements>"u"||typeof HTMLElement>"u"||customElements.get(Lt))return;class t extends HTMLElement{constructor(){super();y(this,b);y(this,e);y(this,o,null);y(this,a,"wallet");y(this,l,null);y(this,d,null);y(this,m,null);y(this,h,"");y(this,k,!1);y(this,g,!1);y(this,x,"");y(this,M,null);i(this,e,this.attachShadow({mode:"open"}))}connectedCallback(){s(this,b,At).call(this)}open(E){i(this,o,E),i(this,l,null),i(this,a,Hi(E)?"canvas":"wallet"),i(this,g,!0),s(this,b,dr).call(this,!0),s(this,b,go).call(this),s(this,b,Ge).call(this),r(this,a)==="canvas"&&queueMicrotask(()=>s(this,b,lt).call(this))}close(){s(this,b,yo).call(this),r(this,o)?.onClose?.(),i(this,o,null),s(this,b,At).call(this),s(this,b,dr).call(this,!1)}}e=new WeakMap,o=new WeakMap,a=new WeakMap,l=new WeakMap,d=new WeakMap,m=new WeakMap,h=new WeakMap,k=new WeakMap,g=new WeakMap,b=new WeakSet,dr=function(E){if(!(typeof document>"u")){if(E){i(this,h,document.body.style.overflow),document.body.style.overflow="hidden";return}document.body.style.overflow=r(this,h)}},go=function(){s(this,b,ur).call(this);let E=r(this,o)?.checkoutBaseUrl??"https://checkout.morapay.io";i(this,m,S=>{if(!Mt(S.origin,E))return;let T=Pt(S.data);if(T)switch(T.type){case"MORAPAY_CHECKOUT_SUCCESS":r(this,o)?.onSuccess?.(T.payload),this.close();break;case"MORAPAY_CHECKOUT_FAILURE":r(this,o)?.onFailure?.(T.payload),s(this,b,pr).call(this,String(T.payload?.message??"Payment failed."),"error");break;case"MORAPAY_CHECKOUT_CLOSE":this.close();break;case"MORAPAY_REQUEST_WALLET":r(this,l)&&r(this,d)&&sr(r(this,d),E,{type:"MORAPAY_SET_WALLET",payload:{address:r(this,l)}});break;default:break}}),window.addEventListener("message",r(this,m))},ur=function(){r(this,m)&&(window.removeEventListener("message",r(this,m)),i(this,m,null))},yo=function(){s(this,b,ur).call(this),i(this,d,null)},ko=function(){let E=r(this,o);if(!E)throw new Error("Modal is not open.");let S=E.checkoutBaseUrl??"https://checkout.morapay.io",T=$i(E.mode),te={hybrid:!0,canvas:!0,wallet:r(this,l)??void 0},ee=E.customization;if(E.mode==="business"){let $=E.businessSlug?.trim();if(!$)throw new Error("businessSlug is required.");return $e($,S,{amount:E.amount,currency:E.currency,metadata:E.metadata,customization:ee,flow:T,...te})}let N=E.publicCode?.trim();if(!N)throw new Error("publicCode is required.");return He(N,S,{customization:ee,flow:T,...te})},lt=function(){let E=r(this,e).querySelector("[data-mp-canvas-host]");if(!E||!r(this,o))return;E.replaceChildren();let S=document.createElement("iframe");S.src=s(this,b,ko).call(this),S.title=r(this,o).title??"Morapay secure checkout",S.allow="payment *; clipboard-write",S.setAttribute("loading","eager"),i(this,d,S),E.appendChild(S),r(this,l)&&S.addEventListener("load",()=>{!r(this,d)||!r(this,o)||sr(r(this,d),r(this,o).checkoutBaseUrl??"https://checkout.morapay.io",{type:"MORAPAY_SET_WALLET",payload:{address:r(this,l)}})})},bo=async function(E){if(!r(this,k)){i(this,k,!0),s(this,b,Ge).call(this);try{i(this,l,await _t(E.provider)),i(this,a,"canvas"),s(this,b,Ge).call(this),queueMicrotask(()=>s(this,b,lt).call(this))}catch(S){let T=S instanceof Error?S.message:"Could not connect wallet.";s(this,b,pr).call(this,T,"error"),s(this,b,Ge).call(this,r(this,x),"error")}finally{i(this,k,!1)}}},x=new WeakMap,M=new WeakMap,pr=function(E,S){i(this,x,E),i(this,M,S)},mr=function(){let E=r(this,o);if(!E)return!1;let S=rt(E.presentation,E.customization);return St(S)},vo=function(){return r(this,g)?s(this,b,mr).call(this)?{backdrop:"shell-backdrop-prep",dialog:"shell-sheet-prep shell-sheet-motion"}:{backdrop:"shell-backdrop-prep",dialog:"shell-modal-prep"}:{backdrop:"",dialog:""}},wo=function(){if(!r(this,g))return;let E=r(this,e).querySelector("[data-mp-backdrop]"),S=r(this,e).querySelector(".dialog");if(!E||!S){i(this,g,!1);return}let T=s(this,b,mr).call(this);E.classList.remove("shell-backdrop-open"),S.classList.remove("shell-sheet-open","shell-modal-open"),requestAnimationFrame(()=>{requestAnimationFrame(()=>{E.classList.add("shell-backdrop-open"),T?S.classList.add("shell-sheet-open"):S.classList.add("shell-modal-open"),i(this,g,!1)})})},Ge=function(E=r(this,x),S=r(this,M)){let T=r(this,o);if(!T){s(this,b,At).call(this);return}let te=Tt(),ee=T.title??Ii(T.mode),N=r(this,a)==="wallet",$=rt(T.presentation,T.customization),V=te.map(D=>`
          <li>
            <button type="button" class="wallet-btn" data-mp-wallet-id="${D.id}" ${r(this,k)?"disabled":""}>
              <span>${D.name}</span>
              <span aria-hidden="true">\u2192</span>
            </button>
          </li>`).join(""),oe=E&&S?`<p class="status ${S}" role="${S==="error"?"alert":"status"}">${E}</p>`:"",Q=s(this,b,vo).call(this);r(this,e).innerHTML=`
      <style>${lr}</style>
      <div class="backdrop ${Q.backdrop}" role="presentation" data-mp-backdrop data-mp-presentation="${$}">
        <div class="dialog ${Q.dialog}" role="dialog" aria-modal="true" aria-labelledby="mp-modal-title">
          <div class="dialog-sheet-handle" aria-hidden="true"></div>
          <header class="header">
            <div>
              <p class="eyebrow">Morapay \xB7 native modal</p>
              <h2 class="title" id="mp-modal-title">${ee}</h2>
            </div>
            <button type="button" class="close" data-mp-close aria-label="Close">\xD7</button>
          </header>
          <div class="body">
            <section class="${N?"":"hidden"}" data-mp-wallet-step>
              <p class="lead">
                Connect a wallet on your site. Morapay runs wallet discovery in your page DOM \u2014
                not inside a cross-origin iframe \u2014 so injected providers work like RainbowKit.
              </p>
              ${oe}
              ${r(this,l)?`<div class="connected-row"><span>Connected</span><span class="mono">${Oi(r(this,l))}</span></div>`:""}
              <ul class="wallet-list">
                ${V||'<li><p class="lead">No injected wallet detected. Continue with card or mobile money in the secure canvas.</p></li>'}
              </ul>
              <button type="button" class="primary-btn" data-mp-continue-hosted ${r(this,k)?"disabled":""}>
                Continue with card / MoMo
              </button>
            </section>
            <section class="${N?"hidden":""}" data-mp-canvas-step>
              ${!N&&oe?oe:""}
              <div class="canvas-wrap canvas-wrap-flush" data-mp-canvas-host></div>
              ${N?"":'<button type="button" class="ghost-btn" data-mp-back-wallet>Change wallet</button>'}
            </section>
          </div>
        </div>
      </div>
    `,s(this,b,wo).call(this),r(this,e).querySelector("[data-mp-close]")?.addEventListener("click",()=>this.close()),r(this,e).querySelector("[data-mp-backdrop]")?.addEventListener("click",D=>{D.target===D.currentTarget&&this.close()}),r(this,e).querySelector("[data-mp-continue-hosted]")?.addEventListener("click",()=>{i(this,a,"canvas"),s(this,b,Ge).call(this),queueMicrotask(()=>s(this,b,lt).call(this))}),r(this,e).querySelector("[data-mp-back-wallet]")?.addEventListener("click",()=>{i(this,a,"wallet"),i(this,d,null),s(this,b,Ge).call(this)});for(let D of Array.from(r(this,e).querySelectorAll("[data-mp-wallet-id]"))){let ke=D.getAttribute("data-mp-wallet-id"),le=te.find(pe=>pe.id===ke);le&&D.addEventListener("click",()=>{s(this,b,bo).call(this,le)})}!N&&!r(this,d)?queueMicrotask(()=>s(this,b,lt).call(this)):!N&&r(this,d)&&r(this,e).querySelector("[data-mp-canvas-host]")?.appendChild(r(this,d))},At=function(){r(this,e).innerHTML=`<style>${lr}</style>`},customElements.define(Lt,t)}function ge(){Ui()}function xo(){ge();let t=document.querySelector(Lt);if(t)return t;let e=document.createElement(Lt);return document.body.appendChild(e),e}var hr=null;function Ke(t){ge();let e=xo();return hr=e,e.open(t),e}function ct(){hr?.close(),hr=null}var Eo=new Set(["84532","11155111","421614","11155420","80002"]),fr=new Set(["1","8453","42161","10","137","56","43114","250","101","solana-mainnet-beta","728126428","sui-mainnet","stellar-mainnet","143","324","534352","59144","81457","25","8332","btc","bitcoin"]),Ni={1:["ETH"],8453:["ETH"],84532:["ETH"],11155111:["ETH"],421614:["ETH"],11155420:["ETH"],80002:["POL","MATIC"],42161:["ETH","ARB"],10:["ETH","OP"],137:["MATIC","POL"],56:["BNB"],43114:["AVAX"],250:["FTM"],101:["SOL"],"solana-mainnet-beta":["SOL"],728126428:["TRX"],"sui-mainnet":["SUI"],"stellar-mainnet":["XLM"],143:["MON"],324:["ETH"],534352:["ETH"],59144:["ETH"],81457:["ETH"],25:["CRO"],8332:["BTC"],btc:["BTC"],bitcoin:["BTC"]},Fi={1:["ETH","USDT","USDC","WBTC","LINK","UNI","AAVE","LDO","MANA","SAND","APE","SHIB","PEPE","WXRP","TURBO","MOG"],8453:["ETH","USDC","AERO","DEGEN","BRETT","TOSHI","NORMIE"],84532:["ETH","USDC"],11155111:["ETH","USDC"],421614:["ETH","USDC"],11155420:["ETH","USDC"],80002:["POL","MATIC","USDC"],42161:["ARB","GMX","MAGIC","ETH","USDC"],10:["OP","VELO","USDC"],137:["POL","MATIC","QUICK","USDC"],56:["BNB","CAKE","FLOKI","BABYDOGE","USDC","USDT"],43114:["AVAX","JOE","GMX","USDC"],250:["FTM","SPOOKY","USDC"],101:["SOL","JUP","RAY","JITO","PYTH","BONK","WIF","POPCAT","MOODENG","PNUT","PENGU","FARTCOIN","MEW","TRUMP","USDC","USDT"],"solana-mainnet-beta":["SOL","JUP","RAY","JITO","PYTH","BONK","WIF","POPCAT","MOODENG","PNUT","PENGU","FARTCOIN","MEW","TRUMP","USDC","USDT"],728126428:["TRX","USDT","SUN","BTT"],"sui-mainnet":["SUI","USDC"],"stellar-mainnet":["XLM","USDC"],143:["MON","USDC"],324:["ZK","ETH","USDC"],534352:["SCR","ETH","USDC"],59144:["LINEA","ETH","USDC"],81457:["BLAST","ETH","USDC"],25:["CRO","USDC"],8332:["BTC","BTC-TAPROOT","BTC-LEGACY","BTC-P2SH","BTC-ORDINALS"],btc:["BTC","BTC-TAPROOT","BTC-LEGACY","BTC-P2SH","BTC-ORDINALS"],bitcoin:["BTC","BTC-TAPROOT","BTC-LEGACY","BTC-P2SH","BTC-ORDINALS"]};function Rt(t){return t.trim().toUpperCase()}function Bi(t){let e=Rt(t);return!!(e==="USDC"||e==="USDT"||e==="USDBC"||e==="USDCE"||/^USDC[._-]/.test(e)||/^USDT([._-]|0)/.test(e))}function Di(t,e){let o=Ni[t];if(!o?.length)return!1;let a=Rt(e);return o.some(l=>l===a)}function qi(t){let e=t.chainId.trim();if(!fr.has(e))return!1;let o=Rt(t.symbol);return o?Bi(o)||Di(e,o)?!0:Fi[e]?.includes(o)??!1:!1}var Wi=new Set(["101","solana-mainnet-beta"]);function zi(t){return Wi.has(t)?"solana":t}function Co(t){return/^\d+$/.test(t)?0:1}function Mo(t,e){return e==="TEST"?t.filter(o=>Eo.has(o.chainId.trim())):t.filter(o=>fr.has(o.chainId.trim()))}function Po(t,e){let o=t.filter(l=>{let d=l.chainId.trim();if(e==="TEST"){if(!Eo.has(d))return!1}else if(!fr.has(d))return!1;return qi(l)}).sort((l,d)=>Co(l.chainId)-Co(d.chainId)),a=new Map;for(let l of o){let d=`${zi(l.chainId)}:${Rt(l.symbol)}`;a.has(d)||a.set(d,l)}return[...a.values()]}var So=`
*, *::before, *::after { box-sizing: border-box; }

:host {
  font-family: "PlusJakartaSans-Variable", "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;
  font-feature-settings: "kern" 1, "liga" 1;
  -webkit-font-smoothing: antialiased;
  color: var(--card-foreground);
}

.backdrop {
  position: fixed;
  inset: 0;
  z-index: 2147483000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.5rem 1.5rem;
  background: color-mix(in oklch, var(--background) 82%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: var(--foreground);
}

.backdrop::before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--background);
  opacity: 0.88;
  z-index: -1;
}

.shell {
  width: min(100%, 36rem);
  position: relative;
}

.checkout-dismiss {
  position: absolute;
  top: -2.75rem;
  right: 0;
  z-index: 1;
  width: 2.25rem;
  height: 2.25rem;
  border: 0;
  border-radius: 0.75rem;
  background: oklch(1 0 0 / 12%);
  color: var(--foreground);
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
}

.checkout-header-dismiss {
  display: none;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  border: 0;
  border-radius: 0.75rem;
  background: color-mix(in oklch, var(--muted-foreground) 12%, transparent);
  color: var(--card-foreground);
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
}

.checkout-header-dismiss:hover {
  background: color-mix(in oklch, var(--muted-foreground) 18%, transparent);
}

.checkout-article.pay-checkout.glass-card {
  position: relative;
  width: 100%;
  max-width: 36rem;
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid oklch(0.92 0.004 286.32);
  background: var(--glass-card);
  color: var(--card-foreground);
  box-shadow: none;
}

.checkout-article-body {
  padding: 1rem 1rem 1.5rem;
}

.checkout-header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
}

.checkout-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: -0.5rem;
  padding: 0 0.5rem;
  min-height: 2.25rem;
  border: 0;
  border-radius: 0.375rem;
  background: transparent;
  color: var(--card-foreground);
  font: inherit;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.checkout-back-btn svg {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.checkout-header-leading {
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: center;
}

.checkout-merchant-logo {
  height: 2.75rem;
  width: auto;
  max-width: 9.5rem;
  flex-shrink: 0;
  object-fit: contain;
  object-position: left center;
}

.checkout-merchant-name {
  margin: 0;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.25;
  color: var(--card-foreground);
}

.checkout-header-actions {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 0.5rem;
}

.checkout-merchant-header {
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: center;
  gap: 0.5rem;
}

.rail-crypto-stack {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.rail-crypto-token {
  position: relative;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--glass-card);
}

.rail-crypto-token img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 999px;
}

.rail-crypto-overlap {
  margin-left: -10px;
}

.quote-token-wrap {
  position: relative;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.quote-token-circle {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 999px;
  background: color-mix(in oklch, var(--muted-foreground) 12%, var(--card));
  box-shadow: 0 0 0 1px color-mix(in oklch, var(--border) 50%, transparent);
}

.quote-token-img {
  width: 100%;
  height: 100%;
  border-radius: 999px;
  object-fit: cover;
}

.quote-chain-badge {
  position: absolute;
  right: -2px;
  bottom: -2px;
  z-index: 1;
  display: flex;
  overflow: hidden;
  border-radius: 999px;
  background: color-mix(in oklch, var(--muted-foreground) 12%, var(--card));
  box-shadow: 0 0 0 1px color-mix(in oklch, var(--border) 50%, transparent);
}

.quote-chain-badge img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 999px;
}

.checkout-loading-skeleton,
.checkout-quote-skeleton {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.checkout-payment-loading {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skeleton {
  border-radius: 0.75rem;
  background: color-mix(in oklch, var(--muted-foreground) 16%, transparent);
  animation: mp-skeleton-pulse 1.4s ease-in-out infinite;
}

.skeleton-hero {
  margin: 0 auto;
  height: 9.5rem;
  width: 100%;
  max-width: 24rem;
  border-radius: 0.75rem;
}

.skeleton-quote {
  height: 4.25rem;
  width: 100%;
  border-radius: 0.5rem;
}

.skeleton-method-trigger {
  margin-top: 0.125rem;
  height: 3rem;
  width: 100%;
  border-radius: 0.75rem;
}

.skeleton-cta {
  margin-top: 0.125rem;
  height: 2.75rem;
  width: 100%;
  border-radius: 0.75rem;
}

.skeleton-logo {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.75rem;
  flex-shrink: 0;
}

.skeleton-merchant-name {
  height: 1.25rem;
  width: 8rem;
  border-radius: 0.375rem;
}

@keyframes mp-skeleton-pulse {
  0%, 100% { opacity: 0.55; }
  50% { opacity: 0.9; }
}

.field-hint-label {
  margin: 0;
  font-size: 0.75rem;
  color: var(--muted-foreground);
}

.momo-network-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  animation: mp-momo-network-in 0.22s ease-out;
}

@keyframes mp-momo-network-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.momo-network-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

@media (min-width: 400px) {
  .momo-network-grid {
    grid-template-columns: repeat(auto-fill, minmax(132px, 1fr));
  }
}

.momo-network-cell {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  padding: 0;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  font: inherit;
  color: inherit;
}

.momo-network-visual {
  position: relative;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 4px;
  background: var(--momo-cell-sand, #e6e4e2);
  transition: box-shadow 0.2s ease;
}

.momo-network-cell-selected .momo-network-visual {
  box-shadow: inset 0 0 0 2px #037971;
}

.momo-network-category {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 3;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(20, 18, 33, 0.55);
}

.momo-network-check {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 4;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #037971;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
}

.momo-network-logo-wrap {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(72%, 120px);
  height: min(42%, 52px);
}

.momo-network-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.momo-network-label {
  margin: 0;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.34;
  color: var(--card-foreground);
}

.momo-network-cell-selected .momo-network-label {
  color: #023436;
}

.momo-network-hint {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.45;
  color: var(--muted-foreground);
}

.checkout-wallet-connect {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.25rem;
  padding: 0.5rem 0.875rem;
  border: 0;
  border-radius: 0.75rem;
  background: var(--primary);
  color: var(--primary-foreground);
  font: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25;
  cursor: pointer;
  white-space: nowrap;
}

.checkout-wallet-connect:hover:not(:disabled) {
  background: color-mix(in oklch, var(--primary) 90%, black);
}

.checkout-wallet-connect:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.checkout-wallet-connected {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.25rem;
  max-width: 9.5rem;
  padding: 0.5rem 0.875rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: var(--card);
  color: var(--card-foreground);
  font: inherit;
  font-size: 0.75rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  line-height: 1.25;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 0 1px 2px oklch(0 0 0 / 4%);
}

.checkout-payment-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
}

.pay-checkout .pay-hero-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 1rem;
  text-align: center;
  transform: scale(1.1);
  transform-origin: center top;
}

.hero-label {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted-foreground);
}

.amount-display-row {
  display: flex;
  min-height: 4.5rem;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 0.125rem;
}

.amount-char {
  display: inline-block;
  font-family: "Playfair Display", "Alpino-Variable", Georgia, serif;
  font-optical-sizing: auto;
  font-feature-settings: "tnum" 1, "lnum" 1;
  font-size: clamp(2.75rem, 10vw, 3.25rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--card-foreground);
  font-variant-numeric: tabular-nums;
}

.amount-char:first-child {
  font-size: clamp(2.75rem, 10vw, 3.25rem);
}

.amount-char-symbol {
  font-size: clamp(2rem, 8vw, 2.35rem);
}

.amount-input-wrap {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
}

.amount-input {
  margin: 0;
  border: 0;
  background: transparent;
  width: min(100%, 12rem);
  text-align: center;
  outline: none;
  font-family: "Playfair Display", "Alpino-Variable", Georgia, serif;
  font-size: clamp(2.75rem, 10vw, 3.25rem);
  font-weight: 600;
  line-height: 1;
  color: var(--card-foreground);
}

.amount-currency {
  font-size: 1rem;
  font-weight: 600;
  color: var(--muted-foreground);
}

.pay-checkout .pay-options-panel {
  border-radius: 0.75rem;
  background: var(--pay-surface-panel);
  padding: 0 0.5rem 0.5rem;
}

.pay-options-label {
  margin: 0;
  padding: 1rem 0 0.5rem;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--muted-foreground);
}

.method-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Shared surface for payment method rows + More tokens (matches hosted fixed checkout). */
.pay-checkout .pay-method-surface {
  border: 1px solid color-mix(in oklch, var(--border) 60%, transparent);
  border-radius: 0.75rem;
  background: color-mix(in oklch, var(--card) 82%, transparent);
  transition: background-color 150ms ease, border-color 150ms ease;
}

.pay-checkout .pay-method-surface:hover:not(:disabled) {
  border-color: color-mix(in oklch, var(--primary) 50%, transparent);
  background: var(--card);
}

.pay-checkout .pay-method-surface:disabled {
  border-color: color-mix(in oklch, var(--border) 40%, transparent);
  background: color-mix(in oklch, var(--muted-foreground) 8%, var(--card));
  opacity: 0.55;
  cursor: not-allowed;
}

.pay-checkout .pay-fiat-rail-item {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  color: var(--card-foreground);
  text-align: left;
  cursor: pointer;
  font: inherit;
}

.rail-icon-frame {
  position: relative;
  display: flex;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  overflow: visible;
}

.rail-icon-frame img.rail-illustration {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.rail-icon-bank {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: #037971;
  border-radius: 0.75rem;
}

.method-copy { min-width: 0; flex: 1; }
.method-title {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25;
}
.method-desc {
  display: block;
  margin-top: 0.125rem;
  font-size: 0.75rem;
  line-height: 1.35;
  color: var(--muted-foreground);
}

.method-chevron {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  color: var(--muted-foreground);
}

.primary-btn {
  display: inline-flex;
  width: 100%;
  min-height: 2.75rem;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border: 0;
  border-radius: 0.75rem;
  background: var(--primary);
  color: var(--primary-foreground);
  font: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25;
  cursor: pointer;
  transition: background-color 150ms ease, opacity 150ms ease;
}

.primary-btn:hover:not(:disabled) {
  background: color-mix(in oklch, var(--primary) 90%, black);
}

.primary-btn:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.primary-btn:disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}

.back-link {
  border: 0;
  background: transparent;
  padding: 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--muted-foreground);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  align-self: flex-start;
}

.section-label {
  margin: 0;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--muted-foreground);
}

.field { display: flex; flex-direction: column; gap: 0.375rem; }
.field label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--card-foreground);
}
.field select,
.field input,
.field textarea {
  min-height: 2.5rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border);
  background: var(--card);
  padding: 0 0.75rem;
  font: inherit;
  color: var(--card-foreground);
}

.phone-row {
  display: flex;
  overflow: hidden;
  border-radius: 0.75rem;
  border: 1px solid var(--border);
  background: var(--card);
}
.phone-dial {
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
  border-right: 1px solid var(--border);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--muted-foreground);
}
.phone-row input {
  flex: 1;
  border: 0;
  border-radius: 0;
  background: transparent;
}

.placeholder-panel {
  border-radius: 0.75rem;
  border: 1px dashed color-mix(in oklch, var(--border) 90%, transparent);
  background: color-mix(in oklch, var(--pay-surface-panel) 70%, var(--card));
  padding: 1rem;
  font-size: 0.875rem;
  line-height: 1.45;
  color: var(--muted-foreground);
}

.quote-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.quote-row {
  display: block;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  background: transparent;
  padding: 0;
  text-align: left;
  font: inherit;
  color: inherit;
  cursor: pointer;
  transition: background-color 150ms ease, border-color 150ms ease;
}

.quote-row-inner {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
}

.quote-row.selected {
  border-color: var(--primary);
  background: color-mix(in oklch, var(--primary) 15%, transparent);
}

.quote-left {
  display: flex;
  min-width: 0;
  flex: 1;
  gap: 0.625rem;
}

.quote-symbol {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--card-foreground);
}

.quote-row:hover:not(:disabled) {
  background: color-mix(in oklch, var(--primary) 8%, transparent);
}

.quote-row:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.quote-copy {
  min-width: 0;
  flex: 1;
}

.checkout-input,
.checkout-select {
  min-height: 2.75rem;
  width: 100%;
  border-radius: 0.75rem;
  border: 1px solid color-mix(in oklch, var(--border) 60%, transparent);
  background: color-mix(in oklch, var(--card) 90%, transparent);
  padding: 0 0.75rem;
  font: inherit;
  font-size: 0.875rem;
  color: var(--card-foreground);
  box-shadow: 0 1px 2px oklch(0 0 0 / 4%);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.checkout-input:hover:not(:disabled),
.checkout-select:hover:not(:disabled) {
  border-color: color-mix(in oklch, var(--border) 85%, transparent);
}

.checkout-input:focus,
.checkout-select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--primary) 15%, transparent);
}

.checkout-input:disabled,
.checkout-select:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.checkout-select {
  appearance: none;
  padding-right: 2.25rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  cursor: pointer;
}

.checkout-input::placeholder {
  color: var(--muted-foreground);
}

.fiat-form-panel {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.quote-balance-label {
  margin: 0;
  font-size: 0.65rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--muted-foreground);
}
.quote-balance {
  margin: 0.125rem 0 0;
  font-size: 0.75rem;
  font-variant-numeric: tabular-nums;
  color: var(--card-foreground);
}

.quote-skeleton {
  border-radius: 0.25rem;
  background: color-mix(in oklch, var(--muted-foreground) 22%, transparent);
  animation: checkout-quote-pulse 1.4s ease-in-out infinite;
}

.quote-amount-skeleton {
  margin-left: auto;
  height: 1.5rem;
  width: 6rem;
}

@keyframes checkout-quote-pulse {
  0%,
  100% {
    opacity: 0.45;
  }

  50% {
    opacity: 0.9;
  }
}

.quote-right {
  min-width: 0;
  max-width: 42%;
  flex-shrink: 0;
  text-align: right;
}

.quote-amount {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--card-foreground);
}
.quote-amount-symbol {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--muted-foreground);
}
.quote-invoice {
  margin: 0.25rem 0 0;
  font-size: 0.75rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: var(--muted-foreground);
}

.wallet-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border);
  background: color-mix(in oklch, var(--pay-surface-panel) 50%, var(--card));
}
.wallet-addr { font-family: ui-monospace, monospace; font-size: 0.8125rem; font-weight: 600; flex: 1; text-align: center; }
.wallet-change {
  border: 0;
  background: transparent;
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}

.inline-error { margin: 0; font-size: 0.75rem; color: #b91c1c; text-align: center; }
.inline-hint { margin: 0; font-size: 0.75rem; color: var(--muted-foreground); text-align: center; }

.link-load-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  margin: 0 0 0.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: 0.625rem;
  background: color-mix(in oklch, var(--primary) 8%, var(--card));
  border: 1px solid color-mix(in oklch, var(--primary) 18%, transparent);
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--card-foreground);
}

.link-load-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid color-mix(in oklch, var(--primary) 25%, transparent);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: mp-preview-spin 0.7s linear infinite;
}

.header-skeleton {
  min-height: 2.75rem;
  border-radius: 0.75rem;
  background: color-mix(in oklch, var(--muted-foreground) 14%, transparent);
  color: transparent;
}

.body-loading { opacity: 0.72; pointer-events: none; }
.step { display: flex; flex-direction: column; gap: 1rem; }
.hidden { display: none !important; }

@keyframes mp-preview-spin { to { transform: rotate(360deg); } }

.otp-resend {
  margin: 0;
  text-align: center;
  font-size: 0.8125rem;
  color: var(--muted-foreground);
}

.checkout-action-cta {
  margin-top: 0;
}

.fiat-bank-panel,
.fiat-awaiting-panel {
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: color-mix(in oklch, var(--card) 92%, transparent);
  padding: 1rem;
  text-align: left;
}

.fiat-panel-title {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--card-foreground);
}

.fiat-panel-subtitle {
  margin: 0.35rem 0 0;
  font-size: 0.8125rem;
  color: var(--muted-foreground);
}

.fiat-panel-hint {
  margin: 0.75rem 0 0;
  font-size: 0.75rem;
  color: var(--muted-foreground);
}

.fiat-bank-details {
  margin: 1rem 0 0;
  display: grid;
  gap: 0.65rem;
}

.fiat-bank-details dt {
  margin: 0;
  font-size: 0.6875rem;
  color: var(--muted-foreground);
}

.fiat-bank-details dd {
  margin: 0.15rem 0 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--card-foreground);
}

.fiat-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  letter-spacing: 0.02em;
}

.fiat-instructions {
  margin: 0.75rem 0 0;
  padding-left: 1.1rem;
  font-size: 0.75rem;
  color: var(--muted-foreground);
}

.fiat-instructions li + li {
  margin-top: 0.25rem;
}

.fiat-awaiting-title {
  margin: 0;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--card-foreground);
}

.fiat-awaiting-spinner {
  display: block;
  width: 2.5rem;
  height: 2.5rem;
  margin: 1rem auto 0;
  border-radius: 50%;
  border: 2px solid color-mix(in oklch, var(--card-foreground) 12%, transparent);
  border-top-color: var(--card-foreground);
  animation: mp-preview-spin 0.8s linear infinite;
}

.fiat-awaiting-help {
  margin-top: 1rem;
  text-align: left;
}

.fiat-already-paid-wrap {
  margin-top: 1rem;
  text-align: center;
}

.fiat-already-paid-message {
  margin: 0.5rem 0 0;
  font-size: 0.75rem;
  line-height: 1.45;
  color: var(--muted-foreground);
}

.momo-instructions {
  border-radius: 0.75rem;
  border: 1px solid var(--border);
  background: color-mix(in oklch, var(--muted) 40%, var(--card));
  padding: 0.875rem 1rem;
}

.momo-instructions-title {
  margin: 0;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--card-foreground);
}

.momo-instructions-list {
  margin: 0.5rem 0 0;
  padding-left: 1.125rem;
  font-size: 0.75rem;
  line-height: 1.55;
  color: var(--muted-foreground);
}

.momo-instructions-list li + li {
  margin-top: 0.5rem;
}

.momo-instructions-emphasis {
  font-weight: 600;
  color: var(--card-foreground);
}

.text-link {
  border: 0;
  background: none;
  padding: 0;
  font: inherit;
  font-weight: 600;
  color: var(--primary);
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* Dark mode \u2014 mirrors globals.css .dark .pay-checkout */
.checkout-article[data-color-mode="dark"].pay-checkout.glass-card {
  background: oklch(0.24 0.025 199);
  border-color: oklch(1 0 0 / 12%);
}

.checkout-article[data-color-mode="dark"].pay-checkout .pay-options-panel {
  background-color: var(--pay-surface-panel);
}

.checkout-article[data-color-mode="dark"].pay-checkout .pay-method-surface {
  border-color: oklch(1 0 0 / 12%);
  background: color-mix(in oklch, var(--pay-surface-button) 100%, transparent);
}

.checkout-article[data-color-mode="dark"].pay-checkout .pay-method-surface:hover:not(:disabled) {
  border-color: oklch(1 0 0 / 18%);
  background: var(--pay-surface-button-hover);
}

.checkout-article[data-color-mode="dark"].pay-checkout .pay-method-surface:disabled {
  border-color: oklch(1 0 0 / 8%);
  background: var(--pay-surface-panel);
  opacity: 0.5;
}

/* \u2500\u2500 Widget shell presentation (auto | bottom-sheet | modal) \u2500\u2500 */

.shell-sheet-handle {
  display: none;
  flex-shrink: 0;
  width: 2.5rem;
  height: 0.25rem;
  margin: 0.625rem auto 0;
  border-radius: 999px;
  background: color-mix(in oklch, var(--foreground) 18%, transparent);
}

.backdrop[data-mp-presentation="bottom-sheet"] {
  align-items: flex-end;
  justify-content: center;
  padding: 0;
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

.backdrop[data-mp-presentation="bottom-sheet"] .shell {
  width: 100%;
  max-width: 100%;
  max-height: min(94vh, 100%);
  display: flex;
  flex-direction: column;
}

.backdrop[data-mp-presentation="bottom-sheet"] .shell-sheet-handle {
  display: block;
}

.backdrop[data-mp-presentation="bottom-sheet"] .checkout-dismiss-floating {
  display: none;
}

.backdrop[data-mp-presentation="bottom-sheet"] .checkout-header-dismiss {
  display: inline-flex;
}

.backdrop[data-mp-presentation="bottom-sheet"] .checkout-article.pay-checkout.glass-card {
  max-width: 100%;
  border-radius: 1rem 1rem 0 0;
  border-bottom: 0;
  max-height: min(92vh, calc(100dvh - 1.5rem));
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.backdrop[data-mp-presentation="bottom-sheet"] .checkout-article-body {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

@media (max-width: 640px) {
  .backdrop[data-mp-presentation="auto"] {
    align-items: flex-end;
    justify-content: center;
    padding: 0;
    padding-bottom: env(safe-area-inset-bottom, 0px);
  }

  .backdrop[data-mp-presentation="auto"] .shell {
    width: 100%;
    max-width: 100%;
    max-height: min(94vh, 100%);
    display: flex;
    flex-direction: column;
  }

  .backdrop[data-mp-presentation="auto"] .shell-sheet-handle {
    display: block;
  }

  .backdrop[data-mp-presentation="auto"] .checkout-dismiss-floating {
    display: none;
  }

  .backdrop[data-mp-presentation="auto"] .checkout-header-dismiss {
    display: inline-flex;
  }

  .backdrop[data-mp-presentation="auto"] .checkout-article.pay-checkout.glass-card {
    max-width: 100%;
    border-radius: 1rem 1rem 0 0;
    border-bottom: 0;
    max-height: min(92vh, calc(100dvh - 1.5rem));
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .backdrop[data-mp-presentation="auto"] .checkout-article-body {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .backdrop[data-mp-presentation="modal"] {
    align-items: center;
    justify-content: center;
    padding: 0.5rem 0.5rem 1.5rem;
  }

  .backdrop[data-mp-presentation="modal"] .shell {
    width: min(100%, 36rem);
  }
}

/* \u2500\u2500 Shell enter motion (one-shot on open via JS; not on step re-renders) \u2500\u2500 */

.backdrop.shell-backdrop-prep {
  opacity: 0;
}

.backdrop.shell-backdrop-open {
  opacity: 1;
  transition: opacity 0.28s cubic-bezier(0.25, 1, 0.5, 1);
}

.shell.shell-sheet-motion {
  transition:
    transform 0.38s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.28s cubic-bezier(0.25, 1, 0.5, 1);
}

.shell.shell-sheet-prep {
  opacity: 0;
  transform: translateY(100%);
}

.shell.shell-sheet-open {
  opacity: 1;
  transform: translateY(0);
}

.shell.shell-modal-prep {
  opacity: 0;
  transform: scale(0.96) translateY(12px);
}

.shell.shell-modal-open {
  opacity: 1;
  transform: scale(1) translateY(0);
  transition:
    transform 0.42s cubic-bezier(0.25, 1, 0.5, 1),
    opacity 0.28s cubic-bezier(0.25, 1, 0.5, 1);
}

@media (prefers-reduced-motion: reduce) {
  .backdrop.shell-backdrop-prep,
  .shell.shell-sheet-prep,
  .shell.shell-modal-prep {
    opacity: 1;
  }

  .shell.shell-sheet-prep,
  .shell.shell-sheet-open,
  .shell.shell-modal-prep,
  .shell.shell-modal-open {
    transform: none;
    transition: none;
  }
}
`;var dt=[{iso:"GH",name:"Ghana",dial:"+233",currency:"GHS",phonePlaceholder:"024 123 4567"},{iso:"NG",name:"Nigeria",dial:"+234",currency:"NGN",phonePlaceholder:"0803 123 4567"},{iso:"KE",name:"Kenya",dial:"+254",currency:"KES",phonePlaceholder:"712 345 678"}],gr=dt.filter(t=>t.iso==="GH"||t.iso==="NG"),ji=[{id:"mtn",label:"MTN Mobile Money",providerHint:"MTN"},{id:"telecel",label:"Telecel Cash",providerHint:"Telecel"},{id:"airteltigo",label:"AirtelTigo Money",providerHint:"AirtelTigo"}],Gi=[{id:"mtn",label:"MTN MoMo",providerHint:"MTN"},{id:"airtel",label:"Airtel Money",providerHint:"Airtel"}],Ki=[{id:"mpesa",label:"M-Pesa",providerHint:"M-Pesa"}];function Ot(t){let e=t.trim().toUpperCase();return e==="GH"?ji:e==="NG"?Gi:e==="KE"?Ki:[]}function Yi(t){let e=t.replace(/\D/g,"");return e.startsWith("233")&&(e=e.slice(3)),e.startsWith("0")&&(e=e.slice(1)),e.length<2?null:`0${e.slice(0,2)}`}var To={"054":"MTN","053":"MTN","055":"MTN","024":"MTN","025":"MTN","020":"Telecel","030":"Telecel","050":"Telecel","027":"AirtelTigo","057":"AirtelTigo","026":"AirtelTigo"};function yr(t,e){let o=t.trim().toUpperCase(),a=e.replace(/\D/g,"");if(o==="GH"){let l=Yi(e);if(l&&To[l])return To[l]}if(o==="KE"&&a.length>=9)return"M-Pesa";if(o==="NG"){let l=a;if(l.startsWith("234")&&(l=l.slice(3)),l.startsWith("0")&&(l=l.slice(1)),l.length>=10){let d=l.slice(0,3);if(["703","706","803","806","810","813","814","816","903","906"].includes(d))return"MTN";if(["701","708","802","808","812","901","902","904","907","912"].includes(d))return"Airtel"}}return Ot(o)[0]?.providerHint??""}function kr(t,e){let o=t.trim().toUpperCase(),a=e.replace(/\D/g,"");return o==="GH"?(a.startsWith("233")&&(a=a.slice(3)),a.startsWith("0")&&(a=a.slice(1)),a.length>=9):o==="KE"?(a.startsWith("254")&&a.length>9?a.slice(3):a.replace(/^0/,"")).length>=9:o==="NG"?(a.startsWith("234")&&(a=a.slice(3)),a.startsWith("0")&&(a=a.slice(1)),a.length>=10):a.length>=9}function It(t,e){return kr(t,e)}var Vi={mtn:{file:"mtn",sandHue:"44 96% 88%",label:"MTN"},telecel:{file:"telecel",sandHue:"0 84% 92%",label:"Telecel"},airteltigo:{file:"airteltigo",sandHue:"0 72% 92%",label:"AirtelTigo"},airtel:{file:"airteltigo",sandHue:"0 72% 92%",label:"Airtel"},mpesa:{file:"mpesa",sandHue:"142 45% 88%",label:"M-Pesa"}};function Qi(t){let e=t.trim().toLowerCase().replace(/[^a-z0-9]+/g," ");return e.includes("mtn")?"mtn":e.includes("telecel")||e.includes("vodafone")?"telecel":e.includes("airteltigo")||e.includes("tigo")?"airteltigo":e.includes("airtel")?"airtel":e.includes("mpesa")||e.includes("safaricom")?"mpesa":"mtn"}function Xi(t){let e=Qi(t),o=Vi[e];return{key:e,sandHue:o.sandHue,imagePath:`/payment-providers/${o.file}.svg`,label:o.label}}function br(t,e){let o=t.trim().toUpperCase(),a=e.replace(/\D/g,"");return o==="GH"?(a.startsWith("233")&&(a=a.slice(3)),a.length>0&&!a.startsWith("0")&&(a=`0${a}`),a.slice(0,10)):o==="NG"?(a.startsWith("234")&&(a=a.slice(3)),a.length>0&&!a.startsWith("0")&&(a=`0${a}`),a.slice(0,11)):a}function $t(t){let e=t.trim().toUpperCase();return e==="GH"?"GHS":e==="NG"?"NGN":null}function _o(t){let e=t.trim().replace(/\D/g,"");if(e.startsWith("233")){let o=e.slice(3);return o.length>0&&!o.startsWith("0")&&(o=`0${o}`),{countryIso:"GH",nationalPhone:o.slice(0,10)}}if(e.startsWith("234")){let o=e.slice(3);return o.length>0&&!o.startsWith("0")&&(o=`0${o}`),{countryIso:"NG",nationalPhone:o.slice(0,11)}}return null}function ot(t){let e=t.trim().toUpperCase();return dt.find(o=>o.iso===e)}function Ao(t,e,o,a,l=""){let d=Ot(e);if(d.length===0||!It(e,l))return"";let m=o||d[0].providerHint;return`
    <div class="momo-network-field">
      <p class="field-hint-label">Mobile network</p>
      <div class="momo-network-grid" role="radiogroup" aria-label="Mobile money network">
        ${d.map(h=>{let k=h.providerHint===m,g=Xi(h.providerHint),b=a(t,g.imagePath);return`
              <button
                type="button"
                class="momo-network-cell ${k?"momo-network-cell-selected":""}"
                role="radio"
                aria-checked="${k}"
                data-mp-momo-network="${h.providerHint}"
              >
                <div class="momo-network-visual" style="--momo-cell-sand: hsl(${g.sandHue})">
                  <span class="momo-network-category">mobile money</span>
                  ${k?'<span class="momo-network-check" aria-hidden="true">\u2713</span>':""}
                  <span class="momo-network-logo-wrap">
                    <img class="momo-network-logo" src="${b}" alt="" data-mp-momo-logo-fallback="${a(t,g.imagePath.replace(".svg",".png"))}" />
                  </span>
                </div>
                <p class="momo-network-label">${h.label}</p>
              </button>
            `}).join("")}
      </div>
      <p class="momo-network-hint">Choose the network linked to the number you will pay from.</p>
    </div>
  `}function vr(t){let e=t.trim().toUpperCase();return/^[A-Z]{2}$/.test(e)?`https://flagcdn.com/w40/${e.toLowerCase()}.png`:""}var Ji='<svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';function Zi(t,e){return t.map(o=>{let a=o.iso===e;return`
        <li role="none">
          <button
            type="button"
            class="momo-flag-select-option${a?" momo-flag-select-option-selected":""}"
            role="option"
            aria-selected="${a}"
            data-mp-country-option="${o.iso}"
          >
            <img class="momo-country-flag" src="${vr(o.iso)}" alt="" />
            <span class="momo-flag-select-option-label">${o.name} \xB7 ${o.currency}</span>
          </button>
        </li>`}).join("")}function ea(t,e,o){let a=o?.embedded??!1,l=ot(e)??t[0]??{iso:"GH",dial:"+233"};return`
    <div class="momo-flag-select" data-mp-country-picker>
      <button
        type="button"
        class="momo-flag-select-trigger${a?" momo-flag-select-trigger-embedded":""}"
        data-mp-country-trigger
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-label="Country"
      >
        <img
          class="momo-country-flag"
          src="${vr(l.iso)}"
          alt=""
          data-mp-country-flag
        />
        <span class="momo-flag-select-dial" data-mp-country-dial>${l.dial}</span>
        <span class="momo-flag-select-chevron">${Ji}</span>
      </button>
      <ul class="momo-flag-select-list hidden" role="listbox" data-mp-country-list>
        ${Zi(t,e)}
      </ul>
    </div>
  `}function Lo(t,e,o,a){let l=ot(e)??t[0];return`
    <div class="momo-fields">
      <div class="field">
        <label class="field-hint-label" for="mp-preview-phone">Mobile number</label>
        <div class="momo-phone-composite">
          ${ea(t,e,{embedded:!0})}
          <span class="momo-phone-divider" aria-hidden="true"></span>
          <input
            id="mp-preview-phone"
            type="tel"
            inputmode="tel"
            autocomplete="tel-national"
            class="checkout-input momo-phone-input momo-phone-input-embedded"
            placeholder="${l.phonePlaceholder}"
            value="${o}"
            data-mp-phone
            aria-label="Mobile number"
          />
        </div>
      </div>
      ${a}
    </div>
  `}function wr(t,e){let o=ot(e);if(!o)return;let a=t.querySelector("[data-mp-country-flag]");a&&(a.src=vr(o.iso));let l=t.querySelector("[data-mp-country-dial]");l&&(l.textContent=o.dial),t.querySelectorAll("[data-mp-country-option]").forEach(d=>{let h=d.getAttribute("data-mp-country-option")===e;d.classList.toggle("momo-flag-select-option-selected",h),d.setAttribute("aria-selected",String(h))})}function Ro(t,e){let o=t.querySelector("[data-mp-country-picker]"),a=t.querySelector("[data-mp-country-trigger]"),l=t.querySelector("[data-mp-country-list]");if(!o||!a||!l)return()=>{};let d=new AbortController,{signal:m}=d,h=g=>{l.classList.toggle("hidden",!g),a.setAttribute("aria-expanded",String(g)),a.classList.toggle("momo-flag-select-trigger-open",g)};a.addEventListener("click",g=>{g.stopPropagation(),h(l.classList.contains("hidden"))},{signal:m}),l.querySelectorAll("[data-mp-country-option]").forEach(g=>{g.addEventListener("click",b=>{b.stopPropagation();let L=g.getAttribute("data-mp-country-option");L&&(wr(t,L),h(!1),e(L))},{signal:m})});let k=g=>{g.composedPath().includes(o)||h(!1)};return document.addEventListener("click",k,{signal:m,capture:!0}),a.addEventListener("keydown",g=>{g.key==="Escape"&&h(!1)},{signal:m}),()=>d.abort()}var Oo=`
.momo-fields {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.momo-phone-row {
  display: flex;
  align-items: stretch;
  gap: 0.5rem;
}

.momo-phone-composite {
  display: flex;
  align-items: stretch;
  overflow: visible;
  border: 1px solid color-mix(in oklch, var(--border) 60%, transparent);
  border-radius: 0.75rem;
  background: color-mix(in oklch, var(--card) 90%, transparent);
  box-shadow: 0 1px 2px oklch(0 0 0 / 4%);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.momo-phone-composite:focus-within {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--primary) 15%, transparent);
}

.momo-phone-divider {
  width: 1px;
  align-self: stretch;
  margin: 0.5rem 0;
  background: color-mix(in oklch, var(--border) 70%, transparent);
}

.momo-flag-select-trigger-embedded {
  min-width: 6.25rem;
  height: 2.75rem;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.momo-flag-select-trigger-embedded:hover:not(:disabled),
.momo-flag-select-trigger-embedded:focus-visible,
.momo-flag-select-trigger-embedded.momo-flag-select-trigger-open {
  border-color: transparent;
  box-shadow: none;
}

.momo-phone-input-embedded {
  min-width: 0;
  flex: 1;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.momo-phone-input-embedded:focus {
  outline: none;
  box-shadow: none;
}

.momo-flag-select {
  position: relative;
  flex-shrink: 0;
}

.momo-flag-select-trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  min-width: 6.75rem;
  height: 2.75rem;
  padding: 0 0.625rem;
  border: 1px solid color-mix(in oklch, var(--border) 60%, transparent);
  border-radius: 0.75rem;
  background: color-mix(in oklch, var(--card) 90%, transparent);
  color: var(--card-foreground);
  font: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  box-shadow: 0 1px 2px oklch(0 0 0 / 4%);
  cursor: pointer;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.momo-flag-select-trigger:hover:not(:disabled) {
  border-color: color-mix(in oklch, var(--border) 85%, transparent);
}

.momo-flag-select-trigger:focus-visible {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--primary) 15%, transparent);
}

.momo-flag-select-trigger-open {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--primary) 15%, transparent);
}

.momo-flag-select-trigger:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.momo-country-flag {
  width: 1.75rem;
  height: 1.25rem;
  flex-shrink: 0;
  border-radius: 0.125rem;
  border: 1px solid color-mix(in oklch, var(--border) 60%, transparent);
  object-fit: cover;
  box-shadow: 0 1px 2px oklch(0 0 0 / 6%);
}

.momo-flag-select-dial {
  min-width: 0;
  flex: 1;
  text-align: left;
}

.momo-flag-select-chevron {
  display: inline-flex;
  flex-shrink: 0;
  color: var(--muted-foreground);
  transition: transform 0.15s ease;
}

.momo-flag-select-trigger-open .momo-flag-select-chevron {
  transform: rotate(180deg);
}

.momo-flag-select-list {
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  z-index: 20;
  min-width: 12.5rem;
  max-height: 15rem;
  margin: 0;
  padding: 0.25rem;
  list-style: none;
  overflow: auto;
  border: 1px solid color-mix(in oklch, var(--border) 80%, transparent);
  border-radius: 0.75rem;
  background: var(--card);
  box-shadow: 0 12px 32px oklch(0 0 0 / 14%);
}

.momo-flag-select-option {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 0.75rem;
  border: 0;
  border-radius: 0.5rem;
  background: transparent;
  color: var(--card-foreground);
  font: inherit;
  font-size: 0.875rem;
  text-align: left;
  cursor: pointer;
}

.momo-flag-select-option:hover,
.momo-flag-select-option:focus-visible {
  outline: none;
  background: color-mix(in oklch, var(--muted-foreground) 10%, transparent);
}

.momo-flag-select-option-selected {
  background: color-mix(in oklch, var(--primary) 8%, transparent);
}

.momo-flag-select-option-label {
  min-width: 0;
  flex: 1;
}

.momo-phone-input {
  min-width: 0;
  flex: 1;
}
`;function ut(t,e=6){return t.replace(/\D/g,"").slice(0,e)}function Io(t,e,o=!1){let a=ut(e),l=a.split(""),d=Array.from({length:6},(m,h)=>{let k=l[h]??"";return`
      <input
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        maxlength="1"
        class="checkout-otp-cell${k?" checkout-otp-cell-filled":""}${o?" checkout-otp-cell-invalid":""}"
        data-mp-otp-cell="${h}"
        value="${k}"
        aria-label="Digit ${h+1} of 6"
      />`}).join("");return`
    <div class="checkout-otp-input" data-mp-otp-root>
      <input
        id="${t}"
        type="text"
        inputmode="numeric"
        autocomplete="one-time-code"
        class="checkout-otp-autofill"
        data-mp-otp-autofill
        value="${a}"
        tabindex="-1"
        aria-hidden="true"
      />
      <div class="checkout-otp-cells" role="group" aria-labelledby="${t}">
        ${d}
      </div>
    </div>
  `}function ta(t,e,o=!1){let a=ut(e),l=a.split("");t.querySelectorAll("[data-mp-otp-cell]").forEach(m=>{let h=Number(m.getAttribute("data-mp-otp-cell")),k=l[h]??"";m.value=k,m.classList.toggle("checkout-otp-cell-filled",!!k),m.classList.toggle("checkout-otp-cell-invalid",o)});let d=t.querySelector("[data-mp-otp-autofill]");d&&d.value!==a&&(d.value=a)}function $o(t,e){let a=e.minCompleteLength??6,l=()=>Array.from(t.querySelectorAll("[data-mp-otp-cell]")),d=t.querySelector("[data-mp-otp-autofill]"),m=null,h=x=>{let M=Math.max(0,Math.min(5,x)),P=l()[M];P?.focus(),P?.select()},k=()=>l().map(x=>x.value.replace(/\D/g,"").slice(-1)).join("").replace(/\s/g,""),g=(x,M)=>{!e.onComplete||x.length<a||!(x.length>=6||M&&x.length>=a)||m===x||(m=x,e.onComplete(x))},b=(x,M=!1)=>{let P=ut(x,6);ta(t,P),e.onChange(P),g(P,M)},L=(x,M=0)=>{let P=ut(x,6);if(!P)return;let J=ut(k(),6).slice(0,M);b(J+P,!0),requestAnimationFrame(()=>{h(Math.min(M+P.length,5))})},I=(x,M)=>{let J=M.target.value.replace(/\D/g,"").slice(-1),re=k().split("");for(;re.length<6;)re.push("");re[x]=J,b(re.join("")),J&&x<5&&h(x+1)},_=(x,M)=>{let P=k().split("");for(;P.length<6;)P.push("");if(M.key==="Backspace"){if(M.preventDefault(),P[x]){P[x]="",b(P.join(""));return}x>0&&(P[x-1]="",b(P.join("")),h(x-1));return}if(M.key==="ArrowLeft"){M.preventDefault(),h(x-1);return}M.key==="ArrowRight"&&(M.preventDefault(),h(x+1))},X=(x,M)=>{M.preventDefault(),L(M.clipboardData?.getData("text")??"",x)},U=x=>{L(x.target.value,0)},R=new AbortController,{signal:K}=R;return l().forEach(x=>{let M=Number(x.getAttribute("data-mp-otp-cell"));x.addEventListener("input",P=>I(M,P),{signal:K}),x.addEventListener("keydown",P=>_(M,P),{signal:K}),x.addEventListener("paste",P=>X(M,P),{signal:K}),x.addEventListener("focus",P=>P.target.select(),{signal:K})}),d?.addEventListener("input",U,{signal:K}),e.autoFocus!==!1&&requestAnimationFrame(()=>h(0)),()=>R.abort()}var Ho=`
.checkout-otp-wrap {
  padding: 0.25rem 0;
}

.checkout-otp-input {
  position: relative;
}

.checkout-otp-autofill {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
}

.checkout-otp-cells {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

@media (min-width: 640px) {
  .checkout-otp-cells {
    gap: 0.625rem;
  }
}

.checkout-otp-cell {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.75rem;
  border: 1px solid color-mix(in oklch, var(--border) 60%, transparent);
  background: color-mix(in oklch, var(--card) 90%, transparent);
  text-align: center;
  font-size: 1.125rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--card-foreground);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

@media (min-width: 640px) {
  .checkout-otp-cell {
    width: 3rem;
    height: 3rem;
  }
}

.checkout-otp-cell:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--primary) 15%, transparent);
}

.checkout-otp-cell-filled {
  border-color: color-mix(in oklch, var(--primary) 40%, transparent);
  background: var(--card);
}

.checkout-otp-cell-invalid {
  border-color: color-mix(in oklch, var(--destructive) 60%, transparent);
}

.checkout-otp-cell-invalid:focus {
  border-color: var(--destructive);
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--destructive) 15%, transparent);
}

.checkout-otp-cell:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
`;var ra={base:"Base",bnb:"BNB Chain",solana:"Solana",eth:"Ethereum",ethereum:"Ethereum",polygon:"Polygon",arbitrum:"Arbitrum"};function pt(t,e){let o=t.trim();if(o==="eth-wxrp")return{symbol:"WXRP",network:"Ethereum"};let a=o.lastIndexOf("-"),l=a>0?o.slice(0,a).toLowerCase():o.toLowerCase(),d=a>0?o.slice(a+1).toUpperCase():"",m=e?.trim()||d||"?",h=ra[l]??l.replace(/-/g," ").replace(/\b\w/g,k=>k.toUpperCase());return{symbol:m,network:h}}var oa={USDC:1,USDT:2,ETH:3,SOL:4,BTC:5,BNB:6},na=/^(0x[a-fA-F0-9]{4,}|[a-zA-Z0-9]{20,})$/;function ia(t){return t.trim().toLowerCase().replace(/\s+/g," ")}function xr(t){let e=t.trim();return e.length>=4&&na.test(e)}function aa(t){return oa[t.trim().toUpperCase()]??99}function Cr(t){let e=new Map;for(let o of t){let a=o.symbol.trim().toUpperCase();if(!a)continue;let l=a.toLowerCase(),d=o.name.trim().toLowerCase(),m=(o.chainLabels??[]).map(g=>g.trim().toLowerCase()).filter(Boolean).join(" "),h=(o.addresses??[]).map(g=>g.trim().toLowerCase()).filter(Boolean),k=[l,d,m].filter(Boolean).join(" ");e.set(a,{symbol:a,symbolNorm:l,nameNorm:d,haystack:k,addressesNorm:h,popularityRank:aa(a)})}return e}function sa(t,e){if(!e)return 0;if(xr(e)){let a=e.trim().toLowerCase();for(let l of t.addressesNorm){if(l===a)return 1200;if(l.startsWith(a))return 1e3;if(l.includes(a))return 800}return-1}let o=t.symbolNorm;return o===e?1e3:o.startsWith(e)?850:o.includes(e)?700:t.nameNorm.startsWith(e)?550:t.nameNorm.includes(e)?450:t.haystack.includes(e)?300:-1}function Uo(t,e,o){let a=ia(e);if(!a)return[...t];let l=o??Cr(t),d=[];for(let m of t){let h=m.symbol.trim().toUpperCase(),k=l.get(h),g=k?sa(k,a):-1;if(g<0)continue;let b=Math.max(0,100-(k?.popularityRank??99));d.push({group:m,score:g+b})}return d.sort((m,h)=>h.score!==m.score?h.score-m.score:m.group.symbol.localeCompare(h.group.symbol)),d.map(m=>m.group)}var Ue={base:"https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains/base/info/logo.png",ethereum:"https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains/ethereum/info/logo.png",eth:"https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains/ethereum/info/logo.png",polygon:"https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains/polygon/info/logo.png",arbitrum:"https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains/arbitrum/info/logo.png",optimism:"https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains/optimism/info/logo.png",solana:"https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains/solana/info/logo.png",bnb:"https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains/smartchain/info/logo.png",bitcoin:"https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains/bitcoin/info/logo.png"},Ht={"base-usdc":"https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains/base/assets/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913/logo.png","ethereum-usdc":"https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png","bnb-usdc":"https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains/smartchain/assets/0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d/logo.png","solana-usdc":"https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains/solana/assets/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png","eth-wxrp":"https://www.coindesk.com/_next/image?url=https%3A%2F%2Fresources.cryptocompare.com%2Fasset-management%2F15631%2F1720080913603.png&w=64&q=75"},No={BTC:Ue.bitcoin,ETH:Ue.ethereum,USDC:Ht["ethereum-usdc"],USDT:"https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",WXRP:Ht["eth-wxrp"]},la="https://api.dicebear.com/7.x/shapes/svg",ca=40,da=20;var ua=26,Fo={btc:Ue.bitcoin,eth:Ue.ethereum};function Ut(t){return`${la}?seed=${encodeURIComponent(t)}`}function Nt(t){let e=t.trim();if(e==="eth-wxrp")return"ethereum";let o=e.lastIndexOf("-");return o>0?e.slice(0,o).toLowerCase():e.toLowerCase()}function nt(t,e){let o=e?.trim().toLowerCase()??"";if(o&&Ht[o])return Ht[o];let a=t.trim().toUpperCase();if(No[a])return No[a];let l=o?Nt(o):"";return l&&Ue[l]?Ue[l]:Ue.ethereum}function pa(t){let e=Nt(t);return Ue[e]??null}function Er(t,e){let o=`${t.trim().toUpperCase()}:${e.trim()||"unknown"}`;return`data-mp-token-icon-fallback="${Ut(o)}"`}function Bo(){let t=ua;return`
    <span class="rail-icon-frame" aria-hidden="true">
      <span class="rail-crypto-stack">
        <span class="rail-crypto-token">
          <img src="${Fo.btc}" alt="" width="${t}" height="${t}" referrerpolicy="no-referrer" ${Er("BTC","bitcoin")} />
        </span>
        <span class="rail-crypto-token rail-crypto-overlap">
          <img src="${Fo.eth}" alt="" width="${t}" height="${t}" referrerpolicy="no-referrer" ${Er("ETH","ethereum")} />
        </span>
      </span>
    </span>
  `}function Do(t,e){let o=nt(e,t),a=pa(t),l=ca,d=da,m=Er(e,t),h=a?`
      <span class="quote-chain-badge" style="width:${d}px;height:${d}px">
        <img src="${a}" alt="" width="${d}" height="${d}" referrerpolicy="no-referrer" ${m} />
      </span>
    `:"";return`
    <span class="quote-token-wrap" style="width:${l}px;height:${l}px">
      <span class="quote-token-circle">
        <img class="quote-token-img" src="${o}" alt="" width="${l}" height="${l}" referrerpolicy="no-referrer" ${m} />
      </span>
      ${h}
    </span>
  `}var Ft=4,ma=new Set(["84532","11155111","421614","11155420","80002"]),qo={USDC:1,USDT:2,ETH:3,SOL:4,BTC:5,BNB:6};function ae(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ha(t,e){let o=ma.has(t.chainId.trim());return e==="TEST"?o:!o}function mt(t,e){return`${t.trim().toLowerCase().replace(/\s+/g,"-")}-${e.trim().toLowerCase()}`}function fa(t){if(t.trim()==="eth-wxrp")return"ETH";let e=Nt(t);return{base:"BASE",ethereum:"ETH",eth:"ETH",bnb:"BNB",solana:"SOLANA",polygon:"POLYGON",arbitrum:"ARBITRUM",optimism:"OPTIMISM"}[e]??e.toUpperCase().replace(/-/g," ")}function Go(t,e,o){let a=new Map(e.map(d=>[d.chainId,d])),l=new Map;for(let d of t){if(!ha(d,o)||!a.has(d.chainId))continue;let m=d.symbol.trim().toUpperCase();if(!m)continue;let h=l.get(m);if(!h){l.set(m,{symbol:m,name:d.name.trim()||m,logoUrl:d.logoUrl,tokens:[d]});continue}h.tokens.push(d),!h.logoUrl&&d.logoUrl&&(h.logoUrl=d.logoUrl)}return Array.from(l.values()).sort((d,m)=>{let h=qo[d.symbol]??99,k=qo[m.symbol]??99;return h!==k?h-k:d.symbol.localeCompare(m.symbol)})}function Ko(t,e){let o=e.slice(0,Ft),a=o.slice(0,Math.min(3,o.length)),l=[t,...a.filter(m=>m!==t)];if(l.length>=Ft)return l.slice(0,Ft);let d=o[3];return d&&!l.includes(d)&&l.push(d),l.slice(0,Ft)}function ht(t,e){return t.find(o=>o.chainId===e.chainId)??null}function ga(t,e){let o=[],a=[];for(let l of t.tokens){let d=ht(e,l);if(d){let h=d.shortName.trim()||d.name.trim();h&&o.push(h)}let m=l.address.trim();m&&a.push(m)}return{symbol:t.symbol,name:t.name,chainLabels:o,addresses:a}}function ya(t,e,o){let a=t.map(h=>ga(h,e)),l=Cr(a),d=Uo(a,o,l),m=new Set(d.map(h=>h.symbol));return t.filter(h=>m.has(h.symbol))}function Wo(t){let e=xr(t)?"Matching address\u2026":"Search token or paste address",o=t.trim()?'<button type="button" class="picker-search-clear" data-mp-picker-search-clear aria-label="Clear search">\xD7</button>':"";return`
    <div class="picker-search-wrap">
      <span class="picker-search-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.75"/>
          <path d="m20 20-3.5-3.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
        </svg>
      </span>
      <input
        type="search"
        class="picker-search-input"
        data-mp-picker-search
        value="${ae(t)}"
        placeholder="${ae(e)}"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
        aria-label="Search tokens"
      />
      ${o}
    </div>
  `}function ka(t,e){return{id:mt(e.name,t.symbol),kind:"offramp",chain:e.name.trim().toUpperCase().replace(/\s+/g," "),symbol:t.symbol.trim().toUpperCase(),...t.address.trim()?{tokenAddress:t.address.trim()}:{}}}function Mr(t,e,o){let a=[];for(let l of t){let d=!1;for(let k of e){let g=ht(o,k);if(g&&mt(g.name,k.symbol)===l){a.push(ka(k,g)),d=!0;break}}if(d)continue;let m=l.lastIndexOf("-"),h=m>0?l.slice(m+1).toUpperCase():l.toUpperCase();a.push({id:l,kind:"offramp",chain:fa(l),symbol:h})}return a}function Yo(t,e,o){let l=Mr([t],e,o)[0]?.symbol??null,{symbol:d,network:m}=pt(t,l);return{id:t,symbol:d,network:m,cryptoAmount:null,error:null}}function Bt(t){return t.shortName.trim()||t.name.trim()||`Chain ${t.chainId}`}function zo(t,e,o){let a=t.trim();return a||nt(e,o)}function jo(t){let{category:e,title:o,meta:a,iconSrc:l,iconFallback:d,selected:m,dataAttr:h,dataValue:k}=t;return`
    <button
      type="button"
      class="picker-story-cell ${m?"picker-story-cell-selected":""}"
      ${h}="${ae(k)}"
      aria-pressed="${m?"true":"false"}"
    >
      <div class="picker-story-visual">
        <span class="picker-story-category">${ae(e)}</span>
        ${m?'<span class="picker-story-check" aria-hidden="true">\u2713</span>':""}
        <span class="picker-story-icon">
          <img
            src="${ae(l)}"
            alt=""
            width="44"
            height="44"
            referrerpolicy="no-referrer"
            data-mp-token-icon-fallback="${ae(d)}"
          />
        </span>
        <span class="picker-story-overlay" aria-hidden="true"></span>
      </div>
      <div class="picker-story-footer">
        <p class="picker-story-title">${ae(o)}</p>
        ${a?`<p class="picker-story-meta">${ae(a)}</p>`:""}
      </div>
    </button>
  `}function Vo(t,e){let o=e?"Loading tokens\u2026":"More tokens",a=!e&&t>0?`<span class="more-tokens-count">${t.toLocaleString()} available</span>`:"";return`
    <button type="button" class="more-tokens-btn pay-method-surface" data-mp-more-tokens ${e?"disabled":""}>
      <span class="more-tokens-icons" aria-hidden="true">${ba()}</span>
      <span class="more-tokens-copy">
        <span class="more-tokens-label">${o}</span>
        ${a}
      </span>
      <svg class="more-tokens-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
        <path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  `}function ba(){let t=[nt("USDC","base-usdc"),nt("ETH","ethereum-eth"),nt("USDT","ethereum-usdt")];return t.map((e,o)=>`
        <span class="more-tokens-icon" style="z-index:${t.length-o}">
          <img src="${ae(e)}" alt="" width="18" height="18" referrerpolicy="no-referrer" />
        </span>
      `).join("")}function Qo(t){let{open:e,step:o,environment:a,loading:l,error:d,symbolGroups:m,selectedSymbol:h,chains:k,searchQuery:g=""}=t,b=o==="token"&&g.trim()?ya(m,k,g):m,L=h?m.find(_=>_.symbol===h)??null:null,I="";if(l)I=`
      <div class="picker-loading-grid" aria-busy="true" aria-label="Loading tokens">
        ${[1,2,3,4].map(()=>'<div class="picker-loading-cell"></div>').join("")}
      </div>
    `;else if(d)I=`<p class="inline-error" role="alert">${ae(d)}</p>`;else if(o==="token")m.length===0?I='<p class="picker-empty" role="status">No tokens available for crypto checkout right now.</p>':b.length===0?I=`
        ${Wo(g)}
        <p class="picker-empty" role="status">No tokens match "${ae(g.trim())}".</p>
      `:I=`
        ${Wo(g)}
        <p class="picker-step-title">${a==="TEST"?"Select testnet token":"Select token"}</p>
        <div class="picker-story-grid" role="list">
          ${b.map(_=>{let X=`${_.symbol.toLowerCase()}-picker`,U=zo(_.logoUrl,_.symbol,X);return jo({category:"token",title:_.symbol,meta:_.tokens.length>1?`${_.tokens.length} networks`:_.name,iconSrc:U,iconFallback:Ut(`${_.symbol}:picker`),dataAttr:"data-mp-picker-symbol",dataValue:_.symbol})}).join("")}
        </div>
      `;else if(L){let _=g.trim().toLowerCase(),X=L.tokens.map(U=>{let R=ht(k,U);return R?{token:U,chain:R}:null}).filter(U=>U!=null).filter(({chain:U,token:R})=>_?Bt(U).toLowerCase().includes(_)||R.symbol.toLowerCase().includes(_):!0).sort((U,R)=>Bt(U.chain).localeCompare(Bt(R.chain)));I=`
      <div class="picker-step-header">
        <p class="picker-step-title">Select network for ${ae(L.symbol)}</p>
        <button type="button" class="picker-back-link" data-mp-picker-back-token>Change token</button>
      </div>
      <div class="picker-story-grid" role="list">
        ${X.map(({token:U,chain:R})=>{let K=mt(R.name,U.symbol),x=zo(R.iconUrl,R.shortName,K);return jo({category:"network",title:Bt(R),meta:L.symbol,iconSrc:x,iconFallback:Ut(`chain:${R.chainId}`),dataAttr:"data-mp-picker-token-id",dataValue:U.id})}).join("")}
      </div>
    `}return`
    <div class="token-picker-sheet ${e?"token-picker-sheet-open":""}" aria-hidden="${e?"false":"true"}">
      <div class="token-picker-backdrop" data-mp-token-sheet-close></div>
      <div class="token-picker-panel" role="dialog" aria-modal="true" aria-label="Select token">
        <div class="token-picker-handle" aria-hidden="true"></div>
        <button type="button" class="token-picker-close" data-mp-token-sheet-close aria-label="Close token picker">\xD7</button>
        <div class="token-picker-body">${I}</div>
      </div>
    </div>
  `}var Xo=`
.checkout-article {
  position: relative;
  overflow: hidden;
}

.more-tokens-btn {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.625rem;
  margin-top: 0.5rem;
  padding: 0.625rem 0.75rem;
  font: inherit;
  color: var(--card-foreground);
  cursor: pointer;
}

.more-tokens-icons {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.more-tokens-icon {
  position: relative;
  display: inline-flex;
  width: 1.125rem;
  height: 1.125rem;
  overflow: hidden;
  border-radius: 999px;
  background: var(--card);
  box-shadow: 0 0 0 2px var(--glass-card);
}

.more-tokens-icon + .more-tokens-icon {
  margin-left: -0.375rem;
}

.more-tokens-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.more-tokens-copy {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.125rem;
}

.more-tokens-label {
  font-size: 0.875rem;
  font-weight: 600;
}

.more-tokens-count {
  font-size: 0.75rem;
  color: var(--muted-foreground);
}

.more-tokens-chevron {
  flex-shrink: 0;
  opacity: 0.65;
}

.token-picker-sheet {
  position: absolute;
  inset: 0;
  z-index: 30;
  pointer-events: none;
  visibility: hidden;
}

.token-picker-sheet-open {
  pointer-events: auto;
  visibility: visible;
}

.token-picker-backdrop {
  position: absolute;
  inset: 0;
  background: color-mix(in oklch, var(--foreground) 42%, transparent);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.token-picker-sheet-open .token-picker-backdrop {
  opacity: 1;
}

.token-picker-panel {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  max-height: 88%;
  flex-direction: column;
  border-radius: 1rem 1rem 0 0;
  background: var(--glass-card);
  box-shadow: 0 -8px 32px color-mix(in oklch, var(--foreground) 12%, transparent);
  transform: translateY(100%);
  transition: transform 0.32s cubic-bezier(0.19, 1, 0.22, 1);
}

.token-picker-sheet-open .token-picker-panel {
  transform: translateY(0);
}

.token-picker-handle {
  width: 2.5rem;
  height: 0.25rem;
  margin: 0.625rem auto 0;
  border-radius: 999px;
  background: color-mix(in oklch, var(--muted-foreground) 35%, transparent);
}

.token-picker-close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 2;
  display: inline-flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 999px;
  background: color-mix(in oklch, var(--pay-surface-panel) 80%, transparent);
  font-size: 1.25rem;
  line-height: 1;
  color: var(--muted-foreground);
  cursor: pointer;
}

.token-picker-body {
  overflow-y: auto;
  padding: 0.25rem 1rem 1.25rem;
}

.picker-search-wrap {
  position: relative;
  margin-bottom: 0.75rem;
}

.picker-search-icon {
  pointer-events: none;
  position: absolute;
  left: 0.75rem;
  top: 50%;
  z-index: 1;
  display: inline-flex;
  color: var(--picker-search-icon);
  transform: translateY(-50%);
}

.picker-search-input {
  width: 100%;
  height: 2.5rem;
  border: 1px solid color-mix(in oklch, var(--picker-search-border) 80%, transparent);
  border-radius: 0.75rem;
  background: var(--picker-search-background);
  padding: 0 2.25rem;
  font: inherit;
  font-size: 0.875rem;
  color: var(--picker-search-foreground);
}

.picker-search-input::placeholder {
  color: var(--picker-search-placeholder);
}

.picker-search-input:focus {
  outline: none;
  border-color: color-mix(in oklch, var(--primary) 55%, var(--picker-search-border));
}

.picker-search-clear {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  display: inline-flex;
  width: 1.75rem;
  height: 1.75rem;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 999px;
  background: transparent;
  font-size: 1.125rem;
  line-height: 1;
  color: var(--muted-foreground);
  transform: translateY(-50%);
  cursor: pointer;
}

.picker-search-clear:hover {
  background: color-mix(in oklch, var(--picker-search-icon) 12%, transparent);
  color: var(--picker-search-foreground);
}

.picker-step-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.picker-step-title {
  margin: 0 0 0.75rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted-foreground);
}

.picker-step-header .picker-step-title {
  margin-bottom: 0;
}

.picker-back-link {
  border: none;
  background: none;
  padding: 0;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--primary);
  cursor: pointer;
}

.picker-back-link:hover {
  text-decoration: underline;
}

.picker-story-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

@media (min-width: 400px) {
  .picker-story-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.picker-story-cell {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  font: inherit;
  color: var(--card-foreground);
}

.picker-story-visual {
  position: relative;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid color-mix(in oklch, var(--border) 55%, transparent);
  background: color-mix(in oklch, var(--primary) 7%, var(--card));
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.checkout-article[data-color-mode="dark"].pay-checkout .picker-story-visual {
  border-color: color-mix(in oklch, var(--primary) 22%, transparent);
  background: color-mix(in oklch, var(--primary) 16%, var(--pay-surface-button));
}

.picker-story-cell-selected .picker-story-visual,
.picker-story-cell:hover .picker-story-visual,
.picker-story-cell:focus-visible .picker-story-visual {
  box-shadow: inset 0 0 0 2px var(--primary);
}

.picker-story-category {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 3;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: color-mix(in oklch, var(--muted-foreground) 90%, transparent);
}

.picker-story-check {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 4;
  display: inline-flex;
  width: 18px;
  height: 18px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: var(--primary);
  color: var(--primary-foreground, #fff);
  font-size: 11px;
  font-weight: 700;
}

.picker-story-icon {
  position: relative;
  z-index: 1;
  display: flex;
  width: 44px;
  height: 44px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--card);
}

.picker-story-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.picker-story-overlay {
  position: absolute;
  inset: 0;
  background: color-mix(in oklch, var(--foreground) 18%, transparent);
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
}

.picker-story-cell:hover .picker-story-overlay,
.picker-story-cell-selected .picker-story-overlay {
  opacity: 1;
}

.picker-story-title {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.34;
}

.picker-story-meta {
  margin: 2px 0 0;
  font-size: 0.75rem;
  line-height: 1.3;
  color: var(--muted-foreground);
}

.picker-empty {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.45;
  color: var(--muted-foreground);
}

.picker-loading-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.picker-loading-cell {
  aspect-ratio: 1;
  border-radius: 4px;
  border: 1px solid color-mix(in oklch, var(--border) 45%, transparent);
  background: color-mix(in oklch, var(--primary) 8%, var(--card));
  animation: pickerCellPulse 1.4s ease-in-out infinite;
}

.checkout-article[data-color-mode="dark"].pay-checkout .picker-loading-cell {
  background: color-mix(in oklch, var(--primary) 14%, var(--pay-surface-button));
}

@keyframes pickerCellPulse {
  0%, 100% { opacity: 0.45; }
  50% { opacity: 0.9; }
}
`;function Dt(t){return t==="momo_approval"||t==="bank_transfer"}function va(t,e){return t==="momo_approval"||t==="bank_transfer"?{title:"Payment may still be processing",body:`If you already approved on your phone, leaving will not cancel the charge.${e==="pending"?" We still do not see a completed payment, but it may be processing.":""} We will keep checking in the background for a few minutes.`,stayLabel:"Wait for confirmation",leaveLabel:"Leave anyway"}:t==="momo_otp"?{title:"Leave OTP step?",body:"You will need a new verification code if you start over.",stayLabel:"Stay on this step",leaveLabel:"Start over"}:t==="wallet_pending"?{title:"Wallet transaction pending",body:"If you already approved in your wallet, wait for confirmation before leaving.",stayLabel:"Keep waiting",leaveLabel:"Leave anyway"}:{title:"Leave this step?",body:"Your payment may still be in progress.",stayLabel:"Stay",leaveLabel:"Leave"}}function Jo(t){if(!t.open)return"";let e=va(t.kind,t.lastStatus);return`
    <div class="checkout-exit-guard" role="alertdialog" aria-modal="true" aria-labelledby="mp-exit-guard-title" aria-describedby="mp-exit-guard-desc">
      <div class="checkout-exit-guard-backdrop" data-mp-exit-stay aria-hidden="true"></div>
      <div class="checkout-exit-guard-card">
        ${t.checking?'<div class="checkout-exit-guard-spinner" aria-busy="true"></div>':""}
        <h2 id="mp-exit-guard-title" class="checkout-exit-guard-title">
          ${t.checking?"Checking payment status\u2026":e.title}
        </h2>
        <p id="mp-exit-guard-desc" class="checkout-exit-guard-desc">
          ${t.checking?"Please wait while we confirm whether your payment already went through.":e.body}
        </p>
        ${t.checking?"":`
          <div class="checkout-exit-guard-actions">
            <button type="button" class="primary-btn" data-mp-exit-stay>${e.stayLabel}</button>
            <button type="button" class="checkout-exit-leave-btn" data-mp-exit-leave>${e.leaveLabel}</button>
          </div>`}
      </div>
    </div>
  `}var Zo=`
.checkout-exit-guard {
  position: absolute;
  inset: 0;
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.checkout-exit-guard-backdrop {
  position: absolute;
  inset: 0;
  background: color-mix(in oklch, var(--background, #fff) 55%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.checkout-exit-guard-card {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 22rem;
  border-radius: 1rem;
  border: 1px solid var(--border);
  background: var(--card);
  padding: 1.25rem;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
}

.checkout-exit-guard-spinner {
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 auto 1rem;
  border-radius: 50%;
  border: 2px solid color-mix(in oklch, var(--muted-foreground) 25%, transparent);
  border-top-color: var(--muted-foreground);
  animation: mp-preview-spin 0.7s linear infinite;
}

.checkout-exit-guard-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--card-foreground);
}

.checkout-exit-guard-desc {
  margin: 0.5rem 0 0;
  font-size: 0.875rem;
  line-height: 1.45;
  color: var(--muted-foreground);
}

.checkout-exit-guard-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1.25rem;
}

.checkout-exit-leave-btn {
  border: 0;
  background: none;
  padding: 0.5rem;
  font: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--destructive, #b91c1c);
  cursor: pointer;
}

.checkout-exit-leave-btn:hover {
  text-decoration: underline;
  text-underline-offset: 2px;
}
`;var en=`
.checkout-step-motion {
  position: relative;
  display: flex;
  flex: 1;
  min-height: 0;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
}

.checkout-step-panel {
  display: flex;
  width: 100%;
  flex: 1;
  min-height: 0;
  flex-direction: column;
  gap: 1rem;
}

.checkout-step-panel.checkout-step-enter-forward:not(.checkout-motion-instant) {
  animation: checkout-step-enter-forward 0.42s cubic-bezier(0.25, 1, 0.5, 1) both;
}

.checkout-step-panel.checkout-step-enter-back:not(.checkout-motion-instant) {
  animation: checkout-step-enter-back 0.42s cubic-bezier(0.25, 1, 0.5, 1) both;
}

@keyframes checkout-step-enter-forward {
  from {
    opacity: 0;
    transform: translateX(24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes checkout-step-enter-back {
  from {
    opacity: 0;
    transform: translateX(-24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.checkout-stagger-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.checkout-stagger-item {
  width: 100%;
}

.checkout-step-panel:not(.checkout-motion-instant) .checkout-stagger-item {
  opacity: 0;
  animation: checkout-stagger-rise 0.42s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

.checkout-stagger-group > .checkout-stagger-item:nth-child(1) { animation-delay: 0.04s; }
.checkout-stagger-group > .checkout-stagger-item:nth-child(2) { animation-delay: 0.09s; }
.checkout-stagger-group > .checkout-stagger-item:nth-child(3) { animation-delay: 0.14s; }
.checkout-stagger-group > .checkout-stagger-item:nth-child(4) { animation-delay: 0.19s; }
.checkout-stagger-group > .checkout-stagger-item:nth-child(5) { animation-delay: 0.24s; }
.checkout-stagger-group > .checkout-stagger-item:nth-child(6) { animation-delay: 0.29s; }
.checkout-stagger-group > .checkout-stagger-item:nth-child(7) { animation-delay: 0.34s; }
.checkout-stagger-group > .checkout-stagger-item:nth-child(8) { animation-delay: 0.39s; }

@keyframes checkout-stagger-rise {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.checkout-motion-instant .checkout-stagger-item {
  animation: none !important;
  opacity: 1 !important;
  transform: none !important;
}

.checkout-header-leading {
  min-width: 0;
}

.checkout-header-leading.checkout-header-animate {
  animation: checkout-header-in 0.35s cubic-bezier(0.25, 1, 0.5, 1) both;
}

@keyframes checkout-header-in {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.checkout-payment-details {
  display: flex;
  flex: 1;
  min-height: 0;
  flex-direction: column;
}

/* Method list rows stagger inside the list */
.method-list.checkout-stagger-group {
  gap: 0.5rem;
}

.method-list.checkout-stagger-group > .checkout-stagger-item {
  animation-delay: calc(0.04s + (var(--stagger-i, 0) * 0.05s));
}

@media (prefers-reduced-motion: reduce) {
  .checkout-step-panel,
  .checkout-stagger-item,
  .checkout-header-leading.checkout-header-animate,
  .token-picker-backdrop.checkout-modal-enter,
  .token-picker-sheet.checkout-modal-enter {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
`;var wa={background:"#f4f4f6",foreground:"oklch(0.141 0.005 285.823)",placeholder:"oklch(0.45 0.02 240)",border:"oklch(0.92 0.004 286.32)",icon:"oklch(0.45 0.02 240)"},xa={background:"oklch(0.19 0.03 199)",foreground:"oklch(0.985 0 0)",placeholder:"oklch(0.7 0.02 199)",border:"oklch(1 0 0 / 12%)",icon:"oklch(0.7 0.02 199)"};function Ca(t,e){let o=e==="dark"?xa:wa,a=t?.pickerSearch;return a?{background:a.background?.trim()||o.background,foreground:a.foreground?.trim()||o.foreground,placeholder:a.placeholder?.trim()||o.placeholder,border:a.border?.trim()||o.border,icon:a.icon?.trim()||o.icon}:o}function tn(t,e){let o=Ca(t,e);return`
--picker-search-background: ${o.background};
--picker-search-foreground: ${o.foreground};
--picker-search-placeholder: ${o.placeholder};
--picker-search-border: ${o.border};
--picker-search-icon: ${o.icon};
`.trim()}var rn="https://checkout.morapay.io",Ea={background:"oklch(0.2958 0.049 199.08)",foreground:"oklch(0.9612 0 0)",glassCard:"#ffffff",card:"oklch(1 0 0)",cardForeground:"oklch(0.141 0.005 285.823)",mutedForeground:"oklch(0.45 0.02 240)",primary:"#023436",primaryForeground:"oklch(0.985 0 0)",border:"oklch(0.92 0.004 286.32)",paySurfacePanel:"#f4f4f6",paySurfaceButton:"oklch(1 0 0)",paySurfaceButtonHover:"oklch(0.98 0.006 199)",payFiatRailBorder:"oklch(0.88 0.01 200 / 65%)",payFiatRailBorderHover:"color-mix(in oklch, #023436 38%, oklch(0.92 0.004 286.32))"},Ma={background:"oklch(0.18 0.03 199)",foreground:"oklch(0.985 0 0)",glassCard:"oklch(0.24 0.025 199)",card:"oklch(0.28 0.025 199)",cardForeground:"oklch(0.985 0 0)",mutedForeground:"oklch(0.7 0.02 199)",primary:"#037971",primaryForeground:"oklch(0.985 0 0)",border:"oklch(1 0 0 / 12%)",paySurfacePanel:"oklch(0.19 0.03 199)",paySurfaceButton:"oklch(0.27 0.025 199)",paySurfaceButtonHover:"oklch(0.3 0.025 199)",payFiatRailBorder:"oklch(1 0 0 / 12%)",payFiatRailBorderHover:"oklch(1 0 0 / 18%)"};function Pr(t,e){let o=t?.trim()||e?.trim()||rn;try{return new URL(o).origin}catch{return rn}}function on(t){return`
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap");

@font-face {
  font-family: "PlusJakartaSans-Variable";
  src: url("${t}/font/PlusJakartaSans_Complete/Fonts/WEB/fonts/PlusJakartaSans-Variable.woff2") format("woff2");
  font-weight: 200 800;
  font-display: swap;
  font-style: normal;
}
@font-face {
  font-family: "Alpino-Variable";
  src: url("${t}/font/Alpino_Complete/Fonts/WEB/fonts/Alpino-Variable.woff2") format("woff2");
  font-weight: 100 900;
  font-display: swap;
  font-style: normal;
}
`}function nn(t,e){let o=t?.accentColor?.trim(),a=mo(t?.borderRadius),l=e==="dark"?Ma:Ea;return`
--mp-color-mode: ${e};
--background: ${l.background};
--foreground: ${l.foreground};
--glass-card: ${l.glassCard};
--card: ${l.card};
--card-foreground: ${l.cardForeground};
--muted-foreground: ${l.mutedForeground};
--primary: ${o||l.primary};
--primary-foreground: ${l.primaryForeground};
--border: ${l.border};
--pay-surface-panel: ${l.paySurfacePanel};
--pay-surface-button: ${l.paySurfaceButton};
--pay-surface-button-hover: ${l.paySurfaceButtonHover};
--pay-fiat-rail-border: ${l.payFiatRailBorder};
--pay-fiat-rail-border-hover: ${l.payFiatRailBorderHover};
--checkout-radius: ${a};
${tn(t,e)};
`}function ft(t,e){return`${t.replace(/\/$/,"")}${e.startsWith("/")?e:`/${e}`}`}function qt(t){return`${on(t)}
${So}
${Oo}
${Ho}
${Xo}
${Zo}
${en}`}var Qs=qt("https://checkout.morapay.io");var Pa=`
<svg class="method-icon-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <rect x="3" y="6" width="18" height="13" rx="3" stroke="currentColor" stroke-width="1.5"/>
  <circle cx="16" cy="12.5" r="2" fill="currentColor"/>
  <path d="M7 10h3M7 13h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,Sa=`
<svg class="method-icon-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <rect x="7" y="2.5" width="10" height="19" rx="2.5" stroke="currentColor" stroke-width="1.5"/>
  <circle cx="12" cy="18" r="1" fill="currentColor"/>
  <path d="M10 6h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,Ta=`
<svg class="method-icon-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M3 9.5 12 4l9 5.5v1H3v-1Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M5.5 11v7M9.5 11v7M14.5 11v7M18.5 11v7M3 18h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,_a=`
<svg class="method-icon-svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <rect x="2.5" y="5" width="19" height="14" rx="2.5" stroke="currentColor" stroke-width="1.5"/>
  <path d="M2.5 9.5h19" stroke="currentColor" stroke-width="1.5"/>
  <path d="M6 15h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,an=`
<svg class="method-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="m9 6 6 6-6 6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,sn=[{id:"crypto",title:"Pay with crypto",description:"Pay with BTC, ETH, USDC, and more",icon:Pa},{id:"mobile_money",title:"Mobile money",description:"Approve on your phone",icon:Sa},{id:"bank_transfer",title:"Bank transfer",description:"Pay from any bank of choice",icon:Ta},{id:"card",title:"Credit or Debit Card",description:"Pay with a credit or debit card",icon:_a}];var Aa="morapay-commerce-checkout:",La=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;function Sr(t){return`${Aa}${t.trim().toLowerCase()}`}function Tr(t){if(typeof t!="string")return null;let e=t.trim();return La.test(e)?e:null}function Ra(t){if(typeof t!="string")return null;let e=t.trim();return e.length>=4&&e.length<=128?e:null}function Oa(t){if(typeof window>"u"||!t.trim())return null;try{let e=window.localStorage.getItem(Sr(t));if(!e)return null;let o=JSON.parse(e),a=Tr(o?.checkoutSessionId),l=typeof o?.linkKey=="string"?o.linkKey.trim():"";return!a||l!==t.trim()?null:{linkKey:l,checkoutSessionId:a,updatedAt:typeof o.updatedAt=="string"?o.updatedAt:new Date().toISOString()}}catch{return null}}function ln(t){if(typeof window>"u")return;let e=t.linkKey.trim(),o=Tr(t.checkoutSessionId);if(!(!e||!o))try{window.localStorage.setItem(Sr(e),JSON.stringify({linkKey:e,checkoutSessionId:o,updatedAt:t.updatedAt||new Date().toISOString()}))}catch{}}function _r(t){if(!(typeof window>"u"||!t.trim()))try{window.localStorage.removeItem(Sr(t))}catch{}}function cn(t){return Oa(t)?.checkoutSessionId??null}function dn(t){if(!t||typeof t!="object")return null;let e=t,o=Tr(e.checkoutSessionId);if(!o)return null;let a=e.status;if(a!=="open"&&a!=="awaiting_payment"&&a!=="completed"&&a!=="expired")return null;let l=e.payment?.verifyRef?Ra(e.payment.verifyRef):null;return{checkoutSessionId:o,status:a,expiresAt:typeof e.expiresAt=="string"?e.expiresAt:null,payment:e.payment?{mechanism:e.payment.mechanism==="moolre_ussd"?"moolre_ussd":null,phase:e.payment.phase==="otp"?"otp":e.payment.phase==="approval"?"approval":"none",verifyRef:l,otpRequired:!!e.payment.otpRequired,displayText:typeof e.payment.displayText=="string"?e.payment.displayText.slice(0,500):null,payerPhone:typeof e.payment.payerPhone=="string"&&e.payment.payerPhone.trim().length>=6?e.payment.payerPhone.trim():null,amount:typeof e.payment.amount=="string"&&e.payment.amount.trim()?e.payment.amount.trim():null,currency:typeof e.payment.currency=="string"&&/^[A-Z]{3}$/.test(e.payment.currency.trim().toUpperCase())?e.payment.currency.trim().toUpperCase():null}:null}}function Wt(t){return t.replace(/\/+$/,"")}function xe(t,...e){let o=Wt(t),a=e.map(d=>d.replace(/^\/+|\/+$/g,"")).filter(Boolean).join("/"),l=a?`${o}/${a}`:o;if(/^https?:\/\//i.test(l))return new URL(l).toString();if(typeof window<"u"&&window.location?.origin){let d=l.startsWith("/")?l:`/${l}`;return new URL(d,window.location.origin).toString()}return l}function Ia(t){let e=t.toLowerCase();return e.includes("invalid")&&(e.includes("fromaddress")||e.includes("from address"))?"No rate right now":t.length>72?"Quote unavailable":t}async function un(t,e,o={}){let a=Wt(t),l=new URL(xe(a,"payment-links",encodeURIComponent(e.trim()))),d=o.wallet?.trim();d&&l.searchParams.set("wallet",d);let m=o.checkoutSessionId?.trim();m&&l.searchParams.set("checkoutSessionId",m);let h=await fetch(l.toString(),{method:"GET",credentials:"same-origin"}),k=await h.json();if(!h.ok||k.success===!1)throw new Error(k.error?.trim()||`Payment link not found (${h.status})`);let g=k.data,b=g?.id?.trim()??"";if(!b||!g?.title||!g.businessName)throw new Error("Invalid payment link response.");return{paymentLinkId:b,title:g.title,businessName:g.businessName,businessLogoUrl:g.businessLogoUrl?.trim()||null,businessCountry:(g.businessCountry??"GH").trim().toUpperCase(),amount:g.amount?.trim()?g.amount.trim():null,currency:(g.currency??"USD").trim().toUpperCase(),isOpenAmount:g.type==="open",invoiceKind:g.invoiceKind==="crypto"?"crypto":"fiat",environment:g.environment?.trim().toUpperCase()==="TEST"?"TEST":"LIVE",checkoutResume:dn(g.checkout)}}function $a(t){let e=t.data?.chains??[];return Array.isArray(e)?e.map(o=>{if(!o||typeof o!="object")return null;let a=o,l=String(a.chainId??a.id??"").trim(),d=String(a.name??a.chainName??a.networkName??"").trim();if(!l||!d)return null;let m=String(a.chainIconURI??a.chainIconUri??a.iconUri??"").trim();return{id:String(a.id??l).trim(),chainId:l,name:d,shortName:String(a.shortName??d).trim(),iconUrl:m}}).filter(o=>o!=null):[]}function Ha(t){let e=t.data?.tokens??[];return Array.isArray(e)?e.map(o=>{if(!o||typeof o!="object")return null;let a=o,l=String(a.chainId??"").trim(),d=String(a.symbol??"").trim(),m=String(a.address??a.tokenAddress??"").trim();return!l||!d?null:{id:String(a.id??`${m}-${l}`).trim(),chainId:l,symbol:d.toUpperCase(),name:String(a.name??a.displaySymbol??d).trim(),logoUrl:String(a.logoURI??a.logoUri??"").trim(),address:m}}).filter(o=>o!=null):[]}async function pn(t,e,o){let a=Wt(t),l=new URL(xe(a,"catalog",e));l.searchParams.set("environment",o);let d=await fetch(l.toString(),{method:"GET",credentials:"same-origin"}),m=await d.json();if(!d.ok||m.success===!1)throw new Error(m.error?.trim()||`Catalog ${e} unavailable (${d.status})`);let h=m.data?.selectorFiltered===!0;return e==="chains"?{rows:$a(m),selectorFiltered:h}:{rows:Ha(m),selectorFiltered:h}}async function mn(t,e){let o=await pn(t,"chains",e);return{chains:o.rows,selectorFiltered:o.selectorFiltered}}async function hn(t,e){let o=await pn(t,"tokens",e);return{tokens:o.rows,selectorFiltered:o.selectorFiltered}}async function fn(t,e){let o=Wt(t),a={inputAmount:e.inputAmount.trim(),inputCurrency:e.inputCurrency.trim().toUpperCase(),environment:e.environment??"LIVE"};e.rows?.length&&(a.rows=e.rows);let l=await fetch(xe(o,"quotes","checkout"),{method:"POST",headers:{"Content-Type":"application/json"},credentials:"same-origin",body:JSON.stringify(a)}),d=await l.json();if(!l.ok||d.success===!1)throw new Error(d.error?.trim()||`Quotes unavailable (${l.status})`);return(d.data?.rows??[]).map(h=>{let k=h.id?.trim()??"";if(!k)return null;let{symbol:g,network:b}=pt(k,h.cryptoSymbol??null),L=h.error?.trim()?Ia(h.error.trim()):null,I=!L&&h.cryptoAmount!=null&&String(h.cryptoAmount).trim()!==""?String(h.cryptoAmount).trim():null;return{id:k,symbol:g,network:b,cryptoAmount:I,error:L}}).filter(h=>h!=null)}function Ar(t){return t?.colorMode==="dark"?"dark":"light"}function gn(t){return nn(t,Ar(t))}var Ua="__MORAPAY_WALLET_BRIDGE__",Na="morapay:request-wallet-connect";function Lr(){return typeof window>"u"?!1:window[Ua]===!0}function Rr(){if(typeof window>"u")return;let t={type:"MORAPAY_REQUEST_WALLET"};window.postMessage(t,window.location.origin),window.dispatchEvent(new CustomEvent(Na))}function Fa(t){if(!t||typeof t!="object")return null;let e=t;if(e.type!=="MORAPAY_SET_WALLET")return null;let o=e.payload;if(!o||typeof o!="object")return null;let a="address"in o&&typeof o.address=="string"?o.address.trim():"";return!a.startsWith("0x")||a.length<42?null:a}function yn(t){if(typeof window>"u")return()=>{};let e=o=>{if(o.origin!==window.location.origin)return;let a=Fa(o.data);a&&t(a)};return window.addEventListener("message",e),()=>window.removeEventListener("message",e)}var Ba={USD:"$",GHS:"\u20B5",EUR:"\u20AC",GBP:"\xA3"};function Da(t){let e=t.trim().toUpperCase();if(!e)return"";let o=Ba[e];if(o)return o;try{let a=new Intl.NumberFormat(void 0,{style:"currency",currency:e,currencyDisplay:"narrowSymbol"}).formatToParts(0).find(l=>l.type==="currency");if(a?.value&&a.value.toUpperCase()!==e)return a.value}catch{}return e}function kn(t){let e=t.trim();return e&&e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()}function qa(t){let e=t.trim();if(!e)return"0";let o=e.indexOf("."),a=o===-1?e:e.slice(0,o),l=o!==-1,d=l?e.slice(o+1):null,m=a.replace(/\D/g,""),h=m.length===0?"0":m.replace(/\B(?=(\d{3})+(?!\d))/g,",");return l?`${h}.${d??""}`:h}function bn(t,e){let o=e.trim().toUpperCase(),a=Da(o),l=qa(t),d=(k,g)=>`<span class="amount-char">${k===" "?"&nbsp;":k}</span>`,m=l.split("").map((k,g)=>d(k,`${g}-${k}`)).join(""),h=a?`<span class="amount-char amount-char-symbol">${a}</span>`:"";return`
    <div class="pay-hero-panel">
      <p class="hero-label">Amount ${o}</p>
      <div class="amount-display-row" aria-label="Amount ${l}${a?` ${o}`:""}">
        ${h}
        ${m}
      </div>
    </div>
  `}var vn="We are waiting for you to approve the transaction";function Wa(t){return t.trim().toLowerCase().replace(/[^a-z0-9]+/g," ")}function za(t){return[[{text:t?"You will receive a verification code by SMS. Enter it on this page to continue.":"You will receive an SMS with a one-time code. Enter it on this page to continue."}]]}function ja(t){let e=t.isTest??!1;if(t.phase==="otp")return{title:"Check your phone for a code",steps:za(e)};let o=Wa(t.providerHint);return o.includes("mtn")?{title:"Need help approving?",steps:[[{text:"Dial "},{text:"*170#",emphasis:!0}],[{text:"Choose option "},{text:"6",emphasis:!0}],[{text:"Choose option "},{text:"3",emphasis:!0}],[{text:"Approve the payment from your pending approvals list in the MTN MoMo app."}]]}:o.includes("telecel")||o.includes("vodafone")?{title:"Need help approving?",steps:[[{text:"Dial "},{text:"*110#",emphasis:!0}],[{text:"Open "},{text:"My Telecel",emphasis:!0}],[{text:"Open "},{text:"Pending approvals",emphasis:!0}],[{text:"Approve the payment to complete your purchase."}]]}:o.includes("airteltigo")||o.includes("tigo")||o.includes("atmoney")?{title:"Need help approving?",steps:[[{text:"Dial "},{text:"*110#",emphasis:!0}],[{text:"Open "},{text:"AirtelTigo Money",emphasis:!0}],[{text:"Approve the payment from your pending transactions."}]]}:o.includes("airtel")?{title:"Need help approving?",steps:[[{text:"Open the "},{text:"Airtel Thanks",emphasis:!0},{text:" app"}],[{text:"Or dial "},{text:"*903#",emphasis:!0}],[{text:"Approve the pending payment request on your phone."}]]}:{title:"Need help approving?",steps:[[{text:"Open your mobile money app and look for a pending payment request."}],[{text:"Approve the payment to complete your purchase."}]]}}function Or(t,e,o){let a=ja({providerHint:t,phase:e,isTest:o});return`
    <aside class="momo-instructions" aria-label="Payment instructions">
      <p class="momo-instructions-title">${a.title}</p>
      <ol class="momo-instructions-list">
        ${a.steps.map(l=>`
          <li>${l.map(d=>d.emphasis?`<span class="momo-instructions-emphasis">${d.text}</span>`:`<span>${d.text}</span>`).join("")}</li>`).join("")}
      </ol>
    </aside>
  `}function wn(t,e={}){let{testMode:o=!1,polling:a=!1,verifyingTest:l=!1}=e;return`
    <div class="fiat-bank-panel" role="status" aria-live="polite">
      <p class="fiat-panel-title">${o?"Test bank transfer":"Transfer to this account"}</p>
      <p class="fiat-panel-subtitle">
        Pay exactly <strong>${t.currency} ${t.amount}</strong>
      </p>
      <dl class="fiat-bank-details">
        <div>
          <dt>Bank</dt>
          <dd>${t.institution}</dd>
        </div>
        <div>
          <dt>Account name</dt>
          <dd>${t.account_name}</dd>
        </div>
        <div>
          <dt>Account number</dt>
          <dd class="fiat-mono">${t.account_number}</dd>
        </div>
        <div>
          <dt>Payment reference</dt>
          <dd class="fiat-mono">${t.external_ref}</dd>
        </div>
      </dl>
      ${t.instructions.length>0?`<ul class="fiat-instructions">${t.instructions.map(d=>`<li>${d}</li>`).join("")}</ul>`:""}
      ${o?`<button type="button" class="primary-btn" data-mp-bank-verify-test ${l?"disabled":""}>
              ${l?"Verifying\u2026":"Verify payment"}
            </button>`:a?'<p class="fiat-panel-hint">Waiting for your bank transfer\u2026</p>':""}
    </div>
  `}function xn(t){let{polling:e=!1,providerHint:o="",isTest:a=!1,showInstructions:l=!1,alreadyPaidLoading:d=!1,alreadyPaidMessage:m=null}=t;return`
    <div class="fiat-awaiting-panel" role="status" aria-live="polite" ${e?'aria-busy="true"':""}>
      <p class="fiat-awaiting-title">${vn}</p>
      ${e?'<div class="fiat-awaiting-spinner" aria-label="Waiting for payment approval"></div>':""}
      ${l?`<div class="fiat-awaiting-help">${Or(o,"approval",a)}</div>`:""}
      <div class="fiat-already-paid-wrap">
        <button type="button" class="text-link" data-mp-already-paid ${d?"disabled":""}>
          ${d?"Checking payment\u2026":"I've already paid"}
        </button>
        ${m?`<p class="fiat-already-paid-message" role="status">${m}</p>`:""}
      </div>
    </div>
  `}function Cn(t,e,o){return o?Or(t,"otp",e):""}var En="Could not start payment. Please try again or pay with crypto.";function Mn(t){switch(t){case"PAYMENT_METHOD_REQUIRED":return"Choose how you want to pay (mobile money, bank, or card).";case"FIAT_CHECKOUT_PLATFORM_EMAIL_REQUIRED":case"PAYSTACK_PLATFORM_EMAIL_REQUIRED":return"Card payment isn't available right now. Try another method or pay with crypto.";case"FIAT_QUOTE_REQUIRED":case"PAYSTACK_FIAT_QUOTE_REQUIRED":return"Choose a currency and amount, or pay with crypto instead.";case"FIAT_PROVIDER_NO_ACTIVE_CHANNEL":case"PAYSTACK_NO_ACTIVE_CHANNEL":return"That payment method is temporarily unavailable. Try another option or pay with crypto.";case"PAYMENT_LINK_ALREADY_PAID":return"This payment link has already been used.";case"CUSTOMER_EMAIL_REQUIRED":return"Enter your email before continuing.";case"CUSTOMER_PHONE_REQUIRED":case"INVALID_PHONE":return"Enter a valid mobile number for Ghana or Nigeria.";case"INVALID_OTP":return"That verification code is incorrect. Check the SMS and try again.";default:return null}}function Ga(t){let e=t.bank??{};return{ok:!0,mode:"bank_transfer",paymentMethod:"bank_transfer",transactionId:typeof t.transaction_id=="string"?t.transaction_id:void 0,externalRef:String(t.external_ref??""),amount:String(t.amount??""),currency:String(t.currency??""),bank:{institution:String(e.institution??e.bank_name??"Bank"),account_name:String(e.account_name??e.accountname??""),account_number:String(e.account_number??e.accountno??""),contact_email:typeof e.contact_email=="string"?e.contact_email:void 0},instructions:Array.isArray(t.instructions)?t.instructions.map(o=>String(o)):[]}}async function Pn(t,e,o={}){let a=e.trim();if(!a)return{ok:!1,error:"Missing checkout link code.",code:"CHECKOUT_CODE_REQUIRED"};let l={},d=o.checkoutSessionId?.trim();d&&(l.checkoutSessionId=d);let m=o.payerPhone?.trim();m&&/^[0-9+()\s-]{6,24}$/.test(m)&&(l.payerPhone=m);try{let h=await fetch(xe(t,"payment-links",encodeURIComponent(a),"sessions"),{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},credentials:"same-origin",body:JSON.stringify(l)}),k=await h.json().catch(()=>({}));if(!h.ok||k.success!==!0)return{ok:!1,error:k.error?.trim()||"Could not start checkout session.",code:k.code};let g=k.data?.checkoutSessionId?.trim()||k.data?.checkout?.checkoutSessionId?.trim()||"";if(!g)return{ok:!1,error:"Invalid response from checkout session."};let b=k.data?.expiresAt?.trim();return{ok:!0,checkoutSessionId:g,...b?{expiresAt:b}:{}}}catch{return{ok:!1,error:"Network error creating checkout session."}}}async function Sn(t,e){try{let o=await fetch(xe(t,"commerce","fiat"),{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},credentials:"same-origin",body:JSON.stringify({payment_link_id:e.paymentLinkId.trim(),payer_currency:e.payerCurrency.trim().toUpperCase(),invoice_major:e.invoiceMajor})}),a=await o.json().catch(()=>({}));if(!o.ok||a.success!==!0)return{ok:!1,error:a.error?.trim()||"Fiat conversion unavailable."};let l=a.data?.payerTotalMajor;if(typeof l!="number"||!Number.isFinite(l)||l<=0)return{ok:!1,error:"Fiat quote returned an empty amount."};let d=a.data?.spotPayerMajor;return{ok:!0,payerTotalMajor:l,...typeof d=="number"&&Number.isFinite(d)&&d>0?{spotPayerMajor:d}:{}}}catch{return{ok:!1,error:"Unable to fetch fiat quote right now."}}}async function Tn(t,e){let o=e.email?.trim()??"";if(e.payment_method==="card"&&(!o||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o)))return{ok:!1,error:"Enter a valid email to continue.",code:"CUSTOMER_EMAIL_REQUIRED"};let a=e.payer_phone?.trim();if((e.payment_method==="mobile_money"||e.payment_method==="bank_transfer")&&!a)return{ok:!1,error:"Enter a valid mobile number for Ghana or Nigeria.",code:"CUSTOMER_PHONE_REQUIRED"};let l=e.amount,d=e.currency?.trim();if(l!=null&&Number.isFinite(l)&&l>0&&(!d||!/^[A-Za-z]{3}$/.test(d)))return{ok:!1,error:"Pick a payer currency in checkout before continuing.",code:"FIAT_QUOTE_REQUIRED"};let m={payment_method:e.payment_method,payment_link_id:e.paymentLinkId,callback_url:e.callback_url,...o?{customer_email:o}:{},...e.payer_wallet?.trim()?{payer_wallet:e.payer_wallet.trim()}:{},...e.checkout_session_id?.trim()?{checkout_session_id:e.checkout_session_id.trim()}:{},...l!=null&&Number.isFinite(l)?{amount:l}:{},...d&&/^[A-Za-z]{3}$/.test(d)?{currency:d.toUpperCase()}:{},...e.settlement_crypto_amount!=null&&Number.isFinite(e.settlement_crypto_amount)&&e.settlement_crypto_amount>0?{settlement_crypto_amount:e.settlement_crypto_amount}:{},...e.quote_tier?{quote_tier:e.quote_tier}:{},...a?{payer_phone:a,...e.payment_method==="bank_transfer"?{customer_phone:a}:{}}:{},...e.otp_code?.trim()?{otp_code:e.otp_code.trim()}:{},...e.external_ref?.trim()?{external_ref:e.external_ref.trim()}:{},...e.provider_hint?.trim()?{provider_hint:e.provider_hint.trim()}:{}},h=await fetch(xe(t,"fiat","payments","initialize"),{method:"POST",headers:{"Content-Type":"application/json"},credentials:"same-origin",body:JSON.stringify(m)}),k=await h.json();if(!h.ok||k.success!==!0||!k.data){let X=k.code??((k.detail??k.error??"").toLowerCase().includes("no active channel")?"FIAT_PROVIDER_NO_ACTIVE_CHANNEL":void 0),U=Mn(X);return{ok:!1,code:X,error:U??En,detail:k.detail}}let g=k.data,b=typeof g.fiat_payment_provider=="string"?g.fiat_payment_provider:void 0,L=typeof g.mode=="string"?g.mode:"";if(L==="moolre_bank_transfer"||e.payment_method==="bank_transfer")return Ga(g);let I=typeof g.authorization_url=="string"?g.authorization_url:"";if(I)return{ok:!0,mode:"redirect",authorizationUrl:I,provider:b,paymentMethod:"card"};let _=!!(g.otp_required??g.otpRequired);return L==="moolre_ussd"||b==="moolre"||e.payment_method==="mobile_money"?{ok:!0,mode:"moolre_ussd",paymentMethod:"mobile_money",otpRequired:_,transactionId:typeof g.transaction_id=="string"?g.transaction_id:void 0,moolreId:typeof g.moolre_id=="string"?g.moolre_id:void 0,externalRef:typeof g.external_ref=="string"?g.external_ref:void 0,provider:b??"moolre"}:{ok:!1,error:En,code:"FIAT_PROVIDER_UNAVAILABLE"}}async function zt(t,e,o){let a=encodeURIComponent(e.trim()),l=await fetch(xe(t,"fiat","transactions","verify",a)+`?payment_method=${encodeURIComponent(o)}`,{cache:"no-store",credentials:"same-origin"}),d=await l.json().catch(()=>({}));return!l.ok||d.success!==!0?{ok:!1,error:d.error??"Verification failed."}:{ok:!0,status:d.data?.status??"pending"}}async function _n(t,e){let o=e.trim();if(!o)return{ok:!1,error:"Payment reference is missing.",code:"VALIDATION_ERROR"};let a=await fetch(xe(t,"fiat","payments","test-confirm"),{method:"POST",headers:{"Content-Type":"application/json"},credentials:"same-origin",body:JSON.stringify({external_ref:o})}),l=await a.json().catch(()=>({}));return!a.ok||l.success!==!0?{ok:!1,error:Mn(l.code)??l.error??"Could not verify test payment.",code:l.code}:{ok:!0}}function jt(t){let e=t.trim().toLowerCase();return e==="success"||e==="completed"?"success":e==="failed"?"failed":e==="pending"?"pending":"error"}var Ka=600*1e3,Ya=2e3,Va=3,Gt="morapay:linger-payment-watch";async function Ir(t,e,o){let a=e.trim();if(!a)return"error";let l=await zt(t,a,o);return l.ok?jt(l.status):"error"}function An(){if(typeof window>"u")return null;try{let t=window.sessionStorage.getItem(Gt);if(!t)return null;let e=JSON.parse(t);return!e?.reference?.trim()||!e.paymentMethod||!e.expiresAt?null:Date.now()>=Date.parse(e.expiresAt)?(window.sessionStorage.removeItem(Gt),null):e}catch{return null}}function Ln(t){if(typeof window>"u")return;let e=t.reference.trim();if(!e)return;let o=new Date().toISOString(),a=new Date(Date.now()+Ka).toISOString();try{window.sessionStorage.setItem(Gt,JSON.stringify({...t,reference:e,startedAt:o,expiresAt:a}))}catch{}}function Rn(){if(!(typeof window>"u"))try{window.sessionStorage.removeItem(Gt)}catch{}}async function On(t,e=Va){let o="error";for(let a=0;a<e;a+=1){if(o=await t(),o==="success"||o==="failed")return o;a<e-1&&await new Promise(l=>window.setTimeout(l,Ya))}return o}function Qa(){return`
    <section class="checkout-loading-skeleton" aria-busy="true" aria-label="Loading payment link">
      <div class="skeleton skeleton-hero"></div>
    </section>
  `}function $r(){return`
    <section class="checkout-quote-skeleton" aria-busy="true" aria-label="Loading payment options">
      <div class="skeleton skeleton-quote"></div>
      <div class="skeleton skeleton-quote"></div>
      <div class="skeleton skeleton-quote"></div>
      <div class="skeleton skeleton-method-trigger"></div>
    </section>
  `}function In(){return`
    <div class="checkout-payment-loading">
      ${Qa()}
      ${$r()}
    </div>
  `}function $n(){return`
    <div class="checkout-merchant-header" aria-busy="true" aria-label="Loading merchant">
      <div class="skeleton skeleton-logo"></div>
      <div class="skeleton skeleton-merchant-name"></div>
    </div>
  `}function se(t,e=""){let o=e.trim();return`<div class="checkout-stagger-item${o?` ${o}`:""}">${t}</div>`}function gt(t,e=""){let o=e.trim();return`<div class="checkout-stagger-group${o?` ${o}`:""}">${t}</div>`}function Hn(t,e,o){return`<div class="checkout-step-panel ${e>0?"checkout-step-enter-forward":"checkout-step-enter-back"}${o?"":" checkout-motion-instant"}">${t}</div>`}function Un(t){return`<div class="checkout-step-motion" data-mp-step-motion>${t}</div>`}var or="morapay-checkout-preview-modal",Xa=`
<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="m15 6-6 6 6 6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,Ja=[{id:"base-usdc",symbol:"USDC",network:"Base",amount:"12.45"},{id:"ethereum-eth",symbol:"ETH",network:"Ethereum",amount:"0.0041"}],Za=3e4,Nn=30,es=4e3;function Kt(t,e){return kr(t,e)}function Fn(t){let e=t.trim();return e.length<12?e:`${e.slice(0,6)}\u2026${e.slice(-4)}`}function ts(){var e,o,a,l,d,m,h,k,g,b,L,I,_,X,U,R,K,x,M,P,J,re,Ee,Me,Pe,de,ue,E,S,T,te,ee,N,$,V,oe,Q,D,ke,le,pe,be,Se,at,me,F,H,W,ce,ne,Z,ve,G,Be,Te,De,Xe,Je,qe,we,_e,Ae,Le,Re,We,Ze,ie,ze,et,je,Oe,Ie,n,B,Hr,Ne,Yt,Ur,Bn,Nr,Fr,Dn,qn,Br,Wn,zn,yt,Dr,jn,Vt,Gn,qr,Wr,Kn,Yn,Vn,Qt,zr,Ye,Xt,Qn,Ve,Jt,jr,Zt,Gr,Kr,Xn,Jn,Yr,er,Vr,tr,Zn,Qr,Xr,ei,Jr,kt,ti,ri,oi,bt,Ce,Qe,vt,ni,Zr,ii,ai,si,li,ci,eo,di,ui,pi,mi,hi,fi,gi,ye,yi,to,ki,bi,wt,xt,ro,vi,oo,wi,xi,Ci,Ei,rr,w;if(typeof customElements>"u"||typeof HTMLElement>"u"||customElements.get(or))return;class t extends HTMLElement{constructor(){super();y(this,n);y(this,e);y(this,o,null);y(this,a,"method");y(this,l,"");y(this,d,"GH");y(this,m,"");y(this,h,"");y(this,k,!1);y(this,g,null);y(this,b,!1);y(this,L,"LIVE");y(this,I,[]);y(this,_,[]);y(this,X,!1);y(this,U,new Set);y(this,R,null);y(this,K,null);y(this,x,null);y(this,M,0);y(this,P,[]);y(this,J,[]);y(this,re,!1);y(this,Ee,!1);y(this,Me,null);y(this,Pe,!1);y(this,de,"token");y(this,ue,null);y(this,E,"");y(this,S,null);y(this,T,"");y(this,te,!1);y(this,ee,null);y(this,N,null);y(this,$,"form");y(this,V,"");y(this,oe,"");y(this,Q,"");y(this,D,0);y(this,ke,null);y(this,le,null);y(this,pe,null);y(this,be,null);y(this,Se,null);y(this,at,"fiat");y(this,me,null);y(this,F,null);y(this,H,null);y(this,W,!1);y(this,ce,"");y(this,ne,!1);y(this,Z,null);y(this,ve,"");y(this,G,null);y(this,Be,!1);y(this,Te,!1);y(this,De,null);y(this,Xe,0);y(this,Je,!1);y(this,qe,!1);y(this,we,null);y(this,_e,!1);y(this,Ae,!1);y(this,Le,null);y(this,Re,null);y(this,We,null);y(this,Ze,!1);y(this,ie,1);y(this,ze,null);y(this,et,"merchant");y(this,je,!1);y(this,Oe,!1);y(this,Ie,!1);i(this,e,this.attachShadow({mode:"open"}))}connectedCallback(){s(this,n,rr).call(this)}disconnectedCallback(){var c;s(this,n,Ne).call(this),s(this,n,wt).call(this),s(this,n,Ce).call(this),(c=r(this,be))==null||c.call(this),i(this,be,null)}open(c){i(this,o,c),i(this,l,""),i(this,d,s(this,n,qr).call(this,c.businessCountry)),i(this,m,""),i(this,k,!1),i(this,g,null),i(this,b,!1),i(this,I,[]),i(this,_,[]),i(this,X,!1),i(this,R,null),i(this,K,null),i(this,P,[]),i(this,J,[]),i(this,re,!1),i(this,Ee,!1),i(this,Me,null),i(this,Pe,!1),i(this,de,"token"),i(this,ue,null),i(this,T,c.walletAddress?.trim()??""),i(this,te,!1),i(this,ee,null),i(this,N,null),i(this,$,"form"),i(this,V,""),i(this,oe,""),i(this,Q,""),i(this,D,0),s(this,n,wt).call(this),s(this,n,Jt).call(this),s(this,n,Vr).call(this),i(this,Je,!1),i(this,ze,null),i(this,et,"merchant"),i(this,je,!1),i(this,ie,1),i(this,Ie,!0),i(this,a,c.isOpenAmount?"amount":"method"),s(this,n,Ne).call(this),s(this,n,zr).call(this,!0),s(this,n,jn).call(this),s(this,n,w).call(this),s(this,n,Hr).call(this)}close(){var c,u,p;s(this,n,Ne).call(this),s(this,n,Ce).call(this),(c=r(this,le))==null||c.call(this),i(this,le,null),(u=r(this,pe))==null||u.call(this),i(this,pe,null),(p=r(this,be))==null||p.call(this),i(this,be,null),r(this,o)?.onClose?.(),i(this,o,null),s(this,n,rr).call(this),s(this,n,zr).call(this,!1)}setWalletAddress(c){r(this,o)&&s(this,n,Vt).call(this,c)}}e=new WeakMap,o=new WeakMap,a=new WeakMap,l=new WeakMap,d=new WeakMap,m=new WeakMap,h=new WeakMap,k=new WeakMap,g=new WeakMap,b=new WeakMap,L=new WeakMap,I=new WeakMap,_=new WeakMap,X=new WeakMap,U=new WeakMap,R=new WeakMap,K=new WeakMap,x=new WeakMap,M=new WeakMap,P=new WeakMap,J=new WeakMap,re=new WeakMap,Ee=new WeakMap,Me=new WeakMap,Pe=new WeakMap,de=new WeakMap,ue=new WeakMap,E=new WeakMap,S=new WeakMap,T=new WeakMap,te=new WeakMap,ee=new WeakMap,N=new WeakMap,$=new WeakMap,V=new WeakMap,oe=new WeakMap,Q=new WeakMap,D=new WeakMap,ke=new WeakMap,le=new WeakMap,pe=new WeakMap,be=new WeakMap,Se=new WeakMap,at=new WeakMap,me=new WeakMap,F=new WeakMap,H=new WeakMap,W=new WeakMap,ce=new WeakMap,ne=new WeakMap,Z=new WeakMap,ve=new WeakMap,G=new WeakMap,Be=new WeakMap,Te=new WeakMap,De=new WeakMap,Xe=new WeakMap,Je=new WeakMap,qe=new WeakMap,we=new WeakMap,_e=new WeakMap,Ae=new WeakMap,Le=new WeakMap,Re=new WeakMap,We=new WeakMap,Ze=new WeakMap,ie=new WeakMap,ze=new WeakMap,et=new WeakMap,je=new WeakMap,Oe=new WeakMap,Ie=new WeakMap,n=new WeakSet,B=function(){let c=r(this,o);if(!c)return!1;let u=c.publicCode?.trim(),p=c.apiBaseUrl?.trim();return!!u&&!!p},Hr=async function(){if(!s(this,n,B).call(this)||!r(this,o))return;let c=r(this,o).publicCode.trim(),u=r(this,o).apiBaseUrl.trim(),p=r(this,b);i(this,k,!0),i(this,g,null),s(this,n,w).call(this);try{let f=c,C=cn(f),v=await un(u,c,{wallet:r(this,T)||null,checkoutSessionId:C});if(!r(this,o))return;i(this,o,{...r(this,o),businessName:v.businessName,businessLogoUrl:v.businessLogoUrl??r(this,o).businessLogoUrl??null,linkTitle:v.title,amount:v.isOpenAmount?null:v.amount,currency:v.currency,isOpenAmount:v.isOpenAmount,businessCountry:v.businessCountry}),i(this,Se,v.paymentLinkId),i(this,at,v.invoiceKind),i(this,d,s(this,n,qr).call(this,v.businessCountry)),i(this,L,v.environment),!p&&v.isOpenAmount&&i(this,a,"amount"),i(this,b,!0),i(this,g,null),!r(this,Je)&&v.checkoutResume&&s(this,n,Xn).call(this,v.checkoutResume,f),s(this,n,Jn).call(this)}catch(f){i(this,g,f instanceof Error?f.message:"Could not load payment link")}finally{i(this,k,!1),s(this,n,w).call(this)}},Ne=function(){r(this,x)!=null&&(clearInterval(r(this,x)),i(this,x,null)),i(this,M,r(this,M)+1)},Yt=function(){i(this,Pe,!1),i(this,de,"token"),i(this,ue,null),i(this,E,""),r(this,S)&&(clearTimeout(r(this,S)),i(this,S,null))},Ur=async function(){if(!(!s(this,n,B).call(this)||!r(this,o)||r(this,Ee)||r(this,re))){i(this,re,!0),i(this,Me,null),r(this,Pe)&&s(this,n,w).call(this);try{let c=r(this,o).apiBaseUrl.trim(),[u,p]=await Promise.all([mn(c,r(this,L)),hn(c,r(this,L))]);if(!r(this,o))return;let f=u.selectorFiltered&&p.selectorFiltered;i(this,P,f?u.chains:Mo(u.chains,r(this,L))),i(this,J,f?p.tokens:Po(p.tokens,r(this,L))),i(this,Ee,!0),i(this,Me,null)}catch(c){i(this,Me,c instanceof Error?c.message:"Could not load tokens")}finally{i(this,re,!1),r(this,o)&&s(this,n,w).call(this)}}},Bn=function(){i(this,Pe,!0),i(this,Oe,!0),i(this,de,"token"),i(this,ue,null),s(this,n,w).call(this),s(this,n,Ur).call(this),s(this,n,Nr).call(this)},Nr=function(){if(!r(this,Oe))return;let c=r(this,e).querySelector(".token-picker-sheet");if(!c){i(this,Oe,!1);return}c.classList.remove("token-picker-sheet-open"),requestAnimationFrame(()=>{requestAnimationFrame(()=>{c.classList.add("token-picker-sheet-open"),i(this,Oe,!1)})})},Fr=function(){let c=r(this,o);if(!c)return!1;let u=rt(c.presentation,c.customization);return St(u)},Dn=function(){return r(this,Ie)?s(this,n,Fr).call(this)?{backdrop:"shell-backdrop-prep",shell:"shell-sheet-prep shell-sheet-motion"}:{backdrop:"shell-backdrop-prep",shell:"shell-modal-prep"}:{backdrop:"",shell:""}},qn=function(){if(!r(this,Ie))return;let c=r(this,e).querySelector("[data-mp-preview-backdrop]"),u=r(this,e).querySelector(".shell");if(!c||!u){i(this,Ie,!1);return}let p=s(this,n,Fr).call(this);c.classList.remove("shell-backdrop-open"),u.classList.remove("shell-sheet-open","shell-modal-open"),requestAnimationFrame(()=>{requestAnimationFrame(()=>{c.classList.add("shell-backdrop-open"),p?u.classList.add("shell-sheet-open"):u.classList.add("shell-modal-open"),i(this,Ie,!1)})})},Br=function(){let c=r(this,I).slice(0,4).map(f=>f.id),u=r(this,_).length>0?r(this,_):c,p=new Map(r(this,I).map(f=>[f.id,f]));return u.map(f=>{let C=p.get(f);return C||(r(this,J).length===0?null:Yo(f,r(this,J),r(this,P)))}).filter(f=>f!=null)},Wn=function(c){let u=r(this,J).find(q=>q.id===c);if(!u)return;let p=ht(r(this,P),u);if(!p)return;let f=mt(p.name,u.symbol),C=r(this,_).length>0?r(this,_):r(this,I).map(q=>q.id),v=new Set(C);i(this,_,Ko(f,C));let O=r(this,_).filter(q=>!v.has(q)),z=C.slice(0,4).length;i(this,K,f),s(this,n,Yt).call(this),r(this,o)?.onTokenSelect?.(f),s(this,n,w).call(this),O.length===1&&r(this,_).length===z?s(this,n,yt).call(this,{onlyRowIds:O}):s(this,n,yt).call(this)},zn=function(){s(this,n,Ne).call(this),s(this,n,yt).call(this),i(this,x,setInterval(()=>{s(this,n,yt).call(this)},Za))},yt=async function(c){if(!s(this,n,B).call(this)||!r(this,o)||r(this,a)!=="crypto")return;let u=s(this,n,Dr).call(this);if(!u){i(this,R,"Enter a valid amount first."),i(this,I,[]),s(this,n,w).call(this);return}let p=c?.onlyRowIds?.filter(v=>v.trim().length>0)??[],f=p.length>0,C=++ar(this,M)._;if(i(this,X,!f&&r(this,I).length===0),f)for(let v of p)r(this,U).add(v);else r(this,U).clear();i(this,R,null),s(this,n,w).call(this);try{let v=f&&r(this,_).length>0?p:r(this,_).length>0?r(this,_):void 0,O=v&&r(this,J).length>0?Mr(v,r(this,J),r(this,P)):void 0,z=await fn(r(this,o).apiBaseUrl.trim(),{inputAmount:u,inputCurrency:s(this,n,Ye).call(this),environment:r(this,L),...O?.length?{rows:O}:{}});if(C!==r(this,M)||!r(this,o))return;if(f){let q=new Map(r(this,I).map(Y=>[Y.id,Y]));for(let Y of z)q.set(Y.id,Y);i(this,I,Array.from(q.values()))}else i(this,I,z),r(this,_).length===0&&z.length>0&&i(this,_,z.slice(0,4).map(q=>q.id));r(this,K)&&!s(this,n,Br).call(this).some(q=>q.id===r(this,K))&&i(this,K,null),i(this,R,!f&&z.length===0?"No tokens available for this amount.":null)}catch(v){if(C!==r(this,M))return;f||(i(this,R,v instanceof Error?v.message:"Quotes unavailable"),i(this,I,[]))}finally{if(C===r(this,M)){if(i(this,X,!1),f)for(let v of p)r(this,U).delete(v);else r(this,U).clear();s(this,n,w).call(this)}}},Dr=function(){if(r(this,o)?.isOpenAmount){let u=Number.parseFloat(r(this,l).trim());return!Number.isFinite(u)||u<=0?null:r(this,l).trim()}return s(this,n,Xt).call(this)},jn=function(){var c;(c=r(this,be))==null||c.call(this),i(this,be,yn(u=>{s(this,n,Vt).call(this,u)}))},Vt=function(c){let u=c.trim();!u.startsWith("0x")||u.length<42||(i(this,T,u),i(this,te,!1),i(this,ee,null),r(this,o)?.onWalletConnected?.(u),s(this,n,B).call(this)&&s(this,n,Hr).call(this),s(this,n,w).call(this))},Gn=async function(){if(i(this,ee,null),Lr()||r(this,o)?.onRequestWalletConnect){r(this,o)?.onRequestWalletConnect?.(),Rr();return}i(this,te,!0),s(this,n,w).call(this);try{let c=Tt();if(c.length===0)throw new Error("Connect a wallet to pay with crypto.");let u=await _t(c[0].provider);s(this,n,Vt).call(this,u)}catch(c){i(this,ee,c instanceof Error?c.message:"Wallet connection failed"),i(this,te,!1),s(this,n,w).call(this)}},qr=function(c){let u=c?.trim().toUpperCase(),p=s(this,n,B).call(this)?gr:dt;return u&&p.some(f=>f.iso===u)?u:p[0]?.iso??"GH"},Wr=function(){return s(this,n,B).call(this)?gr:dt},Kn=function(){return!!(r(this,a)==="crypto"||r(this,a)==="fiat"||r(this,a)==="method"&&r(this,o)?.isOpenAmount&&s(this,n,Ve).call(this))},Yn=function(){s(this,n,Qr).call(this,()=>s(this,n,Vn).call(this))},Vn=function(){if(i(this,ie,-1),r(this,a)==="crypto"){s(this,n,Ne).call(this),i(this,a,"method"),s(this,n,w).call(this);return}if(r(this,a)==="fiat"){if(r(this,$)==="otp"||r(this,$)==="awaiting"){i(this,$,"form"),i(this,Q,""),s(this,n,Ce).call(this),i(this,we,null),s(this,n,w).call(this);return}if(r(this,G)){i(this,G,null),s(this,n,Ce).call(this),s(this,n,w).call(this);return}s(this,n,Jt).call(this),i(this,N,null),i(this,$,"form"),i(this,V,""),i(this,a,"method"),s(this,n,w).call(this);return}r(this,a)==="method"&&r(this,o)?.isOpenAmount&&(i(this,a,"amount"),s(this,n,Ne).call(this),s(this,n,w).call(this))},Qt=function(c=!1){let u=Ot(r(this,d));if(u.length===0){i(this,V,"");return}!c&&r(this,V)&&u.some(f=>f.providerHint===r(this,V))||i(this,V,yr(r(this,d),r(this,m)))},zr=function(c){if(!(typeof document>"u")){if(c){i(this,h,document.body.style.overflow),document.body.style.overflow="hidden";return}document.body.style.overflow=r(this,h)}},Ye=function(){return(r(this,o)?.currency??"USD").trim().toUpperCase()},Xt=function(){return r(this,o)?.amount?.trim()||null},Qn=function(){let c=s(this,n,Ye).call(this);if(r(this,o)?.isOpenAmount){let p=Number.parseFloat(r(this,l).trim());return Number.isFinite(p)&&p>0?`${r(this,l).trim()} ${c}`:`0.00 ${c}`}let u=s(this,n,Xt).call(this);return u?`${u} ${c}`:`\u2014 ${c}`},Ve=function(){if(r(this,k)||r(this,g))return!1;if(!r(this,o)?.isOpenAmount)return!0;let c=Number.parseFloat(r(this,l).trim());return Number.isFinite(c)&&c>0},Jt=function(){s(this,n,Ce).call(this),i(this,me,null),i(this,F,null),i(this,H,null),i(this,W,!1),i(this,ce,""),i(this,ne,!1),i(this,Z,null),i(this,ve,""),i(this,G,null),i(this,Be,!1),i(this,Te,!1),i(this,we,null),i(this,qe,!1),i(this,Xe,r(this,Xe)+1)},jr=function(){return r(this,o)?.publicCode?.trim()||null},Zt=function(){return r(this,V)||yr(r(this,d),r(this,m))||""},Gr=function(){let c=r(this,d).trim().toUpperCase();return c==="GH"||c==="NG"},Kr=function(c){let u=s(this,n,jr).call(this);u&&ln({linkKey:u,checkoutSessionId:c,updatedAt:new Date().toISOString()})},Xn=function(c,u){if(i(this,Je,!0),c.status==="completed"||c.status==="expired"){_r(u);return}i(this,me,c.checkoutSessionId),s(this,n,Kr).call(this,c.checkoutSessionId);let p=c.payment,f=p?.verifyRef?.trim();if(!f)return;let C=p?.payerPhone?_o(p.payerPhone):null;if(C){i(this,d,C.countryIso),i(this,m,C.nationalPhone);let fe=$t(C.countryIso);fe&&i(this,ve,fe)}else p?.currency&&i(this,ve,p.currency);let v=p?.amount?Number.parseFloat(p.amount):NaN,O=s(this,n,kt).call(this)??NaN,z=Number.isFinite(v)&&v>0?v:Number.isFinite(O)&&O>0?O:0,q=p?.currency?.trim().toUpperCase()||r(this,ve)||$t(r(this,d))||"",Y=C?br(C.countryIso,C.nationalPhone):p?.payerPhone||"";z>0&&i(this,ce,String(z)),i(this,F,{checkoutSessionId:c.checkoutSessionId,amount:z,currency:q,payerPhone:Y,providerHint:s(this,n,Zt).call(this),externalRef:f});let he=p?.otpRequired??p?.phase==="otp";i(this,N,"mobile_money"),i(this,a,"fiat"),i(this,$,he?"otp":"awaiting"),he||s(this,n,Qe).call(this,f,"mobile_money"),i(this,je,!0)},Jn=function(){if(!s(this,n,B).call(this)||!r(this,o)?.apiBaseUrl)return;let c=An();if(c?.reference?.trim()){if(c.paymentMethod==="mobile_money"){i(this,N,"mobile_money"),i(this,a,"fiat"),i(this,$,"awaiting"),s(this,n,Qe).call(this,c.reference.trim(),"mobile_money");return}c.paymentMethod==="bank_transfer"&&(i(this,N,"bank_transfer"),i(this,a,"fiat"),s(this,n,Qe).call(this,c.reference.trim(),"bank_transfer"))}},Yr=async function(){if(!r(this,o)?.apiBaseUrl)return"error";let c=r(this,o).apiBaseUrl.trim();if(r(this,$)==="awaiting"&&r(this,N)==="mobile_money"){let p=r(this,F)?.externalRef?.trim()||r(this,me)?.trim()||"";if(p)return Ir(c,p,"mobile_money")}let u=r(this,G)?.external_ref?.trim();return u?Ir(c,u,"bank_transfer"):"error"},er=function(){s(this,n,Vr).call(this),s(this,n,w).call(this)},Vr=function(){i(this,_e,!1),i(this,Ae,!1),i(this,Le,null),i(this,Re,null),i(this,We,null)},tr=function(c,u){if(!Dt(c)&&c!=="momo_otp"&&c!=="wallet_pending"){u();return}if(Dt(c)){i(this,We,u),i(this,_e,!0),i(this,Ae,!0),i(this,Le,c),i(this,Re,null),s(this,n,w).call(this),s(this,n,Yr).call(this).then(p=>{if(r(this,_e)){if(p==="success"){let f=r(this,F)?.externalRef?.trim()||r(this,G)?.external_ref?.trim()||"",C=r(this,G)!=null?"bank_transfer":"mobile_money";f&&s(this,n,vt).call(this,f,C),s(this,n,er).call(this);return}i(this,Ae,!1),i(this,Re,p),s(this,n,w).call(this)}});return}i(this,We,u),i(this,_e,!0),i(this,Ae,!1),i(this,Le,c),i(this,Re,null),s(this,n,w).call(this)},Zn=function(){let c=r(this,Le),u=r(this,We);if(c&&Dt(c)){let p=r(this,F)?.externalRef?.trim()||r(this,G)?.external_ref?.trim()||"";p&&Ln({reference:p,paymentMethod:c==="bank_transfer"?"bank_transfer":"mobile_money",kind:"commerce"})}s(this,n,er).call(this),u?.()},Qr=function(c){if(r(this,$)==="awaiting"&&r(this,N)==="mobile_money"){s(this,n,tr).call(this,"momo_approval",c);return}if(r(this,$)==="otp"&&r(this,N)==="mobile_money"){s(this,n,tr).call(this,"momo_otp",c);return}if(r(this,G)){s(this,n,tr).call(this,"bank_transfer",c);return}c()},Xr=function(){s(this,n,Qr).call(this,()=>this.close())},ei=async function(){if(s(this,n,B).call(this)){i(this,qe,!0),i(this,we,null),s(this,n,w).call(this);try{let c=await On(()=>s(this,n,Yr).call(this));if(c==="success"){let u=r(this,F)?.externalRef?.trim()||r(this,G)?.external_ref?.trim()||"",p=r(this,G)!=null?"bank_transfer":"mobile_money";u&&s(this,n,vt).call(this,u,p);return}if(c==="failed"){i(this,we,"This payment was not completed. Approve the prompt on your phone or try again.");return}i(this,we,"We still do not see a completed payment. Keep this page open. We will keep checking for a few minutes.")}finally{i(this,qe,!1),s(this,n,w).call(this)}}},Jr=function(c){return c==="card"?s(this,n,Ye).call(this):$t(r(this,d))??s(this,n,Ye).call(this)},kt=function(){let c=s(this,n,Dr).call(this);if(!c)return null;let u=Number.parseFloat(c);return Number.isFinite(u)&&u>0?u:null},ti=function(c){return`${r(this,o)?.checkoutBaseUrl?.trim().replace(/\/+$/,"")||"https://checkout.morapay.io"}/payment/return?payment_method=${encodeURIComponent(c)}`},ri=async function(c){if(!s(this,n,B).call(this)||!r(this,o)?.apiBaseUrl||!r(this,Se))return;let u=s(this,n,Jr).call(this,c);i(this,ve,u);let p=s(this,n,Ye).call(this),f=s(this,n,kt).call(this);if(!f){i(this,Z,"Enter a valid amount first."),i(this,ce,"");return}if(p===u){i(this,ce,String(f)),i(this,Z,null),i(this,ne,!1);return}let C=++ar(this,Xe)._;i(this,ne,!0),i(this,Z,null),i(this,ce,""),s(this,n,w).call(this);let v=await Sn(r(this,o).apiBaseUrl.trim(),{paymentLinkId:r(this,Se),payerCurrency:u,invoiceMajor:f});if(C===r(this,Xe)){if(i(this,ne,!1),!v.ok){i(this,Z,v.error),s(this,n,w).call(this);return}i(this,ce,String(v.payerTotalMajor)),i(this,Z,null),s(this,n,w).call(this)}},oi=async function(c){if(!s(this,n,B).call(this)||!r(this,o)?.apiBaseUrl||!r(this,o).publicCode)return i(this,H,"Payment link is not available."),null;if(r(this,me))return r(this,me);let u=await Pn(r(this,o).apiBaseUrl.trim(),r(this,o).publicCode.trim(),{checkoutSessionId:r(this,me)??void 0,payerPhone:c});return u.ok?(i(this,me,u.checkoutSessionId),s(this,n,Kr).call(this,u.checkoutSessionId),u.checkoutSessionId):(i(this,H,u.error),null)},bt=async function(c,u){let p=r(this,N);if(!p)return{ok:!1,error:"Choose how you want to pay."};if(!s(this,n,B).call(this)||!r(this,o)?.apiBaseUrl||!r(this,Se))return{ok:!1,error:"Payment link is not available."};if(r(this,ne))return{ok:!1,error:"Fiat quote is still loading. Please wait."};if(r(this,Z))return{ok:!1,error:r(this,Z)};let f=r(this,ve).trim()||r(this,F)?.currency||s(this,n,Jr).call(this,p),C=Number.parseFloat(r(this,ce));if((!Number.isFinite(C)||C<=0)&&(C=r(this,F)?.amount??s(this,n,kt).call(this)??NaN),!Number.isFinite(C)||C<=0)return{ok:!1,error:"Fiat quote is unavailable. Choose another currency."};let v=p==="mobile_money",O=p==="bank_transfer",z=p==="card",q=v||O?br(r(this,d),r(this,m))||r(this,F)?.payerPhone:void 0;if((v||O)&&!q)return{ok:!1,error:"Enter a valid mobile number for Ghana or Nigeria."};let Y=await s(this,n,oi).call(this,q);if((v||O)&&!Y)return{ok:!1,error:r(this,H)??"Could not start checkout session."};let he=r(this,V)||r(this,F)?.providerHint||"";v&&q&&Y&&i(this,F,{checkoutSessionId:u?.trim()||Y,amount:C,currency:f,payerPhone:q,providerHint:he,externalRef:r(this,F)?.externalRef});let fe=r(this,at)==="crypto"?s(this,n,kt).call(this):null;return{ok:!0,result:await Tn(r(this,o).apiBaseUrl.trim(),{payment_method:p,...z&&r(this,oe).trim()?{email:r(this,oe).trim()}:{},...r(this,T)?{payer_wallet:r(this,T)}:{},paymentLinkId:r(this,Se),checkout_session_id:u?.trim()||Y||void 0,amount:C,currency:f,callback_url:s(this,n,ti).call(this,p),quote_tier:p==="mobile_money"?"mobile_money":p==="bank_transfer"?"bank_transfer":"card_local",...fe!=null&&fe>0?{settlement_crypto_amount:fe}:{},...v||O?{payer_phone:q,...v?{provider_hint:he,...c?.trim()?{otp_code:c.trim()}:{},...c?.trim()&&r(this,F)?.externalRef?{external_ref:r(this,F).externalRef}:{}}:{}}:{}}),checkoutSessionId:u?.trim()||Y}},Ce=function(){r(this,De)!=null&&(clearInterval(r(this,De)),i(this,De,null)),i(this,Te,!1)},Qe=function(c,u){if(!s(this,n,B).call(this)||!r(this,o)?.apiBaseUrl)return;let p=c.trim();if(!p)return;s(this,n,Ce).call(this),i(this,Te,!0),s(this,n,w).call(this);let f=r(this,o).apiBaseUrl.trim(),C=async()=>{let v=await zt(f,p,u);if(!r(this,o)||!v.ok)return;let O=jt(v.status);if(O==="success"){s(this,n,vt).call(this,p,u);return}O==="failed"&&(s(this,n,Ce).call(this),i(this,H,"Payment was not completed. Try again or choose another method."),i(this,G,null),i(this,$,"form"),s(this,n,w).call(this))};C(),i(this,De,setInterval(()=>{C()},es))},vt=function(c,u){s(this,n,Ce).call(this),Rn();let p=s(this,n,jr).call(this);p&&_r(p),r(this,o)?.onSuccess?.({reference:c,paymentMethod:u}),this.close()},ni=async function(){if(Kt(r(this,d),r(this,m))){if(!s(this,n,B).call(this)){i(this,ie,1),i(this,$,"otp"),i(this,Q,""),s(this,n,xt).call(this),s(this,n,w).call(this);return}i(this,W,!0),i(this,H,null),s(this,n,w).call(this);try{let c=await s(this,n,bt).call(this);if(!c.ok){i(this,H,c.error);return}let{result:u}=c;if(!u.ok){i(this,H,u.error);return}if(u.mode!=="moolre_ussd"){i(this,H,"Could not start mobile money payment.");return}if(u.externalRef?.trim()&&r(this,F)&&i(this,F,{...r(this,F),externalRef:u.externalRef.trim()}),u.otpRequired){i(this,ie,1),i(this,$,"otp"),i(this,Q,""),s(this,n,xt).call(this);return}let p=u.externalRef?.trim()||u.transactionId?.trim()||c.checkoutSessionId||"";i(this,ie,1),i(this,$,"awaiting"),s(this,n,Qe).call(this,p,"mobile_money")}finally{i(this,W,!1),s(this,n,w).call(this)}}},Zr=async function(c){let u=(c??r(this,Q)).replace(/\D/g,"");if(!(u.length<4)&&s(this,n,B).call(this)){i(this,W,!0),i(this,H,null),s(this,n,w).call(this);try{let p=await s(this,n,bt).call(this,u,r(this,F)?.checkoutSessionId);if(!p.ok){i(this,H,p.error);return}let{result:f}=p;if(!f.ok){i(this,H,f.error);return}if(f.mode==="moolre_ussd"&&f.otpRequired){i(this,H,"OTP was not accepted. Check the code and try again.");return}if(f.mode!=="moolre_ussd"){i(this,H,"Could not verify OTP.");return}let C=f.externalRef?.trim()||f.transactionId?.trim()||p.checkoutSessionId||"";i(this,ie,1),i(this,$,"awaiting"),s(this,n,Qe).call(this,C,"mobile_money")}finally{i(this,W,!1),s(this,n,w).call(this)}}},ii=async function(){if(!(r(this,D)>0||!r(this,F))){i(this,H,null),i(this,W,!0),s(this,n,w).call(this);try{let c=await s(this,n,bt).call(this,void 0,r(this,F).checkoutSessionId);if(!c.ok){i(this,H,c.error);return}let{result:u}=c;if(!u.ok){i(this,H,u.error);return}if(u.mode!=="moolre_ussd"||!u.otpRequired){i(this,H,"Could not resend OTP. Try again or choose another payment method.");return}u.externalRef?.trim()&&i(this,F,{...r(this,F),externalRef:u.externalRef.trim()}),i(this,Q,""),s(this,n,xt).call(this)}finally{i(this,W,!1),s(this,n,w).call(this)}}},ai=async function(){let c=r(this,N);if(!(!c||c==="mobile_money")&&s(this,n,B).call(this)){i(this,W,!0),i(this,H,null),i(this,G,null),s(this,n,w).call(this);try{let u=await s(this,n,bt).call(this);if(!u.ok){i(this,H,u.error);return}let{result:p}=u;if(!p.ok){i(this,H,p.error);return}if(p.mode==="bank_transfer"){i(this,G,{institution:p.bank.institution,account_name:p.bank.account_name,account_number:p.bank.account_number,contact_email:p.bank.contact_email,amount:p.amount||r(this,ce).trim(),currency:p.currency,external_ref:p.externalRef,instructions:p.instructions}),s(this,n,Qe).call(this,p.externalRef,"bank_transfer");return}if(p.mode==="redirect"){window.location.href=p.authorizationUrl;return}}finally{i(this,W,!1),s(this,n,w).call(this)}}},si=async function(){if(!(!r(this,G)?.external_ref.trim()||!r(this,o)?.apiBaseUrl)){i(this,Be,!0),i(this,H,null),s(this,n,w).call(this);try{let c=await _n(r(this,o).apiBaseUrl.trim(),r(this,G).external_ref);if(!c.ok){i(this,H,c.error);return}s(this,n,vt).call(this,r(this,G).external_ref.trim(),"bank_transfer")}finally{i(this,Be,!1),s(this,n,w).call(this)}}},li=function(){let c=ot(r(this,d))??s(this,n,Wr).call(this)[0],u=r(this,e).querySelector("[data-mp-phone]");u&&(u.placeholder=c.phonePlaceholder),wr(r(this,e),r(this,d)),s(this,n,Qt).call(this)},ci=function(){var c;(c=r(this,pe))==null||c.call(this),i(this,pe,null),r(this,e).querySelector("[data-mp-country-picker]")&&i(this,pe,Ro(r(this,e),u=>{i(this,d,u),i(this,V,""),s(this,n,li).call(this),s(this,n,w).call(this)}))},eo=function(c,u,p,f,C,v,O,z=!1,q=!1){let Y=p.trim()?`${u} \xB7 ${p}`:u,he=q?'<div class="quote-skeleton quote-amount-skeleton" aria-hidden="true"></div>':`<p class="quote-amount">${f}${C?` <span class="quote-amount-symbol">${C}</span>`:""}</p>`;return`
      <li>
        <button
          type="button"
          class="quote-row ${O?"selected":""}"
          data-mp-quote-row="${c}"
          role="option"
          aria-selected="${O}"
          aria-label="${Y}"
          ${z?"disabled":""}
        >
          <div class="quote-row-inner">
            <div class="quote-left">
              ${Do(c,u)}
              <div class="quote-copy">
                <p class="quote-symbol" title="${Y}">${Y}</p>
                <p class="quote-balance-label">Balance</p>
                <p class="quote-balance">\u2014</p>
              </div>
            </div>
            <div class="quote-right">
              ${he}
              <p class="quote-invoice">${v}</p>
            </div>
          </div>
        </button>
      </li>
    `},di=function(){let c=s(this,n,Qn).call(this);if(s(this,n,B).call(this)){let u=s(this,n,Br).call(this);if(r(this,X)&&u.length===0)return $r();if(r(this,R)&&u.length===0)return`<p class="inline-error">${r(this,R)}</p>`;let p=r(this,Ee)?r(this,J).length:0;return`
        <ul class="quote-list" role="listbox" aria-label="Pay with crypto">
          ${u.map(f=>{let C=r(this,K)===f.id,v=r(this,U).has(f.id)||f.cryptoAmount==null&&!f.error&&r(this,X),O=f.cryptoAmount??"\u2014";return s(this,n,eo).call(this,f.id,f.symbol,f.network,O,f.symbol,c,C,!f.cryptoAmount&&!f.error,v)}).join("")}
        </ul>
        ${Vo(p,r(this,re)&&!r(this,Ee))}
        ${r(this,R)&&u.length>0?`<p class="inline-hint">${r(this,R)}</p>`:""}
      `}return`
      <ul class="quote-list">
        ${Ja.map(u=>s(this,n,eo).call(this,u.id,u.symbol,u.network,u.amount,u.symbol,c,!1)).join("")}
      </ul>
    `},ui=function(){if(!s(this,n,B).call(this)||r(this,a)!=="crypto")return"";let c=Go(r(this,J),r(this,P),r(this,L));return Qo({open:r(this,Pe)&&!r(this,Oe),step:r(this,de),environment:r(this,L),loading:r(this,re),error:r(this,Me),symbolGroups:c,selectedSymbol:r(this,ue),chains:r(this,P),searchQuery:r(this,E)})},pi=function(){return r(this,T)?`
      <div class="wallet-bar connected">
        <span class="wallet-addr" title="${r(this,T)}">${Fn(r(this,T))}</span>
        <button type="button" class="wallet-change" data-mp-wallet-change>Change</button>
      </div>
    `:""},mi=function(c){return`
      <div class="checkout-merchant-copy">
        <p class="checkout-merchant-name">${kn(c.businessName)}</p>
      </div>
    `},hi=function(c,u){return u&&c.businessLogoUrl?`<img class="checkout-merchant-logo" src="${c.businessLogoUrl}" alt="" />`:""},fi=function(c,u){if(c==="mobile_money"){let p=ft(u,"/illustrations/momo.png"),f=ft(u,"/payment-providers/mtn.svg");return`<span class="rail-icon-frame"><img class="rail-illustration" src="${p}" data-mp-rail-fallback="${f}" alt="" /></span>`}return c==="card"?`<span class="rail-icon-frame"><img class="rail-illustration" src="${ft(u,"/illustrations/card.png")}" alt="" /></span>`:c==="bank_transfer"?`
        <span class="rail-icon-frame">
          <span class="rail-icon-bank" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <path d="M4 10h16M6 10V18M10 10V18M14 10V18M18 10V18" stroke="white" stroke-width="1.75" stroke-linecap="round"/>
              <path d="M2 10 12 5l10 5" stroke="white" stroke-width="1.75" stroke-linejoin="round"/>
            </svg>
          </span>
        </span>
      `:Bo()},gi=function(c){let u=r(this,k)&&s(this,n,B).call(this),p=r(this,T)?Fn(r(this,T)):r(this,te)?"Connecting\u2026":"Link wallet to pay",f=r(this,T)?"checkout-wallet-connected":"checkout-wallet-connect",C=s(this,n,Kn).call(this)&&!u,v=u?"loading":C?"back":"merchant",O=v!==r(this,et);i(this,et,v);let z=u?$n():C?`<button type="button" class="checkout-back-btn" data-mp-header-back>${Xa}Back</button>`:`
          <div class="checkout-merchant-header">
            ${s(this,n,hi).call(this,c,c.customization?.showMerchantLogo!==!1)}
            ${s(this,n,mi).call(this,c)}
          </div>
        `;return`
      <header class="checkout-header">
        <div class="checkout-header-leading${O?" checkout-header-animate":""}">${z}</div>
        <div class="checkout-header-actions">
          <button
            type="button"
            class="checkout-header-dismiss"
            data-mp-close
            aria-label="Close checkout"
          >\xD7</button>
          <button
            type="button"
            class="${f}"
            data-mp-header-wallet
            ${r(this,te)||u?"disabled":""}
            title="${r(this,T)?"Connected wallet":"Link wallet to pay"}"
          >
            ${p}
          </button>
        </div>
      </header>
    `},ye=function(){let c=s(this,n,Ye).call(this);if(r(this,a)==="amount"&&r(this,o)?.isOpenAmount)return`
        <div class="pay-hero-panel">
          <p class="hero-label">Enter amount ${c}</p>
          <div class="amount-input-wrap">
            <input class="amount-input" type="text" inputmode="decimal" placeholder="0.00" value="${r(this,l)}" data-mp-amount aria-label="Amount" />
            <span class="amount-currency">${c}</span>
          </div>
          <button type="button" class="primary-btn" data-mp-continue-amount ${s(this,n,Ve).call(this)?"":"disabled"}>Continue</button>
        </div>
      `;let u=r(this,o)?.isOpenAmount?r(this,l).trim()||"0":s(this,n,Xt).call(this)??"0";return bn(u,c)},yi=function(c){let u=s(this,n,Ve).call(this),p=sn.map((f,C)=>{let v=f.id==="crypto"?"data-mp-crypto":`data-mp-fiat-${f.id}`;return se(`
          <button type="button" class="pay-fiat-rail-item pay-method-surface" ${v} ${u?"":"disabled"} style="--stagger-i: ${C}">
            ${s(this,n,fi).call(this,f.id,c)}
            <span class="method-copy">
              <span class="method-title">${f.title}</span>
              <span class="method-desc">${f.description}</span>
            </span>
            ${an}
          </button>
        `)}).join("");return`
      <div class="pay-options-panel">
        ${se('<p class="pay-options-label">How do you want to pay?</p>')}
        <div class="method-list checkout-stagger-group" role="list" aria-label="Payment method">
          ${p}
        </div>
      </div>
    `},to=function(){return r(this,a)==="amount"?"amount":r(this,a)==="method"?"choose-tab":r(this,a)==="crypto"?"crypto-tab":r(this,a)==="fiat"?r(this,$)==="otp"?"fiat-otp-tab":r(this,$)==="awaiting"?"fiat-await-tab":r(this,G)?"fiat-bank-tab":`fiat-tab-${r(this,N)??"mobile_money"}`:"unknown"},ki=function(){if(r(this,je))return i(this,je,!1),i(this,ze,s(this,n,to).call(this)),!1;let c=s(this,n,to).call(this),u=c!==r(this,ze);return i(this,ze,c),u},bi=function(c){let u=r(this,o);if(!u)return"";if(r(this,a)==="amount")return gt(se(s(this,n,ye).call(this)));if(r(this,a)==="method"){let p=[...u.isOpenAmount?[]:[se(s(this,n,ye).call(this))],s(this,n,yi).call(this,c)];return gt(p.join(""))}if(r(this,a)==="fiat"){let p=s(this,n,Ci).call(this,c);return gt(p.map(f=>se(f)).join(""))}if(r(this,a)==="crypto"){let p=!s(this,n,Ve).call(this)||s(this,n,B).call(this)&&!r(this,K)||s(this,n,B).call(this)&&!r(this,T),f=[se(s(this,n,ye).call(this)),se('<p class="section-label">Pay with crypto</p>'),se(s(this,n,di).call(this)),se(s(this,n,pi).call(this)),...r(this,ee)?[se(`<p class="inline-error">${r(this,ee)}</p>`)]:[],se(`<button type="button" class="primary-btn checkout-action-cta" ${p?"disabled":""}>Pay</button>`)];return gt(f.join(""))}return""},wt=function(){r(this,ke)!=null&&(clearInterval(r(this,ke)),i(this,ke,null))},xt=function(){s(this,n,wt).call(this),i(this,D,Nn),i(this,ke,setInterval(()=>{if(r(this,D)<=1){i(this,D,0),s(this,n,wt).call(this),s(this,n,w).call(this);return}i(this,D,r(this,D)-1),s(this,n,vi).call(this)},1e3))},ro=function(c){let u=Math.floor(c/60),p=c%60;return`${u}:${p.toString().padStart(2,"0")}`},vi=function(){let c=r(this,e).querySelector("[data-mp-otp-resend-label]");c&&(r(this,D)>0?c.textContent=`Resend code in ${s(this,n,ro).call(this,r(this,D))}`:c.textContent="Resend code")},oo=function(c,u){s(this,n,Qt).call(this);let p=s(this,n,Wr).call(this),f=Ao(c,r(this,d),r(this,V),ft,r(this,m));return Lo(p,r(this,d),r(this,m),f)},wi=function(){let c=r(this,D)<=0,u=r(this,Q).replace(/\D/g,"").length>=4&&!r(this,W),p=Cn(s(this,n,Zt).call(this),r(this,L)==="TEST",s(this,n,Gr).call(this));return[s(this,n,ye).call(this),'<p class="section-label">Enter the OTP sent to your phone</p>',`
      <div class="checkout-otp-wrap">
        <label class="sr-only" for="mp-preview-otp">One-time password</label>
        ${Io("mp-preview-otp",r(this,Q))}
      </div>
      `,...p?[`<div class="fiat-awaiting-help">${p}</div>`]:[],`
      <p class="otp-resend">
        ${c?`<button type="button" class="text-link" data-mp-otp-resend>${r(this,W)?"Sending code\u2026":"Resend code"}</button>`:`<span data-mp-otp-resend-label>Resend code in ${s(this,n,ro).call(this,r(this,D)||Nn)}</span>`}
      </p>
      `,`<button type="button" class="primary-btn checkout-action-cta" data-mp-otp-continue ${u?"":"disabled"}>
        ${r(this,W)?"Verifying\u2026":"Continue"}
      </button>`]},xi=function(){var u;(u=r(this,le))==null||u.call(this),i(this,le,null);let c=r(this,e).querySelector("[data-mp-otp-root]");c&&i(this,le,$o(c,{minCompleteLength:4,autoFocus:!0,onChange:p=>{i(this,Q,p);let f=r(this,e).querySelector("[data-mp-otp-continue]");f&&(f.disabled=p.length<4)},onComplete:p=>{r(this,Ze)||r(this,W)||p.length<4||(i(this,Ze,!0),s(this,n,Zr).call(this,p).finally(()=>{i(this,Ze,!1)}))}}))},Ci=function(c){let u=r(this,N)??"mobile_money",p=r(this,H)?`<p class="inline-error" role="alert">${r(this,H)}</p>`:"",f=r(this,ne)?'<p class="field-hint-label">Fetching quote\u2026</p>':r(this,Z)?`<p class="inline-error">${r(this,Z)}</p>`:"";if(u==="bank_transfer"&&r(this,G))return[s(this,n,ye).call(this),...p?[p]:[],wn(r(this,G),{testMode:r(this,L)==="TEST",polling:r(this,Te),verifyingTest:r(this,Be)})];if(u==="mobile_money"&&r(this,$)==="awaiting")return[s(this,n,ye).call(this),...p?[p]:[],xn({polling:r(this,Te),providerHint:s(this,n,Zt).call(this),isTest:r(this,L)==="TEST",showInstructions:s(this,n,Gr).call(this),alreadyPaidLoading:r(this,qe),alreadyPaidMessage:r(this,we)})];if(u==="mobile_money"&&r(this,$)==="otp")return[...s(this,n,wi).call(this),...p?[p]:[]];if(u==="mobile_money"){let z=!Kt(r(this,d),r(this,m))||r(this,W)||r(this,ne)||!!r(this,Z);return[s(this,n,ye).call(this),...f?[f]:[],`
        <div class="fiat-form-panel">
          ${s(this,n,oo).call(this,c,!0)}
        </div>
        `,...p?[p]:[],`<button type="button" class="primary-btn checkout-action-cta" data-mp-send-otp ${z?"disabled":""}>
          ${r(this,W)?"Sending OTP\u2026":"Send OTP"}
        </button>`]}if(u==="bank_transfer"){let z=!Kt(r(this,d),r(this,m))||r(this,W)||r(this,ne)||!!r(this,Z);return[s(this,n,ye).call(this),...f?[f]:[],`
        <div class="fiat-form-panel">
          ${s(this,n,oo).call(this,c,!0)}
          <p class="field-hint-label" style="margin-top:0.5rem;">We'll text your number when the bank transfer is confirmed.</p>
        </div>
        `,...p?[p]:[],`<button type="button" class="primary-btn checkout-action-cta" data-mp-fiat-pay ${z?"disabled":""}>
          ${r(this,W)?"Pay\u2026":"Pay"}
        </button>`]}let v=!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r(this,oe).trim())||r(this,W)||r(this,ne)||!!r(this,Z);return[s(this,n,ye).call(this),...f?[f]:[],`
      <div class="fiat-form-panel">
        <div class="field">
          <label class="field-hint-label" for="mp-preview-email">Email <span style="color:#b91c1c">*</span></label>
          <input
            id="mp-preview-email"
            type="email"
            autocomplete="email"
            class="checkout-input"
            placeholder="you@email.com"
            value="${r(this,oe)}"
            data-mp-card-email
          />
        </div>
      </div>
      `,...p?[p]:[],`<button type="button" class="primary-btn checkout-action-cta" data-mp-fiat-pay ${v?"disabled":""}>
        ${r(this,W)?"Pay\u2026":"Pay"}
      </button>`]},Ei=function(){r(this,e).querySelectorAll("[data-mp-rail-fallback]").forEach(c=>{let u=c.getAttribute("data-mp-rail-fallback");u&&c.addEventListener("error",()=>{c.src!==u&&(c.src=u)},{once:!0})}),r(this,e).querySelectorAll("[data-mp-momo-logo-fallback]").forEach(c=>{let u=c.getAttribute("data-mp-momo-logo-fallback");u&&c.addEventListener("error",()=>{c.src!==u&&(c.src=u)},{once:!0})}),r(this,e).querySelectorAll("[data-mp-token-icon-fallback]").forEach(c=>{let u=c.getAttribute("data-mp-token-icon-fallback");u&&c.addEventListener("error",()=>{c.src!==u&&(c.src=u)},{once:!0})})},rr=function(){r(this,e).innerHTML=`<style>${qt(Pr())}</style>`},w=function(){let c=r(this,o);if(!c){s(this,n,rr).call(this);return}let u=gn(c.customization),p=Ar(c.customization),f=rt(c.presentation,c.customization),C=Pr(c.checkoutBaseUrl,c.apiBaseUrl),v=qt(C),O=r(this,k)&&s(this,n,B).call(this),z=s(this,n,ki).call(this),q=O?In():r(this,g)?`<p class="inline-error" role="alert">${r(this,g)}</p>`:Hn(s(this,n,bi).call(this,C),r(this,ie),z),Y=Un(q),he=s(this,n,Dn).call(this);r(this,e).innerHTML=`
      <style>${v}</style>
      <div class="backdrop ${he.backdrop}" data-mp-preview-backdrop data-mp-presentation="${f}">
        <div class="shell ${he.shell}" role="dialog" aria-modal="true" aria-label="Checkout" ${O?'aria-busy="true"':""}>
          <div class="shell-sheet-handle" aria-hidden="true"></div>
          <button type="button" class="checkout-dismiss checkout-dismiss-floating" data-mp-close aria-label="Close checkout">\xD7</button>
          <article class="pay-checkout glass-card checkout-article" data-color-mode="${p}" data-checkout-guard-root style="${u}">
            <div class="checkout-article-body">
              ${s(this,n,gi).call(this,c)}

              <section class="checkout-payment-details" aria-label="Payment details">
                ${Y}
              </section>
            </div>
            ${s(this,n,ui).call(this)}
            ${Jo({open:r(this,_e),checking:r(this,Ae),kind:r(this,Le),lastStatus:r(this,Re)})}
          </article>
        </div>
      </div>
    `,s(this,n,Ei).call(this),s(this,n,xi).call(this),s(this,n,ci).call(this),s(this,n,qn).call(this),s(this,n,Nr).call(this),r(this,e).querySelectorAll("[data-mp-close]").forEach(A=>{A.addEventListener("click",()=>s(this,n,Xr).call(this))}),r(this,e).querySelector("[data-mp-header-wallet]")?.addEventListener("click",()=>{if(r(this,T)){i(this,T,""),i(this,ee,null),s(this,n,w).call(this);return}s(this,n,Gn).call(this)}),r(this,e).querySelector("[data-mp-header-back]")?.addEventListener("click",()=>{s(this,n,Yn).call(this)}),r(this,e).querySelector("[data-mp-preview-backdrop]")?.addEventListener("click",A=>{A.target===A.currentTarget&&s(this,n,Xr).call(this)}),r(this,e).querySelector("[data-mp-continue-amount]")?.addEventListener("click",()=>{s(this,n,Ve).call(this)&&(i(this,ie,1),i(this,a,"method"),s(this,n,w).call(this))}),r(this,e).querySelector("[data-mp-crypto]")?.addEventListener("click",()=>{i(this,ie,1),i(this,a,"crypto"),s(this,n,Yt).call(this),s(this,n,w).call(this),s(this,n,B).call(this)&&(s(this,n,zn).call(this),s(this,n,Ur).call(this))});for(let A of["mobile_money","bank_transfer","card"])r(this,e).querySelector(`[data-mp-fiat-${A}]`)?.addEventListener("click",()=>{s(this,n,Ne).call(this),s(this,n,Jt).call(this),i(this,ie,1),i(this,N,A),i(this,$,"form"),i(this,V,""),i(this,Q,""),i(this,a,"fiat"),s(this,n,w).call(this),s(this,n,B).call(this)&&s(this,n,ri).call(this,A)});r(this,e).querySelector("[data-mp-amount]")?.addEventListener("input",A=>{i(this,l,A.target.value);let j=r(this,e).querySelector("[data-mp-continue-amount]");j&&(j.disabled=!s(this,n,Ve).call(this))}),r(this,e).querySelectorAll("[data-mp-momo-network]").forEach(A=>{A.addEventListener("click",()=>{let j=A.getAttribute("data-mp-momo-network");j&&(i(this,V,j),s(this,n,w).call(this))})}),r(this,e).querySelector("[data-mp-phone]")?.addEventListener("input",A=>{let j=It(r(this,d),r(this,m));i(this,m,A.target.value);let st=It(r(this,d),r(this,m));s(this,n,Qt).call(this);let tt=r(this,e).querySelector("[data-mp-send-otp]");if(tt&&(tt.disabled=!Kt(r(this,d),r(this,m))),j!==st){s(this,n,w).call(this);return}st&&r(this,e).querySelectorAll("[data-mp-momo-network]").forEach(nr=>{let co=nr.getAttribute("data-mp-momo-network")===r(this,V);nr.classList.toggle("momo-network-cell-selected",co),nr.setAttribute("aria-checked",String(co))})}),r(this,e).querySelector("[data-mp-card-email]")?.addEventListener("input",A=>{i(this,oe,A.target.value);let j=r(this,e).querySelector("[data-mp-fiat-pay]");j&&(j.disabled=!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r(this,oe).trim())||r(this,W)||r(this,ne)||!!r(this,Z))}),r(this,e).querySelector("[data-mp-send-otp]")?.addEventListener("click",()=>{s(this,n,ni).call(this)}),r(this,e).querySelector("[data-mp-otp-resend]")?.addEventListener("click",()=>{if(s(this,n,B).call(this)){s(this,n,ii).call(this);return}r(this,D)>0||(i(this,Q,""),s(this,n,xt).call(this),s(this,n,w).call(this))}),r(this,e).querySelector("[data-mp-otp-continue]")?.addEventListener("click",()=>{r(this,Q).replace(/\D/g,"").length<4||s(this,n,Zr).call(this)}),r(this,e).querySelector("[data-mp-fiat-pay]")?.addEventListener("click",()=>{s(this,n,ai).call(this)}),r(this,e).querySelector("[data-mp-bank-verify-test]")?.addEventListener("click",()=>{s(this,n,si).call(this)}),r(this,e).querySelector("[data-mp-already-paid]")?.addEventListener("click",()=>{s(this,n,ei).call(this)}),r(this,e).querySelectorAll("[data-mp-exit-stay]").forEach(A=>{A.addEventListener("click",()=>s(this,n,er).call(this))}),r(this,e).querySelector("[data-mp-exit-leave]")?.addEventListener("click",()=>{s(this,n,Zn).call(this)}),r(this,e).querySelector("[data-mp-wallet-change]")?.addEventListener("click",()=>{i(this,T,""),i(this,ee,null),s(this,n,w).call(this),(Lr()||r(this,o)?.onRequestWalletConnect)&&(r(this,o)?.onRequestWalletConnect?.(),Rr())}),r(this,e).querySelectorAll("[data-mp-quote-row]").forEach(A=>{A.addEventListener("click",()=>{let j=A.getAttribute("data-mp-quote-row");j&&(i(this,K,j),r(this,o)?.onTokenSelect?.(j),s(this,n,w).call(this))})}),r(this,e).querySelector("[data-mp-more-tokens]")?.addEventListener("click",()=>{s(this,n,Bn).call(this)}),r(this,e).querySelectorAll("[data-mp-token-sheet-close]").forEach(A=>{A.addEventListener("click",()=>{s(this,n,Yt).call(this),s(this,n,w).call(this)})}),r(this,e).querySelectorAll("[data-mp-picker-symbol]").forEach(A=>{A.addEventListener("click",()=>{let j=A.getAttribute("data-mp-picker-symbol");j&&(i(this,ue,j),i(this,de,"chain"),s(this,n,w).call(this))})}),r(this,e).querySelector("[data-mp-picker-back-token]")?.addEventListener("click",()=>{i(this,de,"token"),i(this,ue,null),s(this,n,w).call(this)}),r(this,e).querySelectorAll("[data-mp-picker-token-id]").forEach(A=>{A.addEventListener("click",()=>{let j=A.getAttribute("data-mp-picker-token-id");j&&s(this,n,Wn).call(this,j)})});let fe=r(this,e).querySelector("[data-mp-picker-search]");fe&&fe.addEventListener("input",()=>{let A=fe;r(this,S)&&clearTimeout(r(this,S)),i(this,S,setTimeout(()=>{i(this,E,A.value);let j=A.selectionStart,st=A.selectionEnd;s(this,n,w).call(this);let tt=r(this,e).querySelector("[data-mp-picker-search]");tt&&(tt.focus(),j!=null&&st!=null&&tt.setSelectionRange(j,st))},100))}),r(this,e).querySelector("[data-mp-picker-search-clear]")?.addEventListener("click",()=>{i(this,E,""),s(this,n,w).call(this),r(this,e).querySelector("[data-mp-picker-search]")?.focus()})},customElements.define(or,t)}function Fe(){ts()}function Mi(){Fe();let t=document.querySelector(or);if(t)return t;let e=document.createElement(or);return document.body.appendChild(e),e}var no=null;function Ct(t){Fe();let e=Mi();return no=e,e.open(t),e}function Et(){no?.close(),no=null}function rs(t){if(typeof t!="string")return t;let e=document.querySelector(t);if(!e||!(e instanceof HTMLElement))throw new Error(`Morapay checkout widget: container not found (${t}).`);return e}function Pi(t,e){return{mode:e,title:t.title,checkoutBaseUrl:t.checkoutBaseUrl,customization:t.customization,publicCode:t.publicCode,onSuccess:t.onSuccess,onFailure:t.onFailure,onClose:t.onClose,skipWalletStep:e==="onramp"||e==="offramp"}}function Si(t){let e=rs(t.container);e.replaceChildren();let o=document.createElement("iframe");o.src=t.src,o.title=t.title??"Morapay checkout",o.allow="payment *; clipboard-write",o.setAttribute("loading","lazy"),o.style.width="100%",o.style.height=`${t.height??650}px`,o.style.border="0",o.style.borderRadius="12px",o.style.background="transparent";let a=l=>{if(!Mt(l.origin,t.checkoutBaseUrl))return;let d=Pt(l.data);if(d)switch(d.type){case"MORAPAY_CHECKOUT_SUCCESS":t.onSuccess?.(d.payload),window.removeEventListener("message",a);break;case"MORAPAY_CHECKOUT_FAILURE":t.onFailure?.(d.payload);break;case"MORAPAY_CHECKOUT_CLOSE":t.onClose?.(),o.remove(),window.removeEventListener("message",a);break}};return window.addEventListener("message",a),e.appendChild(o),o}function io(t){let e=t.checkoutBaseUrl??"https://checkout.morapay.io",o=$e(t.businessSlug,e,{amount:t.amount,currency:t.currency,metadata:t.metadata,customization:t.customization,flow:t.flow});return Si({container:t.container,src:o,checkoutBaseUrl:e,title:t.title,height:t.height,onSuccess:t.onSuccess,onFailure:t.onFailure,onClose:t.onClose})}function ao(t){let e=t.checkoutBaseUrl??"https://checkout.morapay.io",o=He(t.publicCode,e,{customization:t.customization,flow:t.flow});return Si({container:t.container,src:o,checkoutBaseUrl:e,title:t.title??"Morapay payment",height:t.height,onSuccess:t.onSuccess,onFailure:t.onFailure,onClose:t.onClose})}function so(t){return Ke(Pi(t,"onramp")),document.createElement("iframe")}function lo(t){return Ke(Pi(t,"offramp")),document.createElement("iframe")}typeof window<"u"&&(ge(),Fe(),window.MorapayCheckout={openPreviewModal:Ct,closePreviewModal:Et,openModal:Ke,closeModal:ct,registerModalElement:ge,embedBusinessCheckout:io,embedPaymentLinkCheckout:ao,embedOnrampCheckout:so,embedOfframpCheckout:lo,buildBusinessPayEmbedUrl:$e,buildPaymentLinkEmbedUrl:He});typeof window<"u"&&(ge(),Fe(),window.MorapayCheckout={openPreviewModal:Ct,closePreviewModal:Et,openModal:Ke,closeModal:ct,registerModalElement:ge,embedBusinessCheckout:io,embedPaymentLinkCheckout:ao,embedOnrampCheckout:so,embedOfframpCheckout:lo,buildBusinessPayEmbedUrl:$e,buildPaymentLinkEmbedUrl:He});})();
