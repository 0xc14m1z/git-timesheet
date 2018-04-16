const R = require("ramda")

const getUniqueHours = commits =>
  R.uniq(commits.map(commit => commit.hour))

const filter = (commits, hour) =>
  commits.filter(commit => commit.hour === hour)

const group = (commits, type) => (result, hour) =>
  ({ ...result, [hour]: { type, commits: filter(commits, hour)} })

const groupByHour = (commits, type = "WORKED") =>
  getUniqueHours(commits).reduce(group(commits, type), {})

module.exports = groupByHour
