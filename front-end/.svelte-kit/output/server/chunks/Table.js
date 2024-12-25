import { c as create_ssr_component, j as compute_rest_props, d as each, e as escape, n as null_to_empty, b as subscribe, a as add_attribute, v as validate_component, i as is_promise, h as noop } from "./ssr.js";
import { p as parseDatabaseString, l as localUserData, c as convertJSONtoUser, i as injectBankToCard, b as injectBrandToCard } from "./functions.js";
import { T as TLS, C as COP } from "./types.js";
import { c as cardFieldNames } from "./fields.js";
import { a as getOneBankByName } from "./banks.js";
const TableData_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".tdTwo.svelte-1av7o6m{@apply border-l-2 border-theme-lightgray w-1/2;}td.svelte-1av7o6m{@apply p-4;}",
  map: null
};
const TableData = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["card", "queries"]);
  let { card } = $$props;
  let { queries } = $$props;
  if ($$props.card === void 0 && $$bindings.card && card !== void 0)
    $$bindings.card(card);
  if ($$props.queries === void 0 && $$bindings.queries && queries !== void 0)
    $$bindings.queries(queries);
  $$result.css.add(css$1);
  return `${each(queries, (query) => {
    return `<td class="${escape(null_to_empty($$restProps.class || ""), true) + " svelte-1av7o6m"}">${escape(card[query] === void 0 ? "[No Data]" : parseDatabaseString(card, query))} </td>`;
  })}`;
});
const TableQuery = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isChecked;
  let $localUserData, $$unsubscribe_localUserData;
  $$unsubscribe_localUserData = subscribe(localUserData, (value) => $localUserData = value);
  let { field } = $$props;
  let { queries } = $$props;
  let { cardName } = $$props;
  let { useAcronyms } = $$props;
  convertJSONtoUser($localUserData);
  if ($$props.field === void 0 && $$bindings.field && field !== void 0)
    $$bindings.field(field);
  if ($$props.queries === void 0 && $$bindings.queries && queries !== void 0)
    $$bindings.queries(queries);
  if ($$props.cardName === void 0 && $$bindings.cardName && cardName !== void 0)
    $$bindings.cardName(cardName);
  if ($$props.useAcronyms === void 0 && $$bindings.useAcronyms && useAcronyms !== void 0)
    $$bindings.useAcronyms(useAcronyms);
  isChecked = queries.includes(field);
  $$unsubscribe_localUserData();
  return `<input${add_attribute("id", `query${field}`, 0)} class="hidden" type="checkbox"${add_attribute("value", field, 0)}> <label${add_attribute("for", `query${field}`, 0)}${add_attribute(
    "class",
    `text-center py-1 px-4 rounded-full inline-block mx-1 my-1 transition-colors cursor-pointer 
