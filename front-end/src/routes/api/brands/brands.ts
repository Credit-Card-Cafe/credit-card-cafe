import { PUBLIC_API_URL } from "$env/static/public";
import {type BrandObject } from "$lib/types";

export async function getOneBrandByName(name: string): Promise<BrandObject | undefined> {
    try {
      const response = await fetch(`${PUBLIC_API_URL}/api/brands/name/${name}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch brand by Name: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error in getOneBrandByName:', error);
      return undefined;
    }
  }

  export async function getOneBrandByURL(url: string): Promise<BrandObject | undefined> {
    try {
      const response = await fetch(`${PUBLIC_API_URL}/api/brands/url/${url}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch brand by URL: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error in getOneBrandsByURL:', error);
      return undefined;
    }
  }