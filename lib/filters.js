const moment = require("moment")

const by = (authors, commits) =>
  commits.filter(commit => authors.includes(commit.author))

const from = (date, commits) =>
  commits.filter(commit => moment(commit.date).isSameOrAfter(date))

const to = (date, commits) =>
  commits.filter(commit => moment(commit.date).isSameOrBefore(date))

module.exports = {
  by,
  from,
  to
}
