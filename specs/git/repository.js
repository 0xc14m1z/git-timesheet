const expect = require("chai").expect
const rewire = require("rewire")

const SOURCE_FILE = "../../lib/git/repository"
const currentModule = rewire(SOURCE_FILE)

const shellModule = rewire("../../lib/shell")

describe("repository", () => {

  const repository = currentModule.__get__("repository")

  it("should return the full repository name from `git remote show origin` command output", () => {
    const commandOutput = "* remote origin\n  Fetch URL: git@github.com:0xc14m1z/git-timesheet.git\n  Push  URL: git@github.com:0xc14m1z/git-timesheet.git\n  HEAD branch: master\n  Remote branch:\n    master tracked\n  Local branch configured for \'git pull\':\n    master merges with remote master\n  Local ref configured for \'git push\':\n    master pushes to master (up to date)\n"
    currentModule.__set__("runCommand", () => commandOutput)

    const expectation = "0xc14m1z/git-timesheet"

    const result = repository()
    expect(result).to.deep.equal(expectation)
  })

})
