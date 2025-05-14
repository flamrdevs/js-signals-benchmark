import type { Computed, Lib, Signal } from "@lib/~~~";

export type TypeofRecord = typeof record;

// s1c1 = 1 signal 1 computed
// s2c2 = 2 signals 2 computeds

export const record = {
	s1c1: {
		// TODO description
		desc: "s1c1",
		fx: (lib) => {
			//
			//     A
			//     │
			//     B
			//
			const a = lib.signal(0);
			const b = lib.computed(() => a.get() + 1);
			return {
				signals: { a },
				computeds: { b },
				action: () => {
					a.set(a.get() + 1);
				},
			};
		},
	},
	s1c3: {
		// TODO description
		desc: "s1c3",
		fx: (lib) => {
			//
			//     A
			//    ╱ ╲
			//   B   C
			//    ╲ ╱
			//     D
			//
			const a = lib.signal(0);
			const b = lib.computed(() => a.get() + 1);
			const c = lib.computed(() => a.get() + 1);
			const d = lib.computed(() => b.get() + c.get());
			return {
				signals: { a },
				computeds: { b, c, d },
				action: () => {
					a.set(a.get() + 1);
				},
			};
		},
	},
	s1c4: {
		// TODO description
		desc: "s1c4",
		fx: (lib) => {
			//
			//     A
			//     │╲
			//     │ B
			//     │ │
			//     │ C
			//     │ │
			//     │ D
			//     │╱
			//     E
			//
			const a = lib.signal(0);
			const b = lib.computed(() => a.get() + 1);
			const c = lib.computed(() => b.get() + 1);
			const d = lib.computed(() => c.get() + 1);
			const e = lib.computed(() => d.get() + a.get());
			return {
				signals: { a },
				computeds: { b, c, d, e },
				action: () => {
					a.set(a.get() + 1);
				},
			};
		},
	},
	s8c1: {
		// TODO description
		desc: "s8c1",
		fx: (lib) => {
			//
			//     A  B  C  D   E  F  G  H
			//     │  │  │  │   │  │  │  │
			//     └──┴──┴──┴─I─┴──┴──┴──┘
			//
			const a = lib.signal(0);
			const b = lib.signal(0);
			const c = lib.signal(0);
			const d = lib.signal(0);
			const e = lib.signal(0);
			const f = lib.signal(0);
			const g = lib.signal(0);
			const h = lib.signal(0);
			const i = lib.computed(() => a.get() + b.get() + c.get() + d.get() + e.get() + f.get() + g.get() + h.get());
			return {
				signals: { a, b, c, d, e, f, g, h },
				computeds: { i },
				action: () => {
					a.set(a.get() + 1);
					b.set(b.get() + 1);
					c.set(c.get() + 1);
					d.set(d.get() + 1);
					e.set(e.get() + 1);
					f.set(f.get() + 1);
					g.set(g.get() + 1);
					h.set(h.get() + 1);
				},
			};
		},
	},
} as const satisfies Record<
	string,
	{
		desc: string;
		fx: (lib: Lib) => {
			signals: Record<string, Signal>;
			computeds: Record<string, Computed>;
			action: () => void;
		};
	}
>;
