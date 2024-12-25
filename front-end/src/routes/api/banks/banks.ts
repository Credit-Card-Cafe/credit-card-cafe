import { PUBLIC_API_URL } from "$env/static/public";
import {type  BankObject } from "$lib/types";

export async function getOneBankByName(name: string): Promise<BankObject | undefined> {
    try {
      const response = await fetch(`${PUBLIC_API_URL}/api/banks/name/${name}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch bank by Name: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error in getOneBankByName:', error);
      return undefined;
    }
  }

  export async function getOneBankByURL(url: string): Promise<BankObject | undefined> {
    try {
      const response = await fetch(`${PUBLIC_API_URL}/api/banks/url/${url}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch bank by URL: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error in getOneBankByURL:', error);
      return undefined;
    }
  }