import globals from "globals";
import pluginJs from "@eslint/js";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

export default [
   {
      languageOptions: {
         globals: globals.node,
         sourceType: "module", // Ensure ES Modules are used
      },
   },
   pluginJs.configs.recommended,
   {
      plugins: {
         prettier: pluginPrettier,
      },
      rules: {
         ...pluginPrettier.configs.recommended.rules,
         "prettier/prettier": "error",
         "no-var": "error", // Disallow the use of `var`
         "prefer-const": "error", // Prefer `const` over `let` if variables are not reassigned
      },
   },
   configPrettier, // Ensure this is at the end to override other configurations
];
