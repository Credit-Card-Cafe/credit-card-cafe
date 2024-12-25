import { c as create_ssr_component, d as each, a as add_attribute, e as escape, v as validate_component } from "./ssr.js";
import { C as CreditCard } from "./CreditCard.js";
const CardStack = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { cards } = $$props;
  let { allowCardFanning = true } = $$props;
  let { showTrackCard = false } = $$props;
  let { allowClick = true } = $$props;
  if ($$props.cards === void 0 && $$bindings.cards && cards !== void 0)
    $$bindings.cards(cards);
  if ($$props.allowCardFanning === void 0 && $$bindings.allowCardFanning && allowCardFanning !== void 0)
    $$bindings.allowCardFanning(allowCardFanning);
  if ($$props.showTrackCard === void 0 && $$bindings.showTrackCard && showTrackCard !== void 0)
    $$bindings.showTrackCard(showTrackCard);
  if ($$props.allowClick === void 0 && $$bindings.allowClick && allowClick !== void 0)
    $$bindings.allowClick(allowClick);
  return `${allowCardFanning ? `<div>${each(cards, (card) => {
    return `<div${add_attribute("id", card.card_url, 0)} class="${escape(showTrackCard ? "mb-[-14rem]" : "mb-[-9rem]", true) + " transition-all last:mb-12 hover:mb-12 flex flex-col items-center"}">${validate_component(CreditCard, "CreditCard").$$render($$result, { card, showTrackCard, allowClick }, {}, {})} </div>`;
  })}</div>` : `${!allowCardFanning ? `<div class="mx-auto">${each(cards, (card, index) => {
    return `<div${add_attribute("id", card.card_url, 0)}${add_attribute("class", `mb-[-9rem] mb-12 translate-x-${index * 12}`, 0)}>${validate_component(CreditCard, "CreditCard").$$render($$result, { card, showTrackCard, allowClick }, {}, {})} </div>`;
  })}</div>` : ``}`}`;
});
export {
  CardStack as C
};
