import { type BankObject, type BrandObject, type CardDetails, CardInfoLocation, CardNetwork, type CardObject, CardRedemption, CardType } from "$lib/types";
import { supabase } from "./supabase_client";

const card_rewards_table:{[Key: string]:CardDetails["card_rewards"]} = {
  "10001" : { travel_portal: 5, dining: 3, travel: 2, online_grocery: 2, streaming: 3, default: 1 },
  "10002" : { travel_portal: 10, dining: 3, travel: 3, default: 1 },
  "10003" : { dining:4,supermarket:4,travel_portal:3, default:1 },
  "10004" : { travel: 2, default: 2 },
  "10005" : { default: 1.5 },
  "10006" : { default: 2 },
  "10007" : { rotating: 5, default: 1 },
  "10008" : { default: 1.5 },
  "10009" : { supermarket: 6, streaming: 6, transit: 3, gas: 3, default: 1 },
  "10010" : { },
  "10011" : { custom:0,grocery:2,default:1,wholesale:2},
  "10012" : { },
  "10013" : { },
  "10014" : { },
  "10015" : { flights_portal: 5, travel_portal: 5, default: 1 },
  "10016" : { },
  "10017" : { rotating: 5, dining: 3, drug: 3, travel_portal: 5, default: 1 },
  "10018" : { dining: 3, drug: 3, travel_portal: 5, default: 1.5 },
  "10019" : { },
  "10020" : { travel: 3, default: 1.5 },
  "10021" : { },
  "10022" : { },
  "10023" : { },
  "10024" : { },
  "10025" : { },
  "10026" : { },
  "10027" : { },
  "10028" : { },
  "10029" : { },
  "10030" : { },
  "10031" : { },
  "10032" : { },
  "10033" : { },
  "10034" : { },
  "10035" : { },
  "10036" : { },
  "10037" : { },
  "10038" : { },
  "10039" : { },
  "10040" : { },
  "10041" : { },
  "10042" : { },
  "10043" : { },
  "10044" : { },
  "10045" : { },
  "10046" : { },
  "10047" : { },
  "10048" : { },
  "10049" : { },
  "10050" : { },
  "10051" : { },
  "10052" : { },
  "10053" : { },
  "10054" : { travel: 2, dining: 2, default: 1.5 },
  "10055" : { gas: 5, grocery: 3, default: 1 },
  "10056" : { },
  "10057" : { }
};

//gets one card from its ID. Accepts the card id and returns a promise. 
export async function fetchOneCardByID(id: string): Promise<CardObject | undefined> {
  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .eq('card_id', id)
    .single();

  if (error) {
    if (error.code == "22P02") {
      console.error(`Remove Invalid Card ID, ${id}`)
    } else {
      console.error('Error fetching card by ID:', error);
      return undefined;
    }
  }

  return data as CardObject;
}
  
//finds the first card with the given url
export async function fetchOneCardByURL(url: string): Promise<CardObject | undefined> {
  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .eq('card_url', url)
    .single();

  if (error) {
    console.error('Error fetching card by URL:', error);
    return undefined;
  }

  return data as CardObject;
} 

//gets cards from the card_bank stored in the card object.
export async function fetchCardsFromBankName(bank_name: string): Promise<CardObject[]> {
  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .eq('card_bank', bank_name);

  if (error) {
    console.error('Error fetching cards by bank name:', error);
    return [];
  }

  return data as CardObject[];
} 

//gets cards from the card_brand stored in the card object.
export async function fetchCardsFromBrandName(brand:BrandObject): Promise<CardObject[]> {
  let cards: CardObject[] = []
  let error: string | null = null
  try {
      const { data: fetchedCard, error: supabaseError } = await supabase
      .from('cards')
      .select('*')
      .eq('card_brand', brand.brand_name)
      .order('created_at', { ascending: false })
      if (supabaseError) throw supabaseError
      
      cards = fetchedCard
    } catch (e) {
      error = e instanceof Error ? e.message : 'Unknown error'
    }
  return cards
} 
  
//gets an ordered list of (results)amount of cards sorted by a property
export async function orderCards(param:string, results:number): Promise<CardObject[] | undefined[]> {
  return [undefined]
}

//gets all cards in the databae (depreciated)
export async function fetchCards() {
  return []
}

//gets the image of a card 
export async function fetchCardImage(card: CardObject) {
  return undefined;
}

export async function fetchCardRewards(card: CardObject) {
  //if (card.card_id) return card_rewards_table[card.card_id];
  return undefined
}
