export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["android-chrome-192x192.png","android-chrome-256x256.png","apple-touch-icon.png","browserconfig.xml","favicon-16x16.png","favicon-32x32.png","favicon.ico","favicon.png","mstile-150x150.png","safari-pinned-tab.svg","site.webmanifest","storage/.DS_Store","storage/C1-SavorOne-student.jpeg","storage/C1-SavorOne.jpeg","storage/C1-spark-miles.jpeg","storage/C1-spark.jpeg","storage/IHG_One_Traveler_card.png","storage/TD-cash.jpeg","storage/aeroplan_card.png","storage/allCards.csv","storage/allCards.json","storage/amazon-business-prime.jpeg","storage/amazon-business.jpeg","storage/amazon-secured.jpeg","storage/amazon-store.jpeg","storage/amazon.jpeg","storage/amex-blue-business.jpeg","storage/amex-blue.jpeg","storage/amex-centurion.jpeg","storage/amex-gold-business.jpeg","storage/amex-gold.jpeg","storage/amex-green.jpeg","storage/amex-platinum-business.jpeg","storage/amex-platinum.jpeg","storage/apple.jpeg","storage/ba_sig_card.png","storage/bilt.jpeg","storage/bmw-precision.jpeg","storage/bmw.jpeg","storage/bofa-business-ccr.jpeg","storage/bofa-ccr.jpeg","storage/bofa-pr.jpeg","storage/bofa-travel.jpeg","storage/bofa-unlimited.jpeg","storage/card_disney_100_card.png","storage/card_swa_premier_V.png","storage/card_swa_priority_V.png","storage/cards.json","storage/chase-freedom-flex.jpeg","storage/chase-freedom-rise.jpeg","storage/chase-freedom-unlimited.jpeg","storage/chase-ink-cash.jpeg","storage/chase-ink-preferred.jpeg","storage/chase-ink-unlimited.jpeg","storage/citi-double-cash.jpeg","storage/citi-premier.jpeg","storage/costco-businesss.jpeg","storage/costco.jpeg","storage/discover-it-miles.jpeg","storage/discover-it-student.jpeg","storage/discover-it.jpeg","storage/disney_card.png","storage/generate_cards.py","storage/hilton-honors.jpeg","storage/ihg_premier_card.png","storage/jsonToCsv.py","storage/marriott-bevy.jpeg","storage/marriott-bold.jpeg","storage/marriott-boundless.jpeg","storage/marriott-brilliant.jpeg","storage/marriott-business.jpeg","storage/null.jpeg","storage/penfed-gold.jpeg","storage/penfed-pathfinder.jpeg","storage/penfed-platinum.jpeg","storage/penfed-power.jpeg","storage/prime_visa.png","storage/quicksilver-one.jpeg","storage/rei.jpeg","storage/robinhood.jpeg","storage/sapphire-preferred.jpeg","storage/sapphire-reserve.jpeg","storage/seen_mastercard.jpeg","storage/swa_plus_card.png","storage/sweetwater.jpeg","storage/the-nature-conservancy-customized-cash-rewards.png","storage/united_biz_card.png","storage/united_club_infinite_card.png","storage/united_explorer_card-2.png","storage/united_explorer_card.png","storage/united_gateway_card.png","storage/united_quest_card.png","storage/usb-altitude.jpeg","storage/usb-business-leverage.jpeg","storage/venture-rewards.jpeg","storage/wf-active-cash.jpeg"]),
	mimeTypes: {".png":"image/png",".xml":"application/xml",".svg":"image/svg+xml",".webmanifest":"application/manifest+json",".jpeg":"image/jpeg",".csv":"text/csv",".json":"application/json"},
	_: {
		client: {"start":"_app/immutable/entry/start.1a8bd443.js","app":"_app/immutable/entry/app.41d26dd9.js","imports":["_app/immutable/entry/start.1a8bd443.js","_app/immutable/chunks/scheduler.ebd51d3c.js","_app/immutable/chunks/singletons.23a1f968.js","_app/immutable/chunks/index.06531a3e.js","_app/immutable/entry/app.41d26dd9.js","_app/immutable/chunks/scheduler.ebd51d3c.js","_app/immutable/chunks/index.d591bbc4.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js')),
			__memo(() => import('./nodes/14.js')),
			__memo(() => import('./nodes/15.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/account",
				pattern: /^\/account\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/api/banks/name/[name]",
				pattern: /^\/api\/banks\/name\/([^/]+?)\/?$/,
				params: [{"name":"name","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/banks/name/_name_/_server.ts.js'))
			},
			{
				id: "/api/banks/url/[url]",
				pattern: /^\/api\/banks\/url\/([^/]+?)\/?$/,
				params: [{"name":"url","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/banks/url/_url_/_server.ts.js'))
			},
			{
				id: "/api/brands/name/[name]",
				pattern: /^\/api\/brands\/name\/([^/]+?)\/?$/,
				params: [{"name":"name","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/brands/name/_name_/_server.ts.js'))
			},
			{
				id: "/api/brands/url/[url]",
				pattern: /^\/api\/brands\/url\/([^/]+?)\/?$/,
				params: [{"name":"url","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/brands/url/_url_/_server.ts.js'))
			},
			{
				id: "/api/cards/bank/[bank]",
				pattern: /^\/api\/cards\/bank\/([^/]+?)\/?$/,
				params: [{"name":"bank","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/cards/bank/_bank_/_server.ts.js'))
			},
			{
				id: "/api/cards/id/[id]",
				pattern: /^\/api\/cards\/id\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/cards/id/_id_/_server.ts.js'))
			},
			{
				id: "/api/cards/url/[url]",
				pattern: /^\/api\/cards\/url\/([^/]+?)\/?$/,
				params: [{"name":"url","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/cards/url/_url_/_server.ts.js'))
			},
			{
				id: "/bank/[slug]",
				pattern: /^\/bank\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/brand/[slug]",
				pattern: /^\/brand\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/card/[slug]",
				pattern: /^\/card\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/community",
				pattern: /^\/community\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/info/credit-score",
				pattern: /^\/info\/credit-score\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/search",
				pattern: /^\/search\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/s/get-started",
				pattern: /^\/s\/get-started\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/s/personalize-my-experience",
				pattern: /^\/s\/personalize-my-experience\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/s/rewards-tool",
				pattern: /^\/s\/rewards-tool\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/s/unique-features",
				pattern: /^\/s\/unique-features\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/table",
				pattern: /^\/table\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/table/[slug]",
				pattern: /^\/table\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 15 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
