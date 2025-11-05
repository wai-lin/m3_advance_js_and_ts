import fs from "node:fs";
import { getPATHs } from "./path";

function parseRCFile(configPath: string) {
	const file = fs.readFileSync(configPath).toString();
	if (file.length === 0) return [];
	const paths = file
		.trim()
		.replaceAll(`export PATH=`, "")
		.replaceAll(`"`, "")
		.replaceAll(`:$PATH`, "")
		.split("\n");
	return paths;
}

export function createRCManager(configPath: string) {
	const paths = parseRCFile(configPath);

	function list() {
		return paths;
	}

	function set(path: string) {
		const allPaths = getPATHs();
		const exists = allPaths.findIndex(p => p === path) !== -1;
		if (exists) return "found";
		paths.push(path);
		return "set";
	}

	function remove(path: string) {
		const index = paths.findIndex(p => p === path);
		const exists = index !== -1;
		if (exists) {
			paths.splice(index, 1);
			return "removed";
		}
		return "not found";
	}

	function removeIdx(index: number) {
		const validIndex = index > 0 && index <= paths.length;
		if (validIndex) {
			paths.splice(index - 1, 1);
			return "removed";
		}
		return "not found";
	}

	function commit() {
		const content = paths
			.map(path => `export PATH="${path}:$PATH"`)
			.join("\n");
		fs.writeFileSync(configPath, content);
	}

	return { list, set, remove, removeIdx, commit };
}
