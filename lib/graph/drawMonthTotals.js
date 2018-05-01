const R = require("ramda")
const pipe = require("popipe")

const config = require("./config")
const WORKED = "WORKED"

const HOURS_PER_DAY = 8

const COMMITS_COUNT_INDEX = 32
const HOURS_COUNT_INDEX = 33
const DAYS_COUNT_INDEX = 34

const { drawOuterCircle, circleX, circleY } = require("./drawDay")

const getCommitsCount = details =>
  pipe(
    Object.values(details),
    R.map(Object.values),
    R.flatten,
    R.filter(hour => hour.type === WORKED),
    R.map(hour => hour.commits),
    R.flatten,
    R.length
  )

const getHoursCount = details =>
  pipe(
    Object.values(details),
    R.map(Object.keys),
    R.flatten,
    R.length
  )

const getDaysCount = details =>
  Math.round(getHoursCount(details) / HOURS_PER_DAY * 100) / 100

const drawCount = (context, dayIndex, count, description, style) => {
  context.font = style.label.font
  context.fillStyle = style.label.color
  const countWidth = context.measureText(count.toString()).width

  context.fillText(
    count.toString(),
    circleX(dayIndex) - countWidth / 2,
    circleY(dayIndex) + style.label.verticalAdjustment
  )

  context.font = style.description.font
  context.fillStyle = style.description.color
  const descriptionWidth = context.measureText(description).width

  context.fillText(
    description,
    circleX(dayIndex) - descriptionWidth / 2,
    circleY(dayIndex) + style.description.verticalAdjustment
  )
}

const drawCommitsCount = (context, count) => {
  drawCount(context, COMMITS_COUNT_INDEX, count, "commits", config.totals.commits)
  drawOuterCircle(context, COMMITS_COUNT_INDEX, config.totals.commits)
}

const drawHoursCount = (context, count) => {
  drawCount(context, HOURS_COUNT_INDEX, count, "hours", config.totals.hours)
  drawOuterCircle(context, HOURS_COUNT_INDEX, config.totals.hours)
}

const drawDaysCount = (context, count) => {
  drawCount(context, DAYS_COUNT_INDEX, count, "days", config.totals.days)
  drawOuterCircle(context, DAYS_COUNT_INDEX, config.totals.days)
}

const drawMonthTotals = (context, details) => {
  drawCommitsCount(context, getCommitsCount(details))
  drawHoursCount(context, getHoursCount(details))
  drawDaysCount(context, getDaysCount(details))
}

module.exports = drawMonthTotals
