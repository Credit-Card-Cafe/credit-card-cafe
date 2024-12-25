import { c as create_ssr_component, b as subscribe, e as escape, v as validate_component } from "./ssr.js";
import { l as localUserData, c as convertJSONtoUser } from "./functions.js";
import { w as writable } from "./index.js";
const TrackCard_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".btn.svelte-1q32z87{@apply  text-white py-1 px-4 rounded-md transition-all text-sm;}",
  map: null
};
const TrackCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let localUser;
  let $localUserData, $$unsubscribe_localUserData;
  $$unsubscribe_localUserData = subscribe(localUserData, (value) => $localUserData = value);
  let { id } = $$props;
  var Fields = /* @__PURE__ */ ((Fields2) => {
    Fields2["Wallet"] = "wallet";
    Fields2["Tracking"] = "tracking";
    return Fields2;
  })(Fields || {});
  let show;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  $$result.css.add(css$1);
  localUser = convertJSONtoUser($localUserData);
  $$unsubscribe_localUserData();
  return `${localUser ? `<div class="flex flex-row my-6 justify-center z-10">${`${`${show == Fields.Wallet ? `<button class="btn bg-theme-red hover:bg-theme-red-hov svelte-1q32z87" data-svelte-h="svelte-wrv8y5">Remove Card from wallet</button>` : `${show == Fields.Tracking ? `<button class="btn bg-theme-red hover:bg-theme-red-hov svelte-1q32z87" data-svelte-h="svelte-1l0zsy5">Stop tracking this Card</button>` : `<div data-svelte-h="svelte-194gxkm">Loading...</div>`}`}`}`}</div>` : ``}`;
});
const CreditCard_svelte_svelte_type_style_lang = "";
const css = {
  code: "#creditCard.svelte-46sg9u{position:relative;background-color:linear-gradient(146deg, rgb(var(--color)), rgba(var(--color), 0.6), rgb(var(--color)));width:20.25rem;height:12.75rem;border-radius:0.75rem;background-size:contain;background-repeat:no-repeat}",
  map: null
};
const CreditCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_isMobile;
  let { card } = $$props;
  let { showTrackCard = false } = $$props;
  let { allowClick = true } = $$props;
  let { shadow = true } = $$props;
  let { altLink = void 0 } = $$props;
  const isMobile = writable(false);
  $$unsubscribe_isMobile = subscribe(isMobile, (value) => value);
  `/card/${card.card_url}`;
  if ($$props.card === void 0 && $$bindings.card && card !== void 0)
    $$bindings.card(card);
  if ($$props.showTrackCard === void 0 && $$bindings.showTrackCard && showTrackCard !== void 0)
    $$bindings.showTrackCard(showTrackCard);
  if ($$props.allowClick === void 0 && $$bindings.allowClick && allowClick !== void 0)
    $$bindings.allowClick(allowClick);
  if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0)
    $$bindings.shadow(shadow);
  if ($$props.altLink === void 0 && $$bindings.altLink && altLink !== void 0)
    $$bindings.altLink(altLink);
  $$result.css.add(css);
  $$unsubscribe_isMobile();
  return `${card && card.card_url ? `<div class="${escape(showTrackCard && card.card_id ? " items-center" : "", true) + " flex flex-col"}"><button><div id="creditCard" class="${"creditCard z-20 flex flex-col items-center justify-evenly " + escape(
    shadow ? "shadow-2xl shadow-theme-shadow dark:shadow-theme-shadow-dark" : "",
    true
  ) + " svelte-46sg9u"}" style="${"background-color:" + escape(card.card_color, true) + "; background-image: url('/storage/" + escape(card.card_url, true) + ".jpeg')"}">${slots.default ? slots.default({}) : ``}</div></button> ${showTrackCard && card.card_id ? `${validate_component(TrackCard, "TrackCard").$$render($$result, { id: card.card_id }, {}, {})}` : ``}</div>` : ``}`;
});
export {
  CreditCard as C
};
