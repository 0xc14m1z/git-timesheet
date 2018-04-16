const R = require("ramda")
const pipe = require("popipe")


const getUniqueDates = commits =>
  pipe(
    commits,
    R.map(commit => commit.date),
    R.uniq
  )

const getUniqueHours = commits =>
  pipe(
    commits,
    R.map(commit => commit.hour),
    R.uniq
  )

const filterByDate = (commits, date) =>
  commits.filter(commit => commit.date === date)

const filterByHour = (commits, hour) =>
  commits.filter(commit => commit.hour === hour)

const groupByDate = commits =>
  pipe(
    commits,
    getUniqueDates,
    R.reduce(
      (result, date) => ({ ...result, [date]: filterByDate(commits, date)}),
      {}
    )
  )

const groupByHour = (commits, type = "WORKED") =>
  pipe(
    commits,
    getUniqueHours,
    R.reduce(
      (result, hour) => ({ ...result, [hour]: { type, commits: filterByHour(commits, hour)} }),
      {}
    )
  )

const group = commits =>
  pipe(
    commits,
    groupByDate,
    R.mapObjIndexed(
      (dateCommits, date) => groupByHour(dateCommits)
    )
  )


module.exports = group
