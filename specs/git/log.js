const expect = require("chai").expect
const rewire = require("rewire")

const SOURCE_FILE = "../../lib/git/log"
const currentModule = rewire(SOURCE_FILE)

const shellModule = rewire("../../lib/shell")

describe("log", () => {

  const log = currentModule.__get__("log")

  it("should return an array of Commit data structures from the `git log` command output", () => {
    const commandOutput = "2018-01-08 16:44:24 +0100d|first@user.com\n2017-02-23 17:03:02 +0100d|second@user.com\n2018-03-15 16:42:00 +0100d|third@user.com\n"
    currentModule.__set__("runCommand", () => commandOutput)

    const expectation = [
      { date: "2018-01-08", hour: "16", author: "first@user.com" },
      { date: "2017-02-23", hour: "17", author: "second@user.com" },
      { date: "2018-03-15", hour: "16", author: "third@user.com" }
    ]

    const result = log()
    expect(result).to.deep.equal(expectation)
  })

})
