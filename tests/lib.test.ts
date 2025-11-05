import fs from "node:fs";
import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createOutput, createOutputChain } from "../src/lib/output";
import { getPATHs } from "../src/lib/path";
import { createRCManager } from "../src/lib/rcfile";

describe("output.ts", () => {
	const loggerMock = vi
		.spyOn(console, "log")
		.mockImplementation((...args: any[]) => args);
	const log = createOutput(loggerMock);
	const logChain = createOutputChain(loggerMock);

	afterAll(() => {
		loggerMock.mockReset();
	});

	describe("createOutput", () => {
		it("should log to console", () => {
			log("hello");
			expect(loggerMock).toHaveBeenCalledWith("hello");
		});

		it("should log with chalk", () => {
			log(c => c.red("hello"));
			expect(loggerMock).toHaveReturnedWith(["hello"]);
		});
	});

	describe("createOutputChain", () => {
		it("should log to console", () => {
			logChain
				.append("hello")
				.append("world")
				.output();
			expect(loggerMock).toHaveBeenCalledWith("hello", "world");
		});

		it("should log with chalk", () => {
			logChain
				.append(c => c.red("hello"))
				.append(c => c.green("world"))
				.output();
			expect(loggerMock).toHaveReturnedWith(["hello", "world"]);
		});
	});
});

describe("path.ts", () => {
	describe("getPATHs", () => {
		it("should return an array of paths", () => {
			const paths = getPATHs();
			expect(paths).toBeInstanceOf(Array);
			expect(paths).toContain("/usr/bin");
		});
	});
});

describe("rcfile.ts", () => {
	describe("createRCManager", () => {
		const configFile = "./.shathrc";
		let m: ReturnType<typeof createRCManager>;

		beforeEach(() => {
			fs.writeFileSync(configFile, "");
			m = createRCManager(configFile);
		});

		afterEach(() => {
			fs.unlinkSync(configFile);
		});

		it("should append a PATH", () => {
			m.set("/test/path");
			m.commit();
			const file = fs.readFileSync(configFile).toString();
			expect(file).toContain("/test/path");
		});

		it("should remove a PATH", () => {
			m.set("/test/path");
			m.set("/foo/bar");
			m.commit();
			const file = fs.readFileSync(configFile).toString();
			expect(file).toContain("/test/path");
			expect(file).toContain("/foo/bar");
			m.remove("/test/path");
			m.commit();
			const file2 = fs.readFileSync(configFile).toString();
			expect(file2).not.toContain("/test/path");
			expect(file2).toContain("/foo/bar");
		});

		it("should remove a PATH with line number", () => {
			m.set("/foo/bar");
			m.set("/bar/bazz");
			m.commit();
			const file = fs.readFileSync(configFile).toString();
			expect(file).toContain("/foo/bar");
			expect(file).toContain("/bar/bazz");
			m.removeIdx(2);
			m.commit();
			const file2 = fs.readFileSync(configFile).toString();
			expect(file2).toContain("/foo/bar");
			expect(file2).not.toContain("/bar/bazz");
		});
	});
});
