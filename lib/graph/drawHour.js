const config = require("./config")

const radians = degrees =>
  degrees * Math.PI / 180

const drawHour = (context, x, y, hour, details) => {
  const isWorked = !!details
  // const hourDegrees = 360 / 12
  const hourDegrees = 360 / 24
  const hourAngle = radians(hour * hourDegrees - 90)

  // const radius = hour <= 12 ? config.day.radius * 0.85 : config.day.radius * 0.7

  // const maxRadius = config.day.radius * 0.85
  // const minRadius = config.day.radius * 0.65
  // const deltaRadius = maxRadius - minRadius
  // const hourShift = deltaRadius / 12
  // const radius = maxRadius - hour * hourShift

  const radius = config.day.radius * 0.85

  const hourX =
    x
    + config.day.radius
    + (Math.cos(hourAngle) * radius)

  const hourY =
    y
    + config.day.radius
    + (Math.sin(hourAngle) * radius)

  context.beginPath()
  context.arc(hourX, hourY, config.hour.radius, 0, Math.PI * 2)
  context.fillStyle = isWorked ? config.hour.fill.color : "#DADADA"
  context.fill()
}

module.exports = drawHour
