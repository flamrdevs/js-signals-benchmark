import type { Lib } from "@lib/~~~";

import { signal, computed, effect } from "@angular/core";

export const lib: Lib = {
	name: "@angular/core",
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
