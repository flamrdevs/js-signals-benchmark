export type Signal<T = any> = {
	readonly get: () => T;
	readonly set: (value: T) => void;
};
export type Computed<T = any> = {
	readonly get: () => T;
};
export type Lib = {
	name: string;
	signal<T>(initialValue: T): Signal<T>;
	computed<T>(fn: () => T): Computed<T>;
	effect: (fn: () => void) => void;
};

export type TrackSignal<T = any> = Signal<T>;
export type TrackComputed<T = any> = Computed<T> & {
	readonly fnCalls: number;
};
export type TrackEffect = {
	readonly fnCalls: number;
};
export type TrackLib = {
	name: string;
	signal<T>(initialValue: T): TrackSignal<T>;
	computed<T>(fn: () => T): TrackComputed<T>;
	effect: (fn: () => void) => TrackEffect;
};
