module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  plugins: ["react-refresh", "@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  rules: {
    "prettier/prettier": "warn",
    "no-unused-vars": ["warn", { varsIgnorePattern: "^_" }],
    "@typescript-eslint/no-unused-vars": ["warn", { varsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "import/no-anonymous-default-export": "off",
    "no-console": "warn",
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
