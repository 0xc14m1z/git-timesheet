const R = require("ramda")
const pipe = require("popipe")

const groupByDate = require("./groupByDate")
const groupByHour = require("./groupByHour")

const group = commits =>
  pipe(
    groupByDate(commits),
    R.mapObjIndexed(
      (dateCommits, date) => groupByHour(dateCommits)
    )
  )

module.exports = group
