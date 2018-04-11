const expect = require("chai").expect
const rewire = require("rewire")

const SOURCE_FILE = "../../lib/git/branch"
const currentModule = rewire(SOURCE_FILE)

const shellModule = rewire("../../lib/shell")

describe("branch", () => {

  const branch = currentModule.__get__("branch")

  it("should return an array of Branch data structures from the `git branch` command output", () => {
    const commandOutput = "  first\n  second\n  master\n  * third\n"
    currentModule.__set__("runCommand", () => commandOutput)

    const expectation = [
      { name: "first", isCurrent: false },
      { name: "second", isCurrent: false },
      { name: "master", isCurrent: false },
      { name: "third", isCurrent: true }
    ]

    const result = branch()
    expect(result).to.deep.equal(expectation)
  })

  describe("runCommand", () => {

    const runCommand = currentModule.__get__("runCommand")

    it("should just return the output of the `git branch` command", () => {
      const expectation = "* master\n"
      shellModule.__set__("shell", () => expectation)

      const result = runCommand()
      expect(result).to.equal(expectation)
    })

  })

  describe("parseOutput", () => {

    const parseOutput = currentModule.__get__("parseOutput")

    it("should return an array of strings, representing branches names", () => {
      const commandOutput = "  first\n  second\n  master\n  * third\n"
      const expectation = ["first", "second", "master", "* third"]

      const result = parseOutput(commandOutput)
      expect(result).to.deep.equal(expectation)
    })

  })

  describe("buildBranches", () => {

    const buildBranches = currentModule.__get__("buildBranches")

    it("should return an array of Branch data structures", () => {
      const parsedOutput = ["first", "second", "master", "* third"]

      const expectation = [
        { name: "first", isCurrent: false },
        { name: "second", isCurrent: false },
        { name: "master", isCurrent: false },
        { name: "third", isCurrent: true }
      ]

      const result = buildBranches(parsedOutput)
      expect(result).to.deep.equal(expectation)
    })

  })

})
