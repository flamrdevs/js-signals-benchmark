// import { Signal } from "signal-polyfill";
import { Signal } from "node_modules/signal-polyfill/dist/index";

import type { Lib } from "@lib/~~~";

const effect = (() => {
	let needsEnqueue = true;

	const w = new Signal.subtle.Watcher(() => {
		if (needsEnqueue) {
			needsEnqueue = false;
			queueMicrotask(processPending);
		}
	});

	function processPending() {
		needsEnqueue = true;

		for (const s of w.getPending()) {
			s.get();
		}

		w.watch();
	}

	return (callback: () => void) => {
		// biome-ignore lint/suspicious/noConfusingVoidType: void
		let cleanup: (() => void) | void;

		const computed = new Signal.Computed(() => {
			typeof cleanup === "function" && cleanup();
			cleanup = callback();
		});

		w.watch(computed);
		computed.get();

		return () => {
			w.unwatch(computed);
			typeof cleanup === "function" && cleanup();
			cleanup = undefined;
		};
	};
})();

export const lib: Lib = {
	name: "signal-polyfill",
	signal(initialValue) {
		const $ = new Signal.State(initialValue);
		return {
			get: () => $.get(),
			set: (value) => {
				$.set(value);
			},
		};
	},
	computed(fn) {
		const $ = new Signal.Computed(fn);
		return {
			get: () => $.get(),
		};
	},
	effect: (fn) => {
		effect(fn);
	},
};
