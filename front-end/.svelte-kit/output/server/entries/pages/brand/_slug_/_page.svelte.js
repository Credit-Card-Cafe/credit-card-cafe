import { c as create_ssr_component, e as escape, v as validate_component, d as each } from "../../../../chunks/ssr.js";
import { C as CreditCard } from "../../../../chunks/CreditCard.js";
import { C as CardStack } from "../../../../chunks/CardStack.js";
const BrandInfo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { brand } = $$props;
  if ($$props.brand === void 0 && $$bindings.brand && brand !== void 0)
    $$bindings.brand(brand);
  return `<div id="bankInfo" class="lg:mx-6 flex flex-1 flex-col items-center lg:block">${brand.brand_name ? `<div class="inline-flex flex-col items-center mb-12"><div class="pb-8 text-6xl lg:text-8xl text-center font-semibold dark:text-theme-text-white">${escape(brand.brand_name)}</div> <hr class="my-4 border-2 border-theme-text-white w-11/12 "></div>` : ``}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let brand = data.brand;
  let creditCards = data.creditCards;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-8xoilz_START -->${brand ? `${$$result.title = `<title>Credit Card Cafe | ${escape(brand.brand_name)}</title>`, ""} <meta name="description" content="${escape(brand.brand_name, true) + " on CreditCardDB"}">` : ``}<!-- HEAD_svelte-8xoilz_END -->`, ""} ${brand ? `<main id="brand" class="bg-theme-white dark:text-theme-text-white dark:bg-theme-black flex flex-col items-center md:block"><div class="mb-12">${validate_component(BrandInfo, "BrandInfo").$$render($$result, { brand }, {}, {})}</div> ${creditCards ? `<div class="block md:hidden">${validate_component(CardStack, "CardStack").$$render(
    $$result,
    {
      cards: creditCards,
      showTrackCard: true,
      allowCardFanning: false
    },
    {},
    {}
  )}</div> <div class="hidden md:block lg:grid grid-cols-1 gap-4 justify-center pt-8 md:grid-cols-2 md:gap-12 lg:gap-6 lg:grid-cols-3">${each(creditCards, (card) => {
    return `${validate_component(CreditCard, "CreditCard").$$render($$result, { card, showTrackCard: true }, {}, {})}`;
  })}</div>` : ``}</main>` : `<main data-svelte-h="svelte-18lg3iw">Nothing to display here...</main>`}`;
});
export {
  Page as default
};
