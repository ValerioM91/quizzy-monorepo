const base = require("config/.eslintrc.js")

module.exports = {
  ...base,
  env: { browser: true, es2020: true, node: true },
  rules: {
    ...base.rules,
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
  },
}
