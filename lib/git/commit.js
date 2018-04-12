const DATE_PATTERN = /(\d{4}-\d{2}-\d{2})\s(\d{2}):(\d{2}):(\d{2})\.*/

const Commit = (rawDate, author) => {
  const [ _, date, hour ] = rawDate.match(DATE_PATTERN)
  return { date, hour, author }
}

module.exports = Commit
