import { createSignal, createMemo, createEffect } from "@solidjs/signals";

import type { Lib } from "@lib/~~~";

export const lib: Lib = {
	name: "@solidjs/signals",
	signal(initialValue) {
		const [$, set$] = createSignal<any>(initialValue);
		return {
			get: () => $(),
			set: (value) => {
				set$(value as any);
			},
		};
	},
	computed(fn) {
		const $ = createMemo(fn);
		return {
			get: () => $(),
		};
	},
	effect: (fn) => {
		createEffect(fn, () => {});
	},
};
