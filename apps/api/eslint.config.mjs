import antfu from "@antfu/eslint-config";
import baseConfig from "@editor/eslint-config";

export default antfu(
	{
		typescript: true,
	},
	baseConfig,
);
