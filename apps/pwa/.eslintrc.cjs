const base = require("config/.eslintrc.js")

module.exports = {
  ...base,
  env: { browser: true, es2020: true, node: true },
}
