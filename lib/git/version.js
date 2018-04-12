const shell = require("../shell")
const pipe = require("popipe")
const R = require("ramda")

const COMMAND = "git version"
const VERSION_PATTERN = /git version (\d+\.\d+\.\d+).*/

const runCommand = () => shell(COMMAND)

const parseOutput = output =>
  VERSION_PATTERN.test(output)
    ? output.match(VERSION_PATTERN)[1]
    : ""

const version = () =>
  pipe(
    runCommand(),
    parseOutput
  )

module.exports = version
