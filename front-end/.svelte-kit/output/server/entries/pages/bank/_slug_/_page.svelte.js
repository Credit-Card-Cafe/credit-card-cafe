import { c as create_ssr_component, e as escape, v as validate_component, d as each } from "../../../../chunks/ssr.js";
import { C as CreditCard } from "../../../../chunks/CreditCard.js";
const BankInfo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { bank } = $$props;
  if ($$props.bank === void 0 && $$bindings.bank && bank !== void 0)
    $$bindings.bank(bank);
  return `<div id="bankInfo" class="lg:mx-6 flex flex-1 flex-col items-center lg:block">${bank.bank_name ? `<div class="inline-flex flex-col items-center mb-12"><div class="pb-8 text-6xl lg:text-8xl text-center font-semibold dark:text-theme-text-white">${escape(bank.bank_name)}</div> <hr class="my-4 border-2 border-theme-text-white w-11/12 "></div>` : ``}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let bank = data.bank;
  let creditCards = data.creditCards;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-1ji07yo_START -->${bank ? `${$$result.title = `<title>Credit Card Cafe | ${escape(bank.bank_name)}</title>`, ""} <meta name="description" content="${escape(bank.bank_name, true) + " on CreditCardDB"}">` : ``}<!-- HEAD_svelte-1ji07yo_END -->`, ""} ${bank ? `<main id="bank" class="bg-theme-white dark:text-theme-text-white dark:bg-theme-black flex flex-col items-center md:block"><div class="mb-12">${validate_component(BankInfo, "BankInfo").$$render($$result, { bank }, {}, {})}</div> ${creditCards ? `<div class="flex flex-col lg:grid gap-4 justify-center pt-8 gap-6 grid-cols-3">${each(creditCards, (card) => {
    return `${validate_component(CreditCard, "CreditCard").$$render($$result, { card, showTrackCard: true }, {}, {})}`;
  })}</div>` : ``}</main>` : `<main data-svelte-h="svelte-18lg3iw">Nothing to display here...</main>`}`;
});
export {
  Page as default
};
