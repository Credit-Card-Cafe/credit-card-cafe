import { c as create_ssr_component, b as subscribe, e as escape } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  console.log("Yes Grandma, I would like another Stawberry.");
  $$unsubscribe_page();
  return `<main class="flex flex-col h-full w-full pb-20 items-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"><p class="text-4xl md:text-6xl pt-16 pb-4 font-semibold" data-svelte-h="svelte-1vwa30t">Yikes, something went wrong!</p> ${$page.error ? `<p class="text-3xl font-light pb-16">${escape($page.status)}: ${escape($page.error.message)}</p>` : ``} <a href="/" class="text-3xl font-light hover:underline" data-svelte-h="svelte-uv1jvl">Lets bring you back to the fun -&gt;</a></main>`;
});
export {
  Error as default
};
