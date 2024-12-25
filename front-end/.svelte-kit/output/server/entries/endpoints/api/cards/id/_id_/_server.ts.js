import { a as fetchOneCardByID } from "../../../../../../chunks/read_cards.js";
const GET = async ({ params }) => {
  const { id } = params;
  if (!id) {
    return new Response("Missing ID", { status: 400 });
  }
  const card = await fetchOneCardByID(id);
  if (!card) {
    return new Response("Card not found", { status: 404 });
  }
  return new Response(JSON.stringify(card), { status: 200 });
};
export {
  GET
};
