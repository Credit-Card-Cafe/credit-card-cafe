import { writable } from "svelte/store";

export const user = writable();
export const admin = writable(false);

export const cardList = writable([]);

export const newCard = writable({});

export const headerColor = writable("rgb(253,248,244)");

export const oneCard = writable({});

export const bankList = writable([]);
export const unavailableBank = writable(false); //used between contribute/add-card and contribute/add-bank, tracks name of bank typed into card
export const saveCardInfo = writable(false);
