import { f as fetchOneBrandByName } from "../../../../../../chunks/read_brands.js";
const GET = async ({ params }) => {
  const { name } = params;
  if (!name) {
    return new Response("Missing URL", { status: 400 });
  }
  const card = await fetchOneBrandByName();
  if (!card) {
    return new Response("Bramd not found", { status: 404 });
  }
  return new Response(JSON.stringify(card), { status: 200 });
};
export {
  GET
};
