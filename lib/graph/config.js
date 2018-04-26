const MAX_WEEKS = Math.ceil(31 / 7)

const config = {
  page: {
    height: 2970,
    width: 2100,
    backgroundColor: "#FFFFFF",
    margin: {
      top: 100,
      right: 100,
      bottom: 100,
      left: 100
    }
  },
  day: {
    diameter: 300,
    radius: 150,
    margin: {
      top: 50
    },
    label: {
      font: "30px monospace",
      verticalAdjustment: 25
    },
    hours: {
      font: "50px monospace",
      horizontalAdjustment: -30,
      verticalAdjustment: 15
    },
    worked: {
      label: {
        color: "#444444"
      },
      stroke: {
        color: "#DADADA",
        thickness: 10
      },
      fill: {
        color: "#FFFFFF"
      }
    },
    nonWorked: {
      label: {
        color: "#888888"
      },
      stroke: {
        color: "#EEEEEE",
        thickness: 5
      },
      fill: {
        color: "#FFFFFF"
      }
    }
  },
  hour: {
    diameter: 10,
    radius: 5,
    fill: {
      color: "#000000"
    }
  }
}

config.day.margin.right =
  (
    config.page.width
    - (config.page.margin.left + config.page.margin.right)
    - (config.day.diameter * MAX_WEEKS)
  ) / (MAX_WEEKS - 1)

module.exports = config
