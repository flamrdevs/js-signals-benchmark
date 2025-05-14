import type { TrackLib } from "@lib/~~~";

import { libs } from "../libs";

export const tracklibs: TrackLib[] = libs.map((lib) => {
	return {
		name: lib.name,
		signal: lib.signal,
		computed: (fn) => {
			let fnCalls = 0;
			const $ = lib.computed(() => {
				fnCalls++;
				return fn();
			});
			return {
				get: $.get,
				get fnCalls() {
					return fnCalls;
				},
			};
		},
		effect: (fn) => {
			let fnCalls = 0;
			lib.effect(() => {
				fnCalls++;
				fn();
			});
			return {
				get fnCalls() {
					return fnCalls;
				},
			};
		},
	} satisfies TrackLib;
});
