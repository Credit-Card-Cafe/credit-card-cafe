import{s as L,e as f,i as m,d as b,J as I,f as h,g as k,v as C,j as v,A as _,l as T,a as S,h as U,m as q,c as E,w as M,n as N,p as j,R as A}from"../chunks/scheduler.ebd51d3c.js";import{h as H,u as J}from"../chunks/banks.0169a8c2.js";import{S as F,i as O,a as d,t as p,b as x,d as y,m as $,e as D,f as P}from"../chunks/index.d591bbc4.js";import{c as R,a as V,l as z}from"../chunks/functions.839aea76.js";import{T as w}from"../chunks/Table.4dcca01a.js";function B(r){let t,s='<div class="text-xl md:text-2xl font-semibold text-center my-20">Error: Table List Doesn&#39;t Exist</div> <div class="text-2xl md:text-6xl font-semibold text-center mb-20">That&#39;s one too many syllables there, bub</div>';return{c(){t=h("main"),t.innerHTML=s,this.h()},l(e){t=k(e,"MAIN",{class:!0,"data-svelte-h":!0}),C(t)!=="svelte-128ajl4"&&(t.innerHTML=s),this.h()},h(){v(t,"class","bg-theme-white dark:text-theme-text-white dark:bg-theme-black")},m(e,n){m(e,t,n)},p:_,i:_,o:_,d(e){e&&b(t)}}}function G(r){let t,s,e={ctx:r,current:null,token:null,hasCatch:!1,pending:W,then:Q,catch:K,value:6,blocks:[,,,]};return H(V(r[2]),e),{c(){t=f(),e.block.c()},l(n){t=f(),e.block.l(n)},m(n,i){m(n,t,i),e.block.m(n,e.anchor=i),e.mount=()=>t.parentNode,e.anchor=t,s=!0},p(n,i){r=n,J(e,r,i)},i(n){s||(d(e.block),s=!0)},o(n){for(let i=0;i<3;i+=1){const l=e.blocks[i];p(l)}s=!1},d(n){n&&b(t),e.block.d(n),e.token=null,e=null}}}function K(r){return{c:_,l:_,m:_,p:_,i:_,o:_,d:_}}function Q(r){var c;let t,s=((c=r[0].category)==null?void 0:c.title)+"",e,n,i,l;return i=new w({props:{tablelist:r[6],walletIDList:[],trackingIDList:[],settings:r[1],tableCall:1}}),{c(){t=h("div"),e=T(s),n=S(),x(i.$$.fragment),this.h()},l(a){t=k(a,"DIV",{class:!0});var o=U(t);e=q(o,s),o.forEach(b),n=E(a),y(i.$$.fragment,a),this.h()},h(){v(t,"class","text-3xl md:text-6xl font-semibold text-center")},m(a,o){m(a,t,o),M(t,e),m(a,n,o),$(i,a,o),l=!0},p(a,o){var g;(!l||o&1)&&s!==(s=((g=a[0].category)==null?void 0:g.title)+"")&&N(e,s);const u={};o&2&&(u.settings=a[1]),i.$set(u)},i(a){l||(d(i.$$.fragment,a),l=!0)},o(a){p(i.$$.fragment,a),l=!1},d(a){a&&(b(t),b(n)),D(i,a)}}}function W(r){let t,s,e;function n(l){r[3](l)}let i={tablelist:[],walletIDList:[],trackingIDList:[],tableCall:1};return r[1]!==void 0&&(i.settings=r[1]),t=new w({props:i}),j.push(()=>P(t,"settings",n)),{c(){x(t.$$.fragment)},l(l){y(t.$$.fragment,l)},m(l,c){$(t,l,c),e=!0},p(l,c){const a={};!s&&c&2&&(s=!0,a.settings=l[1],A(()=>s=!1)),t.$set(a)},i(l){e||(d(t.$$.fragment,l),e=!0)},o(l){p(t.$$.fragment,l),e=!1},d(l){D(t,l)}}}function X(r){let t,s,e,n;const i=[G,B],l=[];function c(a,o){return a[2]?0:1}return t=c(r),s=l[t]=i[t](r),{c(){s.c(),e=f()},l(a){s.l(a),e=f()},m(a,o){l[t].m(a,o),m(a,e,o),n=!0},p(a,[o]){s.p(a,o)},i(a){n||(d(s),n=!0)},o(a){p(s),n=!1},d(a){a&&b(e),l[t].d(a)}}}function Y(r,t,s){var o;let e;I(r,z,u=>s(4,e=u));let{data:n}=t;const i=(o=n.category)==null?void 0:o.list;let l=R(e),c={table_setting_acronym:l.table_setting_acronym,table_setting_advanced:l.table_setting_advanced,table_setting_queries:l.table_setting_queries,table_setting_userselection:l.table_setting_userselection};function a(u){c=u,s(1,c)}return r.$$set=u=>{"data"in u&&s(0,n=u.data)},[n,c,i,a]}class nt extends F{constructor(t){super(),O(this,t,Y,X,L,{data:0})}}export{nt as component};
