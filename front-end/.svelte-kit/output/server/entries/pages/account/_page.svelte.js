import { c as create_ssr_component, e as escape, n as null_to_empty, d as each, a as add_attribute, v as validate_component, b as subscribe } from "../../../chunks/ssr.js";
import { c as convertJSONtoUser, g as getCardsFromIDList, a as applyModifier, l as localUserData } from "../../../chunks/functions.js";
import { l as lists, r as redemption } from "../../../chunks/fields.js";
import { C as CardStack } from "../../../chunks/CardStack.js";
import { D as DefaultCreditCard } from "../../../chunks/DefaultCreditCard.js";
const Reward_svelte_svelte_type_style_lang = "";
const css = {
  code: ".text-shadow.svelte-1oqzhr3{color:#262626;text-shadow:1px 1px 0 #f7fcf9,\n    -1px 1px 0 #f7fcf9,\n    -1px -1px 0 #f7fcf9,\n    1px -1px 0 #f7fcf9}@media(prefers-color-scheme: dark){.text-shadow.svelte-1oqzhr3{color:#262626;text-shadow:1px 1px 0 #d6c0a5,\n            -1px 1px 0 #d6c0a5,\n            -1px -1px 0 #d6c0a5,\n            1px -1px 0 #d6c0a5}}",
  map: null
};
const Reward = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { category } = $$props;
  let { categories } = $$props;
  categories[category].sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
  if ($$props.category === void 0 && $$bindings.category && category !== void 0)
    $$bindings.category(category);
  if ($$props.categories === void 0 && $$bindings.categories && categories !== void 0)
    $$bindings.categories(categories);
  $$result.css.add(css);
  return `<button class="shadow-lg p-2 dark:border dark:border-theme-text-white font-medium rounded-lg mb-1 lg:mb-4 mx-auto flex flex-col">${escape(lists.rewardCategories[category])} <span class="${escape(null_to_empty(`my-1 flex flex-row items-center flex-wrap md:${"inline"}`), true) + " svelte-1oqzhr3"}">${each(categories[category], (reward) => {
    return ` <span${add_attribute(
      "class",
      reward.custom ? "dark:bg-white/[0.1] bg-black/[0.1] hovertip outline outline-theme-green m-2 rounded-md inline-flex flex-col items-center relative" : "hovertip m-2 rounded-md inline-flex flex-col items-center relative",
      0
    )}><img class="h-8 w-12 rounded-[0.15rem]" style="${"background-color:" + escape(reward.card.card_color, true)}" src="${"/storage/" + escape(reward.card.card_url, true) + ".jpeg"}"${add_attribute("alt", reward.card.card_name, 0)}> <span class="absolute -bottom-3 -right-2 font-semibold text-lg text-shadow svelte-1oqzhr3">${escape(reward.value)}</span> </span>`;
  })}</span> </button>`;
});
const Rewards = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { cards } = $$props;
  let { localUser } = $$props;
  let categories = {};
  let totalAnnualFee = 0;
  let lowestAPRCard = cards[0];
  cards.forEach((card) => {
    if (card.card_rewards && card.card_redemption) {
      for (let reward in card.card_rewards) {
        if (reward != "custom") {
          if (!categories[reward]) {
            categories[reward] = [];
          }
          categories[reward].push({
            card,
            "value": card.card_rewards[reward].toString() + redemption[card.card_redemption],
            "custom": false
          });
        }
      }
    }
    if (card.card_custom && card.card_redemption && localUser?.custom_choices) {
      let userCard = localUser.custom_choices.find((choice) => card.card_id && choice[card.card_id]);
      for (let reward in card.card_custom) {
        if (card.card_id && userCard && reward == userCard[card.card_id]) {
          if (!categories[reward]) {
            categories[reward] = [];
          }
          categories[reward].push({
            card,
            "value": card.card_custom[reward].toString() + redemption[card.card_redemption],
            "custom": true
          });
        }
      }
    }
    if (card.card_af) {
      if (typeof card.card_af === "string")
        totalAnnualFee += parseInt(card.card_af);
      else
        totalAnnualFee += card.card_af;
    }
  });
  let sortedKeys = Object.keys(categories).sort((a, b) => {
    return categories[b].length - categories[a].length;
  });
  if ($$props.cards === void 0 && $$bindings.cards && cards !== void 0)
    $$bindings.cards(cards);
  if ($$props.localUser === void 0 && $$bindings.localUser && localUser !== void 0)
    $$bindings.localUser(localUser);
  return `<div class="dark:text-white-warm basis-4/6"><div class="flex flex-col lg:flex-row justify-between items-center gap-x-6 pb-2"><div class="py-4 my-4 shadow-all-xl lg:my-0 border divide-x-2 divide-inherit w-full dark:shadow-theme-shadow-dark lg:rounded-md dark:border dark:border-theme-text-white border-x-0 lg:border-x flex flex-row items-start justify-evenly"><div class="text-xl flex flex-col items-center basis-1/2 text-center">Total Annual Fee ${cards.length > 0 ? `<span>$${escape(totalAnnualFee)}</span>` : ``}</div> <div class="text-xl flex flex-col items-center basis-1/2 text-center">Lowest APR Card ${cards.length > 0 ? `<img class="h-8 w-12 rounded-[0.15rem]" style="${"background-color:" + escape(lowestAPRCard.card_color, true)}" src="${"../../storage/" + escape(lowestAPRCard.card_url, true) + ".jpeg"}"${add_attribute("alt", lowestAPRCard.card_name, 0)}>` : ``}</div></div></div> ${Object.keys(categories).length > 0 ? `<ul class="flex flex-row flex-wrap gap-4 px-4 mt-4">${each(sortedKeys, (category) => {
    return `<li>${validate_component(Reward, "Reward").$$render($$result, { categories, category }, {}, {})} </li>`;
  })}</ul>` : ``}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $localUserData, $$unsubscribe_localUserData;
  $$unsubscribe_localUserData = subscribe(localUserData, (value) => $localUserData = value);
  let wallet = [];
  let tracking = [];
  let localUser = convertJSONtoUser($localUserData);
  getCardsFromIDList(localUser.wallet).then((list) => wallet = list.map((card) => applyModifier(card)));
  getCardsFromIDList(localUser.tracking).then((list) => tracking = list.map((card) => applyModifier(card)));
  $$unsubscribe_localUserData();
  return `${$$result.head += `<!-- HEAD_svelte-1dydxfi_START -->${$$result.title = `<title>Credit Card Cafe | Account</title>`, ""}<!-- HEAD_svelte-1dydxfi_END -->`, ""} <main class="bg-theme-white dark:text-theme-text-white dark:bg-theme-black flex flex-col items-center gap-y-6">${localUser.wallet && wallet.length > 0 || localUser.tracking && tracking.length > 0 ? `<div class="rounded-lg bg-theme-lightgray dark:bg-theme-darkgray w-full lg:w-fit flex flex-row justify-center gap-x-6 p-2"><button class="${"rounded-md py-2 px-4 w-fit lg:px-20 lg:text-xl " + escape(
    "bg-theme-blue text-theme-white hover:bg-theme-blue-hov",
    true
  )}">${escape("Viewing Wallet")}</button> <button class="${"rounded-md py-2 px-4 w-fit lg:px-20 lg:text-xl " + escape(
    "hover:bg-theme-lightgray-hov dark:hover:bg-theme-darkgray-hov",
    true
  )}">${escape(
    "Viewing Tracked Cards"
  )}</button> <a href="/table" class="${"rounded-md py-2 px-4 w-fit lg:px-20 lg:text-xl " + escape(
    "hover:bg-theme-lightgray-hov dark:hover:bg-theme-darkgray-hov",
    true
  )}">${escape("View Table")}</a></div> <section class="flex flex-col-reverse lg:flex-row justify-evenly gap-20 lg:px-20 w-full">${`${localUser.wallet && wallet.length > 0 ? `${validate_component(CardStack, "CardStack").$$render($$result, { cards: wallet, allowCardFanning: true }, {}, {})} ${validate_component(Rewards, "Rewards").$$render($$result, { cards: wallet, localUser }, {}, {})}` : `${validate_component(DefaultCreditCard, "DefaultCreditCard").$$render($$result, {}, {}, {})} ${validate_component(Rewards, "Rewards").$$render($$result, { cards: [], localUser }, {}, {})}`}`}</section>` : `<section class="flex flex-col gap-y-6 lg:gap-y-8 px-6 lg:ml-16 lg:w-3/4" data-svelte-h="svelte-1566fq5"><h1 class="text-4xl lg:text-6xl font-bold text-theme-green text-center lg:text-left">Your wallet is empty, and you haven&#39;t started tracking cards!</h1> <h2 class="text-2xl lg:text-4xl font-semibold">Add cards that you own to your Wallet to begin comparing features and rewards</h2> <h2 class="text-2xl lg:text-4xl font-semibold">Experience our &quot;Tracking&quot; feature, to find which card is right for your wallet</h2> <a href="/s/get-started/" class="lg:mt-6 bg-theme-blue hover:bg-theme-blue-hov py-4 px-20 w-full lg:w-fit justify-center text-white inline-flex flex-row rounded-lg text-xl font-semibold items-center">Try it out now!</a></section>`}</main>`;
});
export {
  Page as default
};
