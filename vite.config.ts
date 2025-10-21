import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
	plugins: [
		solid(),
		tailwindcss(),
		nitro(),
		AutoImport({
			imports: ["solid-js"],
			dts: "./src/auto-imports.d.ts",
		}),
	],
});
