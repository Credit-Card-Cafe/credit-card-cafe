import type { RequestHandler } from '@sveltejs/kit';
import { fetchOneBankByName } from 'server/read_banks';

export const GET: RequestHandler = async ({ params }) => {
  const { name } = params;

  if (!name) {
    return new Response('Missing URL', { status: 400 });
  }

  const card = await fetchOneBankByName(name);

  if (!card) {
    return new Response('Bank not found', { status: 404 });
  }

  return new Response(JSON.stringify(card), { status: 200 });
};
