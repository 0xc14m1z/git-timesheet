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
  header: {
    repository: {
      font: "bold 50px monospace",
      color: "#000000",
      verticalAdjustment: 25
    },
    setting: {
      name: {
        font: "30px monospace",
        color: "#000000",
        verticalAdjustment: 25
      },
      value: {
        font: "30px monospace",
        color: "#888888",
        verticalAdjustment: 25
      }
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
  },
  totals: {
    commits: {
      label: {
        font: "50px monospace",
        verticalAdjustment: 0,
        color: "#000000"
      },
      description: {
        font: "30px monospace",
        verticalAdjustment: 40,
        color: "#444444"
      },
      stroke: {
        color: "#AAAAAA",
        thickness: 10
      },
      fill: {
        color: "#FFFFFF"
      }
    },
    hours: {
      label: {
        font: "50px monospace",
        verticalAdjustment: 0,
        color: "#000000"
      },
      description: {
        font: "30px monospace",
        verticalAdjustment: 40,
        color: "#444444"
      },
      stroke: {
        color: "#555555",
        thickness: 10
      },
      fill: {
        color: "#FFFFFF"
      }
    },
    days: {
      label: {
        font: "50px monospace",
        verticalAdjustment: 0,
        color: "#000000"
      },
      description: {
        font: "30px monospace",
        verticalAdjustment: 40,
        color: "#444444"
      },
      stroke: {
        color: "#000000",
        thickness: 10
      },
      fill: {
        color: "#FFFFFF"
      }
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
