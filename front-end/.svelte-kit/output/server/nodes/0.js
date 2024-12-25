

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.f34afc21.js","_app/immutable/chunks/scheduler.ebd51d3c.js","_app/immutable/chunks/index.d591bbc4.js","_app/immutable/chunks/singletons.23a1f968.js","_app/immutable/chunks/index.06531a3e.js"];
export const stylesheets = ["_app/immutable/assets/0.7c334ec2.css"];
export const fonts = [];
