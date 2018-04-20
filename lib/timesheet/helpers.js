const R = require("ramda")
const pipe = require("popipe")

const times = count =>
  [...new Array(count)]

const getNumericHours = day =>
  pipe(
    Object.keys(day),
    R.map(hour => parseInt(hour, 10)),
    R.sort(R.subtract)
  )

module.exports = {
  times,
  getNumericHours
}
