import * as server from '../entries/pages/bank/_slug_/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/bank/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/bank/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.bb7ab7bc.js","_app/immutable/chunks/scheduler.ebd51d3c.js","_app/immutable/chunks/index.d591bbc4.js","_app/immutable/chunks/each.e59479a4.js","_app/immutable/chunks/CreditCard.63e3e9c8.js","_app/immutable/chunks/functions.839aea76.js","_app/immutable/chunks/index.06531a3e.js"];
export const stylesheets = ["_app/immutable/assets/CreditCard.38063c06.css"];
export const fonts = [];
