import { a as fetchOneBrandByURL } from "../../../../../../chunks/read_brands.js";
const GET = async ({ params }) => {
  const { url } = params;
  if (!url) {
    return new Response("Missing URL", { status: 400 });
  }
  const card = await fetchOneBrandByURL();
  if (!card) {
    return new Response("Brand not found", { status: 404 });
  }
  return new Response(JSON.stringify(card), { status: 200 });
};
export {
  GET
};
