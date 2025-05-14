import { shallowRef, computed, effect } from "@vue/reactivity";

import type { Lib } from "@lib/~~~";

export const lib: Lib = {
	name: "@vue/reactivity",
	signal(initialValue) {
		const $ = shallowRef(initialValue);
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
