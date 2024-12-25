import type { RequestHandler } from '@sveltejs/kit';
import { fetchOneCardByID } from 'server/read_cards';

export const GET: RequestHandler = async ({ params }) => {
  const { id } = params;

  if (!id) {
    return new Response('Missing ID', { status: 400 });
  }

  const card = await fetchOneCardByID(id);

  if (!card) {
    return new Response('Card not found', { status: 404 });
  }

  return new Response(JSON.stringify(card), { status: 200 });
};
