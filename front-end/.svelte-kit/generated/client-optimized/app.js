export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/account": [3],
		"/bank/[slug]": [~4],
		"/brand/[slug]": [~5],
		"/card/[slug]": [~6],
		"/community": [7],
		"/info/credit-score": [8],
		"/search": [13],
		"/s/get-started": [9],
		"/s/personalize-my-experience": [10],
		"/s/rewards-tool": [11],
		"/s/unique-features": [12],
		"/table": [14],
		"/table/[slug]": [~15]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';