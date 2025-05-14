import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		name: "start",
		environment: "node",
		include: ["src/node.test.ts"],
	},
});
