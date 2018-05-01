const version = require("./version")
const branch = require("./branch")
const log = require("./log")
const repository = require("./repository")

const isInstalled = () =>
  version() !== ""

const currentBranch = () =>
  branch().find(branch => branch.isCurrent).name


module.exports = {
  version,
  branch,
  log,
  repository,

  isInstalled,
  currentBranch
}
