import antfu from "@antfu/eslint-config";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";

export default antfu(
	{
		solid: true,
		typescript: true,
		stylistic: {
			indent: "tab",
			quotes: "double",
			semi: true,
			jsx: true,
		},
	},
	{
		plugins: {
			"better-tailwindcss": betterTailwindcss,
		},
		rules: {
			...betterTailwindcss.configs["recommended-warn"].rules,
			...betterTailwindcss.configs["recommended-error"].rules,
		},
		settings: {
			"better-tailwindcss": {
				entryPoint: "src/index.css",
			},
		},
	},
);
