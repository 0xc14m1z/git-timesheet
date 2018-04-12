const shell = require("../shell")
const pipe = require("popipe")
const R = require("ramda")
const moment = require("moment")

const Commit = require("./commit")

const COMMAND = "git --no-pager log --pretty='%aid|%aE'"

const runCommand = () => shell(COMMAND)

const parseOutput = output =>
  pipe(
    output,
    R.trim,
    R.split(/\n/),
    R.map(R.split("|"))
  )

const buildCommit = rawCommit =>
  Commit(rawCommit[0], rawCommit[1])

const buildCommits = commits =>
  pipe(
    commits,
    R.map(buildCommit)
  )

const log = () =>
  pipe(
    runCommand(),
    parseOutput,
    buildCommits
  )

module.exports = log
