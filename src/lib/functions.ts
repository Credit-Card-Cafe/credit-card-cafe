import { getOneCardByID } from "$lib/database/read";
import type { CreditCardType, UserType } from "./types"

export function applyModifier(card: CreditCardType, localUser: UserType) {
    if (card.modifiers && localUser.modifiers) {
        const userModifiers = localUser.modifiers
        const modifierId = userModifiers.find((mod) => mod in card.modifiers)
        if (modifierId) {
            let modifierObject = card.modifiers[modifierId]
            
            for (const property in modifierObject) {
                card[property] = modifierObject[property]
            }
        }
    }
    return card
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
