import { P as PUBLIC_API_URL } from "./cards.js";
async function getOneBankByName(name) {
  try {
    const response = await fetch(`${PUBLIC_API_URL}/api/banks/name/${name}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch bank by Name: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getOneBankByName:", error);
    return void 0;
  }
}
async function getOneBankByURL(url) {
  try {
    const response = await fetch(`${PUBLIC_API_URL}/api/banks/url/${url}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch bank by URL: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getOneBankByURL:", error);
    return void 0;
  }
}
export {
  getOneBankByName as a,
  getOneBankByURL as g
};
