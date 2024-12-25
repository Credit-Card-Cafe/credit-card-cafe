import type { RequestHandler } from '@sveltejs/kit';
import { fetchOneBrandByName } from 'server/read_brands';

export const GET: RequestHandler = async ({ params }) => {
  const { name } = params;

  if (!name) {
    return new Response('Missing URL', { status: 400 });
  }

  const card = await fetchOneBrandByName(decodeURIComponent(name));

  if (!card) {
    return new Response('Bramd not found', { status: 404 });
  }

  return new Response(JSON.stringify(card), { status: 200 });
};
