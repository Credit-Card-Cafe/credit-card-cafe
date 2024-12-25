

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.04fa1d84.js","_app/immutable/chunks/scheduler.ebd51d3c.js","_app/immutable/chunks/index.d591bbc4.js","_app/immutable/chunks/stores.c0b8e04c.js","_app/immutable/chunks/singletons.23a1f968.js","_app/immutable/chunks/index.06531a3e.js"];
export const stylesheets = [];
export const fonts = [];
