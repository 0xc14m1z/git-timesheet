const expect = require("chai").expect
const rewire = require("rewire")

const SOURCE_FILE = "../../lib/git/commit"
const currentModule = rewire(SOURCE_FILE)

const shellModule = rewire("../../lib/shell")

describe("Commit", () => {

  const Commit = currentModule.__get__("Commit")

  it("should return a Commit data structure from raw date and author", () => {
    const rawDate = "2018-01-08 16:44:24 +0100d"
    const author = "first@user.com"

    const expectation =
      { date: "2018-01-08", hour: "16", author: "first@user.com" }

    const result = Commit(rawDate, author)
    expect(result).to.deep.equal(expectation)
  })

})
