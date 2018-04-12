const expect = require("chai").expect
const rewire = require("rewire")

const Filters = require("../lib/filters")

describe("Filters", () => {

  describe("by", () => {

    it("should filter an array of commit data structures by an array of authors", () => {
      const authors = ["second@user.com", "third@user.com"]
      const commits = [
        { date: "2018-01-08", hour: "16", author: "first@user.com" },
        { date: "2017-02-23", hour: "17", author: "second@user.com" },
        { date: "2018-03-15", hour: "16", author: "third@user.com" }
      ]

      const expectation = [
        { date: "2017-02-23", hour: "17", author: "second@user.com" },
        { date: "2018-03-15", hour: "16", author: "third@user.com" }
      ]

      const result = Filters.by(authors)(commits)
      expect(result).to.deep.equal(expectation)
    })

  })

  describe("from", () => {

    it("should filter an array of commit data structures from a certain date", () => {
      const commits = [
        { date: "2018-01-08", hour: "16", author: "first@user.com" },
        { date: "2017-02-23", hour: "17", author: "second@user.com" },
        { date: "2018-03-15", hour: "16", author: "third@user.com" }
      ]

      const expectation = [
        { date: "2018-01-08", hour: "16", author: "first@user.com" },
        { date: "2018-03-15", hour: "16", author: "third@user.com" }
      ]

      const result = Filters.from("2018-01-01")(commits)
      expect(result).to.deep.equal(expectation)
    })

  })

  describe("to", () => {

    it("should filter an array of commit data structures until a certain date", () => {
      const commits = [
        { date: "2018-01-08", hour: "16", author: "first@user.com" },
        { date: "2017-02-23", hour: "17", author: "second@user.com" },
        { date: "2018-03-15", hour: "16", author: "third@user.com" }
      ]

      const expectation = [
        { date: "2017-02-23", hour: "17", author: "second@user.com" }
      ]

      const result = Filters.to("2017-12-31")(commits)
      expect(result).to.deep.equal(expectation)
    })

  })

})
