const R = require("ramda")
const Git = require("./git")
const Filters = require("./filters")
const pipe = require("popipe")

const getCommits = (users, from, to) =>
  pipe(
    Git.log(),
    users ? Filters.by(users) : R.always,
    from ? Filters.from(from) : R.always,
    to ? Filters.to(to) : R.always
  )

const groupByDateTime = commits =>
  commits.reduce(
    (result, commit) => {
      if ( !result[commit.date] )
        return update(result, { [commit.date]: { $set: { type: "WORKED", commits: [ commit ] } } })
      else
        return update(result, { [commit.date]: { commits: { $push: [ commit ] } } })
    },
    {}
  )

const addContinuity = hours => commits =>
  commits

const addPrestart = hours => commits =>
  commits

const compute = (authors, from, to, continuity, prestart) =>
  pipe(
    getCommits(authors, from, to),
    groupByDateTime,
    addContinuity(continuity),
    addPrestart(prestart)
  )

module.exports = {
  compute
}
