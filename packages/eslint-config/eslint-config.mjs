import antfu from "@antfu/eslint-config";

/** @type {import('eslint').Linter.Config} */
export default antfu({
   stylistic: {
      semi: true,
      indent: "tab",
      quotes: "double",
   },
   rules: {
      "style/brace-style": "off",
      "antfu/if-newline": "off",
   },
});
