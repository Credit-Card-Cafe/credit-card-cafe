import { type CardObject } from "$lib/types";
import { getOneCardByID } from "../database/read_cards";


export const load = async () => {
  const cardsOnPage = ["10003", "10002", "10015"]
    let cards:CardObject[] = []

    cardsOnPage.forEach(id => {
      getOneCardByID(id).then((card) => {
        if (card) cards.push(card)
      })
    });
  return {
    cards: cards,
  }
};

//export const prerender = true;