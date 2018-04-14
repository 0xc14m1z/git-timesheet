const R = require("ramda")
const Git = require("./git")
const Filters = require("./filters")
const pipe = require("popipe")

const getCommits = () => Git.log()

const applyFilters = (authors, from, to) => commits =>
  pipe(
    commits,
    filterBy(authors),
    filterFrom(from),
    filterTo(to)
  )

const filterBy = authors => commits =>
  authors ? Filters.by(authors)(commits) : commits

const filterFrom = from => commits =>
  from ? Filters.from(from)(commits) : commits

const filterTo = to => commits =>
  to ? Filters.to(to)(commits) : commits

const groupByDate = commits =>
  commits.reduce(
    (result, commit) => {
      if ( !result[commit.date] )
        result[commit.date] = { hours: {}, commits: [] }

      result[commit.date].commits.push(commit)

      return result
    },
    {}
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

const addContinuity = hours => commits =>
  commits

const addPrestart = hours => commits =>
  commits

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
