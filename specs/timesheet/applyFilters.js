const expect = require("chai").expect

const applyFilters = require("../../lib/timesheet/applyFilters")

describe("Timesheet", () => {

  describe("applyFilters", () => {

    it("should return all the commits if no filter is given", () => {
      const authors = undefined
      const from = undefined
      const to = undefined

      const commits = [
        { date: "2018-02-01", hour: "09", author: "second@user.com" },
        { date: "2018-02-03", hour: "12", author: "first@user.com" },
        { date: "2018-02-03", hour: "13", author: "second@user.com" },
        { date: "2018-02-03", hour: "13", author: "third@user.com" },
        { date: "2018-02-03", hour: "14", author: "second@user.com" },
        { date: "2018-02-03", hour: "16", author: "third@user.com" },
        { date: "2018-02-03", hour: "17", author: "third@user.com" },
        { date: "2018-02-03", hour: "20", author: "third@user.com" },
        { date: "2018-02-05", hour: "08", author: "second@user.com" },
        { date: "2018-02-05", hour: "12", author: "third@user.com" },
        { date: "2018-02-05", hour: "13", author: "third@user.com" },
        { date: "2018-02-05", hour: "17", author: "first@user.com" },
        { date: "2018-02-11", hour: "12", author: "second@user.com" },
        { date: "2018-02-12", hour: "12", author: "third@user.com" }
      ]

      const expectation = commits

      const result = applyFilters(authors, from, to)(commits)
      expect(result).to.deep.equal(expectation)
    })

    it("should return all the commits that respond given filters", () => {
      const authors = ["second@user.com", "third@user.com"]
      const from = "2018-02-03"
      const to = "2018-02-05"

      const commits = [
        { date: "2018-02-01", hour: "09", author: "second@user.com" },
        { date: "2018-02-03", hour: "12", author: "first@user.com" },
        { date: "2018-02-03", hour: "13", author: "second@user.com" },
        { date: "2018-02-03", hour: "13", author: "third@user.com" },
        { date: "2018-02-03", hour: "14", author: "second@user.com" },
        { date: "2018-02-03", hour: "16", author: "third@user.com" },
        { date: "2018-02-03", hour: "17", author: "third@user.com" },
        { date: "2018-02-03", hour: "20", author: "third@user.com" },
        { date: "2018-02-05", hour: "08", author: "second@user.com" },
        { date: "2018-02-05", hour: "12", author: "third@user.com" },
        { date: "2018-02-05", hour: "13", author: "third@user.com" },
        { date: "2018-02-05", hour: "17", author: "first@user.com" },
        { date: "2018-02-11", hour: "12", author: "second@user.com" },
        { date: "2018-02-12", hour: "12", author: "third@user.com" }
      ]

      const expectation = [
        { date: "2018-02-03", hour: "13", author: "second@user.com" },
        { date: "2018-02-03", hour: "13", author: "third@user.com" },
        { date: "2018-02-03", hour: "14", author: "second@user.com" },
        { date: "2018-02-03", hour: "16", author: "third@user.com" },
        { date: "2018-02-03", hour: "17", author: "third@user.com" },
        { date: "2018-02-03", hour: "20", author: "third@user.com" },
        { date: "2018-02-05", hour: "08", author: "second@user.com" },
        { date: "2018-02-05", hour: "12", author: "third@user.com" },
        { date: "2018-02-05", hour: "13", author: "third@user.com" },
      ]

      const result = applyFilters(authors, from, to)(commits)
      expect(result).to.deep.equal(expectation)
    })

    it("should return an empty array if no commit respond to the given filters", () => {
      const authors = ["first@user.com"]
      const from = "2017-01-01"
      const to = "2017-12-31"

      const commits = [
        { date: "2018-02-01", hour: "09", author: "second@user.com" },
        { date: "2018-02-03", hour: "12", author: "first@user.com" },
        { date: "2018-02-03", hour: "13", author: "second@user.com" },
        { date: "2018-02-03", hour: "13", author: "third@user.com" },
        { date: "2018-02-03", hour: "14", author: "second@user.com" },
        { date: "2018-02-03", hour: "16", author: "third@user.com" },
        { date: "2018-02-03", hour: "17", author: "third@user.com" },
        { date: "2018-02-03", hour: "20", author: "third@user.com" },
        { date: "2018-02-05", hour: "08", author: "second@user.com" },
        { date: "2018-02-05", hour: "12", author: "third@user.com" },
        { date: "2018-02-05", hour: "13", author: "third@user.com" },
        { date: "2018-02-05", hour: "17", author: "first@user.com" },
        { date: "2018-02-11", hour: "12", author: "second@user.com" },
        { date: "2018-02-12", hour: "12", author: "third@user.com" }
      ]

      const expectation = []

      const result = applyFilters(authors, from, to)(commits)
      expect(result).to.deep.equal(expectation)
    })

  })

})
