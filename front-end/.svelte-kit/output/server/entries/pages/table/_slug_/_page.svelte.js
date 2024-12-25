import { c as create_ssr_component, b as subscribe, i as is_promise, h as noop, v as validate_component, e as escape } from "../../../../chunks/ssr.js";
import { c as convertJSONtoUser, g as getCardsFromIDList, l as localUserData } from "../../../../chunks/functions.js";
import { T as Table } from "../../../../chunks/Table.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $localUserData, $$unsubscribe_localUserData;
  $$unsubscribe_localUserData = subscribe(localUserData, (value) => $localUserData = value);
  let { data } = $$props;
  const cardList = data.category?.list;
  let localUser = convertJSONtoUser($localUserData);
  let tableSettingsData = {
    table_setting_acronym: localUser.table_setting_acronym,
    table_setting_advanced: localUser.table_setting_advanced,
    table_setting_queries: localUser.table_setting_queries,
    table_setting_userselection: localUser.table_setting_userselection
  };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${cardList ? `${function(__value) {
      if (is_promise(__value)) {
        __value.then(null, noop);
        return ` ${validate_component(Table, "Table").$$render(
          $$result,
          {
            tablelist: [],
            walletIDList: [],
            trackingIDList: [],
            tableCall: 1,
            settings: tableSettingsData
          },
          {
            settings: ($$value) => {
              tableSettingsData = $$value;
              $$settled = false;
            }
          },
          {}
        )} `;
      }
      return function(tableList) {
        return ` <div class="text-3xl md:text-6xl font-semibold text-center">${escape(data.category?.title)}</div> ${validate_component(Table, "Table").$$render(
          $$result,
          {
            tablelist: tableList,
            walletIDList: [],
            trackingIDList: [],
            settings: tableSettingsData,
            tableCall: 1
          },
          {},
          {}
        )} `;
      }(__value);
    }(getCardsFromIDList(cardList))}` : `<main class="bg-theme-white dark:text-theme-text-white dark:bg-theme-black" data-svelte-h="svelte-128ajl4"><div class="text-xl md:text-2xl font-semibold text-center my-20">Error: Table List Doesn&#39;t Exist</div> <div class="text-2xl md:text-6xl font-semibold text-center mb-20">That&#39;s one too many syllables there, bub</div></main>`}`;
  } while (!$$settled);
  $$unsubscribe_localUserData();
  return $$rendered;
});
export {
  Page as default
};
