import{s as E,f as m,a as v,g as h,h as y,v as x,c as b,d,j as u,i as A,w as p,A as w,J as S,l as _,m as g,n as C}from"../chunks/scheduler.ebd51d3c.js";import{S as $,i as j}from"../chunks/index.d591bbc4.js";import{p as I}from"../chunks/stores.c0b8e04c.js";function k(c){let t,s=c[0].status+"",r,i,n=c[0].error.message+"",a;return{c(){t=m("p"),r=_(s),i=_(": "),a=_(n),this.h()},l(l){t=h(l,"P",{class:!0});var e=y(t);r=g(e,s),i=g(e,": "),a=g(e,n),e.forEach(d),this.h()},h(){u(t,"class","text-3xl font-light pb-16")},m(l,e){A(l,t,e),p(t,r),p(t,i),p(t,a)},p(l,e){e&1&&s!==(s=l[0].status+"")&&C(r,s),e&1&&n!==(n=l[0].error.message+"")&&C(a,n)},d(l){l&&d(t)}}}function P(c){let t,s,r="Yikes, something went wrong!",i,n,a,l="Lets bring you back to the fun ->",e=c[0].error&&k(c);return{c(){t=m("main"),s=m("p"),s.textContent=r,i=v(),e&&e.c(),n=v(),a=m("a"),a.textContent=l,this.h()},l(f){t=h(f,"MAIN",{class:!0});var o=y(t);s=h(o,"P",{class:!0,"data-svelte-h":!0}),x(s)!=="svelte-1vwa30t"&&(s.textContent=r),i=b(o),e&&e.l(o),n=b(o),a=h(o,"A",{href:!0,class:!0,"data-svelte-h":!0}),x(a)!=="svelte-uv1jvl"&&(a.textContent=l),o.forEach(d),this.h()},h(){u(s,"class","text-4xl md:text-6xl pt-16 pb-4 font-semibold"),u(a,"href","/"),u(a,"class","text-3xl font-light hover:underline"),u(t,"class","flex flex-col h-full w-full pb-20 items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600")},m(f,o){A(f,t,o),p(t,s),p(t,i),e&&e.m(t,null),p(t,n),p(t,a)},p(f,[o]){f[0].error?e?e.p(f,o):(e=k(f),e.c(),e.m(t,n)):e&&(e.d(1),e=null)},i:w,o:w,d(f){f&&d(t),e&&e.d()}}}function Y(c,t,s){let r;return S(c,I,i=>s(0,r=i)),console.log("Yes Grandma, I would like another Stawberry."),[r]}class L extends ${constructor(t){super(),j(this,t,Y,P,E,{})}}export{L as component};