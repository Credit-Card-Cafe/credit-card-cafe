import { a as fetchOneBankByURL } from "../../../../../../chunks/read_banks.js";
const GET = async ({ params }) => {
  const { url } = params;
  if (!url) {
    return new Response("Missing URL", { status: 400 });
  }
  const card = await fetchOneBankByURL();
  if (!card) {
    return new Response("Bank not found", { status: 404 });
  }
  return new Response(JSON.stringify(card), { status: 200 });
};
export {
  GET
};
