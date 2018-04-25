const expect = require("chai").expect
const rewire = require("rewire")

const currentModule = rewire("../../lib/graph/draw")

describe("Graph", () => {

  describe("filterByMonth", () => {

    const filterByMonth = currentModule.__get__("filterByMonth")

    it("should return only timesheet days in the given month", () => {
      const timesheet = {
        "2018-02-03": {
          "08": {},
          "12": {},
          "13": {},
          "16": {},
          "17": {},
          "20": {}
        },
        "2017-12-15": {
          "09": {},
          "12": {}
        },
        "2017-12-31": {
          "10": {},
          "11": {},
          "12": {}
        }
      }
      const month = "2017-12"

      const expectation = {
        "2017-12-15": {
          "09": {},
          "12": {}
        },
        "2017-12-31": {
          "10": {},
          "11": {},
          "12": {}
        }
      }

      const result = filterByMonth(timesheet, month)
      expect(result).to.deep.equal(expectation)
    })

  })

  describe("groupByMonth", () => {

    const groupByMonth = currentModule.__get__("groupByMonth")

    it("should group timesheet days per month", () => {
      const timesheet = {
        "2018-02-03": {
          "08": {},
          "12": {},
          "13": {},
          "16": {},
          "17": {},
          "20": {}
        },
        "2017-12-15": {
          "09": {},
          "12": {}
        },
        "2017-12-31": {
          "10": {},
          "11": {},
          "12": {}
        }
      }

      const expectation = {
        "2018-02": {
          "2018-02-03": {
            "08": {},
            "12": {},
            "13": {},
            "16": {},
            "17": {},
            "20": {}
          }
        },
        "2017-12": {
          "2017-12-31": {
            "10": {},
            "11": {},
            "12": {}
          },
          "2017-12-15": {
            "09": {},
            "12": {}
          }
        }
      }

      const result = groupByMonth(timesheet)
      expect(result).to.deep.equal(expectation)
    })

  })

})
