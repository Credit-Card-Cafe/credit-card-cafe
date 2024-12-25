import * as server from '../entries/pages/brand/_slug_/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/brand/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/brand/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.3f962d35.js","_app/immutable/chunks/scheduler.ebd51d3c.js","_app/immutable/chunks/index.d591bbc4.js","_app/immutable/chunks/each.e59479a4.js","_app/immutable/chunks/CreditCard.63e3e9c8.js","_app/immutable/chunks/functions.839aea76.js","_app/immutable/chunks/index.06531a3e.js","_app/immutable/chunks/CardStack.9799909e.js"];
export const stylesheets = ["_app/immutable/assets/CreditCard.38063c06.css"];
export const fonts = [];
