const yargs = require("yargs")

const Options = require("./lib/options")
const Git = require("./lib/git")
const Timesheet = require("./lib/timesheet")
const Graph = require("./lib/graph")

if ( !Git.isInstalled() ) {
  console.log("Git isn't installed.")
  process.exit(1)
}

const { authors, from, to, continuity, prestart, outputFile } =
  Options.parse(yargs).argv

const timesheet = Timesheet.compute(authors, from, to, continuity, prestart)

const graph = Graph.draw(timesheet, {
  repository: Git.repository(),
  branch: Git.currentBranch(),
  authors
})

Graph.save(graph, outputFile, () => {
  console.log(`Timesheet exported at: ${outputFile}`)
  process.exit(0)
})
