const R = require("ramda")

const config = require("./config")
const drawHour = require("./drawHour")

const DAYS_PER_WEEK = 7

const row = dayIndex =>
  dayIndex % DAYS_PER_WEEK

const column = dayIndex =>
  Math.floor(dayIndex / DAYS_PER_WEEK)

const dayX = dayIndex =>
  config.page.margin.left
  + column(dayIndex)
  * (config.day.diameter + config.day.margin.right)

const dayY = dayIndex =>
  config.page.height
  - config.page.margin.bottom
  - (DAYS_PER_WEEK - row(dayIndex))
  * (config.day.diameter + config.day.margin.top)
  + config.day.margin.top

const circleX = dayIndex =>
  dayX(dayIndex) + config.day.radius

const circleY = dayIndex =>
  dayY(dayIndex) + config.day.radius

const drawDayNumber = (context, dayIndex, dayStyle) => {
  context.font = config.day.label.font
  context.fillStyle = dayStyle.label.color
  context.fillText(
    dayIndex + 1,
    dayX(dayIndex),
    dayY(dayIndex) + config.day.label.verticalAdjustment
  )
}

const drawOuterCircle = (context, dayIndex, dayStyle) => {
  context.beginPath()
  context.arc(
    circleX(dayIndex),
    circleY(dayIndex),
    config.day.radius,
    0,
    Math.PI * 2
  )
  context.strokeStyle = dayStyle.stroke.color
  context.lineWidth = dayStyle.stroke.thickness
  context.stroke()
}

const drawHoursCount = (context, dayIndex, count) => {
  context.font = config.day.hours.font
  context.fillStyle = config.day.hours.color
  context.fillText(
    count.toString().padStart(2, "0"),
    circleX(dayIndex) + config.day.hours.horizontalAdjustment,
    circleY(dayIndex) + config.day.hours.verticalAdjustment
  )
}

const drawDots = (context, dayIndex, hours) => {
  R.range(0, 24).map(hour =>
    drawHour(
      context,
      dayX(dayIndex),
      dayY(dayIndex),
      hour,
      hours[hour.toString().padStart(2, "0")]
    )
  )
}

const drawHours = (context, dayIndex, hours) => {
  drawHoursCount(context, dayIndex, Object.keys(hours).length)
  drawDots(context, dayIndex, hours)
}

const drawDay = (context, hours, dayIndex) => {
  const isWorked = !!hours
  const dayStyle = isWorked ? config.day.worked : config.day.nonWorked

  drawDayNumber(context, dayIndex, dayStyle)
  drawOuterCircle(context, dayIndex, dayStyle)
  if ( isWorked ) drawHours(context, dayIndex, hours)
}

module.exports = {
  drawDay,
  drawOuterCircle,
  circleX,
  circleY
}
