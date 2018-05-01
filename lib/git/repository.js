const shell = require("../shell")
const pipe = require("popipe")
const R = require("ramda")

const COMMAND = "git remote show origin"
const REPOSITORY_NAME_STARTER = "Fetch URL: "
const REPOSITORY_NAME_PATTERN = /:(.*)\.git/

const runCommand = () =>
  shell(COMMAND)

const parseOutput = output =>
  pipe(
    output,
    R.trim,
    R.split(/\n/),
    R.map(R.trim),
    R.find(R.startsWith(REPOSITORY_NAME_STARTER))
  )

const extractRepositoryName = string =>
  pipe(
    string.replace(REPOSITORY_NAME_STARTER, ""),
    R.match(REPOSITORY_NAME_PATTERN),
    R.last
  )

const repository = () =>
  pipe(
    runCommand(),
    parseOutput,
    extractRepositoryName
  )

module.exports = repository
