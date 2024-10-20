import { writable } from "svelte/store";
import { browser } from "$app/environment"

import type { BankObject, ModifiedCardObject } from "./types";

export const cardList = writable<Array<ModifiedCardObject>>([]);
export const bankList = writable<Array<BankObject>>([]);

const defaultUser = JSON.stringify({
    wallet:[],
    tracking:[],
    custom_choices: [],
    modifiers: [],
})

const USER_LOCAL_STORAGE = "local_user_storage"

export const localUserData = writable<string>(browser && localStorage.getItem(USER_LOCAL_STORAGE) ? localStorage.getItem(USER_LOCAL_STORAGE) as string : defaultUser)
    
localUserData.subscribe((val) => {
    if (browser) {
        localStorage.setItem(USER_LOCAL_STORAGE, val)
    }
})
