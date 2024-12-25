import { c as create_ssr_component, e as escape, a as add_attribute, v as validate_component } from "../../chunks/ssr.js";
const app = "";
const DarkToggle_svelte_svelte_type_style_lang = "";
const Nav_svelte_svelte_type_style_lang = "";
const css = {
  code: "hr.svelte-30hre9{border:2px solid #d6c0a5}",
  map: null
};
const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let header;
  $$result.css.add(css);
  return ` <header id="header" class="${"fixed z-50 w-full flex flex-col justify-between lg:flex-row lg:items-center lg:justify-items-center lg:py-4 lg:px-8 bg-theme-white dark:bg-theme-black dark:text-theme-text-white lg:bg-transparent dark:lg:bg-transparent backdrop-blur-md " + escape(
    "",
    true
  )}"${add_attribute("this", header, 0)}><div class="flex flex-row justify-between items-center lg:hidden px-6"><button class="flex-1 py-6">${`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 dark:text-theme-green"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path></svg>`}</button> <a href="/" class="float-right" data-svelte-h="svelte-18uvcgg"><div class="text-xl font-bold text-center flex flex-row items-baseline"><span class="text-theme-green">creditcard</span><span class="text-[7px] leading-4">■</span><span class="text-theme-brown">cafe</span></div></a></div> ${``} </header>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} ${slots.default ? slots.default({}) : ``}  <footer id="footer" class="w-full py-10 bg-theme-white/75 dark:bg-theme-darkgray dark:text-theme-text-white flex flex-col items-center" data-svelte-h="svelte-98lf1a"><img class="h-4" src="https://firebasestorage.googleapis.com/v0/b/creditcarddb-3fafd.appspot.com/o/creditcardcafelogo.png?alt=media&amp;token=847bdd20-d667-481e-8448-5bc5b1efcc14" alt="creditcard.cafe"> <div class="flex flex-col lg:flex-row px-8"><section class="dark:text-white-warm px-16 py-16 lg:basis-3/4"><div class="font-bold">Disclosure:</div> <div>- The Credit Card Cafe Team has no relation to any Bank, Brand, or Credit Card listed on this website.</div> <div>- This website does not use affiliate links, all hyperlinks to individual credit cards will direct you to the default credit card landing page.</div> <div>- Data is sourced organically, data could be misleading or incorect. Verify any data about the credit card through the credit card provider before applying.</div> <div>- Please understand the financial risk involved with credit cards before applying and using credit cards.</div></section> <section class="px-8 pb-8 flex flex-col gap-y-6 lg:gap-y-0 lg:px-0 lg:pb-0 lg:p-16 lg:basis-1/4 lg:grid lg:grid-cols-2"><div><h1 class="underline">Search</h1> <ul><li><a href="/">List of Cards</a></li> <li><a href="/">List of Banks</a></li> <li><a href="/">List of Brands</a></li></ul></div> <div><h1 class="underline">Legal</h1> <ul><li><a href="/">Privacy Policy</a></li> <li><a href="/">Terms of Use</a></li></ul></div> <div class="col-start-2"><h1 class="underline">About</h1> <ul><li><a href="/">Our Company</a></li> <li><a href="/">Sustainability Policy</a></li></ul></div></section></div> <div class="text-2xl font-light dark:text-theme-text-white px-8">Developed by the Credit Card Cafe Team 2024</div></footer>`;
});
export {
  Layout as default
};
