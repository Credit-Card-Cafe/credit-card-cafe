import type { RequestHandler } from '@sveltejs/kit';
import { fetchOneBankByURL } from 'server/read_banks';

export const GET: RequestHandler = async ({ params }) => {
  const { url } = params;

  if (!url) {
    return new Response('Missing URL', { status: 400 });
  }

  const card = await fetchOneBankByURL(url);

  if (!card) {
    return new Response('Bank not found', { status: 404 });
  }

  return new Response(JSON.stringify(card), { status: 200 });
};
