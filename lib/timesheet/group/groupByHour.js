const R = require("ramda")
const pipe = require("popipe")

const getUniqueHours = commits =>
  pipe(
    commits,
    R.map(commit => commit.hour),
    R.uniq
  )

const filterByHour = (commits, hour) =>
  commits.filter(commit => commit.hour === hour)

const groupByHour = (commits, type = "WORKED") =>
  pipe(
    commits,
    getUniqueHours,
    R.reduce(
      (result, hour) => ({ ...result, [hour]: { type, commits: filterByHour(commits, hour)} }),
      {}
    )
  )

module.exports = groupByHour
