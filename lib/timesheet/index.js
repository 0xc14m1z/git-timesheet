const pipe = require("popipe")
const Git = require("./../git")

const getCommits = () => Git.log()
const applyFilters = require("./applyFilters")
const group = require("./group")
const addContinuity = require("./addContinuity")
const addPrestart = require("./addPrestart")

const compute = (authors, from, to, continuity, prestart) =>
  pipe(
    getCommits(),
    applyFilters(authors, from, to),
    group,
    addContinuity(continuity),
    addPrestart(prestart)
  )

module.exports = {
  compute
}
