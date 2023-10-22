import { writable } from "svelte/store";

export const user = writable();

export const cardList = writable([]);

export const newCard = writable({});

export const headerColor = writable("rgb(253,248,244)");

export const oneCard = writable({});
