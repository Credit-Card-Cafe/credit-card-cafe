import { c as create_ssr_component, v as validate_component } from "./ssr.js";
import { C as CreditCard } from "./CreditCard.js";
const DefaultCreditCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const displayCard = {
    card_name: "Credit Card Cafe",
    card_url: "null",
    card_bank: "Credit Card Cafe",
    card_color: "#373737"
  };
  return `<div class="flex flex-col items-center">${validate_component(CreditCard, "CreditCard").$$render($$result, { card: displayCard, altLink: "/" }, {}, {
    default: () => {
      return `<div class="h-8 mt-2 w-full stretch bg-theme-black"></div> <div class="text-4xl font-bold text-center flex flex-row items-baseline" data-svelte-h="svelte-1xsc27t"><span class="text-theme-green">creditcard</span><span class="text-[7px] leading-4">■</span><span class="text-theme-brown">cafe</span></div> <h2 class="text-lg mb-1 px-6 font-semibold text-left text-theme-text-white" data-svelte-h="svelte-1m1mpma">the ultimate community credit card research tool</h2>`;
    }
  })}</div>`;
});
export {
  DefaultCreditCard as D
};
