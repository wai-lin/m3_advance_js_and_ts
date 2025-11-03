import antfu from "@antfu/eslint-config";

export default antfu({
	typescript: true,
	stylistic: {
		indent: "tab",
		quotes: "double",
		semi: true,
		overrides: {
			"antfu/if-newline": "off",
		},
	},
});
