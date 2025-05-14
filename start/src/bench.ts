import * as mitata from "mitata";

import { selectedIds } from "./config";
import { record } from "./graphs";
import { libs } from "./libs";

const longestLibName = libs.reduce((value, lib) => {
	const length = lib.name.length;
	return length > value ? length : value;
}, 0);
const libNamePadEndLength = longestLibName + 2;

export const graphs = ({
	actionIterations = 10000,
}: {
	/**
	 * @description `for (let i = 0; i < actionIterations; i++) action();`
	 */
	actionIterations?: number;
} = {}) => {
	mitata.barplot(() => {
		for (const selectedId of selectedIds) {
			mitata.summary(() => {
				for (const lib of libs) {
					mitata
						.bench(`${lib.name.padEnd(libNamePadEndLength)} | ${record[selectedId].desc}     `, () => {
							const { action } = record[selectedId].fx(lib);
							for (let i = 0; i < actionIterations; i++) action();
						})
						.gc("inner");
				}
			});
		}
	});
};

export const run = async () => {
	await mitata.run();
};
