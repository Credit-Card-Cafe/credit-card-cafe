import { c as create_ssr_component, e as escape, i as is_promise, h as noop } from "./ssr.js";
import { a as getOneBankByName } from "./banks.js";
import { g as getOneBrandByURL } from "./brands.js";
const CardName_svelte_svelte_type_style_lang = "";
const css = {
  code: "h1.svelte-44bmck::first-letter{text-transform:capitalize}",
  map: null
};
const CardName = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { card } = $$props;
  let { fontSize = "large" } = $$props;
  const excludedWords = /* @__PURE__ */ new Set(["from", "of", "card", "bank", "credit", "the"]);
  let cardName = card.card_name;
  if (cardName.split(" ").length > 4) {
    cardName = cardName.replace(card.card_bank, "");
  }
  cardName = cardName.split(" ").filter((word) => !excludedWords.has(word.toLowerCase())).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ").trim();
  if ($$props.card === void 0 && $$bindings.card && card !== void 0)
    $$bindings.card(card);
  if ($$props.fontSize === void 0 && $$bindings.fontSize && fontSize !== void 0)
    $$bindings.fontSize(fontSize);
  $$result.css.add(css);
  return `<h1 class="${escape(fontSize == "large" ? "text-4xl lg:text-6xl" : "", true) + " " + escape(fontSize == "medium" ? "text-4xl" : "", true) + " " + escape(fontSize == "small" ? "text-2xl" : "", true) + " font-bold svelte-44bmck"}">${escape(cardName)}</h1> ${card.card_brand ? `${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ` <h2 class="${escape(fontSize == "large" ? "text-3xl" : "", true) + " " + escape(fontSize == "medium" ? "text-2xl" : "", true) + " " + escape(fontSize == "small" ? "text-xl" : "", true) + " font-light"}">${escape(card.card_brand)}</h2> `;
    }
    return function(brand) {
      return ` <h2 class="${escape(fontSize == "large" ? "text-3xl" : "", true) + " " + escape(fontSize == "medium" ? "text-2xl" : "", true) + " " + escape(fontSize == "small" ? "text-xl" : "", true) + " font-light cursor-pointer"}"><a href="${"/brand/" + escape(brand?.brand_url, true)}">${escape(card.card_brand)}</a></h2> `;
    }(__value);
  }(getOneBrandByURL(card.card_brand))}` : `${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ` <h2 class="${escape(fontSize == "large" ? "text-3xl" : "", true) + " " + escape(fontSize == "medium" ? "text-2xl" : "", true) + " " + escape(fontSize == "small" ? "text-xl" : "", true) + " font-light"}">${escape(card.card_bank)}</h2> `;
    }
    return function(bank) {
      return ` <h2 class="${escape(fontSize == "large" ? "text-3xl" : "", true) + " " + escape(fontSize == "medium" ? "text-2xl" : "", true) + " " + escape(fontSize == "small" ? "text-xl" : "", true) + " font-light cursor-pointer"}"><a href="${"/bank/" + escape(bank?.bank_url, true)}">${escape(card.card_bank)}</a></h2> `;
    }(__value);
  }(getOneBankByName(card.card_bank))}`}`;
});
export {
  CardName as C
};
