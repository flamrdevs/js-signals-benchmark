import * as client from "svelte/internal/client";

import type { Lib } from "@lib/~~~";

export const lib: Lib = {
	name: "svelte",
	signal(initialValue) {
		const $ = client.state(initialValue);
		return {
			get: () => client.get($),
			set: (value) => {
				client.set($, value);
			},
		};
	},
	computed(fn) {
		const $ = client.derived(fn);
		return {
			get: () => client.get($),
		};
	},
	effect: (fn) => {
		client.render_effect(fn);
	},
};
