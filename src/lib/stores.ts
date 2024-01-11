import { writable } from "svelte/store";
import { rgbToHex } from "./functions";
import type { BankType, CreditCardType, UserType, HEX } from "./types";

export const user = writable<UserType | null>();
export const admin = writable(false);

export const cardList = writable<Array<CreditCardType>>([]);

export const newCard = writable<CreditCardType | undefined>(undefined);

export const headerColor = writable<HEX>(rgbToHex([253,248,244]));

export const oneCard = writable<CreditCardType | undefined>({
    name: "Loading...",
    bank: "CreditCardDB",
    color: [253, 248, 244],
    id: "null"
});

export const bankList = writable<Array<BankType>>([]);
export const unavailableBank = writable<undefined | string>(undefined); //used between contribute/add-card and contribute/add-bank, tracks name of bank typed into card
export const saveCardInfo = writable<CreditCardType | undefined>(undefined);
