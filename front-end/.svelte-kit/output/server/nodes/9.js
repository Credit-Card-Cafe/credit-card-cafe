

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/s/get-started/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.a5e7e854.js","_app/immutable/chunks/scheduler.ebd51d3c.js","_app/immutable/chunks/index.d591bbc4.js"];
export const stylesheets = [];
export const fonts = [];
