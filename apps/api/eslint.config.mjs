import antfu from "@antfu/eslint-config";
import baseConfig from "@editor/eslint-config";

export default antfu(
	{
		ignores: ["prisma"],
		typescript: true,
	},
	baseConfig,
	{
		rules: {
			"ts/no-namespace": "off",
		},
	},
);
