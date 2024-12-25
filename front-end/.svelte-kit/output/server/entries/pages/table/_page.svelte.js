import { c as create_ssr_component, b as subscribe, i as is_promise, h as noop, v as validate_component } from "../../../chunks/ssr.js";
import { c as convertJSONtoUser, g as getCardsFromIDList, d as getCardsFromURLList, l as localUserData } from "../../../chunks/functions.js";
import { T as Table } from "../../../chunks/Table.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $localUserData, $$unsubscribe_localUserData;
  $$unsubscribe_localUserData = subscribe(localUserData, (value) => $localUserData = value);
  let localUser = convertJSONtoUser($localUserData);
  let tableSettingsData = {
    table_setting_acronym: localUser.table_setting_acronym,
    table_setting_advanced: localUser.table_setting_advanced,
    table_setting_queries: localUser.table_setting_queries,
    table_setting_userselection: localUser.table_setting_userselection
  };
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = ` ${localUser && localUser.wallet && localUser.wallet.length > 0 || localUser.tracking && localUser.tracking.length > 0 ? `${function(__value) {
      if (is_promise(__value)) {
        __value.then(null, noop);
        return ` ${validate_component(Table, "Table").$$render(
          $$result,
          {
            tablelist: [],
            walletIDList: [],
            trackingIDList: [],
            tableCall: 0,
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
        return ` ${validate_component(Table, "Table").$$render(
          $$result,
          {
            tablelist: tableList,
            walletIDList: localUser.wallet,
            trackingIDList: localUser.tracking,
            settings: tableSettingsData,
            tableCall: 0
          },
          {},
          {}
        )} `;
      }(__value);
    }(getCardsFromIDList([...localUser.wallet, ...localUser.tracking]))}` : `${function(__value) {
      if (is_promise(__value)) {
        __value.then(null, noop);
        return ` ${validate_component(Table, "Table").$$render(
          $$result,
          {
            tablelist: [],
            walletIDList: [],
            trackingIDList: [],
            tableCall: 2,
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
        return ` ${validate_component(Table, "Table").$$render(
          $$result,
          {
            tablelist: tableList,
            walletIDList: [],
            trackingIDList: [],
            settings: tableSettingsData,
            tableCall: 2
          },
          {},
          {}
        )} `;
      }(__value);
    }(getCardsFromURLList(["bofa-ccr", "chase-freedom-unlimited", "penfed-platinum"]))}`}`;
  } while (!$$settled);
  $$unsubscribe_localUserData();
  return $$rendered;
});
export {
  Page as default
};
