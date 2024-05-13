const base = require("config/.eslintrc.js")

module.exports = {
  ...base,
  env: { jest: true, node: true },
  rules: {
    ...base.rules,
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-ts-comment": "off",
  },
}
