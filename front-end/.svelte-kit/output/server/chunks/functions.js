import { w as writable } from "./index.js";
import { C as COP, T as TLS, a as CardRedemption } from "./types.js";
import { d as getOneCardByID, c as getCardRewards, g as getOneCardByURL } from "./cards.js";
const defaultUser = JSON.stringify({
  wallet: [],
  tracking: [],
  custom_choices: [],
  modifiers: [],
  table_setting_acronym: false,
  table_setting_advanced: false,
  table_setting_queries: [COP.card_network, COP.card_af, COP.card_ftf, COP.card_apr],
  table_setting_userselection: TLS.Both
});
const localUserData = writable(defaultUser);
localUserData.subscribe((val) => {
});
function applyModifier(card, localUser) {
  return card;
}
async function injectBankToCard(card) {
  return card;
}
async function injectBrandToCard(card) {
  return card;
}
async function getCardsFromIDList(idList) {
  let list = [];
  for (let id of idList) {
    await getOneCardByID(id).then(async (card) => {
      if (card)
        list.push({ ...card, card_rewards: await getCardRewards() });
    }).catch((error) => {
      console.log(error);
      console.log("One Card Missing");
    });
  }
  return list;
}
async function getCardsFromURLList(urlList) {
  let list = [];
  for (let url of urlList) {
    await getOneCardByURL(url).then(async (card) => {
      if (card)
        list.push({ ...card, card_rewards: await getCardRewards() });
    }).catch((error) => {
      console.log(error);
      console.log("One Card Missing");
    });
  }
  return list;
}
function convertJSONtoUser(jsonString) {
  const jsonObject = JSON.parse(jsonString);
  let userData = {
    wallet: [],
    tracking: []
  };
  if (jsonObject.wallet) {
    userData.wallet = jsonObject.wallet;
  }
  if (jsonObject.tracking) {
    userData.tracking = jsonObject.tracking;
  }
  if (jsonObject.display_name) {
    userData.display_name = jsonObject.display_name;
  }
  if (jsonObject.custom_choices) {
    userData.custom_choices = jsonObject.custom_choices;
  }
  if (jsonObject.modifiers) {
    userData.modifiers = jsonObject.modifiers;
  }
  if (jsonObject.table_setting_acronym) {
    userData.table_setting_acronym = jsonObject.table_setting_acronym;
  }
  if (jsonObject.table_setting_advanced) {
    userData.table_setting_advanced = jsonObject.table_setting_advanced;
  }
  if (jsonObject.table_setting_queries) {
    userData.table_setting_queries = jsonObject.table_setting_queries;
  }
  if (jsonObject.table_setting_userselection) {
    userData.table_setting_userselection = jsonObject.table_setting_userselection;
  }
  return userData;
}
function parseDatabaseString(card, query) {
  const cardString = card[query];
  if (cardString === null || cardString === void 0) {
    return "[No Data]";
  }
  if (query === "card_weight") {
    return cardString.toString() + "g";
  }
  if (query === "card_af" || query == "card_auc") {
    return "$" + cardString.toString();
  }
  if (query === "card_ftf") {
    if (cardString == 0)
      return "No FTF";
    return cardString.toString() + "%";
  }
  if (query === "card_btf" || query == "card_caf" || query == "card_lpf") {
    if (typeof cardString === "string") {
      if (cardString.includes("|")) {
        let vals = cardString.split("|");
        return vals[1] + "%, $" + vals[0] + " minimum";
      } else if (cardString.includes("<=")) {
        return "Up to $" + cardString.slice(2);
      }
    }
    if (cardString == 0)
      return "No Fee";
    return cardString.toString() + "%";
  }
  if (typeof cardString == "boolean") {
    if (cardString) {
      return "Yes";
    }
    return "No";
  }
  if (query === "card_subt")
    return cardString.toString() + " Months";
  if (query === "card_subq")
    return "Spend $" + cardString.toString();
  if (query === "card_subv") {
    if (card.card_redemption === CardRedemption.CashBack) {
      if (typeof cardString == "string")
        return "$" + (parseInt(cardString) / 100).toLocaleString();
      else
        return "$" + (cardString / 100).toLocaleString();
    } else {
      if (typeof cardString == "string")
        return parseInt(cardString).toLocaleString() + "x";
      else
        return cardString.toLocaleString() + "x";
    }
  }
  let newString = "";
  if (typeof cardString == "string") {
    if (cardString.includes("|")) {
      for (const val of cardString.split("|")) {
        newString += val + "% or ";
      }
      newString = newString.slice(0, -4);
    } else if (cardString.includes("-")) {
      let vals = cardString.split("-");
      newString += vals[0] + "% to " + vals[1] + "% (V)";
    } else {
      newString = cardString;
    }
  } else {
    newString = cardString.toString() + "%";
  }
  return newString;
}
export {
  applyModifier as a,
  injectBrandToCard as b,
  convertJSONtoUser as c,
  getCardsFromURLList as d,
  getCardsFromIDList as g,
  injectBankToCard as i,
  localUserData as l,
  parseDatabaseString as p
};
