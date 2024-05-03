import { getOneCardByURL } from '$lib/database/read.js';

export const load = async ({ params }) => {
  let card = await getOneCardByURL(params.slug);
  return {
    card: card,
    slug: params.slug
  }
};
