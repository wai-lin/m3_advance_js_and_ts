import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createOutput, createOutputChain } from "#lib/output";
import { getPATHs } from "#lib/path";
import { createRCManager } from "#lib/rcfile";

const HOME = os.homedir();
const CONFIG = ".shathrc";

function outputPaths(paths: string[]) {
	const log = createOutputChain();
	paths.forEach((path, idx) => {
		let index: number | string = idx + 1;
		if (index < 10) index = `0${index}`;
		index = String(index);

		log.append(c => c.yellow(`${index} : `));
		log.append(c => c.green(`${path}\n`));
	});
	log.output(paths => paths.join(""));
}

export function createActions(folderPath: string = HOME) {
	folderPath = folderPath.length <= 0 ? HOME : folderPath;
	const configPath = path.resolve(folderPath, CONFIG);
	let manager = createRCManager(configPath);

	function reloadManager() {
		manager = createRCManager(configPath);
	}

	/**
	 * Create `.shathrc` file if it does not exist.
	 */
	async function setup() {
		const output = createOutput();
		if (fs.existsSync(configPath)) {
			output(c => c.green("Configuration file already exists."));
		}
		else {
			output(c => c.bgYellow.white("Configuration file does not exist."));
			output(c => c.gray("Creating configuration file..."));
			fs.writeFileSync(configPath, "");
			output(c => c.green(`Configuration file created successfully: ${configPath}`));
		}
		output("==================================================");
		output(c => c.bgGreen.white("Do this after setup."));
		output(c => c.gray(`Append "source ${configPath}" to ".zshrc" file.`));
		output(c => c.green(`echo "source ${configPath}" >> ~/.zshrc`));
	}

	/**
	 * List all PATHs from `.shathrc` and from system.
	 */
	function listAll() {
		const log = createOutput();
		log(c => c.bgYellowBright.white("All paths exported to system."));
		outputPaths(getPATHs());
	}

	/**
	 * List all PATHs defined in `.shathrc` file.
	 */
	function list() {
		reloadManager();
		const log = createOutput();
		log(c => c.bgYellowBright.white("Paths defined in `~/.shathrc` file."));
		outputPaths(manager.list());
	}

	/**
	 * Set a PATH to `.shathrc` file.
	 * @param path - The path to be set.
	 */
	function set(path: string) {
		reloadManager();
		const log = createOutput();
		const set = manager.set(path);
		if (set === "found") {
			log(c => c.green(`Path "${path}" already exists.`));
		}
		else if (set === "set") {
			manager.commit();
			log(c => c.green(`Path "${path}" added successfully.`));
		}
	}

	/**
	 * Remove a PATH from `.shathrc` file.
	 * @param path - (string | number) The path to be removed.
	 */
	function remove(path: string) {
		reloadManager();
		const log = createOutput();

		const isNumber = /^\d+$/.test(path);
		let status: "not found" | "removed" = "not found";

		if (isNumber) {
			status = manager.removeIdx(Number(path));
		}
		else {
			status = manager.remove(path);
		}

		if (status === "not found") {
			log(c => c.red(`Path "${path}" not found.`));
		}
		else if (status === "removed") {
			manager.commit();
			log(c => c.green(`Path "${path}" removed successfully.`));
		}
	}

	return { setup, listAll, list, set, remove };
}
