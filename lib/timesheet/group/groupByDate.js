const R = require("ramda")
const pipe = require("popipe")

const getUniqueDates = commits =>
  R.uniq(commits.map(commit => commit.date))

const filter = (commits, date) =>
  commits.filter(commit => commit.date === date)

const group = commits => (result, date) =>
  ({ ...result, [date]: filter(commits, date)})

const groupByDate = commits =>
  getUniqueDates(commits).reduce(group(commits), {})

module.exports = groupByDate
