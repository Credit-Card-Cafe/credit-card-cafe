const PUBLIC_API_URL = "http://localhost:4173";
async function getOneCardByID(id) {
  try {
    const response = await fetch(`${PUBLIC_API_URL}/api/cards/id/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch card by ID: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getOneCardByID:", error);
    return void 0;
  }
}
async function getOneCardByURL(url) {
  try {
    const response = await fetch(`${PUBLIC_API_URL}/api/cards/url/${url}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch card by URL: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getOneCardByURL:", error);
    return void 0;
  }
}
async function getCardsFromBankName(bank) {
  try {
    const response = await fetch(`${PUBLIC_API_URL}/api/cards/bank/${bank.bank_name}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch cards by bank name: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getCardsFromBankName:", error);
    return [];
  }
}
async function getCardsFromBrandName(brand) {
  try {
    const response = await fetch(`${PUBLIC_API_URL}/api/cards/brand/${brand.brand_name}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch cards by bank name: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getCardsFromBankName:", error);
    return [];
  }
}
async function getCardRewards(card) {
  return void 0;
}
export {
  PUBLIC_API_URL as P,
  getCardsFromBankName as a,
  getCardsFromBrandName as b,
  getCardRewards as c,
  getOneCardByID as d,
  getOneCardByURL as g
};
