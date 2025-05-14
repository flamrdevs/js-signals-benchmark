import { defineConfig } from "tsdown";

export const define = () => {
	return defineConfig({
		entry: "src/index.ts",
		format: "esm",
		target: "esnext",
		platform: "neutral",
		minify: false,
		dts: { isolatedDeclarations: true },
		clean: true,
	});
};
