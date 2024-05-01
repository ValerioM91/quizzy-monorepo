// eslint-disable-next-line no-undef
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "warn",
    "no-unused-vars": ["warn", { varsIgnorePattern: "^_" }],
    "@typescript-eslint/no-unused-vars": ["warn", { varsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-var-requires": ["error", { allow: ["config/.eslintrc.js"] }],
    "import/no-anonymous-default-export": "off",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "default-case": "off",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
  },
}
