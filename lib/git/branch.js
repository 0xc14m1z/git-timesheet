const shell = require("../shell")
const pipe = require("popipe")
const R = require("ramda")

const COMMAND = "git branch"
const CURRENT_BRANCH_MARKER = "* "

const Branch = (name, isCurrent = false) =>
  ({ name, isCurrent })

const runCommand = () =>
  shell(COMMAND)

const parseOutput = output =>
  pipe(
    output,
    R.trim,
    R.split(/\n/),
    R.map(R.trim)
  )

const buildBranches = rawBranches =>
  pipe(
    rawBranches,
    R.map(
      name => Branch(
        name.replace(CURRENT_BRANCH_MARKER, ""),
        name.startsWith(CURRENT_BRANCH_MARKER)
      )
    )
  )

const branch = () =>
  pipe(
    runCommand(),
    parseOutput,
    buildBranches
  )

module.exports = branch
