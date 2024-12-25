import type { RequestHandler } from '@sveltejs/kit';
import { fetchCardsFromBankName } from 'server/read_cards';

export const GET: RequestHandler = async ({ params }) => {
  const { bank } = params;

  if (!bank) {
    return new Response(`Missing bank name: ${JSON.stringify(params)}`, { status: 400 });
  }

  const cards = await fetchCardsFromBankName(bank);

  return new Response(JSON.stringify(cards, null, 1), { status: 200 });
};
