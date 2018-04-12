const expect = require("chai").expect
const rewire = require("rewire")

const Filters = require("../lib/filters")

describe("Filters", () => {

  describe("by", () => {

    it("should filter an array of commit data structures by an author", () => {
      const commits = [
        { year: "2018", month: "01", day: "08", hour: "16", minute: "44", second: "24", author: "first@user.com" },
        { year: "2017", month: "02", day: "23", hour: "17", minute: "03", second: "02", author: "second@user.com" },
        { year: "2018", month: "03", day: "15", hour: "16", minute: "42", second: "00", author: "third@user.com" }
      ]

      const expectation = [
        { year: "2017", month: "02", day: "23", hour: "17", minute: "03", second: "02", author: "second@user.com" }
      ]

      const result = Filters.by("second@user.com", commits)
      expect(result).to.deep.equal(expectation)
    })

    it("should filter an array of commit data structures by an array of authors", () => {
      const authors = ["second@user.com", "third@user.com"]
      const commits = [
        { year: "2018", month: "01", day: "08", hour: "16", minute: "44", second: "24", author: "first@user.com" },
        { year: "2017", month: "02", day: "23", hour: "17", minute: "03", second: "02", author: "second@user.com" },
        { year: "2018", month: "03", day: "15", hour: "16", minute: "42", second: "00", author: "third@user.com" }
      ]

      const expectation = [
        { year: "2017", month: "02", day: "23", hour: "17", minute: "03", second: "02", author: "second@user.com" },
        { year: "2018", month: "03", day: "15", hour: "16", minute: "42", second: "00", author: "third@user.com" }
      ]

      const result = Filters.by(authors, commits)
      expect(result).to.deep.equal(expectation)
    })

  })

  describe("from", () => {

    it("should filter an array of commit data structures from a certain date", () => {
      const commits = [
        { year: "2018", month: "01", day: "08", hour: "16", minute: "44", second: "24", author: "first@user.com" },
        { year: "2017", month: "02", day: "23", hour: "17", minute: "03", second: "02", author: "second@user.com" },
        { year: "2018", month: "03", day: "15", hour: "16", minute: "42", second: "00", author: "third@user.com" }
      ]

      const expectation = [
        { year: "2018", month: "01", day: "08", hour: "16", minute: "44", second: "24", author: "first@user.com" },
        { year: "2018", month: "03", day: "15", hour: "16", minute: "42", second: "00", author: "third@user.com" }
      ]

      const result = Filters.from("2018-01-01", commits)
      expect(result).to.deep.equal(expectation)
    })

  })

  describe("to", () => {

    it("should filter an array of commit data structures until a certain date", () => {
      const commits = [
        { year: "2018", month: "01", day: "08", hour: "16", minute: "44", second: "24", author: "first@user.com" },
        { year: "2017", month: "02", day: "23", hour: "17", minute: "03", second: "02", author: "second@user.com" },
        { year: "2018", month: "03", day: "15", hour: "16", minute: "42", second: "00", author: "third@user.com" }
      ]

      const expectation = [
        { year: "2017", month: "02", day: "23", hour: "17", minute: "03", second: "02", author: "second@user.com" }
      ]

      const result = Filters.from("2017-12-31", commits)
      expect(result).to.deep.equal(expectation)
    })

  })

})
