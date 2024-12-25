
import { getOneCardByID, getCardRewards, getOneCardByURL } from "../routes/api/cards/cards";
import { type CardObject, CardRedemption, COP, type ModifiedCardObject, type UserType } from "./types"

//use to display locally modified changed to a card based on user selected modifiers
export function applyModifier(card: CardObject, localUser: UserType):ModifiedCardObject {
    return card
}

//Inject the bank url to the card for hyperlinks. Cards by default do not have card_bankurl, this function finds the brand, and injects the card with bank.bank_url 
export async function injectBankToCard(card: CardObject):Promise<ModifiedCardObject> {
    return card
}

//Inject the brand url to the card for hyperlinks. Cards by default do not have card_brandurl, this function finds the brand, and injects the card with brand.brand_url 
export async function injectBrandToCard(card: CardObject):Promise<ModifiedCardObject> {
    return card;
}

export async function getCardsFromIDList(idList:Array<string>) {
    let list:ModifiedCardObject[] = []
    for (let id of idList) {
        await getOneCardByID(id).then(async (card) => {
            if (card) list.push({...card, card_rewards: await getCardRewards(card)})
        }).catch((error) => {
            console.log(error)
            console.log("One Card Missing")
        });
    }
    return list
}
export async function getCardsFromURLList(urlList:Array<string>) {
    let list:ModifiedCardObject[] = []
    for (let url of urlList) {
        await getOneCardByURL(url).then(async (card) => {
            if (card) list.push({...card, card_rewards: await getCardRewards(card)})
        }).catch((error) => {
            console.log(error)
            console.log("One Card Missing")
        });
    }
    return list
}

export function convertJSONtoUser(jsonString:string) {
    const jsonObject = JSON.parse(jsonString)
    let userData:UserType = {
        wallet: [],
        tracking: [],
    }
    if (jsonObject.wallet) { userData.wallet = jsonObject.wallet }
    if (jsonObject.tracking) { userData.tracking = jsonObject.tracking }
    if (jsonObject.display_name) { userData.display_name = jsonObject.display_name }
    if (jsonObject.custom_choices) { userData.custom_choices = jsonObject.custom_choices }
    if (jsonObject.modifiers) { userData.modifiers = jsonObject.modifiers }
    if (jsonObject.table_setting_acronym) { userData.table_setting_acronym = jsonObject.table_setting_acronym }
    if (jsonObject.table_setting_advanced) { userData.table_setting_advanced = jsonObject.table_setting_advanced }
    if (jsonObject.table_setting_queries) { userData.table_setting_queries = jsonObject.table_setting_queries }
    if (jsonObject.table_setting_userselection) { userData.table_setting_userselection = jsonObject.table_setting_userselection }
    return userData
}

export function parseDatabaseString(card: CardObject , query: COP):string {
    const cardString = card[query]
    if (cardString === null || cardString === undefined) {
        return "[No Data]"
    }
    if (query === "card_weight") {
        return cardString.toString() + "g"
    }
    if (query === "card_af" || query == "card_auc") {
        return "$" + cardString.toString()
    }
    if (query === "card_ftf") {
        if (cardString == 0) return "No FTF"
        return cardString.toString() + "%"
    }
    if (query === "card_btf" || query == "card_caf" || query == "card_lpf") {
        if (typeof cardString === "string") {
            if (cardString.includes("|")) {
                let vals = cardString.split("|")
                return vals[1] + "%, $" + vals[0] +" minimum"
            } else if (cardString.includes("<=")) {
                return "Up to $" + cardString.slice(2)
            }
        }
        if (cardString == 0) return "No Fee"
        return cardString.toString() + "%"
    }
    if (typeof cardString == "boolean") {
        if (cardString) {
            return "Yes"
        }
        return "No"
    }
    if (query === "card_subt") return cardString.toString() + ' Months'
    if (query === "card_subq") return "Spend $" + cardString.toString()
    if (query === "card_subv") {
        if (card.card_redemption === CardRedemption.CashBack) {
            if (typeof cardString == "string") return "$" + (parseInt(cardString) / 100).toLocaleString()
            else return "$" + (cardString / 100).toLocaleString() 
        } else {
            if (typeof cardString == "string") return parseInt(cardString).toLocaleString() + "x"
            else return cardString.toLocaleString() + "x"
        }
    }
    let newString = ''
    if (typeof cardString == "string") {
        if (cardString.includes("|")) {
            for (const val of cardString.split("|")) {
                newString += val + "% or " 
            }
            newString = newString.slice(0, -4)
        } else if (cardString.includes("-")){
            let vals = cardString.split("-")
            newString += vals[0] + "% to " + vals[1] + "% (V)"
        } else {
            newString = cardString
        }
    } else {
        newString = cardString.toString() + "%"
    }
    return newString
}

