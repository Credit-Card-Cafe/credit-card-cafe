import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.722677c1.js","_app/immutable/chunks/functions.839aea76.js","_app/immutable/chunks/index.06531a3e.js","_app/immutable/chunks/scheduler.ebd51d3c.js","_app/immutable/chunks/index.d591bbc4.js","_app/immutable/chunks/each.e59479a4.js","_app/immutable/chunks/CardStack.9799909e.js","_app/immutable/chunks/CreditCard.63e3e9c8.js","_app/immutable/chunks/DefaultCreditCard.99be20a2.js"];
export const stylesheets = ["_app/immutable/assets/2.1def7588.css","_app/immutable/assets/CreditCard.38063c06.css"];
export const fonts = [];
