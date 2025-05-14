import type { Lib } from "@lib/~~~";

export const libs: Lib[] = (
	await Promise.all([
		import("@lib/alien-signals"),
		import("@lib/alien-signals-v1"),
		import("@lib/angular-core"),
		import("@lib/angular-core-v20"),
		import("@lib/maverick-js-signals"),
		import("@lib/preact-signals-core"),
		import("@lib/signal-polyfill"),
		import("@lib/solidjs-signals"),
		import("@lib/svelte"),
		import("@lib/vue-reactivity"),
	])
).map((module) => module.lib);
