const R = require("ramda")
const update = require("immutability-helper")
const pipe = require("popipe")
const { times, getNumericHours } = require("./helpers")

const CONTINUITY_HOUR = { type: "CONTINUITY" }

const firstHour = couple =>
  Math.min(...couple)

const delta = ([firstHour, secondHour]) =>
  Math.abs(firstHour - secondHour)

const mergeAdditionalHours = (result, additionalHour) =>
  ({ ...result, ...additionalHour })

const addContinuityHour = from => (hours, shift) =>
  ({ ...hours, [from + shift]: CONTINUITY_HOUR })

const getContinuityHours = hours =>
  R.range(0, delta(hours) - 1).reduce(
    addContinuityHour(firstHour(hours) + 1),
    {}
  )

const shouldAddContinuityHours = continuityHours => hours =>
  R.range(1, continuityHours + 1).includes(delta(hours) - 1)

const getAdditionalHours = (continuityHours, day) =>
  pipe(
    getNumericHours(day),
    R.aperture(2),
    R.filter(shouldAddContinuityHours(continuityHours)),
    R.map(getContinuityHours),
    R.reduce(mergeAdditionalHours, {})
  )

const addContinuityToDay = (continuityHours, days) => (result, date) => ({
  ...result,
  [date]: {
    ...days[date],
    ...getAdditionalHours(continuityHours, days[date])
  }
})

const addContinuity = continuityHours => days =>
  pipe(
    Object.keys(days),
    R.reduce(addContinuityToDay(continuityHours, days), {})
  )

module.exports = addContinuity
