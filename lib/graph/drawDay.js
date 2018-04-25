const R = require("ramda")

const config = require("./config")
const drawHour = require("./drawHour")

const DAYS_PER_WEEK = 7

const drawDay = (context, hours, index) => {
  const isWorked = !!hours
  const row = index % 7
  const column = Math.floor(index / 7)

  const dayX =
    config.page.margin.left
    + column
    * (config.day.diameter + config.day.margin.right)

  const dayY =
    config.page.height
    - config.page.margin.bottom
    - (DAYS_PER_WEEK - row)
    * (config.day.diameter + config.day.margin.top)
    + config.day.margin.top

  const x = dayX + config.day.radius
  const y = dayY + config.day.radius

  const dayStyle = isWorked ? config.day.worked : config.day.nonWorked

  context.font = config.day.label.font
  context.fillStyle = dayStyle.label.color
  context.fillText(index + 1, dayX, dayY + config.day.label.verticalAdjustment)

  context.beginPath()
  context.arc(x, y, config.day.radius, 0, Math.PI * 2)
  context.strokeStyle = dayStyle.stroke.color
  context.lineWidth = dayStyle.stroke.thickness
  context.stroke()

  if ( isWorked ) {

    context.font = config.day.hours.font
    context.fillStyle = config.day.hours.color
    const hoursNumber = Object.keys(hours).length.toString().padStart(2, "0")
    context.fillText(
      hoursNumber,
      x + config.day.hours.horizontalAdjustment,
      y + config.day.hours.verticalAdjustment
    )

    R.range(0, 24).map(
      hour => drawHour(context, dayX, dayY, hour, hours[hour.toString().padStart(2, "0")])
    )
    // const workedHours = Object.keys(hours).map(hour => parseInt(hour, 10))
    // workedHours.map(drawHour(context, dayX, dayY))

  }
}

module.exports = drawDay
