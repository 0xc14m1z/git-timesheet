const version = require("./version")
const branch = require("./branch")

const isInstalled = () => version() !== ""

module.exports = {
  version,
  branch,

  isInstalled
}
