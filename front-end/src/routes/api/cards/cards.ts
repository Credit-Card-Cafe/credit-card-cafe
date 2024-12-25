import { PUBLIC_API_URL } from "$env/static/public";
import type { BankObject, BrandObject, CardObject } from "$lib/types";


export async function getOneCardByID(id: string): Promise<CardObject | undefined> {
    try {
      const response = await fetch(`${PUBLIC_API_URL}/api/cards/id/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch card by ID: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error in getOneCardByID:', error);
      return undefined;
    }
  }
  
  // Fetch card by URL
  export async function getOneCardByURL(url: string): Promise<CardObject | undefined> {
    try {
      const response = await fetch(`${PUBLIC_API_URL}/api/cards/url/${url}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch card by URL: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error in getOneCardByURL:', error);
      return undefined;
    }
  }
  
  // Fetch cards by bank name
  export async function getCardsFromBankName(bank: BankObject): Promise<CardObject[]> {
    try {
      const response = await fetch(`${PUBLIC_API_URL}/api/cards/bank/${bank.bank_name}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch cards by bank name: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error in getCardsFromBankName:', error);
      return [];
    }
  }

  export async function getCardsFromBrandName(brand: BrandObject): Promise<CardObject[]> {
    try {
      const response = await fetch(`${PUBLIC_API_URL}/api/cards/brand/${brand.brand_name}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch cards by bank name: ${response.statusText}`);
      }
      return await response.json();
  } catch (error) {
    console.error('Error in getCardsFromBankName:', error);
    return [];
  }
}

export async function getCardRewards(card: CardObject) {
    return undefined
}