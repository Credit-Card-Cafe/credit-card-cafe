import { getOneBankById, getOneBankByURL, getOneBrandById, getOneCardByID } from "$lib/database/read";
import type { CreditCardType, UserType } from "./types"

//use to display locally modified changed to a card based on user selected modifiers
export function applyModifier(card: CreditCardType, localUser: UserType) {
    if (card.modifiers && localUser.modifiers) {
        const userModifiers = localUser.modifiers
        const modifierId = userModifiers.find((mod) => card.modifiers ? mod in card.modifiers : undefined)
        if (modifierId) {
            let modifierObject = card.modifiers[modifierId]
            
            for (const property in modifierObject) {
                card[property] = modifierObject[property]
            }
        }
    }
    return card
}

export async function injectBankToCard(card: CreditCardType):Promise<CreditCardType> {
    if (card.bank_id) {
        try {
            const bank = await getOneBankById(card.bank_id);
            if (bank) {
                card.bank_name = bank.name;
                card.bank_url = bank.url;
            }
        } catch (error) {
            card.bank_name = "Cannot find Bank"
        }
    }
    return card;
}

export async function injectBrandToCard(card: CreditCardType):Promise<CreditCardType> {
    if (card.brand_id) {
        try {
            const brand = await getOneBrandById(card.brand_id);
            if (brand) {
                card.brand_name = brand.name;
                card.brand_url = brand.url;
            }
        } catch (error) {
            delete card.brand_id
        }
    }
    return card;
}

export async function getCardsFromIDList(idList:Array<string>) {
    let list:CreditCardType[] = []
    for (let id of idList) {
        await getOneCardByID(id).then((card) => {
            list.push(card)
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
    return userData
}
