

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/community/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.2a06468e.js","_app/immutable/chunks/scheduler.ebd51d3c.js","_app/immutable/chunks/index.d591bbc4.js"];
export const stylesheets = [];
export const fonts = [];
