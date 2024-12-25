import { c as create_ssr_component, e as escape, v as validate_component, d as each, b as subscribe } from "../../../chunks/ssr.js";
import { p as page } from "../../../chunks/stores.js";
import { p as parseDatabaseString } from "../../../chunks/functions.js";
import { C as COP } from "../../../chunks/types.js";
import { C as CreditCard } from "../../../chunks/CreditCard.js";
import { C as CardName } from "../../../chunks/CardName.js";
const SearchCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { card } = $$props;
  if ($$props.card === void 0 && $$bindings.card && card !== void 0)
    $$bindings.card(card);
  return `<div class="my-4 mx-2 px-8 py-6 shadow-lg lg:shadow-md lg:shadow-current border-2 lg:border-none rounded-2xl" style="${"border-color:" + escape(card.card_color, true) + "; --tw-shadow-color:" + escape(card.card_color, true)}">${validate_component(CreditCard, "CreditCard").$$render($$result, { card, showTrackCard: true }, {}, {})} ${validate_component(CardName, "CardName").$$render($$result, { card, fontSize: "medium" }, {}, {})} <table class="table-auto mt-8 lg:mr-8"><tr class="font-semibold text-2xl"><td class="w-full">${escape(parseDatabaseString(card, COP.card_af))}</td> <td class="w-full">${escape(parseDatabaseString(card, COP.card_ftf))}</td></tr> <tr class="text-xl font-light" data-svelte-h="svelte-2ufrbw"><td class="pb-4">Annual Fee</td> <td class="pb-4">FTF</td></tr> <tr class="font-semibold text-2xl"><td>${escape(parseDatabaseString(card, COP.card_network))}</td> <td>${escape(parseDatabaseString(card, COP.card_type))}</td></tr> <tr class="text-xl font-light" data-svelte-h="svelte-kcumef"><td>Network</td> <td>Card Type</td></tr></table></div>`;
});
async function getCards() {
  return [];
}
const SearchResults = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { query } = $$props;
  let list = [];
  if (query) {
    getCards().then((cards) => {
      if (cards.length == 1)
        ;
      else {
        list = cards;
      }
    });
  }
  if ($$props.query === void 0 && $$bindings.query && query !== void 0)
    $$bindings.query(query);
  return `<div id="cardList" class="grid grid-cols-1 gap-4 justify-center lg:pt-8 lg:grid-cols-3">${each(list, (item) => {
    return `${validate_component(SearchCard, "SearchCard").$$render($$result, { card: item }, {}, {})}`;
  })}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let hasQuery = $page.url.searchParams.has("q");
  const q = $page.url.searchParams.get("q");
  $$unsubscribe_page();
  return `<main class="bg-theme-white dark:text-theme-text-white dark:bg-theme-black pt-16 lg:pt-24">${hasQuery ? `${validate_component(SearchResults, "SearchResults").$$render($$result, { query: q }, {}, {})}` : ``} </main>`;
});
export {
  Page as default
};
