import process from "node:process";

export function getPATHs() {
	const pathStr = process.env.PATH ?? "";
	const paths = pathStr.split(":").sort();
	return paths;
}
