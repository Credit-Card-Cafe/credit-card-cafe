import { s as supabase } from "./supabase_client.js";
async function fetchOneCardByID(id) {
  const { data, error } = await supabase.from("cards").select("*").eq("card_id", id).single();
  if (error) {
    if (error.code == "22P02") {
      console.error(`Remove Invalid Card ID, ${id}`);
    } else {
      console.error("Error fetching card by ID:", error);
      return void 0;
    }
  }
  return data;
}
async function fetchOneCardByURL(url) {
  const { data, error } = await supabase.from("cards").select("*").eq("card_url", url).single();
  if (error) {
    console.error("Error fetching card by URL:", error);
    return void 0;
  }
  return data;
}
async function fetchCardsFromBankName(bank_name) {
  const { data, error } = await supabase.from("cards").select("*").eq("card_bank", bank_name);
  if (error) {
    console.error("Error fetching cards by bank name:", error);
    return [];
  }
  return data;
}
export {
  fetchOneCardByID as a,
  fetchOneCardByURL as b,
  fetchCardsFromBankName as f
};
