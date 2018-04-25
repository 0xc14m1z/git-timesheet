const yargs = require("yargs")

const Options = require("./lib/options")
const Git = require("./lib/git")
const Timesheet = require("./lib/timesheet")
const Graph = require("./lib/graph")

if ( !Git.isInstalled() ) {
  console.log("Git isn't installed.")
  process.exit(1)
}

const { authors, from, to, continuity, prestart } = Options.parse(yargs).argv
// console.log("authors: ", authors)
// console.log("from: ", from)
// console.log("to: ", to)
// console.log("continuity: ", continuity)
// console.log("prestart: ", prestart)

const timesheet = Timesheet.compute(authors, from, to, continuity, prestart)
// console.log(timesheet)

const graph = Graph.draw(timesheet)

const desktop = require('path').join(require('os').homedir(), 'Desktop')

Graph.save(graph[0], desktop + "/graph.png")

console.log("Saved!")
