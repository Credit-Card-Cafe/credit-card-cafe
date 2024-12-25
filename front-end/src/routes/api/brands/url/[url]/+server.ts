import type { RequestHandler } from '@sveltejs/kit';
import { fetchOneBrandByURL } from 'server/read_brands';

export const GET: RequestHandler = async ({ params }) => {
  const { url } = params;

  if (!url) {
    return new Response('Missing URL', { status: 400 });
  }

  const card = await fetchOneBrandByURL(url);

  if (!card) {
    return new Response('Brand not found', { status: 404 });
  }

  return new Response(JSON.stringify(card), { status: 200 });
};
