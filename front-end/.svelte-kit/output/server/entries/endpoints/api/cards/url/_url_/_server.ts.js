import { b as fetchOneCardByURL } from "../../../../../../chunks/read_cards.js";
const GET = async ({ params }) => {
  const { url } = params;
  if (!url) {
    return new Response("URL parameter is missing", { status: 400 });
  }
  try {
    const card = await fetchOneCardByURL(url);
    if (!card) {
      return new Response("Card not found", { status: 404 });
    }
    return new Response(JSON.stringify(card, null, 1), { status: 200 });
  } catch (error) {
    console.error("Error in [url].ts:", error);
    return new Response("Internal server error", { status: 500 });
  }
};
export {
  GET
};
