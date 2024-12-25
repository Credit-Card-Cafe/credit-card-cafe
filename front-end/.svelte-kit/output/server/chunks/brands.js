import { P as PUBLIC_API_URL } from "./cards.js";
async function getOneBrandByURL(url) {
  try {
    const response = await fetch(`${PUBLIC_API_URL}/api/brands/url/${url}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch brand by URL: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getOneBrandsByURL:", error);
    return void 0;
  }
}
export {
  getOneBrandByURL as g
};
