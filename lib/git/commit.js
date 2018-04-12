const DATE_PATTERN = /(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})\.*/

const Commit = (rawDate, author) => {
  const matches = rawDate.match(DATE_PATTERN)
  const [ _, year, month, day, hour, minute, second ] = matches
  return { year, month, day, hour, minute, second, author }
}

module.exports = Commit
