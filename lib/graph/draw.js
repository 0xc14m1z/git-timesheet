const R = require("ramda")
const pipe = require("popipe")

const config = require("./config")
const drawMonth = require("./drawMonth")

const PATTERN = "YYYY-MM"

const getMonth = date =>
  date.substring(0, PATTERN.length)

const filterByMonth = (timesheet, month) =>
  Object.keys(timesheet).reduce(
    (result, date) =>
      getMonth(date) === month
        ? { ...result, [date]: timesheet[date] }
        : result,
    {}
  )

const groupByMonth = timesheet =>
  pipe(
    Object.keys(timesheet),
    R.map(getMonth),
    R.uniq,
    R.reduce(
      (result, month) => ({
        ...result,
        [month]: filterByMonth(timesheet, month)
      }),
      {}
    )
  )

const drawMonths = monthlyTimesheet =>
  Object
    .keys(monthlyTimesheet)
    .map(month => drawMonth(month, monthlyTimesheet[month]))

const draw = timesheet =>
  pipe(
    groupByMonth(timesheet),
    drawMonths
  )

module.exports = draw