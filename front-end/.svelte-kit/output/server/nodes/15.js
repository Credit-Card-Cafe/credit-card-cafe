import * as server from '../entries/pages/table/_slug_/_page.server.ts.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/table/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/table/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/15.71f228fe.js","_app/immutable/chunks/scheduler.ebd51d3c.js","_app/immutable/chunks/banks.0169a8c2.js","_app/immutable/chunks/index.d591bbc4.js","_app/immutable/chunks/functions.839aea76.js","_app/immutable/chunks/index.06531a3e.js","_app/immutable/chunks/Table.4dcca01a.js","_app/immutable/chunks/each.e59479a4.js","_app/immutable/chunks/fields.dbdd6631.js"];
export const stylesheets = ["_app/immutable/assets/Table.2fd2d8f9.css"];
export const fonts = [];
