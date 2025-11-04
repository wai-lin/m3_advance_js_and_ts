import type { ChalkInstance } from "chalk";
import { Chalk } from "chalk";

export function createOutput(
	// eslint-disable-next-line no-console
	log: (...args: any[]) => void = console.log,
) {
	const c = new Chalk({ level: 1 });
	const args: any[] = [];

	function append(arg: (c: ChalkInstance) => any): ReturnType<typeof createOutput>;
	function append(arg: string | number | boolean): ReturnType<typeof createOutput>;
	function append(arg: unknown): ReturnType<typeof createOutput>;
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
