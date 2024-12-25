import { f as fetchOneBankByName } from "../../../../../../chunks/read_banks.js";
const GET = async ({ params }) => {
  const { name } = params;
  if (!name) {
    return new Response("Missing URL", { status: 400 });
  }
  const card = await fetchOneBankByName(name);
  if (!card) {
    return new Response("Bank not found", { status: 404 });
  }
  return new Response(JSON.stringify(card), { status: 200 });
};
export {
  GET
};
