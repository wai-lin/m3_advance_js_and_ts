/* eslint-disable no-console */
import type { ChalkInstance } from "chalk";
import { Chalk } from "chalk";

const c = new Chalk({ level: 1 });

export function createOutput(
	log: (...args: any[]) => void = console.log,
) {
	function output(arg: (c: ChalkInstance) => any): void;
	function output(arg: string | number | boolean): void;
	function output(arg: unknown): void;
	function output(arg: unknown) {
		if (typeof arg === "function") log(arg(c));
		else log(arg);
	}

	return output;
}

export function createOutputChain(
	log: (...args: any[]) => void = console.log,
) {
	const args: any[] = [];

	function append(arg: (c: ChalkInstance) => any): ReturnType<typeof createOutputChain>;
	function append(arg: string | number | boolean): ReturnType<typeof createOutputChain>;
	function append(arg: unknown): ReturnType<typeof createOutputChain>;
	function append(arg: unknown) {
		if (typeof arg === "function") args.push(arg(c));
		else args.push(arg);
		return { append, output };
	}

	function output(transform?: (args: any[]) => any) {
		if (transform) log(transform(args));
		else log(...args);
	}

	return { append, output	};
}
