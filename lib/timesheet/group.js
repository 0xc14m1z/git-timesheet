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


module.exports = group
