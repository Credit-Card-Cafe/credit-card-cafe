function H(){}function M(t,e){for(const n in e)t[n]=e[n];return t}function Z(t){return!!t&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"}function O(t){return t()}function $(){return Object.create(null)}function P(t){t.forEach(O)}function tt(t){return typeof t=="function"}function et(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let h;function nt(t,e){return t===e?!0:(h||(h=document.createElement("a")),h.href=e,t===h.href)}function it(t){return Object.keys(t).length===0}function S(t,...e){if(t==null){for(const i of e)i(void 0);return H}const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function rt(t){let e;return S(t,n=>e=n)(),e}function ct(t,e,n){t.$$.on_destroy.push(S(e,n))}function ot(t,e,n,i){if(t){const r=j(t,e,n,i);return t[0](r)}}function j(t,e,n,i){return t[1]&&i?M(n.ctx.slice(),t[1](i(e))):n.ctx}function st(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const o=[],c=Math.max(e.dirty.length,r.length);for(let l=0;l<c;l+=1)o[l]=e.dirty[l]|r[l];return o}return e.dirty|r}return e.dirty}function lt(t,e,n,i,r,o){if(r){const c=j(e,n,i,o);t.p(c,r)}}function ut(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function at(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function ft(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function _t(t){return t??""}function dt(t,e,n){return t.set(n),e}let b=!1;function ht(){b=!0}function pt(){b=!1}function W(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function B(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const s=[];for(let u=0;u<e.length;u++){const a=e[u];a.claim_order!==void 0&&s.push(a)}e=s}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let s=0;s<e.length;s++){const u=e[s].claim_order,a=(r>0&&e[n[r]].claim_order<=u?r+1:W(1,r,q=>e[n[q]].claim_order,u))-1;i[s]=n[a]+1;const k=a+1;n[k]=s,r=Math.max(k,r)}const o=[],c=[];let l=e.length-1;for(let s=n[r]+1;s!=0;s=i[s-1]){for(o.push(e[s-1]);l>=s;l--)c.push(e[l]);l--}for(;l>=0;l--)c.push(e[l]);o.reverse(),c.sort((s,u)=>s.claim_order-u.claim_order);for(let s=0,u=0;s<c.length;s++){for(;u<o.length&&c[s].claim_order>=o[u].claim_order;)u++;const a=u<o.length?o[u]:null;t.insertBefore(c[s],a)}}function I(t,e){t.appendChild(e)}function L(t,e){if(b){for(B(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function mt(t,e,n){b&&!n?L(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function U(t){t.parentNode&&t.parentNode.removeChild(t)}function bt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function C(t){return document.createElement(t)}function F(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function E(t){return document.createTextNode(t)}function yt(){return E(" ")}function gt(){return E("")}function N(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function xt(t){return function(e){return e.preventDefault(),t.call(this,e)}}function wt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function vt(t){return t.dataset.svelteH}function Et(t){let e;return{p(...n){e=n,e.forEach(i=>t.push(i))},r(){e.forEach(n=>t.splice(t.indexOf(n),1))}}}function kt(t){return Array.from(t.childNodes)}function R(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function D(t,e,n,i,r=!1){R(t);const o=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const l=t[c];if(e(l)){const s=n(l);return s===void 0?t.splice(c,1):t[c]=s,r||(t.claim_info.last_index=c),l}}for(let c=t.claim_info.last_index-1;c>=0;c--){const l=t[c];if(e(l)){const s=n(l);return s===void 0?t.splice(c,1):t[c]=s,r?s===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,l}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function T(t,e,n,i){return D(t,r=>r.nodeName===e,r=>{const o=[];for(let c=0;c<r.attributes.length;c++){const l=r.attributes[c];n[l.name]||o.push(l.name)}o.forEach(c=>r.removeAttribute(c))},()=>i(e))}function Nt(t,e,n){return T(t,e,n,C)}function At(t,e,n){return T(t,e,n,F)}function G(t,e){return D(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>E(e),!0)}function St(t){return G(t," ")}function jt(t,e){e=""+e,t.data!==e&&(t.data=e)}function Ct(t,e){t.value=e??""}function Dt(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}let p;function J(){if(p===void 0){p=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{p=!0}}return p}function Tt(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=C("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const r=J();let o;return r?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",o=N(window,"message",c=>{c.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{o=N(i.contentWindow,"resize",e),e()}),I(t,i),()=>{(r||o&&i.contentWindow)&&o(),U(i)}}function K(t,e,{bubbles:n=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:i})}function zt(t,e){const n=[];let i=0;for(const r of e.childNodes)if(r.nodeType===8){const o=r.textContent.trim();o===`HEAD_${t}_END`?(i-=1,n.push(r)):o===`HEAD_${t}_START`&&(i+=1,n.push(r))}else i>0&&n.push(r);return n}function qt(t,e){return new t(e)}let m;function g(t){m=t}function y(){if(!m)throw new Error("Function called outside component initialization");return m}function Ht(t){y().$$.before_update.push(t)}function Mt(t){y().$$.on_mount.push(t)}function Ot(t){y().$$.after_update.push(t)}function Pt(){const t=y();return(e,n,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[e];if(r){const o=K(e,n,{cancelable:i});return r.slice().forEach(c=>{c.call(t,o)}),!o.defaultPrevented}return!0}}const d=[],A=[];let _=[];const w=[],z=Promise.resolve();let v=!1;function Q(){v||(v=!0,z.then(X))}function Wt(){return Q(),z}function V(t){_.push(t)}function Bt(t){w.push(t)}const x=new Set;let f=0;function X(){if(f!==0)return;const t=m;do{try{for(;f<d.length;){const e=d[f];f++,g(e),Y(e.$$)}}catch(e){throw d.length=0,f=0,e}for(g(null),d.length=0,f=0;A.length;)A.pop()();for(let e=0;e<_.length;e+=1){const n=_[e];x.has(n)||(x.add(n),n())}_.length=0}while(d.length);for(;w.length;)w.pop()();v=!1,x.clear(),g(t)}function Y(t){if(t.fragment!==null){t.update(),P(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(V)}}function It(t){const e=[],n=[];_.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),_=e}export{tt as $,H as A,P as B,Pt as C,V as D,Tt as E,ot as F,lt as G,ut as H,st as I,ct as J,zt as K,bt as L,nt as M,_t as N,Ht as O,dt as P,rt as Q,Bt as R,ft as S,M as T,at as U,Et as V,Z as W,y as X,g as Y,X as Z,$ as _,yt as a,it as a0,It as a1,m as a2,O as a3,d as a4,Q as a5,ht as a6,pt as a7,Ot as b,St as c,U as d,gt as e,C as f,Nt as g,kt as h,mt as i,wt as j,Dt as k,E as l,G as m,jt as n,Mt as o,A as p,qt as q,F as r,et as s,Wt as t,At as u,vt as v,L as w,Ct as x,N as y,xt as z};