const R = require("ramda")
const pipe = require("popipe")
const { times, getNumericHours } = require("./helpers")

const PRESTART_HOUR = { type: "PRESTART" }

const firstHour = day =>
  getNumericHours(day)[0]

const mergeAdditionalHours = day => additionalHours =>
  ({ ...day, ...additionalHours })

const addPrestartHour = from => (hours, shift) =>
  ({ ...hours, [(from - shift).toString().padStart(2, "0")]: PRESTART_HOUR })

const getPrestartHours = (prestartHours, day) =>
  shouldAddPrestartHours(prestartHours, day)
    ? R.range(0, prestartHours).reduce(addPrestartHour(firstHour(day) - 1), {})
    : {}

const shouldAddPrestartHours = (prestartHours, day) =>
  firstHour(day) >= prestartHours

const getAdditionalHours = (prestartHours, day) =>
  pipe(
    getPrestartHours(prestartHours, day),
    mergeAdditionalHours(day)
  )

const addPrestartToDay = (prestartHours, days) => (result, date) => ({
  ...result,
  [date]: {
    ...days[date],
    ...getAdditionalHours(prestartHours, days[date])
  }
})

const addPrestart = prestartHours => days =>
  pipe(
    Object.keys(days),
    R.reduce(addPrestartToDay(prestartHours, days), {})
  )

module.exports = addPrestart
