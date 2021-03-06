const pipe = require("popipe")

const init = yargs =>
  yargs.detectLocale(false)

const usage = yargs =>
  yargs.usage("Usage: $0 [options]")

const help = yargs =>
  yargs
    .help("help")
    .alias("help", "h")

const examples = yargs => yargs

const options = yargs =>
  yargs.options({
    "from": {
      alias: "f",
      describe: "Filter commits from this date"
    },
    "to": {
      alias: "t",
      describe: "Filter commits until this date"
    },
    "authors": {
      alias: "a",
      describe: "Filter commits by these authors",
      array: true
    },
    "continuity": {
      alias: "c",
      describe: "Hours between commits to be considered as worked",
      default: 1
    },
    "prestart": {
      alias: "ps",
      describe: "Hours before the first commit per day to be considered as worked",
      default: 1
    },
    "outputFile": {
      alias: "o",
      describe: "Path of the output file",
      default: "./timesheet.pdf"
    }
  })

const coercions = yargs => yargs

const demands = yargs => yargs

const parse = yargs =>
  pipe(
    yargs,
    init,
    usage,
    help,
    examples,
    options,
    coercions,
    demands
  )

module.exports = {
  parse
}
