import antfu from "@antfu/eslint-config";
import baseConfig from "@editor/eslint-config";

export default antfu(
	{
		solid: true,
		typescript: true,
		stylistic: {
			jsx: true,
		},
	},
	baseConfig,
);
