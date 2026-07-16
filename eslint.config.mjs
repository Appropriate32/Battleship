import js from "@eslint/js";
import globals from "globals";

export default [
  // 1. Put the recommended config first (this replaces "extends")
  js.configs.recommended,

  // 2. Your custom overrides
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser, // Spread syntax to merge browser globals
        ...globals.jest, // Spread syntax to merge jest globals
      },
    },
  },
];
