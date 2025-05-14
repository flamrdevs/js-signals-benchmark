import type { Lib } from "@lib/~~~";

import { signal, computed, effect } from "@maverick-js/signals";

export const lib: Lib = {
	name: "@maverick-js/signals",
	signal(initialValue) {
		const $ = signal(initialValue);
		return {
			get: () => $(),
			set: (value) => {
				$.set(value);
			},
		};
	},
	computed(fn) {
		const $ = computed(fn);
		return {
			get: () => $(),
		};
	},
	effect: (fn) => {
		effect(fn);
	},
};
