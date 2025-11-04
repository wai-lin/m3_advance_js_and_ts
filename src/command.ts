import { defineCommand } from "citty";
import { list } from "./core/core";

export const mainCmd = defineCommand({
	meta: {
		name: "shath",
		version: "0.0.0",
		description: "PATH manager for zsh.",
	},
	args: {
		list: {
			type: "boolean",
			alias: "ls",
			description: "List all PATHs.",
		},
		set: {
			type: "string",
			alias: "se",
			description: "Set a new PATH.",
		},
		remove: {
			type: "string",
			alias: "rm",
			description: "Remove a PATH.",
		},
	},
	run({ args }) {
		if (args.list) {
			list();
		}
	},
});
