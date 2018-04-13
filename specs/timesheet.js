const expect = require("chai").expect
const rewire = require("rewire")

const currentModule = rewire("../lib/timesheet")
const gitModule = rewire("../lib/git")

describe("Timesheet", () => {

  describe("compute", () => {

    const compute = currentModule.__get__("compute")

    it("should get this output", () => {
      const authors = ["second@user.com", "third@user.com"]
      const from = "2018-02-03"
      const to = "2018-02-10"
      const continuity = 2
      const prestart = 1

      const gitLogOutput = [
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

      gitModule.__set__("log", () => gitLogOutput)

      const expectation = [
        { date: "2018-02-03", hours: [
            { type: "PRESTART", hour: "12", commits: [] },
            { type: "WORKED", hour: "13", commits: [
              { date: "2018-02-03", hour: "13", author: "second@user.com" },
              { date: "2018-02-03", hour: "13", author: "third@user.com" }
            ] },
            { type: "WORKED", hour: "14", commits: [
              { date: "2018-02-03", hour: "14", author: "second@user.com" }
            ] },
            { type: "CONTINUITY", hour: "15", commits: [] },
            { type: "WORKED", hour: "16", commits: [
              { date: "2018-02-03", hour: "16", author: "third@user.com" }
            ] },
            { type: "WORKED", hour: "17", commits: [
              { date: "2018-02-03", hour: "17", author: "third@user.com" }
            ] },
            { type: "CONTINUITY", hour: "18", commits: [] },
            { type: "CONTINUITY", hour: "19", commits: [] },
            { type: "WORKED", hour: "20", commits: [
              { date: "2018-02-03", hour: "20", author: "third@user.com" }
            ] }
          ]
        },
        { date: "2018-02-05", hours: [
            { type: "PRESTART", hour: "07", commits: [] },
            { type: "WORKED", hour: "08", commits: [
              { date: "2018-02-05", hour: "08", author: "second@user.com" }
            ] },
            { type: "WORKED", hour: "12", commits: [
              { date: "2018-02-05", hour: "12", author: "third@user.com" }
            ] },
            { type: "WORKED", hour: "13", commits: [
              { date: "2018-02-05", hour: "13", author: "third@user.com" }
            ] }
          ]
        }
      ]

      const result = compute(authors, from, to, continuity, prestart)
      expect(result).to.deep.equal(expectation)
    })

  })

})
