import { defineCommand } from "citty";
import { createActions } from "./actions";

export const mainCmd = defineCommand({
	meta: {
		name: "shath",
		version: "0.0.0",
		description: "PATH manager for zsh.",
	},
	args: {
		setup: {
			type: "boolean",
			description: `Setup the configuration ".shathrc" file.`,
		},
		config: {
			type: "string",
			description: "Provide path to config file.",
			valueHint: "/path/to/new/directory (default: $HOME/.shathrc)",
		},
		listAll: {
			type: "boolean",
			alias: "lsa",
			description: `List all PATHs from ".shathrc" file and system.`,
		},
		list: {
			type: "boolean",
			alias: "ls",
			description: `List PATHs from ".shathrc" file.`,
		},
		set: {
			type: "string",
			alias: "se",
			description: "Set a new PATH.",
			valueHint: "/path/to/new/directory",
		},
		remove: {
			type: "string",
			alias: "rm",
			description: "Remove a PATH.",
			valueHint: "1 , /path/to/directory/to/remove",
		},
	},
	run({ args }) {
		const { setup, listAll, list, set, remove } = createActions(args.config);
		if (args.setup) setup();
		else if (args.listAll) listAll();
		else if (args.list) list();
		else if (args.set?.length > 0) set(args.set);
		else if (args.remove?.length > 0) remove(args.remove);
	},
});
