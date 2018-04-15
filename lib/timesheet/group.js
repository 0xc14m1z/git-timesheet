const R = require("ramda")
const pipe = require("popipe")


const getUniqueDates = commits =>
  pipe(
    commits,
    R.map(commit => commit.date),
    R.uniq
  )

const filterByDate = commits => (result, date) =>
  ({ ...result, [date]: commits.filter(commit => commit.date === date) })

const groupByDate = commits =>
  pipe(
    commits,
    getUniqueDates,
    R.reduce(filterByDate(commits), {})
  )

const groupByHour = (commits, type = "WORKED") =>
  commits.reduce(
    (result, commit) => {
      if ( !result[commit.hour] )
        result[commit.hour] = { type, commits: [] }

      result[commit.hour].commits.push(commit)

      return result
    },
    {}
  )

const group = commits => {
  const commitsGroupedByDate = groupByDate(commits)
  return Object.keys(commitsGroupedByDate).map(
    date => ({ date, hours: groupByHour(commitsGroupedByDate[date].commits) })
  )
}


module.exports = group
