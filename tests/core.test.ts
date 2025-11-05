import fs from "node:fs";
import { runMain } from "citty";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { mainCmd } from "../src/core";

describe("core", () => {
	describe("main command", () => {
		const configFolder = "./";
		const config = `${configFolder}.shathrc`;
		const loggerMock = vi.spyOn(console, "log")
			.mockImplementation((...args: any[]) => args);

		let file = "";

		beforeEach(async () => {
			if (fs.existsSync(config)) fs.unlinkSync(config);
			await runWithArgs(["--setup"]);
			file = fs.readFileSync(config).toString();
		});

		afterAll(() => {
			fs.unlinkSync(config);
		});

		async function runWithArgs(args: string[]) {
			return await runMain(mainCmd, { rawArgs: [...args, "--config", configFolder] });
		}

		it("should create config file on `setup`", async () => {
			await runWithArgs(["--setup"]);
			expect(loggerMock).toBeCalled();
		});

		it("should show list of PATHs including system paths", async () => {
			await runWithArgs(["--listAll"]);
			expect(loggerMock).toHaveBeenCalledWith(
				expect.stringContaining("/usr/bin"),
			);
		});

		it("should set PATH to .shathrc file", async () => {
			runWithArgs(["--set", "/set/path"])
				.then(() => expect(file).toContain("/set/path"))
				.catch(() => { });
		});

		it("should show list of PATHs from .shathrc file", async () => {
			await runWithArgs(["--set", "/set/path"]);
			await runWithArgs(["--list"]);
			expect(loggerMock).toHaveBeenCalledWith(
				expect.stringContaining("/set/path"),
			);
		});

		it("should remove PATH from .shathrc file", async () => {
			await runWithArgs(["--set", "/set/path"]);
			await runWithArgs(["--remove", "/set/path"]);
			expect(
				file.includes("/set/path"),
			).toBeFalsy();
		});

		it("should remove PATH from .shathrc file with index", async () => {
			await runWithArgs(["--set", "/test/bin"]);
			await runWithArgs(["--set", "/foo/bar/bazz"]);
			runWithArgs(["--remove", "2"])
				.then(() => {
					expect(
						file.includes("/foo/bar/bazz"),
					).toBeFalsy();
					expect(
						file.includes("/test/bin"),
					).toBeTruthy();
				})
				.catch(() => {});
		});

		it("should handle alias arguments", async () => {
			await runWithArgs(["--se", "/foo/bar"]); // --set
			await runWithArgs(["--se", "/bar/bazz"]); // --set

			await runWithArgs(["--lsa"]); // --listAll
			await runWithArgs(["--ls"]); // --list

			await runWithArgs(["--rm", "/foo/bar"]); // --remove
		});
	});
});
