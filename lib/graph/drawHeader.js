const config = require("./config")

const mm = points =>
  points * 10

const SETTING_NAME_X = config.page.margin.left
const SETTING_VALUE_X = config.page.margin.left + mm(20)

const drawString = (context, string, x, y, style) => {
  context.font = style.font
  context.fillStyle = style.color
  context.fillText(
    string,
    x,
    y + style.verticalAdjustment
  )
}

const drawRepository = (context, repository) =>
  drawString(
    context,
    repository,
    config.page.margin.left,
    config.page.margin.top,
    config.header.repository
  )

const drawSettingName = (context, name, y) =>
  drawString(context, name, SETTING_NAME_X, y, config.header.setting.name)

const drawSettingValue = (context, value, y) =>
  drawString(context, value, SETTING_VALUE_X, y, config.header.setting.value)

const drawBranch = (context, branch) => {
  drawSettingName(context, "Branch: ", mm(20))
  drawSettingValue(context, branch, mm(20))
}

const drawMonth = (context, month) => {
  drawSettingName(context, "Month: ", mm(25))
  drawSettingValue(context, month, mm(25))
}

const drawAuthors = (context, authors) => {
  drawSettingName(context, "Authors: ", mm(30))
  drawSettingValue(
    context,
    !authors ? "all" : authors.join(", "),
    mm(30)
  )
}

const drawHeader = (context, month, settings) => {
  drawRepository(context, settings.repository)
  drawBranch(context, settings.branch)
  drawMonth(context, month)
  drawAuthors(context, settings.authors)
}


module.exports = drawHeader
