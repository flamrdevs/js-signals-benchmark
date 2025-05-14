import { signal, computed, effect } from "alien-signals";

import type { Lib } from "@lib/~~~";

export const lib: Lib = {
	name: "alien-signals",
	signal(initialValue) {
		const $ = signal(initialValue);
		return {
			get: () => $(),
			set: (value) => {
				$(value);
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
