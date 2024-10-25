import { writable } from "svelte/store";
import { browser } from "$app/environment"

import { COP, TLS, type BankObject, type ModifiedCardObject } from "./types";

export const cardList = writable<Array<ModifiedCardObject>>([]);
export const bankList = writable<Array<BankObject>>([]);

const defaultUser = JSON.stringify({
    wallet:[],
    tracking:[],
    custom_choices: [],
    modifiers: [],
    table_setting_acronym: false,
    table_setting_advanced: false,
    table_setting_queries: [COP.card_network, COP.card_af, COP.card_ftf, COP.card_apr],
    table_setting_userselection: TLS.Both
})

const USER_LOCAL_STORAGE = "local_user_storage"

export const localUserData = writable<string>(browser && localStorage.getItem(USER_LOCAL_STORAGE) ? localStorage.getItem(USER_LOCAL_STORAGE) as string : defaultUser)
    
localUserData.subscribe((val) => {
    if (browser) {
        localStorage.setItem(USER_LOCAL_STORAGE, val)
    }
})