${isChecked ? "bg-theme-green hover:bg-theme-green-hov text-theme-black" : "bg-theme-lightgray hover:bg-theme-lightgray-hov dark:bg-theme-darkgray dark:hover:bg-theme-darkgray-hov"}`,
    0
  )}>${escape(cardName(field))}</label>`;
});
const Table_svelte_svelte_type_style_lang = "";
const css = {
  code: "th.svelte-yx6tid,td.svelte-yx6tid{@apply p-4;}",
  map: null
};
const Table = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { tablelist } = $$props;
  let { walletIDList } = $$props;
  let { trackingIDList } = $$props;
  let { tableCall } = $$props;
  let { settings } = $$props;
  let cardIDList;
  let userSelection = settings.table_setting_userselection ? settings.table_setting_userselection : TLS.Both;
  let showAdvancedQueries = settings.table_setting_advanced ? settings.table_setting_advanced : false;
  let useAcronyms = settings.table_setting_acronym ? settings.table_setting_acronym : false;
  var selectedQueries = settings.table_setting_queries ? settings.table_setting_queries : [COP.card_network, COP.card_af, COP.card_ftf, COP.card_apr];
  let availableQueries = Object.values(COP);
  const advancedQueries = [
    COP.card_auc,
    COP.card_btapr,
    COP.card_btf,
    COP.card_caapr,
    COP.card_caf,
    COP.card_chip,
    COP.card_embossed,
    COP.card_il,
    COP.card_lpapr,
    COP.card_lpf,
    COP.card_material,
    COP.card_redemption,
    COP.card_subq,
    COP.card_subt,
    COP.card_subv,
    COP.card_ttp,
    COP.card_weight
  ];
  function setAvailableQueries() {
    if (showAdvancedQueries)
      availableQueries = [.../* @__PURE__ */ new Set([...availableQueries, ...advancedQueries])];
    else
      availableQueries = availableQueries.filter((item) => !advancedQueries.includes(item) || selectedQueries.includes(item));
    settings.table_setting_advanced = showAdvancedQueries;
  }
  if (tablelist.length > 0) {
    Promise.all(tablelist.map(async (card) => {
      let updatedCard = await injectBankToCard(card);
      if (card.card_brand) {
        updatedCard = await injectBrandToCard(card);
      }
      return updatedCard;
    })).then((updatedTablelist) => {
      tablelist = updatedTablelist;
    });
  }
  function cardName(query) {
    if (useAcronyms) {
      let words = cardFieldNames[query].split(" ");
      let newString = "";
      if (words.length > 1) {
        words.forEach((word) => {
          newString += word[0];
        });
        return newString;
      }
    }
    return cardFieldNames[query];
  }
  if ($$props.tablelist === void 0 && $$bindings.tablelist && tablelist !== void 0)
    $$bindings.tablelist(tablelist);
  if ($$props.walletIDList === void 0 && $$bindings.walletIDList && walletIDList !== void 0)
    $$bindings.walletIDList(walletIDList);
  if ($$props.trackingIDList === void 0 && $$bindings.trackingIDList && trackingIDList !== void 0)
    $$bindings.trackingIDList(trackingIDList);
  if ($$props.tableCall === void 0 && $$bindings.tableCall && tableCall !== void 0)
    $$bindings.tableCall(tableCall);
  if ($$props.settings === void 0 && $$bindings.settings && settings !== void 0)
    $$bindings.settings(settings);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      setAvailableQueries();
    }
    cardIDList = (() => {
      if (userSelection == TLS.Wallet) {
        return walletIDList;
      } else if (userSelection == TLS.Tracking) {
        return trackingIDList;
      } else if (userSelection == TLS.Both) {
        return [...walletIDList, ...trackingIDList];
      } else {
        return [];
      }
    })();
    $$rendered = `<main class="bg-theme-white dark:text-theme-text-white dark:bg-theme-black flex flex-col px-4">${walletIDList.length <= 0 && trackingIDList.length <= 0 && tableCall == 2 ? `<section class="flex flex-col gap-y-8 lg:ml-16 lg:w-3/4 mb-12" data-svelte-h="svelte-6hqwrv"><h1 class="text-4xl lg:text-6xl font-bold text-theme-green text-center lg:text-left ">Your wallet is empty, and you haven&#39;t started tracking cards!</h1> <h2 class="text-2xl lg:text-4xl font-semibold">Use our table to compare any property of cards in your wallet, and cards you are interested in!</h2> <a href="/s/get-started/" class="hidden lg:block mt-6 bg-theme-blue hover:bg-theme-blue-hov py-4 px-20 w-full lg:w-fit justify-center text-white inline-flex flex-row rounded-lg text-xl font-semibold items-center">Try it out now!</a></section>` : ``} <div class="mb-10 flex flex-row flex-wrap justify-center">${each(availableQueries, (property) => {
      return `${validate_component(TableQuery, "TableQuery").$$render(
        $$result,
        {
          field: property,
          cardName,
          useAcronyms,
          queries: selectedQueries
        },
        {
          queries: ($$value) => {
            selectedQueries = $$value;
            $$settled = false;
          }
        },
        {}
      )}`;
    })} <button${add_attribute(
      "class",
      `text-center py-1 px-4 rounded-full inline-block mx-1 my-1 transition-colors cursor-pointer 
        ${"bg-theme-lightgray hover:bg-theme-lightgray-hov dark:bg-theme-darkgray dark:hover:bg-theme-darkgray-hov"}`,
      0
    )}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path></svg></button></div> ${``} ${tablelist.length < 1 ? `<div class="hidden lg:block text-center text-sm" data-svelte-h="svelte-zmsdf9">Track cards or add cards to your wallet to view them on the table!</div>` : ``} <div class="w-full overflow-x-scroll"><table class="dark:text-white-warm max-w-fit rounded-r-xl table-fixed overflow-x-scroll"> <tr class="table-row"><th class="svelte-yx6tid" data-svelte-h="svelte-96a9c">Card</th> <th class="svelte-yx6tid"><button data-svelte-h="svelte-1p76erc">Bank</button></th> ${each(selectedQueries, (query) => {
      return `<th class="svelte-yx6tid"><button>${escape(cardName(query))}</button></th>`;
    })}</tr>   ${each(tablelist, (card) => {
      return `${card.card_id && cardIDList.includes(card.card_id) || !(walletIDList.length > 0 && trackingIDList.length > 0) ? `<tr class="even:bg-theme-green/25 dark:even:bg-inherit dark:border-t-2 dark:border-theme-green/10"><td class="table-cell flex-col items-center text-left odd:rounded-xl odd:rounded-r-none odd:rounded-l-xl svelte-yx6tid"><a href="${"/card/" + escape(card.card_url, true)}" class="font-medium mb-6 md:mb-0 md:font-normal">${escape(card.card_name)}</a></td> ${function(__value) {
        if (is_promise(__value)) {
          __value.then(null, noop);
          return ` <td class="even:bg-black/5 odd:last:rounded-r-xl  svelte-yx6tid">${escape(card.card_bank)}</td> `;
        }
        return function(bank) {
          return ` <td class="even:bg-black/5 odd:last:rounded-r-xl  svelte-yx6tid"><a href="${"/bank/" + escape(bank?.bank_url, true)}">${escape(bank ? bank.bank_name : card.card_bank)}</a></td> `;
        }(__value);
      }(getOneBankByName(card.card_bank))} ${validate_component(TableData, "TableData").$$render(
        $$result,
        {
          class: "even:bg-black/5 odd:last:rounded-r-xl ",
          queries: selectedQueries,
          card
        },
        {},
        {}
      )} </tr>` : ``}`;
    })} </table></div> </main>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Table as T
};
