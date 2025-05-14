import type { Lib } from "@lib/~~~";

import { signal, computed, effect } from "@preact/signals-core";

export const lib: Lib = {
	name: "@preact/signals-core",
	signal(initialValue) {
		const $ = signal(initialValue);
		return {
			get: () => $.value,
			set: (value) => {
				$.value = value;
			},
		};
	},
	computed(fn) {
		const $ = computed(fn);
		return {
			get: () => $.value,
		};
	},
	effect: (fn) => {
		effect(fn);
	},
};
