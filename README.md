# js-signals-benchmark
js-signals-benchmark

## Requirements

- node 23
- pnpm 10
- deno (optional)
- bun (optional)

## Run

default runtime (node)

```
pnpm run bench
```

specific runtime

```
pnpm run bench:node
```

```
pnpm run bench:deno
```

```
pnpm run bench:bun
```

## Status

currently just benchmarking on simple graphs updates

## Config

const : [`start/src/config.ts`](./start/src/config.ts)

bench run : [`start/src/start.ts`](./start/src/start.ts)

include exclude libs : [`start/src/libs.ts`](./start/src/libs.ts)

###

```ts
// Add lib
// ./start/src/libs.ts

const libs = (await Promise.all([
	import("@lib/custom"),
])).map((module) => module.lib);
```

```ts
// Add graph
// ./start/src/graphs.ts

const record = {
  custom: {}
}
```

```ts
// Add test
// ./start/src/node.test.ts

const tests = {
  custom: () => {}
}
```

## Roadmap

- proper benchmark
- homepage
