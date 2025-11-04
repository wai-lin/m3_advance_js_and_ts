import { createOutput } from "#utils/output";
import { getPATHs } from "#utils/path";

export function list() {
	const pathsLog = createOutput();
	getPATHs().forEach((path, idx) => {
		let index: number | string = idx + 1;
		if (index < 10) index = `0${index}`;
		index = String(index);

		pathsLog.append(c => c.red(`${index} : `));
		pathsLog.append(c => c.green(`${path}\n`));
	});
	pathsLog.output(paths => paths.join(""));
}

export function set(_path: string) {
	// TODO: Implement set functionality
}

export function remove(_path: string) {
	// TODO: Implement remove functionality
}
