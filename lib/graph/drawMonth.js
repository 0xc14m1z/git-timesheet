const moment = require("moment")
const R = require("ramda")

const config = require("./config")
const { drawDay } = require("./drawDay")
const drawHeader = require("./drawHeader")
const drawMonthTotals = require("./drawMonthTotals")

const Canvas = require('canvas')

const preparePage = () => {
  const canvas = new Canvas(config.page.width, config.page.height)
  return { canvas, context: canvas.getContext("2d") }
}

const drawBackground = context => {
  context.fillStyle = config.page.backgroundColor
  context.fillRect(0, 0, config.page.width, config.page.height)
}

const formatDate = month => day =>
  `${month}-${day.toString().padStart(2, "0")}`

const lastOfMonth = month =>
  moment(formatDate(month)(1)).endOf("month").get("date")

const daysOfMonth = month =>
  R.range(1, lastOfMonth(month) + 1).map(formatDate(month))

const drawMonth = (month, days, settings) => {
  const { canvas, context } = preparePage()
  drawBackground(context)

  drawHeader(context, month, settings)

  daysOfMonth(month).forEach(
    (date, index) => drawDay(context, days[date], index)
  )

  drawMonthTotals(context, days)

  return canvas
}

module.exports = drawMonth
