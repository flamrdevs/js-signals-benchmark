import { describe, expect, it, vi } from "vitest";

import { selectedIds } from "./config";
import { type TypeofRecord, record } from "./graphs";
import { libs } from "./libs";

for (const lib of libs) {
	describe(`${lib.name}`, () => {
		it("should work", () => {
			const s1 = lib.signal(0);

			const c1Fn = vi.fn(() => s1.get() + 1);
			const c1 = lib.computed(c1Fn);

			expect(c1Fn).not.toHaveBeenCalled();

			expect(s1.get()).toBe(0);
			expect(c1.get()).toBe(1);
			expect(c1Fn).toHaveBeenCalledOnce();

			s1.set(1);

			expect(s1.get()).toBe(1);
			expect(c1.get()).toBe(2);
			expect(c1Fn).toHaveBeenCalledTimes(2);
		});

		describe("graphs", () => {
			const expects = (actions: (() => void)[], inputs: [{ get: () => any }, any[]][]) => {
				const expectsInputs = (index: number) => {
					for (const [readSignal, expecteds] of inputs) expect(readSignal.get()).toBe(expecteds[index]);
				};
				for (let index = 0; index < actions.length; index++) {
					expectsInputs(index);
					actions[index]();
				}
				expectsInputs(actions.length);
			};

			const tests: {
				[K in keyof TypeofRecord]: (result: ReturnType<TypeofRecord[K]["fx"]>) => void;
			} = {
				s1c1: ({ signals, computeds, action }) => {
					expects(
						[action, action],
						[
							[signals.a, [0, 1, 2]],
							[computeds.b, [1, 2, 3]],
						],
					);
				},
				s1c3: ({ signals, computeds, action }) => {
					expects(
						[action, action],
						[
							[signals.a, [0, 1, 2]],
							[computeds.b, [1, 2, 3]],
							[computeds.c, [1, 2, 3]],
							[computeds.d, [2, 4, 6]],
						],
					);
				},
				s1c4: ({ signals, computeds, action }) => {
					expects(
						[action, action],
						[
							[signals.a, [0, 1, 2]],
							[computeds.b, [1, 2, 3]],
							[computeds.c, [2, 3, 4]],
							[computeds.d, [3, 4, 5]],
							[computeds.e, [3, 5, 7]],
						],
					);
				},
				s8c1: ({ signals, computeds, action }) => {
					expects(
						[action, action],
						[
							[signals.a, [0, 1, 2]],
							[signals.b, [0, 1, 2]],
							[signals.c, [0, 1, 2]],
							[signals.d, [0, 1, 2]],
							[signals.e, [0, 1, 2]],
							[signals.f, [0, 1, 2]],
							[signals.g, [0, 1, 2]],
							[signals.h, [0, 1, 2]],
							[computeds.i, [0, 8, 16]],
						],
					);
				},
			};

			for (const selectedId of selectedIds) {
				it(`${selectedId} | ${record[selectedId].desc}`, () => {
					tests[selectedId](record[selectedId].fx(lib) as any);
				});
			}
		});
	});
}
