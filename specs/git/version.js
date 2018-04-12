const expect = require("chai").expect
const rewire = require("rewire")

const SOURCE_FILE = "../../lib/git/version"
const currentModule = rewire(SOURCE_FILE)

const shellModule = rewire("../../lib/shell")

describe("version", () => {

  const version = currentModule.__get__("version")

  it("should return the version from the `git version` command output", () => {
    const commandOutput = "git version 2.11.0\n"
    currentModule.__set__("runCommand", () => commandOutput)

    const expectation = "2.11.0"

    const result = version()
    expect(result).to.equal(expectation)
  })

  it("should return an empty string if the git isn't installed", () => {
    const commandOutput = "No command 'git' found\n"
    currentModule.__set__("runCommand", () => commandOutput)

    const expectation = ""

    const result = version()
    expect(result).to.equal(expectation)
  })

})


// git version (\d+\.\d+\.\d+).+
