const version = require("./version")
const branch = require("./branch")
const log = require("./log")

const isInstalled = () => version() !== ""

module.exports = {
  version,
  branch,
  log,

  isInstalled
}
