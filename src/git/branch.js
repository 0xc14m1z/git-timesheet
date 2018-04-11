const shell = require("../shell")
const pipe = require("popipe")
const R = require("ramda")

const CURRENT_BRANCH_MARKER = "* "

const Branch = (name, isCurrent = false) =>
  ({ name, isCurrent })

const branch = () =>
  pipe(
    shell("git branch"),
    R.trim,
    R.split(/\n/),
    R.map(R.trim),
    R.map(
      name => Branch(
        name.replace(CURRENT_BRANCH_MARKER, ""),
        name.startsWith(CURRENT_BRANCH_MARKER)
      )
    )
  )

module.exports = branch
